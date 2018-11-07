# Cause [![Build][travis-image]][travis-url]

A causal tree implementation taking a lot of cues from this [Data Laced with History](http://archagon.net/blog/2018/03/24/data-laced-with-history/) post and many papers on the topic of CRDTs.

## Development

Test CLJ

```
lein test
```

Test CLJS

```
npm install
lein cljs-test
```

Dev REPL / nREPL

```
lein repl

user=> (cljs) ; to get a cljs repl
cljs.user=> :cljs/quit ; to go back to clj repl
```

[travis-image]: https://img.shields.io/travis/smothers/cause.svg?style=flat-square
[travis-url]: https://travis-ci.org/smothers/cause
