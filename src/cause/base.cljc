(ns cause.base
  (:require [clojure.spec.alpha :as spec]
            [cause.util :as u :refer [<<]]
            [cause.shared :as s]
            [cause.protocols :as proto]
            [cause.list :as c-list]
            [cause.map :as c-map]
            #? (:cljs [cause.list :refer [CausalList]])
            #? (:cljs [cause.map :refer [CausalMap]]))
  #? (:clj (:import (cause.list CausalList)
                    (cause.map CausalMap)
                    (clojure.lang Keyword IPersistentCollection IPersistentStack IReduce Counted IHashEq Seqable IObj IMeta ISeq)
                    (java.io Writer)
                    (java.util Date Collection)
                    (java.lang Object))))

(spec/def ::reverse-path (spec/tuple ::s/id ::s/uuid)) ; Starts with id to make sorting easier
(spec/def ::history (spec/coll-of ::reverse-path ::gen-max 3)) ; Sorted log of all insertions
(spec/def ::root-uuid ::s/uuid)
; TODO: ::collections actually stores CausalTrees not ::s/causal-trees...
(spec/def ::collections (spec/map-of ::s/uuid ::s/causal-tree :gen-max 3))
(spec/def ::causal-base (spec/keys :req [::s/uuid
                                         ::s/lamport-ts
                                         ::s/site-id
                                         ::history
                                         ::root-uuid
                                         ::collections]))

; TODO: add a 4th optional slot to the tx tuple for `::raw-value?`
; TODO: should ::s/value be replaced with another type of "value" since it
;   can be processed and broken into many sub ::s/values by the transact fn?
(spec/def ::tx (spec/tuple ::s/uuid ::s/cause ::s/value))
(spec/def ::txs (spec/coll-of ::tx :gen-max 3))

(defn new-cb
  "Like a database, but comprised of nested causal collections. If you
  want to nest causal collections and you want them to share history
  use this."
  []
  {::s/lamport-ts 1
   ::s/uuid (u/new-uid)
   ::s/site-id (s/new-site-id)
   ::history []
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
                    (map? value) (c-map/new-causal-map)
                    (seqable? value) (c-list/new-causal-list)
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

(defn handle-tx-value [cb [uuid cause value :as tx] tx-index]
  (let [causal (get-in cb [::collections uuid])]
    (if (merge-value-into-parent-collection? cb uuid cause value)
      (let [[cb tx-index nodes] (value->nodes cb tx-index cause value)
            cb (insert cb uuid nodes)]
        [cb tx-index])
      (let [[cb tx-index flat-value] (flatten-value cb tx-index value :preserve-strings? (instance? CausalMap causal))
            [tx-index node] (new-node cb tx-index cause flat-value)
            cb (insert cb uuid [node])]
        [cb tx-index]))))

(defn handle-tx-potential-root
  "A tx without a `uuid` will create a new root collection."
  [cb [uuid cause value :as tx]]
  (if uuid
    [cb uuid]
    (add-collection-of-this-values-type-to-cb cb value :is-root? true)))

(defn validate-tx [cb [uuid cause value :as tx]]
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

(defn handle-tx
  "Performs one tx in a transaction. `value`s with EDN collections will be converted to causal
  collections. Nested collections will be flattened into the collections map
  and referenced by their uuid."
  [cb [uuid cause value :as tx] tx-index]
  (let [_ (validate-tx cb tx)
        [cb uuid] (handle-tx-potential-root cb tx)
        [cb tx-index] (handle-tx-value cb [uuid cause value] tx-index)]
    [cb tx-index]))

(defn transact-
  "Automatically manages lamport-ts and tx-index when transacting into
  multiple collections in a causal-base. The monotonic increasing of
  tx-index will correspond to the order of `txs` and the values in them.
  Transforms EDN values to their corresponding causal collections."
  [cb txs]
  (loop [cb cb
         [tx & txs] txs
         tx-index 0]
    (if tx
      (let [[cb tx-index] (handle-tx cb tx tx-index)]
        (recur cb txs tx-index))
      (update cb ::s/lamport-ts inc))))
; TODO: retract whole collections
; TODO: retract contiguous chunks from [uuid1, id1] -> [uuid2, id2]
; TODO: normalize transaction / abort if can't normalize
;   Normalization is probably a fn or schema that gets passed to transact

(defn seq-at-path-
  [cb path]
  (let [uuid (peek (pop path))
        id (peek path)
        coll-seq (seq (get-collection- cb uuid))
        coll-seq (reduce (fn [a s]
                           (if (= id (first s))
                             (reduced a)
                             (rest a)))
                         coll-seq
                         coll-seq)]
    [coll-seq uuid id]))
(comment
  (def cb (transact- (new-cb) [[nil nil [:block "rand text"]]]))
  (def coll (get-collection- cb))
  (seq-at-path- cb [(proto/get-uuid coll) (first (nth (seq coll) 3))]))

(defn gen-hide-txs-for-range-
  "Expects a causal-base structured like a tree and trys to walk it
  from the start-path to the end-path to generate the minimal list of
  hide txs. A path is a vector of one or more uuids starting with the
  root-uuid and ending with the id of a node.
  E.g. `[root-uuid uuid uuid id]` or `[root-uuid id]`.
  Setting `:hiccup?` to true will treat the range as hiccup
  and refrain from deleting the tag and optional attrs in the `end`
  collection. E.g [:tag {:attrs 123} \"not protected\"]"
  [cb start-path end-path & {:keys [hiccup?] :as opts}]
  (loop [txs []
         path start-path
         [coll-seq uuid id] (seq-at-path- cb path)]
    (if (not path) txs
        (let [txs (conj txs [uuid id ::s/hide])]
          (if (= path end-path) txs
              (let [depth (- (count path) 2)
                    path "TODO"]
                    ;     path (cond
                    ;            ())]
                (recur txs path ["TODO" "TODO" "TODO"]))))))
    ; if current-path equal to end-path return
    ; else create hide tx for node at current-path
    ;   and add it to txs
    ;   then move current path forward
    ;     is the next node a ref/uuid that's in the end-path?
    ;     is it not?
    ;     is this the end of a leaf and we need to step out a level?
  (println "TODO: txs"))
(comment
  (do
    (def cb (atom (new-causal-base)))
    (swap! cb proto/transact [[nil nil [:block "rand text"
                                        [:link {:url "site.xyz"} "a site"]
                                        [:paragraph "paragraph text"]]]])
    (proto/get-uuid @cb)
    (proto/get-uuid (proto/get-collection @cb))
    (def start (proto/get-collection @cb))
    (def end (proto/get-collection @cb (last (last (seq start)))))
    (proto/gen-hide-txs-for-range @cb
                                  [(proto/get-uuid start)
                                   (first (nth (seq start) 2))]
                                  [(proto/get-uuid start)
                                   (proto/get-uuid end)
                                   (first (nth (seq end) 5))]
                                  :hiccup? true))
  (deref cb))

; (defn reset- [cb site-id lamport-ts] (println "TODO"))
; (defn get-history- [cb & site-id] (println "TODO"))
; (defn undo- [cb & site-id] (println "TODO"))
; (defn redo- [cb & site-id] (println "TODO"))
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
  (transact [this txs] (CausalBase. (transact- (.-cb this) txs)))
  (get-collection
    ([this] (get-collection- (.-cb this)))
    ([this ref-or-uuid] (get-collection- (.-cb this) ref-or-uuid)))
  (gen-hide-txs-for-range [this start-path end-path opts]
    (gen-hide-txs-for-range- (.-cb this) start-path end-path opts))

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
  (swap! acbl transact [[nil nil [1 2 3]]])
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
  (transact- @acbl [[(::root-uuid @acbl) s/root-id "🤟🏿" true]]) ; TODO: add a 4th raw-value? slot to tx

  (proto/get-collection (new-causal-base) nil)
  (def cb (proto/transact (new-causal-base) [[nil nil [:div {:a 1} "foo" [:span "bar"]]]]))
  (seq (get-collection- (.-cb cb) (peek (second (seq cb)))))
  (seq (proto/get-collection cb (peek (second (seq cb)))))
  (seq cb :cause.base.ref/OysqODJodVrFe5l5rxNx9)
  (proto/causal->edn (proto/transact (new-causal-base) [[nil nil [:div {:a 1} "foo" [:span "bar"]]]])))
