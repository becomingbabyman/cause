(ns cause.base
  (:require [clojure.spec.alpha :as spec]
            [cause.util :as u :refer [<<]]
            [cause.shared :as s]
            [cause.core :as c]))

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

(spec/def ::tx (spec/tuple ::s/uuid ::s/cause ::s/value))
(spec/def ::txs (spec/coll-of ::tx :gen-max 3))

(defn new-causal-base []
  {::s/lamport-ts 0
   ::s/uuid (u/new-uid)
   ::s/site-id (s/new-site-id)
   ::history []
   ::root-uuid nil
   ::collections {}})

(def ref-ns "cause.ref")

(defn uuid->ref [uuid]
  (keyword ref-ns uuid))

(defn ref? [kw]
  (and (keyword? kw) (= ref-ns (namespace kw))))

(defn ref->uuid [ref]
  (name ref))

(defn follow-ref [cb ref]
  (get-in cb [::collections (ref->uuid ref)]))

(defn cb->edn [cb]
  (println "TODO edn"))

(comment
  (do
    (def cb (new-causal-base))
    (transact cb [[nil nil [1 2 3 {:a 1}]]])))

(defn node [cb tx-index cause value]
  [[(::s/lamport-ts cb) (::s/site-id cb) (or tx-index 0)]
   (or cause s/root-id)
   value])

(defn value->nodes [cb [uuid cause value :as tx] tx-index]
  (println "TODO")
  [cb [(node cb tx-index cause value)]])

(defn perform-tx
  "Performs one tx in a transation. A tx with a nil `uuid` will create a new
  root collection. `value`s with EDN collections will be converted to causal
  collections. Nested collections will be flattened into the collections map
  and refferenced by their uuid."
  [cb [uuid cause value :as tx] tx-index]
  (let [causal (get-in cb [::collections uuid])
        root? (nil? uuid)
        _ (when (and uuid (not causal))
            (throw (ex-info "Collection with provided uuid not found"
                            {:uuid uuid})))
        causal (or causal
                   (cond
                     (map? value) (c/new-causal-map)
                     (seqable? value) (c/new-causal-list)))
                   ; TODO: What if the value is a nested collection of collections?
                   ; TODO: How to get the current lamport-ts and tx-index in here?
        cb (if root?
             (assoc-in cb [::collections (c/get-uuid causal)] causal)
             cb)
        cb (if root?
             (assoc cb ::root-uuid (c/get-uuid causal))
             cb)
        [cb nodes] (value->nodes cb tx tx-index)
        uuid (if uuid uuid (c/get-uuid causal))
        reverse-paths (map #(do [(first %) uuid]) nodes)]
    [(-> cb
         (update-in [::collections uuid] #(apply c/insert % nodes))
         (update ::history u/insert (first reverse-paths) {:next-vals (next reverse-paths)}))
     tx-index]))

(defn transact
  "Automatically manages lamport-ts and tx-index when transacting into
  multiple collections in a causal-base. The monotonic increasing of
  tx-index will correspond to the order of `txs` and the values in them.
  Transforms EDN values to their corresponding causal collections."
  [cb txs]
  (loop [cb cb
         [tx & txs] txs
         tx-index 0]
    (if tx
      (let [[cb tx-index] (perform-tx cb tx tx-index)]
        (recur cb (rest txs) tx-index))
      (update cb ::s/lamport-ts inc))))
; TODO: add new collections: lists, maps
; TODO: add contiguous sequences: "y" "o" "l" "o"
;         should be O(n + m)
; TODO: retract whole collections
; TODO: retract contiguous chunks from [uuid1, id1] -> [uuid2, id2]
; TODO: normalize transaction / abort if can't normalize

(defn gen-hide-txs-for-range
  "Expects a causal-base structured like a tree and trys to walk it
  from the start-id to the end-id to generate a list of hide txs"
  [cb [start-uuid start-id] [end-uuid end-id]]
  (println "TODO txs"))

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
