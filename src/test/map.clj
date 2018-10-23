(ns test.map
  (:require
   [causal-tree.util :as u]
   [causal-tree.shared :as s]
   [causal-tree.core :as c]
   [clojure.pprint :refer [pprint]]
   [clojure.string :as string]
   [clojure.test :refer [deftest is]]))

(comment
  (pprint
   (c/assoc
    (c/new-causal-tree ::s/map)
    :foo "bar")))

(comment
  (def ct (atom (c/new-causal-tree ::s/map)))
  (pprint (swap! ct c/assoc :foo "bar"))
  (pprint (swap! ct c/assoc :baz "boo"))
  (pprint (swap! ct c/assoc :baz "bing!"))
  (pprint (swap! ct c/dissoc :foo))
  (pprint (deref ct))
  (pprint (c/materialize @ct)))
