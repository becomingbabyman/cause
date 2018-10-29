
(ns causal-tree.runner
  (:require [doo.runner :refer-macros [doo-tests]]
            [causal-tree.shared-test]
            [causal-tree.list-test]
            [causal-tree.map-test]))

(doo-tests
 'causal-tree.shared-test
 'causal-tree.list-test
 'causal-tree.map-test)
