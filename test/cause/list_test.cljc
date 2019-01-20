(ns cause.list-test
  (:require [cause.shared :as s]
            [cause.core :as c]
            [cause.list :as c-list]
            [clojure.string :as string]
            [clojure.test :refer [deftest is]]
            #? (:clj [criterium.core :refer [quick-bench]])))

(def simple-values
  (concat [c/hide c/hide c/hide c/show c/show \ , \ , \ , \ , \newline] (map char (take 26 (iterate inc 97)))))

; (def site-ids [0 1 2])
(def site-ids [(s/new-site-id) (s/new-site-id) (s/new-site-id) (s/new-site-id) (s/new-site-id)])

(defn rand-node
  ([causal-list] (rand-node causal-list (rand-nth site-ids)))
  ([causal-list site-id] (rand-node causal-list site-id
                                    (rand-nth simple-values)))
                                    ; (char (+ (rand 52) 65))
                                    ; (gen/generate (spec/gen ::s/value))
  ([causal-list site-id value]
   (let [causal-tree (.-ct causal-list)
         cause (rand-nth (keys (::s/nodes causal-tree)))
         lamport-ts (inc (max
                          (first cause)
                          (or (ffirst (peek (get-in causal-tree
                                                    [::s/yarns site-id])))
                              0)))]
     (c/new-node lamport-ts site-id cause value))))

(defn insert-rand-node
  ([causal-list] (c/insert causal-list (rand-node causal-list))))

(defn idempotent? [causal-list]
  (let [causal-tree (.-ct causal-list)
        refreshed-ct (s/refresh-caches c-list/weave causal-tree)]
    (is (= (::s/site-id causal-tree) (::s/site-id refreshed-ct)))
    (is (= (::s/lamport-ts causal-tree) (::s/lamport-ts refreshed-ct)))
    (is (= (::s/nodes causal-tree) (::s/nodes refreshed-ct)))
    (is (= (::s/yarns causal-tree) (::s/yarns refreshed-ct)))
    (is (= (::s/weave causal-tree) (::s/weave refreshed-ct)))))
    ; (is (= causal-tree refreshed-ct))))

(deftest known-idempotent-insert-edge-cases
  (let [nodes [[[1 "xT_odlTBwTRNU" 0] [0 "0" 0] c/hide]
               [[2 "9FyYzf9pum6E4" 0] [1 "xT_odlTBwTRNU" 0] \d]
               [[3 "9FyYzf9pum6E4" 0] [0 "0" 0] \r]
               [[4 "NwudSBdQg3Ru2" 0] [3 "9FyYzf9pum6E4" 0] \space]
               [[4 "9FyYzf9pum6E4" 0] [0 "0" 0] \d]]
        cl (reduce c/insert (c/new-causal-list) nodes)]
    (idempotent? cl))
  (let [nodes [[[1 "xT_odlTBwTRNU" 0] [0 "0" 0] \space]
               [[2 "xT_odlTBwTRNU" 0] [0 "0" 0] \b]
               [[2 "NwudSBdQg3Ru2" 0] [1 "xT_odlTBwTRNU" 0] \q]
               [[2 "9FyYzf9pum6E4" 0] [1 "xT_odlTBwTRNU" 0] \space]]
        cl (reduce c/insert (c/new-causal-list) nodes)]
    (idempotent? cl))
  (let [nodes [[[1 "Pz8iuNCXvVsYN" 0] [0 "0" 0] \o]
               [[2 "Pz8iuNCXvVsYN" 0] [1 "Pz8iuNCXvVsYN" 0] c/hide]
               [[3 "9FyYzf9pum6E4" 0] [2 "Pz8iuNCXvVsYN" 0] \u]
               [[2 "NwudSBdQg3Ru2" 0] [1 "Pz8iuNCXvVsYN" 0] \space]]
        cl (reduce c/insert (c/new-causal-list) nodes)]
    (idempotent? cl))
  (let [nodes [[[1 "W7XhooU1Hsw7E" 0] [0 "0" 0] \j]
               [[1 "VdIJLRISw~zgo" 0] [0 "0" 0] \w]
               [[1 "A~iIXinAXkGX7" 0] [0 "0" 0] c/hide]]
        cl (reduce c/insert (c/new-causal-list) nodes)]
    (idempotent? cl))
  (let [nodes [[[1 "W7XhooU1Hsw7E" 0] [0 "0" 0] \u]
               [[2 "W7XhooU1Hsw7E" 0] [1 "W7XhooU1Hsw7E" 0] \space]
               [[2 "7hLbMKLvcll_4" 0] [1 "W7XhooU1Hsw7E" 0] c/hide]
               [[1 "VdIJLRISw~zgo" 0] [0 "0" 0] \m]]
        cl (reduce c/insert (c/new-causal-list) nodes)]
    (idempotent? cl))
  (let [nodes [[[1 "Ftbpo0oG7ZnpR" 0] [0 "0" 0] c/hide]
               [[1 "A~iIXinAXkGX7" 0] [0 "0" 0] c/hide]]
        cl (reduce c/insert (c/new-causal-list) nodes)]
    (idempotent? cl))
  (let [nodes [[[1 "VdIJLRISw~zgo" 0] [0 "0" 0] c/hide]
               [[2 "A~iIXinAXkGX7" 0] [1 "VdIJLRISw~zgo" 0] "j"]
               [[3 "A~iIXinAXkGX7" 0] [0 "0" 0] "i"]
               [[1 "W7XhooU1Hsw7E" 0] [0 "0" 0] "s"]]
        cl (reduce c/insert (c/new-causal-list) nodes)]
    (idempotent? cl))
  (let [nodes [[[1 " f " 0] [0 "0" 0] c/hide]
               [[2 " z " 0] [1 " f " 0] " "]
               [[2 " f " 0] [0 "0" 0] "l"]
               [[2 " a " 0] [1 " f " 0] "v"]]
        cl (reduce c/insert (c/new-causal-list) nodes)]
    (idempotent? cl))
  (let [nodes [[[1 " f " 0] [0 "0" 0] c/hide]
               [[2 " f " 0] [0 "0" 0] c/hide]
               [[3 " a " 0] [2 " f " 0] "c"]
               [[2 " z " 0] [1 " f " 0] "r"]]
        cl (reduce c/insert (c/new-causal-list) nodes)]
    (idempotent? cl)))

(defn find-weave-inconsistencies
  ([] (find-weave-inconsistencies 9))
  ([max-steps]
   (loop [cl (c/new-causal-list)
          insertions (c/get-weave cl)
          step 0]
     (if (>= step max-steps)
       nil
       (if (is (= (c/get-weave cl) (::s/weave (c-list/weave (.-ct cl)))))
         (let [node (rand-node cl)]
           (recur (c/insert cl node) (conj insertions node) (inc step)))
         {:insertions insertions
          :step step
          :initial (c/causal->edn cl)
          :reweave (c/causal->edn (c-list/weave cl))})))))

(deftest try-to-find-new-idempotent-edge-cases
  (is (empty? (keep (fn [_] (find-weave-inconsistencies 9))
                    (range 99)))))

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
     (loop [cl (c/new-causal-list)
            insertions []
            phrase (first starting-phrases)
            phrases (rest starting-phrases)
            site-id (s/new-site-id)]
       (if (not-empty phrase)
         (let [cause (peek (get-in (.-ct cl) [::s/yarns site-id]))
               node  (c/new-node (inc (or (ffirst cause) 1)) site-id
                                 (or (first cause) s/root-id) (first phrase))]
               ; (rand-node cl site-id (first phrase))]
           (recur (c/insert cl node)
                  (conj insertions node)
                  (if (not-empty (rest phrase)) (rest phrase) (first phrases))
                  (if (not-empty (rest phrase)) phrases (rest phrases))
                  (if (not-empty (rest phrase)) site-id (s/new-site-id))))
         {:cl cl
          :insertions insertions
          :phrases starting-phrases
          :materialized-weave (apply str (c/causal->edn cl))
          :materialized-reweave (apply str (c/causal->edn (c-list/weave (.-ct cl))))})))))

(deftest concurrent-runs-stick-together
  (let [result (rand-weave-of-phrases 5)]
    (doall (map #(is (string/includes? (:materialized-weave result) %))
                (:phrases result)))))

(deftest hide-and-show-and-hide-and-show
  (let [cl (atom (c/new-causal-list "a" "b" "c"))
        a-node (second (c/get-weave @cl))]
    (is (= '("a" "b" "c") (c/causal->edn @cl)))
    (swap! cl c/append (first a-node) c/hide)
    (is (= '("b" "c") (c/causal->edn @cl)))
    (swap! cl c/append (first a-node) c/show)
    (is (= '("a" "b" "c") (c/causal->edn @cl)))
    (swap! cl c/append (first a-node) c/hide)
    (is (= '("b" "c") (c/causal->edn @cl)))
    (swap! cl c/append (first a-node) c/show)
    (is (= '("a" "b" "c") (c/causal->edn @cl)))))

(deftest core-cljc-list-protocol-test
  ; empty? conj count seq first
  ; last next rest map seq hash
  ; TODO: str get get-in nth mapv reduce reduce-kv update update-in cons
  (is (empty? (c/new-causal-list)))
  (is (not (empty? (c/new-causal-list :foo "bar"))))
  (is (empty? (-> (c/new-causal-list :foo) (conj c/hide))))
  (let [ct (c/new-causal-list :foo)
        n (first ct)]
    (is (not (empty? (-> (c/append ct (first n) c/hide)
                         (c/append (first n) c/show))))))
  (is (= 0 (count (c/new-causal-list))))
  (is (= 1 (count (c/new-causal-list :foo))))
  (is (= 0 (count (-> (c/new-causal-list :foo) (conj c/hide)))))
  (let [ct (c/new-causal-list :foo)
        n (first ct)]
    (is (= 1 (count (-> (c/append ct (first n) c/hide)
                        (c/append (first n) c/show))))))
  (let [node [[1 "site-id" 0] s/root-id :foo]]
    (is (= (list node) (seq (-> (c/new-causal-list) (c/insert node)))))
    (is (= node (first (-> (c/new-causal-list) (c/insert node)))))
    (is (= node (last (-> (c/new-causal-list) (c/insert node)))))
    (is (= nil (next (-> (c/new-causal-list) (c/insert node)))))
    (is (= (list node) (next (-> (c/new-causal-list) (c/insert node) (c/append s/root-id "bar")))))
    (is (= '() (rest (-> (c/new-causal-list) (c/insert node)))))
    (is (= (list node) (rest (-> (c/new-causal-list) (c/insert node) (c/append s/root-id "bar")))))
    (is (= (list node) (map #(do %) (-> (c/new-causal-list) (c/insert node))))))
  (is (int? (hash (c/new-causal-list :foo)))))

(comment
  (do
    (known-idempotent-insert-edge-cases)
    (try-to-find-new-idempotent-edge-cases)
    (concurrent-runs-stick-together)
    (hide-and-show-and-hide-and-show)
    (core-cljc-list-protocol-test))

  (time
   (keep (fn [_] (find-weave-inconsistencies 9))
         (range 999)))

  (rand-phrase)
  (dissoc (rand-weave-of-phrases 3) :cl :insertions)

  (def cl (atom (c/new-causal-list)))
  (time (do (doall (repeatedly 200 #(swap! cl insert-rand-node))) nil))
  (quick-bench (do (insert-rand-node @cl) nil))
  (quick-bench (do (c/causal->edn @cl) nil))

  (def cl2 (atom (c/new-causal-list)))
  (time (do (doall (repeatedly 5 #(swap! cl2 insert-rand-node))) nil))
  (swap! cl2 c/append (first (second (c/get-weave @cl2))) c/hide)
  (swap! cl2 c/append (first (second (c/get-weave @cl2))) c/show)
  (c/causal->edn @cl2))
