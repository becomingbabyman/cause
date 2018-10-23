(ns causal-tree.core
  (:require
   [causal-tree.shared :as s]
   [causal-tree.list :as ct-list]
   [causal-tree.map :as ct-map]))

(def node s/node)

(defn new-causal-tree [type]
  (case type
    :list (ct-list/new-causal-tree)
    :map (ct-map/new-causal-tree)))

(def spin s/spin)

(def refresh-ts s/refresh-ts)

(defn weave [causal-tree & args]
  (case (::s/type causal-tree)
    ::s/list (apply ct-list/weave causal-tree args)
    ::s/map (apply ct-map/weave causal-tree args)
    causal-tree))

(defn insert [causal-tree & args]
  (case (::s/type causal-tree)
    ::s/list (apply ct-list/insert causal-tree args)
    ::s/map (apply ct-map/insert causal-tree args)
    causal-tree))

(defn append [causal-tree & args]
  (case (::s/type causal-tree)
    ::s/list (apply ct-list/append causal-tree args)
    ::s/map (apply ct-map/append causal-tree args)
    causal-tree))

(defn materialize [causal-tree & args]
  (case (::s/type causal-tree)
    ::s/list (apply ct-list/materialize causal-tree args)
    ::s/map (apply ct-map/materialize causal-tree args)
    nil))

(defn refresh-caches [causal-tree & args]
  (case (::s/type causal-tree)
    ::s/list (apply ct-list/refresh-caches causal-tree args)
    causal-tree))

(defn yarns->nodes [causal-tree & args]
  (case (::s/type causal-tree)
    ::s/list (apply ct-list/yarns->nodes causal-tree args)
    causal-tree))

(defn weft [causal-tree & args]
  (case (::s/type causal-tree)
    ::s/list (apply ct-list/weft causal-tree args)
    causal-tree))

(defn merge-trees [causal-tree & args]
  (case (::s/type causal-tree)
    ::s/list (apply ct-list/merge-trees causal-tree args)
    causal-tree))

;; Specialty helper functions
(defn assoc [causal-tree & args]
  (case (::s/type causal-tree)
    ::s/map (apply ct-map/assoc- causal-tree args)
    causal-tree))

(defn dissoc [causal-tree & args]
  (case (::s/type causal-tree)
    ::s/map (apply ct-map/dissoc- causal-tree args)
    causal-tree))
