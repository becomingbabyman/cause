(ns causal-tree.map-test
  (:require
   [causal-tree.core :as c]
   [clojure.string :as string]
   [clojure.test :refer [deftest is]]))

(deftest map-test
  (-> (c/causal-map)
      (assoc :foo "bar")
      (assoc :fizz "buzz")
      (assoc :fizz "bang")
      (dissoc :foo)
      (assoc :list (swap! (atom (c/new-causal-tree :list))
                          c/conj- "a" "b" "c"))
      (c/ct->edn)
      (= {:fizz "bang" :list '("a" "b" "c")})
      (is)))
