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
  - Schism is very similar to Cause, but without tombstones. It inspired a lot of the core cljc collection protocol implementations in Cause.
- [`grizko/ron`](https://github.com/gritzko/ron) &nbsp; *compression, go*
  - I'd love to find ways to compress the meta data in Cause similarly to RON.
- [CRDT - An approach to async plugins and undo](http://abishov.com/xi-editor/docs/crdt.html) 📝 *blog, go, xi, ropes*
- [A Conflict-Free Replicated JSON Datatype](https://arxiv.org/pdf/1608.03960.pdf) 📄 *paper, json*
  - And [`automerge/automerge`](https://github.com/automerge/automerge) (the js implementation). This is the dream, but I want it in EDN instead of JSON and with more idiomatic ways of operating on the data (Clojure's core collection functions).

- [Out of the Tar Pit](http://curtclifton.net/papers/MoseleyMarks06a.pdf) 📄 *paper, philosophy*
  - This paper along with the talk [Simple Made Easy 📺](https://www.infoq.com/presentations/Simple-Made-Easy) explain the value of immutability and pure functions. I'm sometimes tempted to introduce a little mutable state (some side effects) to enable some syntactic sugar or performance that cannot be had otherwise, but the tradeoff in my ability to reason about what the CRDT is doing has always been too high to commit those changes. I'm not against introducing mutable state, there just has to be a really good reason.

## Roadmap

- [x] 🧶 Spec generic causal tree data type
- [x] ⭐️ Implement `CausalList`
- [x] ✅ Generate tests to check if the CausalList `weave` function is idempotent and turn breaking edge cases into unit tests. Fix the edge cases.
- [x] Basic merge and weft (time travel) functions. Needs revision.
- [x] 🗺 Implement `CausalMap`
- [x] ƛ Implement common Clojure collection protocols in CLJ(S) for CausalList and CausalMap
- [x] 🏎 Do some profiling and improve the performance of the weave function in particular. There is much more tuning to be done, but a doubling of performance was achievable with only minor changes. This mostly came from me stupidly using `last` instead of `peek`.
- [x] 🥞 Add transaction support to the data model via `tx-index`
- [x] ✅ Full test coverage for collection protocol implementations
- [ ] 🥞 Transaction helper functions e.g. a `transact` fn might automatically increment the tx-index when inserting a sequence of values
  - [ ] Transactions should also weave contiguous sequences in O(n+m) instead of the current O(n*m), where n is all woven nodes and m is nodes in the transaction.
- [ ] ⏳ History helper functions e.g. `undo`, `redo`, get `history` for use in a timeline / changelog, `reset` to a point in the history. There is a logical order to all nodes, for performance this will probably want to be stored as an additional vector inside the causal tree data type.
- [ ] ⫷ Nested collection helper functions
  - [ ] Shared lamport-ts between collections
  - [ ] Transacting across multiple collections
  - [ ] History across multiple collections
- [ ] 👋 Improved merge / sync functions. Particularly ways to conveniently sync E2E over a distributed p2p network. Add examples using common packages that support (WebSockets, WebWorkers and WebRTC). Helper functions to make the integration simpler.
  - [ ] Also make some decisions around chattiness and ideal distributed network topologies. Hopefully this can be in the form of a recommended library, but some of the decisions might be specific to distributing a causal tree across many clients
- [ ] ✅ Generative property based E2E tests with nested collections that share history
  - [ ] Are changes commutative, associative and idempotent regardless of network latency
  - [ ] Can clients recover from errors and potentially request more data if they don't have the nodes they need to perform a merge
  - [ ] Have a way to simulate merge times. E.g. Merging S sites with N nodes each will take T milliseconds in CLJS. This should probably be available directly on the CLI so consumers of this package can easily estimate their loads.
- [ ] ♳ Last chance to make major changes to API
- [ ] 🚀 Publish 0.1.0 as an initial release to Clojars
  - [ ] Make sure tools-deps still works with filesytem and vcs too
- [ ] 🏎 CLJS CausalList specific performance tuning. The weave algorithm currently take O(n) across ALL nodes and tombstones in a list, can that be brought down? If not are their constant time performance improvements to be found? Is it worth using mutable data structures inside the weave function?
- [ ] 🔒 Research E2E encryption for causal collections
- [ ] 🧗‍♀️ Implement `CausalRope`. This is not core to Clojure, but would be convenient for text editing.
- [ ] → Implement `CausalVector`... I don't know how feasible this is, but it would be nice to have
- [ ] ∆ Implement `CausalCounter`
- [ ] ∪ Implement `CausalSet`. Not a high priority, but would be nice to round out the collection types
- [ ] 🚀 Publish 1.0.0 with stable API
- [ ] 🚮 Add garbage collection to weaves. Nodes will never be deleted from the nodes map, but they can be removed from the sorted weave cache when no active nodes depend on them. This will significantly improve read and write performance on causal collections with many hidden nodes. And since the nodes still exist in the nodes map they can always be added back to the weave if a merge from another site comes in that was "caused" by garbage collected nodes.
- [ ] ⚙️ Research CLJS -> Rust (Wasm) port of internal core insert / weave functions. Are there big enough performance enhancements to offset the added complexity / time. How far along is the Wasm JVM? Can running the JVM in a browser with Cause CLJ provide the desired performance properties?
