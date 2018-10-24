(ns causal-tree.list
  (:require
   [causal-tree.util :as u :refer [<< guid]]
   [causal-tree.shared :as s]))

(defn new-causal-tree []
  {::s/type ::s/list
   ::s/lamport-ts 0
   ::s/site-id (guid)
   ::s/nodes {(first s/root-node) (rest s/root-node)}
   ::s/yarns {(second (first s/root-node)) [s/root-node]}
   ::s/weave [s/root-node]})

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
           (pmap s/node (sort (::s/nodes causal-tree)))))
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
