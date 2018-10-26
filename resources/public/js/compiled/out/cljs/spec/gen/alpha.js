// Compiled by ClojureScript 1.9.946 {}
goog.provide('cljs.spec.gen.alpha');
goog.require('cljs.core');
goog.require('cljs.core');

/**
* @constructor
 * @implements {cljs.core.IDeref}
*/
cljs.spec.gen.alpha.LazyVar = (function (f,cached){
this.f = f;
this.cached = cached;
this.cljs$lang$protocol_mask$partition0$ = 32768;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
cljs.spec.gen.alpha.LazyVar.prototype.cljs$core$IDeref$_deref$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
if(!((self__.cached == null))){
return self__.cached;
} else {
var x = self__.f.call(null);
if((x == null)){
} else {
self__.cached = x;
}

return x;
}
});

cljs.spec.gen.alpha.LazyVar.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),cljs.core.with_meta(new cljs.core.Symbol(null,"cached","cached",-1216707864,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null))], null);
});

cljs.spec.gen.alpha.LazyVar.cljs$lang$type = true;

cljs.spec.gen.alpha.LazyVar.cljs$lang$ctorStr = "cljs.spec.gen.alpha/LazyVar";

cljs.spec.gen.alpha.LazyVar.cljs$lang$ctorPrWriter = (function (this__30831__auto__,writer__30832__auto__,opt__30833__auto__){
return cljs.core._write.call(null,writer__30832__auto__,"cljs.spec.gen.alpha/LazyVar");
});

cljs.spec.gen.alpha.__GT_LazyVar = (function cljs$spec$gen$alpha$__GT_LazyVar(f,cached){
return (new cljs.spec.gen.alpha.LazyVar(f,cached));
});

cljs.spec.gen.alpha.quick_check_ref = (new cljs.spec.gen.alpha.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check.quick_check !== 'undefined')){
return clojure.test.check.quick_check;
} else {
throw (new Error(["Var ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Symbol("clojure.test.check","quick-check","clojure.test.check/quick-check",-810344251,null))," does not exist, ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check","quick-check","clojure.test.check/quick-check",-810344251,null)))," never required"].join('')));
}
}),null));
cljs.spec.gen.alpha.quick_check = (function cljs$spec$gen$alpha$quick_check(var_args){
var args__31447__auto__ = [];
var len__31440__auto___37534 = arguments.length;
var i__31441__auto___37535 = (0);
while(true){
if((i__31441__auto___37535 < len__31440__auto___37534)){
args__31447__auto__.push((arguments[i__31441__auto___37535]));

var G__37536 = (i__31441__auto___37535 + (1));
i__31441__auto___37535 = G__37536;
continue;
} else {
}
break;
}

var argseq__31448__auto__ = ((((0) < args__31447__auto__.length))?(new cljs.core.IndexedSeq(args__31447__auto__.slice((0)),(0),null)):null);
return cljs.spec.gen.alpha.quick_check.cljs$core$IFn$_invoke$arity$variadic(argseq__31448__auto__);
});

cljs.spec.gen.alpha.quick_check.cljs$core$IFn$_invoke$arity$variadic = (function (args){
return cljs.core.apply.call(null,cljs.core.deref.call(null,cljs.spec.gen.alpha.quick_check_ref),args);
});

cljs.spec.gen.alpha.quick_check.cljs$lang$maxFixedArity = (0);

cljs.spec.gen.alpha.quick_check.cljs$lang$applyTo = (function (seq37533){
return cljs.spec.gen.alpha.quick_check.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq37533));
});

cljs.spec.gen.alpha.for_all_STAR__ref = (new cljs.spec.gen.alpha.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.properties.for_all_STAR_ !== 'undefined')){
return clojure.test.check.properties.for_all_STAR_;
} else {
throw (new Error(["Var ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Symbol("clojure.test.check.properties","for-all*","clojure.test.check.properties/for-all*",67088845,null))," does not exist, ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.properties","for-all*","clojure.test.check.properties/for-all*",67088845,null)))," never required"].join('')));
}
}),null));
/**
 * Dynamically loaded clojure.test.check.properties/for-all*.
 */
cljs.spec.gen.alpha.for_all_STAR_ = (function cljs$spec$gen$alpha$for_all_STAR_(var_args){
var args__31447__auto__ = [];
var len__31440__auto___37538 = arguments.length;
var i__31441__auto___37539 = (0);
while(true){
if((i__31441__auto___37539 < len__31440__auto___37538)){
args__31447__auto__.push((arguments[i__31441__auto___37539]));

var G__37540 = (i__31441__auto___37539 + (1));
i__31441__auto___37539 = G__37540;
continue;
} else {
}
break;
}

var argseq__31448__auto__ = ((((0) < args__31447__auto__.length))?(new cljs.core.IndexedSeq(args__31447__auto__.slice((0)),(0),null)):null);
return cljs.spec.gen.alpha.for_all_STAR_.cljs$core$IFn$_invoke$arity$variadic(argseq__31448__auto__);
});

cljs.spec.gen.alpha.for_all_STAR_.cljs$core$IFn$_invoke$arity$variadic = (function (args){
return cljs.core.apply.call(null,cljs.core.deref.call(null,cljs.spec.gen.alpha.for_all_STAR__ref),args);
});

cljs.spec.gen.alpha.for_all_STAR_.cljs$lang$maxFixedArity = (0);

cljs.spec.gen.alpha.for_all_STAR_.cljs$lang$applyTo = (function (seq37537){
return cljs.spec.gen.alpha.for_all_STAR_.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq37537));
});

var g_QMARK__37541 = (new cljs.spec.gen.alpha.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.generator_QMARK_ !== 'undefined')){
return clojure.test.check.generators.generator_QMARK_;
} else {
throw (new Error(["Var ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Symbol("clojure.test.check.generators","generator?","clojure.test.check.generators/generator?",-1378210460,null))," does not exist, ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","generator?","clojure.test.check.generators/generator?",-1378210460,null)))," never required"].join('')));
}
}),null));
var g_37542 = (new cljs.spec.gen.alpha.LazyVar(((function (g_QMARK__37541){
return (function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.generate !== 'undefined')){
return clojure.test.check.generators.generate;
} else {
throw (new Error(["Var ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Symbol("clojure.test.check.generators","generate","clojure.test.check.generators/generate",-690390711,null))," does not exist, ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","generate","clojure.test.check.generators/generate",-690390711,null)))," never required"].join('')));
}
});})(g_QMARK__37541))
,null));
var mkg_37543 = (new cljs.spec.gen.alpha.LazyVar(((function (g_QMARK__37541,g_37542){
return (function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.__GT_Generator !== 'undefined')){
return clojure.test.check.generators.__GT_Generator;
} else {
throw (new Error(["Var ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Symbol("clojure.test.check.generators","->Generator","clojure.test.check.generators/->Generator",-1179475051,null))," does not exist, ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","->Generator","clojure.test.check.generators/->Generator",-1179475051,null)))," never required"].join('')));
}
});})(g_QMARK__37541,g_37542))
,null));
cljs.spec.gen.alpha.generator_QMARK_ = ((function (g_QMARK__37541,g_37542,mkg_37543){
return (function cljs$spec$gen$alpha$generator_QMARK_(x){
return cljs.core.deref.call(null,g_QMARK__37541).call(null,x);
});})(g_QMARK__37541,g_37542,mkg_37543))
;

cljs.spec.gen.alpha.generator = ((function (g_QMARK__37541,g_37542,mkg_37543){
return (function cljs$spec$gen$alpha$generator(gfn){
return cljs.core.deref.call(null,mkg_37543).call(null,gfn);
});})(g_QMARK__37541,g_37542,mkg_37543))
;

/**
 * Generate a single value using generator.
 */
cljs.spec.gen.alpha.generate = ((function (g_QMARK__37541,g_37542,mkg_37543){
return (function cljs$spec$gen$alpha$generate(generator){
return cljs.core.deref.call(null,g_37542).call(null,generator);
});})(g_QMARK__37541,g_37542,mkg_37543))
;
cljs.spec.gen.alpha.delay_impl = (function cljs$spec$gen$alpha$delay_impl(gfnd){
return cljs.spec.gen.alpha.generator.call(null,(function (rnd,size){
return new cljs.core.Keyword(null,"gen","gen",142575302).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,gfnd)).call(null,rnd,size);
}));
});
var g__31543__auto___37563 = (new cljs.spec.gen.alpha.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.hash_map !== 'undefined')){
return clojure.test.check.generators.hash_map;
} else {
throw (new Error(["Var ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Symbol("clojure.test.check.generators","hash-map","clojure.test.check.generators/hash-map",1961346626,null))," does not exist, ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","hash-map","clojure.test.check.generators/hash-map",1961346626,null)))," never required"].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/hash-map
 */
cljs.spec.gen.alpha.hash_map = ((function (g__31543__auto___37563){
return (function cljs$spec$gen$alpha$hash_map(var_args){
var args__31447__auto__ = [];
var len__31440__auto___37564 = arguments.length;
var i__31441__auto___37565 = (0);
while(true){
if((i__31441__auto___37565 < len__31440__auto___37564)){
args__31447__auto__.push((arguments[i__31441__auto___37565]));

var G__37566 = (i__31441__auto___37565 + (1));
i__31441__auto___37565 = G__37566;
continue;
} else {
}
break;
}

var argseq__31448__auto__ = ((((0) < args__31447__auto__.length))?(new cljs.core.IndexedSeq(args__31447__auto__.slice((0)),(0),null)):null);
return cljs.spec.gen.alpha.hash_map.cljs$core$IFn$_invoke$arity$variadic(argseq__31448__auto__);
});})(g__31543__auto___37563))
;

cljs.spec.gen.alpha.hash_map.cljs$core$IFn$_invoke$arity$variadic = ((function (g__31543__auto___37563){
return (function (args){
return cljs.core.apply.call(null,cljs.core.deref.call(null,g__31543__auto___37563),args);
});})(g__31543__auto___37563))
;

cljs.spec.gen.alpha.hash_map.cljs$lang$maxFixedArity = (0);

cljs.spec.gen.alpha.hash_map.cljs$lang$applyTo = ((function (g__31543__auto___37563){
return (function (seq37544){
return cljs.spec.gen.alpha.hash_map.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq37544));
});})(g__31543__auto___37563))
;


var g__31543__auto___37567 = (new cljs.spec.gen.alpha.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.list !== 'undefined')){
return clojure.test.check.generators.list;
} else {
throw (new Error(["Var ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Symbol("clojure.test.check.generators","list","clojure.test.check.generators/list",506971058,null))," does not exist, ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","list","clojure.test.check.generators/list",506971058,null)))," never required"].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/list
 */
cljs.spec.gen.alpha.list = ((function (g__31543__auto___37567){
return (function cljs$spec$gen$alpha$list(var_args){
var args__31447__auto__ = [];
var len__31440__auto___37568 = arguments.length;
var i__31441__auto___37569 = (0);
while(true){
if((i__31441__auto___37569 < len__31440__auto___37568)){
args__31447__auto__.push((arguments[i__31441__auto___37569]));

var G__37570 = (i__31441__auto___37569 + (1));
i__31441__auto___37569 = G__37570;
continue;
} else {
}
break;
}

var argseq__31448__auto__ = ((((0) < args__31447__auto__.length))?(new cljs.core.IndexedSeq(args__31447__auto__.slice((0)),(0),null)):null);
return cljs.spec.gen.alpha.list.cljs$core$IFn$_invoke$arity$variadic(argseq__31448__auto__);
});})(g__31543__auto___37567))
;

cljs.spec.gen.alpha.list.cljs$core$IFn$_invoke$arity$variadic = ((function (g__31543__auto___37567){
return (function (args){
return cljs.core.apply.call(null,cljs.core.deref.call(null,g__31543__auto___37567),args);
});})(g__31543__auto___37567))
;

cljs.spec.gen.alpha.list.cljs$lang$maxFixedArity = (0);

cljs.spec.gen.alpha.list.cljs$lang$applyTo = ((function (g__31543__auto___37567){
return (function (seq37545){
return cljs.spec.gen.alpha.list.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq37545));
});})(g__31543__auto___37567))
;


var g__31543__auto___37571 = (new cljs.spec.gen.alpha.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.map !== 'undefined')){
return clojure.test.check.generators.map;
} else {
throw (new Error(["Var ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Symbol("clojure.test.check.generators","map","clojure.test.check.generators/map",45738796,null))," does not exist, ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","map","clojure.test.check.generators/map",45738796,null)))," never required"].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/map
 */
cljs.spec.gen.alpha.map = ((function (g__31543__auto___37571){
return (function cljs$spec$gen$alpha$map(var_args){
var args__31447__auto__ = [];
var len__31440__auto___37572 = arguments.length;
var i__31441__auto___37573 = (0);
while(true){
if((i__31441__auto___37573 < len__31440__auto___37572)){
args__31447__auto__.push((arguments[i__31441__auto___37573]));

var G__37574 = (i__31441__auto___37573 + (1));
i__31441__auto___37573 = G__37574;
continue;
} else {
}
break;
}

var argseq__31448__auto__ = ((((0) < args__31447__auto__.length))?(new cljs.core.IndexedSeq(args__31447__auto__.slice((0)),(0),null)):null);
return cljs.spec.gen.alpha.map.cljs$core$IFn$_invoke$arity$variadic(argseq__31448__auto__);
});})(g__31543__auto___37571))
;

cljs.spec.gen.alpha.map.cljs$core$IFn$_invoke$arity$variadic = ((function (g__31543__auto___37571){
return (function (args){
return cljs.core.apply.call(null,cljs.core.deref.call(null,g__31543__auto___37571),args);
});})(g__31543__auto___37571))
;

cljs.spec.gen.alpha.map.cljs$lang$maxFixedArity = (0);

cljs.spec.gen.alpha.map.cljs$lang$applyTo = ((function (g__31543__auto___37571){
return (function (seq37546){
return cljs.spec.gen.alpha.map.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq37546));
});})(g__31543__auto___37571))
;


var g__31543__auto___37575 = (new cljs.spec.gen.alpha.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.not_empty !== 'undefined')){
return clojure.test.check.generators.not_empty;
} else {
throw (new Error(["Var ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Symbol("clojure.test.check.generators","not-empty","clojure.test.check.generators/not-empty",-876211682,null))," does not exist, ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","not-empty","clojure.test.check.generators/not-empty",-876211682,null)))," never required"].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/not-empty
 */
cljs.spec.gen.alpha.not_empty = ((function (g__31543__auto___37575){
return (function cljs$spec$gen$alpha$not_empty(var_args){
var args__31447__auto__ = [];
var len__31440__auto___37576 = arguments.length;
var i__31441__auto___37577 = (0);
while(true){
if((i__31441__auto___37577 < len__31440__auto___37576)){
args__31447__auto__.push((arguments[i__31441__auto___37577]));

var G__37578 = (i__31441__auto___37577 + (1));
i__31441__auto___37577 = G__37578;
continue;
} else {
}
break;
}

var argseq__31448__auto__ = ((((0) < args__31447__auto__.length))?(new cljs.core.IndexedSeq(args__31447__auto__.slice((0)),(0),null)):null);
return cljs.spec.gen.alpha.not_empty.cljs$core$IFn$_invoke$arity$variadic(argseq__31448__auto__);
});})(g__31543__auto___37575))
;

cljs.spec.gen.alpha.not_empty.cljs$core$IFn$_invoke$arity$variadic = ((function (g__31543__auto___37575){
return (function (args){
return cljs.core.apply.call(null,cljs.core.deref.call(null,g__31543__auto___37575),args);
});})(g__31543__auto___37575))
;

cljs.spec.gen.alpha.not_empty.cljs$lang$maxFixedArity = (0);

cljs.spec.gen.alpha.not_empty.cljs$lang$applyTo = ((function (g__31543__auto___37575){
return (function (seq37547){
return cljs.spec.gen.alpha.not_empty.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq37547));
});})(g__31543__auto___37575))
;


var g__31543__auto___37579 = (new cljs.spec.gen.alpha.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.set !== 'undefined')){
return clojure.test.check.generators.set;
} else {
throw (new Error(["Var ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Symbol("clojure.test.check.generators","set","clojure.test.check.generators/set",-1027639543,null))," does not exist, ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","set","clojure.test.check.generators/set",-1027639543,null)))," never required"].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/set
 */
cljs.spec.gen.alpha.set = ((function (g__31543__auto___37579){
return (function cljs$spec$gen$alpha$set(var_args){
var args__31447__auto__ = [];
var len__31440__auto___37580 = arguments.length;
var i__31441__auto___37581 = (0);
while(true){
if((i__31441__auto___37581 < len__31440__auto___37580)){
args__31447__auto__.push((arguments[i__31441__auto___37581]));

var G__37582 = (i__31441__auto___37581 + (1));
i__31441__auto___37581 = G__37582;
continue;
} else {
}
break;
}

var argseq__31448__auto__ = ((((0) < args__31447__auto__.length))?(new cljs.core.IndexedSeq(args__31447__auto__.slice((0)),(0),null)):null);
return cljs.spec.gen.alpha.set.cljs$core$IFn$_invoke$arity$variadic(argseq__31448__auto__);
});})(g__31543__auto___37579))
;

cljs.spec.gen.alpha.set.cljs$core$IFn$_invoke$arity$variadic = ((function (g__31543__auto___37579){
return (function (args){
return cljs.core.apply.call(null,cljs.core.deref.call(null,g__31543__auto___37579),args);
});})(g__31543__auto___37579))
;

cljs.spec.gen.alpha.set.cljs$lang$maxFixedArity = (0);

cljs.spec.gen.alpha.set.cljs$lang$applyTo = ((function (g__31543__auto___37579){
return (function (seq37548){
return cljs.spec.gen.alpha.set.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq37548));
});})(g__31543__auto___37579))
;


var g__31543__auto___37583 = (new cljs.spec.gen.alpha.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.vector !== 'undefined')){
return clojure.test.check.generators.vector;
} else {
throw (new Error(["Var ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Symbol("clojure.test.check.generators","vector","clojure.test.check.generators/vector",1081775325,null))," does not exist, ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","vector","clojure.test.check.generators/vector",1081775325,null)))," never required"].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/vector
 */
cljs.spec.gen.alpha.vector = ((function (g__31543__auto___37583){
return (function cljs$spec$gen$alpha$vector(var_args){
var args__31447__auto__ = [];
var len__31440__auto___37584 = arguments.length;
var i__31441__auto___37585 = (0);
while(true){
if((i__31441__auto___37585 < len__31440__auto___37584)){
args__31447__auto__.push((arguments[i__31441__auto___37585]));

var G__37586 = (i__31441__auto___37585 + (1));
i__31441__auto___37585 = G__37586;
continue;
} else {
}
break;
}

var argseq__31448__auto__ = ((((0) < args__31447__auto__.length))?(new cljs.core.IndexedSeq(args__31447__auto__.slice((0)),(0),null)):null);
return cljs.spec.gen.alpha.vector.cljs$core$IFn$_invoke$arity$variadic(argseq__31448__auto__);
});})(g__31543__auto___37583))
;

cljs.spec.gen.alpha.vector.cljs$core$IFn$_invoke$arity$variadic = ((function (g__31543__auto___37583){
return (function (args){
return cljs.core.apply.call(null,cljs.core.deref.call(null,g__31543__auto___37583),args);
});})(g__31543__auto___37583))
;

cljs.spec.gen.alpha.vector.cljs$lang$maxFixedArity = (0);

cljs.spec.gen.alpha.vector.cljs$lang$applyTo = ((function (g__31543__auto___37583){
return (function (seq37549){
return cljs.spec.gen.alpha.vector.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq37549));
});})(g__31543__auto___37583))
;


var g__31543__auto___37587 = (new cljs.spec.gen.alpha.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.vector_distinct !== 'undefined')){
return clojure.test.check.generators.vector_distinct;
} else {
throw (new Error(["Var ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Symbol("clojure.test.check.generators","vector-distinct","clojure.test.check.generators/vector-distinct",1656877834,null))," does not exist, ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","vector-distinct","clojure.test.check.generators/vector-distinct",1656877834,null)))," never required"].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/vector-distinct
 */
cljs.spec.gen.alpha.vector_distinct = ((function (g__31543__auto___37587){
return (function cljs$spec$gen$alpha$vector_distinct(var_args){
var args__31447__auto__ = [];
var len__31440__auto___37588 = arguments.length;
var i__31441__auto___37589 = (0);
while(true){
if((i__31441__auto___37589 < len__31440__auto___37588)){
args__31447__auto__.push((arguments[i__31441__auto___37589]));

var G__37590 = (i__31441__auto___37589 + (1));
i__31441__auto___37589 = G__37590;
continue;
} else {
}
break;
}

var argseq__31448__auto__ = ((((0) < args__31447__auto__.length))?(new cljs.core.IndexedSeq(args__31447__auto__.slice((0)),(0),null)):null);
return cljs.spec.gen.alpha.vector_distinct.cljs$core$IFn$_invoke$arity$variadic(argseq__31448__auto__);
});})(g__31543__auto___37587))
;

cljs.spec.gen.alpha.vector_distinct.cljs$core$IFn$_invoke$arity$variadic = ((function (g__31543__auto___37587){
return (function (args){
return cljs.core.apply.call(null,cljs.core.deref.call(null,g__31543__auto___37587),args);
});})(g__31543__auto___37587))
;

cljs.spec.gen.alpha.vector_distinct.cljs$lang$maxFixedArity = (0);

cljs.spec.gen.alpha.vector_distinct.cljs$lang$applyTo = ((function (g__31543__auto___37587){
return (function (seq37550){
return cljs.spec.gen.alpha.vector_distinct.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq37550));
});})(g__31543__auto___37587))
;


var g__31543__auto___37591 = (new cljs.spec.gen.alpha.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.fmap !== 'undefined')){
return clojure.test.check.generators.fmap;
} else {
throw (new Error(["Var ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Symbol("clojure.test.check.generators","fmap","clojure.test.check.generators/fmap",1957997092,null))," does not exist, ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","fmap","clojure.test.check.generators/fmap",1957997092,null)))," never required"].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/fmap
 */
cljs.spec.gen.alpha.fmap = ((function (g__31543__auto___37591){
return (function cljs$spec$gen$alpha$fmap(var_args){
var args__31447__auto__ = [];
var len__31440__auto___37592 = arguments.length;
var i__31441__auto___37593 = (0);
while(true){
if((i__31441__auto___37593 < len__31440__auto___37592)){
args__31447__auto__.push((arguments[i__31441__auto___37593]));

var G__37594 = (i__31441__auto___37593 + (1));
i__31441__auto___37593 = G__37594;
continue;
} else {
}
break;
}

var argseq__31448__auto__ = ((((0) < args__31447__auto__.length))?(new cljs.core.IndexedSeq(args__31447__auto__.slice((0)),(0),null)):null);
return cljs.spec.gen.alpha.fmap.cljs$core$IFn$_invoke$arity$variadic(argseq__31448__auto__);
});})(g__31543__auto___37591))
;

cljs.spec.gen.alpha.fmap.cljs$core$IFn$_invoke$arity$variadic = ((function (g__31543__auto___37591){
return (function (args){
return cljs.core.apply.call(null,cljs.core.deref.call(null,g__31543__auto___37591),args);
});})(g__31543__auto___37591))
;

cljs.spec.gen.alpha.fmap.cljs$lang$maxFixedArity = (0);

cljs.spec.gen.alpha.fmap.cljs$lang$applyTo = ((function (g__31543__auto___37591){
return (function (seq37551){
return cljs.spec.gen.alpha.fmap.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq37551));
});})(g__31543__auto___37591))
;


var g__31543__auto___37595 = (new cljs.spec.gen.alpha.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.elements !== 'undefined')){
return clojure.test.check.generators.elements;
} else {
throw (new Error(["Var ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Symbol("clojure.test.check.generators","elements","clojure.test.check.generators/elements",438991326,null))," does not exist, ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","elements","clojure.test.check.generators/elements",438991326,null)))," never required"].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/elements
 */
cljs.spec.gen.alpha.elements = ((function (g__31543__auto___37595){
return (function cljs$spec$gen$alpha$elements(var_args){
var args__31447__auto__ = [];
var len__31440__auto___37596 = arguments.length;
var i__31441__auto___37597 = (0);
while(true){
if((i__31441__auto___37597 < len__31440__auto___37596)){
args__31447__auto__.push((arguments[i__31441__auto___37597]));

var G__37598 = (i__31441__auto___37597 + (1));
i__31441__auto___37597 = G__37598;
continue;
} else {
}
break;
}

var argseq__31448__auto__ = ((((0) < args__31447__auto__.length))?(new cljs.core.IndexedSeq(args__31447__auto__.slice((0)),(0),null)):null);
return cljs.spec.gen.alpha.elements.cljs$core$IFn$_invoke$arity$variadic(argseq__31448__auto__);
});})(g__31543__auto___37595))
;

cljs.spec.gen.alpha.elements.cljs$core$IFn$_invoke$arity$variadic = ((function (g__31543__auto___37595){
return (function (args){
return cljs.core.apply.call(null,cljs.core.deref.call(null,g__31543__auto___37595),args);
});})(g__31543__auto___37595))
;

cljs.spec.gen.alpha.elements.cljs$lang$maxFixedArity = (0);

cljs.spec.gen.alpha.elements.cljs$lang$applyTo = ((function (g__31543__auto___37595){
return (function (seq37552){
return cljs.spec.gen.alpha.elements.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq37552));
});})(g__31543__auto___37595))
;


var g__31543__auto___37599 = (new cljs.spec.gen.alpha.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.bind !== 'undefined')){
return clojure.test.check.generators.bind;
} else {
throw (new Error(["Var ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Symbol("clojure.test.check.generators","bind","clojure.test.check.generators/bind",-361313906,null))," does not exist, ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","bind","clojure.test.check.generators/bind",-361313906,null)))," never required"].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/bind
 */
cljs.spec.gen.alpha.bind = ((function (g__31543__auto___37599){
return (function cljs$spec$gen$alpha$bind(var_args){
var args__31447__auto__ = [];
var len__31440__auto___37600 = arguments.length;
var i__31441__auto___37601 = (0);
while(true){
if((i__31441__auto___37601 < len__31440__auto___37600)){
args__31447__auto__.push((arguments[i__31441__auto___37601]));

var G__37602 = (i__31441__auto___37601 + (1));
i__31441__auto___37601 = G__37602;
continue;
} else {
}
break;
}

var argseq__31448__auto__ = ((((0) < args__31447__auto__.length))?(new cljs.core.IndexedSeq(args__31447__auto__.slice((0)),(0),null)):null);
return cljs.spec.gen.alpha.bind.cljs$core$IFn$_invoke$arity$variadic(argseq__31448__auto__);
});})(g__31543__auto___37599))
;

cljs.spec.gen.alpha.bind.cljs$core$IFn$_invoke$arity$variadic = ((function (g__31543__auto___37599){
return (function (args){
return cljs.core.apply.call(null,cljs.core.deref.call(null,g__31543__auto___37599),args);
});})(g__31543__auto___37599))
;

cljs.spec.gen.alpha.bind.cljs$lang$maxFixedArity = (0);

cljs.spec.gen.alpha.bind.cljs$lang$applyTo = ((function (g__31543__auto___37599){
return (function (seq37553){
return cljs.spec.gen.alpha.bind.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq37553));
});})(g__31543__auto___37599))
;


var g__31543__auto___37603 = (new cljs.spec.gen.alpha.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.choose !== 'undefined')){
return clojure.test.check.generators.choose;
} else {
throw (new Error(["Var ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Symbol("clojure.test.check.generators","choose","clojure.test.check.generators/choose",909997832,null))," does not exist, ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","choose","clojure.test.check.generators/choose",909997832,null)))," never required"].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/choose
 */
cljs.spec.gen.alpha.choose = ((function (g__31543__auto___37603){
return (function cljs$spec$gen$alpha$choose(var_args){
var args__31447__auto__ = [];
var len__31440__auto___37604 = arguments.length;
var i__31441__auto___37605 = (0);
while(true){
if((i__31441__auto___37605 < len__31440__auto___37604)){
args__31447__auto__.push((arguments[i__31441__auto___37605]));

var G__37606 = (i__31441__auto___37605 + (1));
i__31441__auto___37605 = G__37606;
continue;
} else {
}
break;
}

var argseq__31448__auto__ = ((((0) < args__31447__auto__.length))?(new cljs.core.IndexedSeq(args__31447__auto__.slice((0)),(0),null)):null);
return cljs.spec.gen.alpha.choose.cljs$core$IFn$_invoke$arity$variadic(argseq__31448__auto__);
});})(g__31543__auto___37603))
;

cljs.spec.gen.alpha.choose.cljs$core$IFn$_invoke$arity$variadic = ((function (g__31543__auto___37603){
return (function (args){
return cljs.core.apply.call(null,cljs.core.deref.call(null,g__31543__auto___37603),args);
});})(g__31543__auto___37603))
;

cljs.spec.gen.alpha.choose.cljs$lang$maxFixedArity = (0);

cljs.spec.gen.alpha.choose.cljs$lang$applyTo = ((function (g__31543__auto___37603){
return (function (seq37554){
return cljs.spec.gen.alpha.choose.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq37554));
});})(g__31543__auto___37603))
;


var g__31543__auto___37607 = (new cljs.spec.gen.alpha.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.one_of !== 'undefined')){
return clojure.test.check.generators.one_of;
} else {
throw (new Error(["Var ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Symbol("clojure.test.check.generators","one-of","clojure.test.check.generators/one-of",-183339191,null))," does not exist, ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","one-of","clojure.test.check.generators/one-of",-183339191,null)))," never required"].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/one-of
 */
cljs.spec.gen.alpha.one_of = ((function (g__31543__auto___37607){
return (function cljs$spec$gen$alpha$one_of(var_args){
var args__31447__auto__ = [];
var len__31440__auto___37608 = arguments.length;
var i__31441__auto___37609 = (0);
while(true){
if((i__31441__auto___37609 < len__31440__auto___37608)){
args__31447__auto__.push((arguments[i__31441__auto___37609]));

var G__37610 = (i__31441__auto___37609 + (1));
i__31441__auto___37609 = G__37610;
continue;
} else {
}
break;
}

var argseq__31448__auto__ = ((((0) < args__31447__auto__.length))?(new cljs.core.IndexedSeq(args__31447__auto__.slice((0)),(0),null)):null);
return cljs.spec.gen.alpha.one_of.cljs$core$IFn$_invoke$arity$variadic(argseq__31448__auto__);
});})(g__31543__auto___37607))
;

cljs.spec.gen.alpha.one_of.cljs$core$IFn$_invoke$arity$variadic = ((function (g__31543__auto___37607){
return (function (args){
return cljs.core.apply.call(null,cljs.core.deref.call(null,g__31543__auto___37607),args);
});})(g__31543__auto___37607))
;

cljs.spec.gen.alpha.one_of.cljs$lang$maxFixedArity = (0);

cljs.spec.gen.alpha.one_of.cljs$lang$applyTo = ((function (g__31543__auto___37607){
return (function (seq37555){
return cljs.spec.gen.alpha.one_of.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq37555));
});})(g__31543__auto___37607))
;


var g__31543__auto___37611 = (new cljs.spec.gen.alpha.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.such_that !== 'undefined')){
return clojure.test.check.generators.such_that;
} else {
throw (new Error(["Var ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Symbol("clojure.test.check.generators","such-that","clojure.test.check.generators/such-that",-1754178732,null))," does not exist, ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","such-that","clojure.test.check.generators/such-that",-1754178732,null)))," never required"].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/such-that
 */
cljs.spec.gen.alpha.such_that = ((function (g__31543__auto___37611){
return (function cljs$spec$gen$alpha$such_that(var_args){
var args__31447__auto__ = [];
var len__31440__auto___37612 = arguments.length;
var i__31441__auto___37613 = (0);
while(true){
if((i__31441__auto___37613 < len__31440__auto___37612)){
args__31447__auto__.push((arguments[i__31441__auto___37613]));

var G__37614 = (i__31441__auto___37613 + (1));
i__31441__auto___37613 = G__37614;
continue;
} else {
}
break;
}

var argseq__31448__auto__ = ((((0) < args__31447__auto__.length))?(new cljs.core.IndexedSeq(args__31447__auto__.slice((0)),(0),null)):null);
return cljs.spec.gen.alpha.such_that.cljs$core$IFn$_invoke$arity$variadic(argseq__31448__auto__);
});})(g__31543__auto___37611))
;

cljs.spec.gen.alpha.such_that.cljs$core$IFn$_invoke$arity$variadic = ((function (g__31543__auto___37611){
return (function (args){
return cljs.core.apply.call(null,cljs.core.deref.call(null,g__31543__auto___37611),args);
});})(g__31543__auto___37611))
;

cljs.spec.gen.alpha.such_that.cljs$lang$maxFixedArity = (0);

cljs.spec.gen.alpha.such_that.cljs$lang$applyTo = ((function (g__31543__auto___37611){
return (function (seq37556){
return cljs.spec.gen.alpha.such_that.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq37556));
});})(g__31543__auto___37611))
;


var g__31543__auto___37615 = (new cljs.spec.gen.alpha.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.tuple !== 'undefined')){
return clojure.test.check.generators.tuple;
} else {
throw (new Error(["Var ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Symbol("clojure.test.check.generators","tuple","clojure.test.check.generators/tuple",-143711557,null))," does not exist, ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","tuple","clojure.test.check.generators/tuple",-143711557,null)))," never required"].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/tuple
 */
cljs.spec.gen.alpha.tuple = ((function (g__31543__auto___37615){
return (function cljs$spec$gen$alpha$tuple(var_args){
var args__31447__auto__ = [];
var len__31440__auto___37616 = arguments.length;
var i__31441__auto___37617 = (0);
while(true){
if((i__31441__auto___37617 < len__31440__auto___37616)){
args__31447__auto__.push((arguments[i__31441__auto___37617]));

var G__37618 = (i__31441__auto___37617 + (1));
i__31441__auto___37617 = G__37618;
continue;
} else {
}
break;
}

var argseq__31448__auto__ = ((((0) < args__31447__auto__.length))?(new cljs.core.IndexedSeq(args__31447__auto__.slice((0)),(0),null)):null);
return cljs.spec.gen.alpha.tuple.cljs$core$IFn$_invoke$arity$variadic(argseq__31448__auto__);
});})(g__31543__auto___37615))
;

cljs.spec.gen.alpha.tuple.cljs$core$IFn$_invoke$arity$variadic = ((function (g__31543__auto___37615){
return (function (args){
return cljs.core.apply.call(null,cljs.core.deref.call(null,g__31543__auto___37615),args);
});})(g__31543__auto___37615))
;

cljs.spec.gen.alpha.tuple.cljs$lang$maxFixedArity = (0);

cljs.spec.gen.alpha.tuple.cljs$lang$applyTo = ((function (g__31543__auto___37615){
return (function (seq37557){
return cljs.spec.gen.alpha.tuple.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq37557));
});})(g__31543__auto___37615))
;


var g__31543__auto___37619 = (new cljs.spec.gen.alpha.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.sample !== 'undefined')){
return clojure.test.check.generators.sample;
} else {
throw (new Error(["Var ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Symbol("clojure.test.check.generators","sample","clojure.test.check.generators/sample",-382944992,null))," does not exist, ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","sample","clojure.test.check.generators/sample",-382944992,null)))," never required"].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/sample
 */
cljs.spec.gen.alpha.sample = ((function (g__31543__auto___37619){
return (function cljs$spec$gen$alpha$sample(var_args){
var args__31447__auto__ = [];
var len__31440__auto___37620 = arguments.length;
var i__31441__auto___37621 = (0);
while(true){
if((i__31441__auto___37621 < len__31440__auto___37620)){
args__31447__auto__.push((arguments[i__31441__auto___37621]));

var G__37622 = (i__31441__auto___37621 + (1));
i__31441__auto___37621 = G__37622;
continue;
} else {
}
break;
}

var argseq__31448__auto__ = ((((0) < args__31447__auto__.length))?(new cljs.core.IndexedSeq(args__31447__auto__.slice((0)),(0),null)):null);
return cljs.spec.gen.alpha.sample.cljs$core$IFn$_invoke$arity$variadic(argseq__31448__auto__);
});})(g__31543__auto___37619))
;

cljs.spec.gen.alpha.sample.cljs$core$IFn$_invoke$arity$variadic = ((function (g__31543__auto___37619){
return (function (args){
return cljs.core.apply.call(null,cljs.core.deref.call(null,g__31543__auto___37619),args);
});})(g__31543__auto___37619))
;

cljs.spec.gen.alpha.sample.cljs$lang$maxFixedArity = (0);

cljs.spec.gen.alpha.sample.cljs$lang$applyTo = ((function (g__31543__auto___37619){
return (function (seq37558){
return cljs.spec.gen.alpha.sample.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq37558));
});})(g__31543__auto___37619))
;


var g__31543__auto___37623 = (new cljs.spec.gen.alpha.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.return$ !== 'undefined')){
return clojure.test.check.generators.return$;
} else {
throw (new Error(["Var ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Symbol("clojure.test.check.generators","return","clojure.test.check.generators/return",1744522038,null))," does not exist, ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","return","clojure.test.check.generators/return",1744522038,null)))," never required"].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/return
 */
cljs.spec.gen.alpha.return$ = ((function (g__31543__auto___37623){
return (function cljs$spec$gen$alpha$return(var_args){
var args__31447__auto__ = [];
var len__31440__auto___37624 = arguments.length;
var i__31441__auto___37625 = (0);
while(true){
if((i__31441__auto___37625 < len__31440__auto___37624)){
args__31447__auto__.push((arguments[i__31441__auto___37625]));

var G__37626 = (i__31441__auto___37625 + (1));
i__31441__auto___37625 = G__37626;
continue;
} else {
}
break;
}

var argseq__31448__auto__ = ((((0) < args__31447__auto__.length))?(new cljs.core.IndexedSeq(args__31447__auto__.slice((0)),(0),null)):null);
return cljs.spec.gen.alpha.return$.cljs$core$IFn$_invoke$arity$variadic(argseq__31448__auto__);
});})(g__31543__auto___37623))
;

cljs.spec.gen.alpha.return$.cljs$core$IFn$_invoke$arity$variadic = ((function (g__31543__auto___37623){
return (function (args){
return cljs.core.apply.call(null,cljs.core.deref.call(null,g__31543__auto___37623),args);
});})(g__31543__auto___37623))
;

cljs.spec.gen.alpha.return$.cljs$lang$maxFixedArity = (0);

cljs.spec.gen.alpha.return$.cljs$lang$applyTo = ((function (g__31543__auto___37623){
return (function (seq37559){
return cljs.spec.gen.alpha.return$.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq37559));
});})(g__31543__auto___37623))
;


var g__31543__auto___37627 = (new cljs.spec.gen.alpha.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.large_integer_STAR_ !== 'undefined')){
return clojure.test.check.generators.large_integer_STAR_;
} else {
throw (new Error(["Var ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Symbol("clojure.test.check.generators","large-integer*","clojure.test.check.generators/large-integer*",-437830670,null))," does not exist, ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","large-integer*","clojure.test.check.generators/large-integer*",-437830670,null)))," never required"].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/large-integer*
 */
cljs.spec.gen.alpha.large_integer_STAR_ = ((function (g__31543__auto___37627){
return (function cljs$spec$gen$alpha$large_integer_STAR_(var_args){
var args__31447__auto__ = [];
var len__31440__auto___37628 = arguments.length;
var i__31441__auto___37629 = (0);
while(true){
if((i__31441__auto___37629 < len__31440__auto___37628)){
args__31447__auto__.push((arguments[i__31441__auto___37629]));

var G__37630 = (i__31441__auto___37629 + (1));
i__31441__auto___37629 = G__37630;
continue;
} else {
}
break;
}

var argseq__31448__auto__ = ((((0) < args__31447__auto__.length))?(new cljs.core.IndexedSeq(args__31447__auto__.slice((0)),(0),null)):null);
return cljs.spec.gen.alpha.large_integer_STAR_.cljs$core$IFn$_invoke$arity$variadic(argseq__31448__auto__);
});})(g__31543__auto___37627))
;

cljs.spec.gen.alpha.large_integer_STAR_.cljs$core$IFn$_invoke$arity$variadic = ((function (g__31543__auto___37627){
return (function (args){
return cljs.core.apply.call(null,cljs.core.deref.call(null,g__31543__auto___37627),args);
});})(g__31543__auto___37627))
;

cljs.spec.gen.alpha.large_integer_STAR_.cljs$lang$maxFixedArity = (0);

cljs.spec.gen.alpha.large_integer_STAR_.cljs$lang$applyTo = ((function (g__31543__auto___37627){
return (function (seq37560){
return cljs.spec.gen.alpha.large_integer_STAR_.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq37560));
});})(g__31543__auto___37627))
;


var g__31543__auto___37631 = (new cljs.spec.gen.alpha.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.double_STAR_ !== 'undefined')){
return clojure.test.check.generators.double_STAR_;
} else {
throw (new Error(["Var ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Symbol("clojure.test.check.generators","double*","clojure.test.check.generators/double*",841542265,null))," does not exist, ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","double*","clojure.test.check.generators/double*",841542265,null)))," never required"].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/double*
 */
cljs.spec.gen.alpha.double_STAR_ = ((function (g__31543__auto___37631){
return (function cljs$spec$gen$alpha$double_STAR_(var_args){
var args__31447__auto__ = [];
var len__31440__auto___37632 = arguments.length;
var i__31441__auto___37633 = (0);
while(true){
if((i__31441__auto___37633 < len__31440__auto___37632)){
args__31447__auto__.push((arguments[i__31441__auto___37633]));

var G__37634 = (i__31441__auto___37633 + (1));
i__31441__auto___37633 = G__37634;
continue;
} else {
}
break;
}

var argseq__31448__auto__ = ((((0) < args__31447__auto__.length))?(new cljs.core.IndexedSeq(args__31447__auto__.slice((0)),(0),null)):null);
return cljs.spec.gen.alpha.double_STAR_.cljs$core$IFn$_invoke$arity$variadic(argseq__31448__auto__);
});})(g__31543__auto___37631))
;

cljs.spec.gen.alpha.double_STAR_.cljs$core$IFn$_invoke$arity$variadic = ((function (g__31543__auto___37631){
return (function (args){
return cljs.core.apply.call(null,cljs.core.deref.call(null,g__31543__auto___37631),args);
});})(g__31543__auto___37631))
;

cljs.spec.gen.alpha.double_STAR_.cljs$lang$maxFixedArity = (0);

cljs.spec.gen.alpha.double_STAR_.cljs$lang$applyTo = ((function (g__31543__auto___37631){
return (function (seq37561){
return cljs.spec.gen.alpha.double_STAR_.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq37561));
});})(g__31543__auto___37631))
;


var g__31543__auto___37635 = (new cljs.spec.gen.alpha.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.frequency !== 'undefined')){
return clojure.test.check.generators.frequency;
} else {
throw (new Error(["Var ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Symbol("clojure.test.check.generators","frequency","clojure.test.check.generators/frequency",2090703177,null))," does not exist, ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","frequency","clojure.test.check.generators/frequency",2090703177,null)))," never required"].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/frequency
 */
cljs.spec.gen.alpha.frequency = ((function (g__31543__auto___37635){
return (function cljs$spec$gen$alpha$frequency(var_args){
var args__31447__auto__ = [];
var len__31440__auto___37636 = arguments.length;
var i__31441__auto___37637 = (0);
while(true){
if((i__31441__auto___37637 < len__31440__auto___37636)){
args__31447__auto__.push((arguments[i__31441__auto___37637]));

var G__37638 = (i__31441__auto___37637 + (1));
i__31441__auto___37637 = G__37638;
continue;
} else {
}
break;
}

var argseq__31448__auto__ = ((((0) < args__31447__auto__.length))?(new cljs.core.IndexedSeq(args__31447__auto__.slice((0)),(0),null)):null);
return cljs.spec.gen.alpha.frequency.cljs$core$IFn$_invoke$arity$variadic(argseq__31448__auto__);
});})(g__31543__auto___37635))
;

cljs.spec.gen.alpha.frequency.cljs$core$IFn$_invoke$arity$variadic = ((function (g__31543__auto___37635){
return (function (args){
return cljs.core.apply.call(null,cljs.core.deref.call(null,g__31543__auto___37635),args);
});})(g__31543__auto___37635))
;

cljs.spec.gen.alpha.frequency.cljs$lang$maxFixedArity = (0);

cljs.spec.gen.alpha.frequency.cljs$lang$applyTo = ((function (g__31543__auto___37635){
return (function (seq37562){
return cljs.spec.gen.alpha.frequency.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq37562));
});})(g__31543__auto___37635))
;

var g__31556__auto___37660 = (new cljs.spec.gen.alpha.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.any !== 'undefined')){
return clojure.test.check.generators.any;
} else {
throw (new Error(["Var ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Symbol("clojure.test.check.generators","any","clojure.test.check.generators/any",1883743710,null))," does not exist, ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","any","clojure.test.check.generators/any",1883743710,null)))," never required"].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/any
 */
cljs.spec.gen.alpha.any = ((function (g__31556__auto___37660){
return (function cljs$spec$gen$alpha$any(var_args){
var args__31447__auto__ = [];
var len__31440__auto___37661 = arguments.length;
var i__31441__auto___37662 = (0);
while(true){
if((i__31441__auto___37662 < len__31440__auto___37661)){
args__31447__auto__.push((arguments[i__31441__auto___37662]));

var G__37663 = (i__31441__auto___37662 + (1));
i__31441__auto___37662 = G__37663;
continue;
} else {
}
break;
}

var argseq__31448__auto__ = ((((0) < args__31447__auto__.length))?(new cljs.core.IndexedSeq(args__31447__auto__.slice((0)),(0),null)):null);
return cljs.spec.gen.alpha.any.cljs$core$IFn$_invoke$arity$variadic(argseq__31448__auto__);
});})(g__31556__auto___37660))
;

cljs.spec.gen.alpha.any.cljs$core$IFn$_invoke$arity$variadic = ((function (g__31556__auto___37660){
return (function (args){
return cljs.core.deref.call(null,g__31556__auto___37660);
});})(g__31556__auto___37660))
;

cljs.spec.gen.alpha.any.cljs$lang$maxFixedArity = (0);

cljs.spec.gen.alpha.any.cljs$lang$applyTo = ((function (g__31556__auto___37660){
return (function (seq37639){
return cljs.spec.gen.alpha.any.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq37639));
});})(g__31556__auto___37660))
;


var g__31556__auto___37664 = (new cljs.spec.gen.alpha.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.any_printable !== 'undefined')){
return clojure.test.check.generators.any_printable;
} else {
throw (new Error(["Var ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Symbol("clojure.test.check.generators","any-printable","clojure.test.check.generators/any-printable",-1570493991,null))," does not exist, ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","any-printable","clojure.test.check.generators/any-printable",-1570493991,null)))," never required"].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/any-printable
 */
cljs.spec.gen.alpha.any_printable = ((function (g__31556__auto___37664){
return (function cljs$spec$gen$alpha$any_printable(var_args){
var args__31447__auto__ = [];
var len__31440__auto___37665 = arguments.length;
var i__31441__auto___37666 = (0);
while(true){
if((i__31441__auto___37666 < len__31440__auto___37665)){
args__31447__auto__.push((arguments[i__31441__auto___37666]));

var G__37667 = (i__31441__auto___37666 + (1));
i__31441__auto___37666 = G__37667;
continue;
} else {
}
break;
}

var argseq__31448__auto__ = ((((0) < args__31447__auto__.length))?(new cljs.core.IndexedSeq(args__31447__auto__.slice((0)),(0),null)):null);
return cljs.spec.gen.alpha.any_printable.cljs$core$IFn$_invoke$arity$variadic(argseq__31448__auto__);
});})(g__31556__auto___37664))
;

cljs.spec.gen.alpha.any_printable.cljs$core$IFn$_invoke$arity$variadic = ((function (g__31556__auto___37664){
return (function (args){
return cljs.core.deref.call(null,g__31556__auto___37664);
});})(g__31556__auto___37664))
;

cljs.spec.gen.alpha.any_printable.cljs$lang$maxFixedArity = (0);

cljs.spec.gen.alpha.any_printable.cljs$lang$applyTo = ((function (g__31556__auto___37664){
return (function (seq37640){
return cljs.spec.gen.alpha.any_printable.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq37640));
});})(g__31556__auto___37664))
;


var g__31556__auto___37668 = (new cljs.spec.gen.alpha.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.boolean$ !== 'undefined')){
return clojure.test.check.generators.boolean$;
} else {
throw (new Error(["Var ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Symbol("clojure.test.check.generators","boolean","clojure.test.check.generators/boolean",1586992347,null))," does not exist, ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","boolean","clojure.test.check.generators/boolean",1586992347,null)))," never required"].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/boolean
 */
cljs.spec.gen.alpha.boolean$ = ((function (g__31556__auto___37668){
return (function cljs$spec$gen$alpha$boolean(var_args){
var args__31447__auto__ = [];
var len__31440__auto___37669 = arguments.length;
var i__31441__auto___37670 = (0);
while(true){
if((i__31441__auto___37670 < len__31440__auto___37669)){
args__31447__auto__.push((arguments[i__31441__auto___37670]));

var G__37671 = (i__31441__auto___37670 + (1));
i__31441__auto___37670 = G__37671;
continue;
} else {
}
break;
}

var argseq__31448__auto__ = ((((0) < args__31447__auto__.length))?(new cljs.core.IndexedSeq(args__31447__auto__.slice((0)),(0),null)):null);
return cljs.spec.gen.alpha.boolean$.cljs$core$IFn$_invoke$arity$variadic(argseq__31448__auto__);
});})(g__31556__auto___37668))
;

cljs.spec.gen.alpha.boolean$.cljs$core$IFn$_invoke$arity$variadic = ((function (g__31556__auto___37668){
return (function (args){
return cljs.core.deref.call(null,g__31556__auto___37668);
});})(g__31556__auto___37668))
;

cljs.spec.gen.alpha.boolean$.cljs$lang$maxFixedArity = (0);

cljs.spec.gen.alpha.boolean$.cljs$lang$applyTo = ((function (g__31556__auto___37668){
return (function (seq37641){
return cljs.spec.gen.alpha.boolean$.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq37641));
});})(g__31556__auto___37668))
;


var g__31556__auto___37672 = (new cljs.spec.gen.alpha.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.char$ !== 'undefined')){
return clojure.test.check.generators.char$;
} else {
throw (new Error(["Var ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Symbol("clojure.test.check.generators","char","clojure.test.check.generators/char",-1426343459,null))," does not exist, ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","char","clojure.test.check.generators/char",-1426343459,null)))," never required"].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/char
 */
cljs.spec.gen.alpha.char$ = ((function (g__31556__auto___37672){
return (function cljs$spec$gen$alpha$char(var_args){
var args__31447__auto__ = [];
var len__31440__auto___37673 = arguments.length;
var i__31441__auto___37674 = (0);
while(true){
if((i__31441__auto___37674 < len__31440__auto___37673)){
args__31447__auto__.push((arguments[i__31441__auto___37674]));

var G__37675 = (i__31441__auto___37674 + (1));
i__31441__auto___37674 = G__37675;
continue;
} else {
}
break;
}

var argseq__31448__auto__ = ((((0) < args__31447__auto__.length))?(new cljs.core.IndexedSeq(args__31447__auto__.slice((0)),(0),null)):null);
return cljs.spec.gen.alpha.char$.cljs$core$IFn$_invoke$arity$variadic(argseq__31448__auto__);
});})(g__31556__auto___37672))
;

cljs.spec.gen.alpha.char$.cljs$core$IFn$_invoke$arity$variadic = ((function (g__31556__auto___37672){
return (function (args){
return cljs.core.deref.call(null,g__31556__auto___37672);
});})(g__31556__auto___37672))
;

cljs.spec.gen.alpha.char$.cljs$lang$maxFixedArity = (0);

cljs.spec.gen.alpha.char$.cljs$lang$applyTo = ((function (g__31556__auto___37672){
return (function (seq37642){
return cljs.spec.gen.alpha.char$.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq37642));
});})(g__31556__auto___37672))
;


var g__31556__auto___37676 = (new cljs.spec.gen.alpha.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.char_alpha !== 'undefined')){
return clojure.test.check.generators.char_alpha;
} else {
throw (new Error(["Var ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Symbol("clojure.test.check.generators","char-alpha","clojure.test.check.generators/char-alpha",615785796,null))," does not exist, ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","char-alpha","clojure.test.check.generators/char-alpha",615785796,null)))," never required"].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/char-alpha
 */
cljs.spec.gen.alpha.char_alpha = ((function (g__31556__auto___37676){
return (function cljs$spec$gen$alpha$char_alpha(var_args){
var args__31447__auto__ = [];
var len__31440__auto___37677 = arguments.length;
var i__31441__auto___37678 = (0);
while(true){
if((i__31441__auto___37678 < len__31440__auto___37677)){
args__31447__auto__.push((arguments[i__31441__auto___37678]));

var G__37679 = (i__31441__auto___37678 + (1));
i__31441__auto___37678 = G__37679;
continue;
} else {
}
break;
}

var argseq__31448__auto__ = ((((0) < args__31447__auto__.length))?(new cljs.core.IndexedSeq(args__31447__auto__.slice((0)),(0),null)):null);
return cljs.spec.gen.alpha.char_alpha.cljs$core$IFn$_invoke$arity$variadic(argseq__31448__auto__);
});})(g__31556__auto___37676))
;

cljs.spec.gen.alpha.char_alpha.cljs$core$IFn$_invoke$arity$variadic = ((function (g__31556__auto___37676){
return (function (args){
return cljs.core.deref.call(null,g__31556__auto___37676);
});})(g__31556__auto___37676))
;

cljs.spec.gen.alpha.char_alpha.cljs$lang$maxFixedArity = (0);

cljs.spec.gen.alpha.char_alpha.cljs$lang$applyTo = ((function (g__31556__auto___37676){
return (function (seq37643){
return cljs.spec.gen.alpha.char_alpha.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq37643));
});})(g__31556__auto___37676))
;


var g__31556__auto___37680 = (new cljs.spec.gen.alpha.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.char_alphanumeric !== 'undefined')){
return clojure.test.check.generators.char_alphanumeric;
} else {
throw (new Error(["Var ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Symbol("clojure.test.check.generators","char-alphanumeric","clojure.test.check.generators/char-alphanumeric",1383091431,null))," does not exist, ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","char-alphanumeric","clojure.test.check.generators/char-alphanumeric",1383091431,null)))," never required"].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/char-alphanumeric
 */
cljs.spec.gen.alpha.char_alphanumeric = ((function (g__31556__auto___37680){
return (function cljs$spec$gen$alpha$char_alphanumeric(var_args){
var args__31447__auto__ = [];
var len__31440__auto___37681 = arguments.length;
var i__31441__auto___37682 = (0);
while(true){
if((i__31441__auto___37682 < len__31440__auto___37681)){
args__31447__auto__.push((arguments[i__31441__auto___37682]));

var G__37683 = (i__31441__auto___37682 + (1));
i__31441__auto___37682 = G__37683;
continue;
} else {
}
break;
}

var argseq__31448__auto__ = ((((0) < args__31447__auto__.length))?(new cljs.core.IndexedSeq(args__31447__auto__.slice((0)),(0),null)):null);
return cljs.spec.gen.alpha.char_alphanumeric.cljs$core$IFn$_invoke$arity$variadic(argseq__31448__auto__);
});})(g__31556__auto___37680))
;

cljs.spec.gen.alpha.char_alphanumeric.cljs$core$IFn$_invoke$arity$variadic = ((function (g__31556__auto___37680){
return (function (args){
return cljs.core.deref.call(null,g__31556__auto___37680);
});})(g__31556__auto___37680))
;

cljs.spec.gen.alpha.char_alphanumeric.cljs$lang$maxFixedArity = (0);

cljs.spec.gen.alpha.char_alphanumeric.cljs$lang$applyTo = ((function (g__31556__auto___37680){
return (function (seq37644){
return cljs.spec.gen.alpha.char_alphanumeric.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq37644));
});})(g__31556__auto___37680))
;


var g__31556__auto___37684 = (new cljs.spec.gen.alpha.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.char_ascii !== 'undefined')){
return clojure.test.check.generators.char_ascii;
} else {
throw (new Error(["Var ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Symbol("clojure.test.check.generators","char-ascii","clojure.test.check.generators/char-ascii",-899908538,null))," does not exist, ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","char-ascii","clojure.test.check.generators/char-ascii",-899908538,null)))," never required"].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/char-ascii
 */
cljs.spec.gen.alpha.char_ascii = ((function (g__31556__auto___37684){
return (function cljs$spec$gen$alpha$char_ascii(var_args){
var args__31447__auto__ = [];
var len__31440__auto___37685 = arguments.length;
var i__31441__auto___37686 = (0);
while(true){
if((i__31441__auto___37686 < len__31440__auto___37685)){
args__31447__auto__.push((arguments[i__31441__auto___37686]));

var G__37687 = (i__31441__auto___37686 + (1));
i__31441__auto___37686 = G__37687;
continue;
} else {
}
break;
}

var argseq__31448__auto__ = ((((0) < args__31447__auto__.length))?(new cljs.core.IndexedSeq(args__31447__auto__.slice((0)),(0),null)):null);
return cljs.spec.gen.alpha.char_ascii.cljs$core$IFn$_invoke$arity$variadic(argseq__31448__auto__);
});})(g__31556__auto___37684))
;

cljs.spec.gen.alpha.char_ascii.cljs$core$IFn$_invoke$arity$variadic = ((function (g__31556__auto___37684){
return (function (args){
return cljs.core.deref.call(null,g__31556__auto___37684);
});})(g__31556__auto___37684))
;

cljs.spec.gen.alpha.char_ascii.cljs$lang$maxFixedArity = (0);

cljs.spec.gen.alpha.char_ascii.cljs$lang$applyTo = ((function (g__31556__auto___37684){
return (function (seq37645){
return cljs.spec.gen.alpha.char_ascii.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq37645));
});})(g__31556__auto___37684))
;


var g__31556__auto___37688 = (new cljs.spec.gen.alpha.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.double$ !== 'undefined')){
return clojure.test.check.generators.double$;
} else {
throw (new Error(["Var ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Symbol("clojure.test.check.generators","double","clojure.test.check.generators/double",668331090,null))," does not exist, ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","double","clojure.test.check.generators/double",668331090,null)))," never required"].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/double
 */
cljs.spec.gen.alpha.double$ = ((function (g__31556__auto___37688){
return (function cljs$spec$gen$alpha$double(var_args){
var args__31447__auto__ = [];
var len__31440__auto___37689 = arguments.length;
var i__31441__auto___37690 = (0);
while(true){
if((i__31441__auto___37690 < len__31440__auto___37689)){
args__31447__auto__.push((arguments[i__31441__auto___37690]));

var G__37691 = (i__31441__auto___37690 + (1));
i__31441__auto___37690 = G__37691;
continue;
} else {
}
break;
}

var argseq__31448__auto__ = ((((0) < args__31447__auto__.length))?(new cljs.core.IndexedSeq(args__31447__auto__.slice((0)),(0),null)):null);
return cljs.spec.gen.alpha.double$.cljs$core$IFn$_invoke$arity$variadic(argseq__31448__auto__);
});})(g__31556__auto___37688))
;

cljs.spec.gen.alpha.double$.cljs$core$IFn$_invoke$arity$variadic = ((function (g__31556__auto___37688){
return (function (args){
return cljs.core.deref.call(null,g__31556__auto___37688);
});})(g__31556__auto___37688))
;

cljs.spec.gen.alpha.double$.cljs$lang$maxFixedArity = (0);

cljs.spec.gen.alpha.double$.cljs$lang$applyTo = ((function (g__31556__auto___37688){
return (function (seq37646){
return cljs.spec.gen.alpha.double$.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq37646));
});})(g__31556__auto___37688))
;


var g__31556__auto___37692 = (new cljs.spec.gen.alpha.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.int$ !== 'undefined')){
return clojure.test.check.generators.int$;
} else {
throw (new Error(["Var ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Symbol("clojure.test.check.generators","int","clojure.test.check.generators/int",1756228469,null))," does not exist, ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","int","clojure.test.check.generators/int",1756228469,null)))," never required"].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/int
 */
cljs.spec.gen.alpha.int$ = ((function (g__31556__auto___37692){
return (function cljs$spec$gen$alpha$int(var_args){
var args__31447__auto__ = [];
var len__31440__auto___37693 = arguments.length;
var i__31441__auto___37694 = (0);
while(true){
if((i__31441__auto___37694 < len__31440__auto___37693)){
args__31447__auto__.push((arguments[i__31441__auto___37694]));

var G__37695 = (i__31441__auto___37694 + (1));
i__31441__auto___37694 = G__37695;
continue;
} else {
}
break;
}

var argseq__31448__auto__ = ((((0) < args__31447__auto__.length))?(new cljs.core.IndexedSeq(args__31447__auto__.slice((0)),(0),null)):null);
return cljs.spec.gen.alpha.int$.cljs$core$IFn$_invoke$arity$variadic(argseq__31448__auto__);
});})(g__31556__auto___37692))
;

cljs.spec.gen.alpha.int$.cljs$core$IFn$_invoke$arity$variadic = ((function (g__31556__auto___37692){
return (function (args){
return cljs.core.deref.call(null,g__31556__auto___37692);
});})(g__31556__auto___37692))
;

cljs.spec.gen.alpha.int$.cljs$lang$maxFixedArity = (0);

cljs.spec.gen.alpha.int$.cljs$lang$applyTo = ((function (g__31556__auto___37692){
return (function (seq37647){
return cljs.spec.gen.alpha.int$.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq37647));
});})(g__31556__auto___37692))
;


var g__31556__auto___37696 = (new cljs.spec.gen.alpha.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.keyword !== 'undefined')){
return clojure.test.check.generators.keyword;
} else {
throw (new Error(["Var ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Symbol("clojure.test.check.generators","keyword","clojure.test.check.generators/keyword",24530530,null))," does not exist, ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","keyword","clojure.test.check.generators/keyword",24530530,null)))," never required"].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/keyword
 */
cljs.spec.gen.alpha.keyword = ((function (g__31556__auto___37696){
return (function cljs$spec$gen$alpha$keyword(var_args){
var args__31447__auto__ = [];
var len__31440__auto___37697 = arguments.length;
var i__31441__auto___37698 = (0);
while(true){
if((i__31441__auto___37698 < len__31440__auto___37697)){
args__31447__auto__.push((arguments[i__31441__auto___37698]));

var G__37699 = (i__31441__auto___37698 + (1));
i__31441__auto___37698 = G__37699;
continue;
} else {
}
break;
}

var argseq__31448__auto__ = ((((0) < args__31447__auto__.length))?(new cljs.core.IndexedSeq(args__31447__auto__.slice((0)),(0),null)):null);
return cljs.spec.gen.alpha.keyword.cljs$core$IFn$_invoke$arity$variadic(argseq__31448__auto__);
});})(g__31556__auto___37696))
;

cljs.spec.gen.alpha.keyword.cljs$core$IFn$_invoke$arity$variadic = ((function (g__31556__auto___37696){
return (function (args){
return cljs.core.deref.call(null,g__31556__auto___37696);
});})(g__31556__auto___37696))
;

cljs.spec.gen.alpha.keyword.cljs$lang$maxFixedArity = (0);

cljs.spec.gen.alpha.keyword.cljs$lang$applyTo = ((function (g__31556__auto___37696){
return (function (seq37648){
return cljs.spec.gen.alpha.keyword.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq37648));
});})(g__31556__auto___37696))
;


var g__31556__auto___37700 = (new cljs.spec.gen.alpha.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.keyword_ns !== 'undefined')){
return clojure.test.check.generators.keyword_ns;
} else {
throw (new Error(["Var ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Symbol("clojure.test.check.generators","keyword-ns","clojure.test.check.generators/keyword-ns",-1492628482,null))," does not exist, ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","keyword-ns","clojure.test.check.generators/keyword-ns",-1492628482,null)))," never required"].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/keyword-ns
 */
cljs.spec.gen.alpha.keyword_ns = ((function (g__31556__auto___37700){
return (function cljs$spec$gen$alpha$keyword_ns(var_args){
var args__31447__auto__ = [];
var len__31440__auto___37701 = arguments.length;
var i__31441__auto___37702 = (0);
while(true){
if((i__31441__auto___37702 < len__31440__auto___37701)){
args__31447__auto__.push((arguments[i__31441__auto___37702]));

var G__37703 = (i__31441__auto___37702 + (1));
i__31441__auto___37702 = G__37703;
continue;
} else {
}
break;
}

var argseq__31448__auto__ = ((((0) < args__31447__auto__.length))?(new cljs.core.IndexedSeq(args__31447__auto__.slice((0)),(0),null)):null);
return cljs.spec.gen.alpha.keyword_ns.cljs$core$IFn$_invoke$arity$variadic(argseq__31448__auto__);
});})(g__31556__auto___37700))
;

cljs.spec.gen.alpha.keyword_ns.cljs$core$IFn$_invoke$arity$variadic = ((function (g__31556__auto___37700){
return (function (args){
return cljs.core.deref.call(null,g__31556__auto___37700);
});})(g__31556__auto___37700))
;

cljs.spec.gen.alpha.keyword_ns.cljs$lang$maxFixedArity = (0);

cljs.spec.gen.alpha.keyword_ns.cljs$lang$applyTo = ((function (g__31556__auto___37700){
return (function (seq37649){
return cljs.spec.gen.alpha.keyword_ns.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq37649));
});})(g__31556__auto___37700))
;


var g__31556__auto___37704 = (new cljs.spec.gen.alpha.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.large_integer !== 'undefined')){
return clojure.test.check.generators.large_integer;
} else {
throw (new Error(["Var ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Symbol("clojure.test.check.generators","large-integer","clojure.test.check.generators/large-integer",-865967138,null))," does not exist, ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","large-integer","clojure.test.check.generators/large-integer",-865967138,null)))," never required"].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/large-integer
 */
cljs.spec.gen.alpha.large_integer = ((function (g__31556__auto___37704){
return (function cljs$spec$gen$alpha$large_integer(var_args){
var args__31447__auto__ = [];
var len__31440__auto___37705 = arguments.length;
var i__31441__auto___37706 = (0);
while(true){
if((i__31441__auto___37706 < len__31440__auto___37705)){
args__31447__auto__.push((arguments[i__31441__auto___37706]));

var G__37707 = (i__31441__auto___37706 + (1));
i__31441__auto___37706 = G__37707;
continue;
} else {
}
break;
}

var argseq__31448__auto__ = ((((0) < args__31447__auto__.length))?(new cljs.core.IndexedSeq(args__31447__auto__.slice((0)),(0),null)):null);
return cljs.spec.gen.alpha.large_integer.cljs$core$IFn$_invoke$arity$variadic(argseq__31448__auto__);
});})(g__31556__auto___37704))
;

cljs.spec.gen.alpha.large_integer.cljs$core$IFn$_invoke$arity$variadic = ((function (g__31556__auto___37704){
return (function (args){
return cljs.core.deref.call(null,g__31556__auto___37704);
});})(g__31556__auto___37704))
;

cljs.spec.gen.alpha.large_integer.cljs$lang$maxFixedArity = (0);

cljs.spec.gen.alpha.large_integer.cljs$lang$applyTo = ((function (g__31556__auto___37704){
return (function (seq37650){
return cljs.spec.gen.alpha.large_integer.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq37650));
});})(g__31556__auto___37704))
;


var g__31556__auto___37708 = (new cljs.spec.gen.alpha.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.ratio !== 'undefined')){
return clojure.test.check.generators.ratio;
} else {
throw (new Error(["Var ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Symbol("clojure.test.check.generators","ratio","clojure.test.check.generators/ratio",1540966915,null))," does not exist, ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","ratio","clojure.test.check.generators/ratio",1540966915,null)))," never required"].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/ratio
 */
cljs.spec.gen.alpha.ratio = ((function (g__31556__auto___37708){
return (function cljs$spec$gen$alpha$ratio(var_args){
var args__31447__auto__ = [];
var len__31440__auto___37709 = arguments.length;
var i__31441__auto___37710 = (0);
while(true){
if((i__31441__auto___37710 < len__31440__auto___37709)){
args__31447__auto__.push((arguments[i__31441__auto___37710]));

var G__37711 = (i__31441__auto___37710 + (1));
i__31441__auto___37710 = G__37711;
continue;
} else {
}
break;
}

var argseq__31448__auto__ = ((((0) < args__31447__auto__.length))?(new cljs.core.IndexedSeq(args__31447__auto__.slice((0)),(0),null)):null);
return cljs.spec.gen.alpha.ratio.cljs$core$IFn$_invoke$arity$variadic(argseq__31448__auto__);
});})(g__31556__auto___37708))
;

cljs.spec.gen.alpha.ratio.cljs$core$IFn$_invoke$arity$variadic = ((function (g__31556__auto___37708){
return (function (args){
return cljs.core.deref.call(null,g__31556__auto___37708);
});})(g__31556__auto___37708))
;

cljs.spec.gen.alpha.ratio.cljs$lang$maxFixedArity = (0);

cljs.spec.gen.alpha.ratio.cljs$lang$applyTo = ((function (g__31556__auto___37708){
return (function (seq37651){
return cljs.spec.gen.alpha.ratio.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq37651));
});})(g__31556__auto___37708))
;


var g__31556__auto___37712 = (new cljs.spec.gen.alpha.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.simple_type !== 'undefined')){
return clojure.test.check.generators.simple_type;
} else {
throw (new Error(["Var ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Symbol("clojure.test.check.generators","simple-type","clojure.test.check.generators/simple-type",892572284,null))," does not exist, ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","simple-type","clojure.test.check.generators/simple-type",892572284,null)))," never required"].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/simple-type
 */
cljs.spec.gen.alpha.simple_type = ((function (g__31556__auto___37712){
return (function cljs$spec$gen$alpha$simple_type(var_args){
var args__31447__auto__ = [];
var len__31440__auto___37713 = arguments.length;
var i__31441__auto___37714 = (0);
while(true){
if((i__31441__auto___37714 < len__31440__auto___37713)){
args__31447__auto__.push((arguments[i__31441__auto___37714]));

var G__37715 = (i__31441__auto___37714 + (1));
i__31441__auto___37714 = G__37715;
continue;
} else {
}
break;
}

var argseq__31448__auto__ = ((((0) < args__31447__auto__.length))?(new cljs.core.IndexedSeq(args__31447__auto__.slice((0)),(0),null)):null);
return cljs.spec.gen.alpha.simple_type.cljs$core$IFn$_invoke$arity$variadic(argseq__31448__auto__);
});})(g__31556__auto___37712))
;

cljs.spec.gen.alpha.simple_type.cljs$core$IFn$_invoke$arity$variadic = ((function (g__31556__auto___37712){
return (function (args){
return cljs.core.deref.call(null,g__31556__auto___37712);
});})(g__31556__auto___37712))
;

cljs.spec.gen.alpha.simple_type.cljs$lang$maxFixedArity = (0);

cljs.spec.gen.alpha.simple_type.cljs$lang$applyTo = ((function (g__31556__auto___37712){
return (function (seq37652){
return cljs.spec.gen.alpha.simple_type.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq37652));
});})(g__31556__auto___37712))
;


var g__31556__auto___37716 = (new cljs.spec.gen.alpha.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.simple_type_printable !== 'undefined')){
return clojure.test.check.generators.simple_type_printable;
} else {
throw (new Error(["Var ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Symbol("clojure.test.check.generators","simple-type-printable","clojure.test.check.generators/simple-type-printable",-58489962,null))," does not exist, ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","simple-type-printable","clojure.test.check.generators/simple-type-printable",-58489962,null)))," never required"].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/simple-type-printable
 */
cljs.spec.gen.alpha.simple_type_printable = ((function (g__31556__auto___37716){
return (function cljs$spec$gen$alpha$simple_type_printable(var_args){
var args__31447__auto__ = [];
var len__31440__auto___37717 = arguments.length;
var i__31441__auto___37718 = (0);
while(true){
if((i__31441__auto___37718 < len__31440__auto___37717)){
args__31447__auto__.push((arguments[i__31441__auto___37718]));

var G__37719 = (i__31441__auto___37718 + (1));
i__31441__auto___37718 = G__37719;
continue;
} else {
}
break;
}

var argseq__31448__auto__ = ((((0) < args__31447__auto__.length))?(new cljs.core.IndexedSeq(args__31447__auto__.slice((0)),(0),null)):null);
return cljs.spec.gen.alpha.simple_type_printable.cljs$core$IFn$_invoke$arity$variadic(argseq__31448__auto__);
});})(g__31556__auto___37716))
;

cljs.spec.gen.alpha.simple_type_printable.cljs$core$IFn$_invoke$arity$variadic = ((function (g__31556__auto___37716){
return (function (args){
return cljs.core.deref.call(null,g__31556__auto___37716);
});})(g__31556__auto___37716))
;

cljs.spec.gen.alpha.simple_type_printable.cljs$lang$maxFixedArity = (0);

cljs.spec.gen.alpha.simple_type_printable.cljs$lang$applyTo = ((function (g__31556__auto___37716){
return (function (seq37653){
return cljs.spec.gen.alpha.simple_type_printable.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq37653));
});})(g__31556__auto___37716))
;


var g__31556__auto___37720 = (new cljs.spec.gen.alpha.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.string !== 'undefined')){
return clojure.test.check.generators.string;
} else {
throw (new Error(["Var ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Symbol("clojure.test.check.generators","string","clojure.test.check.generators/string",-1704750979,null))," does not exist, ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","string","clojure.test.check.generators/string",-1704750979,null)))," never required"].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/string
 */
cljs.spec.gen.alpha.string = ((function (g__31556__auto___37720){
return (function cljs$spec$gen$alpha$string(var_args){
var args__31447__auto__ = [];
var len__31440__auto___37721 = arguments.length;
var i__31441__auto___37722 = (0);
while(true){
if((i__31441__auto___37722 < len__31440__auto___37721)){
args__31447__auto__.push((arguments[i__31441__auto___37722]));

var G__37723 = (i__31441__auto___37722 + (1));
i__31441__auto___37722 = G__37723;
continue;
} else {
}
break;
}

var argseq__31448__auto__ = ((((0) < args__31447__auto__.length))?(new cljs.core.IndexedSeq(args__31447__auto__.slice((0)),(0),null)):null);
return cljs.spec.gen.alpha.string.cljs$core$IFn$_invoke$arity$variadic(argseq__31448__auto__);
});})(g__31556__auto___37720))
;

cljs.spec.gen.alpha.string.cljs$core$IFn$_invoke$arity$variadic = ((function (g__31556__auto___37720){
return (function (args){
return cljs.core.deref.call(null,g__31556__auto___37720);
});})(g__31556__auto___37720))
;

cljs.spec.gen.alpha.string.cljs$lang$maxFixedArity = (0);

cljs.spec.gen.alpha.string.cljs$lang$applyTo = ((function (g__31556__auto___37720){
return (function (seq37654){
return cljs.spec.gen.alpha.string.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq37654));
});})(g__31556__auto___37720))
;


var g__31556__auto___37724 = (new cljs.spec.gen.alpha.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.string_ascii !== 'undefined')){
return clojure.test.check.generators.string_ascii;
} else {
throw (new Error(["Var ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Symbol("clojure.test.check.generators","string-ascii","clojure.test.check.generators/string-ascii",-2009877640,null))," does not exist, ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","string-ascii","clojure.test.check.generators/string-ascii",-2009877640,null)))," never required"].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/string-ascii
 */
cljs.spec.gen.alpha.string_ascii = ((function (g__31556__auto___37724){
return (function cljs$spec$gen$alpha$string_ascii(var_args){
var args__31447__auto__ = [];
var len__31440__auto___37725 = arguments.length;
var i__31441__auto___37726 = (0);
while(true){
if((i__31441__auto___37726 < len__31440__auto___37725)){
args__31447__auto__.push((arguments[i__31441__auto___37726]));

var G__37727 = (i__31441__auto___37726 + (1));
i__31441__auto___37726 = G__37727;
continue;
} else {
}
break;
}

var argseq__31448__auto__ = ((((0) < args__31447__auto__.length))?(new cljs.core.IndexedSeq(args__31447__auto__.slice((0)),(0),null)):null);
return cljs.spec.gen.alpha.string_ascii.cljs$core$IFn$_invoke$arity$variadic(argseq__31448__auto__);
});})(g__31556__auto___37724))
;

cljs.spec.gen.alpha.string_ascii.cljs$core$IFn$_invoke$arity$variadic = ((function (g__31556__auto___37724){
return (function (args){
return cljs.core.deref.call(null,g__31556__auto___37724);
});})(g__31556__auto___37724))
;

cljs.spec.gen.alpha.string_ascii.cljs$lang$maxFixedArity = (0);

cljs.spec.gen.alpha.string_ascii.cljs$lang$applyTo = ((function (g__31556__auto___37724){
return (function (seq37655){
return cljs.spec.gen.alpha.string_ascii.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq37655));
});})(g__31556__auto___37724))
;


var g__31556__auto___37728 = (new cljs.spec.gen.alpha.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.string_alphanumeric !== 'undefined')){
return clojure.test.check.generators.string_alphanumeric;
} else {
throw (new Error(["Var ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Symbol("clojure.test.check.generators","string-alphanumeric","clojure.test.check.generators/string-alphanumeric",836374939,null))," does not exist, ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","string-alphanumeric","clojure.test.check.generators/string-alphanumeric",836374939,null)))," never required"].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/string-alphanumeric
 */
cljs.spec.gen.alpha.string_alphanumeric = ((function (g__31556__auto___37728){
return (function cljs$spec$gen$alpha$string_alphanumeric(var_args){
var args__31447__auto__ = [];
var len__31440__auto___37729 = arguments.length;
var i__31441__auto___37730 = (0);
while(true){
if((i__31441__auto___37730 < len__31440__auto___37729)){
args__31447__auto__.push((arguments[i__31441__auto___37730]));

var G__37731 = (i__31441__auto___37730 + (1));
i__31441__auto___37730 = G__37731;
continue;
} else {
}
break;
}

var argseq__31448__auto__ = ((((0) < args__31447__auto__.length))?(new cljs.core.IndexedSeq(args__31447__auto__.slice((0)),(0),null)):null);
return cljs.spec.gen.alpha.string_alphanumeric.cljs$core$IFn$_invoke$arity$variadic(argseq__31448__auto__);
});})(g__31556__auto___37728))
;

cljs.spec.gen.alpha.string_alphanumeric.cljs$core$IFn$_invoke$arity$variadic = ((function (g__31556__auto___37728){
return (function (args){
return cljs.core.deref.call(null,g__31556__auto___37728);
});})(g__31556__auto___37728))
;

cljs.spec.gen.alpha.string_alphanumeric.cljs$lang$maxFixedArity = (0);

cljs.spec.gen.alpha.string_alphanumeric.cljs$lang$applyTo = ((function (g__31556__auto___37728){
return (function (seq37656){
return cljs.spec.gen.alpha.string_alphanumeric.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq37656));
});})(g__31556__auto___37728))
;


var g__31556__auto___37732 = (new cljs.spec.gen.alpha.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.symbol !== 'undefined')){
return clojure.test.check.generators.symbol;
} else {
throw (new Error(["Var ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Symbol("clojure.test.check.generators","symbol","clojure.test.check.generators/symbol",-1305461065,null))," does not exist, ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","symbol","clojure.test.check.generators/symbol",-1305461065,null)))," never required"].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/symbol
 */
cljs.spec.gen.alpha.symbol = ((function (g__31556__auto___37732){
return (function cljs$spec$gen$alpha$symbol(var_args){
var args__31447__auto__ = [];
var len__31440__auto___37733 = arguments.length;
var i__31441__auto___37734 = (0);
while(true){
if((i__31441__auto___37734 < len__31440__auto___37733)){
args__31447__auto__.push((arguments[i__31441__auto___37734]));

var G__37735 = (i__31441__auto___37734 + (1));
i__31441__auto___37734 = G__37735;
continue;
} else {
}
break;
}

var argseq__31448__auto__ = ((((0) < args__31447__auto__.length))?(new cljs.core.IndexedSeq(args__31447__auto__.slice((0)),(0),null)):null);
return cljs.spec.gen.alpha.symbol.cljs$core$IFn$_invoke$arity$variadic(argseq__31448__auto__);
});})(g__31556__auto___37732))
;

cljs.spec.gen.alpha.symbol.cljs$core$IFn$_invoke$arity$variadic = ((function (g__31556__auto___37732){
return (function (args){
return cljs.core.deref.call(null,g__31556__auto___37732);
});})(g__31556__auto___37732))
;

cljs.spec.gen.alpha.symbol.cljs$lang$maxFixedArity = (0);

cljs.spec.gen.alpha.symbol.cljs$lang$applyTo = ((function (g__31556__auto___37732){
return (function (seq37657){
return cljs.spec.gen.alpha.symbol.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq37657));
});})(g__31556__auto___37732))
;


var g__31556__auto___37736 = (new cljs.spec.gen.alpha.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.symbol_ns !== 'undefined')){
return clojure.test.check.generators.symbol_ns;
} else {
throw (new Error(["Var ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Symbol("clojure.test.check.generators","symbol-ns","clojure.test.check.generators/symbol-ns",-862629490,null))," does not exist, ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","symbol-ns","clojure.test.check.generators/symbol-ns",-862629490,null)))," never required"].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/symbol-ns
 */
cljs.spec.gen.alpha.symbol_ns = ((function (g__31556__auto___37736){
return (function cljs$spec$gen$alpha$symbol_ns(var_args){
var args__31447__auto__ = [];
var len__31440__auto___37737 = arguments.length;
var i__31441__auto___37738 = (0);
while(true){
if((i__31441__auto___37738 < len__31440__auto___37737)){
args__31447__auto__.push((arguments[i__31441__auto___37738]));

var G__37739 = (i__31441__auto___37738 + (1));
i__31441__auto___37738 = G__37739;
continue;
} else {
}
break;
}

var argseq__31448__auto__ = ((((0) < args__31447__auto__.length))?(new cljs.core.IndexedSeq(args__31447__auto__.slice((0)),(0),null)):null);
return cljs.spec.gen.alpha.symbol_ns.cljs$core$IFn$_invoke$arity$variadic(argseq__31448__auto__);
});})(g__31556__auto___37736))
;

cljs.spec.gen.alpha.symbol_ns.cljs$core$IFn$_invoke$arity$variadic = ((function (g__31556__auto___37736){
return (function (args){
return cljs.core.deref.call(null,g__31556__auto___37736);
});})(g__31556__auto___37736))
;

cljs.spec.gen.alpha.symbol_ns.cljs$lang$maxFixedArity = (0);

cljs.spec.gen.alpha.symbol_ns.cljs$lang$applyTo = ((function (g__31556__auto___37736){
return (function (seq37658){
return cljs.spec.gen.alpha.symbol_ns.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq37658));
});})(g__31556__auto___37736))
;


var g__31556__auto___37740 = (new cljs.spec.gen.alpha.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.uuid !== 'undefined')){
return clojure.test.check.generators.uuid;
} else {
throw (new Error(["Var ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Symbol("clojure.test.check.generators","uuid","clojure.test.check.generators/uuid",1589373144,null))," does not exist, ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","uuid","clojure.test.check.generators/uuid",1589373144,null)))," never required"].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/uuid
 */
cljs.spec.gen.alpha.uuid = ((function (g__31556__auto___37740){
return (function cljs$spec$gen$alpha$uuid(var_args){
var args__31447__auto__ = [];
var len__31440__auto___37741 = arguments.length;
var i__31441__auto___37742 = (0);
while(true){
if((i__31441__auto___37742 < len__31440__auto___37741)){
args__31447__auto__.push((arguments[i__31441__auto___37742]));

var G__37743 = (i__31441__auto___37742 + (1));
i__31441__auto___37742 = G__37743;
continue;
} else {
}
break;
}

var argseq__31448__auto__ = ((((0) < args__31447__auto__.length))?(new cljs.core.IndexedSeq(args__31447__auto__.slice((0)),(0),null)):null);
return cljs.spec.gen.alpha.uuid.cljs$core$IFn$_invoke$arity$variadic(argseq__31448__auto__);
});})(g__31556__auto___37740))
;

cljs.spec.gen.alpha.uuid.cljs$core$IFn$_invoke$arity$variadic = ((function (g__31556__auto___37740){
return (function (args){
return cljs.core.deref.call(null,g__31556__auto___37740);
});})(g__31556__auto___37740))
;

cljs.spec.gen.alpha.uuid.cljs$lang$maxFixedArity = (0);

cljs.spec.gen.alpha.uuid.cljs$lang$applyTo = ((function (g__31556__auto___37740){
return (function (seq37659){
return cljs.spec.gen.alpha.uuid.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq37659));
});})(g__31556__auto___37740))
;

/**
 * Returns a generator of a sequence catenated from results of
 * gens, each of which should generate something sequential.
 */
cljs.spec.gen.alpha.cat = (function cljs$spec$gen$alpha$cat(var_args){
var args__31447__auto__ = [];
var len__31440__auto___37746 = arguments.length;
var i__31441__auto___37747 = (0);
while(true){
if((i__31441__auto___37747 < len__31440__auto___37746)){
args__31447__auto__.push((arguments[i__31441__auto___37747]));

var G__37748 = (i__31441__auto___37747 + (1));
i__31441__auto___37747 = G__37748;
continue;
} else {
}
break;
}

var argseq__31448__auto__ = ((((0) < args__31447__auto__.length))?(new cljs.core.IndexedSeq(args__31447__auto__.slice((0)),(0),null)):null);
return cljs.spec.gen.alpha.cat.cljs$core$IFn$_invoke$arity$variadic(argseq__31448__auto__);
});

cljs.spec.gen.alpha.cat.cljs$core$IFn$_invoke$arity$variadic = (function (gens){
return cljs.spec.gen.alpha.fmap.call(null,(function (p1__37744_SHARP_){
return cljs.core.apply.call(null,cljs.core.concat,p1__37744_SHARP_);
}),cljs.core.apply.call(null,cljs.spec.gen.alpha.tuple,gens));
});

cljs.spec.gen.alpha.cat.cljs$lang$maxFixedArity = (0);

cljs.spec.gen.alpha.cat.cljs$lang$applyTo = (function (seq37745){
return cljs.spec.gen.alpha.cat.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq37745));
});

cljs.spec.gen.alpha.qualified_QMARK_ = (function cljs$spec$gen$alpha$qualified_QMARK_(ident){
return !((cljs.core.namespace.call(null,ident) == null));
});
cljs.spec.gen.alpha.gen_builtins = (new cljs.core.Delay((function (){
var simple = cljs.spec.gen.alpha.simple_type_printable.call(null);
return cljs.core.PersistentHashMap.fromArrays([cljs.core.qualified_keyword_QMARK_,cljs.core.seq_QMARK_,cljs.core.vector_QMARK_,cljs.core.any_QMARK_,cljs.core.boolean_QMARK_,cljs.core.char_QMARK_,cljs.core.inst_QMARK_,cljs.core.simple_symbol_QMARK_,cljs.core.sequential_QMARK_,cljs.core.float_QMARK_,cljs.core.set_QMARK_,cljs.core.map_QMARK_,cljs.core.empty_QMARK_,cljs.core.string_QMARK_,cljs.core.double_QMARK_,cljs.core.int_QMARK_,cljs.core.associative_QMARK_,cljs.core.keyword_QMARK_,cljs.core.indexed_QMARK_,cljs.core.zero_QMARK_,cljs.core.simple_keyword_QMARK_,cljs.core.neg_int_QMARK_,cljs.core.nil_QMARK_,cljs.core.ident_QMARK_,cljs.core.qualified_ident_QMARK_,cljs.core.true_QMARK_,cljs.core.integer_QMARK_,cljs.core.nat_int_QMARK_,cljs.core.pos_int_QMARK_,cljs.core.uuid_QMARK_,cljs.core.false_QMARK_,cljs.core.list_QMARK_,cljs.core.simple_ident_QMARK_,cljs.core.number_QMARK_,cljs.core.qualified_symbol_QMARK_,cljs.core.seqable_QMARK_,cljs.core.symbol_QMARK_,cljs.core.coll_QMARK_],[cljs.spec.gen.alpha.such_that.call(null,cljs.spec.gen.alpha.qualified_QMARK_,cljs.spec.gen.alpha.keyword_ns.call(null)),cljs.spec.gen.alpha.list.call(null,simple),cljs.spec.gen.alpha.vector.call(null,simple),cljs.spec.gen.alpha.one_of.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.spec.gen.alpha.return$.call(null,null),cljs.spec.gen.alpha.any_printable.call(null)], null)),cljs.spec.gen.alpha.boolean$.call(null),cljs.spec.gen.alpha.char$.call(null),cljs.spec.gen.alpha.fmap.call(null,((function (simple){
return (function (p1__37749_SHARP_){
return (new Date(p1__37749_SHARP_));
});})(simple))
,cljs.spec.gen.alpha.large_integer.call(null)),cljs.spec.gen.alpha.symbol.call(null),cljs.spec.gen.alpha.one_of.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.spec.gen.alpha.list.call(null,simple),cljs.spec.gen.alpha.vector.call(null,simple)], null)),cljs.spec.gen.alpha.double$.call(null),cljs.spec.gen.alpha.set.call(null,simple),cljs.spec.gen.alpha.map.call(null,simple,simple),cljs.spec.gen.alpha.elements.call(null,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,cljs.core.List.EMPTY,cljs.core.PersistentVector.EMPTY,cljs.core.PersistentArrayMap.EMPTY,cljs.core.PersistentHashSet.EMPTY], null)),cljs.spec.gen.alpha.string_alphanumeric.call(null),cljs.spec.gen.alpha.double$.call(null),cljs.spec.gen.alpha.large_integer.call(null),cljs.spec.gen.alpha.one_of.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.spec.gen.alpha.map.call(null,simple,simple),cljs.spec.gen.alpha.vector.call(null,simple)], null)),cljs.spec.gen.alpha.keyword_ns.call(null),cljs.spec.gen.alpha.vector.call(null,simple),cljs.spec.gen.alpha.return$.call(null,(0)),cljs.spec.gen.alpha.keyword.call(null),cljs.spec.gen.alpha.large_integer_STAR_.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"max","max",61366548),(-1)], null)),cljs.spec.gen.alpha.return$.call(null,null),cljs.spec.gen.alpha.one_of.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.spec.gen.alpha.keyword_ns.call(null),cljs.spec.gen.alpha.symbol_ns.call(null)], null)),cljs.spec.gen.alpha.such_that.call(null,cljs.spec.gen.alpha.qualified_QMARK_,cljs.spec.gen.alpha.one_of.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.spec.gen.alpha.keyword_ns.call(null),cljs.spec.gen.alpha.symbol_ns.call(null)], null))),cljs.spec.gen.alpha.return$.call(null,true),cljs.spec.gen.alpha.large_integer.call(null),cljs.spec.gen.alpha.large_integer_STAR_.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"min","min",444991522),(0)], null)),cljs.spec.gen.alpha.large_integer_STAR_.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"min","min",444991522),(1)], null)),cljs.spec.gen.alpha.uuid.call(null),cljs.spec.gen.alpha.return$.call(null,false),cljs.spec.gen.alpha.list.call(null,simple),cljs.spec.gen.alpha.one_of.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.spec.gen.alpha.keyword.call(null),cljs.spec.gen.alpha.symbol.call(null)], null)),cljs.spec.gen.alpha.one_of.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.spec.gen.alpha.large_integer.call(null),cljs.spec.gen.alpha.double$.call(null)], null)),cljs.spec.gen.alpha.such_that.call(null,cljs.spec.gen.alpha.qualified_QMARK_,cljs.spec.gen.alpha.symbol_ns.call(null)),cljs.spec.gen.alpha.one_of.call(null,new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.spec.gen.alpha.return$.call(null,null),cljs.spec.gen.alpha.list.call(null,simple),cljs.spec.gen.alpha.vector.call(null,simple),cljs.spec.gen.alpha.map.call(null,simple,simple),cljs.spec.gen.alpha.set.call(null,simple),cljs.spec.gen.alpha.string_alphanumeric.call(null)], null)),cljs.spec.gen.alpha.symbol_ns.call(null),cljs.spec.gen.alpha.one_of.call(null,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.spec.gen.alpha.map.call(null,simple,simple),cljs.spec.gen.alpha.list.call(null,simple),cljs.spec.gen.alpha.vector.call(null,simple),cljs.spec.gen.alpha.set.call(null,simple)], null))]);
}),null));
/**
 * Given a predicate, returns a built-in generator if one exists.
 */
cljs.spec.gen.alpha.gen_for_pred = (function cljs$spec$gen$alpha$gen_for_pred(pred){
if(cljs.core.set_QMARK_.call(null,pred)){
return cljs.spec.gen.alpha.elements.call(null,pred);
} else {
return cljs.core.get.call(null,cljs.core.deref.call(null,cljs.spec.gen.alpha.gen_builtins),pred);
}
});

//# sourceMappingURL=alpha.js.map?rel=1540594458935
