(ns causal-tree.list
  (:require
   [causal-tree.util :as u :refer [<< guid]]
   [causal-tree.spec :as s]
   [clojure.spec.alpha :as spec]))

(defn node
  ([[k v]] ; maps the keys / values in the ::s/nodes map back to nodes
   (into [k] v))
  ([lamport-ts site-id cause value]
   [[lamport-ts site-id] cause value]))
(spec/fdef node
           :args (spec/or
                  :arity-1 (spec/cat :node-kv-tuple (spec/tuple ::s/id seqable?))
                  :arity-5 (spec/and
                            (spec/cat :lamport-ts ::s/lamport-ts
                                      :site-id ::s/site-id
                                      :cause ::s/cause
                                      :value ::s/value)
                            #(> (:lamport-ts %) (first (:cause %))))) ; node ts must be more than cause ts
           :ret ::s/node
           :fn (spec/and #(not= (first (:ret %)) (get-in % [:args :cause])))) ; cause can't equal node-id

(defn new-causal-tree []
  {::s/type ::s/list
   ::s/lamport-ts 0
   ::s/site-id (guid)
   ::s/nodes {(first s/root-node) (rest s/root-node)}
   ::s/yarns {(second (first s/root-node)) [s/root-node]}
   ::s/weave [s/root-node]})

(defn spin
  "Spin yarn(s)...
  Returns a causal-tree with updated yarn index. If a node is passed
  only the yarn relating to that node will be updated. Otherwise the
  entire tree will be traversed and (re)indexed."
  ([causal-tree]
   (loop [ct1 causal-tree
          sorted-nodes (pmap node (sort (::s/nodes causal-tree)))]
     (if (empty? sorted-nodes)
       ct1
       (recur (spin ct1 (first sorted-nodes))
              (rest sorted-nodes)))))
  ([causal-tree node]
   (let [site-id (second (first node))]
     (if-let [yarn (get-in causal-tree [::s/yarns site-id])]
       (if (> (ffirst node) (ffirst (last yarn))) ; compare lamport timestamps
         (update-in causal-tree [::s/yarns site-id] conj node)
         (update-in causal-tree [::s/yarns site-id] u/insert node)) ; u/insert is expensive. Avoid it.
       (assoc-in causal-tree [::s/yarns site-id] [node])))))

(defn refresh-ts
  "Refreshes the ::s/lamport-ts to make sure it's the max value in the tree.
  Expects ::s/yarns cache to be up to date and sorted."
  [causal-tree]
  (->> (::s/yarns causal-tree)
       (reduce #(max %1 (ffirst (last (last %2)))) 0)
       (assoc causal-tree ::s/lamport-ts)))

(defn weave-asap?
  "Takes a left, a middle and a right node. Returns true if the middle
  node should be inserted as soon as possible."
  [nl nm nr]
  (or
   (= (first nl) (second nm)) ; Always try to weave a node after its cause.
   (= (first nm) (second nr)))) ; Always try to weave a node before a node it causes.

(defn weave-later?
  "Takes a left, a middle and a right node. Returns true if the middle
  node cannot be inserted between the left and the right for any reason.
  This assumes that you already want to weave-asap?."
  [nl nm nr seen]
  (or
   (and
    (= ::s/delete (last nr)) ; if the next node is a delete
    (not= (first nm) (second nr)) ; and it does not delete this node, don't weave
    (or (not= ::s/delete (last nm)) ; and this node is not also a delete
        (<< (first nm) (first nr)))) ; or if it is, it is older, don't weave.
   (and
    (or (= (first nl) (second nr)) ; if the next node is caused by the previous node
        (= (second nl) (second nr)) ; or if the next node shares a cause with the previous node
        (get seen (second nr))) ; or the next node is caused by a seen node
    (<< (first nm) (first nr)) ; and this node is older
    (or (not= ::s/delete (last nm)) ; and this node is not a delete
        (= ::s/delete (last nr)))) ; or the next node is a delete, don't weave.
   (and
    ; (or (= (second nm) (second nr)) ; if this node and the next node are caused by the same node
    ;     (and (not= (first nl) (second nr)) ; the next node is not part of a run
    ;          (not= (first nl) (second nm)))) ; and this node is not part of a run
    (<< (first nm) (first nr)) ; and this node is older
    (or (not= ::s/delete (last nm)) ; and this node is not a delete
        (= ::s/delete (last nr)))))) ; or the next node is a delete, don't weave.

(defn weave
  "Returns a causal tree with its nodes ordered into a weave O(n^2).
  If a node is passed only that node will be woven in O(n)."
  ([causal-tree]
   (reduce weave (assoc causal-tree ::s/weave [])
           (pmap node (sort (::s/nodes causal-tree)))))
  ([causal-tree node]
   (if (not (get-in causal-tree [::s/nodes (first node)]))
     causal-tree
     (loop [left []
            right (::s/weave causal-tree)
            prev-asap false
            seen-since-asap {}]
       (let [nl (last left)
             nr (first right)
             asap (or prev-asap (weave-asap? nl node nr))]
         (if (or (empty? right)
                 (and asap (not (weave-later? nl node nr seen-since-asap))))
           (assoc causal-tree ::s/weave (vec (concat left [node] right)))
           (recur (conj left nr) (rest right) asap (if asap
                                                     (assoc seen-since-asap
                                                            (first nl) true)
                                                     seen-since-asap))))))))

(defn insert
  "Inserts an arbitrary node from any site and any point in time. If the
  node's ts is greater than the local ts then the local ts will be
  fastforwared to match."
  [causal-tree node]
  (if-let [existing-node-body (get-in causal-tree [::s/nodes (first node)])]
    (if (= (rest node) existing-node-body)
      causal-tree
      (throw (ex-info "This node is already in the tree and can't be changed."
                      {:causes #{:append-only :edits-not-allowed}
                       :existing-node (cons (first node) existing-node-body)})))
    (if (not (get-in causal-tree [::s/nodes (second node)]))
      ; TODO: is this needed? parallel adjacent inserts might be possible without this.
      (throw (ex-info "The cause of this node is not in the tree."
                      {:causes #{:cause-must-exist}}))
      (let [ct2 (if (> (ffirst node) (::s/lamport-ts causal-tree))
                  (assoc-in causal-tree [::s/lamport-ts] (ffirst node))
                  causal-tree)
            ct3 (assoc-in ct2 [::s/nodes (first node)] (rest node))
            ct4 (spin ct3 node)
            ct5 (weave ct4 node)]
        ct5))))

(defn append
  "Similar to insert, but automatically calculates node id based on the
  local site-id and lamport-ts."
  [causal-tree value cause]
  (let [ct2 (update-in causal-tree [::s/lamport-ts] inc)
        node (node (::s/lamport-ts ct2) (::s/site-id ct2) cause value)]
    (insert ct2 node)))

; TODO: rename to ct->edn
(defn materialize
  "Returns the current state of the tree as edn. E.g. a tree of chars
  will materialize as a string. This is mostly for testing and pretty
  printing. In most cases it's prefferable to work with the whole tree."
  ([causal-tree]
   (->> (::s/weave causal-tree)
        (partition 3 1 nil)
        (keep (partial materialize causal-tree))
        (apply str)))
  ([causal-tree [nl nm nr]]
   (cond
     (= ::s/delete (last nm)) nil ; Don't return deletes.
     (and (= ::s/delete (last nr)) ; If the next node is a delete
          (= (first nm) (second nr))) nil ; and it deletes this node, return nil
     :else (last nm)))) ; Return the value.

(defn refresh-caches
  "Replaces everything but ::s/nodes and ::s/site-id with refreshed caches
   of ::s/weave ::s/yarns etc. Useful when loading in ::s/nodes."
  [causal-tree]
  (->> causal-tree
       (spin)
       (refresh-ts)
       (weave)))

(defn yarns->nodes
  "Replaces the ::s/nodes map of tree with the nodes in the tree's ::s/yarns."
  [causal-tree]
  (->> (::s/yarns causal-tree)
       (reduce #(concat %1 (second %2)) [])
       (reduce #(assoc %1 (first %2) (rest %2)) {})
       (assoc causal-tree ::s/nodes)))

(defn weft
  "Returns a causal-tree that is a sub tree of the original up to the
  specified Ids. Specify one specific ::s/id per site you want included
  in the weft. Only the yarns of the site-ids contained in the ids in
  the args will be considered in the returned sub-tree. This is how
  you time travel. Combinations of Ids that do not preserve causality
  are invalid and will result in gibberish trees."
  ; TODO: throw on ids that do not preserve causality. This likely invloves writing a O(n) un-weave function that can rollback a weave to the specified weft and throw if the rollback breaks causality...
  [causal-tree initial-ids]
  (let [filtered-ids (filter #(not= s/root-id %) initial-ids)]
    (loop [new-ct (new-causal-tree)
           id (first filtered-ids)
           more-ids (rest filtered-ids)]
      (if id
        (recur (as-> (get-in causal-tree [::s/yarns (second id)]) $
                     (take-while #(not= id (first %)) $)
                     (vec $)
                     (conj $ (node [id (get-in causal-tree [::s/nodes id])]))
                     (assoc-in new-ct [::s/yarns (second id)] $))
               (first more-ids) (rest more-ids))
        (-> new-ct
            (assoc ::s/site-id (::s/site-id causal-tree))
            (assoc ::s/lamport-ts (apply max (pmap first filtered-ids)))
            (yarns->nodes)
            (weave))))))

; TODO: should this take whole trees or a tree and nodes?
;   Nodes are simpler, can be sorted, and merged in with O(n*m)
;   m being the number of nodes in the merge. It's likely that
;   there will be duplicate nodes either way, so a diff will
;   always need to be calculated...
(defn merge-trees
  "Merges two or more causal-trees into one."
  ([causal-tree1 causal-tree2 & more]
   (apply merge-trees (merge-trees causal-tree1 causal-tree2) more))
  ([causal-tree1 causal-tree2]
   (println "TODO")))
