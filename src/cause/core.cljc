(ns cause.core
  (:require [cause.shared :as s]
            [cause.protocols :as proto]
            [cause.list :as c-list]
            [cause.map :as c-map]))

; Nodes are the building blocks of causal data types.
(def node s/node)

; Insert this delete keyword to delete its cause. AKA a tombstone.
(def delete ::s/delete)

; Causal collection types. These are convergent and EDN-like.
(def causal-list c-list/new-causal-list)
(def causal-map c-map/new-causal-map)

; Causal specific functions for causal collections.
(def insert proto/insert)
(def append proto/append)
(def weft proto/weft)
(def causal-merge proto/causal-merge)
(def get-uuid proto/get-uuid)
(def get-ts proto/get-ts)
(def get-site-id proto/get-site-id)
(def get-weave proto/get-weave)

(def causal->edn s/causal->edn)
; (defn edn->causal [])

; (defn undo [causal-tree & site-id] (println "TODO"))
; (defn redo [causal-tree & site-id] (println "TODO"))
