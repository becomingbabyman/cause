(ns causal.runner
  (:require [doo.runner :refer-macros [doo-tests]]
            [causal.base.core-test]
            [causal.core-test]
            [causal.collections.list-test]
            [causal.collections.map-test]
            [causal.collections.shared-test]))

(doo-tests
 'causal.base.core-test
 'causal.core-test
 'causal.collections.list-test
 'causal.collections.map-test
 'causal.collections.shared-test)
