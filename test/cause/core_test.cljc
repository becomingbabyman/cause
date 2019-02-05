(ns cause.core-test
  (:require [cause.core :as c]
            [clojure.test :refer [deftest is]]))

(deftest test-edn->causal
  (let [ct (c/edn->causal
            [:div
             [:a {:href "http://npr.org"} "foo"]
             "bar"])]
    (is (= :div (last (first ct))))
    (is (= \r (last (last ct))))
    (is (= \o (last (last (last (second ct))))))
    (is (= "http://npr.org" (:href (last (second (last (second ct)))))))))
