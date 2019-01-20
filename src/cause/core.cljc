(ns ^{:doc "The core Cause API."
      :author "Chris Smothers"}
 cause.core
  (:require [cause.shared :as s]
            [cause.util :refer [redef] :refer-macros [redef]]
            [cause.protocols :as proto]
            [cause.list :as c-list]
            [cause.map :as c-map]))

; Nodes are the building blocks of causal data types.
(redef new-node s/new-node)

; Special values have special effects on causal collections.
; NOTE: Special values do not compose with one another.
;       E.g. applying hide to a hide will not equal show.
(def ^{:doc "Insert this value to hide a cause."} hide ::s/hide)
(def ^{:doc "An alias for hide."} delete ::s/hide)
(def ^{:doc "If a cause is hidden, insert this value to show
            it again."} show ::s/show)

; Special nodes
(def ^{:doc "The first node in every causal-list. To insert
             a node at the front set root-node as the cause."}
  root-node s/root-node)

; Causal collection types are convergent and EDN-like.
(redef new-causal-list c-list/new-causal-list)
(redef new-causal-map c-map/new-causal-map)

; Causal specific functions for causal collections
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
