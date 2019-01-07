(ns cause.map-test
  (:require [cause.core :as c]
            [cause.protocols :as proto]
            [clojure.string :as string]
            [clojure.test :refer [deftest is]]))

(deftest basic-map-test
  (-> (c/new-causal-map)
      (assoc :foo "bar")
      (assoc :fizz "buzz")
      (assoc :fizz "bang")
      (dissoc :foo)
      (assoc :list (swap! (atom (c/new-causal-list))
                          conj "a" "b" "c"))
      (c/causal->edn)
      (= {:fizz "bang" :list '("a" "b" "c")})
      (is)))

(deftest hide-and-show-and-hide-and-show
  (let [ct (atom (c/new-causal-map :foo "bar" :fizz "buzz"))]
    (is (= {:foo "bar" :fizz "buzz"} (c/causal->edn @ct)))
    (swap! ct proto/append :foo c/hide)
    (is (= {:fizz "buzz"} (c/causal->edn @ct)))
    (swap! ct proto/append :foo c/show)
    (is (= {:foo "bar" :fizz "buzz"} (c/causal->edn @ct)))
    (swap! ct proto/append :foo c/hide)
    (is (= {:fizz "buzz"} (c/causal->edn @ct)))
    (swap! ct proto/append :foo c/show)
    (is (= {:foo "bar" :fizz "buzz"} (c/causal->edn @ct)))
    (swap! ct proto/append :foo "boo")
    (swap! ct proto/append :foo c/show)
    (swap! ct proto/append :foo c/show)
    (is (= {:foo "boo" :fizz "buzz"} (c/causal->edn @ct)))))

(comment
  (do
    (basic-map-test)
    (hide-and-show-and-hide-and-show)))
