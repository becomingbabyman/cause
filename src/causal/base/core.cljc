(ns causal.base.core
  "Like a database, but for nested causal collections."
  (:require [clojure.spec.alpha :as spec]
            [causal.util :as u :refer [<<]]
            [causal.collections.shared :as s]
            [causal.protocols :as proto]
            [causal.collections.list :as c.list]
            [causal.collections.map :as c.map]
            #? (:cljs [causal.collections.list :refer [CausalList]])
            #? (:cljs [causal.collections.map :refer [CausalMap]]))
  #? (:clj
      (:import (causal.collections.list CausalList)
               (causal.collections.map CausalMap)
               (clojure.lang Keyword IPersistentCollection IPersistentStack IReduce Counted IHashEq Seqable IObj IMeta ISeq)
               (java.io Writer)
               (java.util Date Collection)
               (java.lang Object))))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;; Schema ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(spec/def ::path (spec/keys :req [::s/uuid ::s/node]))
(spec/def ::reverse-path (spec/tuple ::s/id ::s/uuid)) ; Starts with id to make sorting easier
(spec/def ::history (spec/coll-of ::reverse-path ::gen-max 3)) ; Sorted log of all insertions
(spec/def ::first-undo-lamport-ts ::s/lamport-ts) ; The first lamport-ts on the current undo stack, redo should never go past this
(spec/def ::last-undo-lamport-ts ::s/lamport-ts) ; The most recently undone lamport-ts
(spec/def ::last-redo-lamport-ts ::s/lamport-ts) ; The most recently redone lamport-ts
(spec/def ::root-uuid ::s/uuid)
; TODO: ::collections actually stores CausalTrees not ::s/causal-trees...
(spec/def ::collections (spec/map-of ::s/uuid ::s/causal-tree :gen-max 3))
(spec/def ::causal-base (spec/keys :req [::s/uuid
                                         ::s/lamport-ts
                                         ::s/site-id
                                         ::history
                                         ::first-undo-lamport-ts
                                         ::last-undo-lamport-ts
                                         ::last-redo-lamport-ts
                                         ::root-uuid
                                         ::collections]))
; TODO: add a 4th optional slot to the tx-part tuple for `::raw-value?`
; TODO: should ::s/value be replaced with another type of "value" since it
;   can be processed and broken into many sub ::s/values by the transact fn?
(spec/def ::tx-part (spec/tuple ::s/uuid ::s/cause ::s/value))
(spec/def ::tx (spec/coll-of ::tx-part :gen-max 3))

(defn new-cb
  "Like a database, but comprised of nested causal collections. If you
  want to nest causal collections and you want them to share history
  use this."
  []
  {::s/lamport-ts 1
   ::s/uuid (u/new-uid)
   ::s/site-id (s/new-site-id)
   ::history []
   ::first-undo-lamport-ts nil
   ::last-undo-lamport-ts nil
   ::last-redo-lamport-ts nil
   ::root-uuid nil
   ::collections {}})

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;; Helpers ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(def ref-ns "causal.collection.ref")

(defn uuid->ref [uuid]
  (keyword ref-ns uuid))

(defn causal->ref [causal]
  (uuid->ref (proto/get-uuid causal)))

(defn ref? [v]
  (and (keyword? v) (= ref-ns (namespace v))))

(defn ref->uuid [ref]
  (name ref))

(defn get-collection-
  "If no uuid or ref specified returns the root causal collection."
  ([cb] (get-collection- cb (::root-uuid cb)))
  ([cb uuid-or-ref]
   (when uuid-or-ref
     (get-in cb [::collections (ref->uuid uuid-or-ref)]))))

(extend-type Keyword
  proto/CausalTo
  (causal->edn
    ([this] (proto/causal->edn this {}))
    ([this {:keys [cb] :as opts}]
     (if (and cb (ref? this))
       (s/causal->edn (get-collection- cb this) opts) ; TODO: HANDLE: this could cause infinite recursion if two trees reference each other. Break out out after visiting each ref once, or throw if that happens
       this))))

(defn cb->edn
  ([cb] (cb->edn cb {}))
  ([cb opts]
   (let [causal (get-collection- cb)]
     (s/causal->edn causal (merge opts {:cb cb})))))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;; Transact ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn new-node
  "Returns a new local node and an incremented tx-index `[tx-index node]`"
  [cb tx-index cause value]
  [(inc tx-index)
   (s/new-node (::s/lamport-ts cb) (::s/site-id cb) (or tx-index 0)
               cause value)])

(defn insert
  "Inserts the `nodes` in a causal collection specified by `uuid` and
  updates the history of the containing `cb`. List nodes must be
  sequential. Returns a cb"
  [cb uuid nodes]
  (let [reverse-paths (map (fn [[id]] [id uuid]) nodes)]
    (-> cb
        (update-in [::collections uuid] #(proto/insert % (first nodes) (rest nodes)))
        (update ::history u/insert (first reverse-paths) {:next-vals (next reverse-paths)}))))

(defn add-collection-of-this-values-type-to-cb [cb value & {:keys [is-root?]}]
  (if-let [causal (cond
                    (map? value) (c.map/new-causal-map)
                    (seqable? value) (c.list/new-causal-list)
                    :else nil)]
    (let [uuid (proto/get-uuid causal)
          cb (assoc-in cb [::collections uuid] causal)
          cb (if is-root? (assoc cb ::root-uuid uuid) cb)]
      [cb uuid])
    [cb nil]))

(declare flatten-value)

(defn map->nodes
  "Returns `[cb tx-index nodes]`"
  [cb tx-index map-value]
  (reduce-kv (fn [[cb tx-index nodes] k v]
               (let [[cb tx-index flat-v] (flatten-value cb tx-index v :preserve-strings? true)
                     [tx-index node] (new-node cb tx-index k flat-v)]
                 [cb tx-index (conj nodes node)]))
             [cb tx-index []]
             map-value))

(defn list->nodes
  "Returns `[cb tx-index nodes last-node-id]`"
  ([cb tx-index list-value]
   (list->nodes cb tx-index list-value nil))
  ([cb tx-index list-value cause]
   (let [is-string? (string? list-value)
         ; value (if is-string? (u/char-seq list-value) list-value) ; TODO: OPTIMIZE: u/char-seq breaks on large strings and does not group 4 byte unicode chars like "🤟🏿"
         value (if is-string? (seq list-value) list-value)]
     (reduce (fn [[cb tx-index nodes cause] v]
               (if (and (not is-string?) (string? v))
                 (let [[cb tx-index more-nodes next-cause] (list->nodes cb tx-index v cause)]
                   [cb tx-index (into nodes more-nodes) next-cause])
                 (let [[cb tx-index flat-v] (flatten-value cb tx-index v :preserve-strings? is-string?)
                       [tx-index node] (new-node cb tx-index cause flat-v)]
                   [cb tx-index (conj nodes node) (first node)])))
             [cb tx-index [] (or cause s/root-id)]
             value))))

(defn flatten-collection
  [cb tx-index value node-fn]
  (let [[cb uuid] (add-collection-of-this-values-type-to-cb cb value)
        [cb tx-index nodes] (node-fn cb tx-index value)
        cb (insert cb uuid nodes)
        collection-ref (uuid->ref uuid)]
    [cb tx-index collection-ref]))

(defn flatten-value
  [cb tx-index value & {:keys [preserve-strings?]}]
  (cond
    (and preserve-strings? (string? value)) [cb tx-index value]
    (map? value) (flatten-collection cb tx-index value map->nodes)
    (seqable? value) (flatten-collection cb tx-index value list->nodes)
    :else [cb tx-index value]))

(defn value->nodes
  "Returns `[cb tx-index nodes]`"
  [cb tx-index cause value]
  (cond
    ; (and preserve-strings? (string? value)) [cb tx-index value]
    (map? value) (map->nodes cb tx-index value)
    (seqable? value) (list->nodes cb tx-index value cause)
    :else (let [[tx-index node] (new-node cb tx-index cause value)]
            [cb tx-index [node]])))

(defn merge-value-into-parent-collection?
  [cb uuid cause value]
  (let [causal (get-in cb [::collections uuid])]
    (cond
      (and (not cause) (map? value) (instance? CausalMap causal)) true
      (and (not (map? value)) (seqable? value) (instance? CausalList causal)) true
      :else false)))

(defn handle-tx-part-value [cb [uuid cause value :as tx-part] tx-index]
  (let [causal (get-in cb [::collections uuid])]
    (if (merge-value-into-parent-collection? cb uuid cause value)
      (let [[cb tx-index nodes] (value->nodes cb tx-index cause value)
            cb (insert cb uuid nodes)]
        [cb tx-index])
      (let [[cb tx-index flat-value] (flatten-value cb tx-index value :preserve-strings? (instance? CausalMap causal))
            [tx-index node] (new-node cb tx-index cause flat-value)
            cb (insert cb uuid [node])]
        [cb tx-index]))))

(defn handle-tx-part-potential-root
  "A tx-part without a `uuid` will create a new root collection."
  [cb [uuid _ value :as tx-part]]
  (if uuid
    [cb uuid]
    (add-collection-of-this-values-type-to-cb cb value :is-root? true)))

(defn validate-tx-part [cb [uuid _ value :as tx-part]]
  (let [causal (get-in cb [::collections uuid])]
    (when (and uuid (not (::root-uuid cb)))
      (throw (ex-info "Please transact a root collection first by setting uuid and cause to nil"
                      {:value value})))
    (when (and uuid (not causal))
      (throw (ex-info "Collection with provided uuid not found"
                      {:uuid uuid})))
    (when (and (not uuid) (not (coll? value)))
      (throw (ex-info "Root node must satisfy the coll? predicate"
                      {:value value})))))

(defn handle-tx-part
  "Performs one tx-part in a transaction. `value`s with EDN collections will be converted to causal
  collections. Nested collections will be flattened into the collections map
  and referenced by their uuid."
  [cb [_ cause value :as tx-part] tx-index]
  (let [_ (validate-tx-part cb tx-part)
        [cb uuid] (handle-tx-part-potential-root cb tx-part)
        [cb tx-index] (handle-tx-part-value cb [uuid cause value] tx-index)]
    [cb tx-index]))

(defn transact-
  "Takes a causal-base and a transaction. The tx is in the format of
  `[[collection-uuid cause value] ...]`
  where value is a scalar or collection that has a causal implementation
  (including vectors). Automatically manages lamport-ts and tx-index when
  transacting into multiple collections in a causal-base. The monotonic
  increasing of tx-index will correspond to the order of `tx-parts` and
  the values in them. Transforms EDN values to their corresponding causal
  collections."
  [cb tx]
  (loop [cb cb
         [tx-part & tx] tx
         tx-index 0]
    (if tx-part
      (let [[cb tx-index] (handle-tx-part cb tx-part tx-index)]
        (recur cb tx tx-index))
      (-> cb
          (update ::s/lamport-ts inc)
          (assoc ::first-undo-lamport-ts nil
                 ::last-undo-lamport-ts nil
                 ::last-redo-lamport-ts nil)))))
; TODO: retract whole collections
; TODO: retract contiguous chunks from [uuid1, id1] -> [uuid2, id2]
; TODO: normalize transaction / abort if can't normalize
;   Normalization is probably a fn or schema that gets passed to transact

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;; History ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn expand-reverse-path
  "Returns the `[node collection]` for a reverse-path"
  [cb [id uuid]]
  (let [collection (get-collection- cb uuid)
        node (into [id] (get (proto/get-nodes collection) id))]
    [node collection]))

(defn reverse-path->path [cb [id uuid]]
  (let [[node collection] (expand-reverse-path cb [id uuid])]
    {::s/uuid uuid
     ::s/node node}))

(defn tx-id-indexes
  "Returns `[tx-start-i tx-end-i]` of the reverse-paths
  relating to a specific tx-id in the history."
  [cb tx-id]
  (if (nil? tx-id)
    [nil nil]
    (let [history (::history cb)
          tx-start-node-id (into tx-id [0])
          tx-start-i (u/binary-search history
                                      tx-start-node-id
                                      #(= (first %1) %2)
                                      #(<< (first %1) %2))
          tx-end-i (if (not (int? tx-start-i))
                     nil
                     (loop [i tx-start-i]
                       (let [rp (nth history (inc i) nil)]
                         (if (and rp (= tx-id (pop (first rp))))
                           (recur (inc i))
                           i))))]
      [tx-start-i tx-end-i])))

(defn subhis
  "Returns a slice of history between start and end tx-ids inclusive.
  The 2 arity form slices out a the history for a single tx-id.
  Set start-tx-id to nil for the start and
  set end-tx-id to nil for the end."
  ([cb tx-id]
   (subhis cb tx-id tx-id))
  ([cb start-tx-id end-tx-id]
   (let [history (::history cb)
         [start-tx-i end-tx-i] (tx-id-indexes cb start-tx-id)
         [_ end-tx-i] (if (= start-tx-id end-tx-id)
                        [start-tx-i end-tx-i]
                        (tx-id-indexes cb end-tx-id))]
     (if (or (and (vector? start-tx-id) (nil? start-tx-i))
             (and (vector? end-tx-id) (nil? end-tx-i)))
       [] ; Return [] if start-tx-id or end-tx-id is not found in history
       (if end-tx-i
         (subvec history (or start-tx-i 0) (inc end-tx-i))
         (subvec history (or start-tx-i 0)))))))

(defn invert-path
  "Generates an inverted tx-part given a path"
  [{:keys [::s/uuid] [id cause value] ::s/node}]
  (case value
    :causal/hide [uuid cause :causal/h.show]
    :causal/h.hide [uuid cause :causal/h.show]
    :causal/h.show [uuid cause :causal/h.hide]
    [uuid id :causal/h.hide]))

(defn invert-
  "Returns a causal-base with a slice of its history inverted. Attempts
  to invert the supplied history with as few tx-parts as possible."
  [cb history-to-invert]
  (let [paths (map (partial reverse-path->path cb)
                   ; reverse the history so the oldest changes get transacted last (will overried newer changes at the same cause)
                   (reverse history-to-invert))
        soon-to-be-hidden-uuids (->> paths
                                     (filter (comp ref? peek ::s/node))
                                     (map (comp ref->uuid peek ::s/node))
                                     (set))
        ; remove nested paths that are about to have their parent collection (uuid)
        ; hidden cuts down on the size of the tx without changing the end result
        not-nested-paths (filter (comp not soon-to-be-hidden-uuids ::s/uuid) paths)
        tx (map invert-path not-nested-paths)
        ; only keep the last tx-part for each [uuid cause] pair
        tx (vals
            (reduce
             (fn [acc [uuid c :as tx-part]]
               (assoc acc [uuid c] tx-part))
             {} tx))]
    (transact- cb tx)))

(defn reset-
  "Undoes all transactions going back to the provided tx-id"
  ([cb tx-id]
   (subhis cb tx-id nil))
  ([cb tx-id site-ids]
   (->> (subhis cb tx-id nil)
        (filter (comp (set site-ids) second first))
        (invert- cb))))

(defn get-next-tx-id
  "Returns the tx-id that is next in line to be undone or redone."
  [cb last-undo-or-redo-ts]
  (let [remaining-history (if last-undo-or-redo-ts
                            (subhis cb nil [(dec last-undo-or-redo-ts) (::s/site-id cb)])
                            (::history cb))
        next-lamport-ts (loop [remaining-history remaining-history]
                          (if (empty? remaining-history)
                            nil
                            (let [[[lamport-ts site-id]] (peek remaining-history)]
                              (if (= site-id (::s/site-id cb))
                                lamport-ts
                                (recur (pop remaining-history))))))]
    (if next-lamport-ts
      [next-lamport-ts (::s/site-id cb)]
      nil)))

; TODO: add an optional argument for steps. Some way to undo multiple
;  txs at once, maybe something like a min-tx-parts. This way large
;  txs can fill 1 undo on their own, but small txs will be grouped together.
;  TODO: do the same for redo-
(defn undo-
  "Returns a cb with the next transaction in the 'undo stack' undone."
  [cb]
  (let [next-undo-tx-id (get-next-tx-id cb (::last-undo-lamport-ts cb))]
    (if (nil? next-undo-tx-id)
      cb
      (let [reverse-paths (->> (subhis cb next-undo-tx-id)
                               (filter (comp (partial = (::s/site-id cb)) second first)))
            first-undo-lamport-ts (if (::first-undo-lamport-ts cb)
                                    (::first-undo-lamport-ts cb)
                                    (first next-undo-tx-id))]
        (-> cb
            (invert- reverse-paths)
            (assoc ::first-undo-lamport-ts first-undo-lamport-ts
                   ::last-undo-lamport-ts (first next-undo-tx-id)
                   ::last-redo-lamport-ts nil))))))

(defn redo-
  "Returns a cb with the previous transacrtion in the 'undo stack' undone"
  [cb]
  (let [next-redo-tx-id (get-next-tx-id cb (::last-redo-lamport-ts cb))
        next-redo-lamport-ts (first next-redo-tx-id)
        first-undo-lamport-ts (::first-undo-lamport-ts cb)
        last-undo-lamport-ts (::last-undo-lamport-ts cb)]
    (if (or (nil? first-undo-lamport-ts)
            (nil? next-redo-tx-id)
            (<= next-redo-lamport-ts first-undo-lamport-ts)) ; do not allow redoing past the first undo step
      cb
      (let [reverse-paths (->> (subhis cb next-redo-tx-id)
                               (filter (comp (partial = (::s/site-id cb)) second first)))]
        (-> cb
            (invert- reverse-paths)
            (assoc ::first-undo-lamport-ts first-undo-lamport-ts
                   ::last-undo-lamport-ts last-undo-lamport-ts
                   ::last-redo-lamport-ts next-redo-lamport-ts))))))

; (defn log- [cb & site-id] (println "TODO"))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;; CausalBase ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

#? (:clj
    (deftype CausalBase [cb]))

#? (:cljs
    (deftype CausalBase [cb]
      IPrintWithWriter
      (-pr-writer [o writer opts]
        (-write writer (str "#causal/base " (pr-str cb))))))

#? (:clj (defmethod print-method CausalBase [^CausalBase o ^java.io.Writer w]
           (.write w (str "#causal/base " (pr-str (.-cb o))))))

(defn read-edn
  [cb]
  (CausalBase. cb))

#? (:cljs (cljs.reader/register-tag-parser! 'causal/base read-edn))

(extend-type CausalBase
  proto/CausalBase
  (transact [this tx] (CausalBase. (transact- (.-cb this) tx)))
  (get-collection
    ([this] (get-collection- (.-cb this)))
    ([this ref-or-uuid] (get-collection- (.-cb this) ref-or-uuid)))
  (undo [this] (CausalBase. (undo- (.-cb this))))
  (redo [this] (CausalBase. (redo- (.-cb this))))
  (set-site-id [this site-id] (CausalBase. (assoc (.-cb this) ::s/site-id site-id)))
  (set-uuid [this uuid] (CausalBase. (assoc (.-cb this) ::s/uuid uuid)))

  proto/CausalMeta
  (get-uuid [this] (::s/uuid (.-cb this)))
  (get-ts [this] (::s/lamport-ts (.-cb this)))
  (get-site-id [this] (::s/site-id (.-cb this)))

  proto/CausalTo
  (causal->edn
    ([this] (proto/causal->edn this {}))
    ([this opts] (cb->edn (.-cb this) opts))))

(defn new-causal-base
  "Creates a new causal base."
  []
  (CausalBase. (new-cb)))
