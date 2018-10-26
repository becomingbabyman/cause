// Compiled by ClojureScript 1.9.946 {}
goog.provide('figwheel.client.heads_up');
goog.require('cljs.core');
goog.require('clojure.string');
goog.require('figwheel.client.socket');
goog.require('figwheel.client.utils');
goog.require('cljs.core.async');
goog.require('goog.string');
goog.require('goog.dom.dataset');
goog.require('goog.object');
goog.require('goog.dom');
goog.require('cljs.pprint');

figwheel.client.heads_up.node = (function figwheel$client$heads_up$node(var_args){
var args__31447__auto__ = [];
var len__31440__auto___38442 = arguments.length;
var i__31441__auto___38443 = (0);
while(true){
if((i__31441__auto___38443 < len__31440__auto___38442)){
args__31447__auto__.push((arguments[i__31441__auto___38443]));

var G__38444 = (i__31441__auto___38443 + (1));
i__31441__auto___38443 = G__38444;
continue;
} else {
}
break;
}

var argseq__31448__auto__ = ((((2) < args__31447__auto__.length))?(new cljs.core.IndexedSeq(args__31447__auto__.slice((2)),(0),null)):null);
return figwheel.client.heads_up.node.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__31448__auto__);
});

figwheel.client.heads_up.node.cljs$core$IFn$_invoke$arity$variadic = (function (t,attrs,children){
var e = document.createElement(cljs.core.name.call(null,t));
var seq__38434_38445 = cljs.core.seq.call(null,cljs.core.keys.call(null,attrs));
var chunk__38435_38446 = null;
var count__38436_38447 = (0);
var i__38437_38448 = (0);
while(true){
if((i__38437_38448 < count__38436_38447)){
var k_38449 = cljs.core._nth.call(null,chunk__38435_38446,i__38437_38448);
e.setAttribute(cljs.core.name.call(null,k_38449),cljs.core.get.call(null,attrs,k_38449));

var G__38450 = seq__38434_38445;
var G__38451 = chunk__38435_38446;
var G__38452 = count__38436_38447;
var G__38453 = (i__38437_38448 + (1));
seq__38434_38445 = G__38450;
chunk__38435_38446 = G__38451;
count__38436_38447 = G__38452;
i__38437_38448 = G__38453;
continue;
} else {
var temp__5457__auto___38454 = cljs.core.seq.call(null,seq__38434_38445);
if(temp__5457__auto___38454){
var seq__38434_38455__$1 = temp__5457__auto___38454;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__38434_38455__$1)){
var c__31091__auto___38456 = cljs.core.chunk_first.call(null,seq__38434_38455__$1);
var G__38457 = cljs.core.chunk_rest.call(null,seq__38434_38455__$1);
var G__38458 = c__31091__auto___38456;
var G__38459 = cljs.core.count.call(null,c__31091__auto___38456);
var G__38460 = (0);
seq__38434_38445 = G__38457;
chunk__38435_38446 = G__38458;
count__38436_38447 = G__38459;
i__38437_38448 = G__38460;
continue;
} else {
var k_38461 = cljs.core.first.call(null,seq__38434_38455__$1);
e.setAttribute(cljs.core.name.call(null,k_38461),cljs.core.get.call(null,attrs,k_38461));

var G__38462 = cljs.core.next.call(null,seq__38434_38455__$1);
var G__38463 = null;
var G__38464 = (0);
var G__38465 = (0);
seq__38434_38445 = G__38462;
chunk__38435_38446 = G__38463;
count__38436_38447 = G__38464;
i__38437_38448 = G__38465;
continue;
}
} else {
}
}
break;
}

var seq__38438_38466 = cljs.core.seq.call(null,children);
var chunk__38439_38467 = null;
var count__38440_38468 = (0);
var i__38441_38469 = (0);
while(true){
if((i__38441_38469 < count__38440_38468)){
var ch_38470 = cljs.core._nth.call(null,chunk__38439_38467,i__38441_38469);
e.appendChild(ch_38470);

var G__38471 = seq__38438_38466;
var G__38472 = chunk__38439_38467;
var G__38473 = count__38440_38468;
var G__38474 = (i__38441_38469 + (1));
seq__38438_38466 = G__38471;
chunk__38439_38467 = G__38472;
count__38440_38468 = G__38473;
i__38441_38469 = G__38474;
continue;
} else {
var temp__5457__auto___38475 = cljs.core.seq.call(null,seq__38438_38466);
if(temp__5457__auto___38475){
var seq__38438_38476__$1 = temp__5457__auto___38475;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__38438_38476__$1)){
var c__31091__auto___38477 = cljs.core.chunk_first.call(null,seq__38438_38476__$1);
var G__38478 = cljs.core.chunk_rest.call(null,seq__38438_38476__$1);
var G__38479 = c__31091__auto___38477;
var G__38480 = cljs.core.count.call(null,c__31091__auto___38477);
var G__38481 = (0);
seq__38438_38466 = G__38478;
chunk__38439_38467 = G__38479;
count__38440_38468 = G__38480;
i__38441_38469 = G__38481;
continue;
} else {
var ch_38482 = cljs.core.first.call(null,seq__38438_38476__$1);
e.appendChild(ch_38482);

var G__38483 = cljs.core.next.call(null,seq__38438_38476__$1);
var G__38484 = null;
var G__38485 = (0);
var G__38486 = (0);
seq__38438_38466 = G__38483;
chunk__38439_38467 = G__38484;
count__38440_38468 = G__38485;
i__38441_38469 = G__38486;
continue;
}
} else {
}
}
break;
}

return e;
});

figwheel.client.heads_up.node.cljs$lang$maxFixedArity = (2);

figwheel.client.heads_up.node.cljs$lang$applyTo = (function (seq38431){
var G__38432 = cljs.core.first.call(null,seq38431);
var seq38431__$1 = cljs.core.next.call(null,seq38431);
var G__38433 = cljs.core.first.call(null,seq38431__$1);
var seq38431__$2 = cljs.core.next.call(null,seq38431__$1);
return figwheel.client.heads_up.node.cljs$core$IFn$_invoke$arity$variadic(G__38432,G__38433,seq38431__$2);
});

if(typeof figwheel.client.heads_up.heads_up_event_dispatch !== 'undefined'){
} else {
figwheel.client.heads_up.heads_up_event_dispatch = (function (){var method_table__31216__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var prefer_table__31217__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var method_cache__31218__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var cached_hierarchy__31219__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var hierarchy__31220__auto__ = cljs.core.get.call(null,cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"hierarchy","hierarchy",-1053470341),cljs.core.get_global_hierarchy.call(null));
return (new cljs.core.MultiFn(cljs.core.symbol.call(null,"figwheel.client.heads-up","heads-up-event-dispatch"),((function (method_table__31216__auto__,prefer_table__31217__auto__,method_cache__31218__auto__,cached_hierarchy__31219__auto__,hierarchy__31220__auto__){
return (function (dataset){
return dataset.figwheelEvent;
});})(method_table__31216__auto__,prefer_table__31217__auto__,method_cache__31218__auto__,cached_hierarchy__31219__auto__,hierarchy__31220__auto__))
,new cljs.core.Keyword(null,"default","default",-1987822328),hierarchy__31220__auto__,method_table__31216__auto__,prefer_table__31217__auto__,method_cache__31218__auto__,cached_hierarchy__31219__auto__));
})();
}
cljs.core._add_method.call(null,figwheel.client.heads_up.heads_up_event_dispatch,new cljs.core.Keyword(null,"default","default",-1987822328),(function (_){
return cljs.core.PersistentArrayMap.EMPTY;
}));
cljs.core._add_method.call(null,figwheel.client.heads_up.heads_up_event_dispatch,"file-selected",(function (dataset){
return figwheel.client.socket.send_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"figwheel-event","figwheel-event",519570592),"file-selected",new cljs.core.Keyword(null,"file-name","file-name",-1654217259),dataset.fileName,new cljs.core.Keyword(null,"file-line","file-line",-1228823138),dataset.fileLine,new cljs.core.Keyword(null,"file-column","file-column",1543934780),dataset.fileColumn], null));
}));
cljs.core._add_method.call(null,figwheel.client.heads_up.heads_up_event_dispatch,"close-heads-up",(function (dataset){
return figwheel.client.heads_up.clear.call(null);
}));
figwheel.client.heads_up.ancestor_nodes = (function figwheel$client$heads_up$ancestor_nodes(el){
return cljs.core.iterate.call(null,(function (e){
return e.parentNode;
}),el);
});
figwheel.client.heads_up.get_dataset = (function figwheel$client$heads_up$get_dataset(el){
return cljs.core.first.call(null,cljs.core.keep.call(null,(function (x){
if(cljs.core.truth_(x.dataset.figwheelEvent)){
return x.dataset;
} else {
return null;
}
}),cljs.core.take.call(null,(4),figwheel.client.heads_up.ancestor_nodes.call(null,el))));
});
figwheel.client.heads_up.heads_up_onclick_handler = (function figwheel$client$heads_up$heads_up_onclick_handler(event){
var dataset = figwheel.client.heads_up.get_dataset.call(null,event.target);
event.preventDefault();

if(cljs.core.truth_(dataset)){
return figwheel.client.heads_up.heads_up_event_dispatch.call(null,dataset);
} else {
return null;
}
});
figwheel.client.heads_up.ensure_container = (function figwheel$client$heads_up$ensure_container(){
var cont_id = "figwheel-heads-up-container";
var content_id = "figwheel-heads-up-content-area";
if(cljs.core.not.call(null,document.querySelector(["#",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cont_id)].join('')))){
var el_38487 = figwheel.client.heads_up.node.call(null,new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"id","id",-1388402092),cont_id,new cljs.core.Keyword(null,"style","style",-496642736),["-webkit-transition: all 0.2s ease-in-out;","-moz-transition: all 0.2s ease-in-out;","-o-transition: all 0.2s ease-in-out;","transition: all 0.2s ease-in-out;","font-size: 13px;","border-top: 1px solid #f5f5f5;","box-shadow: 0px 0px 1px #aaaaaa;","line-height: 18px;","color: #333;","font-family: monospace;","padding: 0px 10px 0px 70px;","position: fixed;","bottom: 0px;","left: 0px;","height: 0px;","opacity: 0.0;","box-sizing: border-box;","z-index: 10000;","text-align: left;"].join('')], null));
el_38487.onclick = figwheel.client.heads_up.heads_up_onclick_handler;

el_38487.innerHTML = figwheel.client.heads_up.cljs_logo_svg;

el_38487.appendChild(figwheel.client.heads_up.node.call(null,new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"id","id",-1388402092),content_id], null)));

document.body.appendChild(el_38487);
} else {
}

return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"container-el","container-el",109664205),document.getElementById(cont_id),new cljs.core.Keyword(null,"content-area-el","content-area-el",742757187),document.getElementById(content_id)], null);
});
figwheel.client.heads_up.set_style_BANG_ = (function figwheel$client$heads_up$set_style_BANG_(p__38488,st_map){
var map__38489 = p__38488;
var map__38489__$1 = ((((!((map__38489 == null)))?((((map__38489.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__38489.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__38489):map__38489);
var container_el = cljs.core.get.call(null,map__38489__$1,new cljs.core.Keyword(null,"container-el","container-el",109664205));
return cljs.core.mapv.call(null,((function (map__38489,map__38489__$1,container_el){
return (function (p__38491){
var vec__38492 = p__38491;
var k = cljs.core.nth.call(null,vec__38492,(0),null);
var v = cljs.core.nth.call(null,vec__38492,(1),null);
return goog.object.set(container_el.style,cljs.core.name.call(null,k),v);
});})(map__38489,map__38489__$1,container_el))
,st_map);
});
figwheel.client.heads_up.set_content_BANG_ = (function figwheel$client$heads_up$set_content_BANG_(p__38495,dom_str){
var map__38496 = p__38495;
var map__38496__$1 = ((((!((map__38496 == null)))?((((map__38496.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__38496.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__38496):map__38496);
var c = map__38496__$1;
var content_area_el = cljs.core.get.call(null,map__38496__$1,new cljs.core.Keyword(null,"content-area-el","content-area-el",742757187));
return content_area_el.innerHTML = dom_str;
});
figwheel.client.heads_up.get_content = (function figwheel$client$heads_up$get_content(p__38498){
var map__38499 = p__38498;
var map__38499__$1 = ((((!((map__38499 == null)))?((((map__38499.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__38499.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__38499):map__38499);
var content_area_el = cljs.core.get.call(null,map__38499__$1,new cljs.core.Keyword(null,"content-area-el","content-area-el",742757187));
return content_area_el.innerHTML;
});
figwheel.client.heads_up.close_link = (function figwheel$client$heads_up$close_link(){
return ["<a style=\"","float: right;","font-size: 18px;","text-decoration: none;","text-align: right;","width: 30px;","height: 30px;","color: rgba(84,84,84, 0.5);","\" href=\"#\"  data-figwheel-event=\"close-heads-up\">","x","</a>"].join('');
});
figwheel.client.heads_up.display_heads_up = (function figwheel$client$heads_up$display_heads_up(style,msg){
var c__33248__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__33248__auto__){
return (function (){
var f__33249__auto__ = (function (){var switch__33158__auto__ = ((function (c__33248__auto__){
return (function (state_38516){
var state_val_38517 = (state_38516[(1)]);
if((state_val_38517 === (1))){
var inst_38501 = (state_38516[(7)]);
var inst_38501__$1 = figwheel.client.heads_up.ensure_container.call(null);
var inst_38502 = [new cljs.core.Keyword(null,"paddingTop","paddingTop",-1088692345),new cljs.core.Keyword(null,"paddingBottom","paddingBottom",-916694489),new cljs.core.Keyword(null,"width","width",-384071477),new cljs.core.Keyword(null,"minHeight","minHeight",-1635998980),new cljs.core.Keyword(null,"opacity","opacity",397153780)];
var inst_38503 = ["10px","10px","100%","68px","1.0"];
var inst_38504 = cljs.core.PersistentHashMap.fromArrays(inst_38502,inst_38503);
var inst_38505 = cljs.core.merge.call(null,inst_38504,style);
var inst_38506 = figwheel.client.heads_up.set_style_BANG_.call(null,inst_38501__$1,inst_38505);
var inst_38507 = figwheel.client.heads_up.set_content_BANG_.call(null,inst_38501__$1,msg);
var inst_38508 = cljs.core.async.timeout.call(null,(300));
var state_38516__$1 = (function (){var statearr_38518 = state_38516;
(statearr_38518[(7)] = inst_38501__$1);

(statearr_38518[(8)] = inst_38506);

(statearr_38518[(9)] = inst_38507);

return statearr_38518;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_38516__$1,(2),inst_38508);
} else {
if((state_val_38517 === (2))){
var inst_38501 = (state_38516[(7)]);
var inst_38510 = (state_38516[(2)]);
var inst_38511 = [new cljs.core.Keyword(null,"height","height",1025178622)];
var inst_38512 = ["auto"];
var inst_38513 = cljs.core.PersistentHashMap.fromArrays(inst_38511,inst_38512);
var inst_38514 = figwheel.client.heads_up.set_style_BANG_.call(null,inst_38501,inst_38513);
var state_38516__$1 = (function (){var statearr_38519 = state_38516;
(statearr_38519[(10)] = inst_38510);

return statearr_38519;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_38516__$1,inst_38514);
} else {
return null;
}
}
});})(c__33248__auto__))
;
return ((function (switch__33158__auto__,c__33248__auto__){
return (function() {
var figwheel$client$heads_up$display_heads_up_$_state_machine__33159__auto__ = null;
var figwheel$client$heads_up$display_heads_up_$_state_machine__33159__auto____0 = (function (){
var statearr_38520 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_38520[(0)] = figwheel$client$heads_up$display_heads_up_$_state_machine__33159__auto__);

(statearr_38520[(1)] = (1));

return statearr_38520;
});
var figwheel$client$heads_up$display_heads_up_$_state_machine__33159__auto____1 = (function (state_38516){
while(true){
var ret_value__33160__auto__ = (function (){try{while(true){
var result__33161__auto__ = switch__33158__auto__.call(null,state_38516);
if(cljs.core.keyword_identical_QMARK_.call(null,result__33161__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__33161__auto__;
}
break;
}
}catch (e38521){if((e38521 instanceof Object)){
var ex__33162__auto__ = e38521;
var statearr_38522_38524 = state_38516;
(statearr_38522_38524[(5)] = ex__33162__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_38516);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e38521;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__33160__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__38525 = state_38516;
state_38516 = G__38525;
continue;
} else {
return ret_value__33160__auto__;
}
break;
}
});
figwheel$client$heads_up$display_heads_up_$_state_machine__33159__auto__ = function(state_38516){
switch(arguments.length){
case 0:
return figwheel$client$heads_up$display_heads_up_$_state_machine__33159__auto____0.call(this);
case 1:
return figwheel$client$heads_up$display_heads_up_$_state_machine__33159__auto____1.call(this,state_38516);
}
throw(new Error('Invalid arity: ' + (arguments.length - 1)));
};
figwheel$client$heads_up$display_heads_up_$_state_machine__33159__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$heads_up$display_heads_up_$_state_machine__33159__auto____0;
figwheel$client$heads_up$display_heads_up_$_state_machine__33159__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$heads_up$display_heads_up_$_state_machine__33159__auto____1;
return figwheel$client$heads_up$display_heads_up_$_state_machine__33159__auto__;
})()
;})(switch__33158__auto__,c__33248__auto__))
})();
var state__33250__auto__ = (function (){var statearr_38523 = f__33249__auto__.call(null);
(statearr_38523[(6)] = c__33248__auto__);

return statearr_38523;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__33250__auto__);
});})(c__33248__auto__))
);

return c__33248__auto__;
});
figwheel.client.heads_up.heading = (function figwheel$client$heads_up$heading(var_args){
var G__38527 = arguments.length;
switch (G__38527) {
case 1:
return figwheel.client.heads_up.heading.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return figwheel.client.heads_up.heading.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

figwheel.client.heads_up.heading.cljs$core$IFn$_invoke$arity$1 = (function (s){
return figwheel.client.heads_up.heading.call(null,s,"");
});

figwheel.client.heads_up.heading.cljs$core$IFn$_invoke$arity$2 = (function (s,sub_head){
return ["<div style=\"","font-size: 26px;","line-height: 26px;","margin-bottom: 2px;","padding-top: 1px;","\">",cljs.core.str.cljs$core$IFn$_invoke$arity$1(s)," <span style=\"","display: inline-block;","font-size: 13px;","\">",cljs.core.str.cljs$core$IFn$_invoke$arity$1(sub_head),"</span></div>"].join('');
});

figwheel.client.heads_up.heading.cljs$lang$maxFixedArity = 2;

figwheel.client.heads_up.file_selector_div = (function figwheel$client$heads_up$file_selector_div(file_name,line_number,column_number,msg){
return ["<div style=\"cursor: pointer;\" data-figwheel-event=\"file-selected\" data-file-name=\"",cljs.core.str.cljs$core$IFn$_invoke$arity$1(file_name),"\" data-file-line=\"",cljs.core.str.cljs$core$IFn$_invoke$arity$1(line_number),"\" data-file-column=\"",cljs.core.str.cljs$core$IFn$_invoke$arity$1(column_number),"\">",cljs.core.str.cljs$core$IFn$_invoke$arity$1(msg),"</div>"].join('');
});
figwheel.client.heads_up.format_line = (function figwheel$client$heads_up$format_line(msg,p__38529){
var map__38530 = p__38529;
var map__38530__$1 = ((((!((map__38530 == null)))?((((map__38530.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__38530.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__38530):map__38530);
var file = cljs.core.get.call(null,map__38530__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
var line = cljs.core.get.call(null,map__38530__$1,new cljs.core.Keyword(null,"line","line",212345235));
var column = cljs.core.get.call(null,map__38530__$1,new cljs.core.Keyword(null,"column","column",2078222095));
var msg__$1 = goog.string.htmlEscape(msg);
if(cljs.core.truth_((function (){var or__30160__auto__ = file;
if(cljs.core.truth_(or__30160__auto__)){
return or__30160__auto__;
} else {
return line;
}
})())){
return figwheel.client.heads_up.file_selector_div.call(null,file,line,column,msg__$1);
} else {
return ["<div>",cljs.core.str.cljs$core$IFn$_invoke$arity$1(msg__$1),"</div>"].join('');
}
});
figwheel.client.heads_up.escape = (function figwheel$client$heads_up$escape(x){
return goog.string.htmlEscape(x);
});
figwheel.client.heads_up.pad_line_number = (function figwheel$client$heads_up$pad_line_number(n,line_number){
var len = cljs.core.count.call(null,cljs.core.fnil.call(null,cljs.core.str,"").call(null,line_number));
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1((((len < n))?cljs.core.apply.call(null,cljs.core.str,cljs.core.repeat.call(null,(n - len)," ")):"")),cljs.core.str.cljs$core$IFn$_invoke$arity$1(line_number)].join('');
});
figwheel.client.heads_up.inline_error_line = (function figwheel$client$heads_up$inline_error_line(style,line_number,line){
return ["<span style='",cljs.core.str.cljs$core$IFn$_invoke$arity$1(style),"'>","<span style='color: #757575;'>",cljs.core.str.cljs$core$IFn$_invoke$arity$1(line_number),"  </span>",cljs.core.str.cljs$core$IFn$_invoke$arity$1(figwheel.client.heads_up.escape.call(null,line)),"</span>"].join('');
});
figwheel.client.heads_up.format_inline_error_line = (function figwheel$client$heads_up$format_inline_error_line(p__38532){
var vec__38533 = p__38532;
var typ = cljs.core.nth.call(null,vec__38533,(0),null);
var line_number = cljs.core.nth.call(null,vec__38533,(1),null);
var line = cljs.core.nth.call(null,vec__38533,(2),null);
var pred__38536 = cljs.core._EQ_;
var expr__38537 = typ;
if(cljs.core.truth_(pred__38536.call(null,new cljs.core.Keyword(null,"code-line","code-line",-2138627853),expr__38537))){
return figwheel.client.heads_up.inline_error_line.call(null,"color: #999;",line_number,line);
} else {
if(cljs.core.truth_(pred__38536.call(null,new cljs.core.Keyword(null,"error-in-code","error-in-code",-1661931357),expr__38537))){
return figwheel.client.heads_up.inline_error_line.call(null,"color: #ccc; font-weight: bold;",line_number,line);
} else {
if(cljs.core.truth_(pred__38536.call(null,new cljs.core.Keyword(null,"error-message","error-message",1756021561),expr__38537))){
return figwheel.client.heads_up.inline_error_line.call(null,"color: #D07D7D;",line_number,line);
} else {
return figwheel.client.heads_up.inline_error_line.call(null,"color: #666;",line_number,line);
}
}
}
});
figwheel.client.heads_up.pad_line_numbers = (function figwheel$client$heads_up$pad_line_numbers(inline_error){
var max_line_number_length = cljs.core.count.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.reduce.call(null,cljs.core.max,cljs.core.map.call(null,cljs.core.second,inline_error)))].join(''));
return cljs.core.map.call(null,((function (max_line_number_length){
return (function (p1__38539_SHARP_){
return cljs.core.update_in.call(null,p1__38539_SHARP_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(1)], null),cljs.core.partial.call(null,figwheel.client.heads_up.pad_line_number,max_line_number_length));
});})(max_line_number_length))
,inline_error);
});
figwheel.client.heads_up.format_inline_error = (function figwheel$client$heads_up$format_inline_error(inline_error){
var lines = cljs.core.map.call(null,figwheel.client.heads_up.format_inline_error_line,figwheel.client.heads_up.pad_line_numbers.call(null,inline_error));
return ["<pre style='whitespace:pre; overflow-x: scroll; display:block; font-family:monospace; font-size:0.8em; border-radius: 3px;"," line-height: 1.1em; padding: 10px; background-color: rgb(24,26,38); margin-right: 5px'>",cljs.core.str.cljs$core$IFn$_invoke$arity$1(clojure.string.join.call(null,"\n",lines)),"</pre>"].join('');
});
figwheel.client.heads_up.flatten_exception = (function figwheel$client$heads_up$flatten_exception(p1__38540_SHARP_){
return cljs.core.take_while.call(null,cljs.core.some_QMARK_,cljs.core.iterate.call(null,new cljs.core.Keyword(null,"cause","cause",231901252),p1__38540_SHARP_));
});
figwheel.client.heads_up.exception__GT_display_data = (function figwheel$client$heads_up$exception__GT_display_data(p__38543){
var map__38544 = p__38543;
var map__38544__$1 = ((((!((map__38544 == null)))?((((map__38544.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__38544.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__38544):map__38544);
var exception = map__38544__$1;
var message = cljs.core.get.call(null,map__38544__$1,new cljs.core.Keyword(null,"message","message",-406056002));
var failed_loading_clj_file = cljs.core.get.call(null,map__38544__$1,new cljs.core.Keyword(null,"failed-loading-clj-file","failed-loading-clj-file",-1682536481));
var reader_exception = cljs.core.get.call(null,map__38544__$1,new cljs.core.Keyword(null,"reader-exception","reader-exception",-1938323098));
var file = cljs.core.get.call(null,map__38544__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
var column = cljs.core.get.call(null,map__38544__$1,new cljs.core.Keyword(null,"column","column",2078222095));
var failed_compiling = cljs.core.get.call(null,map__38544__$1,new cljs.core.Keyword(null,"failed-compiling","failed-compiling",1768639503));
var error_inline = cljs.core.get.call(null,map__38544__$1,new cljs.core.Keyword(null,"error-inline","error-inline",1073987185));
var line = cljs.core.get.call(null,map__38544__$1,new cljs.core.Keyword(null,"line","line",212345235));
var class$ = cljs.core.get.call(null,map__38544__$1,new cljs.core.Keyword(null,"class","class",-2030961996));
var analysis_exception = cljs.core.get.call(null,map__38544__$1,new cljs.core.Keyword(null,"analysis-exception","analysis-exception",591623285));
var display_ex_data = cljs.core.get.call(null,map__38544__$1,new cljs.core.Keyword(null,"display-ex-data","display-ex-data",-1611558730));
var last_message = (cljs.core.truth_((function (){var and__30148__auto__ = file;
if(cljs.core.truth_(and__30148__auto__)){
return line;
} else {
return and__30148__auto__;
}
})())?["Please see line ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(line)," of file ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(file)].join(''):(cljs.core.truth_(file)?["Please see ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(file)].join(''):null
));
return new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"head","head",-771383919),(cljs.core.truth_(failed_loading_clj_file)?"Couldn't load Clojure file":(cljs.core.truth_(analysis_exception)?"Could not Analyze":(cljs.core.truth_(reader_exception)?"Could not Read":(cljs.core.truth_(failed_compiling)?"Could not Compile":"Compile Exception"
)))),new cljs.core.Keyword(null,"sub-head","sub-head",1930649117),file,new cljs.core.Keyword(null,"messages","messages",345434482),cljs.core.concat.call(null,cljs.core.map.call(null,((function (last_message,map__38544,map__38544__$1,exception,message,failed_loading_clj_file,reader_exception,file,column,failed_compiling,error_inline,line,class$,analysis_exception,display_ex_data){
return (function (p1__38541_SHARP_){
return ["<div>",cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__38541_SHARP_),"</div>"].join('');
});})(last_message,map__38544,map__38544__$1,exception,message,failed_loading_clj_file,reader_exception,file,column,failed_compiling,error_inline,line,class$,analysis_exception,display_ex_data))
,(cljs.core.truth_(message)?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [[cljs.core.str.cljs$core$IFn$_invoke$arity$1((cljs.core.truth_(class$)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(figwheel.client.heads_up.escape.call(null,class$)),": "].join(''):"")),"<span style=\"font-weight:bold;\">",cljs.core.str.cljs$core$IFn$_invoke$arity$1(figwheel.client.heads_up.escape.call(null,message)),"</span>"].join(''),(cljs.core.truth_(display_ex_data)?["<pre style=\"white-space: pre-wrap\">",cljs.core.str.cljs$core$IFn$_invoke$arity$1(figwheel.client.utils.pprint_to_string.call(null,display_ex_data)),"</pre>"].join(''):null),(((cljs.core.count.call(null,error_inline) > (0)))?figwheel.client.heads_up.format_inline_error.call(null,error_inline):null)], null):cljs.core.map.call(null,((function (last_message,map__38544,map__38544__$1,exception,message,failed_loading_clj_file,reader_exception,file,column,failed_compiling,error_inline,line,class$,analysis_exception,display_ex_data){
return (function (p1__38542_SHARP_){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(figwheel.client.heads_up.escape.call(null,new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(p1__38542_SHARP_))),": ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(figwheel.client.heads_up.escape.call(null,new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(p1__38542_SHARP_)))].join('');
});})(last_message,map__38544,map__38544__$1,exception,message,failed_loading_clj_file,reader_exception,file,column,failed_compiling,error_inline,line,class$,analysis_exception,display_ex_data))
,figwheel.client.heads_up.flatten_exception.call(null,new cljs.core.Keyword(null,"exception-data","exception-data",-512474886).cljs$core$IFn$_invoke$arity$1(exception))))),(cljs.core.truth_(last_message)?new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [["<div style=\"color: #AD4F4F; padding-top: 3px;\">",cljs.core.str.cljs$core$IFn$_invoke$arity$1(figwheel.client.heads_up.escape.call(null,last_message)),"</div>"].join('')], null):null)),new cljs.core.Keyword(null,"file","file",-1269645878),file,new cljs.core.Keyword(null,"line","line",212345235),line,new cljs.core.Keyword(null,"column","column",2078222095),column], null);
});
figwheel.client.heads_up.auto_notify_source_file_line = (function figwheel$client$heads_up$auto_notify_source_file_line(p__38546){
var map__38547 = p__38546;
var map__38547__$1 = ((((!((map__38547 == null)))?((((map__38547.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__38547.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__38547):map__38547);
var file = cljs.core.get.call(null,map__38547__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
var line = cljs.core.get.call(null,map__38547__$1,new cljs.core.Keyword(null,"line","line",212345235));
var column = cljs.core.get.call(null,map__38547__$1,new cljs.core.Keyword(null,"column","column",2078222095));
return figwheel.client.socket.send_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"figwheel-event","figwheel-event",519570592),"file-selected",new cljs.core.Keyword(null,"file-name","file-name",-1654217259),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(file)].join(''),new cljs.core.Keyword(null,"file-line","file-line",-1228823138),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(line)].join(''),new cljs.core.Keyword(null,"file-column","file-column",1543934780),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(column)].join('')], null));
});
figwheel.client.heads_up.display_exception = (function figwheel$client$heads_up$display_exception(exception_data){
var map__38550 = figwheel.client.heads_up.exception__GT_display_data.call(null,exception_data);
var map__38550__$1 = ((((!((map__38550 == null)))?((((map__38550.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__38550.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__38550):map__38550);
var head = cljs.core.get.call(null,map__38550__$1,new cljs.core.Keyword(null,"head","head",-771383919));
var sub_head = cljs.core.get.call(null,map__38550__$1,new cljs.core.Keyword(null,"sub-head","sub-head",1930649117));
var messages = cljs.core.get.call(null,map__38550__$1,new cljs.core.Keyword(null,"messages","messages",345434482));
var last_message = cljs.core.get.call(null,map__38550__$1,new cljs.core.Keyword(null,"last-message","last-message",-2087778135));
var file = cljs.core.get.call(null,map__38550__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
var line = cljs.core.get.call(null,map__38550__$1,new cljs.core.Keyword(null,"line","line",212345235));
var column = cljs.core.get.call(null,map__38550__$1,new cljs.core.Keyword(null,"column","column",2078222095));
var msg = cljs.core.apply.call(null,cljs.core.str,messages);
return figwheel.client.heads_up.display_heads_up.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"backgroundColor","backgroundColor",1738438491),"rgba(255, 161, 161, 0.95)"], null),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(figwheel.client.heads_up.close_link.call(null)),cljs.core.str.cljs$core$IFn$_invoke$arity$1(figwheel.client.heads_up.heading.call(null,head,sub_head)),cljs.core.str.cljs$core$IFn$_invoke$arity$1(figwheel.client.heads_up.file_selector_div.call(null,file,line,column,msg))].join(''));
});
figwheel.client.heads_up.warning_data__GT_display_data = (function figwheel$client$heads_up$warning_data__GT_display_data(p__38553){
var map__38554 = p__38553;
var map__38554__$1 = ((((!((map__38554 == null)))?((((map__38554.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__38554.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__38554):map__38554);
var warning_data = map__38554__$1;
var file = cljs.core.get.call(null,map__38554__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
var line = cljs.core.get.call(null,map__38554__$1,new cljs.core.Keyword(null,"line","line",212345235));
var column = cljs.core.get.call(null,map__38554__$1,new cljs.core.Keyword(null,"column","column",2078222095));
var message = cljs.core.get.call(null,map__38554__$1,new cljs.core.Keyword(null,"message","message",-406056002));
var error_inline = cljs.core.get.call(null,map__38554__$1,new cljs.core.Keyword(null,"error-inline","error-inline",1073987185));
var last_message = (cljs.core.truth_((function (){var and__30148__auto__ = file;
if(cljs.core.truth_(and__30148__auto__)){
return line;
} else {
return and__30148__auto__;
}
})())?["Please see line ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(line)," of file ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(file)].join(''):(cljs.core.truth_(file)?["Please see ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(file)].join(''):null
));
return new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"head","head",-771383919),"Compile Warning",new cljs.core.Keyword(null,"sub-head","sub-head",1930649117),file,new cljs.core.Keyword(null,"messages","messages",345434482),cljs.core.concat.call(null,cljs.core.map.call(null,((function (last_message,map__38554,map__38554__$1,warning_data,file,line,column,message,error_inline){
return (function (p1__38552_SHARP_){
return ["<div>",cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__38552_SHARP_),"</div>"].join('');
});})(last_message,map__38554,map__38554__$1,warning_data,file,line,column,message,error_inline))
,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(cljs.core.truth_(message)?["<span style=\"font-weight:bold;\">",cljs.core.str.cljs$core$IFn$_invoke$arity$1(figwheel.client.heads_up.escape.call(null,message)),"</span>"].join(''):null),(((cljs.core.count.call(null,error_inline) > (0)))?figwheel.client.heads_up.format_inline_error.call(null,error_inline):null)], null)),(cljs.core.truth_(last_message)?new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [["<div style=\"color: #AD4F4F; padding-top: 3px; margin-bottom: 10px;\">",cljs.core.str.cljs$core$IFn$_invoke$arity$1(figwheel.client.heads_up.escape.call(null,last_message)),"</div>"].join('')], null):null)),new cljs.core.Keyword(null,"file","file",-1269645878),file,new cljs.core.Keyword(null,"line","line",212345235),line,new cljs.core.Keyword(null,"column","column",2078222095),column], null);
});
figwheel.client.heads_up.display_system_warning = (function figwheel$client$heads_up$display_system_warning(header,msg){
return figwheel.client.heads_up.display_heads_up.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"backgroundColor","backgroundColor",1738438491),"rgba(255, 220, 110, 0.95)"], null),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(figwheel.client.heads_up.close_link.call(null)),cljs.core.str.cljs$core$IFn$_invoke$arity$1(figwheel.client.heads_up.heading.call(null,header)),"<div>",cljs.core.str.cljs$core$IFn$_invoke$arity$1(msg),"</div>"].join(''));
});
figwheel.client.heads_up.display_warning = (function figwheel$client$heads_up$display_warning(warning_data){
var map__38556 = figwheel.client.heads_up.warning_data__GT_display_data.call(null,warning_data);
var map__38556__$1 = ((((!((map__38556 == null)))?((((map__38556.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__38556.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__38556):map__38556);
var head = cljs.core.get.call(null,map__38556__$1,new cljs.core.Keyword(null,"head","head",-771383919));
var sub_head = cljs.core.get.call(null,map__38556__$1,new cljs.core.Keyword(null,"sub-head","sub-head",1930649117));
var messages = cljs.core.get.call(null,map__38556__$1,new cljs.core.Keyword(null,"messages","messages",345434482));
var last_message = cljs.core.get.call(null,map__38556__$1,new cljs.core.Keyword(null,"last-message","last-message",-2087778135));
var file = cljs.core.get.call(null,map__38556__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
var line = cljs.core.get.call(null,map__38556__$1,new cljs.core.Keyword(null,"line","line",212345235));
var column = cljs.core.get.call(null,map__38556__$1,new cljs.core.Keyword(null,"column","column",2078222095));
var msg = cljs.core.apply.call(null,cljs.core.str,messages);
return figwheel.client.heads_up.display_heads_up.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"backgroundColor","backgroundColor",1738438491),"rgba(255, 220, 110, 0.95)"], null),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(figwheel.client.heads_up.close_link.call(null)),cljs.core.str.cljs$core$IFn$_invoke$arity$1(figwheel.client.heads_up.heading.call(null,head,sub_head)),cljs.core.str.cljs$core$IFn$_invoke$arity$1(figwheel.client.heads_up.file_selector_div.call(null,file,line,column,msg))].join(''));
});
figwheel.client.heads_up.format_warning_message = (function figwheel$client$heads_up$format_warning_message(p__38558){
var map__38559 = p__38558;
var map__38559__$1 = ((((!((map__38559 == null)))?((((map__38559.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__38559.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__38559):map__38559);
var warning_data = map__38559__$1;
var message = cljs.core.get.call(null,map__38559__$1,new cljs.core.Keyword(null,"message","message",-406056002));
var file = cljs.core.get.call(null,map__38559__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
var line = cljs.core.get.call(null,map__38559__$1,new cljs.core.Keyword(null,"line","line",212345235));
var column = cljs.core.get.call(null,map__38559__$1,new cljs.core.Keyword(null,"column","column",2078222095));
var G__38561 = message;
var G__38561__$1 = (cljs.core.truth_(line)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__38561)," at line ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(line)].join(''):G__38561);
var G__38561__$2 = (cljs.core.truth_((function (){var and__30148__auto__ = line;
if(cljs.core.truth_(and__30148__auto__)){
return column;
} else {
return and__30148__auto__;
}
})())?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__38561__$1),", column ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(column)].join(''):G__38561__$1);
if(cljs.core.truth_(file)){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__38561__$2)," in file ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(file)].join('');
} else {
return G__38561__$2;
}
});
figwheel.client.heads_up.append_warning_message = (function figwheel$client$heads_up$append_warning_message(p__38562){
var map__38563 = p__38562;
var map__38563__$1 = ((((!((map__38563 == null)))?((((map__38563.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__38563.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__38563):map__38563);
var warning_data = map__38563__$1;
var message = cljs.core.get.call(null,map__38563__$1,new cljs.core.Keyword(null,"message","message",-406056002));
var file = cljs.core.get.call(null,map__38563__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
var line = cljs.core.get.call(null,map__38563__$1,new cljs.core.Keyword(null,"line","line",212345235));
var column = cljs.core.get.call(null,map__38563__$1,new cljs.core.Keyword(null,"column","column",2078222095));
if(cljs.core.truth_(message)){
var map__38565 = figwheel.client.heads_up.ensure_container.call(null);
var map__38565__$1 = ((((!((map__38565 == null)))?((((map__38565.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__38565.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__38565):map__38565);
var content_area_el = cljs.core.get.call(null,map__38565__$1,new cljs.core.Keyword(null,"content-area-el","content-area-el",742757187));
var el = goog.dom.createElement("div");
var child_count = goog.dom.getChildren(content_area_el).length;
if((child_count < (6))){
el.innerHTML = figwheel.client.heads_up.format_line.call(null,figwheel.client.heads_up.format_warning_message.call(null,warning_data),warning_data);

return goog.dom.append(content_area_el,el);
} else {
var temp__5457__auto__ = goog.dom.getLastElementChild(content_area_el);
if(cljs.core.truth_(temp__5457__auto__)){
var last_child = temp__5457__auto__;
var temp__5455__auto__ = goog.dom.dataset.get(last_child,"figwheel_count");
if(cljs.core.truth_(temp__5455__auto__)){
var message_count = temp__5455__auto__;
var message_count__$1 = (parseInt(message_count) + (1));
goog.dom.dataset.set(last_child,"figwheel_count",message_count__$1);

return last_child.innerHTML = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(message_count__$1)," more warnings have not been displayed ..."].join('');
} else {
return goog.dom.append(content_area_el,goog.dom.createDom("div",({"data-figwheel_count": (1), "style": "margin-top: 3px; font-weight: bold"}),"1 more warning that has not been displayed ..."));
}
} else {
return null;
}
}
} else {
return null;
}
});
figwheel.client.heads_up.clear = (function figwheel$client$heads_up$clear(){
var c__33248__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__33248__auto__){
return (function (){
var f__33249__auto__ = (function (){var switch__33158__auto__ = ((function (c__33248__auto__){
return (function (state_38584){
var state_val_38585 = (state_38584[(1)]);
if((state_val_38585 === (1))){
var inst_38567 = (state_38584[(7)]);
var inst_38567__$1 = figwheel.client.heads_up.ensure_container.call(null);
var inst_38568 = [new cljs.core.Keyword(null,"opacity","opacity",397153780)];
var inst_38569 = ["0.0"];
var inst_38570 = cljs.core.PersistentHashMap.fromArrays(inst_38568,inst_38569);
var inst_38571 = figwheel.client.heads_up.set_style_BANG_.call(null,inst_38567__$1,inst_38570);
var inst_38572 = cljs.core.async.timeout.call(null,(300));
var state_38584__$1 = (function (){var statearr_38586 = state_38584;
(statearr_38586[(8)] = inst_38571);

(statearr_38586[(7)] = inst_38567__$1);

return statearr_38586;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_38584__$1,(2),inst_38572);
} else {
if((state_val_38585 === (2))){
var inst_38567 = (state_38584[(7)]);
var inst_38574 = (state_38584[(2)]);
var inst_38575 = [new cljs.core.Keyword(null,"width","width",-384071477),new cljs.core.Keyword(null,"height","height",1025178622),new cljs.core.Keyword(null,"minHeight","minHeight",-1635998980),new cljs.core.Keyword(null,"padding","padding",1660304693),new cljs.core.Keyword(null,"borderRadius","borderRadius",-1505621083),new cljs.core.Keyword(null,"backgroundColor","backgroundColor",1738438491)];
var inst_38576 = ["auto","0px","0px","0px 10px 0px 70px","0px","transparent"];
var inst_38577 = cljs.core.PersistentHashMap.fromArrays(inst_38575,inst_38576);
var inst_38578 = figwheel.client.heads_up.set_style_BANG_.call(null,inst_38567,inst_38577);
var inst_38579 = cljs.core.async.timeout.call(null,(200));
var state_38584__$1 = (function (){var statearr_38587 = state_38584;
(statearr_38587[(9)] = inst_38574);

(statearr_38587[(10)] = inst_38578);

return statearr_38587;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_38584__$1,(3),inst_38579);
} else {
if((state_val_38585 === (3))){
var inst_38567 = (state_38584[(7)]);
var inst_38581 = (state_38584[(2)]);
var inst_38582 = figwheel.client.heads_up.set_content_BANG_.call(null,inst_38567,"");
var state_38584__$1 = (function (){var statearr_38588 = state_38584;
(statearr_38588[(11)] = inst_38581);

return statearr_38588;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_38584__$1,inst_38582);
} else {
return null;
}
}
}
});})(c__33248__auto__))
;
return ((function (switch__33158__auto__,c__33248__auto__){
return (function() {
var figwheel$client$heads_up$clear_$_state_machine__33159__auto__ = null;
var figwheel$client$heads_up$clear_$_state_machine__33159__auto____0 = (function (){
var statearr_38589 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_38589[(0)] = figwheel$client$heads_up$clear_$_state_machine__33159__auto__);

(statearr_38589[(1)] = (1));

return statearr_38589;
});
var figwheel$client$heads_up$clear_$_state_machine__33159__auto____1 = (function (state_38584){
while(true){
var ret_value__33160__auto__ = (function (){try{while(true){
var result__33161__auto__ = switch__33158__auto__.call(null,state_38584);
if(cljs.core.keyword_identical_QMARK_.call(null,result__33161__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__33161__auto__;
}
break;
}
}catch (e38590){if((e38590 instanceof Object)){
var ex__33162__auto__ = e38590;
var statearr_38591_38593 = state_38584;
(statearr_38591_38593[(5)] = ex__33162__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_38584);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e38590;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__33160__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__38594 = state_38584;
state_38584 = G__38594;
continue;
} else {
return ret_value__33160__auto__;
}
break;
}
});
figwheel$client$heads_up$clear_$_state_machine__33159__auto__ = function(state_38584){
switch(arguments.length){
case 0:
return figwheel$client$heads_up$clear_$_state_machine__33159__auto____0.call(this);
case 1:
return figwheel$client$heads_up$clear_$_state_machine__33159__auto____1.call(this,state_38584);
}
throw(new Error('Invalid arity: ' + (arguments.length - 1)));
};
figwheel$client$heads_up$clear_$_state_machine__33159__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$heads_up$clear_$_state_machine__33159__auto____0;
figwheel$client$heads_up$clear_$_state_machine__33159__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$heads_up$clear_$_state_machine__33159__auto____1;
return figwheel$client$heads_up$clear_$_state_machine__33159__auto__;
})()
;})(switch__33158__auto__,c__33248__auto__))
})();
var state__33250__auto__ = (function (){var statearr_38592 = f__33249__auto__.call(null);
(statearr_38592[(6)] = c__33248__auto__);

return statearr_38592;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__33250__auto__);
});})(c__33248__auto__))
);

return c__33248__auto__;
});
figwheel.client.heads_up.display_loaded_start = (function figwheel$client$heads_up$display_loaded_start(){
return figwheel.client.heads_up.display_heads_up.call(null,new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"backgroundColor","backgroundColor",1738438491),"rgba(211,234,172,1.0)",new cljs.core.Keyword(null,"width","width",-384071477),"68px",new cljs.core.Keyword(null,"height","height",1025178622),"68px",new cljs.core.Keyword(null,"paddingLeft","paddingLeft",262720813),"0px",new cljs.core.Keyword(null,"paddingRight","paddingRight",-1642313463),"0px",new cljs.core.Keyword(null,"borderRadius","borderRadius",-1505621083),"35px"], null),"");
});
figwheel.client.heads_up.flash_loaded = (function figwheel$client$heads_up$flash_loaded(){
var c__33248__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__33248__auto__){
return (function (){
var f__33249__auto__ = (function (){var switch__33158__auto__ = ((function (c__33248__auto__){
return (function (state_38605){
var state_val_38606 = (state_38605[(1)]);
if((state_val_38606 === (1))){
var inst_38595 = figwheel.client.heads_up.display_loaded_start.call(null);
var state_38605__$1 = state_38605;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_38605__$1,(2),inst_38595);
} else {
if((state_val_38606 === (2))){
var inst_38597 = (state_38605[(2)]);
var inst_38598 = cljs.core.async.timeout.call(null,(400));
var state_38605__$1 = (function (){var statearr_38607 = state_38605;
(statearr_38607[(7)] = inst_38597);

return statearr_38607;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_38605__$1,(3),inst_38598);
} else {
if((state_val_38606 === (3))){
var inst_38600 = (state_38605[(2)]);
var inst_38601 = figwheel.client.heads_up.clear.call(null);
var state_38605__$1 = (function (){var statearr_38608 = state_38605;
(statearr_38608[(8)] = inst_38600);

return statearr_38608;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_38605__$1,(4),inst_38601);
} else {
if((state_val_38606 === (4))){
var inst_38603 = (state_38605[(2)]);
var state_38605__$1 = state_38605;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_38605__$1,inst_38603);
} else {
return null;
}
}
}
}
});})(c__33248__auto__))
;
return ((function (switch__33158__auto__,c__33248__auto__){
return (function() {
var figwheel$client$heads_up$flash_loaded_$_state_machine__33159__auto__ = null;
var figwheel$client$heads_up$flash_loaded_$_state_machine__33159__auto____0 = (function (){
var statearr_38609 = [null,null,null,null,null,null,null,null,null];
(statearr_38609[(0)] = figwheel$client$heads_up$flash_loaded_$_state_machine__33159__auto__);

(statearr_38609[(1)] = (1));

return statearr_38609;
});
var figwheel$client$heads_up$flash_loaded_$_state_machine__33159__auto____1 = (function (state_38605){
while(true){
var ret_value__33160__auto__ = (function (){try{while(true){
var result__33161__auto__ = switch__33158__auto__.call(null,state_38605);
if(cljs.core.keyword_identical_QMARK_.call(null,result__33161__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__33161__auto__;
}
break;
}
}catch (e38610){if((e38610 instanceof Object)){
var ex__33162__auto__ = e38610;
var statearr_38611_38613 = state_38605;
(statearr_38611_38613[(5)] = ex__33162__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_38605);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e38610;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__33160__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__38614 = state_38605;
state_38605 = G__38614;
continue;
} else {
return ret_value__33160__auto__;
}
break;
}
});
figwheel$client$heads_up$flash_loaded_$_state_machine__33159__auto__ = function(state_38605){
switch(arguments.length){
case 0:
return figwheel$client$heads_up$flash_loaded_$_state_machine__33159__auto____0.call(this);
case 1:
return figwheel$client$heads_up$flash_loaded_$_state_machine__33159__auto____1.call(this,state_38605);
}
throw(new Error('Invalid arity: ' + (arguments.length - 1)));
};
figwheel$client$heads_up$flash_loaded_$_state_machine__33159__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$heads_up$flash_loaded_$_state_machine__33159__auto____0;
figwheel$client$heads_up$flash_loaded_$_state_machine__33159__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$heads_up$flash_loaded_$_state_machine__33159__auto____1;
return figwheel$client$heads_up$flash_loaded_$_state_machine__33159__auto__;
})()
;})(switch__33158__auto__,c__33248__auto__))
})();
var state__33250__auto__ = (function (){var statearr_38612 = f__33249__auto__.call(null);
(statearr_38612[(6)] = c__33248__auto__);

return statearr_38612;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__33250__auto__);
});})(c__33248__auto__))
);

return c__33248__auto__;
});
figwheel.client.heads_up.cljs_logo_svg = "<?xml version='1.0' encoding='utf-8'?>\n<!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'>\n<svg width='49px' height='49px' style='position:absolute; top:9px; left: 10px;' version='1.1'\n  xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px'\n  viewBox='0 0 428 428' enable-background='new 0 0 428 428' xml:space='preserve'>\n<circle fill='#fff' cx='213' cy='214' r='213' />\n<g>\n<path fill='#96CA4B' d='M122,266.6c-12.7,0-22.3-3.7-28.9-11.1c-6.6-7.4-9.9-18-9.9-31.8c0-14.1,3.4-24.9,10.3-32.5\n  s16.8-11.4,29.9-11.4c8.8,0,16.8,1.6,23.8,4.9l-5.4,14.3c-7.5-2.9-13.7-4.4-18.6-4.4c-14.5,0-21.7,9.6-21.7,28.8\n  c0,9.4,1.8,16.4,5.4,21.2c3.6,4.7,8.9,7.1,15.9,7.1c7.9,0,15.4-2,22.5-5.9v15.5c-3.2,1.9-6.6,3.2-10.2,4\n  C131.5,266.2,127.1,266.6,122,266.6z'/>\n<path fill='#96CA4B' d='M194.4,265.1h-17.8V147.3h17.8V265.1z'/>\n<path fill='#5F7FBF' d='M222.9,302.3c-5.3,0-9.8-0.6-13.3-1.9v-14.1c3.4,0.9,6.9,1.4,10.5,1.4c7.6,0,11.4-4.3,11.4-12.9v-93.5h17.8\n  v94.7c0,8.6-2.3,15.2-6.8,19.6C237.9,300.1,231.4,302.3,222.9,302.3z M230.4,159.2c0-3.2,0.9-5.6,2.6-7.3c1.7-1.7,4.2-2.6,7.5-2.6\n  c3.1,0,5.6,0.9,7.3,2.6c1.7,1.7,2.6,4.2,2.6,7.3c0,3-0.9,5.4-2.6,7.2c-1.7,1.7-4.2,2.6-7.3,2.6c-3.2,0-5.7-0.9-7.5-2.6\n  C231.2,164.6,230.4,162.2,230.4,159.2z'/>\n<path fill='#5F7FBF' d='M342.5,241.3c0,8.2-3,14.4-8.9,18.8c-6,4.4-14.5,6.5-25.6,6.5c-11.2,0-20.1-1.7-26.9-5.1v-15.4\n  c9.8,4.5,19,6.8,27.5,6.8c10.9,0,16.4-3.3,16.4-9.9c0-2.1-0.6-3.9-1.8-5.3c-1.2-1.4-3.2-2.9-6-4.4c-2.8-1.5-6.6-3.2-11.6-5.1\n  c-9.6-3.7-16.2-7.5-19.6-11.2c-3.4-3.7-5.1-8.6-5.1-14.5c0-7.2,2.9-12.7,8.7-16.7c5.8-4,13.6-5.9,23.6-5.9c9.8,0,19.1,2,27.9,6\n  l-5.8,13.4c-9-3.7-16.6-5.6-22.8-5.6c-9.4,0-14.1,2.7-14.1,8c0,2.6,1.2,4.8,3.7,6.7c2.4,1.8,7.8,4.3,16,7.5\n  c6.9,2.7,11.9,5.1,15.1,7.3c3.1,2.2,5.4,4.8,7,7.7C341.7,233.7,342.5,237.2,342.5,241.3z'/>\n</g>\n<path fill='#96CA4B' stroke='#96CA4B' stroke-width='6' stroke-miterlimit='10' d='M197,392.7c-91.2-8.1-163-85-163-178.3\n  S105.8,44.3,197,36.2V16.1c-102.3,8.2-183,94-183,198.4s80.7,190.2,183,198.4V392.7z'/>\n<path fill='#5F7FBF' stroke='#5F7FBF' stroke-width='6' stroke-miterlimit='10' d='M229,16.1v20.1c91.2,8.1,163,85,163,178.3\n  s-71.8,170.2-163,178.3v20.1c102.3-8.2,183-94,183-198.4S331.3,24.3,229,16.1z'/>\n</svg>";
figwheel.client.heads_up.close_bad_compile_screen = (function figwheel$client$heads_up$close_bad_compile_screen(){
var temp__5457__auto__ = document.getElementById("figwheelFailScreen");
if(cljs.core.truth_(temp__5457__auto__)){
var el = temp__5457__auto__;
return goog.dom.removeNode(el);
} else {
return null;
}
});
figwheel.client.heads_up.bad_compile_screen = (function figwheel$client$heads_up$bad_compile_screen(){
var body = (goog.dom.getElementsByTagNameAndClass("body")[(0)]);
figwheel.client.heads_up.close_bad_compile_screen.call(null);

return goog.dom.append(body,goog.dom.createDom("div",({"id": "figwheelFailScreen", "style": ["background-color: rgba(24, 26, 38, 0.95);","position: absolute;","z-index: 9000;","width: 100vw;","height: 100vh;","top: 0px; left: 0px;","font-family: monospace"].join('')}),goog.dom.createDom("div",({"class": "message", "style": ["color: #FFF5DB;","width: 100vw;","margin: auto;","margin-top: 10px;","text-align: center; ","padding: 2px 0px;","font-size: 13px;","position: relative"].join('')}),goog.dom.createDom("a",({"onclick": ((function (body){
return (function (e){
e.preventDefault();

return figwheel.client.heads_up.close_bad_compile_screen.call(null);
});})(body))
, "href": "javascript:", "style": "position: absolute; right: 10px; top: 10px; color: #666"}),"X"),goog.dom.createDom("h2",({"style": "color: #FFF5DB"}),"Figwheel Says: Your code didn't compile."),goog.dom.createDom("div",({"style": "font-size: 12px"}),goog.dom.createDom("p",({"style": "color: #D07D7D;"}),"Keep trying. This page will auto-refresh when your code compiles successfully.")))));
});

//# sourceMappingURL=heads_up.js.map?rel=1540594460390
