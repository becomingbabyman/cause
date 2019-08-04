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
      (update cb ::s/lamport-ts inc))))
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
; [] undo (last local tx-part)
; [] redo (last local undo)
; [] reset (to any tx-part in the history)
;    Can this be the primary function that drives everything else?
;    - [tx-part]
;    - options [tx-part, [site-ids-to-undo...]]
;    - allow different arities to pass in opitmizations?

(defn get-history- [cb]
  (::history cb))

(defn find-nodes-in-tx-part
  "Returns the nodes given the lamport-ts and site-id of a transaction."
  [cb lamport-ts site-id]
  (println "TODO"))

(defn invert-nodes
  "Generates invert nodes given a list of nodes."
  [cb nodes]
  (println "TODO"))

(defn invert-tx-part
  "Generates invert tx given the lamport-ts and site-id of a transaction."
  [cb lamport-ts site-id]
  (println "TODO"))

(defn reset-
  "Undoes all transactions going back to the provided site-id and lamport-ts"
  [cb site-id lamport-ts]
  (println "TODO"))

(defn undo-
  "Returns a cb with the next transaction in the 'undo stack' undone."
  ([cb]
   (undo- cb (::s/site-id cb)))
  ([cb site-id]
   (let [history (::history cb)
         last-undo-i (when (not (nil? (::last-undo-lamport-ts cb)))
                       (u/binary-search history
                                        [(::last-undo-lamport-ts cb) site-id 0]
                                        #(= (first %1) %2)
                                        #(<< (first %1) %2)))
         history (if last-undo-i
                   (loop [history (subvec history 0 last-undo-i)]
                     (if (= (::last-undo-lamport-ts cb) (ffirst (peek history)))
                       (recur (pop history))
                       history))
                   history)
         reverse-paths (loop [lamport-ts nil
                              history history
                              reverse-paths []]
                         (if (empty? history)
                           reverse-paths
                           (let [path (peek history)
                                 path-sid (second (first path))]
                             (cond
                               (and lamport-ts
                                    (or (not= lamport-ts (ffirst path))
                                        (not= path-sid site-id))) reverse-paths
                               (= path-sid site-id) (recur (ffirst path) (pop history) (conj reverse-paths path))
                               :else (recur lamport-ts (pop history) reverse-paths)))))]
     (undo- cb site-id reverse-paths)))
  ([cb site-id reverse-paths]
   (let [undo-tx (mapv (fn [[id uuid]]
                         (let [causal (.ct (get-collection- cb uuid))
                               [cause value] (get-in causal [::s/nodes id])]
                           (case value
                              ; TODO: undo should behave differently for maps vs lists.
                              ;   lists can do this show / hide thing
                              ;   maps need to look back in the weave of a given key pick the previous value...
                              ;     Should map show / hide be reimplemented to make it more like lists??? Is that possible?
                             ::s/hide [uuid cause ::s/show]
                             ::s/show [uuid cause ::s/hide]
                             [uuid
                              (if (= (::s/type causal) ::s/map) cause id)
                              ::s/hide])))
                       reverse-paths)
         cb (transact- cb undo-tx)]
     (assoc cb ::last-undo-lamport-ts (first (ffirst reverse-paths))))))

(comment
  (do
    (def cb (atom (new-cb)))
    (swap! cb transact- [[nil nil {:a 1 :b 2}]])
    (swap! cb transact- [[(::root-uuid @cb) :a 3]])
    (get-history- @cb))
  (:a (get-collection- @cb))
  (swap! cb assoc ::last-undo-lamport-ts nil)
  (.ct (get-collection- (undo- @cb)))
  (seq (get-collection- (undo- @cb)))
  (swap! cb undo-)
  (:a (get-collection- @cb))
  (do
    (def cb (atom (new-cb)))
    (swap! cb transact- [[nil nil [1]]])
    (swap! cb transact- [[nil s/root-id 2]])
    (deref cb)
    (swap! cb transact- [[(::root-uuid @cb)]])
    (get-history- @cb))
  (swap! cb redo))

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
