(ns cause.protocols)

(defprotocol CausalTree
  "The CvRDT related functions that a causal collection type must implement."
  (get-uuid [causal])
  (get-ts [causal])
  (get-site-id [causal])
  (get-weave [causal])
  ; (get-nodes [causal])
  ; (get-yarns [causal])
  ; (get-ct [causal])
  (insert [causal node]
    "Insert a node in the causal type.")
  (append [causal cause value]
    "Creates a node from a cause and a value and inserts it
    at the current timestamp.")
  (weft [causal ids-to-cut-yarns]
    "Cut each yarn at an id and rebuild the causal object at a
    previous point in time.")
  (causal-merge [causal1 causal2]
    "Merge causal objects of the same type together. They must
    be the same tree with the same uuid. Causality (sites, nodes,
    timestamps) should be the only differences between them."))
