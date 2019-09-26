(ns cause.runner
  (:require [doo.runner :refer-macros [doo-tests]]
            [cause.base-test]
            [cause.core-test]
            [cause.list-test]
            [cause.map-test]
            [cause.shared-test]))

(doo-tests
 'cause.base-test
 'cause.core-test
 'cause.list-test
 'cause.map-test
 'cause.shared-test)
