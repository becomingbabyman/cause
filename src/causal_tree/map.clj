(ns causal-tree.map
  (:require
   [causal-tree.util :as u :refer [<< guid]]
   [causal-tree.spec :as s]
   [clojure.spec.alpha :as spec]))

(defn new-causal-tree []
  {::s/type ::s/map
   ::s/lamport-ts 0
   ::s/site-id (guid)
   ::s/nodes {}
   ::s/yarns {}
   ::s/weave {}})
