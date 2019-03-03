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
   ::s/uuid (u/new-uid)
   ::s/site-id (s/new-site-id)
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
    (s/special-keywords (peek nr)) ; if the next node is a hide or a show
    (not= (first nm) (second nr)) ; and it does not hide or show this node
    (or (not (s/special-keywords (peek nm))) ; and this node is not also a hide or a show
        (<< (first nm) (first nr)))) ; or if it is, but it is older, don't weave.
   (and
    (or (= (first nl) (second nr)) ; if the next node is caused by the previous node
        (= (second nl) (second nr)) ; or if the next node shares a cause with the previous node
        (get seen (second nr))) ; or the next node is caused by a seen node
    (<< (first nm) (first nr)) ; and this node is older
    (or (not (s/special-keywords (peek nm))) ; and this node is not a hide or a show
        (s/special-keywords (peek nr)))) ; or the next node is a hide or a show, don't weave.
   (and
    (<< (first nm) (first nr)) ; if this node is older than the next
    (or (not (s/special-keywords (peek nm))) ; and this node is not a hide or a show
        (s/special-keywords (peek nr)))))) ; or the next node is a hide or a show, don't weave.

(defn weave
  "Returns a causal tree with its nodes ordered into a weave O(n^2).
  If a node is passed only that node will be woven in O(n). If
  more nodes are passed after the initial node they will be
  woven in immediately after `node`, keeping the complexity at O(n)
  when weaving in transactions of node sequences."
  ([causal-tree]
   (reduce weave (assoc causal-tree ::s/weave [])
           (map s/new-node (sort (::s/nodes causal-tree)))))
  ([causal-tree node] (weave causal-tree node nil))
  ([causal-tree node more-consecutive-nodes-in-same-tx]
   (if (not (get-in causal-tree [::s/nodes (first node)]))
     causal-tree
     (loop [left []
            right (::s/weave causal-tree)
            prev-asap false
            seen-since-asap {}]
       (let [nl (peek left)
             nr (first right)
             asap (or prev-asap (weave-asap? nl node nr))]
         (if (or (empty? right)
                 (and asap (not (weave-later? nl node nr seen-since-asap))))
           (assoc causal-tree ::s/weave (into left cat [[node] more-consecutive-nodes-in-same-tx right]))
           (recur (conj left nr) (rest right) asap (if asap
                                                     (assoc seen-since-asap
                                                            (first nl) true)
                                                     seen-since-asap))))))))

(defn conj-
  ([causal-tree v & vs]
   (apply conj- (conj- causal-tree v) vs))
  ([causal-tree v]
   (s/append weave causal-tree (first (peek (::s/weave causal-tree))) v)))

(defn cons- [v causal-tree]
  (s/append weave causal-tree s/root-id v))

(defn empty- [causal-tree]
  (conj (new-causal-tree) (select-keys causal-tree [::s/site-id ::s/uuid])))

(defn hide?
  "Is this node hidden when the weave is rendered"
  [node next-node-in-weave]
  (or (s/special-keywords (peek node))
      (and (= ::s/hide (peek next-node-in-weave))
           (= (first node) (second next-node-in-weave)))
      (= s/root-node node)))

(defn causal-list->edn
  "Returns the current state of the tree as edn. E.g. a tree of chars
  will materialize as a string. This is mostly for testing and pretty
  printing. In most cases it's prefferable to work with the whole tree."
  [causal-tree opts]
  (->> (::s/weave causal-tree)
       (partition 2 1 [nil])
       (keep (fn [[n nr]]
               (if (hide? n nr) nil
                   (s/causal->edn (peek n) opts))))))

(defn causal-list->list [causal-tree]
  (->> (::s/weave causal-tree)
       (partition 2 1 [nil])
       (keep (fn [[n nr]]
               (if (hide? n nr) nil n)))))

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
      (toString [this] (.toString (causal-list->list (.ct this))))

      IHashEq
      (hasheq [this] (.hasheq ^IHashEq (.ct this)))

      Seqable
      (seq [this] (.seq ^Seqable (causal-list->list (.ct this))))

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
      (-seq [this] (-seq (causal-list->list (.-ct this))))

      Object
      (toString [this] (.toString (causal-list->list (.-ct this))))

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
  (insert
    ([this node]
     (CausalList. (s/insert weave (.-ct this) node)))
    ([this node more-nodes]
     (CausalList. (s/insert weave (.-ct this) node more-nodes))))
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
    (swap! ct proto/append (first (second @ct)) ::s/hide)
    (swap! ct proto/append (ffirst @ct) "g"))
  (seq @ct)
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
  (peek @ct)
  (next @ct)
  (rest @ct)
  (map (comp clojure.string/upper-case last) (rest @ct))
  (reduce conj [] @ct)
  (into [] @ct)
  (vec @ct)
  (empty? @ct)
  (empty? (new-causal-list))
  (+ 1 1))
