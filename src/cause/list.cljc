(ns cause.list
  (:require [cause.util :as u :refer [<<]]
            [cause.shared :as s]
            [cause.protocols :as proto]
            #? (:cljs [cljs.reader]))
  #? (:clj
      (:import (clojure.lang IPersistentCollection IPersistentStack IReduce Counted IHashEq Seqable IObj IMeta ISeq)
               (java.io Writer)
               (java.util Date Collection)
               (java.lang Object))))

(defn new-causal-tree []
  {::s/type ::s/list
   ::s/lamport-ts 0
   ::s/uuid (u/uid)
   ::s/site-id (s/site-id)
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
    (<< (first nm) (first nr)) ; and this node is older
    (or (not= ::s/delete (last nm)) ; and this node is not a delete
        (= ::s/delete (last nr)))))) ; or the next node is a delete, don't weave.

(defn weave
  "Returns a causal tree with its nodes ordered into a weave O(n^2).
  If a node is passed only that node will be woven in O(n)."
  ([causal-tree]
   (reduce weave (assoc causal-tree ::s/weave [])
           (map s/node (sort (::s/nodes causal-tree)))))
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

(defn conj-
  ([causal-tree v & vs]
   (apply conj- (conj- causal-tree v) vs))
  ([causal-tree v]
   (s/append weave causal-tree (first (last (::s/weave causal-tree))) v)))

(defn cons- [v causal-tree]
  (s/append weave causal-tree s/root-id v))

(defn empty- [causal-tree]
  (conj (new-causal-tree) (select-keys causal-tree [::s/site-id ::s/uuid])))

(defn deleted?
  "Has a node been deleted or is it a delete?"
  [node next-node-in-weave]
  (or (= ::s/delete (last node))
      (and (= ::s/delete (last next-node-in-weave))
           (= (first node) (second next-node-in-weave)))))

(defn causal-list->edn
  "Returns the current state of the tree as edn. E.g. a tree of chars
  will materialize as a string. This is mostly for testing and pretty
  printing. In most cases it's prefferable to work with the whole tree."
  ([causal-tree opts]
   (->> (::s/weave causal-tree)
        (partition 2 1 [nil])
        (keep (partial causal-list->edn causal-tree opts))))
  ([causal-tree opts [n nr]]
   (if (deleted? n nr) nil
       (s/causal->edn (last n) opts))))

#? (:clj
    (deftype CausalList [ct]
      Counted
      (count [this] (.count (s/causal->edn this {:deref-atoms false})))

      IPersistentCollection
      (cons [this o] (CausalList. (conj- (.ct this) o)))
      (empty [this] (CausalList. (empty- (.ct this))))
      (equiv [this other] (.equiv ^IPersistentCollection (.ct this) other))

      Object
          ; TODO: what should equality mean? Should it be lists that materialize
          ;   to the same value? Or should all the nodes have to match?
      (equals [this o] (.equals (.ct this) o))
      (hashCode [this] (.hashCode (.ct this)))
      (toString [this] (.toString (s/causal->edn this)))

      IHashEq
      (hasheq [this] (.hasheq ^IHashEq (.ct this)))

      Seqable
      (seq [this] (.seq ^Seqable (s/causal->edn this {:deref-atoms false})))

      IObj
      (withMeta [this meta] (CausalList. (with-meta ^IObj (.ct this) meta)))

      IMeta
      (meta [this] (.meta ^IMeta (.ct this))))
    :cljs
    (deftype CausalList [ct]
      ICounted
      (-count [this] (-count (vec (s/causal->edn this {:deref-atoms false}))))

      IEmptyableCollection
      (-empty [this] (CausalList. (empty- (.-ct this))))

      ICollection
      (-conj [this o] (CausalList. (conj- (.-ct this) o)))

      IEquiv
      (-equiv [this other] (-equiv (.-ct this) other))

      IPrintWithWriter
      (-pr-writer [o writer opts]
        (-write writer (str "#causal/list " (pr-str {:causal->edn (s/causal->edn o)
                                                     :ct (.-ct o)}))))

      IHash
      (-hash [this] (-hash (.-ct this)))

      ISeqable
      (-seq [this] (-seq (s/causal->edn this {:deref-atoms false})))

      Object
      (toString [this] (.toString (s/causal->edn this)))

      IMeta
      (-meta [this] (-meta (.-ct this)))

      IWithMeta
      (-with-meta [this meta] (CausalList. (-with-meta (.-ct this) meta)))))

#? (:clj (defmethod print-method CausalList [^CausalList o ^java.io.Writer w]
           (.write w (str "#causal/list " (pr-str {:causal->edn (s/causal->edn o)
                                                   :ct (.ct o)})))))

(defn read-edn-map
  [read-object]
  (let [[ct] read-object]
    (CausalList. ct)))

#? (:cljs (cljs.reader/register-tag-parser! 'causal/list read-edn-map))

(extend-type CausalList
  proto/CausalTree
  (get-uuid [this] (::s/uuid (.-ct this)))
  (get-ts [this] (::s/lamport-ts (.-ct this)))
  (get-site-id [this] (::s/site-id (.-ct this)))
  (get-weave [this] (::s/weave (.-ct this)))
  (insert [this node]
    (CausalList. (s/insert weave (.-ct this) node)))
  (append [this cause value]
    (CausalList. (s/append weave (.-ct this) cause value)))
  (weft [this ids-to-cut-yarns]
    (CausalList. (s/weft weave new-causal-tree (.-ct this) ids-to-cut-yarns)))
  (causal-merge [causal-list1 ^CausalList causal-list2]
    (CausalList. (s/merge-trees weave (.-ct causal-list1) (.-ct causal-list2))))

  proto/CausalTo
  (causal->edn [causal opts]
    (causal-list->edn (.-ct causal) opts)))

(defn new-causal-list
  "Creates a new causal list containing the items."
  [& items]
  (apply conj (CausalList. (new-causal-tree)) items))

(comment
  (do
    (def ct (atom (new-causal-list "f" "o" "o")))
    (swap! ct conj " ")
    (swap! ct conj "b" "a" "r")
    (swap! ct proto/append (first (second (proto/get-weave @ct))) ::s/delete)
    (swap! ct proto/append (first (second (proto/get-weave @ct))) "g"))
  (count @ct)
  (hash @ct)
  (str @ct)
  (deref ct)
  (empty @ct)
  (def ct2 (atom @ct))
  (swap! ct conj ct2)
  (= @ct @ct2)
  (deref ct)
  (cons "wat" @ct)
  (get @ct 0)
  (type->str (type @ct))
  (str (type @ct))
  (instance? cause.list.CausalList @ct)
  (s/causal->edn @ct {:deref-atoms false})
  (s/causal->edn @ct)
  (vec @ct)
  (first @ct)
  (ffirst @ct)
  (second @ct)
  (last @ct)
  (next @ct)
  (rest @ct)
  (map clojure.string/upper-case @ct)
  (reduce conj [] @ct)
  (into [] @ct)
  (empty? @ct)
  (empty? (new-causal-list))
  (+ 1 1))
