(ns causal-tree.map
  (:require
   [causal-tree.util :as u :refer [<< guid]]
   [causal-tree.shared :as s]))

(defn new-causal-tree []
  {::s/type ::s/map
   ::s/lamport-ts 0
   ::s/site-id (guid)
   ::s/nodes {}
   ::s/yarns {}
   ::s/weave {}})

; NOTE: a weave is a map of :key [[id value] [id value]] pairs.
;   The vector of values is sorted by id with the newest id
;   at the front of this vector.
(defn weave
  "Returns a causal tree with its nodes ordered into a weave O(n^2).
  If a node is passed only that node will be woven in O(n). This is
  much fast in practice. The worst case only occurs when one key
  is continually changed. Most maps will have many keys that are
  infrequently changed."
  ([causal-tree]
   (reduce weave (assoc causal-tree ::s/weave {})
           (pmap s/node (sort (::s/nodes causal-tree)))))
  ([causal-tree [id k v :as node]]
   (if (not (get-in causal-tree [::s/nodes id]))
     causal-tree
     (loop [left []
            right (or (get-in causal-tree [::s/weave k]) [])]
       (let [nr (first right)]
         (if (or (empty? right)
                 (<< (first nr) id))
           (assoc-in causal-tree [::s/weave k]
                     (vec (concat left [[id v]] right)))
           (recur (conj left nr) (rest right))))))))

(defn assoc-
  ([causal-tree k v]
   ; TODO: check that k is not already set to v before appending new node
   (s/append causal-tree k v weave))
  ([causal-tree k v & kvs]
   (apply assoc- (assoc- k v) kvs)))

(defn dissoc-
  ([causal-tree k]
   ; TODO: check that k exists and is not currently deleted before appending a new delete
   (s/append causal-tree k ::s/delete weave))
  ([causal-tree k & ks]
   (apply dissoc- (dissoc- k) ks)))

; TODO: rename to ct->edn
(defn materialize
  "Returns the current state of the tree as edn. E.g. a tree of ks & vs
  will materialize as a map. This is mostly for testing and pretty
  printing. In most cases it's prefferable to work with the whole tree."
  ([causal-tree]
   (reduce (fn [acc [k [[_ v]]]]
             (if (= v ::s/delete)
               acc
               (assoc acc k v)))
           {} (::s/weave causal-tree))))
