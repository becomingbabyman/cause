(ns causal-tree.core
  (:require
   [causal-tree.spec :as s]
   [causal-tree.list :as ct-list]
   [causal-tree.map :as ct-map]))

(defn node [& args] (apply ct-list/node args))

(defn new-causal-tree [type]
  (case type
    ::s/list (ct-list/new-causal-tree)
    ::s/map (ct-map/new-causal-tree)))

(defn spin [& args] (apply ct-list/spin args))

(defn refresh-ts [causal-tree] (ct-list/refresh-ts causal-tree))

(defn weave [& args] (apply ct-list/weave args))

(defn insert [& args] (apply ct-list/insert args))

(defn append [& args] (apply ct-list/append args))

(defn materialize [& args] (apply ct-list/materialize args))

(defn refresh-caches [& args] (apply ct-list/refresh-caches args))

(defn yarns->nodes [& args] (apply ct-list/yarns->nodes args))

(defn weft [& args] (apply ct-list/weft args))

(defn merge-trees [& args] (apply ct-list/merge-trees args))
