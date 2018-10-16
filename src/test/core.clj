(ns test.core
  (:require
   [causal-tree.core :as c]
   [clojure.pprint :refer [pprint]]
   [clojure.test :refer [deftest is]]
   [clojure.spec.alpha :as s]
   [clojure.spec.gen.alpha :as gen]
   [clojure.spec.test.alpha :as stest]
   [criterium.core :refer [quick-bench]]
   [com.walmartlabs.datascope :as ds]))

; TODO: move this a script that's loaded into the user ns on test start
(require 'pjstadig.humane-test-output)
(pjstadig.humane-test-output/activate!)

(def simple-values
  (concat [:x :x :x \ , \ , \ , \ , \newline] (map char (take 26 (iterate inc 97)))))

(def site-ids [(c/guid) (c/guid) (c/guid) (c/guid) (c/guid)])

(defn rand-node
  ([causal-tree] (rand-node causal-tree (rand-nth site-ids)))
  ([causal-tree site-id]
   (let [cause (rand-nth (keys (::c/nodes causal-tree)))
         lamport-ts (inc (max
                          (first cause)
                          (or (ffirst (last (get-in causal-tree
                                                    [::c/yarns site-id])))
                              0)))
         value (rand-nth simple-values)]
             ; (char (+ (rand 52) 65))
             ; (gen/generate (s/gen ::c/value))]
     (println cause lamport-ts)
     (c/node lamport-ts site-id 0 cause value))))

(defn insert-rand-node
  ([causal-tree] (insert-rand-node causal-tree (rand-node causal-tree)))
  ([causal-tree node] (c/insert causal-tree node)))

(defn idempotent? [causal-tree]
  (let [refreshed-ct (c/refresh-caches causal-tree)]
    (is (= (::c/site-id causal-tree) (::c/site-id refreshed-ct)))
    (is (= (::c/lamport-ts causal-tree) (::c/lamport-ts refreshed-ct)))
    (is (= (::c/nodes causal-tree) (::c/nodes refreshed-ct)))
    (is (= (::c/yarns causal-tree) (::c/yarns refreshed-ct)))
    (is (= (::c/weave causal-tree) (::c/weave refreshed-ct)))))
    ; (is (= causal-tree refreshed-ct))))

(deftest known-idempotent-insert-edge-cases
  (let [nodes [[[0 "0" 0] nil nil]
               [[1 "xT_odlTBwTRNU" 0] [0 "0" 0] :x]
               [[2 "9FyYzf9pum6E4" 0] [1 "xT_odlTBwTRNU" 0] \d]
               [[3 "9FyYzf9pum6E4" 0] [0 "0" 0] \r]
               [[4 "NwudSBdQg3Ru2" 0] [3 "9FyYzf9pum6E4" 0] \space]
               [[4 "9FyYzf9pum6E4" 0] [0 "0" 0] \d]]
        ct (reduce c/insert (c/new-causal-tree) nodes)]
    (idempotent? ct))
  (let [nodes [[[0 "0" 0] nil nil]
               [[1 "xT_odlTBwTRNU" 0] [0 "0" 0] \space]
               [[2 "xT_odlTBwTRNU" 0] [0 "0" 0] \b]
               [[2 "NwudSBdQg3Ru2" 0] [1 "xT_odlTBwTRNU" 0] \q]
               [[2 "9FyYzf9pum6E4" 0] [1 "xT_odlTBwTRNU" 0] \space]]
        ct (reduce c/insert (c/new-causal-tree) nodes)]
    (idempotent? ct))
  (let [nodes [[[0 "0" 0] nil nil]
               [[1 "Pz8iuNCXvVsYN" 0] [0 "0" 0] \o]
               [[2 "Pz8iuNCXvVsYN" 0] [1 "Pz8iuNCXvVsYN" 0] :x]
               [[3 "9FyYzf9pum6E4" 0] [2 "Pz8iuNCXvVsYN" 0] \u]
               [[2 "NwudSBdQg3Ru2" 0] [1 "Pz8iuNCXvVsYN" 0] \space]]
        ct (reduce c/insert (c/new-causal-tree) nodes)]
    (idempotent? ct)))

(deftest iterative-idempotent-weave-one-node-vs-all
  (loop [ct (c/new-causal-tree)
         insertions (::c/weave ct)
         step 0]
    (if (and (< step 99)
             (is (= (::c/weave ct) (::c/weave (c/weave ct)))))
      (let [node (rand-node ct)]
        (recur (c/insert ct node) (conj insertions node) (inc step)))
      (pprint {:step step
               :insertions insertions
               :initial (c/materialize ct)
               :reweave (c/materialize (c/weave ct))}))))

(comment
  (known-idempotent-insert-edge-cases)
  (iterative-idempotent-weave-one-node-vs-all)
  (do
    (def tct (atom (c/new-causal-tree)))
    (do (time (swap! tct insert-rand-node)) nil)
    (time (do (doall (repeatedly 50 #(swap! tct insert-rand-node))) nil))
    (time (clojure.pprint/pprint (c/materialize @tct)))
    (count (::c/nodes @tct))
    (idempotent? @tct)
    (deref tct)
    (clojure.pprint/pprint [(::c/weave @tct) (::c/weave (c/refresh-caches @tct))]))
  (quick-bench (do (doall (repeatedly 10000 #(insert-rand-node @tct))) nil))
  (quick-bench (do (c/materialize @tct) nil)))

; (deftest causal-tree
;   (insert)
;   (append)
;   (weave)
;   (merge)
;   (weft))

(comment
  (s/valid? ::c/lamport-ts 0)
  (gen/generate (s/gen ::c/lamport-ts))
  (gen/generate (s/gen ::c/basic-guid))
  (gen/generate (s/gen ::c/id))
  (gen/generate (s/gen ::c/site-id))
  (gen/generate (s/gen ::c/root))
  (gen/generate (s/gen ::c/node))
  (gen/generate (s/gen ::c/value))
  (gen/generate (s/gen ::c/priority))
  (gen/generate (s/gen ::c/causal-tree))

  (stest/instrument `c/node)
  (stest/check `c/node)
  (s/exercise-fn `c/node))

(comment
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
      ; (def n1b (c/node 8 sb 0 (first (nth (reverse (::c/weave @ct)) 2)) \s))
      (def n1b (c/node 8 sb 0 (second n1a) \s))
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

    (c/materialize @ct)
    (c/materialize (c/weave @ct))
    ; (swap! ct weave)
    ; (ds/view (::weave @ct))
    (deref ct)))
