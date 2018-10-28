(ns user
  (:require [pjstadig.humane-test-output]
            [figwheel-sidecar.repl-api :as ra]))

(pjstadig.humane-test-output/activate!)

(defn start []
  (ra/start-figwheel!
   {:figwheel-options {}
    :build-ids ["dev"]
    :all-builds
    [{:id "dev"
      :figwheel true
      :source-paths ["src"]
      :compiler {:main "causal-tree.core"
                 :asset-path "resources/public"
                 :output-to "target/figwheel/main.js"
                 :output-dir "target/figwheel/out"
                 :verbose false}}]}))

(defn stop []
  (ra/stop-figwheel!))

(defn repl []
  (ra/cljs-repl))
