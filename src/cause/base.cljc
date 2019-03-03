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

(comment
  (do
    (def cb (new-causal-base))
    (transact cb [[nil nil {:a 1}]])
    (transact cb [[123 [0 0 0] {:a 1}]])
    (transact cb [[nil nil [1 2 3 {:a 1}]]])))

(defn new-node ; ✅
  "Returns a new local node and an incremented tx-index `[tx-index node]`"
  [cb tx-index cause value]
  (println "new-node")
  [(inc tx-index)
   (s/new-node (::s/lamport-ts cb) (::s/site-id cb) (or tx-index 0)
               (or cause s/root-id) value)])

(defn insert ; ✅
  "Inserts the `nodes` in a causal collection specified by `uuid` and
  updates the history of the containing `cb`. List nodes must be
  sequential. Returns a cb"
  [cb uuid nodes]
  (println "insert")
  (let [reverse-paths (map #(do [(first %) uuid]) nodes)]
    (-> cb
        (update-in [::collections uuid] #(c/insert % (first nodes) (rest nodes)))
        (update ::history u/insert (first reverse-paths) {:next-vals (next reverse-paths)}))))

(defn add-collection-of-this-values-type-to-cb [cb value & {:keys [is-root?]}] ; ✅
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

;
;
(defn map->nodes
  "Returns `[tx-index nodes]`"
  [cb tx-index map-value]
  (reduce-kv (fn [acc k v]
               (let [[tx-index node] (new-node cb (first acc) k v)]
                 [tx-index (into (peek acc) node)]))
             [tx-index []]
             map-value))
(comment
  (map->nodes (new-causal-base) 0 {:a 1 :b 2 :c 3}))

(defn flatten-map
  [cb tx-index map-value]
  (let [[cb uuid] (add-collection-of-this-values-type-to-cb cb map-value)
        [tx-index nodes] (map->nodes cb tx-index map-value)
        cb (insert cb uuid nodes)
        map-ref (uuid->ref uuid)]
    [cb tx-index map-ref]))
(comment
  (flatten-map (new-causal-base) 0 {:a 1 :b 2}))

(defn nested-maps->nodes
  "Returns `[cb tx-index nodes]`"
  [cb tx-index map-value])
(comment
  (nested-maps->nodes (new-causal-base) 0 {:a {:aa 1 :bb 2 :cc 3}}))
;
;

; (defn handle-tx-map-value [cb [uuid cause value :as tx] tx-index]
;   (println "TODO: map")
;   (let [causal (c/new-causal-map)
;         cb (assoc-in cb [::collections (c/get-uuid causal)] causal)
;         [tx-index causal-node] (new-node cb tx-index cause (causal->ref causal))
;         cb (insert cb uuid [causal-node])
;         [map-nodes tx-index] (reduce-kv (fn [[nodes tx-index] k v]
;                                           (println "TODO: what if v is another collection?")
;                                           (let [[tx-index n] (new-node cb tx-index k v)]
;                                             [(conj nodes n) tx-index]))
;                                         [[] tx-index] value)
;         cb (insert cb (c/get-uuid causal) map-nodes)]
;     [cb tx-index]))
;
; (defn handle-tx-list-value [cb [uuid cause value :as tx] tx-index]
;   (println "TODO: seqable"))

(defn reducer-value->node ; ✅
  "A reducible fn for building seqs of sequntial nodes."
  [[cb tx-index nodes cause :as acc] value]
  (println "reducer-value->node")
  (let [[tx-index node] (new-node cb tx-index cause value)
        next-cause (first node)]
    [cb tx-index (into nodes node) next-cause]))

(defn reducer-edn-value->flat-value
  "Flattens edn collections into uuid refs. Also potentially maps seqable
  values into their parent CausalList."
  [[cb tx-index flat-values uuid :as acc] value]
  (println "reducer-edn-value->flat-value")
  (if-let [causal (get-in cb [::collections uuid])]
    ; This should only be true at the top level of a nested transaction value
    (let [is-in-list? (instance? CausalList causal)
          is-in-map? (instance? CausalMap causal)
          [cb tx-index flat-value] [cb tx-index "TODO"]]
          ; (cond
          ;   (map? value) (if is-in-map?)
          ;   (seqable? value) (if is-in-list?)
          ;   :else value)]
      [cb tx-index (into flat-values flat-value) uuid])
    ; Otherwise we're deeper in a nested value and we need to create new
    ; causal collections and accoc them to the cb whenever we see them
    (let [[cb uuid] (add-collection-of-this-values-type-to-cb cb value)]
      (recur [cb tx-index flat-values uuid] value))))

(defn handle-tx-value [cb [uuid cause value :as tx] tx-index]
  (println "handle-tx-value")
  (let [[cb tx-index flat-values uuid] (reduce reducer-edn-value->flat-value [cb tx-index [] uuid] value)
        [cb tx-index nodes] (reduce reducer-value->node [cb tx-index [] cause] flat-values)
        cb (insert cb uuid nodes)]
    [cb tx-index])) ; QUESTION: uuid ])) ;; Should this also return uuid?

; (defn handle-tx-value [cb [uuid cause value :as tx] tx-index]
;   (println "TODO: value")
;   (cond
;     (map? value) (handle-tx-map-value cb tx tx-index)
;     (seqable? value) (handle-tx-list-value cb tx tx-index)
;     :else (let [[tx-index n] (new-node cb tx-index cause value)]
;             [(insert cb uuid [n]) tx-index])))

(defn handle-tx-potential-root ; ✅
  "A tx without a `uuid` will create a new root collection."
  [cb [uuid cause value :as tx]]
  (println "handle-tx-potential-root")
  (if uuid
    [cb uuid]
    (add-collection-of-this-values-type-to-cb cb value :is-root? true)))

(defn validate-tx [cb [uuid cause value :as tx]] ; ✅
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

(defn handle-tx ; ✅
  "Performs one tx in a transaction. `value`s with EDN collections will be converted to causal
  collections. Nested collections will be flattened into the collections map
  and refferenced by their uuid."
  [cb [uuid cause value :as tx] tx-index]
  (println "handle-tx")
  (let [_ (validate-tx cb tx)
        [cb uuid] (handle-tx-potential-root cb tx)
        [cb tx-index] (handle-tx-value cb [uuid cause value] tx-index)]
    [cb tx-index]))
; STEPS to handle a tx
; recur down to the leaf of a value
;   do NOT map out, serialize this so [cb and tx-index] are chained
;
; create the needed causal collection
; get its uuid and assoc it into the cb
; insert the value into the cb
; return the [cb tx-index this-uuid] to the parent
;  in the parent, chain [cb tx-index] into next children,
;  but swap out the original collection for a (ref child-uuid)
;  E.g. reduce on the cb and tx-index, but map the (ref child-uuid)...
; in the parent, once all the children are handled
;   insert these values
;   and return [cb tx-index this-uuid]
;
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

(defn transact ; ✅
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
        (recur cb (rest txs) tx-index))
      (update cb ::s/lamport-ts inc))))
; TODO: add new collections: lists, maps
; TODO: add contiguous sequences: "y" "o" "l" "o"
;         should be O(n + m)
; TODO: covert nested collections to refs
; TODO: retract whole collections
; TODO: retract contiguous chunks from [uuid1, id1] -> [uuid2, id2]
; TODO: normalize transaction / abort if can't normalize

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
  (transact cb [[nil nil [1 2 3 {:a 1}]]])
  (transact cb [["123" [0 "a" 0] [1 2 3]]]))
