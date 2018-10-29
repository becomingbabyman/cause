
(ns causal-tree.runner
  (:require [doo.runner :refer-macros [doo-tests]]
            [causal-tree.list-test]
            [causal-tree.map-test]))

; (require 'pjstadig.humane-test-output)
; (pjstadig.humane-test-output/activate!)

(doo-tests
 'causal-tree.map-test
 'causal-tree.list-test)
