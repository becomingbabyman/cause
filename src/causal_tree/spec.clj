(ns causal-tree.spec
  (:require
   [clojure.spec.alpha :as spec]
   [clojure.spec.gen.alpha :as gen]))

; node:   the smallest unit of causation. unique Id, Value, Cause.
; nodes:  a map of all nodes by their Ids. This is the canonical store for all nodes in a tree.
; yarn:   CACHE - a time ordered vector of nodes from a specific site. These speed up weft generation and double the size of the tree.
; weft:   a path through 1 or more yarns used to generate a new tree representing any previous state of the tree.
; weave:  CACHE - a partially ordered vector of all nodes. This makes reading the tree O(n), but incresaes inserts from O(1) to O(n).
; causal-tree:  a store for all of the above

; This is an implmentation of a Causal Tree CRDT in CLJ(S)
; Awesome blog post with graphics and Swift impl: http://archagon.net/blog/2018/03/24/data-laced-with-history/
; Original paper: http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.627.5286&rep=rep1&type=pdf
; Follow up paper (more detailed impl): https://www.dropbox.com/spec/6go311vjfqhgd6f/Deep_hypertext_with_embedded_revision_co.pdf?dl=0

(def site-id-length 13)
(def types #{::map ::list}) ; ::rope
(def speical-keywords #{::delete})
(def root-id [0 "0"])
(def root-node [root-id nil nil])

(defn gen-string [length]
  (gen/fmap #(apply str %) (gen/vector (gen/char-alpha) length)))

(spec/def ::type types)
(spec/def ::lamport-ts nat-int?) ; AKA the index in a yarn
; TODO: should a wall-clock-ts be added? If a central Datomic DB is used then nodes will get a wall clock ts based on when they were synced to the server...
(spec/def ::basic-guid (spec/with-gen (spec/and string? #(or
                                                          (= (count %) site-id-length)
                                                          (= % "0")))
                                      #(gen-string site-id-length)))
(spec/def ::site-id ::basic-guid)
(spec/def ::id (spec/tuple ::lamport-ts ::site-id))
(spec/def ::cause ::id)
(spec/def ::value (spec/or :special-k speical-keywords
                           :k keyword?
                           :c char?))

; AKA an atom in CT parlance.
(spec/def ::node (spec/cat :id ::id
                           :cause ::cause
                           :value ::value))
(spec/def ::root (spec/cat :id #{root-id}
                           :cause nil?
                           :value nil?))

(spec/def ::nodes (spec/map-of ::id (spec/tuple ::cause ::value)))

(spec/def ::yarn (spec/coll-of ::node)) ; site specific time sorted vector
(spec/def ::yarns (spec/map-of ::site-id ::yarn)) ; map of yarns keyed by site-id

(spec/def ::weave (spec/or
                   :list-weave (spec/coll-of ::node) ; ordered vector of operations in the order of their output
                   :map-weave (spec/map-of :key (spec/coll-of ::node)))) ; map of ordered vectors corresponding to keys

(spec/def ::causal-tree (spec/keys :req [::nodes ::lamport-ts ::site-id]
                                   :opt [::yarns ::weave]))
