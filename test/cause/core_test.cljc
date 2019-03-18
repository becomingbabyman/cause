(ns cause.core-test
  (:require [cause.core :as c]
            [clojure.test :refer [deftest is]]))

(deftest test-core-api
  (is (= '(:tag {:a 1 :b "together"} \s \p \l \i \t)
         (c/causal->edn
          (c/transact
           (c/new-causal-base)
           [[nil nil [:tag {:a 1 :b "together"} "split"]]]))))
  (is (= '(1 2 3)
         (c/causal->edn
          (as-> (c/new-causal-base) cb
                (c/transact cb [[nil nil [2 3]]])
                (c/transact cb [[(c/get-uuid (c/get-collection cb)) c/root-id 1]]))))))

(comment
  (test-core-api))
