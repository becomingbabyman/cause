// Compiled by ClojureScript 1.9.946 {}
goog.provide('figwheel.client.file_reloading');
goog.require('cljs.core');
goog.require('figwheel.client.utils');
goog.require('goog.Uri');
goog.require('goog.string');
goog.require('goog.object');
goog.require('goog.net.jsloader');
goog.require('goog.html.legacyconversions');
goog.require('clojure.string');
goog.require('clojure.set');
goog.require('cljs.core.async');
goog.require('goog.async.Deferred');
if(typeof figwheel.client.file_reloading.figwheel_meta_pragmas !== 'undefined'){
} else {
figwheel.client.file_reloading.figwheel_meta_pragmas = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
}
figwheel.client.file_reloading.on_jsload_custom_event = (function figwheel$client$file_reloading$on_jsload_custom_event(url){
return figwheel.client.utils.dispatch_custom_event.call(null,"figwheel.js-reload",url);
});
figwheel.client.file_reloading.before_jsload_custom_event = (function figwheel$client$file_reloading$before_jsload_custom_event(files){
return figwheel.client.utils.dispatch_custom_event.call(null,"figwheel.before-js-reload",files);
});
figwheel.client.file_reloading.on_cssload_custom_event = (function figwheel$client$file_reloading$on_cssload_custom_event(files){
return figwheel.client.utils.dispatch_custom_event.call(null,"figwheel.css-reload",files);
});
figwheel.client.file_reloading.namespace_file_map_QMARK_ = (function figwheel$client$file_reloading$namespace_file_map_QMARK_(m){
var or__30160__auto__ = (cljs.core.map_QMARK_.call(null,m)) && (typeof new cljs.core.Keyword(null,"namespace","namespace",-377510372).cljs$core$IFn$_invoke$arity$1(m) === 'string') && (((new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(m) == null)) || (typeof new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(m) === 'string')) && (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(m),new cljs.core.Keyword(null,"namespace","namespace",-377510372)));
if(or__30160__auto__){
return or__30160__auto__;
} else {
cljs.core.println.call(null,"Error not namespace-file-map",cljs.core.pr_str.call(null,m));

return false;
}
});
figwheel.client.file_reloading.add_cache_buster = (function figwheel$client$file_reloading$add_cache_buster(url){

return goog.Uri.parse(url).makeUnique();
});
figwheel.client.file_reloading.name__GT_path = (function figwheel$client$file_reloading$name__GT_path(ns){

return goog.object.get(goog.dependencies_.nameToPath,ns);
});
figwheel.client.file_reloading.provided_QMARK_ = (function figwheel$client$file_reloading$provided_QMARK_(ns){
return goog.object.get(goog.dependencies_.written,figwheel.client.file_reloading.name__GT_path.call(null,ns));
});
figwheel.client.file_reloading.immutable_ns_QMARK_ = (function figwheel$client$file_reloading$immutable_ns_QMARK_(name){
var or__30160__auto__ = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, ["cljs.nodejs",null,"goog",null,"cljs.core",null], null), null).call(null,name);
if(cljs.core.truth_(or__30160__auto__)){
return or__30160__auto__;
} else {
var or__30160__auto____$1 = goog.string.startsWith("clojure.",name);
if(cljs.core.truth_(or__30160__auto____$1)){
return or__30160__auto____$1;
} else {
return goog.string.startsWith("goog.",name);
}
}
});
figwheel.client.file_reloading.get_requires = (function figwheel$client$file_reloading$get_requires(ns){
return cljs.core.set.call(null,cljs.core.filter.call(null,(function (p1__36855_SHARP_){
return cljs.core.not.call(null,figwheel.client.file_reloading.immutable_ns_QMARK_.call(null,p1__36855_SHARP_));
}),goog.object.getKeys(goog.object.get(goog.dependencies_.requires,figwheel.client.file_reloading.name__GT_path.call(null,ns)))));
});
if(typeof figwheel.client.file_reloading.dependency_data !== 'undefined'){
} else {
figwheel.client.file_reloading.dependency_data = cljs.core.atom.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"pathToName","pathToName",-1236616181),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"dependents","dependents",136812837),cljs.core.PersistentArrayMap.EMPTY], null));
}
figwheel.client.file_reloading.path_to_name_BANG_ = (function figwheel$client$file_reloading$path_to_name_BANG_(path,name){
return cljs.core.swap_BANG_.call(null,figwheel.client.file_reloading.dependency_data,cljs.core.update_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"pathToName","pathToName",-1236616181),path], null),cljs.core.fnil.call(null,clojure.set.union,cljs.core.PersistentHashSet.EMPTY),cljs.core.PersistentHashSet.createAsIfByAssoc([name]));
});
/**
 * Setup a path to name dependencies map.
 * That goes from path -> #{ ns-names }
 */
figwheel.client.file_reloading.setup_path__GT_name_BANG_ = (function figwheel$client$file_reloading$setup_path__GT_name_BANG_(){
var nameToPath = goog.object.filter(goog.dependencies_.nameToPath,(function (v,k,o){
return goog.string.startsWith(v,"../");
}));
return goog.object.forEach(nameToPath,((function (nameToPath){
return (function (v,k,o){
return figwheel.client.file_reloading.path_to_name_BANG_.call(null,v,k);
});})(nameToPath))
);
});
/**
 * returns a set of namespaces defined by a path
 */
figwheel.client.file_reloading.path__GT_name = (function figwheel$client$file_reloading$path__GT_name(path){
return cljs.core.get_in.call(null,cljs.core.deref.call(null,figwheel.client.file_reloading.dependency_data),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"pathToName","pathToName",-1236616181),path], null));
});
figwheel.client.file_reloading.name_to_parent_BANG_ = (function figwheel$client$file_reloading$name_to_parent_BANG_(ns,parent_ns){
return cljs.core.swap_BANG_.call(null,figwheel.client.file_reloading.dependency_data,cljs.core.update_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"dependents","dependents",136812837),ns], null),cljs.core.fnil.call(null,clojure.set.union,cljs.core.PersistentHashSet.EMPTY),cljs.core.PersistentHashSet.createAsIfByAssoc([parent_ns]));
});
/**
 * This reverses the goog.dependencies_.requires for looking up ns-dependents.
 */
figwheel.client.file_reloading.setup_ns__GT_dependents_BANG_ = (function figwheel$client$file_reloading$setup_ns__GT_dependents_BANG_(){
var requires = goog.object.filter(goog.dependencies_.requires,(function (v,k,o){
return goog.string.startsWith(k,"../");
}));
return goog.object.forEach(requires,((function (requires){
return (function (v,k,_){
return goog.object.forEach(v,((function (requires){
return (function (v_SINGLEQUOTE_,k_SINGLEQUOTE_,___$1){
var seq__36856 = cljs.core.seq.call(null,figwheel.client.file_reloading.path__GT_name.call(null,k));
var chunk__36857 = null;
var count__36858 = (0);
var i__36859 = (0);
while(true){
if((i__36859 < count__36858)){
var n = cljs.core._nth.call(null,chunk__36857,i__36859);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,k_SINGLEQUOTE_,n);

var G__36860 = seq__36856;
var G__36861 = chunk__36857;
var G__36862 = count__36858;
var G__36863 = (i__36859 + (1));
seq__36856 = G__36860;
chunk__36857 = G__36861;
count__36858 = G__36862;
i__36859 = G__36863;
continue;
} else {
var temp__5457__auto__ = cljs.core.seq.call(null,seq__36856);
if(temp__5457__auto__){
var seq__36856__$1 = temp__5457__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__36856__$1)){
var c__31091__auto__ = cljs.core.chunk_first.call(null,seq__36856__$1);
var G__36864 = cljs.core.chunk_rest.call(null,seq__36856__$1);
var G__36865 = c__31091__auto__;
var G__36866 = cljs.core.count.call(null,c__31091__auto__);
var G__36867 = (0);
seq__36856 = G__36864;
chunk__36857 = G__36865;
count__36858 = G__36866;
i__36859 = G__36867;
continue;
} else {
var n = cljs.core.first.call(null,seq__36856__$1);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,k_SINGLEQUOTE_,n);

var G__36868 = cljs.core.next.call(null,seq__36856__$1);
var G__36869 = null;
var G__36870 = (0);
var G__36871 = (0);
seq__36856 = G__36868;
chunk__36857 = G__36869;
count__36858 = G__36870;
i__36859 = G__36871;
continue;
}
} else {
return null;
}
}
break;
}
});})(requires))
);
});})(requires))
);
});
figwheel.client.file_reloading.ns__GT_dependents = (function figwheel$client$file_reloading$ns__GT_dependents(ns){
return cljs.core.get_in.call(null,cljs.core.deref.call(null,figwheel.client.file_reloading.dependency_data),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"dependents","dependents",136812837),ns], null));
});
figwheel.client.file_reloading.in_upper_level_QMARK_ = (function figwheel$client$file_reloading$in_upper_level_QMARK_(topo_state,current_depth,dep){
return cljs.core.some.call(null,(function (p__36872){
var vec__36873 = p__36872;
var _ = cljs.core.nth.call(null,vec__36873,(0),null);
var v = cljs.core.nth.call(null,vec__36873,(1),null);
var and__30148__auto__ = v;
if(cljs.core.truth_(and__30148__auto__)){
return v.call(null,dep);
} else {
return and__30148__auto__;
}
}),cljs.core.filter.call(null,(function (p__36876){
var vec__36877 = p__36876;
var k = cljs.core.nth.call(null,vec__36877,(0),null);
var v = cljs.core.nth.call(null,vec__36877,(1),null);
return (k > current_depth);
}),topo_state));
});
figwheel.client.file_reloading.build_topo_sort = (function figwheel$client$file_reloading$build_topo_sort(get_deps){
var get_deps__$1 = cljs.core.memoize.call(null,get_deps);
var topo_sort_helper_STAR_ = ((function (get_deps__$1){
return (function figwheel$client$file_reloading$build_topo_sort_$_topo_sort_helper_STAR_(x,depth,state){
var deps = get_deps__$1.call(null,x);
if(cljs.core.empty_QMARK_.call(null,deps)){
return null;
} else {
return topo_sort_STAR_.call(null,deps,depth,state);
}
});})(get_deps__$1))
;
var topo_sort_STAR_ = ((function (get_deps__$1){
return (function() {
var figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR_ = null;
var figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR___1 = (function (deps){
return figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR_.call(null,deps,(0),cljs.core.atom.call(null,cljs.core.sorted_map.call(null)));
});
var figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR___3 = (function (deps,depth,state){
cljs.core.swap_BANG_.call(null,state,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [depth], null),cljs.core.fnil.call(null,cljs.core.into,cljs.core.PersistentHashSet.EMPTY),deps);

var seq__36889_36897 = cljs.core.seq.call(null,deps);
var chunk__36890_36898 = null;
var count__36891_36899 = (0);
var i__36892_36900 = (0);
while(true){
if((i__36892_36900 < count__36891_36899)){
var dep_36901 = cljs.core._nth.call(null,chunk__36890_36898,i__36892_36900);
if(cljs.core.truth_((function (){var and__30148__auto__ = dep_36901;
if(cljs.core.truth_(and__30148__auto__)){
return cljs.core.not.call(null,figwheel.client.file_reloading.in_upper_level_QMARK_.call(null,cljs.core.deref.call(null,state),depth,dep_36901));
} else {
return and__30148__auto__;
}
})())){
topo_sort_helper_STAR_.call(null,dep_36901,(depth + (1)),state);
} else {
}

var G__36902 = seq__36889_36897;
var G__36903 = chunk__36890_36898;
var G__36904 = count__36891_36899;
var G__36905 = (i__36892_36900 + (1));
seq__36889_36897 = G__36902;
chunk__36890_36898 = G__36903;
count__36891_36899 = G__36904;
i__36892_36900 = G__36905;
continue;
} else {
var temp__5457__auto___36906 = cljs.core.seq.call(null,seq__36889_36897);
if(temp__5457__auto___36906){
var seq__36889_36907__$1 = temp__5457__auto___36906;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__36889_36907__$1)){
var c__31091__auto___36908 = cljs.core.chunk_first.call(null,seq__36889_36907__$1);
var G__36909 = cljs.core.chunk_rest.call(null,seq__36889_36907__$1);
var G__36910 = c__31091__auto___36908;
var G__36911 = cljs.core.count.call(null,c__31091__auto___36908);
var G__36912 = (0);
seq__36889_36897 = G__36909;
chunk__36890_36898 = G__36910;
count__36891_36899 = G__36911;
i__36892_36900 = G__36912;
continue;
} else {
var dep_36913 = cljs.core.first.call(null,seq__36889_36907__$1);
if(cljs.core.truth_((function (){var and__30148__auto__ = dep_36913;
if(cljs.core.truth_(and__30148__auto__)){
return cljs.core.not.call(null,figwheel.client.file_reloading.in_upper_level_QMARK_.call(null,cljs.core.deref.call(null,state),depth,dep_36913));
} else {
return and__30148__auto__;
}
})())){
topo_sort_helper_STAR_.call(null,dep_36913,(depth + (1)),state);
} else {
}

var G__36914 = cljs.core.next.call(null,seq__36889_36907__$1);
var G__36915 = null;
var G__36916 = (0);
var G__36917 = (0);
seq__36889_36897 = G__36914;
chunk__36890_36898 = G__36915;
count__36891_36899 = G__36916;
i__36892_36900 = G__36917;
continue;
}
} else {
}
}
break;
}

if(cljs.core._EQ_.call(null,depth,(0))){
return elim_dups_STAR_.call(null,cljs.core.reverse.call(null,cljs.core.vals.call(null,cljs.core.deref.call(null,state))));
} else {
return null;
}
});
figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR_ = function(deps,depth,state){
switch(arguments.length){
case 1:
return figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR___1.call(this,deps);
case 3:
return figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR___3.call(this,deps,depth,state);
}
throw(new Error('Invalid arity: ' + (arguments.length - 1)));
};
figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR_.cljs$core$IFn$_invoke$arity$1 = figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR___1;
figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR_.cljs$core$IFn$_invoke$arity$3 = figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR___3;
return figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR_;
})()
;})(get_deps__$1))
;
var elim_dups_STAR_ = ((function (get_deps__$1){
return (function figwheel$client$file_reloading$build_topo_sort_$_elim_dups_STAR_(p__36893){
var vec__36894 = p__36893;
var seq__36895 = cljs.core.seq.call(null,vec__36894);
var first__36896 = cljs.core.first.call(null,seq__36895);
var seq__36895__$1 = cljs.core.next.call(null,seq__36895);
var x = first__36896;
var xs = seq__36895__$1;
if((x == null)){
return cljs.core.List.EMPTY;
} else {
return cljs.core.cons.call(null,x,figwheel$client$file_reloading$build_topo_sort_$_elim_dups_STAR_.call(null,cljs.core.map.call(null,((function (vec__36894,seq__36895,first__36896,seq__36895__$1,x,xs,get_deps__$1){
return (function (p1__36880_SHARP_){
return clojure.set.difference.call(null,p1__36880_SHARP_,x);
});})(vec__36894,seq__36895,first__36896,seq__36895__$1,x,xs,get_deps__$1))
,xs)));
}
});})(get_deps__$1))
;
return topo_sort_STAR_;
});
figwheel.client.file_reloading.get_all_dependencies = (function figwheel$client$file_reloading$get_all_dependencies(ns){
var topo_sort_SINGLEQUOTE_ = figwheel.client.file_reloading.build_topo_sort.call(null,figwheel.client.file_reloading.get_requires);
return cljs.core.apply.call(null,cljs.core.concat,topo_sort_SINGLEQUOTE_.call(null,cljs.core.set.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [ns], null))));
});
figwheel.client.file_reloading.get_all_dependents = (function figwheel$client$file_reloading$get_all_dependents(nss){
var topo_sort_SINGLEQUOTE_ = figwheel.client.file_reloading.build_topo_sort.call(null,figwheel.client.file_reloading.ns__GT_dependents);
return cljs.core.filter.call(null,cljs.core.comp.call(null,cljs.core.not,figwheel.client.file_reloading.immutable_ns_QMARK_),cljs.core.reverse.call(null,cljs.core.apply.call(null,cljs.core.concat,topo_sort_SINGLEQUOTE_.call(null,cljs.core.set.call(null,nss)))));
});
figwheel.client.file_reloading.unprovide_BANG_ = (function figwheel$client$file_reloading$unprovide_BANG_(ns){
var path = figwheel.client.file_reloading.name__GT_path.call(null,ns);
goog.object.remove(goog.dependencies_.visited,path);

goog.object.remove(goog.dependencies_.written,path);

return goog.object.remove(goog.dependencies_.written,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(goog.basePath),cljs.core.str.cljs$core$IFn$_invoke$arity$1(path)].join(''));
});
figwheel.client.file_reloading.resolve_ns = (function figwheel$client$file_reloading$resolve_ns(ns){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(goog.basePath),cljs.core.str.cljs$core$IFn$_invoke$arity$1(figwheel.client.file_reloading.name__GT_path.call(null,ns))].join('');
});
figwheel.client.file_reloading.addDependency = (function figwheel$client$file_reloading$addDependency(path,provides,requires){
var seq__36918 = cljs.core.seq.call(null,provides);
var chunk__36919 = null;
var count__36920 = (0);
var i__36921 = (0);
while(true){
if((i__36921 < count__36920)){
var prov = cljs.core._nth.call(null,chunk__36919,i__36921);
figwheel.client.file_reloading.path_to_name_BANG_.call(null,path,prov);

var seq__36922_36930 = cljs.core.seq.call(null,requires);
var chunk__36923_36931 = null;
var count__36924_36932 = (0);
var i__36925_36933 = (0);
while(true){
if((i__36925_36933 < count__36924_36932)){
var req_36934 = cljs.core._nth.call(null,chunk__36923_36931,i__36925_36933);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,req_36934,prov);

var G__36935 = seq__36922_36930;
var G__36936 = chunk__36923_36931;
var G__36937 = count__36924_36932;
var G__36938 = (i__36925_36933 + (1));
seq__36922_36930 = G__36935;
chunk__36923_36931 = G__36936;
count__36924_36932 = G__36937;
i__36925_36933 = G__36938;
continue;
} else {
var temp__5457__auto___36939 = cljs.core.seq.call(null,seq__36922_36930);
if(temp__5457__auto___36939){
var seq__36922_36940__$1 = temp__5457__auto___36939;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__36922_36940__$1)){
var c__31091__auto___36941 = cljs.core.chunk_first.call(null,seq__36922_36940__$1);
var G__36942 = cljs.core.chunk_rest.call(null,seq__36922_36940__$1);
var G__36943 = c__31091__auto___36941;
var G__36944 = cljs.core.count.call(null,c__31091__auto___36941);
var G__36945 = (0);
seq__36922_36930 = G__36942;
chunk__36923_36931 = G__36943;
count__36924_36932 = G__36944;
i__36925_36933 = G__36945;
continue;
} else {
var req_36946 = cljs.core.first.call(null,seq__36922_36940__$1);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,req_36946,prov);

var G__36947 = cljs.core.next.call(null,seq__36922_36940__$1);
var G__36948 = null;
var G__36949 = (0);
var G__36950 = (0);
seq__36922_36930 = G__36947;
chunk__36923_36931 = G__36948;
count__36924_36932 = G__36949;
i__36925_36933 = G__36950;
continue;
}
} else {
}
}
break;
}

var G__36951 = seq__36918;
var G__36952 = chunk__36919;
var G__36953 = count__36920;
var G__36954 = (i__36921 + (1));
seq__36918 = G__36951;
chunk__36919 = G__36952;
count__36920 = G__36953;
i__36921 = G__36954;
continue;
} else {
var temp__5457__auto__ = cljs.core.seq.call(null,seq__36918);
if(temp__5457__auto__){
var seq__36918__$1 = temp__5457__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__36918__$1)){
var c__31091__auto__ = cljs.core.chunk_first.call(null,seq__36918__$1);
var G__36955 = cljs.core.chunk_rest.call(null,seq__36918__$1);
var G__36956 = c__31091__auto__;
var G__36957 = cljs.core.count.call(null,c__31091__auto__);
var G__36958 = (0);
seq__36918 = G__36955;
chunk__36919 = G__36956;
count__36920 = G__36957;
i__36921 = G__36958;
continue;
} else {
var prov = cljs.core.first.call(null,seq__36918__$1);
figwheel.client.file_reloading.path_to_name_BANG_.call(null,path,prov);

var seq__36926_36959 = cljs.core.seq.call(null,requires);
var chunk__36927_36960 = null;
var count__36928_36961 = (0);
var i__36929_36962 = (0);
while(true){
if((i__36929_36962 < count__36928_36961)){
var req_36963 = cljs.core._nth.call(null,chunk__36927_36960,i__36929_36962);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,req_36963,prov);

var G__36964 = seq__36926_36959;
var G__36965 = chunk__36927_36960;
var G__36966 = count__36928_36961;
var G__36967 = (i__36929_36962 + (1));
seq__36926_36959 = G__36964;
chunk__36927_36960 = G__36965;
count__36928_36961 = G__36966;
i__36929_36962 = G__36967;
continue;
} else {
var temp__5457__auto___36968__$1 = cljs.core.seq.call(null,seq__36926_36959);
if(temp__5457__auto___36968__$1){
var seq__36926_36969__$1 = temp__5457__auto___36968__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__36926_36969__$1)){
var c__31091__auto___36970 = cljs.core.chunk_first.call(null,seq__36926_36969__$1);
var G__36971 = cljs.core.chunk_rest.call(null,seq__36926_36969__$1);
var G__36972 = c__31091__auto___36970;
var G__36973 = cljs.core.count.call(null,c__31091__auto___36970);
var G__36974 = (0);
seq__36926_36959 = G__36971;
chunk__36927_36960 = G__36972;
count__36928_36961 = G__36973;
i__36929_36962 = G__36974;
continue;
} else {
var req_36975 = cljs.core.first.call(null,seq__36926_36969__$1);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,req_36975,prov);

var G__36976 = cljs.core.next.call(null,seq__36926_36969__$1);
var G__36977 = null;
var G__36978 = (0);
var G__36979 = (0);
seq__36926_36959 = G__36976;
chunk__36927_36960 = G__36977;
count__36928_36961 = G__36978;
i__36929_36962 = G__36979;
continue;
}
} else {
}
}
break;
}

var G__36980 = cljs.core.next.call(null,seq__36918__$1);
var G__36981 = null;
var G__36982 = (0);
var G__36983 = (0);
seq__36918 = G__36980;
chunk__36919 = G__36981;
count__36920 = G__36982;
i__36921 = G__36983;
continue;
}
} else {
return null;
}
}
break;
}
});
figwheel.client.file_reloading.figwheel_require = (function figwheel$client$file_reloading$figwheel_require(src,reload){
goog.require = figwheel.client.file_reloading.figwheel_require;

if(cljs.core._EQ_.call(null,reload,"reload-all")){
var seq__36984_36988 = cljs.core.seq.call(null,figwheel.client.file_reloading.get_all_dependencies.call(null,src));
var chunk__36985_36989 = null;
var count__36986_36990 = (0);
var i__36987_36991 = (0);
while(true){
if((i__36987_36991 < count__36986_36990)){
var ns_36992 = cljs.core._nth.call(null,chunk__36985_36989,i__36987_36991);
figwheel.client.file_reloading.unprovide_BANG_.call(null,ns_36992);

var G__36993 = seq__36984_36988;
var G__36994 = chunk__36985_36989;
var G__36995 = count__36986_36990;
var G__36996 = (i__36987_36991 + (1));
seq__36984_36988 = G__36993;
chunk__36985_36989 = G__36994;
count__36986_36990 = G__36995;
i__36987_36991 = G__36996;
continue;
} else {
var temp__5457__auto___36997 = cljs.core.seq.call(null,seq__36984_36988);
if(temp__5457__auto___36997){
var seq__36984_36998__$1 = temp__5457__auto___36997;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__36984_36998__$1)){
var c__31091__auto___36999 = cljs.core.chunk_first.call(null,seq__36984_36998__$1);
var G__37000 = cljs.core.chunk_rest.call(null,seq__36984_36998__$1);
var G__37001 = c__31091__auto___36999;
var G__37002 = cljs.core.count.call(null,c__31091__auto___36999);
var G__37003 = (0);
seq__36984_36988 = G__37000;
chunk__36985_36989 = G__37001;
count__36986_36990 = G__37002;
i__36987_36991 = G__37003;
continue;
} else {
var ns_37004 = cljs.core.first.call(null,seq__36984_36998__$1);
figwheel.client.file_reloading.unprovide_BANG_.call(null,ns_37004);

var G__37005 = cljs.core.next.call(null,seq__36984_36998__$1);
var G__37006 = null;
var G__37007 = (0);
var G__37008 = (0);
seq__36984_36988 = G__37005;
chunk__36985_36989 = G__37006;
count__36986_36990 = G__37007;
i__36987_36991 = G__37008;
continue;
}
} else {
}
}
break;
}
} else {
}

if(cljs.core.truth_(reload)){
figwheel.client.file_reloading.unprovide_BANG_.call(null,src);
} else {
}

return goog.require_figwheel_backup_(src);
});
/**
 * Reusable browser REPL bootstrapping. Patches the essential functions
 *   in goog.base to support re-loading of namespaces after page load.
 */
figwheel.client.file_reloading.bootstrap_goog_base = (function figwheel$client$file_reloading$bootstrap_goog_base(){
if(cljs.core.truth_(COMPILED)){
return null;
} else {
goog.require_figwheel_backup_ = (function (){var or__30160__auto__ = goog.require__;
if(cljs.core.truth_(or__30160__auto__)){
return or__30160__auto__;
} else {
return goog.require;
}
})();

goog.isProvided_ = (function (name){
return false;
});

figwheel.client.file_reloading.setup_path__GT_name_BANG_.call(null);

figwheel.client.file_reloading.setup_ns__GT_dependents_BANG_.call(null);

goog.addDependency_figwheel_backup_ = goog.addDependency;

goog.addDependency = (function() { 
var G__37009__delegate = function (args){
cljs.core.apply.call(null,figwheel.client.file_reloading.addDependency,args);

return cljs.core.apply.call(null,goog.addDependency_figwheel_backup_,args);
};
var G__37009 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__37010__i = 0, G__37010__a = new Array(arguments.length -  0);
while (G__37010__i < G__37010__a.length) {G__37010__a[G__37010__i] = arguments[G__37010__i + 0]; ++G__37010__i;}
  args = new cljs.core.IndexedSeq(G__37010__a,0,null);
} 
return G__37009__delegate.call(this,args);};
G__37009.cljs$lang$maxFixedArity = 0;
G__37009.cljs$lang$applyTo = (function (arglist__37011){
var args = cljs.core.seq(arglist__37011);
return G__37009__delegate(args);
});
G__37009.cljs$core$IFn$_invoke$arity$variadic = G__37009__delegate;
return G__37009;
})()
;

goog.constructNamespace_("cljs.user");

goog.global.CLOSURE_IMPORT_SCRIPT = figwheel.client.file_reloading.queued_file_reload;

return goog.require = figwheel.client.file_reloading.figwheel_require;
}
});
figwheel.client.file_reloading.patch_goog_base = (function figwheel$client$file_reloading$patch_goog_base(){
if(typeof figwheel.client.file_reloading.bootstrapped_cljs !== 'undefined'){
return null;
} else {
return (
figwheel.client.file_reloading.bootstrapped_cljs = (function (){
figwheel.client.file_reloading.bootstrap_goog_base.call(null);

return true;
})()
)
;
}
});
figwheel.client.file_reloading.gloader = ((typeof goog.net.jsloader.safeLoad !== 'undefined')?(function (p1__37012_SHARP_,p2__37013_SHARP_){
return goog.net.jsloader.safeLoad(goog.html.legacyconversions.trustedResourceUrlFromString([cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__37012_SHARP_)].join('')),p2__37013_SHARP_);
}):((typeof goog.net.jsloader.load !== 'undefined')?(function (p1__37014_SHARP_,p2__37015_SHARP_){
return goog.net.jsloader.load([cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__37014_SHARP_)].join(''),p2__37015_SHARP_);
}):(function(){throw cljs.core.ex_info.call(null,"No remote script loading function found.",cljs.core.PersistentArrayMap.EMPTY)})()
));
figwheel.client.file_reloading.reload_file_in_html_env = (function figwheel$client$file_reloading$reload_file_in_html_env(request_url,callback){

var G__37016 = figwheel.client.file_reloading.gloader.call(null,figwheel.client.file_reloading.add_cache_buster.call(null,request_url),({"cleanupWhenDone": true}));
G__37016.addCallback(((function (G__37016){
return (function (){
return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [true], null));
});})(G__37016))
);

G__37016.addErrback(((function (G__37016){
return (function (){
return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [false], null));
});})(G__37016))
);

return G__37016;
});
figwheel.client.file_reloading.write_script_tag_import = figwheel.client.file_reloading.reload_file_in_html_env;
goog.exportSymbol('figwheel.client.file_reloading.write_script_tag_import', figwheel.client.file_reloading.write_script_tag_import);
figwheel.client.file_reloading.worker_import_script = (function figwheel$client$file_reloading$worker_import_script(request_url,callback){

return callback.call(null,(function (){try{self.importScripts(figwheel.client.file_reloading.add_cache_buster.call(null,request_url));

return true;
}catch (e37017){if((e37017 instanceof Error)){
var e = e37017;
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"error","error",-978969032),["Figwheel: Error loading file ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(request_url)].join(''));

figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"error","error",-978969032),e.stack);

return false;
} else {
throw e37017;

}
}})());
});
goog.exportSymbol('figwheel.client.file_reloading.worker_import_script', figwheel.client.file_reloading.worker_import_script);
figwheel.client.file_reloading.create_node_script_import_fn = (function figwheel$client$file_reloading$create_node_script_import_fn(){
var node_path_lib = require("path");
var util_pattern = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(node_path_lib.sep),cljs.core.str.cljs$core$IFn$_invoke$arity$1(node_path_lib.join("goog","bootstrap","nodejs.js"))].join('');
var util_path = goog.object.findKey(require.cache,((function (node_path_lib,util_pattern){
return (function (v,k,o){
return goog.string.endsWith(k,util_pattern);
});})(node_path_lib,util_pattern))
);
var parts = cljs.core.pop.call(null,cljs.core.pop.call(null,clojure.string.split.call(null,util_path,/[\/\\]/)));
var root_path = clojure.string.join.call(null,node_path_lib.sep,parts);
return ((function (node_path_lib,util_pattern,util_path,parts,root_path){
return (function (request_url,callback){

var cache_path = node_path_lib.resolve(root_path,request_url);
goog.object.remove(require.cache,cache_path);

return callback.call(null,(function (){try{return require(cache_path);
}catch (e37018){if((e37018 instanceof Error)){
var e = e37018;
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"error","error",-978969032),["Figwheel: Error loading file ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cache_path)].join(''));

figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"error","error",-978969032),e.stack);

return false;
} else {
throw e37018;

}
}})());
});
;})(node_path_lib,util_pattern,util_path,parts,root_path))
});
goog.exportSymbol('figwheel.client.file_reloading.create_node_script_import_fn', figwheel.client.file_reloading.create_node_script_import_fn);
figwheel.client.file_reloading.reload_file_STAR_ = (function (){var pred__37019 = cljs.core._EQ_;
var expr__37020 = figwheel.client.utils.host_env_QMARK_.call(null);
if(cljs.core.truth_(pred__37019.call(null,new cljs.core.Keyword(null,"node","node",581201198),expr__37020))){
return figwheel.client.file_reloading.create_node_script_import_fn.call(null);
} else {
if(cljs.core.truth_(pred__37019.call(null,new cljs.core.Keyword(null,"html","html",-998796897),expr__37020))){
return figwheel.client.file_reloading.write_script_tag_import;
} else {
if(cljs.core.truth_(pred__37019.call(null,new cljs.core.Keyword(null,"worker","worker",938239996),expr__37020))){
return figwheel.client.file_reloading.worker_import_script;
} else {
return ((function (pred__37019,expr__37020){
return (function (a,b){
throw "Reload not defined for this platform";
});
;})(pred__37019,expr__37020))
}
}
}
})();
figwheel.client.file_reloading.reload_file = (function figwheel$client$file_reloading$reload_file(p__37022,callback){
var map__37023 = p__37022;
var map__37023__$1 = ((((!((map__37023 == null)))?((((map__37023.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__37023.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__37023):map__37023);
var file_msg = map__37023__$1;
var request_url = cljs.core.get.call(null,map__37023__$1,new cljs.core.Keyword(null,"request-url","request-url",2100346596));

figwheel.client.utils.debug_prn.call(null,["FigWheel: Attempting to load ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(request_url)].join(''));

return (function (){var or__30160__auto__ = goog.object.get(goog.global,"FIGWHEEL_IMPORT_SCRIPT");
if(cljs.core.truth_(or__30160__auto__)){
return or__30160__auto__;
} else {
return figwheel.client.file_reloading.reload_file_STAR_;
}
})().call(null,request_url,((function (map__37023,map__37023__$1,file_msg,request_url){
return (function (success_QMARK_){
if(cljs.core.truth_(success_QMARK_)){
figwheel.client.utils.debug_prn.call(null,["FigWheel: Successfully loaded ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(request_url)].join(''));

return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.assoc.call(null,file_msg,new cljs.core.Keyword(null,"loaded-file","loaded-file",-168399375),true)], null));
} else {
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"error","error",-978969032),["Figwheel: Error loading file ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(request_url)].join(''));

return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [file_msg], null));
}
});})(map__37023,map__37023__$1,file_msg,request_url))
);
});
if(typeof figwheel.client.file_reloading.reload_chan !== 'undefined'){
} else {
figwheel.client.file_reloading.reload_chan = cljs.core.async.chan.call(null);
}
if(typeof figwheel.client.file_reloading.on_load_callbacks !== 'undefined'){
} else {
figwheel.client.file_reloading.on_load_callbacks = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
}
if(typeof figwheel.client.file_reloading.dependencies_loaded !== 'undefined'){
} else {
figwheel.client.file_reloading.dependencies_loaded = cljs.core.atom.call(null,cljs.core.PersistentVector.EMPTY);
}
figwheel.client.file_reloading.blocking_load = (function figwheel$client$file_reloading$blocking_load(url){
var out = cljs.core.async.chan.call(null);
figwheel.client.file_reloading.reload_file.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"request-url","request-url",2100346596),url], null),((function (out){
return (function (file_msg){
cljs.core.async.put_BANG_.call(null,out,file_msg);

return cljs.core.async.close_BANG_.call(null,out);
});})(out))
);

return out;
});
if(typeof figwheel.client.file_reloading.reloader_loop !== 'undefined'){
} else {
figwheel.client.file_reloading.reloader_loop = (function (){var c__33248__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__33248__auto__){
return (function (){
var f__33249__auto__ = (function (){var switch__33158__auto__ = ((function (c__33248__auto__){
return (function (state_37061){
var state_val_37062 = (state_37061[(1)]);
if((state_val_37062 === (7))){
var inst_37057 = (state_37061[(2)]);
var state_37061__$1 = state_37061;
var statearr_37063_37089 = state_37061__$1;
(statearr_37063_37089[(2)] = inst_37057);

(statearr_37063_37089[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37062 === (1))){
var state_37061__$1 = state_37061;
var statearr_37064_37090 = state_37061__$1;
(statearr_37064_37090[(2)] = null);

(statearr_37064_37090[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37062 === (4))){
var inst_37027 = (state_37061[(7)]);
var inst_37027__$1 = (state_37061[(2)]);
var state_37061__$1 = (function (){var statearr_37065 = state_37061;
(statearr_37065[(7)] = inst_37027__$1);

return statearr_37065;
})();
if(cljs.core.truth_(inst_37027__$1)){
var statearr_37066_37091 = state_37061__$1;
(statearr_37066_37091[(1)] = (5));

} else {
var statearr_37067_37092 = state_37061__$1;
(statearr_37067_37092[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37062 === (15))){
var inst_37042 = (state_37061[(8)]);
var inst_37040 = (state_37061[(9)]);
var inst_37044 = inst_37042.call(null,inst_37040);
var state_37061__$1 = state_37061;
var statearr_37068_37093 = state_37061__$1;
(statearr_37068_37093[(2)] = inst_37044);

(statearr_37068_37093[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37062 === (13))){
var inst_37051 = (state_37061[(2)]);
var state_37061__$1 = state_37061;
var statearr_37069_37094 = state_37061__$1;
(statearr_37069_37094[(2)] = inst_37051);

(statearr_37069_37094[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37062 === (6))){
var state_37061__$1 = state_37061;
var statearr_37070_37095 = state_37061__$1;
(statearr_37070_37095[(2)] = null);

(statearr_37070_37095[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37062 === (17))){
var inst_37048 = (state_37061[(2)]);
var state_37061__$1 = state_37061;
var statearr_37071_37096 = state_37061__$1;
(statearr_37071_37096[(2)] = inst_37048);

(statearr_37071_37096[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37062 === (3))){
var inst_37059 = (state_37061[(2)]);
var state_37061__$1 = state_37061;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_37061__$1,inst_37059);
} else {
if((state_val_37062 === (12))){
var state_37061__$1 = state_37061;
var statearr_37072_37097 = state_37061__$1;
(statearr_37072_37097[(2)] = null);

(statearr_37072_37097[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37062 === (2))){
var state_37061__$1 = state_37061;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_37061__$1,(4),figwheel.client.file_reloading.reload_chan);
} else {
if((state_val_37062 === (11))){
var inst_37032 = (state_37061[(10)]);
var inst_37038 = figwheel.client.file_reloading.blocking_load.call(null,inst_37032);
var state_37061__$1 = state_37061;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_37061__$1,(14),inst_37038);
} else {
if((state_val_37062 === (9))){
var inst_37032 = (state_37061[(10)]);
var state_37061__$1 = state_37061;
if(cljs.core.truth_(inst_37032)){
var statearr_37073_37098 = state_37061__$1;
(statearr_37073_37098[(1)] = (11));

} else {
var statearr_37074_37099 = state_37061__$1;
(statearr_37074_37099[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37062 === (5))){
var inst_37027 = (state_37061[(7)]);
var inst_37033 = (state_37061[(11)]);
var inst_37032 = cljs.core.nth.call(null,inst_37027,(0),null);
var inst_37033__$1 = cljs.core.nth.call(null,inst_37027,(1),null);
var state_37061__$1 = (function (){var statearr_37075 = state_37061;
(statearr_37075[(10)] = inst_37032);

(statearr_37075[(11)] = inst_37033__$1);

return statearr_37075;
})();
if(cljs.core.truth_(inst_37033__$1)){
var statearr_37076_37100 = state_37061__$1;
(statearr_37076_37100[(1)] = (8));

} else {
var statearr_37077_37101 = state_37061__$1;
(statearr_37077_37101[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37062 === (14))){
var inst_37042 = (state_37061[(8)]);
var inst_37032 = (state_37061[(10)]);
var inst_37040 = (state_37061[(2)]);
var inst_37041 = cljs.core.deref.call(null,figwheel.client.file_reloading.on_load_callbacks);
var inst_37042__$1 = cljs.core.get.call(null,inst_37041,inst_37032);
var state_37061__$1 = (function (){var statearr_37078 = state_37061;
(statearr_37078[(8)] = inst_37042__$1);

(statearr_37078[(9)] = inst_37040);

return statearr_37078;
})();
if(cljs.core.truth_(inst_37042__$1)){
var statearr_37079_37102 = state_37061__$1;
(statearr_37079_37102[(1)] = (15));

} else {
var statearr_37080_37103 = state_37061__$1;
(statearr_37080_37103[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37062 === (16))){
var inst_37040 = (state_37061[(9)]);
var inst_37046 = cljs.core.swap_BANG_.call(null,figwheel.client.file_reloading.dependencies_loaded,cljs.core.conj,inst_37040);
var state_37061__$1 = state_37061;
var statearr_37081_37104 = state_37061__$1;
(statearr_37081_37104[(2)] = inst_37046);

(statearr_37081_37104[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37062 === (10))){
var inst_37053 = (state_37061[(2)]);
var state_37061__$1 = (function (){var statearr_37082 = state_37061;
(statearr_37082[(12)] = inst_37053);

return statearr_37082;
})();
var statearr_37083_37105 = state_37061__$1;
(statearr_37083_37105[(2)] = null);

(statearr_37083_37105[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37062 === (8))){
var inst_37033 = (state_37061[(11)]);
var inst_37035 = eval(inst_37033);
var state_37061__$1 = state_37061;
var statearr_37084_37106 = state_37061__$1;
(statearr_37084_37106[(2)] = inst_37035);

(statearr_37084_37106[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__33248__auto__))
;
return ((function (switch__33158__auto__,c__33248__auto__){
return (function() {
var figwheel$client$file_reloading$state_machine__33159__auto__ = null;
var figwheel$client$file_reloading$state_machine__33159__auto____0 = (function (){
var statearr_37085 = [null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_37085[(0)] = figwheel$client$file_reloading$state_machine__33159__auto__);

(statearr_37085[(1)] = (1));

return statearr_37085;
});
var figwheel$client$file_reloading$state_machine__33159__auto____1 = (function (state_37061){
while(true){
var ret_value__33160__auto__ = (function (){try{while(true){
var result__33161__auto__ = switch__33158__auto__.call(null,state_37061);
if(cljs.core.keyword_identical_QMARK_.call(null,result__33161__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__33161__auto__;
}
break;
}
}catch (e37086){if((e37086 instanceof Object)){
var ex__33162__auto__ = e37086;
var statearr_37087_37107 = state_37061;
(statearr_37087_37107[(5)] = ex__33162__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_37061);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e37086;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__33160__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__37108 = state_37061;
state_37061 = G__37108;
continue;
} else {
return ret_value__33160__auto__;
}
break;
}
});
figwheel$client$file_reloading$state_machine__33159__auto__ = function(state_37061){
switch(arguments.length){
case 0:
return figwheel$client$file_reloading$state_machine__33159__auto____0.call(this);
case 1:
return figwheel$client$file_reloading$state_machine__33159__auto____1.call(this,state_37061);
}
throw(new Error('Invalid arity: ' + (arguments.length - 1)));
};
figwheel$client$file_reloading$state_machine__33159__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$file_reloading$state_machine__33159__auto____0;
figwheel$client$file_reloading$state_machine__33159__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$file_reloading$state_machine__33159__auto____1;
return figwheel$client$file_reloading$state_machine__33159__auto__;
})()
;})(switch__33158__auto__,c__33248__auto__))
})();
var state__33250__auto__ = (function (){var statearr_37088 = f__33249__auto__.call(null);
(statearr_37088[(6)] = c__33248__auto__);

return statearr_37088;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__33250__auto__);
});})(c__33248__auto__))
);

return c__33248__auto__;
})();
}
figwheel.client.file_reloading.queued_file_reload = (function figwheel$client$file_reloading$queued_file_reload(var_args){
var G__37110 = arguments.length;
switch (G__37110) {
case 1:
return figwheel.client.file_reloading.queued_file_reload.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return figwheel.client.file_reloading.queued_file_reload.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

figwheel.client.file_reloading.queued_file_reload.cljs$core$IFn$_invoke$arity$1 = (function (url){
return figwheel.client.file_reloading.queued_file_reload.call(null,url,null);
});

figwheel.client.file_reloading.queued_file_reload.cljs$core$IFn$_invoke$arity$2 = (function (url,opt_source_text){
return cljs.core.async.put_BANG_.call(null,figwheel.client.file_reloading.reload_chan,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [url,opt_source_text], null));
});

figwheel.client.file_reloading.queued_file_reload.cljs$lang$maxFixedArity = 2;

figwheel.client.file_reloading.require_with_callback = (function figwheel$client$file_reloading$require_with_callback(p__37112,callback){
var map__37113 = p__37112;
var map__37113__$1 = ((((!((map__37113 == null)))?((((map__37113.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__37113.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__37113):map__37113);
var file_msg = map__37113__$1;
var namespace = cljs.core.get.call(null,map__37113__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));
var request_url = figwheel.client.file_reloading.resolve_ns.call(null,namespace);
cljs.core.swap_BANG_.call(null,figwheel.client.file_reloading.on_load_callbacks,cljs.core.assoc,request_url,((function (request_url,map__37113,map__37113__$1,file_msg,namespace){
return (function (file_msg_SINGLEQUOTE_){
cljs.core.swap_BANG_.call(null,figwheel.client.file_reloading.on_load_callbacks,cljs.core.dissoc,request_url);

return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.merge.call(null,file_msg,cljs.core.select_keys.call(null,file_msg_SINGLEQUOTE_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"loaded-file","loaded-file",-168399375)], null)))], null));
});})(request_url,map__37113,map__37113__$1,file_msg,namespace))
);

return figwheel.client.file_reloading.figwheel_require.call(null,cljs.core.name.call(null,namespace),true);
});
figwheel.client.file_reloading.figwheel_no_load_QMARK_ = (function figwheel$client$file_reloading$figwheel_no_load_QMARK_(p__37115){
var map__37116 = p__37115;
var map__37116__$1 = ((((!((map__37116 == null)))?((((map__37116.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__37116.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__37116):map__37116);
var file_msg = map__37116__$1;
var namespace = cljs.core.get.call(null,map__37116__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));
var meta_pragmas = cljs.core.get.call(null,cljs.core.deref.call(null,figwheel.client.file_reloading.figwheel_meta_pragmas),cljs.core.name.call(null,namespace));
return new cljs.core.Keyword(null,"figwheel-no-load","figwheel-no-load",-555840179).cljs$core$IFn$_invoke$arity$1(meta_pragmas);
});
figwheel.client.file_reloading.ns_exists_QMARK_ = (function figwheel$client$file_reloading$ns_exists_QMARK_(namespace){
return !((cljs.core.reduce.call(null,cljs.core.fnil.call(null,goog.object.get,({})),goog.global,clojure.string.split.call(null,cljs.core.name.call(null,namespace),".")) == null));
});
figwheel.client.file_reloading.reload_file_QMARK_ = (function figwheel$client$file_reloading$reload_file_QMARK_(p__37118){
var map__37119 = p__37118;
var map__37119__$1 = ((((!((map__37119 == null)))?((((map__37119.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__37119.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__37119):map__37119);
var file_msg = map__37119__$1;
var namespace = cljs.core.get.call(null,map__37119__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));

var meta_pragmas = cljs.core.get.call(null,cljs.core.deref.call(null,figwheel.client.file_reloading.figwheel_meta_pragmas),cljs.core.name.call(null,namespace));
var and__30148__auto__ = cljs.core.not.call(null,figwheel.client.file_reloading.figwheel_no_load_QMARK_.call(null,file_msg));
if(and__30148__auto__){
var or__30160__auto__ = new cljs.core.Keyword(null,"figwheel-always","figwheel-always",799819691).cljs$core$IFn$_invoke$arity$1(meta_pragmas);
if(cljs.core.truth_(or__30160__auto__)){
return or__30160__auto__;
} else {
var or__30160__auto____$1 = new cljs.core.Keyword(null,"figwheel-load","figwheel-load",1316089175).cljs$core$IFn$_invoke$arity$1(meta_pragmas);
if(cljs.core.truth_(or__30160__auto____$1)){
return or__30160__auto____$1;
} else {
var or__30160__auto____$2 = figwheel.client.file_reloading.provided_QMARK_.call(null,cljs.core.name.call(null,namespace));
if(cljs.core.truth_(or__30160__auto____$2)){
return or__30160__auto____$2;
} else {
return figwheel.client.file_reloading.ns_exists_QMARK_.call(null,namespace);
}
}
}
} else {
return and__30148__auto__;
}
});
figwheel.client.file_reloading.js_reload = (function figwheel$client$file_reloading$js_reload(p__37121,callback){
var map__37122 = p__37121;
var map__37122__$1 = ((((!((map__37122 == null)))?((((map__37122.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__37122.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__37122):map__37122);
var file_msg = map__37122__$1;
var request_url = cljs.core.get.call(null,map__37122__$1,new cljs.core.Keyword(null,"request-url","request-url",2100346596));
var namespace = cljs.core.get.call(null,map__37122__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));

if(cljs.core.truth_(figwheel.client.file_reloading.reload_file_QMARK_.call(null,file_msg))){
return figwheel.client.file_reloading.require_with_callback.call(null,file_msg,callback);
} else {
figwheel.client.utils.debug_prn.call(null,["Figwheel: Not trying to load file ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(request_url)].join(''));

return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [file_msg], null));
}
});
figwheel.client.file_reloading.reload_js_file = (function figwheel$client$file_reloading$reload_js_file(file_msg){
var out = cljs.core.async.chan.call(null);
figwheel.client.file_reloading.js_reload.call(null,file_msg,((function (out){
return (function (url){
cljs.core.async.put_BANG_.call(null,out,url);

return cljs.core.async.close_BANG_.call(null,out);
});})(out))
);

return out;
});
/**
 * Returns a chanel with one collection of loaded filenames on it.
 */
figwheel.client.file_reloading.load_all_js_files = (function figwheel$client$file_reloading$load_all_js_files(files){
var out = cljs.core.async.chan.call(null);
var c__33248__auto___37172 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__33248__auto___37172,out){
return (function (){
var f__33249__auto__ = (function (){var switch__33158__auto__ = ((function (c__33248__auto___37172,out){
return (function (state_37157){
var state_val_37158 = (state_37157[(1)]);
if((state_val_37158 === (1))){
var inst_37131 = cljs.core.seq.call(null,files);
var inst_37132 = cljs.core.first.call(null,inst_37131);
var inst_37133 = cljs.core.next.call(null,inst_37131);
var inst_37134 = files;
var state_37157__$1 = (function (){var statearr_37159 = state_37157;
(statearr_37159[(7)] = inst_37134);

(statearr_37159[(8)] = inst_37132);

(statearr_37159[(9)] = inst_37133);

return statearr_37159;
})();
var statearr_37160_37173 = state_37157__$1;
(statearr_37160_37173[(2)] = null);

(statearr_37160_37173[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37158 === (2))){
var inst_37134 = (state_37157[(7)]);
var inst_37140 = (state_37157[(10)]);
var inst_37139 = cljs.core.seq.call(null,inst_37134);
var inst_37140__$1 = cljs.core.first.call(null,inst_37139);
var inst_37141 = cljs.core.next.call(null,inst_37139);
var inst_37142 = (inst_37140__$1 == null);
var inst_37143 = cljs.core.not.call(null,inst_37142);
var state_37157__$1 = (function (){var statearr_37161 = state_37157;
(statearr_37161[(10)] = inst_37140__$1);

(statearr_37161[(11)] = inst_37141);

return statearr_37161;
})();
if(inst_37143){
var statearr_37162_37174 = state_37157__$1;
(statearr_37162_37174[(1)] = (4));

} else {
var statearr_37163_37175 = state_37157__$1;
(statearr_37163_37175[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37158 === (3))){
var inst_37155 = (state_37157[(2)]);
var state_37157__$1 = state_37157;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_37157__$1,inst_37155);
} else {
if((state_val_37158 === (4))){
var inst_37140 = (state_37157[(10)]);
var inst_37145 = figwheel.client.file_reloading.reload_js_file.call(null,inst_37140);
var state_37157__$1 = state_37157;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_37157__$1,(7),inst_37145);
} else {
if((state_val_37158 === (5))){
var inst_37151 = cljs.core.async.close_BANG_.call(null,out);
var state_37157__$1 = state_37157;
var statearr_37164_37176 = state_37157__$1;
(statearr_37164_37176[(2)] = inst_37151);

(statearr_37164_37176[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37158 === (6))){
var inst_37153 = (state_37157[(2)]);
var state_37157__$1 = state_37157;
var statearr_37165_37177 = state_37157__$1;
(statearr_37165_37177[(2)] = inst_37153);

(statearr_37165_37177[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37158 === (7))){
var inst_37141 = (state_37157[(11)]);
var inst_37147 = (state_37157[(2)]);
var inst_37148 = cljs.core.async.put_BANG_.call(null,out,inst_37147);
var inst_37134 = inst_37141;
var state_37157__$1 = (function (){var statearr_37166 = state_37157;
(statearr_37166[(12)] = inst_37148);

(statearr_37166[(7)] = inst_37134);

return statearr_37166;
})();
var statearr_37167_37178 = state_37157__$1;
(statearr_37167_37178[(2)] = null);

(statearr_37167_37178[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
});})(c__33248__auto___37172,out))
;
return ((function (switch__33158__auto__,c__33248__auto___37172,out){
return (function() {
var figwheel$client$file_reloading$load_all_js_files_$_state_machine__33159__auto__ = null;
var figwheel$client$file_reloading$load_all_js_files_$_state_machine__33159__auto____0 = (function (){
var statearr_37168 = [null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_37168[(0)] = figwheel$client$file_reloading$load_all_js_files_$_state_machine__33159__auto__);

(statearr_37168[(1)] = (1));

return statearr_37168;
});
var figwheel$client$file_reloading$load_all_js_files_$_state_machine__33159__auto____1 = (function (state_37157){
while(true){
var ret_value__33160__auto__ = (function (){try{while(true){
var result__33161__auto__ = switch__33158__auto__.call(null,state_37157);
if(cljs.core.keyword_identical_QMARK_.call(null,result__33161__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__33161__auto__;
}
break;
}
}catch (e37169){if((e37169 instanceof Object)){
var ex__33162__auto__ = e37169;
var statearr_37170_37179 = state_37157;
(statearr_37170_37179[(5)] = ex__33162__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_37157);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e37169;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__33160__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__37180 = state_37157;
state_37157 = G__37180;
continue;
} else {
return ret_value__33160__auto__;
}
break;
}
});
figwheel$client$file_reloading$load_all_js_files_$_state_machine__33159__auto__ = function(state_37157){
switch(arguments.length){
case 0:
return figwheel$client$file_reloading$load_all_js_files_$_state_machine__33159__auto____0.call(this);
case 1:
return figwheel$client$file_reloading$load_all_js_files_$_state_machine__33159__auto____1.call(this,state_37157);
}
throw(new Error('Invalid arity: ' + (arguments.length - 1)));
};
figwheel$client$file_reloading$load_all_js_files_$_state_machine__33159__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$file_reloading$load_all_js_files_$_state_machine__33159__auto____0;
figwheel$client$file_reloading$load_all_js_files_$_state_machine__33159__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$file_reloading$load_all_js_files_$_state_machine__33159__auto____1;
return figwheel$client$file_reloading$load_all_js_files_$_state_machine__33159__auto__;
})()
;})(switch__33158__auto__,c__33248__auto___37172,out))
})();
var state__33250__auto__ = (function (){var statearr_37171 = f__33249__auto__.call(null);
(statearr_37171[(6)] = c__33248__auto___37172);

return statearr_37171;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__33250__auto__);
});})(c__33248__auto___37172,out))
);


return cljs.core.async.into.call(null,cljs.core.PersistentVector.EMPTY,out);
});
figwheel.client.file_reloading.eval_body = (function figwheel$client$file_reloading$eval_body(p__37181,opts){
var map__37182 = p__37181;
var map__37182__$1 = ((((!((map__37182 == null)))?((((map__37182.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__37182.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__37182):map__37182);
var eval_body = cljs.core.get.call(null,map__37182__$1,new cljs.core.Keyword(null,"eval-body","eval-body",-907279883));
var file = cljs.core.get.call(null,map__37182__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
if(cljs.core.truth_((function (){var and__30148__auto__ = eval_body;
if(cljs.core.truth_(and__30148__auto__)){
return typeof eval_body === 'string';
} else {
return and__30148__auto__;
}
})())){
var code = eval_body;
try{figwheel.client.utils.debug_prn.call(null,["Evaling file ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(file)].join(''));

return figwheel.client.utils.eval_helper.call(null,code,opts);
}catch (e37184){var e = e37184;
return figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"error","error",-978969032),["Unable to evaluate ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(file)].join(''));
}} else {
return null;
}
});
figwheel.client.file_reloading.expand_files = (function figwheel$client$file_reloading$expand_files(files){
var deps = figwheel.client.file_reloading.get_all_dependents.call(null,cljs.core.map.call(null,new cljs.core.Keyword(null,"namespace","namespace",-377510372),files));
return cljs.core.filter.call(null,cljs.core.comp.call(null,cljs.core.not,cljs.core.partial.call(null,cljs.core.re_matches,/figwheel\.connect.*/),new cljs.core.Keyword(null,"namespace","namespace",-377510372)),cljs.core.map.call(null,((function (deps){
return (function (n){
var temp__5455__auto__ = cljs.core.first.call(null,cljs.core.filter.call(null,((function (deps){
return (function (p1__37185_SHARP_){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"namespace","namespace",-377510372).cljs$core$IFn$_invoke$arity$1(p1__37185_SHARP_),n);
});})(deps))
,files));
if(cljs.core.truth_(temp__5455__auto__)){
var file_msg = temp__5455__auto__;
return file_msg;
} else {
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"namespace","namespace",-377510372),new cljs.core.Keyword(null,"namespace","namespace",-377510372),n], null);
}
});})(deps))
,deps));
});
figwheel.client.file_reloading.sort_files = (function figwheel$client$file_reloading$sort_files(files){
if((cljs.core.count.call(null,files) <= (1))){
return files;
} else {
var keep_files = cljs.core.set.call(null,cljs.core.keep.call(null,new cljs.core.Keyword(null,"namespace","namespace",-377510372),files));
return cljs.core.filter.call(null,cljs.core.comp.call(null,keep_files,new cljs.core.Keyword(null,"namespace","namespace",-377510372)),figwheel.client.file_reloading.expand_files.call(null,files));
}
});
figwheel.client.file_reloading.get_figwheel_always = (function figwheel$client$file_reloading$get_figwheel_always(){
return cljs.core.map.call(null,(function (p__37186){
var vec__37187 = p__37186;
var k = cljs.core.nth.call(null,vec__37187,(0),null);
var v = cljs.core.nth.call(null,vec__37187,(1),null);
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"namespace","namespace",-377510372),k,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"namespace","namespace",-377510372)], null);
}),cljs.core.filter.call(null,(function (p__37190){
var vec__37191 = p__37190;
var k = cljs.core.nth.call(null,vec__37191,(0),null);
var v = cljs.core.nth.call(null,vec__37191,(1),null);
return new cljs.core.Keyword(null,"figwheel-always","figwheel-always",799819691).cljs$core$IFn$_invoke$arity$1(v);
}),cljs.core.deref.call(null,figwheel.client.file_reloading.figwheel_meta_pragmas)));
});
figwheel.client.file_reloading.reload_js_files = (function figwheel$client$file_reloading$reload_js_files(p__37197,p__37198){
var map__37199 = p__37197;
var map__37199__$1 = ((((!((map__37199 == null)))?((((map__37199.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__37199.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__37199):map__37199);
var opts = map__37199__$1;
var before_jsload = cljs.core.get.call(null,map__37199__$1,new cljs.core.Keyword(null,"before-jsload","before-jsload",-847513128));
var on_jsload = cljs.core.get.call(null,map__37199__$1,new cljs.core.Keyword(null,"on-jsload","on-jsload",-395756602));
var reload_dependents = cljs.core.get.call(null,map__37199__$1,new cljs.core.Keyword(null,"reload-dependents","reload-dependents",-956865430));
var map__37200 = p__37198;
var map__37200__$1 = ((((!((map__37200 == null)))?((((map__37200.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__37200.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__37200):map__37200);
var msg = map__37200__$1;
var files = cljs.core.get.call(null,map__37200__$1,new cljs.core.Keyword(null,"files","files",-472457450));
var figwheel_meta = cljs.core.get.call(null,map__37200__$1,new cljs.core.Keyword(null,"figwheel-meta","figwheel-meta",-225970237));
var recompile_dependents = cljs.core.get.call(null,map__37200__$1,new cljs.core.Keyword(null,"recompile-dependents","recompile-dependents",523804171));
if(cljs.core.empty_QMARK_.call(null,figwheel_meta)){
} else {
cljs.core.reset_BANG_.call(null,figwheel.client.file_reloading.figwheel_meta_pragmas,figwheel_meta);
}

var c__33248__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__33248__auto__,map__37199,map__37199__$1,opts,before_jsload,on_jsload,reload_dependents,map__37200,map__37200__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (){
var f__33249__auto__ = (function (){var switch__33158__auto__ = ((function (c__33248__auto__,map__37199,map__37199__$1,opts,before_jsload,on_jsload,reload_dependents,map__37200,map__37200__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (state_37354){
var state_val_37355 = (state_37354[(1)]);
if((state_val_37355 === (7))){
var inst_37217 = (state_37354[(7)]);
var inst_37214 = (state_37354[(8)]);
var inst_37216 = (state_37354[(9)]);
var inst_37215 = (state_37354[(10)]);
var inst_37222 = cljs.core._nth.call(null,inst_37215,inst_37217);
var inst_37223 = figwheel.client.file_reloading.eval_body.call(null,inst_37222,opts);
var inst_37224 = (inst_37217 + (1));
var tmp37356 = inst_37214;
var tmp37357 = inst_37216;
var tmp37358 = inst_37215;
var inst_37214__$1 = tmp37356;
var inst_37215__$1 = tmp37358;
var inst_37216__$1 = tmp37357;
var inst_37217__$1 = inst_37224;
var state_37354__$1 = (function (){var statearr_37359 = state_37354;
(statearr_37359[(7)] = inst_37217__$1);

(statearr_37359[(8)] = inst_37214__$1);

(statearr_37359[(11)] = inst_37223);

(statearr_37359[(9)] = inst_37216__$1);

(statearr_37359[(10)] = inst_37215__$1);

return statearr_37359;
})();
var statearr_37360_37443 = state_37354__$1;
(statearr_37360_37443[(2)] = null);

(statearr_37360_37443[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37355 === (20))){
var inst_37257 = (state_37354[(12)]);
var inst_37265 = figwheel.client.file_reloading.sort_files.call(null,inst_37257);
var state_37354__$1 = state_37354;
var statearr_37361_37444 = state_37354__$1;
(statearr_37361_37444[(2)] = inst_37265);

(statearr_37361_37444[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37355 === (27))){
var state_37354__$1 = state_37354;
var statearr_37362_37445 = state_37354__$1;
(statearr_37362_37445[(2)] = null);

(statearr_37362_37445[(1)] = (28));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37355 === (1))){
var inst_37206 = (state_37354[(13)]);
var inst_37203 = before_jsload.call(null,files);
var inst_37204 = figwheel.client.file_reloading.before_jsload_custom_event.call(null,files);
var inst_37205 = (function (){return ((function (inst_37206,inst_37203,inst_37204,state_val_37355,c__33248__auto__,map__37199,map__37199__$1,opts,before_jsload,on_jsload,reload_dependents,map__37200,map__37200__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (p1__37194_SHARP_){
return new cljs.core.Keyword(null,"eval-body","eval-body",-907279883).cljs$core$IFn$_invoke$arity$1(p1__37194_SHARP_);
});
;})(inst_37206,inst_37203,inst_37204,state_val_37355,c__33248__auto__,map__37199,map__37199__$1,opts,before_jsload,on_jsload,reload_dependents,map__37200,map__37200__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_37206__$1 = cljs.core.filter.call(null,inst_37205,files);
var inst_37207 = cljs.core.not_empty.call(null,inst_37206__$1);
var state_37354__$1 = (function (){var statearr_37363 = state_37354;
(statearr_37363[(13)] = inst_37206__$1);

(statearr_37363[(14)] = inst_37204);

(statearr_37363[(15)] = inst_37203);

return statearr_37363;
})();
if(cljs.core.truth_(inst_37207)){
var statearr_37364_37446 = state_37354__$1;
(statearr_37364_37446[(1)] = (2));

} else {
var statearr_37365_37447 = state_37354__$1;
(statearr_37365_37447[(1)] = (3));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37355 === (24))){
var state_37354__$1 = state_37354;
var statearr_37366_37448 = state_37354__$1;
(statearr_37366_37448[(2)] = null);

(statearr_37366_37448[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37355 === (39))){
var inst_37307 = (state_37354[(16)]);
var state_37354__$1 = state_37354;
var statearr_37367_37449 = state_37354__$1;
(statearr_37367_37449[(2)] = inst_37307);

(statearr_37367_37449[(1)] = (40));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37355 === (46))){
var inst_37349 = (state_37354[(2)]);
var state_37354__$1 = state_37354;
var statearr_37368_37450 = state_37354__$1;
(statearr_37368_37450[(2)] = inst_37349);

(statearr_37368_37450[(1)] = (31));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37355 === (4))){
var inst_37251 = (state_37354[(2)]);
var inst_37252 = cljs.core.List.EMPTY;
var inst_37253 = cljs.core.reset_BANG_.call(null,figwheel.client.file_reloading.dependencies_loaded,inst_37252);
var inst_37254 = (function (){return ((function (inst_37251,inst_37252,inst_37253,state_val_37355,c__33248__auto__,map__37199,map__37199__$1,opts,before_jsload,on_jsload,reload_dependents,map__37200,map__37200__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (p1__37195_SHARP_){
var and__30148__auto__ = new cljs.core.Keyword(null,"namespace","namespace",-377510372).cljs$core$IFn$_invoke$arity$1(p1__37195_SHARP_);
if(cljs.core.truth_(and__30148__auto__)){
return (cljs.core.not.call(null,new cljs.core.Keyword(null,"eval-body","eval-body",-907279883).cljs$core$IFn$_invoke$arity$1(p1__37195_SHARP_))) && (cljs.core.not.call(null,figwheel.client.file_reloading.figwheel_no_load_QMARK_.call(null,p1__37195_SHARP_)));
} else {
return and__30148__auto__;
}
});
;})(inst_37251,inst_37252,inst_37253,state_val_37355,c__33248__auto__,map__37199,map__37199__$1,opts,before_jsload,on_jsload,reload_dependents,map__37200,map__37200__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_37255 = cljs.core.filter.call(null,inst_37254,files);
var inst_37256 = figwheel.client.file_reloading.get_figwheel_always.call(null);
var inst_37257 = cljs.core.concat.call(null,inst_37255,inst_37256);
var state_37354__$1 = (function (){var statearr_37369 = state_37354;
(statearr_37369[(17)] = inst_37251);

(statearr_37369[(12)] = inst_37257);

(statearr_37369[(18)] = inst_37253);

return statearr_37369;
})();
if(cljs.core.truth_(reload_dependents)){
var statearr_37370_37451 = state_37354__$1;
(statearr_37370_37451[(1)] = (16));

} else {
var statearr_37371_37452 = state_37354__$1;
(statearr_37371_37452[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37355 === (15))){
var inst_37241 = (state_37354[(2)]);
var state_37354__$1 = state_37354;
var statearr_37372_37453 = state_37354__$1;
(statearr_37372_37453[(2)] = inst_37241);

(statearr_37372_37453[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37355 === (21))){
var inst_37267 = (state_37354[(19)]);
var inst_37267__$1 = (state_37354[(2)]);
var inst_37268 = figwheel.client.file_reloading.load_all_js_files.call(null,inst_37267__$1);
var state_37354__$1 = (function (){var statearr_37373 = state_37354;
(statearr_37373[(19)] = inst_37267__$1);

return statearr_37373;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_37354__$1,(22),inst_37268);
} else {
if((state_val_37355 === (31))){
var inst_37352 = (state_37354[(2)]);
var state_37354__$1 = state_37354;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_37354__$1,inst_37352);
} else {
if((state_val_37355 === (32))){
var inst_37307 = (state_37354[(16)]);
var inst_37312 = inst_37307.cljs$lang$protocol_mask$partition0$;
var inst_37313 = (inst_37312 & (64));
var inst_37314 = inst_37307.cljs$core$ISeq$;
var inst_37315 = (cljs.core.PROTOCOL_SENTINEL === inst_37314);
var inst_37316 = (inst_37313) || (inst_37315);
var state_37354__$1 = state_37354;
if(cljs.core.truth_(inst_37316)){
var statearr_37374_37454 = state_37354__$1;
(statearr_37374_37454[(1)] = (35));

} else {
var statearr_37375_37455 = state_37354__$1;
(statearr_37375_37455[(1)] = (36));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37355 === (40))){
var inst_37329 = (state_37354[(20)]);
var inst_37328 = (state_37354[(2)]);
var inst_37329__$1 = cljs.core.get.call(null,inst_37328,new cljs.core.Keyword(null,"figwheel-no-load","figwheel-no-load",-555840179));
var inst_37330 = cljs.core.get.call(null,inst_37328,new cljs.core.Keyword(null,"not-required","not-required",-950359114));
var inst_37331 = cljs.core.not_empty.call(null,inst_37329__$1);
var state_37354__$1 = (function (){var statearr_37376 = state_37354;
(statearr_37376[(21)] = inst_37330);

(statearr_37376[(20)] = inst_37329__$1);

return statearr_37376;
})();
if(cljs.core.truth_(inst_37331)){
var statearr_37377_37456 = state_37354__$1;
(statearr_37377_37456[(1)] = (41));

} else {
var statearr_37378_37457 = state_37354__$1;
(statearr_37378_37457[(1)] = (42));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37355 === (33))){
var state_37354__$1 = state_37354;
var statearr_37379_37458 = state_37354__$1;
(statearr_37379_37458[(2)] = false);

(statearr_37379_37458[(1)] = (34));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37355 === (13))){
var inst_37227 = (state_37354[(22)]);
var inst_37231 = cljs.core.chunk_first.call(null,inst_37227);
var inst_37232 = cljs.core.chunk_rest.call(null,inst_37227);
var inst_37233 = cljs.core.count.call(null,inst_37231);
var inst_37214 = inst_37232;
var inst_37215 = inst_37231;
var inst_37216 = inst_37233;
var inst_37217 = (0);
var state_37354__$1 = (function (){var statearr_37380 = state_37354;
(statearr_37380[(7)] = inst_37217);

(statearr_37380[(8)] = inst_37214);

(statearr_37380[(9)] = inst_37216);

(statearr_37380[(10)] = inst_37215);

return statearr_37380;
})();
var statearr_37381_37459 = state_37354__$1;
(statearr_37381_37459[(2)] = null);

(statearr_37381_37459[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37355 === (22))){
var inst_37270 = (state_37354[(23)]);
var inst_37275 = (state_37354[(24)]);
var inst_37271 = (state_37354[(25)]);
var inst_37267 = (state_37354[(19)]);
var inst_37270__$1 = (state_37354[(2)]);
var inst_37271__$1 = cljs.core.filter.call(null,new cljs.core.Keyword(null,"loaded-file","loaded-file",-168399375),inst_37270__$1);
var inst_37272 = (function (){var all_files = inst_37267;
var res_SINGLEQUOTE_ = inst_37270__$1;
var res = inst_37271__$1;
return ((function (all_files,res_SINGLEQUOTE_,res,inst_37270,inst_37275,inst_37271,inst_37267,inst_37270__$1,inst_37271__$1,state_val_37355,c__33248__auto__,map__37199,map__37199__$1,opts,before_jsload,on_jsload,reload_dependents,map__37200,map__37200__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (p1__37196_SHARP_){
return cljs.core.not.call(null,new cljs.core.Keyword(null,"loaded-file","loaded-file",-168399375).cljs$core$IFn$_invoke$arity$1(p1__37196_SHARP_));
});
;})(all_files,res_SINGLEQUOTE_,res,inst_37270,inst_37275,inst_37271,inst_37267,inst_37270__$1,inst_37271__$1,state_val_37355,c__33248__auto__,map__37199,map__37199__$1,opts,before_jsload,on_jsload,reload_dependents,map__37200,map__37200__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_37273 = cljs.core.filter.call(null,inst_37272,inst_37270__$1);
var inst_37274 = cljs.core.deref.call(null,figwheel.client.file_reloading.dependencies_loaded);
var inst_37275__$1 = cljs.core.filter.call(null,new cljs.core.Keyword(null,"loaded-file","loaded-file",-168399375),inst_37274);
var inst_37276 = cljs.core.not_empty.call(null,inst_37275__$1);
var state_37354__$1 = (function (){var statearr_37382 = state_37354;
(statearr_37382[(23)] = inst_37270__$1);

(statearr_37382[(24)] = inst_37275__$1);

(statearr_37382[(25)] = inst_37271__$1);

(statearr_37382[(26)] = inst_37273);

return statearr_37382;
})();
if(cljs.core.truth_(inst_37276)){
var statearr_37383_37460 = state_37354__$1;
(statearr_37383_37460[(1)] = (23));

} else {
var statearr_37384_37461 = state_37354__$1;
(statearr_37384_37461[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37355 === (36))){
var state_37354__$1 = state_37354;
var statearr_37385_37462 = state_37354__$1;
(statearr_37385_37462[(2)] = false);

(statearr_37385_37462[(1)] = (37));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37355 === (41))){
var inst_37329 = (state_37354[(20)]);
var inst_37333 = cljs.core.comp.call(null,figwheel.client.file_reloading.name__GT_path,new cljs.core.Keyword(null,"namespace","namespace",-377510372));
var inst_37334 = cljs.core.map.call(null,inst_37333,inst_37329);
var inst_37335 = cljs.core.pr_str.call(null,inst_37334);
var inst_37336 = ["figwheel-no-load meta-data: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(inst_37335)].join('');
var inst_37337 = figwheel.client.utils.log.call(null,inst_37336);
var state_37354__$1 = state_37354;
var statearr_37386_37463 = state_37354__$1;
(statearr_37386_37463[(2)] = inst_37337);

(statearr_37386_37463[(1)] = (43));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37355 === (43))){
var inst_37330 = (state_37354[(21)]);
var inst_37340 = (state_37354[(2)]);
var inst_37341 = cljs.core.not_empty.call(null,inst_37330);
var state_37354__$1 = (function (){var statearr_37387 = state_37354;
(statearr_37387[(27)] = inst_37340);

return statearr_37387;
})();
if(cljs.core.truth_(inst_37341)){
var statearr_37388_37464 = state_37354__$1;
(statearr_37388_37464[(1)] = (44));

} else {
var statearr_37389_37465 = state_37354__$1;
(statearr_37389_37465[(1)] = (45));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37355 === (29))){
var inst_37270 = (state_37354[(23)]);
var inst_37275 = (state_37354[(24)]);
var inst_37271 = (state_37354[(25)]);
var inst_37307 = (state_37354[(16)]);
var inst_37267 = (state_37354[(19)]);
var inst_37273 = (state_37354[(26)]);
var inst_37303 = figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: NOT loading these files ");
var inst_37306 = (function (){var all_files = inst_37267;
var res_SINGLEQUOTE_ = inst_37270;
var res = inst_37271;
var files_not_loaded = inst_37273;
var dependencies_that_loaded = inst_37275;
return ((function (all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_37270,inst_37275,inst_37271,inst_37307,inst_37267,inst_37273,inst_37303,state_val_37355,c__33248__auto__,map__37199,map__37199__$1,opts,before_jsload,on_jsload,reload_dependents,map__37200,map__37200__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (p__37305){
var map__37390 = p__37305;
var map__37390__$1 = ((((!((map__37390 == null)))?((((map__37390.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__37390.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__37390):map__37390);
var namespace = cljs.core.get.call(null,map__37390__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));
var meta_data = cljs.core.get.call(null,cljs.core.deref.call(null,figwheel.client.file_reloading.figwheel_meta_pragmas),cljs.core.name.call(null,namespace));
if((meta_data == null)){
return new cljs.core.Keyword(null,"not-required","not-required",-950359114);
} else {
if(cljs.core.truth_(meta_data.call(null,new cljs.core.Keyword(null,"figwheel-no-load","figwheel-no-load",-555840179)))){
return new cljs.core.Keyword(null,"figwheel-no-load","figwheel-no-load",-555840179);
} else {
return new cljs.core.Keyword(null,"not-required","not-required",-950359114);

}
}
});
;})(all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_37270,inst_37275,inst_37271,inst_37307,inst_37267,inst_37273,inst_37303,state_val_37355,c__33248__auto__,map__37199,map__37199__$1,opts,before_jsload,on_jsload,reload_dependents,map__37200,map__37200__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_37307__$1 = cljs.core.group_by.call(null,inst_37306,inst_37273);
var inst_37309 = (inst_37307__$1 == null);
var inst_37310 = cljs.core.not.call(null,inst_37309);
var state_37354__$1 = (function (){var statearr_37392 = state_37354;
(statearr_37392[(16)] = inst_37307__$1);

(statearr_37392[(28)] = inst_37303);

return statearr_37392;
})();
if(inst_37310){
var statearr_37393_37466 = state_37354__$1;
(statearr_37393_37466[(1)] = (32));

} else {
var statearr_37394_37467 = state_37354__$1;
(statearr_37394_37467[(1)] = (33));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37355 === (44))){
var inst_37330 = (state_37354[(21)]);
var inst_37343 = cljs.core.map.call(null,new cljs.core.Keyword(null,"file","file",-1269645878),inst_37330);
var inst_37344 = cljs.core.pr_str.call(null,inst_37343);
var inst_37345 = ["not required: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(inst_37344)].join('');
var inst_37346 = figwheel.client.utils.log.call(null,inst_37345);
var state_37354__$1 = state_37354;
var statearr_37395_37468 = state_37354__$1;
(statearr_37395_37468[(2)] = inst_37346);

(statearr_37395_37468[(1)] = (46));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37355 === (6))){
var inst_37248 = (state_37354[(2)]);
var state_37354__$1 = state_37354;
var statearr_37396_37469 = state_37354__$1;
(statearr_37396_37469[(2)] = inst_37248);

(statearr_37396_37469[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37355 === (28))){
var inst_37273 = (state_37354[(26)]);
var inst_37300 = (state_37354[(2)]);
var inst_37301 = cljs.core.not_empty.call(null,inst_37273);
var state_37354__$1 = (function (){var statearr_37397 = state_37354;
(statearr_37397[(29)] = inst_37300);

return statearr_37397;
})();
if(cljs.core.truth_(inst_37301)){
var statearr_37398_37470 = state_37354__$1;
(statearr_37398_37470[(1)] = (29));

} else {
var statearr_37399_37471 = state_37354__$1;
(statearr_37399_37471[(1)] = (30));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37355 === (25))){
var inst_37271 = (state_37354[(25)]);
var inst_37287 = (state_37354[(2)]);
var inst_37288 = cljs.core.not_empty.call(null,inst_37271);
var state_37354__$1 = (function (){var statearr_37400 = state_37354;
(statearr_37400[(30)] = inst_37287);

return statearr_37400;
})();
if(cljs.core.truth_(inst_37288)){
var statearr_37401_37472 = state_37354__$1;
(statearr_37401_37472[(1)] = (26));

} else {
var statearr_37402_37473 = state_37354__$1;
(statearr_37402_37473[(1)] = (27));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37355 === (34))){
var inst_37323 = (state_37354[(2)]);
var state_37354__$1 = state_37354;
if(cljs.core.truth_(inst_37323)){
var statearr_37403_37474 = state_37354__$1;
(statearr_37403_37474[(1)] = (38));

} else {
var statearr_37404_37475 = state_37354__$1;
(statearr_37404_37475[(1)] = (39));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37355 === (17))){
var state_37354__$1 = state_37354;
var statearr_37405_37476 = state_37354__$1;
(statearr_37405_37476[(2)] = recompile_dependents);

(statearr_37405_37476[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37355 === (3))){
var state_37354__$1 = state_37354;
var statearr_37406_37477 = state_37354__$1;
(statearr_37406_37477[(2)] = null);

(statearr_37406_37477[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37355 === (12))){
var inst_37244 = (state_37354[(2)]);
var state_37354__$1 = state_37354;
var statearr_37407_37478 = state_37354__$1;
(statearr_37407_37478[(2)] = inst_37244);

(statearr_37407_37478[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37355 === (2))){
var inst_37206 = (state_37354[(13)]);
var inst_37213 = cljs.core.seq.call(null,inst_37206);
var inst_37214 = inst_37213;
var inst_37215 = null;
var inst_37216 = (0);
var inst_37217 = (0);
var state_37354__$1 = (function (){var statearr_37408 = state_37354;
(statearr_37408[(7)] = inst_37217);

(statearr_37408[(8)] = inst_37214);

(statearr_37408[(9)] = inst_37216);

(statearr_37408[(10)] = inst_37215);

return statearr_37408;
})();
var statearr_37409_37479 = state_37354__$1;
(statearr_37409_37479[(2)] = null);

(statearr_37409_37479[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37355 === (23))){
var inst_37270 = (state_37354[(23)]);
var inst_37275 = (state_37354[(24)]);
var inst_37271 = (state_37354[(25)]);
var inst_37267 = (state_37354[(19)]);
var inst_37273 = (state_37354[(26)]);
var inst_37278 = figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: loaded these dependencies");
var inst_37280 = (function (){var all_files = inst_37267;
var res_SINGLEQUOTE_ = inst_37270;
var res = inst_37271;
var files_not_loaded = inst_37273;
var dependencies_that_loaded = inst_37275;
return ((function (all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_37270,inst_37275,inst_37271,inst_37267,inst_37273,inst_37278,state_val_37355,c__33248__auto__,map__37199,map__37199__$1,opts,before_jsload,on_jsload,reload_dependents,map__37200,map__37200__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (p__37279){
var map__37410 = p__37279;
var map__37410__$1 = ((((!((map__37410 == null)))?((((map__37410.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__37410.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__37410):map__37410);
var request_url = cljs.core.get.call(null,map__37410__$1,new cljs.core.Keyword(null,"request-url","request-url",2100346596));
return clojure.string.replace.call(null,request_url,goog.basePath,"");
});
;})(all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_37270,inst_37275,inst_37271,inst_37267,inst_37273,inst_37278,state_val_37355,c__33248__auto__,map__37199,map__37199__$1,opts,before_jsload,on_jsload,reload_dependents,map__37200,map__37200__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_37281 = cljs.core.reverse.call(null,inst_37275);
var inst_37282 = cljs.core.map.call(null,inst_37280,inst_37281);
var inst_37283 = cljs.core.pr_str.call(null,inst_37282);
var inst_37284 = figwheel.client.utils.log.call(null,inst_37283);
var state_37354__$1 = (function (){var statearr_37412 = state_37354;
(statearr_37412[(31)] = inst_37278);

return statearr_37412;
})();
var statearr_37413_37480 = state_37354__$1;
(statearr_37413_37480[(2)] = inst_37284);

(statearr_37413_37480[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37355 === (35))){
var state_37354__$1 = state_37354;
var statearr_37414_37481 = state_37354__$1;
(statearr_37414_37481[(2)] = true);

(statearr_37414_37481[(1)] = (37));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37355 === (19))){
var inst_37257 = (state_37354[(12)]);
var inst_37263 = figwheel.client.file_reloading.expand_files.call(null,inst_37257);
var state_37354__$1 = state_37354;
var statearr_37415_37482 = state_37354__$1;
(statearr_37415_37482[(2)] = inst_37263);

(statearr_37415_37482[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37355 === (11))){
var state_37354__$1 = state_37354;
var statearr_37416_37483 = state_37354__$1;
(statearr_37416_37483[(2)] = null);

(statearr_37416_37483[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37355 === (9))){
var inst_37246 = (state_37354[(2)]);
var state_37354__$1 = state_37354;
var statearr_37417_37484 = state_37354__$1;
(statearr_37417_37484[(2)] = inst_37246);

(statearr_37417_37484[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37355 === (5))){
var inst_37217 = (state_37354[(7)]);
var inst_37216 = (state_37354[(9)]);
var inst_37219 = (inst_37217 < inst_37216);
var inst_37220 = inst_37219;
var state_37354__$1 = state_37354;
if(cljs.core.truth_(inst_37220)){
var statearr_37418_37485 = state_37354__$1;
(statearr_37418_37485[(1)] = (7));

} else {
var statearr_37419_37486 = state_37354__$1;
(statearr_37419_37486[(1)] = (8));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37355 === (14))){
var inst_37227 = (state_37354[(22)]);
var inst_37236 = cljs.core.first.call(null,inst_37227);
var inst_37237 = figwheel.client.file_reloading.eval_body.call(null,inst_37236,opts);
var inst_37238 = cljs.core.next.call(null,inst_37227);
var inst_37214 = inst_37238;
var inst_37215 = null;
var inst_37216 = (0);
var inst_37217 = (0);
var state_37354__$1 = (function (){var statearr_37420 = state_37354;
(statearr_37420[(7)] = inst_37217);

(statearr_37420[(8)] = inst_37214);

(statearr_37420[(32)] = inst_37237);

(statearr_37420[(9)] = inst_37216);

(statearr_37420[(10)] = inst_37215);

return statearr_37420;
})();
var statearr_37421_37487 = state_37354__$1;
(statearr_37421_37487[(2)] = null);

(statearr_37421_37487[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37355 === (45))){
var state_37354__$1 = state_37354;
var statearr_37422_37488 = state_37354__$1;
(statearr_37422_37488[(2)] = null);

(statearr_37422_37488[(1)] = (46));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37355 === (26))){
var inst_37270 = (state_37354[(23)]);
var inst_37275 = (state_37354[(24)]);
var inst_37271 = (state_37354[(25)]);
var inst_37267 = (state_37354[(19)]);
var inst_37273 = (state_37354[(26)]);
var inst_37290 = figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: loaded these files");
var inst_37292 = (function (){var all_files = inst_37267;
var res_SINGLEQUOTE_ = inst_37270;
var res = inst_37271;
var files_not_loaded = inst_37273;
var dependencies_that_loaded = inst_37275;
return ((function (all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_37270,inst_37275,inst_37271,inst_37267,inst_37273,inst_37290,state_val_37355,c__33248__auto__,map__37199,map__37199__$1,opts,before_jsload,on_jsload,reload_dependents,map__37200,map__37200__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (p__37291){
var map__37423 = p__37291;
var map__37423__$1 = ((((!((map__37423 == null)))?((((map__37423.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__37423.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__37423):map__37423);
var namespace = cljs.core.get.call(null,map__37423__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));
var file = cljs.core.get.call(null,map__37423__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
if(cljs.core.truth_(namespace)){
return figwheel.client.file_reloading.name__GT_path.call(null,cljs.core.name.call(null,namespace));
} else {
return file;
}
});
;})(all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_37270,inst_37275,inst_37271,inst_37267,inst_37273,inst_37290,state_val_37355,c__33248__auto__,map__37199,map__37199__$1,opts,before_jsload,on_jsload,reload_dependents,map__37200,map__37200__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_37293 = cljs.core.map.call(null,inst_37292,inst_37271);
var inst_37294 = cljs.core.pr_str.call(null,inst_37293);
var inst_37295 = figwheel.client.utils.log.call(null,inst_37294);
var inst_37296 = (function (){var all_files = inst_37267;
var res_SINGLEQUOTE_ = inst_37270;
var res = inst_37271;
var files_not_loaded = inst_37273;
var dependencies_that_loaded = inst_37275;
return ((function (all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_37270,inst_37275,inst_37271,inst_37267,inst_37273,inst_37290,inst_37292,inst_37293,inst_37294,inst_37295,state_val_37355,c__33248__auto__,map__37199,map__37199__$1,opts,before_jsload,on_jsload,reload_dependents,map__37200,map__37200__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (){
figwheel.client.file_reloading.on_jsload_custom_event.call(null,res);

return cljs.core.apply.call(null,on_jsload,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [res], null));
});
;})(all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_37270,inst_37275,inst_37271,inst_37267,inst_37273,inst_37290,inst_37292,inst_37293,inst_37294,inst_37295,state_val_37355,c__33248__auto__,map__37199,map__37199__$1,opts,before_jsload,on_jsload,reload_dependents,map__37200,map__37200__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_37297 = setTimeout(inst_37296,(10));
var state_37354__$1 = (function (){var statearr_37425 = state_37354;
(statearr_37425[(33)] = inst_37290);

(statearr_37425[(34)] = inst_37295);

return statearr_37425;
})();
var statearr_37426_37489 = state_37354__$1;
(statearr_37426_37489[(2)] = inst_37297);

(statearr_37426_37489[(1)] = (28));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37355 === (16))){
var state_37354__$1 = state_37354;
var statearr_37427_37490 = state_37354__$1;
(statearr_37427_37490[(2)] = reload_dependents);

(statearr_37427_37490[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37355 === (38))){
var inst_37307 = (state_37354[(16)]);
var inst_37325 = cljs.core.apply.call(null,cljs.core.hash_map,inst_37307);
var state_37354__$1 = state_37354;
var statearr_37428_37491 = state_37354__$1;
(statearr_37428_37491[(2)] = inst_37325);

(statearr_37428_37491[(1)] = (40));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37355 === (30))){
var state_37354__$1 = state_37354;
var statearr_37429_37492 = state_37354__$1;
(statearr_37429_37492[(2)] = null);

(statearr_37429_37492[(1)] = (31));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37355 === (10))){
var inst_37227 = (state_37354[(22)]);
var inst_37229 = cljs.core.chunked_seq_QMARK_.call(null,inst_37227);
var state_37354__$1 = state_37354;
if(inst_37229){
var statearr_37430_37493 = state_37354__$1;
(statearr_37430_37493[(1)] = (13));

} else {
var statearr_37431_37494 = state_37354__$1;
(statearr_37431_37494[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37355 === (18))){
var inst_37261 = (state_37354[(2)]);
var state_37354__$1 = state_37354;
if(cljs.core.truth_(inst_37261)){
var statearr_37432_37495 = state_37354__$1;
(statearr_37432_37495[(1)] = (19));

} else {
var statearr_37433_37496 = state_37354__$1;
(statearr_37433_37496[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37355 === (42))){
var state_37354__$1 = state_37354;
var statearr_37434_37497 = state_37354__$1;
(statearr_37434_37497[(2)] = null);

(statearr_37434_37497[(1)] = (43));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37355 === (37))){
var inst_37320 = (state_37354[(2)]);
var state_37354__$1 = state_37354;
var statearr_37435_37498 = state_37354__$1;
(statearr_37435_37498[(2)] = inst_37320);

(statearr_37435_37498[(1)] = (34));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37355 === (8))){
var inst_37214 = (state_37354[(8)]);
var inst_37227 = (state_37354[(22)]);
var inst_37227__$1 = cljs.core.seq.call(null,inst_37214);
var state_37354__$1 = (function (){var statearr_37436 = state_37354;
(statearr_37436[(22)] = inst_37227__$1);

return statearr_37436;
})();
if(inst_37227__$1){
var statearr_37437_37499 = state_37354__$1;
(statearr_37437_37499[(1)] = (10));

} else {
var statearr_37438_37500 = state_37354__$1;
(statearr_37438_37500[(1)] = (11));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__33248__auto__,map__37199,map__37199__$1,opts,before_jsload,on_jsload,reload_dependents,map__37200,map__37200__$1,msg,files,figwheel_meta,recompile_dependents))
;
return ((function (switch__33158__auto__,c__33248__auto__,map__37199,map__37199__$1,opts,before_jsload,on_jsload,reload_dependents,map__37200,map__37200__$1,msg,files,figwheel_meta,recompile_dependents){
return (function() {
var figwheel$client$file_reloading$reload_js_files_$_state_machine__33159__auto__ = null;
var figwheel$client$file_reloading$reload_js_files_$_state_machine__33159__auto____0 = (function (){
var statearr_37439 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_37439[(0)] = figwheel$client$file_reloading$reload_js_files_$_state_machine__33159__auto__);

(statearr_37439[(1)] = (1));

return statearr_37439;
});
var figwheel$client$file_reloading$reload_js_files_$_state_machine__33159__auto____1 = (function (state_37354){
while(true){
var ret_value__33160__auto__ = (function (){try{while(true){
var result__33161__auto__ = switch__33158__auto__.call(null,state_37354);
if(cljs.core.keyword_identical_QMARK_.call(null,result__33161__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__33161__auto__;
}
break;
}
}catch (e37440){if((e37440 instanceof Object)){
var ex__33162__auto__ = e37440;
var statearr_37441_37501 = state_37354;
(statearr_37441_37501[(5)] = ex__33162__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_37354);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e37440;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__33160__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__37502 = state_37354;
state_37354 = G__37502;
continue;
} else {
return ret_value__33160__auto__;
}
break;
}
});
figwheel$client$file_reloading$reload_js_files_$_state_machine__33159__auto__ = function(state_37354){
switch(arguments.length){
case 0:
return figwheel$client$file_reloading$reload_js_files_$_state_machine__33159__auto____0.call(this);
case 1:
return figwheel$client$file_reloading$reload_js_files_$_state_machine__33159__auto____1.call(this,state_37354);
}
throw(new Error('Invalid arity: ' + (arguments.length - 1)));
};
figwheel$client$file_reloading$reload_js_files_$_state_machine__33159__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$file_reloading$reload_js_files_$_state_machine__33159__auto____0;
figwheel$client$file_reloading$reload_js_files_$_state_machine__33159__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$file_reloading$reload_js_files_$_state_machine__33159__auto____1;
return figwheel$client$file_reloading$reload_js_files_$_state_machine__33159__auto__;
})()
;})(switch__33158__auto__,c__33248__auto__,map__37199,map__37199__$1,opts,before_jsload,on_jsload,reload_dependents,map__37200,map__37200__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var state__33250__auto__ = (function (){var statearr_37442 = f__33249__auto__.call(null);
(statearr_37442[(6)] = c__33248__auto__);

return statearr_37442;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__33250__auto__);
});})(c__33248__auto__,map__37199,map__37199__$1,opts,before_jsload,on_jsload,reload_dependents,map__37200,map__37200__$1,msg,files,figwheel_meta,recompile_dependents))
);

return c__33248__auto__;
});
figwheel.client.file_reloading.current_links = (function figwheel$client$file_reloading$current_links(){
return Array.prototype.slice.call(document.getElementsByTagName("link"));
});
figwheel.client.file_reloading.truncate_url = (function figwheel$client$file_reloading$truncate_url(url){
return clojure.string.replace_first.call(null,clojure.string.replace_first.call(null,clojure.string.replace_first.call(null,clojure.string.replace_first.call(null,cljs.core.first.call(null,clojure.string.split.call(null,url,/\?/)),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(location.protocol),"//"].join(''),""),".*://",""),/^\/\//,""),/[^\\/]*/,"");
});
figwheel.client.file_reloading.matches_file_QMARK_ = (function figwheel$client$file_reloading$matches_file_QMARK_(p__37505,link){
var map__37506 = p__37505;
var map__37506__$1 = ((((!((map__37506 == null)))?((((map__37506.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__37506.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__37506):map__37506);
var file = cljs.core.get.call(null,map__37506__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
var temp__5457__auto__ = link.href;
if(cljs.core.truth_(temp__5457__auto__)){
var link_href = temp__5457__auto__;
var match = clojure.string.join.call(null,"/",cljs.core.take_while.call(null,cljs.core.identity,cljs.core.map.call(null,((function (link_href,temp__5457__auto__,map__37506,map__37506__$1,file){
return (function (p1__37503_SHARP_,p2__37504_SHARP_){
if(cljs.core._EQ_.call(null,p1__37503_SHARP_,p2__37504_SHARP_)){
return p1__37503_SHARP_;
} else {
return false;
}
});})(link_href,temp__5457__auto__,map__37506,map__37506__$1,file))
,cljs.core.reverse.call(null,clojure.string.split.call(null,file,"/")),cljs.core.reverse.call(null,clojure.string.split.call(null,figwheel.client.file_reloading.truncate_url.call(null,link_href),"/")))));
var match_length = cljs.core.count.call(null,match);
var file_name_length = cljs.core.count.call(null,cljs.core.last.call(null,clojure.string.split.call(null,file,"/")));
if((match_length >= file_name_length)){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"link","link",-1769163468),link,new cljs.core.Keyword(null,"link-href","link-href",-250644450),link_href,new cljs.core.Keyword(null,"match-length","match-length",1101537310),match_length,new cljs.core.Keyword(null,"current-url-length","current-url-length",380404083),cljs.core.count.call(null,figwheel.client.file_reloading.truncate_url.call(null,link_href))], null);
} else {
return null;
}
} else {
return null;
}
});
figwheel.client.file_reloading.get_correct_link = (function figwheel$client$file_reloading$get_correct_link(f_data){
var temp__5457__auto__ = cljs.core.first.call(null,cljs.core.sort_by.call(null,(function (p__37509){
var map__37510 = p__37509;
var map__37510__$1 = ((((!((map__37510 == null)))?((((map__37510.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__37510.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__37510):map__37510);
var match_length = cljs.core.get.call(null,map__37510__$1,new cljs.core.Keyword(null,"match-length","match-length",1101537310));
var current_url_length = cljs.core.get.call(null,map__37510__$1,new cljs.core.Keyword(null,"current-url-length","current-url-length",380404083));
return (current_url_length - match_length);
}),cljs.core.keep.call(null,(function (p1__37508_SHARP_){
return figwheel.client.file_reloading.matches_file_QMARK_.call(null,f_data,p1__37508_SHARP_);
}),figwheel.client.file_reloading.current_links.call(null))));
if(cljs.core.truth_(temp__5457__auto__)){
var res = temp__5457__auto__;
return new cljs.core.Keyword(null,"link","link",-1769163468).cljs$core$IFn$_invoke$arity$1(res);
} else {
return null;
}
});
figwheel.client.file_reloading.clone_link = (function figwheel$client$file_reloading$clone_link(link,url){
var clone = document.createElement("link");
clone.rel = "stylesheet";

clone.media = link.media;

clone.disabled = link.disabled;

clone.href = figwheel.client.file_reloading.add_cache_buster.call(null,url);

return clone;
});
figwheel.client.file_reloading.create_link = (function figwheel$client$file_reloading$create_link(url){
var link = document.createElement("link");
link.rel = "stylesheet";

link.href = figwheel.client.file_reloading.add_cache_buster.call(null,url);

return link;
});
figwheel.client.file_reloading.distinctify = (function figwheel$client$file_reloading$distinctify(key,seqq){
return cljs.core.vals.call(null,cljs.core.reduce.call(null,(function (p1__37512_SHARP_,p2__37513_SHARP_){
return cljs.core.assoc.call(null,p1__37512_SHARP_,cljs.core.get.call(null,p2__37513_SHARP_,key),p2__37513_SHARP_);
}),cljs.core.PersistentArrayMap.EMPTY,seqq));
});
figwheel.client.file_reloading.add_link_to_document = (function figwheel$client$file_reloading$add_link_to_document(orig_link,klone,finished_fn){
var parent = orig_link.parentNode;
if(cljs.core._EQ_.call(null,orig_link,parent.lastChild)){
parent.appendChild(klone);
} else {
parent.insertBefore(klone,orig_link.nextSibling);
}

return setTimeout(((function (parent){
return (function (){
parent.removeChild(orig_link);

return finished_fn.call(null);
});})(parent))
,(300));
});
if(typeof figwheel.client.file_reloading.reload_css_deferred_chain !== 'undefined'){
} else {
figwheel.client.file_reloading.reload_css_deferred_chain = cljs.core.atom.call(null,goog.async.Deferred.succeed());
}
figwheel.client.file_reloading.reload_css_file = (function figwheel$client$file_reloading$reload_css_file(f_data,fin){
var temp__5455__auto__ = figwheel.client.file_reloading.get_correct_link.call(null,f_data);
if(cljs.core.truth_(temp__5455__auto__)){
var link = temp__5455__auto__;
return figwheel.client.file_reloading.add_link_to_document.call(null,link,figwheel.client.file_reloading.clone_link.call(null,link,link.href),((function (link,temp__5455__auto__){
return (function (){
return fin.call(null,cljs.core.assoc.call(null,f_data,new cljs.core.Keyword(null,"loaded","loaded",-1246482293),true));
});})(link,temp__5455__auto__))
);
} else {
return fin.call(null,f_data);
}
});
figwheel.client.file_reloading.reload_css_files_STAR_ = (function figwheel$client$file_reloading$reload_css_files_STAR_(deferred,f_datas,on_cssload){
return figwheel.client.utils.liftContD.call(null,figwheel.client.utils.mapConcatD.call(null,deferred,figwheel.client.file_reloading.reload_css_file,f_datas),(function (f_datas_SINGLEQUOTE_,fin){
var loaded_f_datas_37514 = cljs.core.filter.call(null,new cljs.core.Keyword(null,"loaded","loaded",-1246482293),f_datas_SINGLEQUOTE_);
figwheel.client.file_reloading.on_cssload_custom_event.call(null,loaded_f_datas_37514);

if(cljs.core.fn_QMARK_.call(null,on_cssload)){
on_cssload.call(null,loaded_f_datas_37514);
} else {
}

return fin.call(null);
}));
});
figwheel.client.file_reloading.reload_css_files = (function figwheel$client$file_reloading$reload_css_files(p__37515,p__37516){
var map__37517 = p__37515;
var map__37517__$1 = ((((!((map__37517 == null)))?((((map__37517.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__37517.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__37517):map__37517);
var on_cssload = cljs.core.get.call(null,map__37517__$1,new cljs.core.Keyword(null,"on-cssload","on-cssload",1825432318));
var map__37518 = p__37516;
var map__37518__$1 = ((((!((map__37518 == null)))?((((map__37518.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__37518.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__37518):map__37518);
var files_msg = map__37518__$1;
var files = cljs.core.get.call(null,map__37518__$1,new cljs.core.Keyword(null,"files","files",-472457450));
if(cljs.core.truth_(figwheel.client.utils.html_env_QMARK_.call(null))){
var temp__5457__auto__ = cljs.core.not_empty.call(null,figwheel.client.file_reloading.distinctify.call(null,new cljs.core.Keyword(null,"file","file",-1269645878),files));
if(cljs.core.truth_(temp__5457__auto__)){
var f_datas = temp__5457__auto__;
return cljs.core.swap_BANG_.call(null,figwheel.client.file_reloading.reload_css_deferred_chain,figwheel.client.file_reloading.reload_css_files_STAR_,f_datas,on_cssload);
} else {
return null;
}
} else {
return null;
}
});

//# sourceMappingURL=file_reloading.js.map?rel=1540594458536
