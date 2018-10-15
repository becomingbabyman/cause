(ns causal-tree.core
  (:require
   [nano-id.core :refer [nano-id]]
   [clojure.spec.alpha :as s]
   [clojure.spec.gen.alpha :as gen]))

; node:   the smallest unit of causation. unique Id, Value, Cause.
; nodes:  a map of all nodes by their Ids. This is the canonical store for all nodes in a tree.
; yarn:   CACHE - a time ordered vector of nodes from a specific site. These speed up weft generation and double the size of the tree.
; weft:   a path through 1 or more yarns used to generate a new tree representing any previous state of the tree.
; weave:  CACHE - a partially ordered vector of all nodes. This makes reading the tree O(n), but incresaes inserts from O(1) to O(n).
; causal-tree:  a store for all of the above

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

(s/def ::causal-tree (s/keys :req [::nodes ::lamport-ts ::site-id]
                             :opt [::yarns ::weave]))

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

(defn new-causal-tree []
  {::lamport-ts 0
   ::site-id (guid)
   ::nodes {(first root-node) (rest root-node)}
   ::yarns {(second (first root-node)) [root-node]}
   ::weave [root-node]})

(defn sorted-ins-index
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

(defn ins
  "Returns a vector with a value inserted at the index. Prefer using
  core clojure seq functions like conj over this, for better performance.
  If no index is specified, assume the vector is sorted and try to maintain
  the sort on insert."
  ([coll val] (if-let [i (sorted-ins-index coll val {:uniq true})]
                (ins coll i val) coll))
  ([coll i val] (vec (concat (take i coll) [val] (drop i coll)))))

(defn spin
  "Spin yarn(s)...
  Returns a causal-tree with updated yarn index. If a node is passed
  only the yarn relating to that node will be updated. Otherwise the
  entire tree will be traversed and (re)indexed."
  ([causal-tree]
   (loop [ct1 causal-tree
          sorted-nodes (pmap node (sort (::nodes causal-tree)))]
     (if (empty? sorted-nodes)
       ct1
       (recur (spin ct1 (first sorted-nodes))
              (rest sorted-nodes)))))
  ([causal-tree node]
   (let [site-id (second (first node))]
     (if-let [yarn (get-in causal-tree [::yarns site-id])]
       (if (> (ffirst node) (ffirst (last yarn))) ; compare lamport timestamps
         (update-in causal-tree [::yarns site-id] conj node)
         (update-in causal-tree [::yarns site-id] ins node)) ; ins is expensive. Avoid it.
       (assoc-in causal-tree [::yarns site-id] [node])))))

(defn refresh-ts
  "Refreshes the ::lamport-ts to make sure it's the max value in the tree.
  Expects ::yarns cache to be up to date and sorted."
  [causal-tree]
  (->> (::yarns causal-tree)
       (reduce #(max %1 (ffirst (last (last %2)))) 0)
       (assoc causal-tree ::lamport-ts)))

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
           (pmap node (sort (::nodes causal-tree)))))
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

(defn append
  "Similar to insert, but automatically calculates node id based on the
  local site-id and lamport-ts."
  [causal-tree value cause priority]
  (let [ct2 (update-in causal-tree [::lamport-ts] inc)
        node (node (::lamport-ts ct2) (::site-id ct2) priority cause value)]
    (insert ct2 node)))

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

(defn refresh-caches
  "Replaces everything but ::nodes and ::site-id with refreshed caches
   of ::weave ::yarns etc. Useful when loading in ::nodes."
  [causal-tree]
  (->> causal-tree
       (spin)
       (refresh-ts)
       (weave)))

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
            (assoc ::lamport-ts (apply max (pmap first filtered-ids)))
            (yarns->nodes)
            (weave))))))
