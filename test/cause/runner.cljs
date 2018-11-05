(ns cause.runner
  (:require [doo.runner :refer-macros [doo-tests]]
            [cause.shared-test]
            [cause.list-test]
            [cause.map-test]))

(doo-tests
 'cause.shared-test
 'cause.list-test
 'cause.map-test)
