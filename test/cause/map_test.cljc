(ns cause.map-test
  (:require [cause.core :as c]
            [clojure.string :as string]
            [clojure.test :refer [deftest is]]))

(deftest map-test
  (-> (c/causal-map)
      (assoc :foo "bar")
      (assoc :fizz "buzz")
      (assoc :fizz "bang")
      (dissoc :foo)
      (assoc :list (swap! (atom (c/causal-list))
                          conj "a" "b" "c"))
      (c/causal->edn)
      (= {:fizz "bang" :list '("a" "b" "c")})
      (is)))
