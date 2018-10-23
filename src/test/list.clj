(ns test.list
  (:require
   [causal-tree.util :as u]
   [causal-tree.spec :as s]
   [causal-tree.core :as c]
   [clojure.pprint :refer [pprint]]
   [clojure.string :as string]
   [clojure.test :refer [deftest is]]
   [clojure.spec.alpha :as spec]
   [clojure.spec.gen.alpha :as gen]
   [clojure.spec.test.alpha :as stest]
   [criterium.core :refer [quick-bench]]
   [com.walmartlabs.datascope :as ds]))

; TODO: move this a script that's loaded into the user ns on test start
(require 'pjstadig.humane-test-output)
(pjstadig.humane-test-output/activate!)

(def simple-values
  (concat [::s/delete ::s/delete ::s/delete \ , \ , \ , \ , \newline] (map char (take 26 (iterate inc 97)))))

; (def site-ids [0 1 2])
(def site-ids [(u/guid) (u/guid) (u/guid) (u/guid) (u/guid)])

(defn rand-node
  ([causal-tree] (rand-node causal-tree (rand-nth site-ids)))
  ([causal-tree site-id] (rand-node causal-tree site-id
                                    (rand-nth simple-values)))
                                    ; (char (+ (rand 52) 65))
                                    ; (gen/generate (spec/gen ::s/value))
  ([causal-tree site-id value]
   (let [cause (rand-nth (keys (::s/nodes causal-tree)))
         lamport-ts (inc (max
                          (first cause)
                          (or (ffirst (last (get-in causal-tree
                                                    [::s/yarns site-id])))
                              0)))]
     (c/node lamport-ts site-id cause value))))

(defn insert-rand-node
  ([causal-tree] (c/insert causal-tree (rand-node causal-tree))))

(defn idempotent? [causal-tree]
  (let [refreshed-ct (c/refresh-caches causal-tree)]
    (is (= (::s/site-id causal-tree) (::s/site-id refreshed-ct)))
    (is (= (::s/lamport-ts causal-tree) (::s/lamport-ts refreshed-ct)))
    (is (= (::s/nodes causal-tree) (::s/nodes refreshed-ct)))
    (is (= (::s/yarns causal-tree) (::s/yarns refreshed-ct)))
    (is (= (::s/weave causal-tree) (::s/weave refreshed-ct)))))
    ; (is (= causal-tree refreshed-ct))))

(deftest known-idempotent-insert-edge-cases
  (let [nodes [[[1 "xT_odlTBwTRNU"] [0 "0"] ::s/delete]
               [[2 "9FyYzf9pum6E4"] [1 "xT_odlTBwTRNU"] \d]
               [[3 "9FyYzf9pum6E4"] [0 "0"] \r]
               [[4 "NwudSBdQg3Ru2"] [3 "9FyYzf9pum6E4"] \space]
               [[4 "9FyYzf9pum6E4"] [0 "0"] \d]]
        ct (reduce c/insert (c/new-causal-tree ::s/list) nodes)]
    (idempotent? ct))
  (let [nodes [[[1 "xT_odlTBwTRNU"] [0 "0"] \space]
               [[2 "xT_odlTBwTRNU"] [0 "0"] \b]
               [[2 "NwudSBdQg3Ru2"] [1 "xT_odlTBwTRNU"] \q]
               [[2 "9FyYzf9pum6E4"] [1 "xT_odlTBwTRNU"] \space]]
        ct (reduce c/insert (c/new-causal-tree ::s/list) nodes)]
    (idempotent? ct))
  (let [nodes [[[1 "Pz8iuNCXvVsYN"] [0 "0"] \o]
               [[2 "Pz8iuNCXvVsYN"] [1 "Pz8iuNCXvVsYN"] ::s/delete]
               [[3 "9FyYzf9pum6E4"] [2 "Pz8iuNCXvVsYN"] \u]
               [[2 "NwudSBdQg3Ru2"] [1 "Pz8iuNCXvVsYN"] \space]]
        ct (reduce c/insert (c/new-causal-tree ::s/list) nodes)]
    (idempotent? ct))
  (let [nodes [[[1 "W7XhooU1Hsw7E"] [0 "0"] \j]
               [[1 "VdIJLRISw~zgo"] [0 "0"] \w]
               [[1 "A~iIXinAXkGX7"] [0 "0"] ::s/delete]]
        ct (reduce c/insert (c/new-causal-tree ::s/list) nodes)]
    (idempotent? ct))
  (let [nodes [[[1 "W7XhooU1Hsw7E"] [0 "0"] \u]
               [[2 "W7XhooU1Hsw7E"] [1 "W7XhooU1Hsw7E"] \space]
               [[2 "7hLbMKLvcll_4"] [1 "W7XhooU1Hsw7E"] ::s/delete]
               [[1 "VdIJLRISw~zgo"] [0 "0"] \m]]
        ct (reduce c/insert (c/new-causal-tree ::s/list) nodes)]
    (idempotent? ct))
  (let [nodes [[[1 "Ftbpo0oG7ZnpR"] [0 "0"] ::s/delete]
               [[1 "A~iIXinAXkGX7"] [0 "0"] ::s/delete]]
        ct (reduce c/insert (c/new-causal-tree ::s/list) nodes)]
    (idempotent? ct))
  (let [nodes [[[1 "VdIJLRISw~zgo"] [0 "0"] ::s/delete]
               [[2 "A~iIXinAXkGX7"] [1 "VdIJLRISw~zgo"] "j"]
               [[3 "A~iIXinAXkGX7"] [0 "0"] "i"]
               [[1 "W7XhooU1Hsw7E"] [0 "0"] "s"]]
        ct (reduce c/insert (c/new-causal-tree ::s/list) nodes)]
    (idempotent? ct))
  (let [nodes [[[1 " f "] [0 "0"] ::s/delete]
               [[2 " z "] [1 " f "] " "]
               [[2 " f "] [0 "0"] "l"]
               [[2 " a "] [1 " f "] "v"]]
        ct (reduce c/insert (c/new-causal-tree ::s/list) nodes)]
    (idempotent? ct))
  (let [nodes [[[1 " f "] [0 "0"] ::s/delete]
               [[2 " f "] [0 "0"] ::s/delete]
               [[3 " a "] [2 " f "] "c"]
               [[2 " z "] [1 " f "] "r"]]
        ct (reduce c/insert (c/new-causal-tree ::s/list) nodes)]
    (idempotent? ct)))

(defn find-weave-inconsistencies
  ([] (find-weave-inconsistencies 9))
  ([max-steps]
   (loop [ct (c/new-causal-tree ::s/list)
          insertions (::s/weave ct)
          step 0]
     (if (>= step max-steps)
       nil
       (if (is (= (::s/weave ct) (::s/weave (c/weave ct))))
         (let [node (rand-node ct)]
           (recur (c/insert ct node) (conj insertions node) (inc step)))
         {:insertions insertions
          :step step
          :initial (c/materialize ct)
          :reweave (c/materialize (c/weave ct))})))))

(comment
  (known-idempotent-insert-edge-cases)
  (time
   (keep (fn [_] (find-weave-inconsistencies 9))
         (range 999))))

(def prose (string/split "Hereupon Legrand arose, with a grave and stately air, and brought me the beetle
from a glass case in which it was enclosed. It was a beautiful scarabaeus, and, at
that time, unknown to naturalists—of course a great prize in a scientific point
of view. There were two round black spots near one extremity of the back, and a
long one near the other. The scales were exceedingly hard and glossy, with all the
appearance of burnished gold. The weight of the insect was very remarkable, and,
taking all things into consideration, I could hardly blame Jupiter for his opinion
respecting it." #" "))

(defn rand-phrase []
  (let [t (+ 2 (rand-int 6))
        d (- (rand-int (count prose)) t)]
    (string/join " " (take t (drop d prose)))))

(defn rand-weave-of-phrases
  ([] (rand-weave-of-phrases 3))
  ([n-phrases]
   (let [starting-phrases (map #(str " <" % "> ") (repeatedly n-phrases rand-phrase))]
     (loop [ct (c/new-causal-tree ::s/list)
            insertions []
            phrase (first starting-phrases)
            phrases (rest starting-phrases)
            site-id (u/guid)]
       (if (not-empty phrase)
         (let [cause (last (get-in ct [::s/yarns site-id]))
               node  (c/node (inc (or (ffirst cause) 1)) site-id
                             (or (first cause) s/root-id) (first phrase))]
               ; (rand-node ct site-id (first phrase))]
           (recur (c/insert ct node)
                  (conj insertions node)
                  (if (not-empty (rest phrase)) (rest phrase) (first phrases))
                  (if (not-empty (rest phrase)) phrases (rest phrases))
                  (if (not-empty (rest phrase)) site-id (u/guid))))
         {:ct ct
          :insertions insertions
          :phrases starting-phrases
          :materialized-weave (c/materialize ct)
          :materialized-reweave (c/materialize (c/weave ct))})))))

(deftest concurrent-runs-stick-together
  (let [result (rand-weave-of-phrases 5)]
    (doall (map #(is (string/includes? (:materialized-weave result) %))
                (:phrases result)))))

(comment
  (rand-phrase)
  (dissoc (rand-weave-of-phrases 3) :ct :insertions)
  (concurrent-runs-stick-together))

(deftest causal-tree
  (known-idempotent-insert-edge-cases)
  (keep (fn [_] (find-weave-inconsistencies 9))
        (range 999))
  (concurrent-runs-stick-together))
  ; (insert)
  ; (append)
  ; (weave)
  ; (weft)
  ; (merge)

(comment
  (causal-tree))

(comment
  [:document
   [:b/paragraph
    "foo"
    [:m/italic [:bold "bar"]]
    [:i/link {:url "http://npr.org"} "fizz"]
    [:text {:marks [:bold]} "buzz"]]])

(comment
  (do
    (def tct (atom (c/new-causal-tree ::s/list)))
    (do (time (swap! tct insert-rand-node)) nil)
    (swap! tct c/insert (rand-node @tct (::s/site-id @tct) :yolo))
    (time (do (doall (repeatedly 50 #(swap! tct insert-rand-node))) nil))
    (time (clojure.pprint/pprint (c/materialize @tct)))
    (count (::s/nodes @tct))
    (idempotent? @tct)
    (deref tct)
    (clojure.pprint/pprint [(::s/weave @tct) (::s/weave (c/refresh-caches @tct))]))
  (quick-bench (do (doall (repeatedly 10000 #(insert-rand-node @tct))) nil))
  (quick-bench (do (c/materialize @tct) nil)))

(comment
  (spec/valid? ::s/lamport-ts 0)
  (gen/generate (spec/gen ::s/lamport-ts))
  (gen/generate (spec/gen ::s/basic-guid))
  (gen/generate (spec/gen ::s/id))
  (gen/generate (spec/gen ::s/site-id))
  (gen/generate (spec/gen ::s/root))
  (gen/generate (spec/gen ::s/node))
  (gen/generate (spec/gen ::s/value))
  (gen/generate (spec/gen ::s/causal-tree))

  (stest/instrument `c/node)
  (stest/check `c/node)
  (spec/exercise-fn `c/node))

(comment
  (do
    (def ct (atom (c/new-causal-tree ::s/list)))

    (u/insert [[1 1] [2 2] [4 4]] [3 3])

    ; (swap! ct assoc ::yarns {})
    (deref ct)
    (c/spin @ct)
    ; (c/spin @ct (c/node (second (::nodes @ct))))
    ; (swap! ct c/spin)

    (c/weave @ct (second (reverse (sort (::s/nodes @ct)))))
    (::s/weave (c/weave @ct))
    (swap! ct c/weave)

    (def test-node (c/node 1 (u/guid) s/root-id \c))
    (def test-node-2 (c/node 2 (u/guid) (first test-node) \a))
    (def test-node-3 (c/node 3 (u/guid) (first test-node-2) \r))
    (swap! ct c/insert test-node)
    (swap! ct c/insert test-node-2)
    (swap! ct c/insert test-node-3)

    (swap! ct c/append ::s/delete (first test-node-3))
    (swap! ct c/append \t (first test-node-2))
    (swap! ct c/append \k (first test-node))
    (swap! ct c/append ::s/delete (first test-node))

    (c/materialize @ct)

    (def some-weft-ids (map (comp first last last) (::s/yarns @ct)))
    (c/weft @ct some-weft-ids)
    ; (c/materialize (c/weft @ct [[0 "0"]
    ;                             [1 "SoEKxJ2JiC5dY"]
    ;                             [2 "81KYDSlVWQD0~"]
    ;                             [3 "rTCvwmeN3eRbJ"]
    ;                             [7 "STVsuW03bB8zO"]
    ;                             ; [19 "YHBqZnNGiunOS"]
    ;                             [18 "rOYr~lq0ByHG2"]]))
    ; (dspec/view @ct)
    ; (dspec/view (::s/yarns @ct))
    ; (dspec/view (::s/weave @ct))

    (do
      ; " and the hat"
      (def sa (u/guid))
      (def n1a (c/node 8 sa (ffirst (reverse (::s/weave @ct))) (first " ")))
      (def n2a (c/node 9 sa (first n1a) \a))
      (def n3a (c/node 10 sa (first n2a) \n))
      (def n4a (c/node 11 sa (first n3a) \d))
      (def n5a (c/node 12 sa (first n4a) (first " ")))
      (def n6a (c/node 13 sa (first n5a) \t))
      (def n7a (c/node 14 sa (first n6a) \h))
      (def n8a (c/node 15 sa (first n7a) \e))
      (def n9a (c/node 16 sa (first n8a) (first " ")))
      (def n10a (c/node 17 sa (first n9a) \h))
      (def n11a (c/node 18 sa (first n10a) \a))
      (def n12a (c/node 19 sa (first n11a) \t))
      ; "s love dogs"
      (def sb (u/guid))
      ; (def n1b (c/node 8 sb (first (nth (reverse (::s/weave @ct)) 2)) \s))
      (def n1b (c/node 8 sb (second n1a) \s))
      (def n2b (c/node 9 sb (first n1b) (first " ")))
      (def n3b (c/node 10 sb (first n2b) \l))
      (def n4b (c/node 11 sb (first n3b) \o))
      (def n5b (c/node 12 sb (first n4b) \v))
      (def n6b (c/node 13 sb (first n5b) \e))
      (def n7b (c/node 14 sb (first n6b) (first " ")))
      (def n8b (c/node 15 sb (first n7b) \d))
      (def n9b (c/node 16 sb (first n8b) \o))
      (def n10b (c/node 17 sb (first n9b) \g))
      (def n11b (c/node 18 sb (first n10b) \s))
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
    ; (dspec/view (::weave @ct))
    (deref ct)))
