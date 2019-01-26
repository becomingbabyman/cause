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

- The time an insertion occurs is not tracked. E.g. there is no way to introspect on all the changes that occurred today because wall clock times are not stored anywhere.
- Who made a change is pseudonymous by default, via a random site-id. All changes from the same site will share a site-id, but it is not personally identifiable. Do not change this. Site-ids are immutably encoded in the collection and shared with every site, so once personal identity is added it is impossible to remove. If you wish to associate sites with other identity information from your system, create a mapping between the randomly assigned site-id and the additional identity information like name or email. This mapping should be stored separately from the causal collection and managed with appropriate security and access levels.
- Nested causal collections do not automatically share history with each other. If you want nested causal collections to share history you'll have to manage the lamport timestamps manually, sharing one lamport timestamp across all causal collections that you want to have a shared history.
  - TODO: will undo and redo automatically account for nested collections with shared history or will that be a manual process as well?
- Transactions (multiple insertions at the same logical time) are supported via tx-index. Every node id has a tx-index of 0 by default. To insert multiple nodes at the same time keep the lamport-ts the same and instead increment the tx-index on each new node. E.g. when copying and pasting text, the text can be split on characters and inserted as individual character nodes, but the lamport-ts remains the same so on undo, all characters that were part of this paste operation can be hidden simultaneously.

## Inspiration, Reference & Prior Art

- [Data Laced with History](http://archagon.net/blog/2018/03/24/data-laced-with-history/) 📝 *blog, causal trees, swift*
  - Start here. This is a great intro to CRDTs and the literature surrounding them, without going straight into a specific paper. This was also my first introduction to causal trees.
  - [Evaluating CRDTs for Real-time Document Editing](https://hal.inria.fr/inria-00629503/document) compares some of the CRDTs touched on in the blog post.
- [Causal trees: towards real-time read-write hypertext](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.627.5286&rep=rep1&type=pdf) 📄 *paper, causal trees,* philosophy
- [Real-time Collaborative Editing with CRDTs](https://www.infoq.com/presentations/crdt-tachyon-collaborative-editing) 📺 *video, javascript, rust, ropes*
  - A talk about the CRDT used for Atom's Teletype pair programming package. It has some of the clearest diagrams I've come across to explain their CRDT implementation.
- [`aredington/schism`](https://github.com/aredington/schism) &nbsp; *cljc*
  - Schism is very similar to cause, but without tombstones. It inspired a lot of the core cljc collection protocol implementations in cause.
- [`grizko/ron`](https://github.com/gritzko/ron) &nbsp; *compression, go*
  - I'd love to find ways to compress the meta data in cause similarly to RON.
- [CRDT - An approach to async plugins and undo](http://abishov.com/xi-editor/docs/crdt.html) 📝 *blog, go, xi, ropes*
- [A Conflict-Free Replicated JSON Datatype](https://arxiv.org/pdf/1608.03960.pdf) 📄 *paper, json*
  - And [`automerge/automerge`](https://github.com/automerge/automerge) (the js implementation). This is the dream, but I want it in EDN instead of JSON and with more idiomatic ways of operating on the data (Clojure's core collection functions).

- [Out of the Tar Pit](http://curtclifton.net/papers/MoseleyMarks06a.pdf) 📄 *paper, philosophy*
  - This paper along with the talk [Simple Made Easy 📺](https://www.infoq.com/presentations/Simple-Made-Easy) explain the value of immutability and pure functions. I'm sometimes tempted to introduce a little mutable state (some side effects) to enable some syntactic sugar or performance that cannot be had otherwise, but the tradeoff in my ability to reason about what the CRDT is doing has always been too high to commit those changes. I'm not against introducing mutable state, there just has to be a really good reason.
