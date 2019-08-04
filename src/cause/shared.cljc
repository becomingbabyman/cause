(ns cause.shared
  (:require [cause.util :as u :refer [<<]]
            [cause.protocols :as proto]
            [clojure.spec.alpha :as spec]
            [clojure.spec.gen.alpha :as gen])
  #? (:clj (:import (clojure.lang Atom))))

; node:   the smallest unit of causation. unique Id, Value, Cause.
; nodes:  a map of all nodes by their Ids. This is the canonical store for all nodes in a tree.
; yarn:   CACHE - a time ordered vector of nodes from a specific site. These speed up weft generation and double the size of the tree.
; weft:   a path through 1 or more yarns used to generate a new tree representing any previous state of the tree.
; weave:  CACHE - a partially ordered vector of all nodes. This makes reading the tree O(n), but incresaes inserts from O(1) to O(n).
; causal-tree:  a store for all of the above

; This is an implmentation of a Causal Tree CRDT in CLJ(S)
; Awesome blog post with graphics and Swift impl: http://archagon.net/blog/2018/03/24/data-laced-with-history/
; Original paper: http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.627.5286&rep=rep1&type=pdf
; Follow up paper (more detailed impl): https://www.dropbox.com/spec/6go311vjfqhgd6f/Deep_hypertext_with_embedded_revision_co.pdf?dl=0

(def types #{::map ::list}) ; ::rope ::counter
(def special-keywords #{::hide ::show})
(def root-id [0 "0" 0])
(def root-node [root-id nil nil])
(def ^:const uuid-length 21)
(def ^:const site-id-length 13)

(defn gen-string [length]
  (gen/fmap #(apply str %) (gen/vector (gen/char-alpha) length)))

(spec/def ::type types)
(spec/def ::lamport-ts nat-int?) ; the logical insertion order (the index in a yarn)
; TODO: should a wall-clock-ts be added? If a central Datomic DB is used then nodes will get a wall clock ts based on when they were synced to the server...
(spec/def ::uuid (spec/with-gen (spec/and string? #(= (count %) uuid-length))
                                #(gen-string uuid-length)))
(spec/def ::site-id (spec/with-gen (spec/and string? #(or
                                                       (= (count %) site-id-length)
                                                       (= % "0")))
                                   #(gen-string site-id-length)))
(spec/def ::tx-index nat-int?) ; the index in a transaction (every ::lamport-ts is a transaction of one or more insertions)
(spec/def ::id (spec/tuple ::lamport-ts ::site-id ::tx-index))
(spec/def ::tx-id (spec/tuple ::lamport-ts ::site-id)) ; The first 2 values of an ::id make up a uniquely identifiable ::tx-id
(spec/def ::key (spec/or :k keyword?
                         :s string?))
(spec/def ::cause (spec/or :previous-list-item ::id
                           :map-key ::key))
(spec/def ::value (spec/or :special-k special-keywords
                           :c char?
                           :s string?
                           :k keyword?
                           :n number?
                           :ct ::causal-tree
                           :other any?))

; AKA an atom in CT parlance.
(spec/def ::node (spec/cat :id ::id
                           :cause ::cause
                           :value ::value))
(spec/def ::root (spec/cat :id #{root-id}
                           :cause nil?
                           :value nil?))

(spec/def ::nodes (spec/map-of ::id (spec/tuple ::cause ::value) :gen-max 3))

(spec/def ::yarn (spec/coll-of ::node :gen-max 3)) ; site specific time sorted vector
(spec/def ::yarns (spec/map-of ::site-id ::yarn :gen-max 3)) ; map of yarns keyed by site-id

(spec/def ::weave (spec/or
                   :list-weave (spec/coll-of ::node :gen-max 3) ; ordered vector of operations in the order of their output
                   :map-weave (spec/map-of ::key (spec/coll-of ::node :gen-max 3) :gen-max 3))) ; map of ordered vectors corresponding to keys

(spec/def ::causal-tree (spec/keys :req [::nodes ::lamport-ts ::uuid ::site-id]
                                   :opt [::yarns ::weave]))

(defn new-site-id [] (u/new-uid site-id-length))

(defn new-node
  "Helper function to create a node for insertion into a causal collection."
  ([[k v]] ; maps the keys / values in the ::nodes map back to nodes
   (into [k] v))
  ([lamport-ts site-id cause value]
   (new-node lamport-ts site-id 0 cause value))
  ([lamport-ts site-id tx-index cause value]
   [[lamport-ts site-id tx-index] cause value]))
(spec/fdef new-node
           :args (spec/or
                  :arity-1 (spec/cat :node-kv-tuple (spec/tuple ::id (spec/tuple ::cause ::value)))
                  :arity-4 (spec/cat :lamport-ts ::lamport-ts
                                     :site-id ::site-id
                                     :cause ::cause
                                     :value ::value)
                  :arity-5 (spec/cat :lamport-ts ::lamport-ts
                                     :site-id ::site-id
                                     :tx-index ::tx-index
                                     :cause ::cause
                                     :value ::value))
           :ret ::node
           :fn (spec/and #(not= (first (:ret %)) (get-in % [:args :cause])))) ; cause can't equal node-id

(defn get-tx
  "Returns the transaction tuple in a node"
  [node] (drop-last (first node)))

(defn assoc-nodes
  "Adds nodes to the ::nodes map in a causal-tree."
  [causal-tree nodes]
  (reduce (fn [acc node]
            (assoc-in acc [::nodes (first node)] (rest node)))
          causal-tree
          nodes))

(defn spin-sequential [causal-tree nodes]
  (let [node (first nodes)
        site-id (second (first node))]
    (if-let [yarn (get-in causal-tree [::yarns site-id])]
      (if (<< (first (peek yarn)) (first node))
        (update-in causal-tree [::yarns site-id] into nodes)
        (update-in causal-tree [::yarns site-id] u/insert node {:next-vals (next nodes)})) ; u/insert is expensive. Avoid it.
      (assoc-in causal-tree [::yarns site-id] nodes))))

(defn spin
  "Spin yarn(s)...
  Returns a causal-tree with updated yarn index. If a node is passed
  only the yarn relating to that node will be updated. Otherwise the
  entire tree will be traversed and (re)indexed."
  ([causal-tree]
   (loop [ct1 causal-tree
          sorted-nodes (map new-node (sort (::nodes causal-tree)))]
     (if (empty? sorted-nodes)
       ct1
       (recur (spin-sequential ct1 [(first sorted-nodes)])
              (rest sorted-nodes)))))
  ([causal-tree node] (spin causal-tree node nil))
  ([causal-tree node more-nodes]
   (if (not more-nodes)
     (spin-sequential causal-tree [node])
     (let [nodes (into [node] more-nodes)
           is-sequential? (and (= ::list (::type causal-tree))
                               (reduce #(and %1 (= (first (ffirst %2))
                                                   (second (second (second %2)))))
                                       true (partition 2 1 nodes)))]
       (if is-sequential?
         (spin-sequential causal-tree nodes)
         (loop [ct causal-tree
                node node
                more-nodes more-nodes]
           (if node
             (recur (spin-sequential ct [node]) (first more-nodes) (rest more-nodes))
             ct)))))))

(defn insert
  "Inserts an arbitrary node from any site and any point in time. If the
  node's ts is greater than the local ts then the local ts will be
  fastforwared to match."
  ([weave-fn causal-tree node]
   (insert weave-fn causal-tree node nil))
  ([weave-fn causal-tree node more-nodes-in-tx]
   (let [nodes (into [node] more-nodes-in-tx)
         txs (reduce #(conj %1 (get-tx %2)) #{} nodes)]
     ; TODO: REFACTOR: this sort of check should go in the specific causal
     ;  collection that cares about this validaiton. E.g. lists also care
     ;  that all the node ids / causes are monotonically increasing.
     (when (< 1 (count txs))
       (throw (ex-info "All nodes must belong to the same tx."
                       {:txs txs})))
     (if-let [existing-node-body (get-in causal-tree [::nodes (first node)])]
       (if (= (rest node) existing-node-body)
         causal-tree ; idempotency!
         (throw (ex-info "This node is already in the tree and can't be changed."
                         {:causes #{:append-only :edits-not-allowed}
                          :existing-node (cons (first node) existing-node-body)})))
       ; TODO: UNHACK: this makes assumptions relating to how CausalMaps and CausalLists work.
       ;  The idea that keys as causes are allowed is tru for maps, but not for lists.
       ;  And in any case this fn should not need to know about either of them, just causal-trees.
       (if (and (not (spec/valid? ::key (second node))) ; if the cause is a ::key we can ignore this check
                (not (get-in causal-tree [::nodes (second node)])))
         (throw (ex-info "The cause of this node is not in the tree."
                         {:causes #{:cause-must-exist}}))
         (-> (if (> (ffirst node) (::lamport-ts causal-tree))
               (assoc-in causal-tree [::lamport-ts] (ffirst node))
               causal-tree)
             (assoc-nodes nodes)
             (spin node more-nodes-in-tx)
             (weave-fn node more-nodes-in-tx)))))))

(defn append
  "Similar to insert, but automatically calculates node id based on the
  local site-id and lamport-ts."
  [weave-fn causal-tree cause value]
  (let [ct2 (update-in causal-tree [::lamport-ts] inc)
        node (new-node (::lamport-ts ct2) (::site-id ct2) cause value)]
    (insert weave-fn ct2 node)))

(defn refresh-ts
  "Refreshes the ::lamport-ts to make sure it's the max value in the tree.
  Expects ::yarns cache to be up to date and sorted."
  [causal-tree]
  (->> (::yarns causal-tree)
       (reduce #(max %1 (ffirst (peek (peek %2)))) 0)
       (assoc causal-tree ::lamport-ts)))

(defn yarns->nodes
  "Replaces the ::nodes map of tree with the nodes in the tree's ::yarns."
  [causal-tree]
  (->> (::yarns causal-tree)
       (reduce #(into %1 (second %2)) [])
       (reduce #(assoc %1 (first %2) (rest %2)) {})
       (assoc causal-tree ::nodes)))

(defn refresh-caches
  "Replaces everything but ::nodes and ::site-id with refreshed caches
   of ::weave ::yarns etc. Useful when loading in ::nodes."
  [weave-fn causal-tree]
  (->> causal-tree
       (spin)
       (refresh-ts)
       (weave-fn)))

(defn weft
  "Returns a causal-tree that is a sub tree of the original up to the
  specified Ids. Specify one specific ::id per site you want included
  in the weft. Only the yarns of the site-ids contained in the ids in
  the args will be considered in the returned sub-tree. This is how
  you time travel. Combinations of Ids that do not preserve causality
  are invalid and will result in gibberish trees."
  ; TODO: throw on ids that do not preserve causality. This likely invloves writing a O(n) un-weave function that can rollback a weave to the specified weft and throw if the rollback breaks causality...
  [weave-fn new-causal-tree-fn causal-tree ids-to-cut-yarns]
  ; TODO: filter or throw if more than one id per site.
  (let [filtered-ids (filter #(not= root-id %) ids-to-cut-yarns)]
    (loop [new-ct (new-causal-tree-fn)
           id (first filtered-ids)
           more-ids (rest filtered-ids)]
      (if id
        (recur (as-> (get-in causal-tree [::yarns (second id)]) $
                     (take-while #(not= id (first %)) $)
                     (vec $)
                     (conj $ (new-node [id (get-in causal-tree [::nodes id])]))
                     (assoc-in new-ct [::yarns (second id)] $))
               (first more-ids) (rest more-ids))
        (-> new-ct
            (assoc ::site-id (::site-id causal-tree))
            (assoc ::lamport-ts (apply max (map first filtered-ids)))
            (yarns->nodes)
            (weave-fn))))))

; TODO: should this take whole trees or a tree and nodes?
;   Nodes are simpler, can be sorted, and merged in with O(n*m)
;   m being the number of nodes in the merge. It's likely that
;   there will be duplicate nodes either way, so a diff will
;   always need to be calculated...
(defn merge-trees
  "Merges two causal-trees into one."
  ([weave-fn causal-tree1 causal-tree2]
   (cond
     (not= (::type causal-tree1) (::type causal-tree2))
     (throw (ex-info "Causal type missmatch. Merge not allowed."
                     {:causes #{:type-missmatch}
                      :types [(::type causal-tree1) (::type causal-tree2)]}))
     (not= (::uuid causal-tree1) (::uuid causal-tree2))
     (throw (ex-info "Causal UUID missmatch. Merge not allowed."
                     {:causes #{:uuid-missmatch}
                      :uuids [(::uuid causal-tree1) (::uuid causal-tree2)]}))
     :else (->> (::nodes causal-tree2)
                (map new-node)
                (reduce (partial insert weave-fn) causal-tree1)))))
                ; TODO: MAYBE: implement deep merge of cts in values.
                ;       This includes atoms.
                ;       Preserve the value types in causal-tree1. E.g. once merged atoms should still be atoms.
                ; TODO: improve performance.

(declare causal->edn)

(extend-type Atom
  proto/CausalTo
  (causal->edn
    ([this] (proto/causal->edn this {}))
    ([this opts]
     (if (:deref-atoms opts)
       (causal->edn (deref this) opts) ; TODO: HANDLE: this could cause infinite recursion if two tress reference each other. Break out out after visiting each atom once, or throw if that happens
       this))))

(defn causal->edn
  "Takes a value. If it's a causal tree it returns the data representing the
  current state of the tree. If it's not a causal tree it just returns the value."
  ([causal]
   (causal->edn causal {:deref-atoms true})) ; TODO: add option to concat adjacent strings
  ([causal opts]
   (if (satisfies? proto/CausalTo causal)
     (proto/causal->edn causal opts)
     causal)))
