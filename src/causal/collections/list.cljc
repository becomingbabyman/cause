(ns causal.collections.list
  (:require [causal.util :as u]
            [causal.collections.shared :as s]
            [causal.protocols :as proto]
            #? (:cljs [cljs.reader]))
  #? (:clj (:import (clojure.lang IPersistentCollection IPersistentStack IReduce Counted IHashEq Seqable IObj IMeta ISeq)
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
     (->> (s/weave-node (::s/weave causal-tree) node more-consecutive-nodes-in-same-tx)
          (assoc causal-tree ::s/weave)))))

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
      (and (or (= :causal/hide (peek next-node-in-weave))
               (= :causal/h.hide (peek next-node-in-weave)))
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
      (count [this] (.count (s/causal->edn this)))

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
      (meta [this] (.meta ^IMeta (.ct this)))))
#? (:cljs
    (deftype CausalList [ct]
      ICounted
      (-count [this] (-count (vec (s/causal->edn this))))

      IEmptyableCollection
      (-empty [this] (CausalList. (empty- (.-ct this))))

      ICollection
      (-conj [this o] (CausalList. (conj- (.-ct this) o)))

      IEquiv
      (-equiv [this other] (-equiv (.-ct this) other))

      IPrintWithWriter
      (-pr-writer [o writer opts]
        (-write writer (str "#causal/list " (pr-str (.-ct o)))))

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
           (.write w (str "#causal/list " (pr-str (.-ct o))))))

(defn read-edn
  [ct]
  (CausalList. ct))

#? (:cljs (cljs.reader/register-tag-parser! 'causal/list read-edn))

(extend-type CausalList
  proto/CausalMeta
  (get-uuid [this] (::s/uuid (.-ct this)))
  (get-ts [this] (::s/lamport-ts (.-ct this)))
  (get-site-id [this] (::s/site-id (.-ct this)))

  proto/CausalTree
  (get-weave [this] (::s/weave (.-ct this)))
  (get-nodes [this] (::s/nodes (.-ct this)))
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
  (causal->edn
    ([this] (proto/causal->edn this {}))
    ([causal opts] (causal-list->edn (.-ct causal) opts))))

(defn new-causal-list
  "Creates a new causal list containing the items."
  [& items]
  (apply conj (CausalList. (new-causal-tree)) items))

(comment
  (do
    (def ct (atom (new-causal-list "f" "o" "o")))
    (swap! ct conj " ")
    (swap! ct conj "b" "a" "r")
    (swap! ct proto/append (first (second @ct)) :causal/hide)
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
  (str (type @ct))
  (instance? causal.collections.list.CausalList @ct)
  (s/causal->edn @ct)
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
