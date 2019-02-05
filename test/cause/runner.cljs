(ns cause.runner
  (:require [doo.runner :refer-macros [doo-tests]]
            [cause.core-test]
            [cause.shared-test]
            [cause.list-test]
            [cause.map-test]))

(doo-tests
 'cause.core-test
 'cause.shared-test
 'cause.list-test
 'cause.map-test)
