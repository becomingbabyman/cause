(ns cause.protocols)

(defprotocol CausalTree
  "The CvRDT related functions that a causal collection type must implement."
  (get-uuid [causal]
    "The UUID of the causal collection.")
  (get-ts [causal]
    "The current lamport timestamp of the causal collection.")
  (get-site-id [causal]
    "The site identifer of this machine in this collection.")
  (get-weave [causal]
    "The woven cache of nodes.")
  ; (get-nodes [causal])
  ; (get-yarns [causal])
  ; (get-ct [causal])
  (insert [causal node]
    "Insert a node in the causal collection.")
  (append [causal cause value]
    "Creates a node from a cause and a value and inserts it
    at the current lamport timestamp.")
  (weft [causal ids-to-cut-yarns]
    "Cut each yarn at an id and rebuild the causal collection at a
    previous point in time.")
  (causal-merge [causal1 causal2]
    "Merge causal collections of the same type together. They must
    be the same tree (same uuid). Causality (sites, nodes,
    timestamps) should be the only differences between them."))

(defprotocol CausalTo
  (causal->edn [causal opts]
    "Convert a causal collection into a traditional edn collection.
    It will automatically deref atom values unless you pass the opt
    `:deref-atoms false`"))
