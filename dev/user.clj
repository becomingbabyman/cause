(ns user
  (:require [pjstadig.humane-test-output]
            [figwheel-sidecar.repl-api :as ra]
            [clojure.test :refer [run-tests run-all-tests]]))

(pjstadig.humane-test-output/activate!)

(defn start-fw []
  (ra/start-figwheel! "dev"))

(defn stop-fw []
  (ra/stop-figwheel!))

(defn repl-cljs []
  (ra/cljs-repl))

(defn cljs []
  (start-fw)
  (repl-cljs))

(defn t
  ([] (run-all-tests #"causal-tree.*"))
  ([ns-sym-to-test] (run-tests ns-sym-to-test)))
