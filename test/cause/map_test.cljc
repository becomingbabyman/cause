(ns cause.map-test
  (:require [cause.core :as c]
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

(deftest hide-and-show-and-hide-and-show-test
  (let [ct (atom (c/new-causal-map :foo "bar" :fizz "buzz"))]
    (is (= {:foo "bar" :fizz "buzz"} (c/causal->edn @ct)))
    (swap! ct c/append :foo c/hide)
    (is (= {:fizz "buzz"} (c/causal->edn @ct)))
    (swap! ct c/append :foo c/show)
    (is (= {:foo "bar" :fizz "buzz"} (c/causal->edn @ct)))
    (swap! ct c/append :foo c/hide)
    (is (= {:fizz "buzz"} (c/causal->edn @ct)))
    (swap! ct c/append :foo c/show)
    (is (= {:foo "bar" :fizz "buzz"} (c/causal->edn @ct)))
    (swap! ct c/append :foo "boo")
    (swap! ct c/append :foo c/show)
    (swap! ct c/append :foo c/show)
    (is (= {:foo "boo" :fizz "buzz"} (c/causal->edn @ct)))))

(deftest core-cljc-map-protocol-test
  ; empty? dissoc assoc (:keyword) get get-in
  ; update update-in count first last next rest
  ; map seq conj hash str
  ; TODO: mapv reduce reduce-kv
  (is (empty? (c/new-causal-map)))
  (is (not (empty? (c/new-causal-map :foo "bar"))))
  (is (empty? (-> (c/new-causal-map :foo "bar") (dissoc :foo))))
  (is (not (empty? (-> (c/new-causal-map :foo "bar") (dissoc :foo) (assoc :foo c/show)))))
  (is (= "bar" (:foo (c/new-causal-map :foo "bar"))))
  (is (= "bar" (get (c/new-causal-map :foo "bar") :foo)))
  (is (= "bar" (get-in (c/new-causal-map :foo (c/new-causal-map :foo "bar")) [:foo :foo])))
  (is (= "boo" (get-in
                (-> (c/new-causal-map :foo (c/new-causal-map :foo "bar"))
                    (update :foo assoc :foo "boo"))
                [:foo :foo])))
  (is (= 2 (get-in
            (-> (c/new-causal-map :foo (c/new-causal-map :foo 1))
                (update-in [:foo :foo] inc))
            [:foo :foo])))
  (is (= 0 (count (c/new-causal-map))))
  (is (= 1 (count (c/new-causal-map :foo "bar"))))
  (is (= 0 (count (-> (c/new-causal-map :foo "bar") (dissoc :foo)))))
  (is (= 1 (count (-> (c/new-causal-map :foo "bar") (dissoc :foo) (assoc :foo c/show)))))
  (let [node [[1 "site-id" 0] :fizz "buzz"]]
    (is (= node (first (-> (c/new-causal-map) (c/insert node)))))
    (is (= node (last (-> (c/new-causal-map) (c/insert node)))))
    (is (= nil (next (-> (c/new-causal-map) (c/insert node)))))
    (is (= (list node) (next (-> (c/new-causal-map) (c/insert node) (assoc :foo "bar")))))
    (is (= '() (rest (-> (c/new-causal-map) (c/insert node)))))
    (is (= (list node) (rest (-> (c/new-causal-map) (c/insert node) (assoc :foo "bar")))))
    (is (= (list node) (map #(do %) (-> (c/new-causal-map) (c/insert node)))))
    (is (= (list node) (seq (-> (c/new-causal-map :foo "bar") (dissoc :foo) (c/insert node))))))
  (is (= "bar" (:foo (conj (c/new-causal-map) {:foo "bar"}))))
  (is (int? (hash (c/new-causal-map :foo "bar"))))
  (is (= "{:foo \"bar\"}" (str (c/new-causal-map :foo "bar"))))
  (is (= nil
         (-> (c/new-causal-map :foo "bar")
             (dissoc :foo)
             (get :foo))))
  (is (= "bar"
         (-> (c/new-causal-map :foo "bar")
             (dissoc :foo)
             (assoc :foo c/show)
             (get :foo)))))

(comment
  (do
    (basic-map-test)
    (hide-and-show-and-hide-and-show-test)
    (core-cljc-map-protocol-test)))
