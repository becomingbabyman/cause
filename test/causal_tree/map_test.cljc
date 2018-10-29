(ns causal-tree.map-test
  (:require
   [causal-tree.core :as c]
   [clojure.string :as string]
   [clojure.test :refer [deftest is]]))

(deftest map-test
  (-> (c/new-causal-tree :map)
      (c/assoc- :foo "bar")
      (c/assoc- :fizz "buzz")
      (c/assoc- :fizz "bang")
      (c/dissoc- :foo)
      (c/assoc- :list (swap! (atom (c/new-causal-tree :list))
                             c/conj- "a" "b" "c"))
      (c/ct->edn)
      (= {:fizz "bang" :list '("a" "b" "c")})
      (is)))
