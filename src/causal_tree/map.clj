(ns causal-tree.map
  (:require
   [causal-tree.util :as u :refer [<< guid]]
   [causal-tree.shared :as s]))

(defn new-causal-tree []
  {::s/type ::s/map
   ::s/lamport-ts 0
   ::s/site-id (guid)
   ::s/nodes {}
   ::s/yarns {}
   ::s/weave {}})
