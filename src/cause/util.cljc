(ns cause.util
  (:require [nano-id.core :refer [nano-id]]))

(defn <<
  "Return non-nil if runs of any type are in
  monotonically increasing order."
  ([a b]
   (< (compare a b) 0))
  ([a b & more]
   (and (<< a b) (apply << b more))))

(defn uid
  "Returns a globally unique ID, encoded to take up as little
  space as possible. See this site for help picking a reasonable
  length https://zelark.github.io/nano-id-cc/. The default for
  nano-id is 21 which maps similarly to the uniqueness of most uuid
  generators and is a good default if your scope is not bounded."
  ; TODO: consider the tradoffs of nano-id compared to a standard uuid implmentation https://www.itu.int/en/ITU-T/asn1/Pages/UUID/uuids.aspx
  ([] (nano-id))
  ([length] (nano-id length)))

(defn sorted-insertion-index
  "Returns the insertion index for the target assuming the collection
  is already sorted."
  ([coll target] (sorted-insertion-index coll target {:uniq false}))
  ([coll target options]
   (loop [low-idx 0
          high-idx (dec (count coll))]
     (if (> low-idx high-idx)
       low-idx
       (let [mid-idx (quot (+ low-idx high-idx) 2)
             mid-val (coll mid-idx)]
         (cond
           (= mid-val target) (if (:uniq options) nil mid-idx)
           (< (compare mid-val target) 0) (recur (inc mid-idx) high-idx)
           (> (compare mid-val target) 0) (recur low-idx (dec mid-idx))))))))

(defn insert
  "Returns a vector with a value inserted at the index. Prefer using
  core clojure seq functions like conj over this, for better performance.
  If no index is specified, assume the vector is sorted and try to maintain
  the sort on insert."
  ([coll val] (if-let [i (sorted-insertion-index coll val {:uniq true})]
                (insert coll i val) coll))
  ([coll i val] (vec (concat (take i coll) [val] (drop i coll)))))

(defmacro redef
  "Moves a symbol to the current ns, preserving the docstring and arglists."
  [symbol value]
  `(let [m# (meta (var ~value))]
     (def ~symbol ~value)
     (alter-meta! #'~symbol #(assoc % :doc (:doc m#)
                                    :arglists (:arglists m#)))
     #'~symbol))
