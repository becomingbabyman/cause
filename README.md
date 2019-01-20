# Cause [![Build][travis-image]][travis-url]

> An EDN-like CRDT (Causal Tree) for Clojure(Script) that automatically tracks history and resolves conflicts. This implementation takes a lot of cues from [Data Laced with History](http://archagon.net/blog/2018/03/24/data-laced-with-history/) and many papers on the topic of CRDTs.

## Development

#### Test CLJ
```
lein test
```

#### Test CLJS
```
npm install
lein cljs-test
```

#### Dev REPL / nREPL
```
lein repl

user=> (cljs) ; to get a cljs repl
cljs.user=> :cljs/quit ; to go back to clj repl
```

[travis-image]: https://img.shields.io/travis/smothers/cause.svg?style=flat-square
[travis-url]: https://travis-ci.org/smothers/cause

## Notes

### Clojure Collection Functions

Most Clojure collection functions should just work with causal collections. E.g. `count` returns the number of active values, automatically ignoring hidden and special values. Or for a causal map `(get (cause/new-causal-map :foo "bar") :foo)` will return `"bar"`.

On the other hand, `seq` and functions related to seq like `first, last, next, rest, map` return active nodes, not just values. This preserves the helpful causal metadata like `ids` and `causes` so you have access to it while iterating over a collection.

**Gotchas:**

- All causal collections act like their EDN equivalent collection around Clojure collection functions. This means they only reveal active values. E.g. if a key is `dissoc`'d from a causal-map you will not be able to `get` it even though it does still exist in the underlying causal data structure.

### History / Change Tracking / Version Control

Causal collections will automatically track the order values are inserted into them via lamport timestamps. This includes deletions and potentially undo, redo and rewind operations. These values are all immutable, so the entire history of a causal collection exists within it. Blame information is also available via site-ids so you can see which site made each change.

**Gotchas:**

- When an insertion occurs is not tracked. E.g. there is no way to introspect on all the changes that occurred today because wall clock times are not stored anywhere.
- Who made a change is pseudonymous by default, via a random site-id. All changes from the same site will share a site-id, but it is not personally identifiable. Do not change this. Site-ids are immutably encoded in the collection and shared with every site, so once personal identity is added it is impossible to remove. If you wish to associate sites with other identity information from your system, create a mapping between the randomly assigned site-id and the additional identity information like name or email. This mapping should be stored separately from the causal collection and managed with appropriate security and access levels.
- Nested causal collections do not automatically share history with each other. If you want nested causal collections to share history you'll have to manage the lamport timestamps manually, sharing one lamport timestamp across all causal collections that you want to have a shared history.
  - TODO: will undo and redo automatically account for nested collections with shared history or will that be a manual process as well?
- Transactions (multiple insertions at the same logical time) are supported via tx-index. Every node id has a tx-index of 0 by default. To insert multiple nodes at the same time keep the lamport-ts the same and instead increment the tx-index on each new node. E.g. when copying and pasting text, the text can be split on characters and inserted as individual character nodes, but the lamport-ts remains the same so on undo, all characters that were part of this paste operation can be hidden simultaneously.
