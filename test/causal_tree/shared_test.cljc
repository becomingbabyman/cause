(ns causal-tree.shared-test
  (:require
   [causal-tree.util :as u]
   [causal-tree.shared :as s]
   [causal-tree.core :as c]
   [clojure.string :as string]
   [clojure.test :refer [deftest is]]
   [clojure.spec.alpha :as spec]
   [clojure.spec.gen.alpha :as gen]
   [clojure.spec.test.alpha :as stest]))

(deftest spec-fdefs-pass
  (->> (stest/enumerate-namespace 'causal-tree.shared)
       (stest/check)
       (map #(is (get-in % [:clojure.spec.test.check/ret :pass?])))))
