(ns cause.base
  "Like a database, but for nested causal collections."
  (:require [clojure.spec.alpha :as spec]
            [cause.util :as u :refer [<<]]
            [cause.shared :as s]
            [cause.protocols :as proto]
            [cause.list :as c.list]
            [cause.map :as c.map]
            #? (:cljs [cause.list :refer [CausalList]])
            #? (:cljs [cause.map :refer [CausalMap]]))
  #? (:clj (:import (cause.list CausalList)
                    (cause.map CausalMap)
                    (clojure.lang Keyword IPersistentCollection IPersistentStack IReduce Counted IHashEq Seqable IObj IMeta ISeq)
                    (java.io Writer)
                    (java.util Date Collection)
                    (java.lang Object))))

(spec/def ::path (spec/keys :req [::s/uuid ::s/type ::s/node]))
(spec/def ::reverse-path (spec/tuple ::s/id ::s/uuid)) ; Starts with id to make sorting easier
(spec/def ::history (spec/coll-of ::reverse-path ::gen-max 3)) ; Sorted log of all insertions
(spec/def ::last-undo-lamport-ts ::s/lamport-ts) ; The most recently undone lamport-ts
(spec/def ::root-uuid ::s/uuid)
; TODO: ::collections actually stores CausalTrees not ::s/causal-trees...
(spec/def ::collections (spec/map-of ::s/uuid ::s/causal-tree :gen-max 3))
(spec/def ::causal-base (spec/keys :req [::s/uuid
                                         ::s/lamport-ts
                                         ::s/site-id
                                         ::history
                                         ::last-undo-lamport-ts
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
   ::last-undo-lamport-ts nil
   ::root-uuid nil
   ::collections {}})

(def ref-ns "cause.base.ref")

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
(comment
  (cb->edn
   (transact-
    (new-cb)
    [[nil nil [:div {:foo "bar"} "wat"
               [:p "baz"]]]])))

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
(comment
  (map->nodes (new-cb) 0 {:a 1 :b 2}))

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
(comment
  (list->nodes (new-cb) 0 [1 2 3])
  (list->nodes (new-cb) 0 "abc")
  (list->nodes (new-cb) 0 "🤟🏿wat"))

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
(comment
  ; map
  (flatten-value (new-cb) 0 {:a {:aa 1 :bb 2 :cc 3}})
  (flatten-value (new-cb) 0 {:a {:b {:c :d}}})
  ; list
  (flatten-value (new-cb) 0 [1 [2 [3]]])
  (flatten-value (new-cb) 0 [1 "hello" "world"])
  ; combo
  (flatten-value (new-cb) 0 [:div {:title "don't break"}
                             [:span "break"]]))

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
  [cb [uuid cause value :as tx-part]]
  (if uuid
    [cb uuid]
    (add-collection-of-this-values-type-to-cb cb value :is-root? true)))

(defn validate-tx-part [cb [uuid cause value :as tx-part]]
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
  [cb [uuid cause value :as tx-part] tx-index]
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
          (assoc ::s/last-undo-tx-id nil)))))
; TODO: retract whole collections
; TODO: retract contiguous chunks from [uuid1, id1] -> [uuid2, id2]
; TODO: normalize transaction / abort if can't normalize
;   Normalization is probably a fn or schema that gets passed to transact

;;;;;;;;;

; TODO: History Manipulation
; Every operation must be addative, so an undo adds
; an inverse transaction rather than deleting a transaction
; --- Goals ---
; - (re)construct history from immutable data stored in causal-trees
; - simulate an undo stack
; - simulate a redo stack
; - infinite undo back to first tx-part
; - show history / changelog
; - show blame, who made which tx
; - scrub through timeline like a youtube video
; - reset to any point in time like `git reset`
; --- Functions ---
; [] invert
;    This is the primary function that drives history manipulation.
;    - [cb history]
;      - map history into tx-parts
;      - find tx-parts for collections were created (and are about to be retracted)
;      - filter out tx-parts that belong these collections because
;        those collections are about to be retracted and there's no
;        reason to invert nested tx-parts in deleted collections.
;      - invert remaining tx-parts
;      - transact
; [] undo (last local tx)
;    - [cb] - local site-id undo
;      - find the tx-id for the local site-id that comes before last-undo-tx-id
;        and slice the ::history to get all reverse-paths for said tx-id
;      - (invert [cb sliced-history])
;      - set last-undo-tx-id to tx-id
; [] redo (last local undo, if there is one...)
;    - [cb] - local site-id redo
;      - slice ::history to get last-undo-tx-id reverse-paths
;      - (invert [cb sliced-history])
;      - find the tx-id for the local site-id that comes after last-undo-tx-id
;      - set last-undo-tx-id to tx-id
; [] reset (to any tx in the history)
;    - [cb tx-id] - handles git style reset and scrubbing
;      - slice the ::history from tx-id to the end
;      - (invert [cb sliced-history])
;    - [cb tx-id #{site-id site-id ...}] - the backbone of undo / redo
;      - slice ""
;      - filter out the site-ids not passed in from the history slice
;      - (invert [cb sliced-and-filtered-history])

(defn expand-reverse-path
  "Returns the `[node collection]` for a reverse-path"
  [cb [id uuid]]
  (let [collection (get-collection- cb uuid)
        node (into [id] (get-in (.-ct collection) [::s/nodes id]))]
    [node collection]))

(defn reverse-path->path [cb [id uuid]]
  (let [[node collection] (expand-reverse-path cb [id uuid])]
    {::s/uuid uuid
     ::s/type (::s/type (.-ct collection))
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
  [{:keys [::s/uuid ::s/type] [id cause value] ::s/node}]
  (case value
    ::s/hide [uuid cause ::s/show]
    ::s/show [uuid cause ::s/hide]
    [uuid id ::s/hide]))

; [] invert
;    This is the primary function that drives history manipulation.
;    - [cb history]
;      - map history into tx-parts
;      - find tx-parts for collections were created (and are about to be retracted)
;      - filter out tx-parts that belong these collections because
;        those collections are about to be retracted and there's no
;        reason to invert nested tx-parts in deleted collections.
;      - invert remaining tx-parts
;      - transact
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
        ; removing nested paths that are about to have their parent collection (uuid)
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

(defn get-next-undo-tx-id
  "Returns the tx-id that is next in line to be undone."
  [cb]
  (let [last-lamport-ts (::last-undo-lamport-ts cb)
        remaining-history (if last-lamport-ts
                            (subhis cb nil [(dec last-lamport-ts) (::s/site-id cb)])
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
  (let [next-undo-tx-id (get-next-undo-tx-id cb)]
    (if (nil? next-undo-tx-id)
      cb
      (let [tx (->> (subhis cb next-undo-tx-id)
                    (filter (comp (partial = (::s/site-id cb)) second first)))]
        (-> cb
            (invert- tx)
            (assoc ::last-undo-lamport-ts (first next-undo-tx-id)))))))

(defn redo-
  "Undoes the most recent transaction that is not an redo performed by
  the provided site-id"
  ([cb]
   (redo- cb (::s/site-id cb)))
  ([cb site-id]
   (println "TODO")))

; (defn log- [cb & site-id] (println "TODO"))

#? (:clj
    (deftype CausalBase [cb])

    :cljs
    (deftype CausalBase [cb]
      IPrintWithWriter
      (-pr-writer [o writer opts]
        (-write writer (str "#causal/base " (pr-str (s/causal->edn o)))))))

#? (:clj (defmethod print-method CausalBase [^CausalBase o ^java.io.Writer w]
           (.write w (str "#causal/base " (pr-str (s/causal->edn o))))))

(defn read-edn-map
  [read-object]
  (let [[cb] read-object]
    (CausalBase. cb)))

#? (:cljs (cljs.reader/register-tag-parser! 'cause.list read-edn-map))

(extend-type CausalBase
  proto/CausalBase
  (transact [this tx] (CausalBase. (transact- (.-cb this) tx)))
  (get-collection
    ([this] (get-collection- (.-cb this)))
    ([this ref-or-uuid] (get-collection- (.-cb this) ref-or-uuid)))

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

(comment
  (def cb (new-cb))
  (transact- cb [[nil s/root-id [1 2 3 {:a 1}]]])
  (transact- cb [[nil nil [1 2 3 {:a 1}]]])
  (transact- cb [[nil nil {:a 1 :b {:c :d}}]])
  (transact- cb [[nil nil [:div "hey"
                           [:p "these chars should be in the same list as :p"]]]])

  (def acbm (atom (new-cb)))
  (swap! acbm transact [[nil nil {:a 1 :b {:c :d}}]])
  (transact- @acbm [[(::root-uuid @acbm) :a 3]])
  (transact- @acbm [[(::root-uuid @acbm) :a "weee"]])
  (transact- @acbm [[(::root-uuid @acbm) :a {:ee 3 :ff [1 2 3]}]])

  (def acbl (atom (new-cb)))
  (swap! acbl transact- [[nil nil [1 2 3]]])
  (transact- @acbl [[(::root-uuid @acbl) s/root-id 4]
                    [(::root-uuid @acbl) s/root-id 5]])
  (transact- @acbl [[(::root-uuid @acbl) s/root-id "hey"]])
  (transact- @acbl [[(::root-uuid @acbl) s/root-id ["hey"]]])
  (transact- @acbl [[(::root-uuid @acbl) s/root-id [["hey"]]]])
  (transact- @acbl [[(::root-uuid @acbl) s/root-id ["hey" "sup"]]])
  (transact- @acbl [[(::root-uuid @acbl) s/root-id [[:div "hey"]]]])
  (transact- @acbl [[(::root-uuid @acbl) s/root-id [-3 -2 -1 0]]])
  (transact- @acbl [[(::root-uuid @acbl) s/root-id {:a 1}]])
  ;
  (transact- @acbl [[(::root-uuid @acbl) s/root-id "🤟🏿"]])
  (transact- @acbl [[(::root-uuid @acbl) s/root-id "🤟🏿" true]]) ; TODO: add a 4th raw-value? slot to tx-part

  (proto/get-collection (new-causal-base) nil)
  (def cb (proto/transact (new-causal-base) [[nil nil [:div {:a 1} "foo" [:span "bar"]]]]))
  (seq (get-collection- (.-cb cb) (peek (second (seq cb)))))
  (seq (proto/get-collection cb (peek (second (seq cb)))))
  (seq cb :cause.base.ref/OysqODJodVrFe5l5rxNx9)
  (proto/causal->edn (proto/transact (new-causal-base) [[nil nil [:div {:a 1} "foo" [:span "bar"]]]])))
