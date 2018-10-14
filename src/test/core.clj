(ns test.core
  (:require
   [causal-tree.core :as c]
   [clojure.test :refer-macro [deftest] :refer [is]]
   [clojure.spec.alpha :as s]
   [clojure.spec.gen.alpha :as gen]
   [clojure.spec.test.alpha :as stest]
   [com.walmartlabs.datascope :as ds]))

; (deftest)

; (deftest causal-tree
;   (insert)
;   (append)
;   (weave)
;   (merge)
;   (weft))

(defn spec-playground []
  (do
    (s/valid? ::c/lamport-ts 0)
    (gen/generate (s/gen ::c/lamport-ts))
    (gen/generate (s/gen ::c/basic-guid))
    (gen/generate (s/gen ::c/id))
    (gen/generate (s/gen ::c/site-id))
    (gen/generate (s/gen ::c/root))
    (gen/generate (s/gen ::c/node))
    (gen/generate (s/gen ::c/value))
    (gen/generate (s/gen ::c/causal-tree))

    (stest/instrument `c/node)
    (stest/check `c/node)
    (s/exercise-fn `c/node)))

(defn example-playground []
  (do
    (def ct (atom (c/new-causal-tree)))

    (c/ins [[1 1] [2 2] [4 4]] [3 3])

    ; (swap! ct assoc ::yarns {})
    (deref ct)
    (c/spin @ct)
    ; (c/spin @ct (c/node (second (::nodes @ct))))
    ; (swap! ct c/spin)

    (c/weave @ct (second (reverse (sort (::c/nodes @ct)))))
    (::c/weave (c/weave @ct))
    (swap! ct c/weave)

    (def test-node (c/node 1 (c/guid) 0 c/root-id \c))
    (def test-node-2 (c/node 2 (c/guid) 0 (first test-node) \a))
    (def test-node-3 (c/node 3 (c/guid) 0 (first test-node-2) \r))
    (swap! ct c/insert test-node)
    (swap! ct c/insert test-node-2)
    (swap! ct c/insert test-node-3)

    (swap! ct c/append :x (first test-node-3) 0)
    (swap! ct c/append \t (first test-node-2) 0)
    (swap! ct c/append \k (first test-node) 0)
    (swap! ct c/append :x (first test-node) 0)

    (c/materialize @ct)

    (def some-weft-ids (map (comp first last last) (::c/yarns @ct)))
    (c/weft @ct some-weft-ids)
    ; (c/materialize (c/weft @ct [[0 "0" 0]
    ;                             [1 "SoEKxJ2JiC5dY" 0]
    ;                             [2 "81KYDSlVWQD0~" 0]
    ;                             [3 "rTCvwmeN3eRbJ" 0]
    ;                             [7 "STVsuW03bB8zO" 0]
    ;                             ; [19 "YHBqZnNGiunOS" 0]
    ;                             [18 "rOYr~lq0ByHG2" 0]]))
    ; (ds/view @ct)
    ; (ds/view (::c/yarns @ct))
    ; (ds/view (::c/weave @ct))

    (do
      ; " and the hat"
      (def sa (c/guid))
      (def n1a (c/node 8 sa 0 (ffirst (reverse (::c/weave @ct))) (first " ")))
      (def n2a (c/node 9 sa 0 (first n1a) \a))
      (def n3a (c/node 10 sa 0 (first n2a) \n))
      (def n4a (c/node 11 sa 0 (first n3a) \d))
      (def n5a (c/node 12 sa 0 (first n4a) (first " ")))
      (def n6a (c/node 13 sa 0 (first n5a) \t))
      (def n7a (c/node 14 sa 0 (first n6a) \h))
      (def n8a (c/node 15 sa 0 (first n7a) \e))
      (def n9a (c/node 16 sa 0 (first n8a) (first " ")))
      (def n10a (c/node 17 sa 0 (first n9a) \h))
      (def n11a (c/node 18 sa 0 (first n10a) \a))
      (def n12a (c/node 19 sa 0 (first n11a) \t))
      ; "s love dogs"
      (def sb (c/guid))
      (def n1b (c/node 8 sb 0 (first (nth (reverse (::c/weave @ct)) 2)) \s))
      (def n2b (c/node 9 sb 0 (first n1b) (first " ")))
      (def n3b (c/node 10 sb 0 (first n2b) \l))
      (def n4b (c/node 11 sb 0 (first n3b) \o))
      (def n5b (c/node 12 sb 0 (first n4b) \v))
      (def n6b (c/node 13 sb 0 (first n5b) \e))
      (def n7b (c/node 14 sb 0 (first n6b) (first " ")))
      (def n8b (c/node 15 sb 0 (first n7b) \d))
      (def n9b (c/node 16 sb 0 (first n8b) \o))
      (def n10b (c/node 17 sb 0 (first n9b) \g))
      (def n11b (c/node 18 sb 0 (first n10b) \s))
      (swap! ct c/insert n1a)
      (swap! ct c/insert n2a)
      (swap! ct c/insert n3a)
      (swap! ct c/insert n4a)
      (swap! ct c/insert n5a)
      (swap! ct c/insert n6a)
      (swap! ct c/insert n7a)
      (swap! ct c/insert n8a)
      (swap! ct c/insert n9a)
      (swap! ct c/insert n10a)
      (swap! ct c/insert n11a)
      (swap! ct c/insert n12a)
      (swap! ct c/insert n1b)
      (swap! ct c/insert n2b)
      (swap! ct c/insert n3b)
      (swap! ct c/insert n4b)
      (swap! ct c/insert n5b)
      (swap! ct c/insert n6b)
      (swap! ct c/insert n7b)
      (swap! ct c/insert n8b)
      (swap! ct c/insert n9b)
      (swap! ct c/insert n10b)
      (swap! ct c/insert n11b))

    (c/materialize (c/weave @ct))
    ; (swap! ct weave)
    ; (ds/view (::weave @ct))
    (deref ct)))
