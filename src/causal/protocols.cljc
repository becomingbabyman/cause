(ns causal.protocols)

(defprotocol CausalMeta
  "Convenience access to the meta data in a causal data type."
  (get-uuid [causal]
    "The UUID of the causal collection.")
  (get-ts [causal]
    "The current lamport timestamp of the causal collection.")
  (get-site-id [causal]
    "The site identifer of this machine in this collection."))

(defprotocol CausalTree
  "The CvRDT related functions that a causal tree type must implement."
  (get-weave [causal]
    "The woven cache of nodes.")
  (get-nodes [causal]
    "A map of nodes in the form of {id [cause value]}")
  ; (get-yarns [causal])
  ; (get-ct [causal])
  (insert [causal node] [causal node more-nodes-in-tx]
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
  (causal->edn [causal] [causal opts]
    "Convert a causal collection into a traditional edn collection.
    It will automatically deref atom values unless you pass the opt
    `:deref-atoms false`"))

(defprotocol CausalBase
  (transact [causal-base tx]
    "Apply one or many \"changes\" at the current logical time.")
  (get-collection [causal-base] [causal-base ref-or-uuid]
    "Returns the causal collection referenced by the uuid or ref.
    If no uuid or ref is passed, the root collection will be returned.")
  (undo [causal-base]
    "Undo a transaction by the local site-id.")
  (redo [causal-base]
    "Redo a transaction by the local site-id.")
  (set-site-id [causal-base site-id]
    "Sets the local site-id."))
