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

(defn insert [causal-tree node]
  (case (::s/type causal-tree)
    ::s/list (s/insert causal-tree node ct-list/weave)
    ::s/map (s/insert causal-tree node ct-map/weave)
    causal-tree))

(defn append [causal-tree cause value]
  (case (::s/type causal-tree)
    ::s/list (s/append causal-tree cause value ct-list/weave)
    ::s/map (s/append causal-tree cause value ct-map/weave)
    causal-tree))

(defn refresh-caches [causal-tree & args]
  (case (::s/type causal-tree)
    ::s/list (s/refresh-caches causal-tree ct-list/weave)
    ::s/map (s/refresh-caches causal-tree ct-map/weave)
    causal-tree))

(def yarns->nodes s/yarns->nodes)

(defn weft [causal-tree initial-ids]
  (case (::s/type causal-tree)
    ::s/list (s/refresh-caches causal-tree initial-ids ct-list/new-causal-tree ct-list/weave)
    ::s/map (s/refresh-caches causal-tree initial-ids ct-map/new-causal-tree ct-map/weave)
    causal-tree))

(def ct->edn s/ct->edn)

(defn merge-trees [causal-tree1 & args]
  (case (::s/type causal-tree1)
    ::s/list (s/merge-trees ct-list/weave causal-tree1 args)
    ::s/map (s/merge-trees ct-map/weave causal-tree1 args)
    nil))

; Specialty helper functions

(defn assoc [causal-tree & kvs]
  (case (::s/type causal-tree)
    ::s/map (apply ct-map/assoc- causal-tree kvs)
    causal-tree))

(defn dissoc [causal-tree & ks]
  (case (::s/type causal-tree)
    ::s/map (apply ct-map/dissoc- causal-tree ks)
    causal-tree))

(defn conj [causal-tree & vs]
  (case (::s/type causal-tree)
    ::s/list (apply ct-list/conj- causal-tree vs)
    causal-tree))

(defn cons [v causal-tree]
  (case (::s/type causal-tree)
    ::s/list (ct-list/cons- v causal-tree)
    causal-tree))
