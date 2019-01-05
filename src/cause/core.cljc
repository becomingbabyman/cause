(ns cause.core
  (:require [cause.shared :as s]
            [cause.util :refer [redef] :refer-macros [redef]]
            [cause.protocols :as proto]
            [cause.list :as c-list]
            [cause.map :as c-map]))

; Nodes are the building blocks of causal data types.
(redef new-node s/new-node)

(def ^{:doc "Insert this value to delete a cause."} delete ::s/delete)

; Causal collection types. These are convergent and EDN-like.
(redef new-causal-list c-list/new-causal-list)
(redef new-causal-map c-map/new-causal-map)

; Causal specific functions for causal collections.
(redef insert proto/insert)
(redef append proto/append)
(redef weft proto/weft)
(redef causal-merge proto/causal-merge)
(redef get-uuid proto/get-uuid)
(redef get-ts proto/get-ts)
(redef get-site-id proto/get-site-id)
(redef get-weave proto/get-weave)

(redef causal->edn s/causal->edn)
; (defn edn->causal [])

; (defn undo [causal-tree & site-id] (println "TODO"))
; (defn redo [causal-tree & site-id] (println "TODO"))

; TODO: how should batch insert and delete be handled?
;   E.g. delete selection or paste in content.
;   Ideally that would be one insertion so it would have
;   consitent ordering (one ts) and so it could be one undo.
