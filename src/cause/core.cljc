(ns ^{:doc "The core Cause API."
      :author "Chris Smothers"}
 cause.core
  (:require [cause.shared :as s]
            [cause.util :refer [redef] :refer-macros [redef]]
            [cause.protocols :as proto]
            [cause.list :as c-list]
            [cause.map :as c-map]
            [cause.base :as c-base]))

; Special values have special effects on causal collections.
; NOTE: Special values do not compose with one another.
;       E.g. applying hide to a hide will not equal show.
; TODO: MAYBE: RENAME: hide to retract
; TODO: MAYBE: RENAME: show to reveal
; TODO: MAYBE: DELETE: delete
(def ^{:doc "Insert this value to hide a cause."} hide ::s/hide)
(def ^{:doc "An alias for hide."} delete ::s/hide)
(def ^{:doc "If a cause is hidden, insert this value to show
            it again."} show ::s/show)
(def ^{:doc "The id of the first node in every causal-list. To insert
             a node at the front, set root-id as the cause."}
  root-id s/root-id)

; Causal base. This is what you want 99% of the time.
(redef new-causal-base c-base/new-causal-base)
(redef transact proto/transact)
(redef ref? c-base/ref?)
(redef follow-ref proto/follow-ref)

;;;;;;;;;;;; Other Stuff ;;;;;;;;;;;;

; Causal meta attributes
(redef get-uuid proto/get-uuid)
(redef get-ts proto/get-ts)
(redef get-site-id proto/get-site-id)

; Nodes are the building blocks of causal data types.
(redef new-node s/new-node)

; Causal collection types are convergent and EDN-like.
(redef new-causal-list c-list/new-causal-list)
(redef new-causal-map c-map/new-causal-map)

; Causal collection functions
(redef insert proto/insert)
(redef append proto/append)
(redef weft proto/weft)
(redef causal-merge proto/causal-merge)
(redef get-weave proto/get-weave)

; Causal conversion
(redef causal->edn s/causal->edn)
