(ns cause.util
  (:require [nano-id.custom :refer [generate]]))

(defn <<
  "Return non-nil if runs of any type are in
  monotonically increasing order."
  ([a b]
   (< (compare a b) 0))
  ([a b & more]
   (and (<< a b) (apply << b more))))

(def first-char-alphabet "ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz") ; Makes all uids valid keywords
(def id-alphabet (str "0123456789" first-char-alphabet))
(def my-nano-id (generate id-alphabet))
(defn new-uid
  "Returns a globally unique ID, encoded to take up as little
  space as possible. See this site for help picking a reasonable
  length https://zelark.github.io/nano-id-cc/. The default for
  nano-id is 21 which maps similarly to the uniqueness of most uuid
  generators and is a good default if your scope is not bounded."
  ; TODO: consider the tradoffs of nano-id compared to a standard uuid implmentation https://www.itu.int/en/ITU-T/asn1/Pages/UUID/uuids.aspx
  ([] (new-uid 21))
  ([length] (str (rand-nth first-char-alphabet) (my-nano-id (dec length)))))

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
  ([coll val opts] (if-let [i (sorted-insertion-index coll val {:uniq true})]
                     (insert coll i val opts) coll))
  ([coll i val {:keys [next-vals]}] (into (subvec coll 0 i) cat [[val] next-vals (subvec coll i)])))

(defmacro redef
  "Moves a symbol to the current ns, preserving the docstring and arglists."
  [symbol value]
  `(let [m# (meta (var ~value))]
     (def ~symbol ~value)
     (alter-meta! #'~symbol #(assoc % :doc (:doc m#)
                                    :arglists (:arglists m#)))
     #'~symbol))

; https://lambdaisland.com/blog/2017-06-12-clojure-gotchas-surrogate-pairs
(defn char-code-at [str pos]
  #? (:clj (.charAt str pos)
           :cljs (.charCodeAt str pos)))
; OPTIMIZE: this breaks on long strings
; NOTE: do not use util optimized.
(defn char-seq
  "Return a seq of the characters in a string, making sure not to split up
  UCS-2 (or is it UTF-16?) surrogate pairs. Because JavaScript. And Java."
  ([str]
   (char-seq str 0))
  ([str offset]
   (if (>= offset (count str))
     ()
     (let [code (char-code-at str offset)
           width (if (<= 0xD800 (int code) 0xDBFF) 2 1)] ; detect "high surrogate"
       (cons (subs str offset (+ offset width))
             (char-seq str (+ offset width)))))))

(comment
  (char-seq "🤟")
  (char-seq "🤟🏿") ; TODO: 🤟🏿 should actually have a width of 4 and be parsed as 1 char
  (char-seq "🤟🏿wat"))
