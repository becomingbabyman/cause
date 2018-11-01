(ns causal-tree.map
  (:require
   [causal-tree.util :as u :refer [<<]]
   [causal-tree.shared :as s])
  #? (:clj (:import (clojure.lang IPersistentCollection IPersistentMap IHashEq Associative ILookup Counted Seqable IMapIterable IKVReduce IFn IObj IMeta)
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

(deftype CausalMap [ct]
  Counted
  (count [this] (count- (.ct this)))

  IPersistentCollection
  (cons [this o] (CausalMap. (apply assoc- (.ct this) (flatten (vec o)))))
  (empty [this] (CausalMap. (conj (new-causal-tree) (select-keys (.ct this) [::s/site-id ::s/guid]))))
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
  (toString [this] (.toString (s/ct->edn (.ct this)))))

(defmethod print-method CausalMap [o ^java.io.Writer w]
  (.write w (str "#ct/map " (pr-str {:ct->edn (s/ct->edn (.ct o))
                                     :ct (.ct o)}))))

(defn new-causal-map []
  (CausalMap. (new-causal-tree)))

(comment
  (def ct (atom (new-causal-map)))
  (swap! ct assoc :foo "bar")
  (swap! ct assoc :foo "bop")
  (swap! ct dissoc :foo)
  (swap! ct assoc :fizz "bang")
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
  (= @ct @ct2)
  (deref ct)
  (cons @ct {:a 2 :b 3 :foo "wat"}) ; TODO: implement cons? IPersistentCollection cons is actually conj...
  (conj @ct {:a 2 :b 3 :foo "wat"})
  (apply assoc {:a 1} (flatten (vec {:a 2 :b 3})))
  (::s/lamport-ts (.ct @ct))
  (select-keys (new-causal-tree) [::s/lamport-ts ::s/guid]))
