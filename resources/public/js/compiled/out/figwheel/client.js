// Compiled by ClojureScript 1.9.946 {}
goog.provide('figwheel.client');
goog.require('cljs.core');
goog.require('goog.Uri');
goog.require('goog.userAgent.product');
goog.require('goog.object');
goog.require('cljs.reader');
goog.require('cljs.core.async');
goog.require('figwheel.client.socket');
goog.require('figwheel.client.utils');
goog.require('figwheel.client.heads_up');
goog.require('figwheel.client.file_reloading');
goog.require('clojure.string');
goog.require('cljs.repl');
figwheel.client._figwheel_version_ = "0.5.15";
figwheel.client.js_stringify = (((typeof JSON !== 'undefined') && (!((JSON.stringify == null))))?(function (x){
return ["#js ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(JSON.stringify(x,null," "))].join('');
}):(function (x){
try{return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(x)].join('');
}catch (e38617){if((e38617 instanceof Error)){
var e = e38617;
return "Error: Unable to stringify";
} else {
throw e38617;

}
}}));
figwheel.client.figwheel_repl_print = (function figwheel$client$figwheel_repl_print(var_args){
var G__38620 = arguments.length;
switch (G__38620) {
case 2:
return figwheel.client.figwheel_repl_print.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 1:
return figwheel.client.figwheel_repl_print.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

figwheel.client.figwheel_repl_print.cljs$core$IFn$_invoke$arity$2 = (function (stream,args){
figwheel.client.socket.send_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"figwheel-event","figwheel-event",519570592),"callback",new cljs.core.Keyword(null,"callback-name","callback-name",336964714),"figwheel-repl-print",new cljs.core.Keyword(null,"content","content",15833224),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"stream","stream",1534941648),stream,new cljs.core.Keyword(null,"args","args",1315556576),cljs.core.mapv.call(null,(function (p1__38618_SHARP_){
if(typeof p1__38618_SHARP_ === 'string'){
return p1__38618_SHARP_;
} else {
return figwheel.client.js_stringify.call(null,p1__38618_SHARP_);
}
}),args)], null)], null));

return null;
});

figwheel.client.figwheel_repl_print.cljs$core$IFn$_invoke$arity$1 = (function (args){
return figwheel.client.figwheel_repl_print.call(null,new cljs.core.Keyword(null,"out","out",-910545517),args);
});

figwheel.client.figwheel_repl_print.cljs$lang$maxFixedArity = 2;

figwheel.client.console_out_print = (function figwheel$client$console_out_print(args){
return console.log.apply(console,cljs.core.into_array.call(null,args));
});
figwheel.client.console_err_print = (function figwheel$client$console_err_print(args){
return console.error.apply(console,cljs.core.into_array.call(null,args));
});
figwheel.client.repl_out_print_fn = (function figwheel$client$repl_out_print_fn(var_args){
var args__31447__auto__ = [];
var len__31440__auto___38623 = arguments.length;
var i__31441__auto___38624 = (0);
while(true){
if((i__31441__auto___38624 < len__31440__auto___38623)){
args__31447__auto__.push((arguments[i__31441__auto___38624]));

var G__38625 = (i__31441__auto___38624 + (1));
i__31441__auto___38624 = G__38625;
continue;
} else {
}
break;
}

var argseq__31448__auto__ = ((((0) < args__31447__auto__.length))?(new cljs.core.IndexedSeq(args__31447__auto__.slice((0)),(0),null)):null);
return figwheel.client.repl_out_print_fn.cljs$core$IFn$_invoke$arity$variadic(argseq__31448__auto__);
});

figwheel.client.repl_out_print_fn.cljs$core$IFn$_invoke$arity$variadic = (function (args){
figwheel.client.console_out_print.call(null,args);

figwheel.client.figwheel_repl_print.call(null,new cljs.core.Keyword(null,"out","out",-910545517),args);

return null;
});

figwheel.client.repl_out_print_fn.cljs$lang$maxFixedArity = (0);

figwheel.client.repl_out_print_fn.cljs$lang$applyTo = (function (seq38622){
return figwheel.client.repl_out_print_fn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq38622));
});

figwheel.client.repl_err_print_fn = (function figwheel$client$repl_err_print_fn(var_args){
var args__31447__auto__ = [];
var len__31440__auto___38627 = arguments.length;
var i__31441__auto___38628 = (0);
while(true){
if((i__31441__auto___38628 < len__31440__auto___38627)){
args__31447__auto__.push((arguments[i__31441__auto___38628]));

var G__38629 = (i__31441__auto___38628 + (1));
i__31441__auto___38628 = G__38629;
continue;
} else {
}
break;
}

var argseq__31448__auto__ = ((((0) < args__31447__auto__.length))?(new cljs.core.IndexedSeq(args__31447__auto__.slice((0)),(0),null)):null);
return figwheel.client.repl_err_print_fn.cljs$core$IFn$_invoke$arity$variadic(argseq__31448__auto__);
});

figwheel.client.repl_err_print_fn.cljs$core$IFn$_invoke$arity$variadic = (function (args){
figwheel.client.console_err_print.call(null,args);

figwheel.client.figwheel_repl_print.call(null,new cljs.core.Keyword(null,"err","err",-2089457205),args);

return null;
});

figwheel.client.repl_err_print_fn.cljs$lang$maxFixedArity = (0);

figwheel.client.repl_err_print_fn.cljs$lang$applyTo = (function (seq38626){
return figwheel.client.repl_err_print_fn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq38626));
});

figwheel.client.enable_repl_print_BANG_ = (function figwheel$client$enable_repl_print_BANG_(){
cljs.core._STAR_print_newline_STAR_ = false;

cljs.core.set_print_fn_BANG_.call(null,figwheel.client.repl_out_print_fn);

cljs.core.set_print_err_fn_BANG_.call(null,figwheel.client.repl_err_print_fn);

return null;
});
figwheel.client.autoload_QMARK_ = (function figwheel$client$autoload_QMARK_(){
return figwheel.client.utils.persistent_config_get.call(null,new cljs.core.Keyword(null,"figwheel-autoload","figwheel-autoload",-2044741728),true);
});
figwheel.client.toggle_autoload = (function figwheel$client$toggle_autoload(){
var res = figwheel.client.utils.persistent_config_set_BANG_.call(null,new cljs.core.Keyword(null,"figwheel-autoload","figwheel-autoload",-2044741728),cljs.core.not.call(null,figwheel.client.autoload_QMARK_.call(null)));
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"info","info",-317069002),["Toggle autoload deprecated! Use (figwheel.client/set-autoload! false)"].join(''));

figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"info","info",-317069002),["Figwheel autoloading ",cljs.core.str.cljs$core$IFn$_invoke$arity$1((cljs.core.truth_(figwheel.client.autoload_QMARK_.call(null))?"ON":"OFF"))].join(''));

return res;
});
goog.exportSymbol('figwheel.client.toggle_autoload', figwheel.client.toggle_autoload);
/**
 * Figwheel by default loads code changes as you work. Sometimes you
 *   just want to work on your code without the ramifications of
 *   autoloading and simply load your code piecemeal in the REPL. You can
 *   turn autoloading on and of with this method.
 * 
 *   (figwheel.client/set-autoload false)
 * 
 *   NOTE: This is a persistent setting, meaning that it will persist
 *   through browser reloads.
 */
figwheel.client.set_autoload = (function figwheel$client$set_autoload(b){
if((b === true) || (b === false)){
} else {
throw (new Error("Assert failed: (or (true? b) (false? b))"));
}

return figwheel.client.utils.persistent_config_set_BANG_.call(null,new cljs.core.Keyword(null,"figwheel-autoload","figwheel-autoload",-2044741728),b);
});
goog.exportSymbol('figwheel.client.set_autoload', figwheel.client.set_autoload);
figwheel.client.repl_pprint = (function figwheel$client$repl_pprint(){
return figwheel.client.utils.persistent_config_get.call(null,new cljs.core.Keyword(null,"figwheel-repl-pprint","figwheel-repl-pprint",1076150873),true);
});
goog.exportSymbol('figwheel.client.repl_pprint', figwheel.client.repl_pprint);
/**
 * This method gives you the ability to turn the pretty printing of
 *   the REPL's return value on and off.
 * 
 *   (figwheel.client/set-repl-pprint false)
 * 
 *   NOTE: This is a persistent setting, meaning that it will persist
 *   through browser reloads.
 */
figwheel.client.set_repl_pprint = (function figwheel$client$set_repl_pprint(b){
if((b === true) || (b === false)){
} else {
throw (new Error("Assert failed: (or (true? b) (false? b))"));
}

return figwheel.client.utils.persistent_config_set_BANG_.call(null,new cljs.core.Keyword(null,"figwheel-repl-pprint","figwheel-repl-pprint",1076150873),b);
});
goog.exportSymbol('figwheel.client.set_repl_pprint', figwheel.client.set_repl_pprint);
figwheel.client.repl_result_pr_str = (function figwheel$client$repl_result_pr_str(v){
if(cljs.core.truth_(figwheel.client.repl_pprint.call(null))){
return figwheel.client.utils.pprint_to_string.call(null,v);
} else {
return cljs.core.pr_str.call(null,v);
}
});
goog.exportSymbol('figwheel.client.repl_result_pr_str', figwheel.client.repl_result_pr_str);
figwheel.client.get_essential_messages = (function figwheel$client$get_essential_messages(ed){
if(cljs.core.truth_(ed)){
return cljs.core.cons.call(null,cljs.core.select_keys.call(null,ed,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"message","message",-406056002),new cljs.core.Keyword(null,"class","class",-2030961996)], null)),figwheel.client.get_essential_messages.call(null,new cljs.core.Keyword(null,"cause","cause",231901252).cljs$core$IFn$_invoke$arity$1(ed)));
} else {
return null;
}
});
figwheel.client.error_msg_format = (function figwheel$client$error_msg_format(p__38630){
var map__38631 = p__38630;
var map__38631__$1 = ((((!((map__38631 == null)))?((((map__38631.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__38631.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__38631):map__38631);
var message = cljs.core.get.call(null,map__38631__$1,new cljs.core.Keyword(null,"message","message",-406056002));
var class$ = cljs.core.get.call(null,map__38631__$1,new cljs.core.Keyword(null,"class","class",-2030961996));
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(class$)," : ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(message)].join('');
});
figwheel.client.format_messages = cljs.core.comp.call(null,cljs.core.partial.call(null,cljs.core.map,figwheel.client.error_msg_format),figwheel.client.get_essential_messages);
figwheel.client.focus_msgs = (function figwheel$client$focus_msgs(name_set,msg_hist){
return cljs.core.cons.call(null,cljs.core.first.call(null,msg_hist),cljs.core.filter.call(null,cljs.core.comp.call(null,name_set,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863)),cljs.core.rest.call(null,msg_hist)));
});
figwheel.client.reload_file_QMARK__STAR_ = (function figwheel$client$reload_file_QMARK__STAR_(msg_name,opts){
var or__30160__auto__ = new cljs.core.Keyword(null,"load-warninged-code","load-warninged-code",-2030345223).cljs$core$IFn$_invoke$arity$1(opts);
if(cljs.core.truth_(or__30160__auto__)){
return or__30160__auto__;
} else {
return cljs.core.not_EQ_.call(null,msg_name,new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356));
}
});
figwheel.client.reload_file_state_QMARK_ = (function figwheel$client$reload_file_state_QMARK_(msg_names,opts){
var and__30148__auto__ = cljs.core._EQ_.call(null,cljs.core.first.call(null,msg_names),new cljs.core.Keyword(null,"files-changed","files-changed",-1418200563));
if(and__30148__auto__){
return figwheel.client.reload_file_QMARK__STAR_.call(null,cljs.core.second.call(null,msg_names),opts);
} else {
return and__30148__auto__;
}
});
figwheel.client.block_reload_file_state_QMARK_ = (function figwheel$client$block_reload_file_state_QMARK_(msg_names,opts){
return (cljs.core._EQ_.call(null,cljs.core.first.call(null,msg_names),new cljs.core.Keyword(null,"files-changed","files-changed",-1418200563))) && (cljs.core.not.call(null,figwheel.client.reload_file_QMARK__STAR_.call(null,cljs.core.second.call(null,msg_names),opts)));
});
figwheel.client.warning_append_state_QMARK_ = (function figwheel$client$warning_append_state_QMARK_(msg_names){
return cljs.core._EQ_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356)], null),cljs.core.take.call(null,(2),msg_names));
});
figwheel.client.warning_state_QMARK_ = (function figwheel$client$warning_state_QMARK_(msg_names){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),cljs.core.first.call(null,msg_names));
});
figwheel.client.rewarning_state_QMARK_ = (function figwheel$client$rewarning_state_QMARK_(msg_names){
return cljs.core._EQ_.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),new cljs.core.Keyword(null,"files-changed","files-changed",-1418200563),new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356)], null),cljs.core.take.call(null,(3),msg_names));
});
figwheel.client.compile_fail_state_QMARK_ = (function figwheel$client$compile_fail_state_QMARK_(msg_names){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"compile-failed","compile-failed",-477639289),cljs.core.first.call(null,msg_names));
});
figwheel.client.compile_refail_state_QMARK_ = (function figwheel$client$compile_refail_state_QMARK_(msg_names){
return cljs.core._EQ_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"compile-failed","compile-failed",-477639289),new cljs.core.Keyword(null,"compile-failed","compile-failed",-477639289)], null),cljs.core.take.call(null,(2),msg_names));
});
figwheel.client.css_loaded_state_QMARK_ = (function figwheel$client$css_loaded_state_QMARK_(msg_names){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"css-files-changed","css-files-changed",720773874),cljs.core.first.call(null,msg_names));
});
figwheel.client.file_reloader_plugin = (function figwheel$client$file_reloader_plugin(opts){
var ch = cljs.core.async.chan.call(null);
var c__33248__auto___38710 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__33248__auto___38710,ch){
return (function (){
var f__33249__auto__ = (function (){var switch__33158__auto__ = ((function (c__33248__auto___38710,ch){
return (function (state_38682){
var state_val_38683 = (state_38682[(1)]);
if((state_val_38683 === (7))){
var inst_38678 = (state_38682[(2)]);
var state_38682__$1 = state_38682;
var statearr_38684_38711 = state_38682__$1;
(statearr_38684_38711[(2)] = inst_38678);

(statearr_38684_38711[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38683 === (1))){
var state_38682__$1 = state_38682;
var statearr_38685_38712 = state_38682__$1;
(statearr_38685_38712[(2)] = null);

(statearr_38685_38712[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38683 === (4))){
var inst_38635 = (state_38682[(7)]);
var inst_38635__$1 = (state_38682[(2)]);
var state_38682__$1 = (function (){var statearr_38686 = state_38682;
(statearr_38686[(7)] = inst_38635__$1);

return statearr_38686;
})();
if(cljs.core.truth_(inst_38635__$1)){
var statearr_38687_38713 = state_38682__$1;
(statearr_38687_38713[(1)] = (5));

} else {
var statearr_38688_38714 = state_38682__$1;
(statearr_38688_38714[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38683 === (15))){
var inst_38642 = (state_38682[(8)]);
var inst_38657 = new cljs.core.Keyword(null,"files","files",-472457450).cljs$core$IFn$_invoke$arity$1(inst_38642);
var inst_38658 = cljs.core.first.call(null,inst_38657);
var inst_38659 = new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(inst_38658);
var inst_38660 = ["Figwheel: Not loading code with warnings - ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(inst_38659)].join('');
var inst_38661 = figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"warn","warn",-436710552),inst_38660);
var state_38682__$1 = state_38682;
var statearr_38689_38715 = state_38682__$1;
(statearr_38689_38715[(2)] = inst_38661);

(statearr_38689_38715[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38683 === (13))){
var inst_38666 = (state_38682[(2)]);
var state_38682__$1 = state_38682;
var statearr_38690_38716 = state_38682__$1;
(statearr_38690_38716[(2)] = inst_38666);

(statearr_38690_38716[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38683 === (6))){
var state_38682__$1 = state_38682;
var statearr_38691_38717 = state_38682__$1;
(statearr_38691_38717[(2)] = null);

(statearr_38691_38717[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38683 === (17))){
var inst_38664 = (state_38682[(2)]);
var state_38682__$1 = state_38682;
var statearr_38692_38718 = state_38682__$1;
(statearr_38692_38718[(2)] = inst_38664);

(statearr_38692_38718[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38683 === (3))){
var inst_38680 = (state_38682[(2)]);
var state_38682__$1 = state_38682;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_38682__$1,inst_38680);
} else {
if((state_val_38683 === (12))){
var inst_38641 = (state_38682[(9)]);
var inst_38655 = figwheel.client.block_reload_file_state_QMARK_.call(null,inst_38641,opts);
var state_38682__$1 = state_38682;
if(cljs.core.truth_(inst_38655)){
var statearr_38693_38719 = state_38682__$1;
(statearr_38693_38719[(1)] = (15));

} else {
var statearr_38694_38720 = state_38682__$1;
(statearr_38694_38720[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38683 === (2))){
var state_38682__$1 = state_38682;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_38682__$1,(4),ch);
} else {
if((state_val_38683 === (11))){
var inst_38642 = (state_38682[(8)]);
var inst_38647 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_38648 = figwheel.client.file_reloading.reload_js_files.call(null,opts,inst_38642);
var inst_38649 = cljs.core.async.timeout.call(null,(1000));
var inst_38650 = [inst_38648,inst_38649];
var inst_38651 = (new cljs.core.PersistentVector(null,2,(5),inst_38647,inst_38650,null));
var state_38682__$1 = state_38682;
return cljs.core.async.ioc_alts_BANG_.call(null,state_38682__$1,(14),inst_38651);
} else {
if((state_val_38683 === (9))){
var inst_38642 = (state_38682[(8)]);
var inst_38668 = figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"warn","warn",-436710552),"Figwheel: code autoloading is OFF");
var inst_38669 = new cljs.core.Keyword(null,"files","files",-472457450).cljs$core$IFn$_invoke$arity$1(inst_38642);
var inst_38670 = cljs.core.map.call(null,new cljs.core.Keyword(null,"file","file",-1269645878),inst_38669);
var inst_38671 = ["Not loading: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(inst_38670)].join('');
var inst_38672 = figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"info","info",-317069002),inst_38671);
var state_38682__$1 = (function (){var statearr_38695 = state_38682;
(statearr_38695[(10)] = inst_38668);

return statearr_38695;
})();
var statearr_38696_38721 = state_38682__$1;
(statearr_38696_38721[(2)] = inst_38672);

(statearr_38696_38721[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38683 === (5))){
var inst_38635 = (state_38682[(7)]);
var inst_38637 = [new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),null,new cljs.core.Keyword(null,"files-changed","files-changed",-1418200563),null];
var inst_38638 = (new cljs.core.PersistentArrayMap(null,2,inst_38637,null));
var inst_38639 = (new cljs.core.PersistentHashSet(null,inst_38638,null));
var inst_38640 = figwheel.client.focus_msgs.call(null,inst_38639,inst_38635);
var inst_38641 = cljs.core.map.call(null,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863),inst_38640);
var inst_38642 = cljs.core.first.call(null,inst_38640);
var inst_38643 = figwheel.client.autoload_QMARK_.call(null);
var state_38682__$1 = (function (){var statearr_38697 = state_38682;
(statearr_38697[(8)] = inst_38642);

(statearr_38697[(9)] = inst_38641);

return statearr_38697;
})();
if(cljs.core.truth_(inst_38643)){
var statearr_38698_38722 = state_38682__$1;
(statearr_38698_38722[(1)] = (8));

} else {
var statearr_38699_38723 = state_38682__$1;
(statearr_38699_38723[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38683 === (14))){
var inst_38653 = (state_38682[(2)]);
var state_38682__$1 = state_38682;
var statearr_38700_38724 = state_38682__$1;
(statearr_38700_38724[(2)] = inst_38653);

(statearr_38700_38724[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38683 === (16))){
var state_38682__$1 = state_38682;
var statearr_38701_38725 = state_38682__$1;
(statearr_38701_38725[(2)] = null);

(statearr_38701_38725[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38683 === (10))){
var inst_38674 = (state_38682[(2)]);
var state_38682__$1 = (function (){var statearr_38702 = state_38682;
(statearr_38702[(11)] = inst_38674);

return statearr_38702;
})();
var statearr_38703_38726 = state_38682__$1;
(statearr_38703_38726[(2)] = null);

(statearr_38703_38726[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38683 === (8))){
var inst_38641 = (state_38682[(9)]);
var inst_38645 = figwheel.client.reload_file_state_QMARK_.call(null,inst_38641,opts);
var state_38682__$1 = state_38682;
if(cljs.core.truth_(inst_38645)){
var statearr_38704_38727 = state_38682__$1;
(statearr_38704_38727[(1)] = (11));

} else {
var statearr_38705_38728 = state_38682__$1;
(statearr_38705_38728[(1)] = (12));

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
});})(c__33248__auto___38710,ch))
;
return ((function (switch__33158__auto__,c__33248__auto___38710,ch){
return (function() {
var figwheel$client$file_reloader_plugin_$_state_machine__33159__auto__ = null;
var figwheel$client$file_reloader_plugin_$_state_machine__33159__auto____0 = (function (){
var statearr_38706 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_38706[(0)] = figwheel$client$file_reloader_plugin_$_state_machine__33159__auto__);

(statearr_38706[(1)] = (1));

return statearr_38706;
});
var figwheel$client$file_reloader_plugin_$_state_machine__33159__auto____1 = (function (state_38682){
while(true){
var ret_value__33160__auto__ = (function (){try{while(true){
var result__33161__auto__ = switch__33158__auto__.call(null,state_38682);
if(cljs.core.keyword_identical_QMARK_.call(null,result__33161__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__33161__auto__;
}
break;
}
}catch (e38707){if((e38707 instanceof Object)){
var ex__33162__auto__ = e38707;
var statearr_38708_38729 = state_38682;
(statearr_38708_38729[(5)] = ex__33162__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_38682);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e38707;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__33160__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__38730 = state_38682;
state_38682 = G__38730;
continue;
} else {
return ret_value__33160__auto__;
}
break;
}
});
figwheel$client$file_reloader_plugin_$_state_machine__33159__auto__ = function(state_38682){
switch(arguments.length){
case 0:
return figwheel$client$file_reloader_plugin_$_state_machine__33159__auto____0.call(this);
case 1:
return figwheel$client$file_reloader_plugin_$_state_machine__33159__auto____1.call(this,state_38682);
}
throw(new Error('Invalid arity: ' + (arguments.length - 1)));
};
figwheel$client$file_reloader_plugin_$_state_machine__33159__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$file_reloader_plugin_$_state_machine__33159__auto____0;
figwheel$client$file_reloader_plugin_$_state_machine__33159__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$file_reloader_plugin_$_state_machine__33159__auto____1;
return figwheel$client$file_reloader_plugin_$_state_machine__33159__auto__;
})()
;})(switch__33158__auto__,c__33248__auto___38710,ch))
})();
var state__33250__auto__ = (function (){var statearr_38709 = f__33249__auto__.call(null);
(statearr_38709[(6)] = c__33248__auto___38710);

return statearr_38709;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__33250__auto__);
});})(c__33248__auto___38710,ch))
);


return ((function (ch){
return (function (msg_hist){
cljs.core.async.put_BANG_.call(null,ch,msg_hist);

return msg_hist;
});
;})(ch))
});
figwheel.client.truncate_stack_trace = (function figwheel$client$truncate_stack_trace(stack_str){
return cljs.core.take_while.call(null,(function (p1__38731_SHARP_){
return cljs.core.not.call(null,cljs.core.re_matches.call(null,/.*eval_javascript_STAR__STAR_.*/,p1__38731_SHARP_));
}),clojure.string.split_lines.call(null,stack_str));
});
figwheel.client.get_ua_product = (function figwheel$client$get_ua_product(){
if(cljs.core.truth_(figwheel.client.utils.node_env_QMARK_.call(null))){
return new cljs.core.Keyword(null,"chrome","chrome",1718738387);
} else {
if(cljs.core.truth_(goog.userAgent.product.SAFARI)){
return new cljs.core.Keyword(null,"safari","safari",497115653);
} else {
if(cljs.core.truth_(goog.userAgent.product.CHROME)){
return new cljs.core.Keyword(null,"chrome","chrome",1718738387);
} else {
if(cljs.core.truth_(goog.userAgent.product.FIREFOX)){
return new cljs.core.Keyword(null,"firefox","firefox",1283768880);
} else {
if(cljs.core.truth_(goog.userAgent.product.IE)){
return new cljs.core.Keyword(null,"ie","ie",2038473780);
} else {
return null;
}
}
}
}
}
});
var base_path_38735 = figwheel.client.utils.base_url_path.call(null);
figwheel.client.eval_javascript_STAR__STAR_ = ((function (base_path_38735){
return (function figwheel$client$eval_javascript_STAR__STAR_(code,opts,result_handler){
try{var sb = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR_38733 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR_38734 = cljs.core._STAR_print_fn_STAR_;
cljs.core._STAR_print_newline_STAR_ = false;

cljs.core._STAR_print_fn_STAR_ = ((function (_STAR_print_newline_STAR_38733,_STAR_print_fn_STAR_38734,sb,base_path_38735){
return (function (x){
return sb.append(x);
});})(_STAR_print_newline_STAR_38733,_STAR_print_fn_STAR_38734,sb,base_path_38735))
;

try{var result_value = figwheel.client.utils.eval_helper.call(null,code,opts);
return result_handler.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"status","status",-1997798413),new cljs.core.Keyword(null,"success","success",1890645906),new cljs.core.Keyword(null,"out","out",-910545517),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb)].join(''),new cljs.core.Keyword(null,"ua-product","ua-product",938384227),figwheel.client.get_ua_product.call(null),new cljs.core.Keyword(null,"value","value",305978217),result_value], null));
}finally {cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR_38734;

cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR_38733;
}}catch (e38732){if((e38732 instanceof Error)){
var e = e38732;
return result_handler.call(null,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"status","status",-1997798413),new cljs.core.Keyword(null,"exception","exception",-335277064),new cljs.core.Keyword(null,"value","value",305978217),cljs.core.pr_str.call(null,e),new cljs.core.Keyword(null,"ua-product","ua-product",938384227),figwheel.client.get_ua_product.call(null),new cljs.core.Keyword(null,"stacktrace","stacktrace",-95588394),clojure.string.join.call(null,"\n",figwheel.client.truncate_stack_trace.call(null,e.stack)),new cljs.core.Keyword(null,"base-path","base-path",495760020),base_path_38735], null));
} else {
var e = e38732;
return result_handler.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"status","status",-1997798413),new cljs.core.Keyword(null,"exception","exception",-335277064),new cljs.core.Keyword(null,"ua-product","ua-product",938384227),figwheel.client.get_ua_product.call(null),new cljs.core.Keyword(null,"value","value",305978217),cljs.core.pr_str.call(null,e),new cljs.core.Keyword(null,"stacktrace","stacktrace",-95588394),"No stacktrace available."], null));

}
}});})(base_path_38735))
;
/**
 * The REPL can disconnect and reconnect lets ensure cljs.user exists at least.
 */
figwheel.client.ensure_cljs_user = (function figwheel$client$ensure_cljs_user(){
if(cljs.core.truth_(cljs.user)){
return null;
} else {
return cljs.user = ({});
}
});
figwheel.client.repl_plugin = (function figwheel$client$repl_plugin(p__38736){
var map__38737 = p__38736;
var map__38737__$1 = ((((!((map__38737 == null)))?((((map__38737.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__38737.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__38737):map__38737);
var opts = map__38737__$1;
var build_id = cljs.core.get.call(null,map__38737__$1,new cljs.core.Keyword(null,"build-id","build-id",1642831089));
return ((function (map__38737,map__38737__$1,opts,build_id){
return (function (p__38739){
var vec__38740 = p__38739;
var seq__38741 = cljs.core.seq.call(null,vec__38740);
var first__38742 = cljs.core.first.call(null,seq__38741);
var seq__38741__$1 = cljs.core.next.call(null,seq__38741);
var map__38743 = first__38742;
var map__38743__$1 = ((((!((map__38743 == null)))?((((map__38743.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__38743.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__38743):map__38743);
var msg = map__38743__$1;
var msg_name = cljs.core.get.call(null,map__38743__$1,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863));
var _ = seq__38741__$1;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"repl-eval","repl-eval",-1784727398),msg_name)){
figwheel.client.ensure_cljs_user.call(null);

return figwheel.client.eval_javascript_STAR__STAR_.call(null,new cljs.core.Keyword(null,"code","code",1586293142).cljs$core$IFn$_invoke$arity$1(msg),opts,((function (vec__38740,seq__38741,first__38742,seq__38741__$1,map__38743,map__38743__$1,msg,msg_name,_,map__38737,map__38737__$1,opts,build_id){
return (function (res){
return figwheel.client.socket.send_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"figwheel-event","figwheel-event",519570592),"callback",new cljs.core.Keyword(null,"callback-name","callback-name",336964714),new cljs.core.Keyword(null,"callback-name","callback-name",336964714).cljs$core$IFn$_invoke$arity$1(msg),new cljs.core.Keyword(null,"content","content",15833224),res], null));
});})(vec__38740,seq__38741,first__38742,seq__38741__$1,map__38743,map__38743__$1,msg,msg_name,_,map__38737,map__38737__$1,opts,build_id))
);
} else {
return null;
}
});
;})(map__38737,map__38737__$1,opts,build_id))
});
figwheel.client.css_reloader_plugin = (function figwheel$client$css_reloader_plugin(opts){
return (function (p__38745){
var vec__38746 = p__38745;
var seq__38747 = cljs.core.seq.call(null,vec__38746);
var first__38748 = cljs.core.first.call(null,seq__38747);
var seq__38747__$1 = cljs.core.next.call(null,seq__38747);
var map__38749 = first__38748;
var map__38749__$1 = ((((!((map__38749 == null)))?((((map__38749.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__38749.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__38749):map__38749);
var msg = map__38749__$1;
var msg_name = cljs.core.get.call(null,map__38749__$1,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863));
var _ = seq__38747__$1;
if(cljs.core._EQ_.call(null,msg_name,new cljs.core.Keyword(null,"css-files-changed","css-files-changed",720773874))){
return figwheel.client.file_reloading.reload_css_files.call(null,opts,msg);
} else {
return null;
}
});
});
figwheel.client.compile_fail_warning_plugin = (function figwheel$client$compile_fail_warning_plugin(p__38751){
var map__38752 = p__38751;
var map__38752__$1 = ((((!((map__38752 == null)))?((((map__38752.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__38752.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__38752):map__38752);
var on_compile_warning = cljs.core.get.call(null,map__38752__$1,new cljs.core.Keyword(null,"on-compile-warning","on-compile-warning",-1195585947));
var on_compile_fail = cljs.core.get.call(null,map__38752__$1,new cljs.core.Keyword(null,"on-compile-fail","on-compile-fail",728013036));
return ((function (map__38752,map__38752__$1,on_compile_warning,on_compile_fail){
return (function (p__38754){
var vec__38755 = p__38754;
var seq__38756 = cljs.core.seq.call(null,vec__38755);
var first__38757 = cljs.core.first.call(null,seq__38756);
var seq__38756__$1 = cljs.core.next.call(null,seq__38756);
var map__38758 = first__38757;
var map__38758__$1 = ((((!((map__38758 == null)))?((((map__38758.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__38758.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__38758):map__38758);
var msg = map__38758__$1;
var msg_name = cljs.core.get.call(null,map__38758__$1,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863));
var _ = seq__38756__$1;
var pred__38760 = cljs.core._EQ_;
var expr__38761 = msg_name;
if(cljs.core.truth_(pred__38760.call(null,new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),expr__38761))){
return on_compile_warning.call(null,msg);
} else {
if(cljs.core.truth_(pred__38760.call(null,new cljs.core.Keyword(null,"compile-failed","compile-failed",-477639289),expr__38761))){
return on_compile_fail.call(null,msg);
} else {
return null;
}
}
});
;})(map__38752,map__38752__$1,on_compile_warning,on_compile_fail))
});
figwheel.client.auto_jump_to_error = (function figwheel$client$auto_jump_to_error(opts,error){
if(cljs.core.truth_(new cljs.core.Keyword(null,"auto-jump-to-source-on-error","auto-jump-to-source-on-error",-960314920).cljs$core$IFn$_invoke$arity$1(opts))){
return figwheel.client.heads_up.auto_notify_source_file_line.call(null,error);
} else {
return null;
}
});
figwheel.client.heads_up_plugin_msg_handler = (function figwheel$client$heads_up_plugin_msg_handler(opts,msg_hist_SINGLEQUOTE_){
var msg_hist = figwheel.client.focus_msgs.call(null,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"compile-failed","compile-failed",-477639289),null,new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),null,new cljs.core.Keyword(null,"files-changed","files-changed",-1418200563),null], null), null),msg_hist_SINGLEQUOTE_);
var msg_names = cljs.core.map.call(null,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863),msg_hist);
var msg = cljs.core.first.call(null,msg_hist);
var c__33248__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__33248__auto__,msg_hist,msg_names,msg){
return (function (){
var f__33249__auto__ = (function (){var switch__33158__auto__ = ((function (c__33248__auto__,msg_hist,msg_names,msg){
return (function (state_38850){
var state_val_38851 = (state_38850[(1)]);
if((state_val_38851 === (7))){
var inst_38770 = (state_38850[(2)]);
var state_38850__$1 = state_38850;
if(cljs.core.truth_(inst_38770)){
var statearr_38852_38899 = state_38850__$1;
(statearr_38852_38899[(1)] = (8));

} else {
var statearr_38853_38900 = state_38850__$1;
(statearr_38853_38900[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38851 === (20))){
var inst_38844 = (state_38850[(2)]);
var state_38850__$1 = state_38850;
var statearr_38854_38901 = state_38850__$1;
(statearr_38854_38901[(2)] = inst_38844);

(statearr_38854_38901[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38851 === (27))){
var inst_38840 = (state_38850[(2)]);
var state_38850__$1 = state_38850;
var statearr_38855_38902 = state_38850__$1;
(statearr_38855_38902[(2)] = inst_38840);

(statearr_38855_38902[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38851 === (1))){
var inst_38763 = figwheel.client.reload_file_state_QMARK_.call(null,msg_names,opts);
var state_38850__$1 = state_38850;
if(cljs.core.truth_(inst_38763)){
var statearr_38856_38903 = state_38850__$1;
(statearr_38856_38903[(1)] = (2));

} else {
var statearr_38857_38904 = state_38850__$1;
(statearr_38857_38904[(1)] = (3));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38851 === (24))){
var inst_38842 = (state_38850[(2)]);
var state_38850__$1 = state_38850;
var statearr_38858_38905 = state_38850__$1;
(statearr_38858_38905[(2)] = inst_38842);

(statearr_38858_38905[(1)] = (20));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38851 === (4))){
var inst_38848 = (state_38850[(2)]);
var state_38850__$1 = state_38850;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_38850__$1,inst_38848);
} else {
if((state_val_38851 === (15))){
var inst_38846 = (state_38850[(2)]);
var state_38850__$1 = state_38850;
var statearr_38859_38906 = state_38850__$1;
(statearr_38859_38906[(2)] = inst_38846);

(statearr_38859_38906[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38851 === (21))){
var inst_38799 = (state_38850[(2)]);
var inst_38800 = new cljs.core.Keyword(null,"exception-data","exception-data",-512474886).cljs$core$IFn$_invoke$arity$1(msg);
var inst_38801 = figwheel.client.auto_jump_to_error.call(null,opts,inst_38800);
var state_38850__$1 = (function (){var statearr_38860 = state_38850;
(statearr_38860[(7)] = inst_38799);

return statearr_38860;
})();
var statearr_38861_38907 = state_38850__$1;
(statearr_38861_38907[(2)] = inst_38801);

(statearr_38861_38907[(1)] = (20));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38851 === (31))){
var inst_38829 = figwheel.client.css_loaded_state_QMARK_.call(null,msg_names);
var state_38850__$1 = state_38850;
if(cljs.core.truth_(inst_38829)){
var statearr_38862_38908 = state_38850__$1;
(statearr_38862_38908[(1)] = (34));

} else {
var statearr_38863_38909 = state_38850__$1;
(statearr_38863_38909[(1)] = (35));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38851 === (32))){
var inst_38838 = (state_38850[(2)]);
var state_38850__$1 = state_38850;
var statearr_38864_38910 = state_38850__$1;
(statearr_38864_38910[(2)] = inst_38838);

(statearr_38864_38910[(1)] = (27));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38851 === (33))){
var inst_38825 = (state_38850[(2)]);
var inst_38826 = new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(msg);
var inst_38827 = figwheel.client.auto_jump_to_error.call(null,opts,inst_38826);
var state_38850__$1 = (function (){var statearr_38865 = state_38850;
(statearr_38865[(8)] = inst_38825);

return statearr_38865;
})();
var statearr_38866_38911 = state_38850__$1;
(statearr_38866_38911[(2)] = inst_38827);

(statearr_38866_38911[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38851 === (13))){
var inst_38784 = figwheel.client.heads_up.clear.call(null);
var state_38850__$1 = state_38850;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_38850__$1,(16),inst_38784);
} else {
if((state_val_38851 === (22))){
var inst_38805 = new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(msg);
var inst_38806 = figwheel.client.heads_up.append_warning_message.call(null,inst_38805);
var state_38850__$1 = state_38850;
var statearr_38867_38912 = state_38850__$1;
(statearr_38867_38912[(2)] = inst_38806);

(statearr_38867_38912[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38851 === (36))){
var inst_38836 = (state_38850[(2)]);
var state_38850__$1 = state_38850;
var statearr_38868_38913 = state_38850__$1;
(statearr_38868_38913[(2)] = inst_38836);

(statearr_38868_38913[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38851 === (29))){
var inst_38816 = (state_38850[(2)]);
var inst_38817 = new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(msg);
var inst_38818 = figwheel.client.auto_jump_to_error.call(null,opts,inst_38817);
var state_38850__$1 = (function (){var statearr_38869 = state_38850;
(statearr_38869[(9)] = inst_38816);

return statearr_38869;
})();
var statearr_38870_38914 = state_38850__$1;
(statearr_38870_38914[(2)] = inst_38818);

(statearr_38870_38914[(1)] = (27));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38851 === (6))){
var inst_38765 = (state_38850[(10)]);
var state_38850__$1 = state_38850;
var statearr_38871_38915 = state_38850__$1;
(statearr_38871_38915[(2)] = inst_38765);

(statearr_38871_38915[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38851 === (28))){
var inst_38812 = (state_38850[(2)]);
var inst_38813 = new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(msg);
var inst_38814 = figwheel.client.heads_up.display_warning.call(null,inst_38813);
var state_38850__$1 = (function (){var statearr_38872 = state_38850;
(statearr_38872[(11)] = inst_38812);

return statearr_38872;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_38850__$1,(29),inst_38814);
} else {
if((state_val_38851 === (25))){
var inst_38810 = figwheel.client.heads_up.clear.call(null);
var state_38850__$1 = state_38850;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_38850__$1,(28),inst_38810);
} else {
if((state_val_38851 === (34))){
var inst_38831 = figwheel.client.heads_up.flash_loaded.call(null);
var state_38850__$1 = state_38850;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_38850__$1,(37),inst_38831);
} else {
if((state_val_38851 === (17))){
var inst_38790 = (state_38850[(2)]);
var inst_38791 = new cljs.core.Keyword(null,"exception-data","exception-data",-512474886).cljs$core$IFn$_invoke$arity$1(msg);
var inst_38792 = figwheel.client.auto_jump_to_error.call(null,opts,inst_38791);
var state_38850__$1 = (function (){var statearr_38873 = state_38850;
(statearr_38873[(12)] = inst_38790);

return statearr_38873;
})();
var statearr_38874_38916 = state_38850__$1;
(statearr_38874_38916[(2)] = inst_38792);

(statearr_38874_38916[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38851 === (3))){
var inst_38782 = figwheel.client.compile_refail_state_QMARK_.call(null,msg_names);
var state_38850__$1 = state_38850;
if(cljs.core.truth_(inst_38782)){
var statearr_38875_38917 = state_38850__$1;
(statearr_38875_38917[(1)] = (13));

} else {
var statearr_38876_38918 = state_38850__$1;
(statearr_38876_38918[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38851 === (12))){
var inst_38778 = (state_38850[(2)]);
var state_38850__$1 = state_38850;
var statearr_38877_38919 = state_38850__$1;
(statearr_38877_38919[(2)] = inst_38778);

(statearr_38877_38919[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38851 === (2))){
var inst_38765 = (state_38850[(10)]);
var inst_38765__$1 = figwheel.client.autoload_QMARK_.call(null);
var state_38850__$1 = (function (){var statearr_38878 = state_38850;
(statearr_38878[(10)] = inst_38765__$1);

return statearr_38878;
})();
if(cljs.core.truth_(inst_38765__$1)){
var statearr_38879_38920 = state_38850__$1;
(statearr_38879_38920[(1)] = (5));

} else {
var statearr_38880_38921 = state_38850__$1;
(statearr_38880_38921[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38851 === (23))){
var inst_38808 = figwheel.client.rewarning_state_QMARK_.call(null,msg_names);
var state_38850__$1 = state_38850;
if(cljs.core.truth_(inst_38808)){
var statearr_38881_38922 = state_38850__$1;
(statearr_38881_38922[(1)] = (25));

} else {
var statearr_38882_38923 = state_38850__$1;
(statearr_38882_38923[(1)] = (26));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38851 === (35))){
var state_38850__$1 = state_38850;
var statearr_38883_38924 = state_38850__$1;
(statearr_38883_38924[(2)] = null);

(statearr_38883_38924[(1)] = (36));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38851 === (19))){
var inst_38803 = figwheel.client.warning_append_state_QMARK_.call(null,msg_names);
var state_38850__$1 = state_38850;
if(cljs.core.truth_(inst_38803)){
var statearr_38884_38925 = state_38850__$1;
(statearr_38884_38925[(1)] = (22));

} else {
var statearr_38885_38926 = state_38850__$1;
(statearr_38885_38926[(1)] = (23));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38851 === (11))){
var inst_38774 = (state_38850[(2)]);
var state_38850__$1 = state_38850;
var statearr_38886_38927 = state_38850__$1;
(statearr_38886_38927[(2)] = inst_38774);

(statearr_38886_38927[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38851 === (9))){
var inst_38776 = figwheel.client.heads_up.clear.call(null);
var state_38850__$1 = state_38850;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_38850__$1,(12),inst_38776);
} else {
if((state_val_38851 === (5))){
var inst_38767 = new cljs.core.Keyword(null,"autoload","autoload",-354122500).cljs$core$IFn$_invoke$arity$1(opts);
var state_38850__$1 = state_38850;
var statearr_38887_38928 = state_38850__$1;
(statearr_38887_38928[(2)] = inst_38767);

(statearr_38887_38928[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38851 === (14))){
var inst_38794 = figwheel.client.compile_fail_state_QMARK_.call(null,msg_names);
var state_38850__$1 = state_38850;
if(cljs.core.truth_(inst_38794)){
var statearr_38888_38929 = state_38850__$1;
(statearr_38888_38929[(1)] = (18));

} else {
var statearr_38889_38930 = state_38850__$1;
(statearr_38889_38930[(1)] = (19));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38851 === (26))){
var inst_38820 = figwheel.client.warning_state_QMARK_.call(null,msg_names);
var state_38850__$1 = state_38850;
if(cljs.core.truth_(inst_38820)){
var statearr_38890_38931 = state_38850__$1;
(statearr_38890_38931[(1)] = (30));

} else {
var statearr_38891_38932 = state_38850__$1;
(statearr_38891_38932[(1)] = (31));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38851 === (16))){
var inst_38786 = (state_38850[(2)]);
var inst_38787 = new cljs.core.Keyword(null,"exception-data","exception-data",-512474886).cljs$core$IFn$_invoke$arity$1(msg);
var inst_38788 = figwheel.client.heads_up.display_exception.call(null,inst_38787);
var state_38850__$1 = (function (){var statearr_38892 = state_38850;
(statearr_38892[(13)] = inst_38786);

return statearr_38892;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_38850__$1,(17),inst_38788);
} else {
if((state_val_38851 === (30))){
var inst_38822 = new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(msg);
var inst_38823 = figwheel.client.heads_up.display_warning.call(null,inst_38822);
var state_38850__$1 = state_38850;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_38850__$1,(33),inst_38823);
} else {
if((state_val_38851 === (10))){
var inst_38780 = (state_38850[(2)]);
var state_38850__$1 = state_38850;
var statearr_38893_38933 = state_38850__$1;
(statearr_38893_38933[(2)] = inst_38780);

(statearr_38893_38933[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38851 === (18))){
var inst_38796 = new cljs.core.Keyword(null,"exception-data","exception-data",-512474886).cljs$core$IFn$_invoke$arity$1(msg);
var inst_38797 = figwheel.client.heads_up.display_exception.call(null,inst_38796);
var state_38850__$1 = state_38850;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_38850__$1,(21),inst_38797);
} else {
if((state_val_38851 === (37))){
var inst_38833 = (state_38850[(2)]);
var state_38850__$1 = state_38850;
var statearr_38894_38934 = state_38850__$1;
(statearr_38894_38934[(2)] = inst_38833);

(statearr_38894_38934[(1)] = (36));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38851 === (8))){
var inst_38772 = figwheel.client.heads_up.flash_loaded.call(null);
var state_38850__$1 = state_38850;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_38850__$1,(11),inst_38772);
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
});})(c__33248__auto__,msg_hist,msg_names,msg))
;
return ((function (switch__33158__auto__,c__33248__auto__,msg_hist,msg_names,msg){
return (function() {
var figwheel$client$heads_up_plugin_msg_handler_$_state_machine__33159__auto__ = null;
var figwheel$client$heads_up_plugin_msg_handler_$_state_machine__33159__auto____0 = (function (){
var statearr_38895 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_38895[(0)] = figwheel$client$heads_up_plugin_msg_handler_$_state_machine__33159__auto__);

(statearr_38895[(1)] = (1));

return statearr_38895;
});
var figwheel$client$heads_up_plugin_msg_handler_$_state_machine__33159__auto____1 = (function (state_38850){
while(true){
var ret_value__33160__auto__ = (function (){try{while(true){
var result__33161__auto__ = switch__33158__auto__.call(null,state_38850);
if(cljs.core.keyword_identical_QMARK_.call(null,result__33161__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__33161__auto__;
}
break;
}
}catch (e38896){if((e38896 instanceof Object)){
var ex__33162__auto__ = e38896;
var statearr_38897_38935 = state_38850;
(statearr_38897_38935[(5)] = ex__33162__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_38850);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e38896;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__33160__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__38936 = state_38850;
state_38850 = G__38936;
continue;
} else {
return ret_value__33160__auto__;
}
break;
}
});
figwheel$client$heads_up_plugin_msg_handler_$_state_machine__33159__auto__ = function(state_38850){
switch(arguments.length){
case 0:
return figwheel$client$heads_up_plugin_msg_handler_$_state_machine__33159__auto____0.call(this);
case 1:
return figwheel$client$heads_up_plugin_msg_handler_$_state_machine__33159__auto____1.call(this,state_38850);
}
throw(new Error('Invalid arity: ' + (arguments.length - 1)));
};
figwheel$client$heads_up_plugin_msg_handler_$_state_machine__33159__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$heads_up_plugin_msg_handler_$_state_machine__33159__auto____0;
figwheel$client$heads_up_plugin_msg_handler_$_state_machine__33159__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$heads_up_plugin_msg_handler_$_state_machine__33159__auto____1;
return figwheel$client$heads_up_plugin_msg_handler_$_state_machine__33159__auto__;
})()
;})(switch__33158__auto__,c__33248__auto__,msg_hist,msg_names,msg))
})();
var state__33250__auto__ = (function (){var statearr_38898 = f__33249__auto__.call(null);
(statearr_38898[(6)] = c__33248__auto__);

return statearr_38898;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__33250__auto__);
});})(c__33248__auto__,msg_hist,msg_names,msg))
);

return c__33248__auto__;
});
figwheel.client.heads_up_plugin = (function figwheel$client$heads_up_plugin(opts){
var ch = cljs.core.async.chan.call(null);
figwheel.client.heads_up_config_options_STAR__STAR_ = opts;

var c__33248__auto___38965 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__33248__auto___38965,ch){
return (function (){
var f__33249__auto__ = (function (){var switch__33158__auto__ = ((function (c__33248__auto___38965,ch){
return (function (state_38951){
var state_val_38952 = (state_38951[(1)]);
if((state_val_38952 === (1))){
var state_38951__$1 = state_38951;
var statearr_38953_38966 = state_38951__$1;
(statearr_38953_38966[(2)] = null);

(statearr_38953_38966[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38952 === (2))){
var state_38951__$1 = state_38951;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_38951__$1,(4),ch);
} else {
if((state_val_38952 === (3))){
var inst_38949 = (state_38951[(2)]);
var state_38951__$1 = state_38951;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_38951__$1,inst_38949);
} else {
if((state_val_38952 === (4))){
var inst_38939 = (state_38951[(7)]);
var inst_38939__$1 = (state_38951[(2)]);
var state_38951__$1 = (function (){var statearr_38954 = state_38951;
(statearr_38954[(7)] = inst_38939__$1);

return statearr_38954;
})();
if(cljs.core.truth_(inst_38939__$1)){
var statearr_38955_38967 = state_38951__$1;
(statearr_38955_38967[(1)] = (5));

} else {
var statearr_38956_38968 = state_38951__$1;
(statearr_38956_38968[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38952 === (5))){
var inst_38939 = (state_38951[(7)]);
var inst_38941 = figwheel.client.heads_up_plugin_msg_handler.call(null,opts,inst_38939);
var state_38951__$1 = state_38951;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_38951__$1,(8),inst_38941);
} else {
if((state_val_38952 === (6))){
var state_38951__$1 = state_38951;
var statearr_38957_38969 = state_38951__$1;
(statearr_38957_38969[(2)] = null);

(statearr_38957_38969[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38952 === (7))){
var inst_38947 = (state_38951[(2)]);
var state_38951__$1 = state_38951;
var statearr_38958_38970 = state_38951__$1;
(statearr_38958_38970[(2)] = inst_38947);

(statearr_38958_38970[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38952 === (8))){
var inst_38943 = (state_38951[(2)]);
var state_38951__$1 = (function (){var statearr_38959 = state_38951;
(statearr_38959[(8)] = inst_38943);

return statearr_38959;
})();
var statearr_38960_38971 = state_38951__$1;
(statearr_38960_38971[(2)] = null);

(statearr_38960_38971[(1)] = (2));


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
});})(c__33248__auto___38965,ch))
;
return ((function (switch__33158__auto__,c__33248__auto___38965,ch){
return (function() {
var figwheel$client$heads_up_plugin_$_state_machine__33159__auto__ = null;
var figwheel$client$heads_up_plugin_$_state_machine__33159__auto____0 = (function (){
var statearr_38961 = [null,null,null,null,null,null,null,null,null];
(statearr_38961[(0)] = figwheel$client$heads_up_plugin_$_state_machine__33159__auto__);

(statearr_38961[(1)] = (1));

return statearr_38961;
});
var figwheel$client$heads_up_plugin_$_state_machine__33159__auto____1 = (function (state_38951){
while(true){
var ret_value__33160__auto__ = (function (){try{while(true){
var result__33161__auto__ = switch__33158__auto__.call(null,state_38951);
if(cljs.core.keyword_identical_QMARK_.call(null,result__33161__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__33161__auto__;
}
break;
}
}catch (e38962){if((e38962 instanceof Object)){
var ex__33162__auto__ = e38962;
var statearr_38963_38972 = state_38951;
(statearr_38963_38972[(5)] = ex__33162__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_38951);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e38962;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__33160__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__38973 = state_38951;
state_38951 = G__38973;
continue;
} else {
return ret_value__33160__auto__;
}
break;
}
});
figwheel$client$heads_up_plugin_$_state_machine__33159__auto__ = function(state_38951){
switch(arguments.length){
case 0:
return figwheel$client$heads_up_plugin_$_state_machine__33159__auto____0.call(this);
case 1:
return figwheel$client$heads_up_plugin_$_state_machine__33159__auto____1.call(this,state_38951);
}
throw(new Error('Invalid arity: ' + (arguments.length - 1)));
};
figwheel$client$heads_up_plugin_$_state_machine__33159__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$heads_up_plugin_$_state_machine__33159__auto____0;
figwheel$client$heads_up_plugin_$_state_machine__33159__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$heads_up_plugin_$_state_machine__33159__auto____1;
return figwheel$client$heads_up_plugin_$_state_machine__33159__auto__;
})()
;})(switch__33158__auto__,c__33248__auto___38965,ch))
})();
var state__33250__auto__ = (function (){var statearr_38964 = f__33249__auto__.call(null);
(statearr_38964[(6)] = c__33248__auto___38965);

return statearr_38964;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__33250__auto__);
});})(c__33248__auto___38965,ch))
);


figwheel.client.heads_up.ensure_container.call(null);

return ((function (ch){
return (function (msg_hist){
cljs.core.async.put_BANG_.call(null,ch,msg_hist);

return msg_hist;
});
;})(ch))
});
figwheel.client.enforce_project_plugin = (function figwheel$client$enforce_project_plugin(opts){
return (function (msg_hist){
if(((1) < cljs.core.count.call(null,cljs.core.set.call(null,cljs.core.keep.call(null,new cljs.core.Keyword(null,"project-id","project-id",206449307),cljs.core.take.call(null,(5),msg_hist)))))){
figwheel.client.socket.close_BANG_.call(null);

console.error("Figwheel: message received from different project. Shutting socket down.");

if(cljs.core.truth_(new cljs.core.Keyword(null,"heads-up-display","heads-up-display",-896577202).cljs$core$IFn$_invoke$arity$1(opts))){
var c__33248__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__33248__auto__){
return (function (){
var f__33249__auto__ = (function (){var switch__33158__auto__ = ((function (c__33248__auto__){
return (function (state_38979){
var state_val_38980 = (state_38979[(1)]);
if((state_val_38980 === (1))){
var inst_38974 = cljs.core.async.timeout.call(null,(3000));
var state_38979__$1 = state_38979;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_38979__$1,(2),inst_38974);
} else {
if((state_val_38980 === (2))){
var inst_38976 = (state_38979[(2)]);
var inst_38977 = figwheel.client.heads_up.display_system_warning.call(null,"Connection from different project","Shutting connection down!!!!!");
var state_38979__$1 = (function (){var statearr_38981 = state_38979;
(statearr_38981[(7)] = inst_38976);

return statearr_38981;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_38979__$1,inst_38977);
} else {
return null;
}
}
});})(c__33248__auto__))
;
return ((function (switch__33158__auto__,c__33248__auto__){
return (function() {
var figwheel$client$enforce_project_plugin_$_state_machine__33159__auto__ = null;
var figwheel$client$enforce_project_plugin_$_state_machine__33159__auto____0 = (function (){
var statearr_38982 = [null,null,null,null,null,null,null,null];
(statearr_38982[(0)] = figwheel$client$enforce_project_plugin_$_state_machine__33159__auto__);

(statearr_38982[(1)] = (1));

return statearr_38982;
});
var figwheel$client$enforce_project_plugin_$_state_machine__33159__auto____1 = (function (state_38979){
while(true){
var ret_value__33160__auto__ = (function (){try{while(true){
var result__33161__auto__ = switch__33158__auto__.call(null,state_38979);
if(cljs.core.keyword_identical_QMARK_.call(null,result__33161__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__33161__auto__;
}
break;
}
}catch (e38983){if((e38983 instanceof Object)){
var ex__33162__auto__ = e38983;
var statearr_38984_38986 = state_38979;
(statearr_38984_38986[(5)] = ex__33162__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_38979);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e38983;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__33160__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__38987 = state_38979;
state_38979 = G__38987;
continue;
} else {
return ret_value__33160__auto__;
}
break;
}
});
figwheel$client$enforce_project_plugin_$_state_machine__33159__auto__ = function(state_38979){
switch(arguments.length){
case 0:
return figwheel$client$enforce_project_plugin_$_state_machine__33159__auto____0.call(this);
case 1:
return figwheel$client$enforce_project_plugin_$_state_machine__33159__auto____1.call(this,state_38979);
}
throw(new Error('Invalid arity: ' + (arguments.length - 1)));
};
figwheel$client$enforce_project_plugin_$_state_machine__33159__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$enforce_project_plugin_$_state_machine__33159__auto____0;
figwheel$client$enforce_project_plugin_$_state_machine__33159__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$enforce_project_plugin_$_state_machine__33159__auto____1;
return figwheel$client$enforce_project_plugin_$_state_machine__33159__auto__;
})()
;})(switch__33158__auto__,c__33248__auto__))
})();
var state__33250__auto__ = (function (){var statearr_38985 = f__33249__auto__.call(null);
(statearr_38985[(6)] = c__33248__auto__);

return statearr_38985;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__33250__auto__);
});})(c__33248__auto__))
);

return c__33248__auto__;
} else {
return null;
}
} else {
return null;
}
});
});
figwheel.client.enforce_figwheel_version_plugin = (function figwheel$client$enforce_figwheel_version_plugin(opts){
return (function (msg_hist){
var temp__5457__auto__ = new cljs.core.Keyword(null,"figwheel-version","figwheel-version",1409553832).cljs$core$IFn$_invoke$arity$1(cljs.core.first.call(null,msg_hist));
if(cljs.core.truth_(temp__5457__auto__)){
var figwheel_version = temp__5457__auto__;
if(cljs.core.not_EQ_.call(null,figwheel_version,figwheel.client._figwheel_version_)){
figwheel.client.socket.close_BANG_.call(null);

console.error("Figwheel: message received from different version of Figwheel.");

if(cljs.core.truth_(new cljs.core.Keyword(null,"heads-up-display","heads-up-display",-896577202).cljs$core$IFn$_invoke$arity$1(opts))){
var c__33248__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__33248__auto__,figwheel_version,temp__5457__auto__){
return (function (){
var f__33249__auto__ = (function (){var switch__33158__auto__ = ((function (c__33248__auto__,figwheel_version,temp__5457__auto__){
return (function (state_38994){
var state_val_38995 = (state_38994[(1)]);
if((state_val_38995 === (1))){
var inst_38988 = cljs.core.async.timeout.call(null,(2000));
var state_38994__$1 = state_38994;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_38994__$1,(2),inst_38988);
} else {
if((state_val_38995 === (2))){
var inst_38990 = (state_38994[(2)]);
var inst_38991 = ["Figwheel Client Version <strong>",cljs.core.str.cljs$core$IFn$_invoke$arity$1(figwheel.client._figwheel_version_),"</strong> is not equal to ","Figwheel Sidecar Version <strong>",cljs.core.str.cljs$core$IFn$_invoke$arity$1(figwheel_version),"</strong>",".  Shutting down Websocket Connection!","<h4>To fix try:</h4>","<ol><li>Reload this page and make sure you are not getting a cached version of the client.</li>","<li>You may have to clean (delete compiled assets) and rebuild to make sure that the new client code is being used.</li>","<li>Also, make sure you have consistent Figwheel dependencies.</li></ol>"].join('');
var inst_38992 = figwheel.client.heads_up.display_system_warning.call(null,"Figwheel Client and Server have different versions!!",inst_38991);
var state_38994__$1 = (function (){var statearr_38996 = state_38994;
(statearr_38996[(7)] = inst_38990);

return statearr_38996;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_38994__$1,inst_38992);
} else {
return null;
}
}
});})(c__33248__auto__,figwheel_version,temp__5457__auto__))
;
return ((function (switch__33158__auto__,c__33248__auto__,figwheel_version,temp__5457__auto__){
return (function() {
var figwheel$client$enforce_figwheel_version_plugin_$_state_machine__33159__auto__ = null;
var figwheel$client$enforce_figwheel_version_plugin_$_state_machine__33159__auto____0 = (function (){
var statearr_38997 = [null,null,null,null,null,null,null,null];
(statearr_38997[(0)] = figwheel$client$enforce_figwheel_version_plugin_$_state_machine__33159__auto__);

(statearr_38997[(1)] = (1));

return statearr_38997;
});
var figwheel$client$enforce_figwheel_version_plugin_$_state_machine__33159__auto____1 = (function (state_38994){
while(true){
var ret_value__33160__auto__ = (function (){try{while(true){
var result__33161__auto__ = switch__33158__auto__.call(null,state_38994);
if(cljs.core.keyword_identical_QMARK_.call(null,result__33161__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__33161__auto__;
}
break;
}
}catch (e38998){if((e38998 instanceof Object)){
var ex__33162__auto__ = e38998;
var statearr_38999_39001 = state_38994;
(statearr_38999_39001[(5)] = ex__33162__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_38994);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e38998;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__33160__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__39002 = state_38994;
state_38994 = G__39002;
continue;
} else {
return ret_value__33160__auto__;
}
break;
}
});
figwheel$client$enforce_figwheel_version_plugin_$_state_machine__33159__auto__ = function(state_38994){
switch(arguments.length){
case 0:
return figwheel$client$enforce_figwheel_version_plugin_$_state_machine__33159__auto____0.call(this);
case 1:
return figwheel$client$enforce_figwheel_version_plugin_$_state_machine__33159__auto____1.call(this,state_38994);
}
throw(new Error('Invalid arity: ' + (arguments.length - 1)));
};
figwheel$client$enforce_figwheel_version_plugin_$_state_machine__33159__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$enforce_figwheel_version_plugin_$_state_machine__33159__auto____0;
figwheel$client$enforce_figwheel_version_plugin_$_state_machine__33159__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$enforce_figwheel_version_plugin_$_state_machine__33159__auto____1;
return figwheel$client$enforce_figwheel_version_plugin_$_state_machine__33159__auto__;
})()
;})(switch__33158__auto__,c__33248__auto__,figwheel_version,temp__5457__auto__))
})();
var state__33250__auto__ = (function (){var statearr_39000 = f__33249__auto__.call(null);
(statearr_39000[(6)] = c__33248__auto__);

return statearr_39000;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__33250__auto__);
});})(c__33248__auto__,figwheel_version,temp__5457__auto__))
);

return c__33248__auto__;
} else {
return null;
}
} else {
return null;
}
} else {
return null;
}
});
});
figwheel.client.default_on_jsload = cljs.core.identity;
figwheel.client.file_line_column = (function figwheel$client$file_line_column(p__39003){
var map__39004 = p__39003;
var map__39004__$1 = ((((!((map__39004 == null)))?((((map__39004.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__39004.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__39004):map__39004);
var file = cljs.core.get.call(null,map__39004__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
var line = cljs.core.get.call(null,map__39004__$1,new cljs.core.Keyword(null,"line","line",212345235));
var column = cljs.core.get.call(null,map__39004__$1,new cljs.core.Keyword(null,"column","column",2078222095));
var G__39006 = "";
var G__39006__$1 = (cljs.core.truth_(file)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__39006),"file ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(file)].join(''):G__39006);
var G__39006__$2 = (cljs.core.truth_(line)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__39006__$1)," at line ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(line)].join(''):G__39006__$1);
if(cljs.core.truth_((function (){var and__30148__auto__ = line;
if(cljs.core.truth_(and__30148__auto__)){
return column;
} else {
return and__30148__auto__;
}
})())){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__39006__$2),", column ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(column)].join('');
} else {
return G__39006__$2;
}
});
figwheel.client.default_on_compile_fail = (function figwheel$client$default_on_compile_fail(p__39007){
var map__39008 = p__39007;
var map__39008__$1 = ((((!((map__39008 == null)))?((((map__39008.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__39008.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__39008):map__39008);
var ed = map__39008__$1;
var formatted_exception = cljs.core.get.call(null,map__39008__$1,new cljs.core.Keyword(null,"formatted-exception","formatted-exception",-116489026));
var exception_data = cljs.core.get.call(null,map__39008__$1,new cljs.core.Keyword(null,"exception-data","exception-data",-512474886));
var cause = cljs.core.get.call(null,map__39008__$1,new cljs.core.Keyword(null,"cause","cause",231901252));
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: Compile Exception");

var seq__39010_39014 = cljs.core.seq.call(null,figwheel.client.format_messages.call(null,exception_data));
var chunk__39011_39015 = null;
var count__39012_39016 = (0);
var i__39013_39017 = (0);
while(true){
if((i__39013_39017 < count__39012_39016)){
var msg_39018 = cljs.core._nth.call(null,chunk__39011_39015,i__39013_39017);
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"info","info",-317069002),msg_39018);

var G__39019 = seq__39010_39014;
var G__39020 = chunk__39011_39015;
var G__39021 = count__39012_39016;
var G__39022 = (i__39013_39017 + (1));
seq__39010_39014 = G__39019;
chunk__39011_39015 = G__39020;
count__39012_39016 = G__39021;
i__39013_39017 = G__39022;
continue;
} else {
var temp__5457__auto___39023 = cljs.core.seq.call(null,seq__39010_39014);
if(temp__5457__auto___39023){
var seq__39010_39024__$1 = temp__5457__auto___39023;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__39010_39024__$1)){
var c__31091__auto___39025 = cljs.core.chunk_first.call(null,seq__39010_39024__$1);
var G__39026 = cljs.core.chunk_rest.call(null,seq__39010_39024__$1);
var G__39027 = c__31091__auto___39025;
var G__39028 = cljs.core.count.call(null,c__31091__auto___39025);
var G__39029 = (0);
seq__39010_39014 = G__39026;
chunk__39011_39015 = G__39027;
count__39012_39016 = G__39028;
i__39013_39017 = G__39029;
continue;
} else {
var msg_39030 = cljs.core.first.call(null,seq__39010_39024__$1);
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"info","info",-317069002),msg_39030);

var G__39031 = cljs.core.next.call(null,seq__39010_39024__$1);
var G__39032 = null;
var G__39033 = (0);
var G__39034 = (0);
seq__39010_39014 = G__39031;
chunk__39011_39015 = G__39032;
count__39012_39016 = G__39033;
i__39013_39017 = G__39034;
continue;
}
} else {
}
}
break;
}

if(cljs.core.truth_(cause)){
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"info","info",-317069002),["Error on ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(figwheel.client.file_line_column.call(null,ed))].join(''));
} else {
}

return ed;
});
figwheel.client.default_on_compile_warning = (function figwheel$client$default_on_compile_warning(p__39035){
var map__39036 = p__39035;
var map__39036__$1 = ((((!((map__39036 == null)))?((((map__39036.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__39036.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__39036):map__39036);
var w = map__39036__$1;
var message = cljs.core.get.call(null,map__39036__$1,new cljs.core.Keyword(null,"message","message",-406056002));
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"warn","warn",-436710552),["Figwheel: Compile Warning - ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(message))," in ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(figwheel.client.file_line_column.call(null,message))].join(''));

return w;
});
figwheel.client.default_before_load = (function figwheel$client$default_before_load(files){
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: notified of file changes");

return files;
});
figwheel.client.default_on_cssload = (function figwheel$client$default_on_cssload(files){
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: loaded CSS files");

figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"info","info",-317069002),cljs.core.pr_str.call(null,cljs.core.map.call(null,new cljs.core.Keyword(null,"file","file",-1269645878),files)));

return files;
});
if(typeof figwheel.client.config_defaults !== 'undefined'){
} else {
figwheel.client.config_defaults = cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"on-compile-warning","on-compile-warning",-1195585947),new cljs.core.Keyword(null,"on-jsload","on-jsload",-395756602),new cljs.core.Keyword(null,"reload-dependents","reload-dependents",-956865430),new cljs.core.Keyword(null,"on-compile-fail","on-compile-fail",728013036),new cljs.core.Keyword(null,"debug","debug",-1608172596),new cljs.core.Keyword(null,"heads-up-display","heads-up-display",-896577202),new cljs.core.Keyword(null,"websocket-url","websocket-url",-490444938),new cljs.core.Keyword(null,"auto-jump-to-source-on-error","auto-jump-to-source-on-error",-960314920),new cljs.core.Keyword(null,"before-jsload","before-jsload",-847513128),new cljs.core.Keyword(null,"load-warninged-code","load-warninged-code",-2030345223),new cljs.core.Keyword(null,"eval-fn","eval-fn",-1111644294),new cljs.core.Keyword(null,"retry-count","retry-count",1936122875),new cljs.core.Keyword(null,"autoload","autoload",-354122500),new cljs.core.Keyword(null,"on-cssload","on-cssload",1825432318)],[new cljs.core.Var(function(){return figwheel.client.default_on_compile_warning;},new cljs.core.Symbol("figwheel.client","default-on-compile-warning","figwheel.client/default-on-compile-warning",584144208,null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",441598760),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"arglists","arglists",1661989754),new cljs.core.Keyword(null,"doc","doc",1913296891),new cljs.core.Keyword(null,"test","test",577538877)],[new cljs.core.Symbol(null,"figwheel.client","figwheel.client",-538710252,null),new cljs.core.Symbol(null,"default-on-compile-warning","default-on-compile-warning",-18911586,null),"resources/public/js/compiled/out/figwheel/client.cljs",33,1,361,361,cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"keys","keys",1068423698),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"message","message",1234475525,null)], null),new cljs.core.Keyword(null,"as","as",1148689641),new cljs.core.Symbol(null,"w","w",1994700528,null)], null)], null)),null,(cljs.core.truth_(figwheel.client.default_on_compile_warning)?figwheel.client.default_on_compile_warning.cljs$lang$test:null)])),figwheel.client.default_on_jsload,true,new cljs.core.Var(function(){return figwheel.client.default_on_compile_fail;},new cljs.core.Symbol("figwheel.client","default-on-compile-fail","figwheel.client/default-on-compile-fail",1384826337,null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",441598760),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"arglists","arglists",1661989754),new cljs.core.Keyword(null,"doc","doc",1913296891),new cljs.core.Keyword(null,"test","test",577538877)],[new cljs.core.Symbol(null,"figwheel.client","figwheel.client",-538710252,null),new cljs.core.Symbol(null,"default-on-compile-fail","default-on-compile-fail",-158814813,null),"resources/public/js/compiled/out/figwheel/client.cljs",30,1,353,353,cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"keys","keys",1068423698),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"formatted-exception","formatted-exception",1524042501,null),new cljs.core.Symbol(null,"exception-data","exception-data",1128056641,null),new cljs.core.Symbol(null,"cause","cause",1872432779,null)], null),new cljs.core.Keyword(null,"as","as",1148689641),new cljs.core.Symbol(null,"ed","ed",2076825751,null)], null)], null)),null,(cljs.core.truth_(figwheel.client.default_on_compile_fail)?figwheel.client.default_on_compile_fail.cljs$lang$test:null)])),false,true,["ws://",cljs.core.str.cljs$core$IFn$_invoke$arity$1((cljs.core.truth_(figwheel.client.utils.html_env_QMARK_.call(null))?location.host:"localhost:3449")),"/figwheel-ws"].join(''),false,figwheel.client.default_before_load,false,false,(100),true,figwheel.client.default_on_cssload]);
}
figwheel.client.handle_deprecated_jsload_callback = (function figwheel$client$handle_deprecated_jsload_callback(config){
if(cljs.core.truth_(new cljs.core.Keyword(null,"jsload-callback","jsload-callback",-1949628369).cljs$core$IFn$_invoke$arity$1(config))){
return cljs.core.dissoc.call(null,cljs.core.assoc.call(null,config,new cljs.core.Keyword(null,"on-jsload","on-jsload",-395756602),new cljs.core.Keyword(null,"jsload-callback","jsload-callback",-1949628369).cljs$core$IFn$_invoke$arity$1(config)),new cljs.core.Keyword(null,"jsload-callback","jsload-callback",-1949628369));
} else {
return config;
}
});
figwheel.client.fill_url_template = (function figwheel$client$fill_url_template(config){
if(cljs.core.truth_(figwheel.client.utils.html_env_QMARK_.call(null))){
return cljs.core.update_in.call(null,config,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"websocket-url","websocket-url",-490444938)], null),(function (x){
return clojure.string.replace.call(null,clojure.string.replace.call(null,x,"[[client-hostname]]",location.hostname),"[[client-port]]",location.port);
}));
} else {
return config;
}
});
figwheel.client.base_plugins = (function figwheel$client$base_plugins(system_options){
var base = new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"enforce-project-plugin","enforce-project-plugin",959402899),figwheel.client.enforce_project_plugin,new cljs.core.Keyword(null,"enforce-figwheel-version-plugin","enforce-figwheel-version-plugin",-1916185220),figwheel.client.enforce_figwheel_version_plugin,new cljs.core.Keyword(null,"file-reloader-plugin","file-reloader-plugin",-1792964733),figwheel.client.file_reloader_plugin,new cljs.core.Keyword(null,"comp-fail-warning-plugin","comp-fail-warning-plugin",634311),figwheel.client.compile_fail_warning_plugin,new cljs.core.Keyword(null,"css-reloader-plugin","css-reloader-plugin",2002032904),figwheel.client.css_reloader_plugin,new cljs.core.Keyword(null,"repl-plugin","repl-plugin",-1138952371),figwheel.client.repl_plugin], null);
var base__$1 = ((cljs.core.not.call(null,figwheel.client.utils.html_env_QMARK_.call(null)))?cljs.core.select_keys.call(null,base,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"file-reloader-plugin","file-reloader-plugin",-1792964733),new cljs.core.Keyword(null,"comp-fail-warning-plugin","comp-fail-warning-plugin",634311),new cljs.core.Keyword(null,"repl-plugin","repl-plugin",-1138952371)], null)):base);
var base__$2 = ((new cljs.core.Keyword(null,"autoload","autoload",-354122500).cljs$core$IFn$_invoke$arity$1(system_options) === false)?cljs.core.dissoc.call(null,base__$1,new cljs.core.Keyword(null,"file-reloader-plugin","file-reloader-plugin",-1792964733)):base__$1);
if(cljs.core.truth_((function (){var and__30148__auto__ = new cljs.core.Keyword(null,"heads-up-display","heads-up-display",-896577202).cljs$core$IFn$_invoke$arity$1(system_options);
if(cljs.core.truth_(and__30148__auto__)){
return figwheel.client.utils.html_env_QMARK_.call(null);
} else {
return and__30148__auto__;
}
})())){
return cljs.core.assoc.call(null,base__$2,new cljs.core.Keyword(null,"heads-up-display-plugin","heads-up-display-plugin",1745207501),figwheel.client.heads_up_plugin);
} else {
return base__$2;
}
});
figwheel.client.add_message_watch = (function figwheel$client$add_message_watch(key,callback){
return cljs.core.add_watch.call(null,figwheel.client.socket.message_history_atom,key,(function (_,___$1,___$2,msg_hist){
return callback.call(null,cljs.core.first.call(null,msg_hist));
}));
});
figwheel.client.add_json_message_watch = (function figwheel$client$add_json_message_watch(key,callback){
return figwheel.client.add_message_watch.call(null,key,cljs.core.comp.call(null,callback,cljs.core.clj__GT_js));
});
goog.exportSymbol('figwheel.client.add_json_message_watch', figwheel.client.add_json_message_watch);
figwheel.client.add_plugins = (function figwheel$client$add_plugins(plugins,system_options){
var seq__39038 = cljs.core.seq.call(null,plugins);
var chunk__39039 = null;
var count__39040 = (0);
var i__39041 = (0);
while(true){
if((i__39041 < count__39040)){
var vec__39042 = cljs.core._nth.call(null,chunk__39039,i__39041);
var k = cljs.core.nth.call(null,vec__39042,(0),null);
var plugin = cljs.core.nth.call(null,vec__39042,(1),null);
if(cljs.core.truth_(plugin)){
var pl_39048 = plugin.call(null,system_options);
cljs.core.add_watch.call(null,figwheel.client.socket.message_history_atom,k,((function (seq__39038,chunk__39039,count__39040,i__39041,pl_39048,vec__39042,k,plugin){
return (function (_,___$1,___$2,msg_hist){
return pl_39048.call(null,msg_hist);
});})(seq__39038,chunk__39039,count__39040,i__39041,pl_39048,vec__39042,k,plugin))
);
} else {
}

var G__39049 = seq__39038;
var G__39050 = chunk__39039;
var G__39051 = count__39040;
var G__39052 = (i__39041 + (1));
seq__39038 = G__39049;
chunk__39039 = G__39050;
count__39040 = G__39051;
i__39041 = G__39052;
continue;
} else {
var temp__5457__auto__ = cljs.core.seq.call(null,seq__39038);
if(temp__5457__auto__){
var seq__39038__$1 = temp__5457__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__39038__$1)){
var c__31091__auto__ = cljs.core.chunk_first.call(null,seq__39038__$1);
var G__39053 = cljs.core.chunk_rest.call(null,seq__39038__$1);
var G__39054 = c__31091__auto__;
var G__39055 = cljs.core.count.call(null,c__31091__auto__);
var G__39056 = (0);
seq__39038 = G__39053;
chunk__39039 = G__39054;
count__39040 = G__39055;
i__39041 = G__39056;
continue;
} else {
var vec__39045 = cljs.core.first.call(null,seq__39038__$1);
var k = cljs.core.nth.call(null,vec__39045,(0),null);
var plugin = cljs.core.nth.call(null,vec__39045,(1),null);
if(cljs.core.truth_(plugin)){
var pl_39057 = plugin.call(null,system_options);
cljs.core.add_watch.call(null,figwheel.client.socket.message_history_atom,k,((function (seq__39038,chunk__39039,count__39040,i__39041,pl_39057,vec__39045,k,plugin,seq__39038__$1,temp__5457__auto__){
return (function (_,___$1,___$2,msg_hist){
return pl_39057.call(null,msg_hist);
});})(seq__39038,chunk__39039,count__39040,i__39041,pl_39057,vec__39045,k,plugin,seq__39038__$1,temp__5457__auto__))
);
} else {
}

var G__39058 = cljs.core.next.call(null,seq__39038__$1);
var G__39059 = null;
var G__39060 = (0);
var G__39061 = (0);
seq__39038 = G__39058;
chunk__39039 = G__39059;
count__39040 = G__39060;
i__39041 = G__39061;
continue;
}
} else {
return null;
}
}
break;
}
});
figwheel.client.start = (function figwheel$client$start(var_args){
var G__39063 = arguments.length;
switch (G__39063) {
case 1:
return figwheel.client.start.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 0:
return figwheel.client.start.cljs$core$IFn$_invoke$arity$0();

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

figwheel.client.start.cljs$core$IFn$_invoke$arity$1 = (function (opts){
if((goog.dependencies_ == null)){
return null;
} else {
if(typeof figwheel.client.__figwheel_start_once__ !== 'undefined'){
return null;
} else {
return (
figwheel.client.__figwheel_start_once__ = setTimeout((function (){
var plugins_SINGLEQUOTE_ = new cljs.core.Keyword(null,"plugins","plugins",1900073717).cljs$core$IFn$_invoke$arity$1(opts);
var merge_plugins = new cljs.core.Keyword(null,"merge-plugins","merge-plugins",-1193912370).cljs$core$IFn$_invoke$arity$1(opts);
var system_options = figwheel.client.fill_url_template.call(null,figwheel.client.handle_deprecated_jsload_callback.call(null,cljs.core.merge.call(null,figwheel.client.config_defaults,cljs.core.dissoc.call(null,opts,new cljs.core.Keyword(null,"plugins","plugins",1900073717),new cljs.core.Keyword(null,"merge-plugins","merge-plugins",-1193912370)))));
var plugins = (cljs.core.truth_(plugins_SINGLEQUOTE_)?plugins_SINGLEQUOTE_:cljs.core.merge.call(null,figwheel.client.base_plugins.call(null,system_options),merge_plugins));
figwheel.client.utils._STAR_print_debug_STAR_ = new cljs.core.Keyword(null,"debug","debug",-1608172596).cljs$core$IFn$_invoke$arity$1(opts);

figwheel.client.enable_repl_print_BANG_.call(null);

figwheel.client.add_plugins.call(null,plugins,system_options);

figwheel.client.file_reloading.patch_goog_base.call(null);

var seq__39064_39069 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"initial-messages","initial-messages",2057377771).cljs$core$IFn$_invoke$arity$1(system_options));
var chunk__39065_39070 = null;
var count__39066_39071 = (0);
var i__39067_39072 = (0);
while(true){
if((i__39067_39072 < count__39066_39071)){
var msg_39073 = cljs.core._nth.call(null,chunk__39065_39070,i__39067_39072);
figwheel.client.socket.handle_incoming_message.call(null,msg_39073);

var G__39074 = seq__39064_39069;
var G__39075 = chunk__39065_39070;
var G__39076 = count__39066_39071;
var G__39077 = (i__39067_39072 + (1));
seq__39064_39069 = G__39074;
chunk__39065_39070 = G__39075;
count__39066_39071 = G__39076;
i__39067_39072 = G__39077;
continue;
} else {
var temp__5457__auto___39078 = cljs.core.seq.call(null,seq__39064_39069);
if(temp__5457__auto___39078){
var seq__39064_39079__$1 = temp__5457__auto___39078;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__39064_39079__$1)){
var c__31091__auto___39080 = cljs.core.chunk_first.call(null,seq__39064_39079__$1);
var G__39081 = cljs.core.chunk_rest.call(null,seq__39064_39079__$1);
var G__39082 = c__31091__auto___39080;
var G__39083 = cljs.core.count.call(null,c__31091__auto___39080);
var G__39084 = (0);
seq__39064_39069 = G__39081;
chunk__39065_39070 = G__39082;
count__39066_39071 = G__39083;
i__39067_39072 = G__39084;
continue;
} else {
var msg_39085 = cljs.core.first.call(null,seq__39064_39079__$1);
figwheel.client.socket.handle_incoming_message.call(null,msg_39085);

var G__39086 = cljs.core.next.call(null,seq__39064_39079__$1);
var G__39087 = null;
var G__39088 = (0);
var G__39089 = (0);
seq__39064_39069 = G__39086;
chunk__39065_39070 = G__39087;
count__39066_39071 = G__39088;
i__39067_39072 = G__39089;
continue;
}
} else {
}
}
break;
}

return figwheel.client.socket.open.call(null,system_options);
})))
;
}
}
});

figwheel.client.start.cljs$core$IFn$_invoke$arity$0 = (function (){
return figwheel.client.start.call(null,cljs.core.PersistentArrayMap.EMPTY);
});

figwheel.client.start.cljs$lang$maxFixedArity = 1;

figwheel.client.watch_and_reload_with_opts = figwheel.client.start;
figwheel.client.watch_and_reload = (function figwheel$client$watch_and_reload(var_args){
var args__31447__auto__ = [];
var len__31440__auto___39094 = arguments.length;
var i__31441__auto___39095 = (0);
while(true){
if((i__31441__auto___39095 < len__31440__auto___39094)){
args__31447__auto__.push((arguments[i__31441__auto___39095]));

var G__39096 = (i__31441__auto___39095 + (1));
i__31441__auto___39095 = G__39096;
continue;
} else {
}
break;
}

var argseq__31448__auto__ = ((((0) < args__31447__auto__.length))?(new cljs.core.IndexedSeq(args__31447__auto__.slice((0)),(0),null)):null);
return figwheel.client.watch_and_reload.cljs$core$IFn$_invoke$arity$variadic(argseq__31448__auto__);
});

figwheel.client.watch_and_reload.cljs$core$IFn$_invoke$arity$variadic = (function (p__39091){
var map__39092 = p__39091;
var map__39092__$1 = ((((!((map__39092 == null)))?((((map__39092.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__39092.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__39092):map__39092);
var opts = map__39092__$1;
return figwheel.client.start.call(null,opts);
});

figwheel.client.watch_and_reload.cljs$lang$maxFixedArity = (0);

figwheel.client.watch_and_reload.cljs$lang$applyTo = (function (seq39090){
return figwheel.client.watch_and_reload.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq39090));
});

figwheel.client.fetch_data_from_env = (function figwheel$client$fetch_data_from_env(){
try{return cljs.reader.read_string.call(null,goog.object.get(window,"FIGWHEEL_CLIENT_CONFIGURATION"));
}catch (e39097){if((e39097 instanceof Error)){
var e = e39097;
cljs.core._STAR_print_err_fn_STAR_.call(null,"Unable to load FIGWHEEL_CLIENT_CONFIGURATION from the environment");

return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"autoload","autoload",-354122500),false], null);
} else {
throw e39097;

}
}});
figwheel.client.console_intro_message = "Figwheel has compiled a temporary helper application to your :output-file.\n\nThe code currently in your configured output file does not\nrepresent the code that you are trying to compile.\n\nThis temporary application is intended to help you continue to get\nfeedback from Figwheel until the build you are working on compiles\ncorrectly.\n\nWhen your ClojureScript source code compiles correctly this helper\napplication will auto-reload and pick up your freshly compiled\nClojureScript program.";
figwheel.client.bad_compile_helper_app = (function figwheel$client$bad_compile_helper_app(){
cljs.core.enable_console_print_BANG_.call(null);

var config = figwheel.client.fetch_data_from_env.call(null);
cljs.core.println.call(null,figwheel.client.console_intro_message);

figwheel.client.heads_up.bad_compile_screen.call(null);

if(cljs.core.truth_(goog.dependencies_)){
} else {
goog.dependencies_ = true;
}

figwheel.client.start.call(null,config);

return figwheel.client.add_message_watch.call(null,new cljs.core.Keyword(null,"listen-for-successful-compile","listen-for-successful-compile",-995277603),((function (config){
return (function (p__39098){
var map__39099 = p__39098;
var map__39099__$1 = ((((!((map__39099 == null)))?((((map__39099.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__39099.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__39099):map__39099);
var msg_name = cljs.core.get.call(null,map__39099__$1,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863));
if(cljs.core._EQ_.call(null,msg_name,new cljs.core.Keyword(null,"files-changed","files-changed",-1418200563))){
return location.href = location.href;
} else {
return null;
}
});})(config))
);
});

//# sourceMappingURL=client.js.map?rel=1540594460799
