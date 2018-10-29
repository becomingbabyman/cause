(ns user
  (:require [pjstadig.humane-test-output]
            [figwheel-sidecar.repl-api :as ra]))

(pjstadig.humane-test-output/activate!)

(defn start-fw []
  (ra/start-figwheel!))

(defn stop-fw []
  (ra/stop-figwheel!))

(defn repl-cljs []
  (ra/cljs-repl))

(defn cljs []
  (start-fw)
  (repl-cljs))
