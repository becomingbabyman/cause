(ns causal-tree.core
  (:require
   [nano-id.core :refer [nano-id]]
   [clojure.spec.alpha :as s]
   [clojure.spec.gen.alpha :as gen]
   [clojure.spec.test.alpha :as stest]
   [com.walmartlabs.datascope :as ds]))

; node:   the smallest unit of causation. unique Id, Value, Cause.
; nodes:  a map of all nodes by their Ids. This is the canonical store for all nodes in a tree.
; yarn:   CACHE - a time ordered vector of nodes from a specific site. These speed up weft generation and double the size of the tree.
; weft:   a path through 1 or more yarns used to generate a new tree representing any previous state of the tree.
; weave:  CACHE - a partially ordered vector of all nodes. This makes reading the tree O(n), but incresaes inserts from O(1) to O(n).
; causal-tree:  a store for all of the above

(defn in-memory-crdt-playground []
  (do
    ; This is an implmentation of a Causal Tree CRDT in CLJ(S)
    ; Awesome blog post with graphics and Swift impl: http://archagon.net/blog/2018/03/24/data-laced-with-history/
    ; Original paper: http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.627.5286&rep=rep1&type=pdf
    ; Follow up paper (more detailed impl): https://www.dropbox.com/s/6go311vjfqhgd6f/Deep_hypertext_with_embedded_revision_co.pdf?dl=0

    (def site-id-length 13)
    (def keywords {:x :delete})
    (def root-id [0 "0" 0])
    (def root-node [root-id nil nil])

    (defn gen-string [length]
      (gen/fmap #(apply str %) (gen/vector (gen/char-alpha) length)))

    (s/def ::lamport-ts (s/and int? (comp not neg?))) ; AKA the index in a yarn
    ; TODO: should a wall-clock-ts be added? If a central Datomic DB is used then nodes will get a wall clock ts based on when they were synced to the server...
    (s/def ::priority #{0 1}) ; TODO: is this even needed? The idea is to use it to help with operations like delete, but it's unclear if that op will pose a challenge without this.
    (s/def ::basic-guid (s/with-gen (s/and string? #(or
                                                     (= (count %) site-id-length)
                                                     (= % "0")))
                                    #(gen-string site-id-length)))
    (s/def ::site-id ::basic-guid)
    (s/def ::id (s/tuple ::lamport-ts ::site-id ::priority))
    (s/def ::cause ::id)
    (s/def ::value (s/or :c char? :k (set (keys keywords)))) ; TODO: start with text and expand to support more value types later.

    ; AKA an atom in CT parlance.
    (s/def ::node (s/cat :id ::id
                         :cause ::cause
                         :value ::value))
    (s/def ::root (s/cat :id #{root-id}
                         :cause nil?
                         :value nil?))

    (s/def ::nodes (s/map-of ::id (s/tuple ::cause ::value)))

    (s/def ::yarn (s/coll-of ::node)) ; site specific time sorted vector
    (s/def ::yarns (s/map-of ::site-id ::yarn)) ; map of yarns keyed by site-id

    (s/def ::weave (s/coll-of ::node)) ; ordered vector of operations in the order of their output

    (s/def ::causal-tree (s/keys :req [::nodes]
                                 :opt [::lamport-ts ::site-id ::yarns ::weave]))

    (s/valid? ::lamport-ts 0)
    (gen/generate (s/gen ::lamport-ts))
    (gen/generate (s/gen ::basic-guid))
    (gen/generate (s/gen ::id))
    (gen/generate (s/gen ::site-id))
    (gen/generate (s/gen ::root))
    (gen/generate (s/gen ::node))
    (gen/generate (s/gen ::value))
    (gen/generate (s/gen ::causal-tree))

    (defn <<
      "Return non-nil if runs of any type are in
      monotonically increasing order."
      ([a b]
       (< (compare a b) 0))
      ([a b & more]
       (and (<< a b) (apply << b more))))

    (defn guid
      "Returns a globally unique ID, encoded to take up as little
      space as possible. The default is a length of 13 characters
      which copromises uniqueness for space savings given these ids
      will be scoped to CRDTs that will likely never never exceed 1M
      unique ids. Pass a length parameter if you expect to need more
      uniqueness. See this site for help picking a reasonable
      length https://zelark.github.io/nano-id-cc/. The default for
      nano-id is 21 which maps similarly to the uniqueness of most uuid
      generators and is a good default if your scope is not bounded."
      ; TODO: consider the tradoffs of nano-id compared to a standard uuid implmentation https://www.itu.int/en/ITU-T/asn1/Pages/UUID/uuids.aspx
      ([] (guid site-id-length))
      ([length] (nano-id length)))

    (defn node
      ([node-kv-tuple] ; maps the keys / values in the ::nodes map back to nodes
       (into [(first node-kv-tuple)] (second node-kv-tuple)))
      ([lamport-ts site-id priority cause value]
       [[lamport-ts site-id priority]
        cause
        value]))
    (s/fdef node
            :args (s/or
                   :arity-1 (s/cat :node-kv-tuple (s/tuple ::id seqable?))
                   :arity-5 (s/and
                             (s/cat :lamport-ts ::lamport-ts
                                    :site-id ::site-id
                                    :priority ::priority
                                    :cause ::cause
                                    :value ::value)
                             #(> (:lamport-ts %) (first (:cause %))))) ; node ts must be more than cause ts
            :ret ::node
            :fn (s/and #(not= (first (:ret %)) (get-in % [:args :cause])))) ; cause can't equal node-id

    (stest/instrument `node)
    (stest/check `node)
    (s/exercise-fn `node)

    (def test-node (node 1 (guid) 0 root-id \c))
    (def test-node-2 (node 2 (guid) 0 (first test-node) \a))
    (def test-node-3 (node 3 (guid) 0 (first test-node-2) \r))

    (defn new-causal-tree []
      {::lamport-ts 0
       ::site-id (guid)
       ::nodes {(first root-node) (rest root-node)}
       ::yarns {(second (first root-node)) [root-node]}
       ::weave [root-node]})

    (def ct (atom (new-causal-tree)))

    (defn- sorted-ins-index
      "Returns the insertion index for the target assuming the collection
      is already sorted."
      ([coll target] (sorted-ins-index coll target {:uniq false}))
      ([coll target options]
       (loop [low-idx 0
              high-idx (dec (count coll))]
         (if (> low-idx high-idx)
           low-idx
           (let [mid-idx (quot (+ low-idx high-idx) 2)
                 mid-val (coll mid-idx)]
             (cond
               (= mid-val target) (if (:uniq options) nil mid-idx)
               (< (compare mid-val target) 0) (recur (inc mid-idx) high-idx)
               (> (compare mid-val target) 0) (recur low-idx (dec mid-idx))))))))

    (defn- ins
      "Returns a vector with a value inserted at the index. Prefer using
      core clojure seq functions like conj over this, for better performance.
      If no index is specified, assume the vector is sorted and try to maintain
      the sort on insert."
      ([coll val] (if-let [i (sorted-ins-index coll val {:uniq true})]
                    (ins coll i val) coll))
      ([coll i val] (vec (concat (take i coll) [val] (drop i coll)))))

    (ins [[1 1] [2 2] [4 4]] [3 3])

    (defn spin
      "Spin yarn(s)...
      Returns a causal-tree with updated yarn index. If a node is passed
      only the yarn relating to that node will be updated. Otherwise the
      entire tree will be traversed and (re)indexed."
      ([causal-tree node]
       (let [site-id (second (first node))]
         (if-let [yarn (get-in causal-tree [::yarns site-id])]
           (if (> (ffirst node) (ffirst (last yarn))) ; compare lamport timestamps
             (update-in causal-tree [::yarns site-id] conj node)
             (update-in causal-tree [::yarns site-id] ins node)) ; ins is expensive. Avoid it.
           (assoc-in causal-tree [::yarns site-id] [node]))))
      ([causal-tree]
       (loop [ct1 causal-tree
              sorted-nodes (map node (sort (::nodes causal-tree)))]
         (if (empty? sorted-nodes)
           ct1
           (recur (spin ct1 (first sorted-nodes))
                  (rest sorted-nodes))))))

    ; (swap! ct assoc ::yarns {})
    (deref ct)
    (spin @ct)
    ; (spin @ct (node (second (::nodes @ct))))
    ; (swap! ct spin)

    (defn weave-asap?
      "Takes a left, a middle and a right node. Returns true if the middle
      node must be inserted after the left or ASAP."
      [nl nm nr]
      (or
        ; Always try to weave a node after its cause.
        ; This is especially important for deletes.
       (= (first nl) (second nm))
        ; Always try to weave a node before a node it causes.
       (= (first nm) (second nr))))

    (defn dont-weave?
      "Takes a left, a middle and a right node. Returns true if the middle
      node cannot be inserted between the left and the right for any reason."
      [nl nm nr]
      (or
       (and ; don't weave between a delete and the node it deletes
        (= :x (last nr))
        (not= (first nm) (second nr))))) ; unless nm is the node it deletes ;)

    (defn weave
      "Returns a causal tree with its nodes ordered into a weave O(n^2).
      If a node is passed only that node will be woven in O(n)."
      ([causal-tree]
       (reduce weave (assoc causal-tree ::weave [])
               (map node (sort (::nodes causal-tree)))))
      ([causal-tree node]
       (if (not (get-in causal-tree [::nodes (first node)]))
         causal-tree
         (loop [left []
                right (::weave causal-tree)
                prev-asap false]
           (let [nl (last left)
                 nr (first right)
                 asap (or prev-asap (weave-asap? nl node nr))]
             (if (or (empty? right)
                     (and (not (dont-weave? nl node nr))
                          (or asap (<< (first nl) (first node) (first nr)))))
               (assoc causal-tree ::weave (vec (concat left [node] right)))
               (recur (conj left nr) (rest right) asap)))))))

    (weave @ct (second (reverse (sort (::nodes @ct)))))
    (::weave (weave @ct))
    (swap! ct weave)

    (defn insert
      "Inserts an arbitrary node from any site and any point in time. If the
      node's ts is greater than the local ts then the local ts will be
      fastforwared to match."
      [causal-tree node]
      (if-let [existing-node-body (get-in causal-tree [::nodes (first node)])]
        (if (= (rest node) existing-node-body)
          causal-tree
          (throw (ex-info "This node is already in the tree and can't be changed."
                          {:causes #{:append-only :edits-not-allowed}
                           :existing-node (cons (first node) existing-node-body)})))
        (if (not (get-in causal-tree [::nodes (second node)]))
          ; TODO: is this needed? parallel adjacent inserts might be possible without this.
          (throw (ex-info "The cause of this node is not in the tree."
                          {:causes #{:cause-must-exist}}))
          (let [ct2 (if (> (ffirst node) (::lamport-ts causal-tree))
                      (assoc-in causal-tree [::lamport-ts] (ffirst node))
                      causal-tree)
                ct3 (assoc-in ct2 [::nodes (first node)] (rest node))
                ct4 (spin ct3 node)
                ct5 (weave ct4 node)]
            ct5))))

    (swap! ct insert test-node)
    (swap! ct insert test-node-2)
    (swap! ct insert test-node-3)

    (defn append
      "Similar to insert, but automatically calculates node id based on the
      local site-id and lamport-ts."
      [causal-tree value cause priority]
      (let [ct2 (update-in causal-tree [::lamport-ts] inc)
            node (node (::lamport-ts ct2) (::site-id ct2) priority cause value)]
        (insert ct2 node)))

    (swap! ct append :x (first test-node-3) 0)
    (swap! ct append \t (first test-node-2) 0)
    (swap! ct append \k (first test-node) 0)
    (swap! ct append :x (first test-node) 0)

    (defn merge-trees
      "Merges two causal-trees"
      [causal-tree1 causal-tree2]
      (println "TODO"))

    (defn materialize
      "Returns the current state of the tree as edn. E.g. a tree of chars
      will materialize as a string."
      ([causal-tree]
       (->> (::weave causal-tree)
            (partition 3 1 nil)
            (keep (partial materialize causal-tree))
            (reduce str)))
      ([causal-tree [nl nm nr]]
       (cond
         (= :x (last nm)) nil
         (and (= :x (last nr))
              (= (first nm) (second nr))) nil
         :else (last nm))))

    (materialize @ct)

    (defn yarns->nodes
      "Replaces the ::nodes map of tree with the nodes in the tree's ::yarns."
      [causal-tree]
      (->> (::yarns causal-tree)
           (reduce #(concat %1 (second %2)) [])
           (reduce #(assoc %1 (first %2) (rest %2)) {})
           (assoc causal-tree ::nodes)))

    (defn weft
      "Returns a causal-tree that is a sub tree of the original up to the
      specified Ids. Specify one specific ::id per site you want included
      in the weft. Only the yarns of the site-ids contained in the ids in
      the args will be considered in the returned sub-tree. This is how
      you time travel. Combinations of Ids that do not preserve causality
      are invalid and will result in gibberish trees."
      ; TODO: throw on ids that do not preserve causality. This likely invloves writing a O(n) un-weave function that can rollback a weave to the specified weft and throw if the rollback breaks causality...
      [causal-tree initial-ids]
      (let [filtered-ids (filter #(not= root-id %) initial-ids)]
        (loop [new-ct (new-causal-tree)
               id (first filtered-ids)
               more-ids (rest filtered-ids)]
          (if id
            (recur (as-> (get-in causal-tree [::yarns (second id)]) $
                         (take-while #(not= id (first %)) $)
                         (vec $)
                         (conj $ (node [id (get-in causal-tree [::nodes id])]))
                         (assoc-in new-ct [::yarns (second id)] $))
                   (first more-ids) (rest more-ids))
            (-> new-ct
                (assoc ::site-id (::site-id causal-tree))
                (assoc ::lamport-ts (apply max (map first filtered-ids)))
                (yarns->nodes)
                (weave))))))

    (def some-weft-ids (map (comp first last last) (::yarns @ct)))
    (weft @ct some-weft-ids)
    (weft @ct [[0 "0" 0]
               [1 "3DwWDZVdvWfHD" 0]
               [2 "MrdfSakDXeO8S" 0]
               [3 "dse5971QQID9V" 0]
               [7 "GMdosBb_tdpsn" 0]
               [10 "PvR3X3YThjRYc" 0]
               [10 "IL8QZ5__a4Vqt" 0]])
    ; (ds/view @ct)
    ; (ds/view (::yarns @ct))
    ; (ds/view (::weave @ct))

    (do
      ; " and the hat"
      (def sa (guid))
      (def n1a (node 8 sa 0 (ffirst (reverse (::weave @ct))) (first " ")))
      (def n2a (node 9 sa 0 (first n1a) \a))
      (def n3a (node 10 sa 0 (first n2a) \n))
      (def n4a (node 11 sa 0 (first n3a) \d))
      (def n5a (node 12 sa 0 (first n4a) (first " ")))
      (def n6a (node 13 sa 0 (first n5a) \t))
      (def n7a (node 14 sa 0 (first n6a) \h))
      (def n8a (node 15 sa 0 (first n7a) \e))
      (def n9a (node 16 sa 0 (first n8a) (first " ")))
      (def n10a (node 17 sa 0 (first n9a) \h))
      (def n11a (node 18 sa 0 (first n10a) \a))
      (def n12a (node 19 sa 0 (first n11a) \t))
      ; "s love dogs"
      (def sb (guid))
      (def n1b (node 8 sb 0 (first (nth (reverse (::weave @ct)) 2)) \s))
      (def n2b (node 9 sb 0 (first n1b) (first " ")))
      (def n3b (node 10 sb 0 (first n2b) \l))
      (def n4b (node 11 sb 0 (first n3b) \o))
      (def n5b (node 12 sb 0 (first n4b) \v))
      (def n6b (node 13 sb 0 (first n5b) \e))
      (def n7b (node 14 sb 0 (first n6b) (first " ")))
      (def n8b (node 15 sb 0 (first n7b) \d))
      (def n9b (node 16 sb 0 (first n8b) \o))
      (def n10b (node 17 sb 0 (first n9b) \g))
      (def n11b (node 18 sb 0 (first n10b) \s))
      (swap! ct insert n1a)
      (swap! ct insert n2a)
      (swap! ct insert n3a)
      (swap! ct insert n4a)
      (swap! ct insert n5a)
      (swap! ct insert n6a)
      (swap! ct insert n7a)
      (swap! ct insert n8a)
      (swap! ct insert n9a)
      (swap! ct insert n10a)
      (swap! ct insert n11a)
      (swap! ct insert n12a)
      (swap! ct insert n1b)
      (swap! ct insert n2b)
      (swap! ct insert n3b)
      (swap! ct insert n4b)
      (swap! ct insert n5b)
      (swap! ct insert n6b)
      (swap! ct insert n7b)
      (swap! ct insert n8b)
      (swap! ct insert n9b)
      (swap! ct insert n10b)
      (swap! ct insert n11b))

    (materialize (weave @ct))
    ; (swap! ct weave)
    ; (ds/view (::weave @ct))

    (deref ct)))
