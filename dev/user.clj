(ns user
  (:require [pjstadig.humane-test-output]
            [figwheel-sidecar.repl-api :as ra]))

(pjstadig.humane-test-output/activate!)

(defn start []
  (ra/start-figwheel!))

(defn stop []
  (ra/stop-figwheel!))

(defn repl []
  (ra/cljs-repl))
