(ns causal.core
  "The core Cause API."
  {:author "Chris Smothers"}
  (:refer-clojure :exclude [list map merge])
  (:require [causal.collections.shared :as s]
            [causal.util :refer [redef] :refer-macros [redef]]
            [causal.protocols :as proto]
            [causal.collections.list :as c.list]
            [causal.collections.map :as c.map]
            [causal.base.core :as c.base]))

; Special values have special effects on causal collections.
; NOTE: Special values do not compose with one another.
;       E.g. applying hide to a hide will not equal show.
(def ^{:doc "Insert this value to hide a cause."} hide :causal/hide)
(def ^{:doc "The id of the first node in every causal-list. To insert
             a node at the front, set root-id as the cause."}
  root-id s/root-id)

; Causal base. This is what you want 99% of the time.
(redef base c.base/new-causal-base)
(redef transact proto/transact)
(redef undo proto/undo)
(redef redo proto/redo)
(redef ref? c.base/ref?)
(redef uuid->ref c.base/uuid->ref)
(redef get-collection proto/get-collection)
(redef set-site-id proto/set-site-id)
(redef set-uuid proto/set-uuid)

;;;;;;;;;;;; Other Stuff ;;;;;;;;;;;;

; Causal meta attributes
(redef get-uuid proto/get-uuid)
(redef get-ts proto/get-ts)
(redef get-site-id proto/get-site-id)

; Nodes are the building blocks of causal data types.
(redef node s/new-node)

; Causal collection types are convergent and EDN-like.
(redef list c.list/new-causal-list)
(redef map c.map/new-causal-map)

; Causal collection functions
(redef insert proto/insert)
(redef append proto/append)
(redef weft proto/weft)
(redef merge proto/causal-merge)
(redef get-weave proto/get-weave)
(redef get-nodes proto/get-nodes)

; Causal conversion
(redef causal->edn s/causal->edn)
