// Compiled by ClojureScript 1.9.946 {}
goog.provide('cljs.repl');
goog.require('cljs.core');
goog.require('cljs.spec.alpha');
cljs.repl.print_doc = (function cljs$repl$print_doc(p__38329){
var map__38330 = p__38329;
var map__38330__$1 = ((((!((map__38330 == null)))?((((map__38330.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__38330.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__38330):map__38330);
var m = map__38330__$1;
var n = cljs.core.get.call(null,map__38330__$1,new cljs.core.Keyword(null,"ns","ns",441598760));
var nm = cljs.core.get.call(null,map__38330__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.println.call(null,"-------------------------");

cljs.core.println.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var temp__5457__auto__ = new cljs.core.Keyword(null,"ns","ns",441598760).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(temp__5457__auto__)){
var ns = temp__5457__auto__;
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(ns),"/"].join('');
} else {
return null;
}
})()),cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(m))].join(''));

if(cljs.core.truth_(new cljs.core.Keyword(null,"protocol","protocol",652470118).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"Protocol");
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"forms","forms",2045992350).cljs$core$IFn$_invoke$arity$1(m))){
var seq__38332_38354 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"forms","forms",2045992350).cljs$core$IFn$_invoke$arity$1(m));
var chunk__38333_38355 = null;
var count__38334_38356 = (0);
var i__38335_38357 = (0);
while(true){
if((i__38335_38357 < count__38334_38356)){
var f_38358 = cljs.core._nth.call(null,chunk__38333_38355,i__38335_38357);
cljs.core.println.call(null,"  ",f_38358);

var G__38359 = seq__38332_38354;
var G__38360 = chunk__38333_38355;
var G__38361 = count__38334_38356;
var G__38362 = (i__38335_38357 + (1));
seq__38332_38354 = G__38359;
chunk__38333_38355 = G__38360;
count__38334_38356 = G__38361;
i__38335_38357 = G__38362;
continue;
} else {
var temp__5457__auto___38363 = cljs.core.seq.call(null,seq__38332_38354);
if(temp__5457__auto___38363){
var seq__38332_38364__$1 = temp__5457__auto___38363;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__38332_38364__$1)){
var c__31091__auto___38365 = cljs.core.chunk_first.call(null,seq__38332_38364__$1);
var G__38366 = cljs.core.chunk_rest.call(null,seq__38332_38364__$1);
var G__38367 = c__31091__auto___38365;
var G__38368 = cljs.core.count.call(null,c__31091__auto___38365);
var G__38369 = (0);
seq__38332_38354 = G__38366;
chunk__38333_38355 = G__38367;
count__38334_38356 = G__38368;
i__38335_38357 = G__38369;
continue;
} else {
var f_38370 = cljs.core.first.call(null,seq__38332_38364__$1);
cljs.core.println.call(null,"  ",f_38370);

var G__38371 = cljs.core.next.call(null,seq__38332_38364__$1);
var G__38372 = null;
var G__38373 = (0);
var G__38374 = (0);
seq__38332_38354 = G__38371;
chunk__38333_38355 = G__38372;
count__38334_38356 = G__38373;
i__38335_38357 = G__38374;
continue;
}
} else {
}
}
break;
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m))){
var arglists_38375 = new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_((function (){var or__30160__auto__ = new cljs.core.Keyword(null,"macro","macro",-867863404).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(or__30160__auto__)){
return or__30160__auto__;
} else {
return new cljs.core.Keyword(null,"repl-special-function","repl-special-function",1262603725).cljs$core$IFn$_invoke$arity$1(m);
}
})())){
cljs.core.prn.call(null,arglists_38375);
} else {
cljs.core.prn.call(null,((cljs.core._EQ_.call(null,new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.first.call(null,arglists_38375)))?cljs.core.second.call(null,arglists_38375):arglists_38375));
}
} else {
}
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"special-form","special-form",-1326536374).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"Special Form");

cljs.core.println.call(null," ",new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(m));

if(cljs.core.contains_QMARK_.call(null,m,new cljs.core.Keyword(null,"url","url",276297046))){
if(cljs.core.truth_(new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(m))){
return cljs.core.println.call(null,["\n  Please see http://clojure.org/",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(m))].join(''));
} else {
return null;
}
} else {
return cljs.core.println.call(null,["\n  Please see http://clojure.org/special_forms#",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(m))].join(''));
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"macro","macro",-867863404).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"Macro");
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"repl-special-function","repl-special-function",1262603725).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"REPL Special Function");
} else {
}

cljs.core.println.call(null," ",new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(m));

if(cljs.core.truth_(new cljs.core.Keyword(null,"protocol","protocol",652470118).cljs$core$IFn$_invoke$arity$1(m))){
var seq__38336_38376 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"methods","methods",453930866).cljs$core$IFn$_invoke$arity$1(m));
var chunk__38337_38377 = null;
var count__38338_38378 = (0);
var i__38339_38379 = (0);
while(true){
if((i__38339_38379 < count__38338_38378)){
var vec__38340_38380 = cljs.core._nth.call(null,chunk__38337_38377,i__38339_38379);
var name_38381 = cljs.core.nth.call(null,vec__38340_38380,(0),null);
var map__38343_38382 = cljs.core.nth.call(null,vec__38340_38380,(1),null);
var map__38343_38383__$1 = ((((!((map__38343_38382 == null)))?((((map__38343_38382.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__38343_38382.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__38343_38382):map__38343_38382);
var doc_38384 = cljs.core.get.call(null,map__38343_38383__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists_38385 = cljs.core.get.call(null,map__38343_38383__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println.call(null);

cljs.core.println.call(null," ",name_38381);

cljs.core.println.call(null," ",arglists_38385);

if(cljs.core.truth_(doc_38384)){
cljs.core.println.call(null," ",doc_38384);
} else {
}

var G__38386 = seq__38336_38376;
var G__38387 = chunk__38337_38377;
var G__38388 = count__38338_38378;
var G__38389 = (i__38339_38379 + (1));
seq__38336_38376 = G__38386;
chunk__38337_38377 = G__38387;
count__38338_38378 = G__38388;
i__38339_38379 = G__38389;
continue;
} else {
var temp__5457__auto___38390 = cljs.core.seq.call(null,seq__38336_38376);
if(temp__5457__auto___38390){
var seq__38336_38391__$1 = temp__5457__auto___38390;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__38336_38391__$1)){
var c__31091__auto___38392 = cljs.core.chunk_first.call(null,seq__38336_38391__$1);
var G__38393 = cljs.core.chunk_rest.call(null,seq__38336_38391__$1);
var G__38394 = c__31091__auto___38392;
var G__38395 = cljs.core.count.call(null,c__31091__auto___38392);
var G__38396 = (0);
seq__38336_38376 = G__38393;
chunk__38337_38377 = G__38394;
count__38338_38378 = G__38395;
i__38339_38379 = G__38396;
continue;
} else {
var vec__38345_38397 = cljs.core.first.call(null,seq__38336_38391__$1);
var name_38398 = cljs.core.nth.call(null,vec__38345_38397,(0),null);
var map__38348_38399 = cljs.core.nth.call(null,vec__38345_38397,(1),null);
var map__38348_38400__$1 = ((((!((map__38348_38399 == null)))?((((map__38348_38399.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__38348_38399.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__38348_38399):map__38348_38399);
var doc_38401 = cljs.core.get.call(null,map__38348_38400__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists_38402 = cljs.core.get.call(null,map__38348_38400__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println.call(null);

cljs.core.println.call(null," ",name_38398);

cljs.core.println.call(null," ",arglists_38402);

if(cljs.core.truth_(doc_38401)){
cljs.core.println.call(null," ",doc_38401);
} else {
}

var G__38403 = cljs.core.next.call(null,seq__38336_38391__$1);
var G__38404 = null;
var G__38405 = (0);
var G__38406 = (0);
seq__38336_38376 = G__38403;
chunk__38337_38377 = G__38404;
count__38338_38378 = G__38405;
i__38339_38379 = G__38406;
continue;
}
} else {
}
}
break;
}
} else {
}

if(cljs.core.truth_(n)){
var temp__5457__auto__ = cljs.spec.alpha.get_spec.call(null,cljs.core.symbol.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.ns_name.call(null,n))].join(''),cljs.core.name.call(null,nm)));
if(cljs.core.truth_(temp__5457__auto__)){
var fnspec = temp__5457__auto__;
cljs.core.print.call(null,"Spec");

var seq__38350 = cljs.core.seq.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"args","args",1315556576),new cljs.core.Keyword(null,"ret","ret",-468222814),new cljs.core.Keyword(null,"fn","fn",-1175266204)], null));
var chunk__38351 = null;
var count__38352 = (0);
var i__38353 = (0);
while(true){
if((i__38353 < count__38352)){
var role = cljs.core._nth.call(null,chunk__38351,i__38353);
var temp__5457__auto___38407__$1 = cljs.core.get.call(null,fnspec,role);
if(cljs.core.truth_(temp__5457__auto___38407__$1)){
var spec_38408 = temp__5457__auto___38407__$1;
cljs.core.print.call(null,["\n ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.name.call(null,role)),":"].join(''),cljs.spec.alpha.describe.call(null,spec_38408));
} else {
}

var G__38409 = seq__38350;
var G__38410 = chunk__38351;
var G__38411 = count__38352;
var G__38412 = (i__38353 + (1));
seq__38350 = G__38409;
chunk__38351 = G__38410;
count__38352 = G__38411;
i__38353 = G__38412;
continue;
} else {
var temp__5457__auto____$1 = cljs.core.seq.call(null,seq__38350);
if(temp__5457__auto____$1){
var seq__38350__$1 = temp__5457__auto____$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__38350__$1)){
var c__31091__auto__ = cljs.core.chunk_first.call(null,seq__38350__$1);
var G__38413 = cljs.core.chunk_rest.call(null,seq__38350__$1);
var G__38414 = c__31091__auto__;
var G__38415 = cljs.core.count.call(null,c__31091__auto__);
var G__38416 = (0);
seq__38350 = G__38413;
chunk__38351 = G__38414;
count__38352 = G__38415;
i__38353 = G__38416;
continue;
} else {
var role = cljs.core.first.call(null,seq__38350__$1);
var temp__5457__auto___38417__$2 = cljs.core.get.call(null,fnspec,role);
if(cljs.core.truth_(temp__5457__auto___38417__$2)){
var spec_38418 = temp__5457__auto___38417__$2;
cljs.core.print.call(null,["\n ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.name.call(null,role)),":"].join(''),cljs.spec.alpha.describe.call(null,spec_38418));
} else {
}

var G__38419 = cljs.core.next.call(null,seq__38350__$1);
var G__38420 = null;
var G__38421 = (0);
var G__38422 = (0);
seq__38350 = G__38419;
chunk__38351 = G__38420;
count__38352 = G__38421;
i__38353 = G__38422;
continue;
}
} else {
return null;
}
}
break;
}
} else {
return null;
}
} else {
return null;
}
}
});

//# sourceMappingURL=repl.js.map?rel=1540594460064
