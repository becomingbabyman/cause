(ns cause.base-test
  (:require [cause.core :as c]
            [cause.base :as b]
            [clojure.test :refer [deftest is testing]]))

(deftest test-cb->edn
  (is (= '(:div {:foo "bar"} \w \a \t (:p \b \a \z))
         (b/cb->edn
          (b/transact-
           (b/new-cb)
           [[nil nil [:div {:foo "bar"} "wat"
                      [:p "baz"]]]])))))

(deftest test-transact
  (let [cb (b/new-cb)]
    (testing "new causal base")
    (is (= nil (b/cb->edn cb)))
    (let [cb (b/transact- cb [[nil nil {:a 1}]])]
      (testing "map transactions")
      (is (= {:a 1} (b/cb->edn cb)))
      (is (= {:a "hi"} (b/cb->edn (b/transact- cb [[(::b/root-uuid cb) :a "hi"]]))))
      (is (= {:a 2 :b 3} (b/cb->edn (b/transact- cb [[(::b/root-uuid cb) nil {:a 2 :b 3}]]))))
      (is (= {:a 1 :b {:c 2}} (b/cb->edn (b/transact- cb [[(::b/root-uuid cb) :b {:c 2}]]))))
      (is (= {:c "hi"} (b/cb->edn (b/transact- cb [[(::b/root-uuid cb) :a c/hide]
                                                   [(::b/root-uuid cb) nil {:b 2 :c "hi"}]
                                                   [(::b/root-uuid cb) nil {:b c/hide}]])))))
    (let [cb (b/transact- cb [[nil nil [1 2]]])]
      (testing "list transactions")
      (is (= [1 2] (b/cb->edn cb)))
      (is (= [0 1 2] (b/cb->edn (b/transact- cb [[(::b/root-uuid cb) c/root-id 0]]))))
      (is (= [0 1 2] (b/cb->edn (b/transact- cb [[(::b/root-uuid cb) c/root-id [0]]]))))
      (is (= [-2 -1 0 1 2] (b/cb->edn (b/transact- cb [[(::b/root-uuid cb) c/root-id [-2 -1 0]]]))))
      (is (= [\h \i 1 2] (b/cb->edn (b/transact- cb [[(::b/root-uuid cb) c/root-id "hi"]]))))
      (is (= [\h \i 1 2] (b/cb->edn (b/transact- cb [[(::b/root-uuid cb) c/root-id ["hi"]]]))))
      (is (= [[\h \i] 1 2] (b/cb->edn (b/transact- cb [[(::b/root-uuid cb) c/root-id [["hi"]]]])))))))

(deftest test-CausalBase-clojure-core-fns
  (is (= 0 (count (c/new-causal-base))))
  (is (= nil (seq (c/new-causal-base))))
  (let [cb (c/transact (c/new-causal-base) [[nil nil [1 2 3]]])]
    (is (= 3 (count cb)))
    (is (= [1 2 3] (mapv peek (seq cb))))))

(comment
  (test-cb->edn)
  (test-transact)
  (test-CausalBase-clojure-core-fns))
