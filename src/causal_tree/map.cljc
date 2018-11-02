(ns causal-tree.map
  (:require [causal-tree.util :as u :refer [<<]]
            [causal-tree.shared :as s]
            #? (:cljs [cljs.reader :as reader]))
  #? (:clj
      (:import (clojure.lang IPersistentCollection IPersistentMap IHashEq Associative ILookup Counted Seqable IMapIterable IKVReduce IFn IObj IMeta)
               (java.io Writer)
               (java.util Date Collection)
               (java.lang Object))))

(defn new-causal-tree []
  {::s/type ::s/map
   ::s/lamport-ts 0
   ::s/guid (u/guid)
   ::s/site-id (s/site-id)
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
           (map s/node (sort (::s/nodes causal-tree)))))
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

; Specialty helper functions

(defn get-
  ([causal-tree k]
   (last (first (get-in causal-tree [::s/weave k])))))

(defn count- [causal-tree]
  (reduce-kv
   (fn [acc k v] (if (not= (last (first v)) ::s/delete) (inc acc) acc))
   0 (::s/weave causal-tree)))

(defn assoc-
  ([causal-tree k v]
   (if (not= v (get- causal-tree k)) ; don't set a key to the same value twice
     (s/append causal-tree k v weave)
     causal-tree))
  ([causal-tree k v & kvs]
   (apply assoc- (assoc- causal-tree k v) kvs)))

(defn dissoc-
  ([causal-tree k]
   (if (get- causal-tree k) ; only delete keys that are already in the tree
     (s/append causal-tree k ::s/delete weave)
     causal-tree))
  ([causal-tree k & ks]
   (apply dissoc- (dissoc- causal-tree k) ks)))

(defn empty- [causal-tree]
  (conj (new-causal-tree) (select-keys causal-tree [::s/site-id ::s/guid])))

#? (:clj
    (deftype CausalMap [ct]
      Counted
      (count [this] (count- (.ct this)))

      IPersistentCollection
      (cons [this o] (CausalMap. (apply assoc- (.ct this) (flatten (vec o)))))
      (empty [this] (CausalMap. (empty- (.ct this))))
      (equiv [this other] (.equiv ^IPersistentCollection (.ct this) other))

      IPersistentMap
      (assoc [this k v] (CausalMap. (assoc- (.ct this) k v)))
      (assocEx [this k v] (throw (Exception.)))
      (without [this k] (CausalMap. (dissoc- (.ct this) k)))

      Object
          ; TODO: what should equality mean? Should it be maps that materialize
          ;   to the same value? Or maps with the same UUID even if they are at
          ;   different timestamps? Or should all the nodes have to match?
      (equals [this o] (.equals (.ct this) o))
      (hashCode [this] (.hashCode (.ct this)))
      (toString [this] (.toString (s/ct->edn (.ct this))))

      ILookup
      (valAt [this k] (get- (.ct this) k))
      (valAt [this k not-found] (or (.valAt this k) not-found))

      IMapIterable
      (keyIterator [this] (.keyIterator ^IMapIterable (s/ct->edn (.ct this) :deref-atoms false)))
      (valIterator [this] (.valIterator ^IMapIterable (s/ct->edn (.ct this) :deref-atoms false)))

      IKVReduce
      (kvreduce [this f init] (.kvreduce ^IKVReduce (s/ct->edn (.ct this) :deref-atoms false) f init))

      IHashEq
      (hasheq [this] (.hasheq ^IHashEq (.ct this)))

      Seqable
      (seq [this] (.seq ^Seqable (s/ct->edn (.ct this) :deref-atoms false)))

      IFn
      (invoke [this k] (.invoke ^IFn (.ct this) k))
      (invoke [this k not-found] (.invoke ^IFn (.ct this) k not-found))

      IObj
      (withMeta [this meta] (CausalMap. (with-meta ^IObj (.ct this) meta)))

      IMeta
      (meta [this] (.meta ^IMeta (.ct this))))
    :cljs
    (deftype CausalMap [ct]
      ICounted
      (-count [this] (count- (.-ct this)))

      IEmptyableCollection
      (-empty [this] (CausalMap. (empty- (.-ct this))))

      ICollection
      (-conj [this o] (CausalMap. (apply assoc- (.-ct this) (flatten (vec o)))))

      IAssociative
      (-contains-key? [this k] (some? (get- (.-ct this) k)))
      (-assoc [this k v] (assoc- (.-ct this) k v))

      IFind
      (-find [this k] (get- (.-ct this) k))

      IMap
      (-dissoc [this k] (dissoc- (.-ct this) k))

      IKVReduce
      (-kv-reduce [this f init] (-kv-reduce (s/ct->edn (.-ct this) :deref-atoms false) f init))

      IEquiv
      (-equiv [this other] (-equiv (.-ct this) other))

      ILookup
      (-lookup [this o] (get- (.-ct this) o))
      (-lookup [this o not-found] (-lookup (.-ct this) o not-found))

      IPrintWithWriter
      (-pr-writer [o writer opts]
        (-write writer (str "#ct/map " (pr-str {:ct->edn (s/ct->edn (.-ct o))
                                                :ct (.-ct o)}))))

      IHash
      (-hash [this] (-hash (.-ct this)))

      IFn
      (-invoke [this o] ((.-ct this) o))
      (-invoke [this o not-found] ((.-ct this) o not-found))

      ISeqable
      (-seq [this] (-seq (s/ct->edn (.-ct this) :deref-atoms false)))

      Object
      (toString [this] (.toString (s/ct->edn (.-ct this))))

      IMeta
      (-meta [this] (-meta (.-ct this)))

      IWithMeta
      (-with-meta [this meta] (CausalMap. (-with-meta (.-ct this) meta)))))

#? (:clj (defmethod print-method CausalMap [o ^java.io.Writer w]
           (.write w (str "#ct/map " (pr-str {:ct->edn (s/ct->edn (.ct o))
                                              :ct (.ct o)})))))

(defn read-edn-map
  [read-object]
  (let [[ct] read-object]
    (CausalMap. ct)))

#? (:cljs (cljs.reader/register-tag-parser! 'ct/map read-edn-map))

(defn new-causal-map []
  (CausalMap. (new-causal-tree)))

(comment
  (do
    (def ct (atom (new-causal-map)))
    (swap! ct assoc :foo "bar")
    (swap! ct assoc :fizz "bang")
    (swap! ct dissoc :foo)
    (swap! ct assoc :foo "bop")
    (swap! ct assoc :flip "flop"))
  (swap! ct dissoc :fizz)
  (count @ct)
  (hash @ct)
  (str @ct)
  (deref ct)
  (count- (.ct @ct))
  (cons {:a 1} {:a 2 :b 3})
  (empty @ct)
  (def ct2 (atom @ct))
  (swap! ct2 assoc :foo "bing")
  (swap! ct assoc :ct2 ct2)
  (= @ct @ct2)
  (deref ct)
  (cons "wat" @ct)
  (conj @ct {:a 2 :b 3 :foo "wat"})
  (get @ct :fizz)
  (:foo @ct)
  (@ct ::s/guid)
  (get @ct :gloop "glop")
  (keys @ct)
  (vals @ct)
  (type @ct)
  (s/ct->edn @ct :deref-atoms false)
  (s/ct->edn @ct)
  (seq @ct)
  (first @ct)
  (ffirst @ct)
  (second @ct)
  (last @ct)
  (next @ct)
  (rest @ct)
  (map (partial map clojure.string/upper-case) @ct)
  (reduce-kv conj [] @ct)
  (empty? @ct)
  (swap! ct dissoc :foo)
  (swap! ct dissoc :fizz)
  (swap! ct dissoc :flip)
  (empty? @ct)
  (+ 1 1))
