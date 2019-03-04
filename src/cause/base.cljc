(ns cause.base
  (:require [clojure.spec.alpha :as spec]
            [cause.util :as u :refer [<<]]
            [cause.shared :as s]
            [cause.core :as c]
            #? (:cljs [cause.list :refer [CausalList]])
            #? (:cljs [cause.map :refer [CausalMap]]))
  #? (:clj (:import (cause.list CausalList) (cause.map CausalMap))))

(spec/def ::reverse-path (spec/tuple ::s/id ::s/uuid)) ; Starts with id to make sorting easier
(spec/def ::history (spec/coll-of ::reverse-path ::gen-max 3)) ; Sorted log of all insertions
(spec/def ::root-uuid ::s/uuid)
(spec/def ::collections (spec/map-of ::s/uuid ::s/causal-tree :gen-max 3))
(spec/def ::causal-base (spec/keys :req [::s/uuid
                                         ::s/lamport-ts
                                         ::s/site-id
                                         ::history
                                         ::root-uuid
                                         ::collections]))

; TODO: add a 4th optional slot to the tx tuple for `::raw-value?`
(spec/def ::tx (spec/tuple ::s/uuid ::s/cause ::s/value))
(spec/def ::txs (spec/coll-of ::tx :gen-max 3))

(defn new-causal-base []
  {::s/lamport-ts 0
   ::s/uuid (u/new-uid)
   ::s/site-id (s/new-site-id)
   ::history []
   ::root-uuid nil
   ::collections {}})

(def ref-ns "cause.base.ref")

(defn uuid->ref [uuid]
  (keyword ref-ns uuid))

(defn causal->ref [causal]
  (uuid->ref (c/get-uuid causal)))

(defn ref? [kw]
  (and (keyword? kw) (= ref-ns (namespace kw))))

(defn ref->uuid [ref]
  (name ref))

(defn follow-ref [cb ref]
  (get-in cb [::collections (ref->uuid ref)]))

(defn cb->edn [cb]
  (println "TODO: edn"))

(defn new-node
  "Returns a new local node and an incremented tx-index `[tx-index node]`"
  [cb tx-index cause value]
  (println "new-node")
  [(inc tx-index)
   (s/new-node (::s/lamport-ts cb) (::s/site-id cb) (or tx-index 0)
               cause value)])

(defn insert
  "Inserts the `nodes` in a causal collection specified by `uuid` and
  updates the history of the containing `cb`. List nodes must be
  sequential. Returns a cb"
  [cb uuid nodes]
  (println "insert")
  (let [reverse-paths (map #(do [(first %) uuid]) nodes)]
    (-> cb
        (update-in [::collections uuid] #(c/insert % (first nodes) (rest nodes)))
        (update ::history u/insert (first reverse-paths) {:next-vals (next reverse-paths)}))))

(defn add-collection-of-this-values-type-to-cb [cb value & {:keys [is-root?]}]
  (println "add-collection-of-this-values-type-to-cb")
  (if-let [causal (cond
                    (map? value) (c/new-causal-map)
                    (seqable? value) (c/new-causal-list)
                    :else nil)]
    (let [uuid (c/get-uuid causal)
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
  (map->nodes (new-causal-base) 0 {:a 1 :b 2}))

(defn list->nodes
  "Returns `[cb tx-index nodes last-node-id]`"
  ([cb tx-index list-value]
   (list->nodes cb tx-index list-value nil))
  ([cb tx-index list-value cause]
   (reduce (fn [[cb tx-index nodes cause] v]
             (if (string? v)
               (let [[cb tx-index more-nodes next-cause] (list->nodes cb tx-index v cause)]
                 [cb tx-index (into nodes more-nodes) next-cause])
               (let [[cb tx-index flat-v] (flatten-value cb tx-index v)
                     [tx-index node] (new-node cb tx-index cause flat-v)]
                 [cb tx-index (conj nodes node) (first node)])))
           [cb tx-index [] (or cause s/root-id)]
           list-value)))
(comment
  (list->nodes (new-causal-base) 0 [1 2 3]))

(defn flatten-collection
  [cb tx-index value node-fn]
  (let [[cb uuid] (add-collection-of-this-values-type-to-cb cb value)
        [cb tx-index nodes] (node-fn cb tx-index value)
        cb (insert cb uuid nodes)
        collection-ref (uuid->ref uuid)]
    [cb tx-index collection-ref]))

(defn flatten-value
  [cb tx-index value & {:keys [preserve-strings?]}]
  (println "flatten-value")
  (cond
    (and preserve-strings? (string? value)) [cb tx-index value]
    (map? value) (flatten-collection cb tx-index value map->nodes)
    (seqable? value) (flatten-collection cb tx-index value list->nodes)
    :else [cb tx-index value]))
(comment
  ; map
  (flatten-value (new-causal-base) 0 {:a {:aa 1 :bb 2 :cc 3}})
  (flatten-value (new-causal-base) 0 {:a {:b {:c :d}}})
  ; list
  (flatten-value (new-causal-base) 0 [1 [2 [3]]])
  (flatten-value (new-causal-base) 0 [1 "hello" "world"])
  ; combo
  (flatten-value (new-causal-base) 0 [:div {:title "don't break"}
                                      [:span "break"]]))

(defn value->nodes
  "Returns `[cb tx-index nodes]`"
  [cb tx-index cause value]
  (println "value->nodes")
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
  (println "handle-tx-value")
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
  (println "handle-tx-potential-root")
  (if uuid
    [cb uuid]
    (add-collection-of-this-values-type-to-cb cb value :is-root? true)))

(defn validate-tx [cb [uuid cause value :as tx]]
  (println "validate-tx")
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
  and refferenced by their uuid."
  [cb [uuid cause value :as tx] tx-index]
  (println "handle-tx")
  (let [_ (validate-tx cb tx)
        [cb uuid] (handle-tx-potential-root cb tx)
        [cb tx-index] (handle-tx-value cb [uuid cause value] tx-index)]
    [cb tx-index]))

(defn transact
  "Automatically manages lamport-ts and tx-index when transacting into
  multiple collections in a causal-base. The monotonic increasing of
  tx-index will correspond to the order of `txs` and the values in them.
  Transforms EDN values to their corresponding causal collections."
  [cb txs]
  (println "transact")
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

(defn gen-hide-txs-for-range
  "Expects a causal-base structured like a tree and trys to walk it
  from the start-id to the end-id to generate a list of hide txs"
  [cb [start-uuid start-id] [end-uuid end-id]]
  (println "TODO: txs"))

; (defn reset [cb site-id lamport-ts] (println "TODO"))
; (defn history [cb & site-id] (println "TODO"))
; (defn undo [cb & site-id] (println "TODO"))
; (defn redo [cb & site-id] (println "TODO"))
; (defn log [cb & site-id] (println "TODO"))

(comment
  (name (keyword "cause.ref" (u/new-uid)))
  (namespace (keyword "cause.ref" (u/new-uid)))

  (u/insert
   [[[1 "a" 0] 123]
    [[1 "a" 1] 123]
    [[1 "b" 0] 123]
    [[1 "b" 1] 123]]
   [[2 "a" 1] 123])

  (def cb (new-causal-base))
  (transact cb [[nil s/root-id [1 2 3 {:a 1}]]])
  (transact cb [[nil nil [1 2 3 {:a 1}]]])
  (transact cb [[nil nil {:a 1 :b {:c :d}}]])
  (transact cb [[nil nil [:div "hey"
                          [:p "these chars should be in the same list as :p"]]]])

  (def acbm (atom (new-causal-base)))
  (swap! acbm transact [[nil nil {:a 1 :b {:c :d}}]])
  (transact @acbm [[(::root-uuid @acbm) :a 3]])
  (transact @acbm [[(::root-uuid @acbm) :a "weee"]])
  (transact @acbm [[(::root-uuid @acbm) :a {:ee 3 :ff [1 2 3]}]])

  (def acbl (atom (new-causal-base)))
  (swap! acbl transact [[nil nil [1 2 3]]])
  (transact @acbl [[(::root-uuid @acbl) s/root-id 4]
                   [(::root-uuid @acbl) s/root-id 5]])
  (transact @acbl [[(::root-uuid @acbl) s/root-id "hey"]])
  (transact @acbl [[(::root-uuid @acbl) s/root-id ["hey"]]])
  (transact @acbl [[(::root-uuid @acbl) s/root-id [["hey"]]]])
  (transact @acbl [[(::root-uuid @acbl) s/root-id ["hey" "sup"]]])
  (transact @acbl [[(::root-uuid @acbl) s/root-id [[:div "hey"]]]])
  (transact @acbl [[(::root-uuid @acbl) s/root-id [-3 -2 -1 0]]])
  (transact @acbl [[(::root-uuid @acbl) s/root-id {:a 1}]]))

; GOTCHAS
; If the parent uuid already exists and is a causal list, and the value is
; a seqable, then the value will be spread into the parent rather than
; creating another causal lists.
;   E.g. ["a" "b" "c"] becomes "a" "b" "c" spliced into the partent list
; To avoid that double wrap the top value,
;   E.g. [["a" "b" "c"]] becomes ["a" "b" "c"] a nested list in the parent list
; ...
; is there a uuid
; does that collection exist
;   if not throw error
; what type of value is it?
;   maps should be inserted as new nested causal maps at their cause
;   if a vector
; ...
; ...
(comment
  (transact cb [[:uuid :cause [:doc {:thing "xyz"} "abc"
                               [:image {:url "this string should NOT be split"}]
                               [:paragraph "these chars should be split and inserted in
                                           the same vec as the `:paragraph` keyword"]]]
                [:uuid-of-doc-map nil {:thing "I'm different" :new-thing "I'm new"}] ; NOTE: a nil cause inside a map uuid will merge the value map with the containing map rather than insert a new map
                [:uuid-of-doc-map :thing {:thing "I'm different" :new-thing "I'm new"}] ; Alternatively this would create a nested map {:thing {:thing "I'm different" :new-thing "I'm new"}}
                [:uuid-of-paragraph :id-of-s-in-chars ::s/hide] ; NOTE: grabbing uuids and ids of nodes that are part of the same tx (have not been inserted yet) will not be possible. This is only an illustration of the types operations that a tx might enable
                [:uuid-of-paragraph :id-of-r-in-chars "acters"] ; `a` will be caused by the cause in this tx. `c` will be caused by `a`, and so on...
                [:uuid-of-paragraph :id-of-r-in-chars "acters" {:value true}] ; E.g insert `acters` without splitting it. QUESTION: what if an optional options map let you disable "smart" value transformation?
                [:uuid-of-paragraph :id-of-r-in-chars "acters" true] ; Or even, if {:value true} is the only option that needs to be supported
                [:uuid-of-paragraph :id-of-last-node [" " [:link {:url "http..."} "a link"]]] ; This is kind of clear... The top vec should be flattened into the parent list
                [:uuid-of-paragraph :id-of-last-node [:link {:url "http..."} "a link"]] ; This is less clear. The intention is probably to insert a new list, but it will get flattened given the default rules...
                [:uuid-of-paragraph :id-of-last-node [[:link {:url "http..."} "a link"]]]])) ; QUESTION: Sould the child need to know the type of its parent and "double wrap" itself accordingly?
                ; ->                                                                             Probably...
                ; this flattening of a string value is because the parent (uuid) collection is a list
                ; if the parent was a map the string would not get flattened...
                ; QUESTION: what if an API consumer wants to transact a string into a list without splitting / flattening it?
                ;   This makes me thing this transform should happen outside the transact fn. See comment below
; TODO: should converting EDN to something transactable be done in
;  the `transact` function or should it be done in a helper function
;  called by the user?
;  NOTE: if we did this and wanted to allow chaining of ids that don't exist yet or nesting
;    we'd need to add support for temporary ids... so you could say something is caused by a
;    value in the same tx.
;    This is probably more flexibile / general purpose, but also adds to the overhead of the transact fn
;    since now it needs to manage the state of multiple txs inorder to optimize weave performance of sequences.
;    Before we could rely on the user grouping sequence inserts together, but not that relationship is abstracted
;    into general purpose temp ids that may or may not be contiguous sequences...
; CONCULSION:
;   I'm inclined to keep the transact fn "smart".
;   1. It's easier to implement than adding temp-id support w/ optimizations
;      and helper fns to handle transforming EDN to a valid tx with temp-ids.
;   2. For better or worse it reduces the surface area of the user facing
;      write API to the `transact` fn with 3, maybe 4 tuples per tx. Pretty small.
;   3. Adding an optional 4th slot in the tx tuple allows users to specify their
;      desired behavior between "smart" vs treating values as themselves, thus
;      preserving the ability to transact raw values of any type.
;   4. We can see how it goes. If there is a strong case for temp-ids this
;      could be split split apart before 1.0. After that I'd like to avoid
;      breaking releases for a long time.
