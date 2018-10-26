// Compiled by ClojureScript 1.9.946 {}
goog.provide('figwheel.connect');
goog.require('cljs.core');
goog.require('figwheel.client');
figwheel.connect.start = (function figwheel$connect$start(){
var config = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"on-jsload","on-jsload",-395756602),(function() { 
var G__39130__delegate = function (x__39114__auto__){
if(cljs.core.truth_(app.main.on_js_reload)){
return cljs.core.apply.call(null,app.main.on_js_reload,x__39114__auto__);
} else {
return figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),["Figwheel: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"on-jsload","on-jsload",-395756602))," hook '",cljs.core.str.cljs$core$IFn$_invoke$arity$1("app.main/on-js-reload"),"' is missing"].join(''));
}
};
var G__39130 = function (var_args){
var x__39114__auto__ = null;
if (arguments.length > 0) {
var G__39131__i = 0, G__39131__a = new Array(arguments.length -  0);
while (G__39131__i < G__39131__a.length) {G__39131__a[G__39131__i] = arguments[G__39131__i + 0]; ++G__39131__i;}
  x__39114__auto__ = new cljs.core.IndexedSeq(G__39131__a,0,null);
} 
return G__39130__delegate.call(this,x__39114__auto__);};
G__39130.cljs$lang$maxFixedArity = 0;
G__39130.cljs$lang$applyTo = (function (arglist__39132){
var x__39114__auto__ = cljs.core.seq(arglist__39132);
return G__39130__delegate(x__39114__auto__);
});
G__39130.cljs$core$IFn$_invoke$arity$variadic = G__39130__delegate;
return G__39130;
})()
,new cljs.core.Keyword(null,"build-id","build-id",1642831089),"dev",new cljs.core.Keyword(null,"websocket-url","websocket-url",-490444938),"ws://localhost:3449/figwheel-ws"], null);
figwheel.client.start.call(null,config);

if(cljs.core.truth_(new cljs.core.Keyword(null,"devcards","devcards",365747130).cljs$core$IFn$_invoke$arity$1(config))){
return devcards.core.start_devcard_ui_BANG__STAR_();
} else {
return null;
}
});
goog.exportSymbol('figwheel.connect.start', figwheel.connect.start);

//# sourceMappingURL=connect.js.map?rel=1540594460885
