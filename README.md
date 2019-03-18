# Cause [![Build][travis-image]][travis-url]

> An EDN-like CRDT (Causal Tree) for Clojure(Script) that automatically tracks history and resolves conflicts.

Cause is like git for collaborative applications. Cause is designed to look and feel like normal EDN data structures (`maps`, `lists`), while also exposing the richness of append only CvRDTs that power this causal EDN. Cause handles common problems like deterministically synchronizing complex data structures across devices, and tracking history. Rather than rely on a central authority, conflicts can be resolved on every client. Making Cause well suited for decentralized p2p applications.

The implementation takes a lot of cues from [Data Laced with History](http://archagon.net/blog/2018/03/24/data-laced-with-history/) and [prior art](#inspiration-reference--prior-art) related to CRDTs.

## Why?

Why create Cause? Why another CRDT?

Before starting Cause I was working on [a rich text editor](https://github.com/smothers/slate-eunoia) in [Slate](https://github.com/ianstormtaylor/slate). I wanted online/offline sync, collaboration, granular version control, zero dependency on a centralized server, and all of this in one persistent data structure that's easy to render, edit and save to a database. Projects like [Automerge](https://github.com/automerge/automerge) and [Schism](https://github.com/aredington/schism) offered compelling solutions, but fell short on one or more of the properties I was looking for.

## Properties

This is what Cause strives to do:

1. **One data structure for everything.** In Cause this is the `node`. Nodes are just values. They store identity and causality, and can easily be sent between clients, written to a database and rendered. Multiple in memory caches make the read and write performance of common node operations fast. And those caches can be reconstituted from a bag of related nodes at runtime, so at rest storage is reduced.

2. **Persist all the data.** Clojure's immutable data structures and immutable data in general is great! It's hard to call Cause immutable since it is designed to be used in distributed eventually consistent systems. Nodes will inevitably arrive in different orders and clients will often have different sets of nodes. What can be guaranteed is that no node is deleted. Cause is append only, with deletions being represented by adding tombstones that hide nodes instead of actually excising the original data. This is similar to [Datomic](https://www.datomic.com/) and makes infinite undo and change tracking possible.

3. **Simple conflict resolution.** The functions that determine the current state of a causal collection should be easy to reason about. This makes them easier to develop correctly and easier to work with intuitively since they have very few corner cases.

4. **Idiomatic EDN.** The higher level causal data structures that are built from `nodes` implement many of the same protocols as their EDN counterparts. Most Clojure functions should just work on CausalLists and CausalMaps the same way they'd work on lists and maps.

5. **Extended EDN.** Causal collections have some properties that don't fit into existing Clojure collection protocols, specifically identity and history that can span multiple interrelated collections. Facilities should be provided to manage these database-like properties efficiently and easily.

## How it Works

- Causal collections (lists, maps) are made of nodes
  - `node` - a triplet made of `[id cause value]`
    - `id` - an easily sortable triplet of `[lamport-ts site-id tx-index]`
      - `lamport-ts` - a logical clock incremented on every transaction. A natural int counter starting at `0`.
      - `site-id` - a random uid that represents a location (your computer, my computer)
      - `tx-index` - the order within a transaction. A natural int counter that is reset to `0` at the start of every transaction.
        - A transaction is when both `lamport-ts` and `site-id` are the same for multiple nodes. Then `tx-index` serves as the tie breaker
      - sorting ids
        - first on logical time `lamport-ts`
        - if multiple times collide they are sorted on location `site-id`
        - if multiple nodes are inserted at the same time on the same machine that's a transaction and `tx-index` is used keep them unique and ordered
    - `cause` - the identifier that "caused" a node
      - in a list `cause` is the `id` of the preceding node, creating a linked list
      - in a map `cause` is the `key`
    - `value` is whatever you set it to, a string, a keyword, another causal collection
      - since causal collections are append only, if you want to delete (hide) a value you must insert a `cause/hide` value. This is non destructive and enables synchronization and time travel.

Nodes are all you need. From a bag of nodes we can consistently weave (build an ordered cache of) them every time. Nodes are also unique so we can deduplicate them across a chatty network. And they include complete history information: time = `lamport-ts`, who = `site-id`, transaction = `lamport-ts` & `site-id`, tx order = `tx-index`. They do not include wall clock time, but they do have everything needed for infinite undo / redo as well as version control and blame tracking.

Cause trades a constant increase in spacial complexity for all the properties above. Lists are the most complicated to keep sorted and suffer from a linearly increasing time complexity on both reads and writes. Fortunately transacting contiguous sequences is O(n + m) and not O(n * m), so operations like pasting a large sequence stays linear.

## Installation

The API and data structures have no guarantee of stability until 0.1.0 is published ([See Roadmap](#roadmap)).

If you want to try this pre-release code that will likely change you can use [git deps](https://www.clojure.org/news/2018/01/05/git-deps).

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
- [x] ⏳ Basic merge and weft (time travel) functions. Needs revision.
- [x] 🗺 Implement `CausalMap`
- [x] ƛ Implement common Clojure collection protocols in CLJ(S) for CausalList and CausalMap
- [x] 🏎 Do some profiling and improve the performance of the weave function in particular. There is much more tuning to be done, but a doubling of performance was achievable with only minor changes. This mostly came from me stupidly using `last` instead of `peek`.
- [x] 🥞 Add transaction support to the data model via `tx-index`
- [x] ✅ Full test coverage for collection protocol implementations
- [x] ƛ EDN -> Causal transformation function
- [x] 🥞 Transaction helper functions e.g. a `transact` fn might automatically increment the tx-index when inserting a sequence of values
  - [x] Transactions should also weave contiguous sequences in O(n+m) instead of the current O(n*m), where n is all woven nodes and m is nodes in the transaction.
- [ ] ⏳ History helper functions e.g. `undo`, `redo`, get `history` for use in a timeline / changelog, `reset` to a point in the history. There is a logical order to all nodes, for performance this will probably want to be stored as an additional vector inside the causal tree data type.
- [x] ⫷ Nested collection helper functions
  - [x] Shared lamport-ts between collections
  - [x] Transacting across multiple collections
  - [x] History across multiple collections
- [ ] 👋 Improved merge / sync functions. Particularly ways to conveniently sync E2E over a distributed p2p network. Add examples using common packages that support (WebSockets, WebWorkers and WebRTC). Helper functions to make the integration simpler.
  - [ ] Also make some decisions around chattiness and ideal distributed network topologies. Hopefully this can be in the form of a recommended library, but some of the decisions might be specific to distributing a causal tree across many clients
- [ ] ✅ Generative property based E2E tests with nested collections that share history
  - [ ] Are changes commutative, associative and idempotent regardless of network latency
  - [ ] Can clients recover from errors and potentially request more data if they don't have the nodes they need to perform a merge
  - [ ] Have a way to simulate merge times. E.g. Merging S sites with N nodes each will take T milliseconds in CLJS. This should probably be available directly on the CLI so consumers of this package can easily estimate their loads.
- [ ] 🧹 Consider replacing positional semantics where reasonable. Ids benefit from being vecs due to sorting, but nodes could probably be maps `{:id :cause :value}`
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
- [ ] 🧨 Research mitigating / recovering from, intentionally malicious sites and forged nodes.
  - [ ] Document attack / corruption vectors. E.g. Inserting non linear lamport-ts. Impersonating other site-ids...
  - [ ] Add more logging facilities so that in the case of a malicious site other sites can manually rollback and recover to a "correct" state
  - [ ] See if automatic attack detection / prevention is feasible
    - [ ] Maybe make it optional in exchange for poorer performance characteristics
