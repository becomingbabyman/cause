// Compiled by ClojureScript 1.9.946 {}
goog.provide('cljs.core.async');
goog.require('cljs.core');
goog.require('cljs.core.async.impl.protocols');
goog.require('cljs.core.async.impl.channels');
goog.require('cljs.core.async.impl.buffers');
goog.require('cljs.core.async.impl.timers');
goog.require('cljs.core.async.impl.dispatch');
goog.require('cljs.core.async.impl.ioc_helpers');
cljs.core.async.fn_handler = (function cljs$core$async$fn_handler(var_args){
var G__33308 = arguments.length;
switch (G__33308) {
case 1:
return cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1 = (function (f){
return cljs.core.async.fn_handler.call(null,f,true);
});

cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2 = (function (f,blockable){
if(typeof cljs.core.async.t_cljs$core$async33309 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async33309 = (function (f,blockable,meta33310){
this.f = f;
this.blockable = blockable;
this.meta33310 = meta33310;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
cljs.core.async.t_cljs$core$async33309.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_33311,meta33310__$1){
var self__ = this;
var _33311__$1 = this;
return (new cljs.core.async.t_cljs$core$async33309(self__.f,self__.blockable,meta33310__$1));
});

cljs.core.async.t_cljs$core$async33309.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_33311){
var self__ = this;
var _33311__$1 = this;
return self__.meta33310;
});

cljs.core.async.t_cljs$core$async33309.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL;

cljs.core.async.t_cljs$core$async33309.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
});

cljs.core.async.t_cljs$core$async33309.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.blockable;
});

cljs.core.async.t_cljs$core$async33309.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.f;
});

cljs.core.async.t_cljs$core$async33309.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"blockable","blockable",-28395259,null),new cljs.core.Symbol(null,"meta33310","meta33310",-596473883,null)], null);
});

cljs.core.async.t_cljs$core$async33309.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async33309.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async33309";

cljs.core.async.t_cljs$core$async33309.cljs$lang$ctorPrWriter = (function (this__30831__auto__,writer__30832__auto__,opt__30833__auto__){
return cljs.core._write.call(null,writer__30832__auto__,"cljs.core.async/t_cljs$core$async33309");
});

cljs.core.async.__GT_t_cljs$core$async33309 = (function cljs$core$async$__GT_t_cljs$core$async33309(f__$1,blockable__$1,meta33310){
return (new cljs.core.async.t_cljs$core$async33309(f__$1,blockable__$1,meta33310));
});

}

return (new cljs.core.async.t_cljs$core$async33309(f,blockable,cljs.core.PersistentArrayMap.EMPTY));
});

cljs.core.async.fn_handler.cljs$lang$maxFixedArity = 2;

/**
 * Returns a fixed buffer of size n. When full, puts will block/park.
 */
cljs.core.async.buffer = (function cljs$core$async$buffer(n){
return cljs.core.async.impl.buffers.fixed_buffer.call(null,n);
});
/**
 * Returns a buffer of size n. When full, puts will complete but
 *   val will be dropped (no transfer).
 */
cljs.core.async.dropping_buffer = (function cljs$core$async$dropping_buffer(n){
return cljs.core.async.impl.buffers.dropping_buffer.call(null,n);
});
/**
 * Returns a buffer of size n. When full, puts will complete, and be
 *   buffered, but oldest elements in buffer will be dropped (not
 *   transferred).
 */
cljs.core.async.sliding_buffer = (function cljs$core$async$sliding_buffer(n){
return cljs.core.async.impl.buffers.sliding_buffer.call(null,n);
});
/**
 * Returns true if a channel created with buff will never block. That is to say,
 * puts into this buffer will never cause the buffer to be full. 
 */
cljs.core.async.unblocking_buffer_QMARK_ = (function cljs$core$async$unblocking_buffer_QMARK_(buff){
if(!((buff == null))){
if((false) || ((cljs.core.PROTOCOL_SENTINEL === buff.cljs$core$async$impl$protocols$UnblockingBuffer$))){
return true;
} else {
if((!buff.cljs$lang$protocol_mask$partition$)){
return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.async.impl.protocols.UnblockingBuffer,buff);
} else {
return false;
}
}
} else {
return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.async.impl.protocols.UnblockingBuffer,buff);
}
});
/**
 * Creates a channel with an optional buffer, an optional transducer (like (map f),
 *   (filter p) etc or a composition thereof), and an optional exception handler.
 *   If buf-or-n is a number, will create and use a fixed buffer of that size. If a
 *   transducer is supplied a buffer must be specified. ex-handler must be a
 *   fn of one argument - if an exception occurs during transformation it will be called
 *   with the thrown value as an argument, and any non-nil return value will be placed
 *   in the channel.
 */
cljs.core.async.chan = (function cljs$core$async$chan(var_args){
var G__33315 = arguments.length;
switch (G__33315) {
case 0:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0 = (function (){
return cljs.core.async.chan.call(null,null);
});

cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1 = (function (buf_or_n){
return cljs.core.async.chan.call(null,buf_or_n,null,null);
});

cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2 = (function (buf_or_n,xform){
return cljs.core.async.chan.call(null,buf_or_n,xform,null);
});

cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3 = (function (buf_or_n,xform,ex_handler){
var buf_or_n__$1 = ((cljs.core._EQ_.call(null,buf_or_n,(0)))?null:buf_or_n);
if(cljs.core.truth_(xform)){
if(cljs.core.truth_(buf_or_n__$1)){
} else {
throw (new Error(["Assert failed: ","buffer must be supplied when transducer is","\n","buf-or-n"].join('')));
}
} else {
}

return cljs.core.async.impl.channels.chan.call(null,((typeof buf_or_n__$1 === 'number')?cljs.core.async.buffer.call(null,buf_or_n__$1):buf_or_n__$1),xform,ex_handler);
});

cljs.core.async.chan.cljs$lang$maxFixedArity = 3;

/**
 * Creates a promise channel with an optional transducer, and an optional
 *   exception-handler. A promise channel can take exactly one value that consumers
 *   will receive. Once full, puts complete but val is dropped (no transfer).
 *   Consumers will block until either a value is placed in the channel or the
 *   channel is closed. See chan for the semantics of xform and ex-handler.
 */
cljs.core.async.promise_chan = (function cljs$core$async$promise_chan(var_args){
var G__33318 = arguments.length;
switch (G__33318) {
case 0:
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$0 = (function (){
return cljs.core.async.promise_chan.call(null,null);
});

cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$1 = (function (xform){
return cljs.core.async.promise_chan.call(null,xform,null);
});

cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$2 = (function (xform,ex_handler){
return cljs.core.async.chan.call(null,cljs.core.async.impl.buffers.promise_buffer.call(null),xform,ex_handler);
});

cljs.core.async.promise_chan.cljs$lang$maxFixedArity = 2;

/**
 * Returns a channel that will close after msecs
 */
cljs.core.async.timeout = (function cljs$core$async$timeout(msecs){
return cljs.core.async.impl.timers.timeout.call(null,msecs);
});
/**
 * takes a val from port. Must be called inside a (go ...) block. Will
 *   return nil if closed. Will park if nothing is available.
 *   Returns true unless port is already closed
 */
cljs.core.async._LT__BANG_ = (function cljs$core$async$_LT__BANG_(port){
throw (new Error("<! used not in (go ...) block"));
});
/**
 * Asynchronously takes a val from port, passing to fn1. Will pass nil
 * if closed. If on-caller? (default true) is true, and value is
 * immediately available, will call fn1 on calling thread.
 * Returns nil.
 */
cljs.core.async.take_BANG_ = (function cljs$core$async$take_BANG_(var_args){
var G__33321 = arguments.length;
switch (G__33321) {
case 2:
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (port,fn1){
return cljs.core.async.take_BANG_.call(null,port,fn1,true);
});

cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (port,fn1,on_caller_QMARK_){
var ret = cljs.core.async.impl.protocols.take_BANG_.call(null,port,cljs.core.async.fn_handler.call(null,fn1));
if(cljs.core.truth_(ret)){
var val_33323 = cljs.core.deref.call(null,ret);
if(cljs.core.truth_(on_caller_QMARK_)){
fn1.call(null,val_33323);
} else {
cljs.core.async.impl.dispatch.run.call(null,((function (val_33323,ret){
return (function (){
return fn1.call(null,val_33323);
});})(val_33323,ret))
);
}
} else {
}

return null;
});

cljs.core.async.take_BANG_.cljs$lang$maxFixedArity = 3;

cljs.core.async.nop = (function cljs$core$async$nop(_){
return null;
});
cljs.core.async.fhnop = cljs.core.async.fn_handler.call(null,cljs.core.async.nop);
/**
 * puts a val into port. nil values are not allowed. Must be called
 *   inside a (go ...) block. Will park if no buffer space is available.
 *   Returns true unless port is already closed.
 */
cljs.core.async._GT__BANG_ = (function cljs$core$async$_GT__BANG_(port,val){
throw (new Error(">! used not in (go ...) block"));
});
/**
 * Asynchronously puts a val into port, calling fn0 (if supplied) when
 * complete. nil values are not allowed. Will throw if closed. If
 * on-caller? (default true) is true, and the put is immediately
 * accepted, will call fn0 on calling thread.  Returns nil.
 */
cljs.core.async.put_BANG_ = (function cljs$core$async$put_BANG_(var_args){
var G__33325 = arguments.length;
switch (G__33325) {
case 2:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (port,val){
var temp__5455__auto__ = cljs.core.async.impl.protocols.put_BANG_.call(null,port,val,cljs.core.async.fhnop);
if(cljs.core.truth_(temp__5455__auto__)){
var ret = temp__5455__auto__;
return cljs.core.deref.call(null,ret);
} else {
return true;
}
});

cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (port,val,fn1){
return cljs.core.async.put_BANG_.call(null,port,val,fn1,true);
});

cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$4 = (function (port,val,fn1,on_caller_QMARK_){
var temp__5455__auto__ = cljs.core.async.impl.protocols.put_BANG_.call(null,port,val,cljs.core.async.fn_handler.call(null,fn1));
if(cljs.core.truth_(temp__5455__auto__)){
var retb = temp__5455__auto__;
var ret = cljs.core.deref.call(null,retb);
if(cljs.core.truth_(on_caller_QMARK_)){
fn1.call(null,ret);
} else {
cljs.core.async.impl.dispatch.run.call(null,((function (ret,retb,temp__5455__auto__){
return (function (){
return fn1.call(null,ret);
});})(ret,retb,temp__5455__auto__))
);
}

return ret;
} else {
return true;
}
});

cljs.core.async.put_BANG_.cljs$lang$maxFixedArity = 4;

cljs.core.async.close_BANG_ = (function cljs$core$async$close_BANG_(port){
return cljs.core.async.impl.protocols.close_BANG_.call(null,port);
});
cljs.core.async.random_array = (function cljs$core$async$random_array(n){
var a = (new Array(n));
var n__31206__auto___33327 = n;
var x_33328 = (0);
while(true){
if((x_33328 < n__31206__auto___33327)){
(a[x_33328] = (0));

var G__33329 = (x_33328 + (1));
x_33328 = G__33329;
continue;
} else {
}
break;
}

var i = (1);
while(true){
if(cljs.core._EQ_.call(null,i,n)){
return a;
} else {
var j = cljs.core.rand_int.call(null,i);
(a[i] = (a[j]));

(a[j] = i);

var G__33330 = (i + (1));
i = G__33330;
continue;
}
break;
}
});
cljs.core.async.alt_flag = (function cljs$core$async$alt_flag(){
var flag = cljs.core.atom.call(null,true);
if(typeof cljs.core.async.t_cljs$core$async33331 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async33331 = (function (flag,meta33332){
this.flag = flag;
this.meta33332 = meta33332;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
cljs.core.async.t_cljs$core$async33331.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (flag){
return (function (_33333,meta33332__$1){
var self__ = this;
var _33333__$1 = this;
return (new cljs.core.async.t_cljs$core$async33331(self__.flag,meta33332__$1));
});})(flag))
;

cljs.core.async.t_cljs$core$async33331.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (flag){
return (function (_33333){
var self__ = this;
var _33333__$1 = this;
return self__.meta33332;
});})(flag))
;

cljs.core.async.t_cljs$core$async33331.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL;

cljs.core.async.t_cljs$core$async33331.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = ((function (flag){
return (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.deref.call(null,self__.flag);
});})(flag))
;

cljs.core.async.t_cljs$core$async33331.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = ((function (flag){
return (function (_){
var self__ = this;
var ___$1 = this;
return true;
});})(flag))
;

cljs.core.async.t_cljs$core$async33331.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = ((function (flag){
return (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_.call(null,self__.flag,null);

return true;
});})(flag))
;

cljs.core.async.t_cljs$core$async33331.getBasis = ((function (flag){
return (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"meta33332","meta33332",628184575,null)], null);
});})(flag))
;

cljs.core.async.t_cljs$core$async33331.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async33331.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async33331";

cljs.core.async.t_cljs$core$async33331.cljs$lang$ctorPrWriter = ((function (flag){
return (function (this__30831__auto__,writer__30832__auto__,opt__30833__auto__){
return cljs.core._write.call(null,writer__30832__auto__,"cljs.core.async/t_cljs$core$async33331");
});})(flag))
;

cljs.core.async.__GT_t_cljs$core$async33331 = ((function (flag){
return (function cljs$core$async$alt_flag_$___GT_t_cljs$core$async33331(flag__$1,meta33332){
return (new cljs.core.async.t_cljs$core$async33331(flag__$1,meta33332));
});})(flag))
;

}

return (new cljs.core.async.t_cljs$core$async33331(flag,cljs.core.PersistentArrayMap.EMPTY));
});
cljs.core.async.alt_handler = (function cljs$core$async$alt_handler(flag,cb){
if(typeof cljs.core.async.t_cljs$core$async33334 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async33334 = (function (flag,cb,meta33335){
this.flag = flag;
this.cb = cb;
this.meta33335 = meta33335;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
cljs.core.async.t_cljs$core$async33334.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_33336,meta33335__$1){
var self__ = this;
var _33336__$1 = this;
return (new cljs.core.async.t_cljs$core$async33334(self__.flag,self__.cb,meta33335__$1));
});

cljs.core.async.t_cljs$core$async33334.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_33336){
var self__ = this;
var _33336__$1 = this;
return self__.meta33335;
});

cljs.core.async.t_cljs$core$async33334.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL;

cljs.core.async.t_cljs$core$async33334.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.active_QMARK_.call(null,self__.flag);
});

cljs.core.async.t_cljs$core$async33334.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
});

cljs.core.async.t_cljs$core$async33334.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.async.impl.protocols.commit.call(null,self__.flag);

return self__.cb;
});

cljs.core.async.t_cljs$core$async33334.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"cb","cb",-2064487928,null),new cljs.core.Symbol(null,"meta33335","meta33335",959105506,null)], null);
});

cljs.core.async.t_cljs$core$async33334.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async33334.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async33334";

cljs.core.async.t_cljs$core$async33334.cljs$lang$ctorPrWriter = (function (this__30831__auto__,writer__30832__auto__,opt__30833__auto__){
return cljs.core._write.call(null,writer__30832__auto__,"cljs.core.async/t_cljs$core$async33334");
});

cljs.core.async.__GT_t_cljs$core$async33334 = (function cljs$core$async$alt_handler_$___GT_t_cljs$core$async33334(flag__$1,cb__$1,meta33335){
return (new cljs.core.async.t_cljs$core$async33334(flag__$1,cb__$1,meta33335));
});

}

return (new cljs.core.async.t_cljs$core$async33334(flag,cb,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * returns derefable [val port] if immediate, nil if enqueued
 */
cljs.core.async.do_alts = (function cljs$core$async$do_alts(fret,ports,opts){
var flag = cljs.core.async.alt_flag.call(null);
var n = cljs.core.count.call(null,ports);
var idxs = cljs.core.async.random_array.call(null,n);
var priority = new cljs.core.Keyword(null,"priority","priority",1431093715).cljs$core$IFn$_invoke$arity$1(opts);
var ret = (function (){var i = (0);
while(true){
if((i < n)){
var idx = (cljs.core.truth_(priority)?i:(idxs[i]));
var port = cljs.core.nth.call(null,ports,idx);
var wport = ((cljs.core.vector_QMARK_.call(null,port))?port.call(null,(0)):null);
var vbox = (cljs.core.truth_(wport)?(function (){var val = port.call(null,(1));
return cljs.core.async.impl.protocols.put_BANG_.call(null,wport,val,cljs.core.async.alt_handler.call(null,flag,((function (i,val,idx,port,wport,flag,n,idxs,priority){
return (function (p1__33337_SHARP_){
return fret.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__33337_SHARP_,wport], null));
});})(i,val,idx,port,wport,flag,n,idxs,priority))
));
})():cljs.core.async.impl.protocols.take_BANG_.call(null,port,cljs.core.async.alt_handler.call(null,flag,((function (i,idx,port,wport,flag,n,idxs,priority){
return (function (p1__33338_SHARP_){
return fret.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__33338_SHARP_,port], null));
});})(i,idx,port,wport,flag,n,idxs,priority))
)));
if(cljs.core.truth_(vbox)){
return cljs.core.async.impl.channels.box.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.deref.call(null,vbox),(function (){var or__30160__auto__ = wport;
if(cljs.core.truth_(or__30160__auto__)){
return or__30160__auto__;
} else {
return port;
}
})()], null));
} else {
var G__33339 = (i + (1));
i = G__33339;
continue;
}
} else {
return null;
}
break;
}
})();
var or__30160__auto__ = ret;
if(cljs.core.truth_(or__30160__auto__)){
return or__30160__auto__;
} else {
if(cljs.core.contains_QMARK_.call(null,opts,new cljs.core.Keyword(null,"default","default",-1987822328))){
var temp__5457__auto__ = (function (){var and__30148__auto__ = cljs.core.async.impl.protocols.active_QMARK_.call(null,flag);
if(cljs.core.truth_(and__30148__auto__)){
return cljs.core.async.impl.protocols.commit.call(null,flag);
} else {
return and__30148__auto__;
}
})();
if(cljs.core.truth_(temp__5457__auto__)){
var got = temp__5457__auto__;
return cljs.core.async.impl.channels.box.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"default","default",-1987822328).cljs$core$IFn$_invoke$arity$1(opts),new cljs.core.Keyword(null,"default","default",-1987822328)], null));
} else {
return null;
}
} else {
return null;
}
}
});
/**
 * Completes at most one of several channel operations. Must be called
 * inside a (go ...) block. ports is a vector of channel endpoints,
 * which can be either a channel to take from or a vector of
 *   [channel-to-put-to val-to-put], in any combination. Takes will be
 *   made as if by <!, and puts will be made as if by >!. Unless
 *   the :priority option is true, if more than one port operation is
 *   ready a non-deterministic choice will be made. If no operation is
 *   ready and a :default value is supplied, [default-val :default] will
 *   be returned, otherwise alts! will park until the first operation to
 *   become ready completes. Returns [val port] of the completed
 *   operation, where val is the value taken for takes, and a
 *   boolean (true unless already closed, as per put!) for puts.
 * 
 *   opts are passed as :key val ... Supported options:
 * 
 *   :default val - the value to use if none of the operations are immediately ready
 *   :priority true - (default nil) when true, the operations will be tried in order.
 * 
 *   Note: there is no guarantee that the port exps or val exprs will be
 *   used, nor in what order should they be, so they should not be
 *   depended upon for side effects.
 */
cljs.core.async.alts_BANG_ = (function cljs$core$async$alts_BANG_(var_args){
var args__31447__auto__ = [];
var len__31440__auto___33345 = arguments.length;
var i__31441__auto___33346 = (0);
while(true){
if((i__31441__auto___33346 < len__31440__auto___33345)){
args__31447__auto__.push((arguments[i__31441__auto___33346]));

var G__33347 = (i__31441__auto___33346 + (1));
i__31441__auto___33346 = G__33347;
continue;
} else {
}
break;
}

var argseq__31448__auto__ = ((((1) < args__31447__auto__.length))?(new cljs.core.IndexedSeq(args__31447__auto__.slice((1)),(0),null)):null);
return cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__31448__auto__);
});

cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (ports,p__33342){
var map__33343 = p__33342;
var map__33343__$1 = ((((!((map__33343 == null)))?((((map__33343.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__33343.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__33343):map__33343);
var opts = map__33343__$1;
throw (new Error("alts! used not in (go ...) block"));
});

cljs.core.async.alts_BANG_.cljs$lang$maxFixedArity = (1);

cljs.core.async.alts_BANG_.cljs$lang$applyTo = (function (seq33340){
var G__33341 = cljs.core.first.call(null,seq33340);
var seq33340__$1 = cljs.core.next.call(null,seq33340);
return cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__33341,seq33340__$1);
});

/**
 * Puts a val into port if it's possible to do so immediately.
 *   nil values are not allowed. Never blocks. Returns true if offer succeeds.
 */
cljs.core.async.offer_BANG_ = (function cljs$core$async$offer_BANG_(port,val){
var ret = cljs.core.async.impl.protocols.put_BANG_.call(null,port,val,cljs.core.async.fn_handler.call(null,cljs.core.async.nop,false));
if(cljs.core.truth_(ret)){
return cljs.core.deref.call(null,ret);
} else {
return null;
}
});
/**
 * Takes a val from port if it's possible to do so immediately.
 *   Never blocks. Returns value if successful, nil otherwise.
 */
cljs.core.async.poll_BANG_ = (function cljs$core$async$poll_BANG_(port){
var ret = cljs.core.async.impl.protocols.take_BANG_.call(null,port,cljs.core.async.fn_handler.call(null,cljs.core.async.nop,false));
if(cljs.core.truth_(ret)){
return cljs.core.deref.call(null,ret);
} else {
return null;
}
});
/**
 * Takes elements from the from channel and supplies them to the to
 * channel. By default, the to channel will be closed when the from
 * channel closes, but can be determined by the close?  parameter. Will
 * stop consuming the from channel if the to channel closes
 */
cljs.core.async.pipe = (function cljs$core$async$pipe(var_args){
var G__33349 = arguments.length;
switch (G__33349) {
case 2:
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$2 = (function (from,to){
return cljs.core.async.pipe.call(null,from,to,true);
});

cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3 = (function (from,to,close_QMARK_){
var c__33248__auto___33395 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__33248__auto___33395){
return (function (){
var f__33249__auto__ = (function (){var switch__33158__auto__ = ((function (c__33248__auto___33395){
return (function (state_33373){
var state_val_33374 = (state_33373[(1)]);
if((state_val_33374 === (7))){
var inst_33369 = (state_33373[(2)]);
var state_33373__$1 = state_33373;
var statearr_33375_33396 = state_33373__$1;
(statearr_33375_33396[(2)] = inst_33369);

(statearr_33375_33396[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33374 === (1))){
var state_33373__$1 = state_33373;
var statearr_33376_33397 = state_33373__$1;
(statearr_33376_33397[(2)] = null);

(statearr_33376_33397[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33374 === (4))){
var inst_33352 = (state_33373[(7)]);
var inst_33352__$1 = (state_33373[(2)]);
var inst_33353 = (inst_33352__$1 == null);
var state_33373__$1 = (function (){var statearr_33377 = state_33373;
(statearr_33377[(7)] = inst_33352__$1);

return statearr_33377;
})();
if(cljs.core.truth_(inst_33353)){
var statearr_33378_33398 = state_33373__$1;
(statearr_33378_33398[(1)] = (5));

} else {
var statearr_33379_33399 = state_33373__$1;
(statearr_33379_33399[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33374 === (13))){
var state_33373__$1 = state_33373;
var statearr_33380_33400 = state_33373__$1;
(statearr_33380_33400[(2)] = null);

(statearr_33380_33400[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33374 === (6))){
var inst_33352 = (state_33373[(7)]);
var state_33373__$1 = state_33373;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_33373__$1,(11),to,inst_33352);
} else {
if((state_val_33374 === (3))){
var inst_33371 = (state_33373[(2)]);
var state_33373__$1 = state_33373;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_33373__$1,inst_33371);
} else {
if((state_val_33374 === (12))){
var state_33373__$1 = state_33373;
var statearr_33381_33401 = state_33373__$1;
(statearr_33381_33401[(2)] = null);

(statearr_33381_33401[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33374 === (2))){
var state_33373__$1 = state_33373;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_33373__$1,(4),from);
} else {
if((state_val_33374 === (11))){
var inst_33362 = (state_33373[(2)]);
var state_33373__$1 = state_33373;
if(cljs.core.truth_(inst_33362)){
var statearr_33382_33402 = state_33373__$1;
(statearr_33382_33402[(1)] = (12));

} else {
var statearr_33383_33403 = state_33373__$1;
(statearr_33383_33403[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33374 === (9))){
var state_33373__$1 = state_33373;
var statearr_33384_33404 = state_33373__$1;
(statearr_33384_33404[(2)] = null);

(statearr_33384_33404[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33374 === (5))){
var state_33373__$1 = state_33373;
if(cljs.core.truth_(close_QMARK_)){
var statearr_33385_33405 = state_33373__$1;
(statearr_33385_33405[(1)] = (8));

} else {
var statearr_33386_33406 = state_33373__$1;
(statearr_33386_33406[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33374 === (14))){
var inst_33367 = (state_33373[(2)]);
var state_33373__$1 = state_33373;
var statearr_33387_33407 = state_33373__$1;
(statearr_33387_33407[(2)] = inst_33367);

(statearr_33387_33407[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33374 === (10))){
var inst_33359 = (state_33373[(2)]);
var state_33373__$1 = state_33373;
var statearr_33388_33408 = state_33373__$1;
(statearr_33388_33408[(2)] = inst_33359);

(statearr_33388_33408[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33374 === (8))){
var inst_33356 = cljs.core.async.close_BANG_.call(null,to);
var state_33373__$1 = state_33373;
var statearr_33389_33409 = state_33373__$1;
(statearr_33389_33409[(2)] = inst_33356);

(statearr_33389_33409[(1)] = (10));


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
});})(c__33248__auto___33395))
;
return ((function (switch__33158__auto__,c__33248__auto___33395){
return (function() {
var cljs$core$async$state_machine__33159__auto__ = null;
var cljs$core$async$state_machine__33159__auto____0 = (function (){
var statearr_33390 = [null,null,null,null,null,null,null,null];
(statearr_33390[(0)] = cljs$core$async$state_machine__33159__auto__);

(statearr_33390[(1)] = (1));

return statearr_33390;
});
var cljs$core$async$state_machine__33159__auto____1 = (function (state_33373){
while(true){
var ret_value__33160__auto__ = (function (){try{while(true){
var result__33161__auto__ = switch__33158__auto__.call(null,state_33373);
if(cljs.core.keyword_identical_QMARK_.call(null,result__33161__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__33161__auto__;
}
break;
}
}catch (e33391){if((e33391 instanceof Object)){
var ex__33162__auto__ = e33391;
var statearr_33392_33410 = state_33373;
(statearr_33392_33410[(5)] = ex__33162__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_33373);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e33391;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__33160__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__33411 = state_33373;
state_33373 = G__33411;
continue;
} else {
return ret_value__33160__auto__;
}
break;
}
});
cljs$core$async$state_machine__33159__auto__ = function(state_33373){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__33159__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__33159__auto____1.call(this,state_33373);
}
throw(new Error('Invalid arity: ' + (arguments.length - 1)));
};
cljs$core$async$state_machine__33159__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__33159__auto____0;
cljs$core$async$state_machine__33159__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__33159__auto____1;
return cljs$core$async$state_machine__33159__auto__;
})()
;})(switch__33158__auto__,c__33248__auto___33395))
})();
var state__33250__auto__ = (function (){var statearr_33393 = f__33249__auto__.call(null);
(statearr_33393[(6)] = c__33248__auto___33395);

return statearr_33393;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__33250__auto__);
});})(c__33248__auto___33395))
);


return to;
});

cljs.core.async.pipe.cljs$lang$maxFixedArity = 3;

cljs.core.async.pipeline_STAR_ = (function cljs$core$async$pipeline_STAR_(n,to,xf,from,close_QMARK_,ex_handler,type){
if((n > (0))){
} else {
throw (new Error("Assert failed: (pos? n)"));
}

var jobs = cljs.core.async.chan.call(null,n);
var results = cljs.core.async.chan.call(null,n);
var process = ((function (jobs,results){
return (function (p__33412){
var vec__33413 = p__33412;
var v = cljs.core.nth.call(null,vec__33413,(0),null);
var p = cljs.core.nth.call(null,vec__33413,(1),null);
var job = vec__33413;
if((job == null)){
cljs.core.async.close_BANG_.call(null,results);

return null;
} else {
var res = cljs.core.async.chan.call(null,(1),xf,ex_handler);
var c__33248__auto___33584 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__33248__auto___33584,res,vec__33413,v,p,job,jobs,results){
return (function (){
var f__33249__auto__ = (function (){var switch__33158__auto__ = ((function (c__33248__auto___33584,res,vec__33413,v,p,job,jobs,results){
return (function (state_33420){
var state_val_33421 = (state_33420[(1)]);
if((state_val_33421 === (1))){
var state_33420__$1 = state_33420;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_33420__$1,(2),res,v);
} else {
if((state_val_33421 === (2))){
var inst_33417 = (state_33420[(2)]);
var inst_33418 = cljs.core.async.close_BANG_.call(null,res);
var state_33420__$1 = (function (){var statearr_33422 = state_33420;
(statearr_33422[(7)] = inst_33417);

return statearr_33422;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_33420__$1,inst_33418);
} else {
return null;
}
}
});})(c__33248__auto___33584,res,vec__33413,v,p,job,jobs,results))
;
return ((function (switch__33158__auto__,c__33248__auto___33584,res,vec__33413,v,p,job,jobs,results){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__33159__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__33159__auto____0 = (function (){
var statearr_33423 = [null,null,null,null,null,null,null,null];
(statearr_33423[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__33159__auto__);

(statearr_33423[(1)] = (1));

return statearr_33423;
});
var cljs$core$async$pipeline_STAR__$_state_machine__33159__auto____1 = (function (state_33420){
while(true){
var ret_value__33160__auto__ = (function (){try{while(true){
var result__33161__auto__ = switch__33158__auto__.call(null,state_33420);
if(cljs.core.keyword_identical_QMARK_.call(null,result__33161__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__33161__auto__;
}
break;
}
}catch (e33424){if((e33424 instanceof Object)){
var ex__33162__auto__ = e33424;
var statearr_33425_33585 = state_33420;
(statearr_33425_33585[(5)] = ex__33162__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_33420);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e33424;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__33160__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__33586 = state_33420;
state_33420 = G__33586;
continue;
} else {
return ret_value__33160__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__33159__auto__ = function(state_33420){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__33159__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__33159__auto____1.call(this,state_33420);
}
throw(new Error('Invalid arity: ' + (arguments.length - 1)));
};
cljs$core$async$pipeline_STAR__$_state_machine__33159__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__33159__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__33159__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__33159__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__33159__auto__;
})()
;})(switch__33158__auto__,c__33248__auto___33584,res,vec__33413,v,p,job,jobs,results))
})();
var state__33250__auto__ = (function (){var statearr_33426 = f__33249__auto__.call(null);
(statearr_33426[(6)] = c__33248__auto___33584);

return statearr_33426;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__33250__auto__);
});})(c__33248__auto___33584,res,vec__33413,v,p,job,jobs,results))
);


cljs.core.async.put_BANG_.call(null,p,res);

return true;
}
});})(jobs,results))
;
var async = ((function (jobs,results,process){
return (function (p__33427){
var vec__33428 = p__33427;
var v = cljs.core.nth.call(null,vec__33428,(0),null);
var p = cljs.core.nth.call(null,vec__33428,(1),null);
var job = vec__33428;
if((job == null)){
cljs.core.async.close_BANG_.call(null,results);

return null;
} else {
var res = cljs.core.async.chan.call(null,(1));
xf.call(null,v,res);

cljs.core.async.put_BANG_.call(null,p,res);

return true;
}
});})(jobs,results,process))
;
var n__31206__auto___33587 = n;
var __33588 = (0);
while(true){
if((__33588 < n__31206__auto___33587)){
var G__33431_33589 = type;
var G__33431_33590__$1 = (((G__33431_33589 instanceof cljs.core.Keyword))?G__33431_33589.fqn:null);
switch (G__33431_33590__$1) {
case "compute":
var c__33248__auto___33592 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (__33588,c__33248__auto___33592,G__33431_33589,G__33431_33590__$1,n__31206__auto___33587,jobs,results,process,async){
return (function (){
var f__33249__auto__ = (function (){var switch__33158__auto__ = ((function (__33588,c__33248__auto___33592,G__33431_33589,G__33431_33590__$1,n__31206__auto___33587,jobs,results,process,async){
return (function (state_33444){
var state_val_33445 = (state_33444[(1)]);
if((state_val_33445 === (1))){
var state_33444__$1 = state_33444;
var statearr_33446_33593 = state_33444__$1;
(statearr_33446_33593[(2)] = null);

(statearr_33446_33593[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33445 === (2))){
var state_33444__$1 = state_33444;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_33444__$1,(4),jobs);
} else {
if((state_val_33445 === (3))){
var inst_33442 = (state_33444[(2)]);
var state_33444__$1 = state_33444;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_33444__$1,inst_33442);
} else {
if((state_val_33445 === (4))){
var inst_33434 = (state_33444[(2)]);
var inst_33435 = process.call(null,inst_33434);
var state_33444__$1 = state_33444;
if(cljs.core.truth_(inst_33435)){
var statearr_33447_33594 = state_33444__$1;
(statearr_33447_33594[(1)] = (5));

} else {
var statearr_33448_33595 = state_33444__$1;
(statearr_33448_33595[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33445 === (5))){
var state_33444__$1 = state_33444;
var statearr_33449_33596 = state_33444__$1;
(statearr_33449_33596[(2)] = null);

(statearr_33449_33596[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33445 === (6))){
var state_33444__$1 = state_33444;
var statearr_33450_33597 = state_33444__$1;
(statearr_33450_33597[(2)] = null);

(statearr_33450_33597[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33445 === (7))){
var inst_33440 = (state_33444[(2)]);
var state_33444__$1 = state_33444;
var statearr_33451_33598 = state_33444__$1;
(statearr_33451_33598[(2)] = inst_33440);

(statearr_33451_33598[(1)] = (3));


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
});})(__33588,c__33248__auto___33592,G__33431_33589,G__33431_33590__$1,n__31206__auto___33587,jobs,results,process,async))
;
return ((function (__33588,switch__33158__auto__,c__33248__auto___33592,G__33431_33589,G__33431_33590__$1,n__31206__auto___33587,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__33159__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__33159__auto____0 = (function (){
var statearr_33452 = [null,null,null,null,null,null,null];
(statearr_33452[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__33159__auto__);

(statearr_33452[(1)] = (1));

return statearr_33452;
});
var cljs$core$async$pipeline_STAR__$_state_machine__33159__auto____1 = (function (state_33444){
while(true){
var ret_value__33160__auto__ = (function (){try{while(true){
var result__33161__auto__ = switch__33158__auto__.call(null,state_33444);
if(cljs.core.keyword_identical_QMARK_.call(null,result__33161__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__33161__auto__;
}
break;
}
}catch (e33453){if((e33453 instanceof Object)){
var ex__33162__auto__ = e33453;
var statearr_33454_33599 = state_33444;
(statearr_33454_33599[(5)] = ex__33162__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_33444);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e33453;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__33160__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__33600 = state_33444;
state_33444 = G__33600;
continue;
} else {
return ret_value__33160__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__33159__auto__ = function(state_33444){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__33159__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__33159__auto____1.call(this,state_33444);
}
throw(new Error('Invalid arity: ' + (arguments.length - 1)));
};
cljs$core$async$pipeline_STAR__$_state_machine__33159__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__33159__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__33159__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__33159__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__33159__auto__;
})()
;})(__33588,switch__33158__auto__,c__33248__auto___33592,G__33431_33589,G__33431_33590__$1,n__31206__auto___33587,jobs,results,process,async))
})();
var state__33250__auto__ = (function (){var statearr_33455 = f__33249__auto__.call(null);
(statearr_33455[(6)] = c__33248__auto___33592);

return statearr_33455;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__33250__auto__);
});})(__33588,c__33248__auto___33592,G__33431_33589,G__33431_33590__$1,n__31206__auto___33587,jobs,results,process,async))
);


break;
case "async":
var c__33248__auto___33601 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (__33588,c__33248__auto___33601,G__33431_33589,G__33431_33590__$1,n__31206__auto___33587,jobs,results,process,async){
return (function (){
var f__33249__auto__ = (function (){var switch__33158__auto__ = ((function (__33588,c__33248__auto___33601,G__33431_33589,G__33431_33590__$1,n__31206__auto___33587,jobs,results,process,async){
return (function (state_33468){
var state_val_33469 = (state_33468[(1)]);
if((state_val_33469 === (1))){
var state_33468__$1 = state_33468;
var statearr_33470_33602 = state_33468__$1;
(statearr_33470_33602[(2)] = null);

(statearr_33470_33602[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33469 === (2))){
var state_33468__$1 = state_33468;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_33468__$1,(4),jobs);
} else {
if((state_val_33469 === (3))){
var inst_33466 = (state_33468[(2)]);
var state_33468__$1 = state_33468;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_33468__$1,inst_33466);
} else {
if((state_val_33469 === (4))){
var inst_33458 = (state_33468[(2)]);
var inst_33459 = async.call(null,inst_33458);
var state_33468__$1 = state_33468;
if(cljs.core.truth_(inst_33459)){
var statearr_33471_33603 = state_33468__$1;
(statearr_33471_33603[(1)] = (5));

} else {
var statearr_33472_33604 = state_33468__$1;
(statearr_33472_33604[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33469 === (5))){
var state_33468__$1 = state_33468;
var statearr_33473_33605 = state_33468__$1;
(statearr_33473_33605[(2)] = null);

(statearr_33473_33605[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33469 === (6))){
var state_33468__$1 = state_33468;
var statearr_33474_33606 = state_33468__$1;
(statearr_33474_33606[(2)] = null);

(statearr_33474_33606[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33469 === (7))){
var inst_33464 = (state_33468[(2)]);
var state_33468__$1 = state_33468;
var statearr_33475_33607 = state_33468__$1;
(statearr_33475_33607[(2)] = inst_33464);

(statearr_33475_33607[(1)] = (3));


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
});})(__33588,c__33248__auto___33601,G__33431_33589,G__33431_33590__$1,n__31206__auto___33587,jobs,results,process,async))
;
return ((function (__33588,switch__33158__auto__,c__33248__auto___33601,G__33431_33589,G__33431_33590__$1,n__31206__auto___33587,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__33159__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__33159__auto____0 = (function (){
var statearr_33476 = [null,null,null,null,null,null,null];
(statearr_33476[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__33159__auto__);

(statearr_33476[(1)] = (1));

return statearr_33476;
});
var cljs$core$async$pipeline_STAR__$_state_machine__33159__auto____1 = (function (state_33468){
while(true){
var ret_value__33160__auto__ = (function (){try{while(true){
var result__33161__auto__ = switch__33158__auto__.call(null,state_33468);
if(cljs.core.keyword_identical_QMARK_.call(null,result__33161__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__33161__auto__;
}
break;
}
}catch (e33477){if((e33477 instanceof Object)){
var ex__33162__auto__ = e33477;
var statearr_33478_33608 = state_33468;
(statearr_33478_33608[(5)] = ex__33162__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_33468);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e33477;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__33160__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__33609 = state_33468;
state_33468 = G__33609;
continue;
} else {
return ret_value__33160__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__33159__auto__ = function(state_33468){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__33159__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__33159__auto____1.call(this,state_33468);
}
throw(new Error('Invalid arity: ' + (arguments.length - 1)));
};
cljs$core$async$pipeline_STAR__$_state_machine__33159__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__33159__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__33159__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__33159__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__33159__auto__;
})()
;})(__33588,switch__33158__auto__,c__33248__auto___33601,G__33431_33589,G__33431_33590__$1,n__31206__auto___33587,jobs,results,process,async))
})();
var state__33250__auto__ = (function (){var statearr_33479 = f__33249__auto__.call(null);
(statearr_33479[(6)] = c__33248__auto___33601);

return statearr_33479;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__33250__auto__);
});})(__33588,c__33248__auto___33601,G__33431_33589,G__33431_33590__$1,n__31206__auto___33587,jobs,results,process,async))
);


break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__33431_33590__$1)].join('')));

}

var G__33610 = (__33588 + (1));
__33588 = G__33610;
continue;
} else {
}
break;
}

var c__33248__auto___33611 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__33248__auto___33611,jobs,results,process,async){
return (function (){
var f__33249__auto__ = (function (){var switch__33158__auto__ = ((function (c__33248__auto___33611,jobs,results,process,async){
return (function (state_33501){
var state_val_33502 = (state_33501[(1)]);
if((state_val_33502 === (1))){
var state_33501__$1 = state_33501;
var statearr_33503_33612 = state_33501__$1;
(statearr_33503_33612[(2)] = null);

(statearr_33503_33612[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33502 === (2))){
var state_33501__$1 = state_33501;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_33501__$1,(4),from);
} else {
if((state_val_33502 === (3))){
var inst_33499 = (state_33501[(2)]);
var state_33501__$1 = state_33501;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_33501__$1,inst_33499);
} else {
if((state_val_33502 === (4))){
var inst_33482 = (state_33501[(7)]);
var inst_33482__$1 = (state_33501[(2)]);
var inst_33483 = (inst_33482__$1 == null);
var state_33501__$1 = (function (){var statearr_33504 = state_33501;
(statearr_33504[(7)] = inst_33482__$1);

return statearr_33504;
})();
if(cljs.core.truth_(inst_33483)){
var statearr_33505_33613 = state_33501__$1;
(statearr_33505_33613[(1)] = (5));

} else {
var statearr_33506_33614 = state_33501__$1;
(statearr_33506_33614[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33502 === (5))){
var inst_33485 = cljs.core.async.close_BANG_.call(null,jobs);
var state_33501__$1 = state_33501;
var statearr_33507_33615 = state_33501__$1;
(statearr_33507_33615[(2)] = inst_33485);

(statearr_33507_33615[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33502 === (6))){
var inst_33487 = (state_33501[(8)]);
var inst_33482 = (state_33501[(7)]);
var inst_33487__$1 = cljs.core.async.chan.call(null,(1));
var inst_33488 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_33489 = [inst_33482,inst_33487__$1];
var inst_33490 = (new cljs.core.PersistentVector(null,2,(5),inst_33488,inst_33489,null));
var state_33501__$1 = (function (){var statearr_33508 = state_33501;
(statearr_33508[(8)] = inst_33487__$1);

return statearr_33508;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_33501__$1,(8),jobs,inst_33490);
} else {
if((state_val_33502 === (7))){
var inst_33497 = (state_33501[(2)]);
var state_33501__$1 = state_33501;
var statearr_33509_33616 = state_33501__$1;
(statearr_33509_33616[(2)] = inst_33497);

(statearr_33509_33616[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33502 === (8))){
var inst_33487 = (state_33501[(8)]);
var inst_33492 = (state_33501[(2)]);
var state_33501__$1 = (function (){var statearr_33510 = state_33501;
(statearr_33510[(9)] = inst_33492);

return statearr_33510;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_33501__$1,(9),results,inst_33487);
} else {
if((state_val_33502 === (9))){
var inst_33494 = (state_33501[(2)]);
var state_33501__$1 = (function (){var statearr_33511 = state_33501;
(statearr_33511[(10)] = inst_33494);

return statearr_33511;
})();
var statearr_33512_33617 = state_33501__$1;
(statearr_33512_33617[(2)] = null);

(statearr_33512_33617[(1)] = (2));


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
});})(c__33248__auto___33611,jobs,results,process,async))
;
return ((function (switch__33158__auto__,c__33248__auto___33611,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__33159__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__33159__auto____0 = (function (){
var statearr_33513 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_33513[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__33159__auto__);

(statearr_33513[(1)] = (1));

return statearr_33513;
});
var cljs$core$async$pipeline_STAR__$_state_machine__33159__auto____1 = (function (state_33501){
while(true){
var ret_value__33160__auto__ = (function (){try{while(true){
var result__33161__auto__ = switch__33158__auto__.call(null,state_33501);
if(cljs.core.keyword_identical_QMARK_.call(null,result__33161__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__33161__auto__;
}
break;
}
}catch (e33514){if((e33514 instanceof Object)){
var ex__33162__auto__ = e33514;
var statearr_33515_33618 = state_33501;
(statearr_33515_33618[(5)] = ex__33162__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_33501);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e33514;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__33160__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__33619 = state_33501;
state_33501 = G__33619;
continue;
} else {
return ret_value__33160__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__33159__auto__ = function(state_33501){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__33159__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__33159__auto____1.call(this,state_33501);
}
throw(new Error('Invalid arity: ' + (arguments.length - 1)));
};
cljs$core$async$pipeline_STAR__$_state_machine__33159__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__33159__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__33159__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__33159__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__33159__auto__;
})()
;})(switch__33158__auto__,c__33248__auto___33611,jobs,results,process,async))
})();
var state__33250__auto__ = (function (){var statearr_33516 = f__33249__auto__.call(null);
(statearr_33516[(6)] = c__33248__auto___33611);

return statearr_33516;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__33250__auto__);
});})(c__33248__auto___33611,jobs,results,process,async))
);


var c__33248__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__33248__auto__,jobs,results,process,async){
return (function (){
var f__33249__auto__ = (function (){var switch__33158__auto__ = ((function (c__33248__auto__,jobs,results,process,async){
return (function (state_33554){
var state_val_33555 = (state_33554[(1)]);
if((state_val_33555 === (7))){
var inst_33550 = (state_33554[(2)]);
var state_33554__$1 = state_33554;
var statearr_33556_33620 = state_33554__$1;
(statearr_33556_33620[(2)] = inst_33550);

(statearr_33556_33620[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33555 === (20))){
var state_33554__$1 = state_33554;
var statearr_33557_33621 = state_33554__$1;
(statearr_33557_33621[(2)] = null);

(statearr_33557_33621[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33555 === (1))){
var state_33554__$1 = state_33554;
var statearr_33558_33622 = state_33554__$1;
(statearr_33558_33622[(2)] = null);

(statearr_33558_33622[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33555 === (4))){
var inst_33519 = (state_33554[(7)]);
var inst_33519__$1 = (state_33554[(2)]);
var inst_33520 = (inst_33519__$1 == null);
var state_33554__$1 = (function (){var statearr_33559 = state_33554;
(statearr_33559[(7)] = inst_33519__$1);

return statearr_33559;
})();
if(cljs.core.truth_(inst_33520)){
var statearr_33560_33623 = state_33554__$1;
(statearr_33560_33623[(1)] = (5));

} else {
var statearr_33561_33624 = state_33554__$1;
(statearr_33561_33624[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33555 === (15))){
var inst_33532 = (state_33554[(8)]);
var state_33554__$1 = state_33554;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_33554__$1,(18),to,inst_33532);
} else {
if((state_val_33555 === (21))){
var inst_33545 = (state_33554[(2)]);
var state_33554__$1 = state_33554;
var statearr_33562_33625 = state_33554__$1;
(statearr_33562_33625[(2)] = inst_33545);

(statearr_33562_33625[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33555 === (13))){
var inst_33547 = (state_33554[(2)]);
var state_33554__$1 = (function (){var statearr_33563 = state_33554;
(statearr_33563[(9)] = inst_33547);

return statearr_33563;
})();
var statearr_33564_33626 = state_33554__$1;
(statearr_33564_33626[(2)] = null);

(statearr_33564_33626[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33555 === (6))){
var inst_33519 = (state_33554[(7)]);
var state_33554__$1 = state_33554;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_33554__$1,(11),inst_33519);
} else {
if((state_val_33555 === (17))){
var inst_33540 = (state_33554[(2)]);
var state_33554__$1 = state_33554;
if(cljs.core.truth_(inst_33540)){
var statearr_33565_33627 = state_33554__$1;
(statearr_33565_33627[(1)] = (19));

} else {
var statearr_33566_33628 = state_33554__$1;
(statearr_33566_33628[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33555 === (3))){
var inst_33552 = (state_33554[(2)]);
var state_33554__$1 = state_33554;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_33554__$1,inst_33552);
} else {
if((state_val_33555 === (12))){
var inst_33529 = (state_33554[(10)]);
var state_33554__$1 = state_33554;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_33554__$1,(14),inst_33529);
} else {
if((state_val_33555 === (2))){
var state_33554__$1 = state_33554;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_33554__$1,(4),results);
} else {
if((state_val_33555 === (19))){
var state_33554__$1 = state_33554;
var statearr_33567_33629 = state_33554__$1;
(statearr_33567_33629[(2)] = null);

(statearr_33567_33629[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33555 === (11))){
var inst_33529 = (state_33554[(2)]);
var state_33554__$1 = (function (){var statearr_33568 = state_33554;
(statearr_33568[(10)] = inst_33529);

return statearr_33568;
})();
var statearr_33569_33630 = state_33554__$1;
(statearr_33569_33630[(2)] = null);

(statearr_33569_33630[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33555 === (9))){
var state_33554__$1 = state_33554;
var statearr_33570_33631 = state_33554__$1;
(statearr_33570_33631[(2)] = null);

(statearr_33570_33631[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33555 === (5))){
var state_33554__$1 = state_33554;
if(cljs.core.truth_(close_QMARK_)){
var statearr_33571_33632 = state_33554__$1;
(statearr_33571_33632[(1)] = (8));

} else {
var statearr_33572_33633 = state_33554__$1;
(statearr_33572_33633[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33555 === (14))){
var inst_33534 = (state_33554[(11)]);
var inst_33532 = (state_33554[(8)]);
var inst_33532__$1 = (state_33554[(2)]);
var inst_33533 = (inst_33532__$1 == null);
var inst_33534__$1 = cljs.core.not.call(null,inst_33533);
var state_33554__$1 = (function (){var statearr_33573 = state_33554;
(statearr_33573[(11)] = inst_33534__$1);

(statearr_33573[(8)] = inst_33532__$1);

return statearr_33573;
})();
if(inst_33534__$1){
var statearr_33574_33634 = state_33554__$1;
(statearr_33574_33634[(1)] = (15));

} else {
var statearr_33575_33635 = state_33554__$1;
(statearr_33575_33635[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33555 === (16))){
var inst_33534 = (state_33554[(11)]);
var state_33554__$1 = state_33554;
var statearr_33576_33636 = state_33554__$1;
(statearr_33576_33636[(2)] = inst_33534);

(statearr_33576_33636[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33555 === (10))){
var inst_33526 = (state_33554[(2)]);
var state_33554__$1 = state_33554;
var statearr_33577_33637 = state_33554__$1;
(statearr_33577_33637[(2)] = inst_33526);

(statearr_33577_33637[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33555 === (18))){
var inst_33537 = (state_33554[(2)]);
var state_33554__$1 = state_33554;
var statearr_33578_33638 = state_33554__$1;
(statearr_33578_33638[(2)] = inst_33537);

(statearr_33578_33638[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33555 === (8))){
var inst_33523 = cljs.core.async.close_BANG_.call(null,to);
var state_33554__$1 = state_33554;
var statearr_33579_33639 = state_33554__$1;
(statearr_33579_33639[(2)] = inst_33523);

(statearr_33579_33639[(1)] = (10));


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
});})(c__33248__auto__,jobs,results,process,async))
;
return ((function (switch__33158__auto__,c__33248__auto__,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__33159__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__33159__auto____0 = (function (){
var statearr_33580 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_33580[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__33159__auto__);

(statearr_33580[(1)] = (1));

return statearr_33580;
});
var cljs$core$async$pipeline_STAR__$_state_machine__33159__auto____1 = (function (state_33554){
while(true){
var ret_value__33160__auto__ = (function (){try{while(true){
var result__33161__auto__ = switch__33158__auto__.call(null,state_33554);
if(cljs.core.keyword_identical_QMARK_.call(null,result__33161__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__33161__auto__;
}
break;
}
}catch (e33581){if((e33581 instanceof Object)){
var ex__33162__auto__ = e33581;
var statearr_33582_33640 = state_33554;
(statearr_33582_33640[(5)] = ex__33162__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_33554);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e33581;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__33160__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__33641 = state_33554;
state_33554 = G__33641;
continue;
} else {
return ret_value__33160__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__33159__auto__ = function(state_33554){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__33159__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__33159__auto____1.call(this,state_33554);
}
throw(new Error('Invalid arity: ' + (arguments.length - 1)));
};
cljs$core$async$pipeline_STAR__$_state_machine__33159__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__33159__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__33159__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__33159__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__33159__auto__;
})()
;})(switch__33158__auto__,c__33248__auto__,jobs,results,process,async))
})();
var state__33250__auto__ = (function (){var statearr_33583 = f__33249__auto__.call(null);
(statearr_33583[(6)] = c__33248__auto__);

return statearr_33583;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__33250__auto__);
});})(c__33248__auto__,jobs,results,process,async))
);

return c__33248__auto__;
});
/**
 * Takes elements from the from channel and supplies them to the to
 *   channel, subject to the async function af, with parallelism n. af
 *   must be a function of two arguments, the first an input value and
 *   the second a channel on which to place the result(s). af must close!
 *   the channel before returning.  The presumption is that af will
 *   return immediately, having launched some asynchronous operation
 *   whose completion/callback will manipulate the result channel. Outputs
 *   will be returned in order relative to  the inputs. By default, the to
 *   channel will be closed when the from channel closes, but can be
 *   determined by the close?  parameter. Will stop consuming the from
 *   channel if the to channel closes.
 */
cljs.core.async.pipeline_async = (function cljs$core$async$pipeline_async(var_args){
var G__33643 = arguments.length;
switch (G__33643) {
case 4:
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$4 = (function (n,to,af,from){
return cljs.core.async.pipeline_async.call(null,n,to,af,from,true);
});

cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5 = (function (n,to,af,from,close_QMARK_){
return cljs.core.async.pipeline_STAR_.call(null,n,to,af,from,close_QMARK_,null,new cljs.core.Keyword(null,"async","async",1050769601));
});

cljs.core.async.pipeline_async.cljs$lang$maxFixedArity = 5;

/**
 * Takes elements from the from channel and supplies them to the to
 *   channel, subject to the transducer xf, with parallelism n. Because
 *   it is parallel, the transducer will be applied independently to each
 *   element, not across elements, and may produce zero or more outputs
 *   per input.  Outputs will be returned in order relative to the
 *   inputs. By default, the to channel will be closed when the from
 *   channel closes, but can be determined by the close?  parameter. Will
 *   stop consuming the from channel if the to channel closes.
 * 
 *   Note this is supplied for API compatibility with the Clojure version.
 *   Values of N > 1 will not result in actual concurrency in a
 *   single-threaded runtime.
 */
cljs.core.async.pipeline = (function cljs$core$async$pipeline(var_args){
var G__33646 = arguments.length;
switch (G__33646) {
case 4:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
case 6:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$6((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$4 = (function (n,to,xf,from){
return cljs.core.async.pipeline.call(null,n,to,xf,from,true);
});

cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$5 = (function (n,to,xf,from,close_QMARK_){
return cljs.core.async.pipeline.call(null,n,to,xf,from,close_QMARK_,null);
});

cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$6 = (function (n,to,xf,from,close_QMARK_,ex_handler){
return cljs.core.async.pipeline_STAR_.call(null,n,to,xf,from,close_QMARK_,ex_handler,new cljs.core.Keyword(null,"compute","compute",1555393130));
});

cljs.core.async.pipeline.cljs$lang$maxFixedArity = 6;

/**
 * Takes a predicate and a source channel and returns a vector of two
 *   channels, the first of which will contain the values for which the
 *   predicate returned true, the second those for which it returned
 *   false.
 * 
 *   The out channels will be unbuffered by default, or two buf-or-ns can
 *   be supplied. The channels will close after the source channel has
 *   closed.
 */
cljs.core.async.split = (function cljs$core$async$split(var_args){
var G__33649 = arguments.length;
switch (G__33649) {
case 2:
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 4:
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.core.async.split.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.split.call(null,p,ch,null,null);
});

cljs.core.async.split.cljs$core$IFn$_invoke$arity$4 = (function (p,ch,t_buf_or_n,f_buf_or_n){
var tc = cljs.core.async.chan.call(null,t_buf_or_n);
var fc = cljs.core.async.chan.call(null,f_buf_or_n);
var c__33248__auto___33698 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__33248__auto___33698,tc,fc){
return (function (){
var f__33249__auto__ = (function (){var switch__33158__auto__ = ((function (c__33248__auto___33698,tc,fc){
return (function (state_33675){
var state_val_33676 = (state_33675[(1)]);
if((state_val_33676 === (7))){
var inst_33671 = (state_33675[(2)]);
var state_33675__$1 = state_33675;
var statearr_33677_33699 = state_33675__$1;
(statearr_33677_33699[(2)] = inst_33671);

(statearr_33677_33699[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33676 === (1))){
var state_33675__$1 = state_33675;
var statearr_33678_33700 = state_33675__$1;
(statearr_33678_33700[(2)] = null);

(statearr_33678_33700[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33676 === (4))){
var inst_33652 = (state_33675[(7)]);
var inst_33652__$1 = (state_33675[(2)]);
var inst_33653 = (inst_33652__$1 == null);
var state_33675__$1 = (function (){var statearr_33679 = state_33675;
(statearr_33679[(7)] = inst_33652__$1);

return statearr_33679;
})();
if(cljs.core.truth_(inst_33653)){
var statearr_33680_33701 = state_33675__$1;
(statearr_33680_33701[(1)] = (5));

} else {
var statearr_33681_33702 = state_33675__$1;
(statearr_33681_33702[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33676 === (13))){
var state_33675__$1 = state_33675;
var statearr_33682_33703 = state_33675__$1;
(statearr_33682_33703[(2)] = null);

(statearr_33682_33703[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33676 === (6))){
var inst_33652 = (state_33675[(7)]);
var inst_33658 = p.call(null,inst_33652);
var state_33675__$1 = state_33675;
if(cljs.core.truth_(inst_33658)){
var statearr_33683_33704 = state_33675__$1;
(statearr_33683_33704[(1)] = (9));

} else {
var statearr_33684_33705 = state_33675__$1;
(statearr_33684_33705[(1)] = (10));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33676 === (3))){
var inst_33673 = (state_33675[(2)]);
var state_33675__$1 = state_33675;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_33675__$1,inst_33673);
} else {
if((state_val_33676 === (12))){
var state_33675__$1 = state_33675;
var statearr_33685_33706 = state_33675__$1;
(statearr_33685_33706[(2)] = null);

(statearr_33685_33706[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33676 === (2))){
var state_33675__$1 = state_33675;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_33675__$1,(4),ch);
} else {
if((state_val_33676 === (11))){
var inst_33652 = (state_33675[(7)]);
var inst_33662 = (state_33675[(2)]);
var state_33675__$1 = state_33675;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_33675__$1,(8),inst_33662,inst_33652);
} else {
if((state_val_33676 === (9))){
var state_33675__$1 = state_33675;
var statearr_33686_33707 = state_33675__$1;
(statearr_33686_33707[(2)] = tc);

(statearr_33686_33707[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33676 === (5))){
var inst_33655 = cljs.core.async.close_BANG_.call(null,tc);
var inst_33656 = cljs.core.async.close_BANG_.call(null,fc);
var state_33675__$1 = (function (){var statearr_33687 = state_33675;
(statearr_33687[(8)] = inst_33655);

return statearr_33687;
})();
var statearr_33688_33708 = state_33675__$1;
(statearr_33688_33708[(2)] = inst_33656);

(statearr_33688_33708[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33676 === (14))){
var inst_33669 = (state_33675[(2)]);
var state_33675__$1 = state_33675;
var statearr_33689_33709 = state_33675__$1;
(statearr_33689_33709[(2)] = inst_33669);

(statearr_33689_33709[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33676 === (10))){
var state_33675__$1 = state_33675;
var statearr_33690_33710 = state_33675__$1;
(statearr_33690_33710[(2)] = fc);

(statearr_33690_33710[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33676 === (8))){
var inst_33664 = (state_33675[(2)]);
var state_33675__$1 = state_33675;
if(cljs.core.truth_(inst_33664)){
var statearr_33691_33711 = state_33675__$1;
(statearr_33691_33711[(1)] = (12));

} else {
var statearr_33692_33712 = state_33675__$1;
(statearr_33692_33712[(1)] = (13));

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
});})(c__33248__auto___33698,tc,fc))
;
return ((function (switch__33158__auto__,c__33248__auto___33698,tc,fc){
return (function() {
var cljs$core$async$state_machine__33159__auto__ = null;
var cljs$core$async$state_machine__33159__auto____0 = (function (){
var statearr_33693 = [null,null,null,null,null,null,null,null,null];
(statearr_33693[(0)] = cljs$core$async$state_machine__33159__auto__);

(statearr_33693[(1)] = (1));

return statearr_33693;
});
var cljs$core$async$state_machine__33159__auto____1 = (function (state_33675){
while(true){
var ret_value__33160__auto__ = (function (){try{while(true){
var result__33161__auto__ = switch__33158__auto__.call(null,state_33675);
if(cljs.core.keyword_identical_QMARK_.call(null,result__33161__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__33161__auto__;
}
break;
}
}catch (e33694){if((e33694 instanceof Object)){
var ex__33162__auto__ = e33694;
var statearr_33695_33713 = state_33675;
(statearr_33695_33713[(5)] = ex__33162__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_33675);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e33694;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__33160__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__33714 = state_33675;
state_33675 = G__33714;
continue;
} else {
return ret_value__33160__auto__;
}
break;
}
});
cljs$core$async$state_machine__33159__auto__ = function(state_33675){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__33159__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__33159__auto____1.call(this,state_33675);
}
throw(new Error('Invalid arity: ' + (arguments.length - 1)));
};
cljs$core$async$state_machine__33159__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__33159__auto____0;
cljs$core$async$state_machine__33159__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__33159__auto____1;
return cljs$core$async$state_machine__33159__auto__;
})()
;})(switch__33158__auto__,c__33248__auto___33698,tc,fc))
})();
var state__33250__auto__ = (function (){var statearr_33696 = f__33249__auto__.call(null);
(statearr_33696[(6)] = c__33248__auto___33698);

return statearr_33696;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__33250__auto__);
});})(c__33248__auto___33698,tc,fc))
);


return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [tc,fc], null);
});

cljs.core.async.split.cljs$lang$maxFixedArity = 4;

/**
 * f should be a function of 2 arguments. Returns a channel containing
 *   the single result of applying f to init and the first item from the
 *   channel, then applying f to that result and the 2nd item, etc. If
 *   the channel closes without yielding items, returns init and f is not
 *   called. ch must close before reduce produces a result.
 */
cljs.core.async.reduce = (function cljs$core$async$reduce(f,init,ch){
var c__33248__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__33248__auto__){
return (function (){
var f__33249__auto__ = (function (){var switch__33158__auto__ = ((function (c__33248__auto__){
return (function (state_33735){
var state_val_33736 = (state_33735[(1)]);
if((state_val_33736 === (7))){
var inst_33731 = (state_33735[(2)]);
var state_33735__$1 = state_33735;
var statearr_33737_33755 = state_33735__$1;
(statearr_33737_33755[(2)] = inst_33731);

(statearr_33737_33755[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33736 === (1))){
var inst_33715 = init;
var state_33735__$1 = (function (){var statearr_33738 = state_33735;
(statearr_33738[(7)] = inst_33715);

return statearr_33738;
})();
var statearr_33739_33756 = state_33735__$1;
(statearr_33739_33756[(2)] = null);

(statearr_33739_33756[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33736 === (4))){
var inst_33718 = (state_33735[(8)]);
var inst_33718__$1 = (state_33735[(2)]);
var inst_33719 = (inst_33718__$1 == null);
var state_33735__$1 = (function (){var statearr_33740 = state_33735;
(statearr_33740[(8)] = inst_33718__$1);

return statearr_33740;
})();
if(cljs.core.truth_(inst_33719)){
var statearr_33741_33757 = state_33735__$1;
(statearr_33741_33757[(1)] = (5));

} else {
var statearr_33742_33758 = state_33735__$1;
(statearr_33742_33758[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33736 === (6))){
var inst_33722 = (state_33735[(9)]);
var inst_33715 = (state_33735[(7)]);
var inst_33718 = (state_33735[(8)]);
var inst_33722__$1 = f.call(null,inst_33715,inst_33718);
var inst_33723 = cljs.core.reduced_QMARK_.call(null,inst_33722__$1);
var state_33735__$1 = (function (){var statearr_33743 = state_33735;
(statearr_33743[(9)] = inst_33722__$1);

return statearr_33743;
})();
if(inst_33723){
var statearr_33744_33759 = state_33735__$1;
(statearr_33744_33759[(1)] = (8));

} else {
var statearr_33745_33760 = state_33735__$1;
(statearr_33745_33760[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33736 === (3))){
var inst_33733 = (state_33735[(2)]);
var state_33735__$1 = state_33735;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_33735__$1,inst_33733);
} else {
if((state_val_33736 === (2))){
var state_33735__$1 = state_33735;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_33735__$1,(4),ch);
} else {
if((state_val_33736 === (9))){
var inst_33722 = (state_33735[(9)]);
var inst_33715 = inst_33722;
var state_33735__$1 = (function (){var statearr_33746 = state_33735;
(statearr_33746[(7)] = inst_33715);

return statearr_33746;
})();
var statearr_33747_33761 = state_33735__$1;
(statearr_33747_33761[(2)] = null);

(statearr_33747_33761[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33736 === (5))){
var inst_33715 = (state_33735[(7)]);
var state_33735__$1 = state_33735;
var statearr_33748_33762 = state_33735__$1;
(statearr_33748_33762[(2)] = inst_33715);

(statearr_33748_33762[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33736 === (10))){
var inst_33729 = (state_33735[(2)]);
var state_33735__$1 = state_33735;
var statearr_33749_33763 = state_33735__$1;
(statearr_33749_33763[(2)] = inst_33729);

(statearr_33749_33763[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33736 === (8))){
var inst_33722 = (state_33735[(9)]);
var inst_33725 = cljs.core.deref.call(null,inst_33722);
var state_33735__$1 = state_33735;
var statearr_33750_33764 = state_33735__$1;
(statearr_33750_33764[(2)] = inst_33725);

(statearr_33750_33764[(1)] = (10));


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
});})(c__33248__auto__))
;
return ((function (switch__33158__auto__,c__33248__auto__){
return (function() {
var cljs$core$async$reduce_$_state_machine__33159__auto__ = null;
var cljs$core$async$reduce_$_state_machine__33159__auto____0 = (function (){
var statearr_33751 = [null,null,null,null,null,null,null,null,null,null];
(statearr_33751[(0)] = cljs$core$async$reduce_$_state_machine__33159__auto__);

(statearr_33751[(1)] = (1));

return statearr_33751;
});
var cljs$core$async$reduce_$_state_machine__33159__auto____1 = (function (state_33735){
while(true){
var ret_value__33160__auto__ = (function (){try{while(true){
var result__33161__auto__ = switch__33158__auto__.call(null,state_33735);
if(cljs.core.keyword_identical_QMARK_.call(null,result__33161__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__33161__auto__;
}
break;
}
}catch (e33752){if((e33752 instanceof Object)){
var ex__33162__auto__ = e33752;
var statearr_33753_33765 = state_33735;
(statearr_33753_33765[(5)] = ex__33162__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_33735);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e33752;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__33160__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__33766 = state_33735;
state_33735 = G__33766;
continue;
} else {
return ret_value__33160__auto__;
}
break;
}
});
cljs$core$async$reduce_$_state_machine__33159__auto__ = function(state_33735){
switch(arguments.length){
case 0:
return cljs$core$async$reduce_$_state_machine__33159__auto____0.call(this);
case 1:
return cljs$core$async$reduce_$_state_machine__33159__auto____1.call(this,state_33735);
}
throw(new Error('Invalid arity: ' + (arguments.length - 1)));
};
cljs$core$async$reduce_$_state_machine__33159__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$reduce_$_state_machine__33159__auto____0;
cljs$core$async$reduce_$_state_machine__33159__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$reduce_$_state_machine__33159__auto____1;
return cljs$core$async$reduce_$_state_machine__33159__auto__;
})()
;})(switch__33158__auto__,c__33248__auto__))
})();
var state__33250__auto__ = (function (){var statearr_33754 = f__33249__auto__.call(null);
(statearr_33754[(6)] = c__33248__auto__);

return statearr_33754;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__33250__auto__);
});})(c__33248__auto__))
);

return c__33248__auto__;
});
/**
 * async/reduces a channel with a transformation (xform f).
 *   Returns a channel containing the result.  ch must close before
 *   transduce produces a result.
 */
cljs.core.async.transduce = (function cljs$core$async$transduce(xform,f,init,ch){
var f__$1 = xform.call(null,f);
var c__33248__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__33248__auto__,f__$1){
return (function (){
var f__33249__auto__ = (function (){var switch__33158__auto__ = ((function (c__33248__auto__,f__$1){
return (function (state_33772){
var state_val_33773 = (state_33772[(1)]);
if((state_val_33773 === (1))){
var inst_33767 = cljs.core.async.reduce.call(null,f__$1,init,ch);
var state_33772__$1 = state_33772;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_33772__$1,(2),inst_33767);
} else {
if((state_val_33773 === (2))){
var inst_33769 = (state_33772[(2)]);
var inst_33770 = f__$1.call(null,inst_33769);
var state_33772__$1 = state_33772;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_33772__$1,inst_33770);
} else {
return null;
}
}
});})(c__33248__auto__,f__$1))
;
return ((function (switch__33158__auto__,c__33248__auto__,f__$1){
return (function() {
var cljs$core$async$transduce_$_state_machine__33159__auto__ = null;
var cljs$core$async$transduce_$_state_machine__33159__auto____0 = (function (){
var statearr_33774 = [null,null,null,null,null,null,null];
(statearr_33774[(0)] = cljs$core$async$transduce_$_state_machine__33159__auto__);

(statearr_33774[(1)] = (1));

return statearr_33774;
});
var cljs$core$async$transduce_$_state_machine__33159__auto____1 = (function (state_33772){
while(true){
var ret_value__33160__auto__ = (function (){try{while(true){
var result__33161__auto__ = switch__33158__auto__.call(null,state_33772);
if(cljs.core.keyword_identical_QMARK_.call(null,result__33161__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__33161__auto__;
}
break;
}
}catch (e33775){if((e33775 instanceof Object)){
var ex__33162__auto__ = e33775;
var statearr_33776_33778 = state_33772;
(statearr_33776_33778[(5)] = ex__33162__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_33772);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e33775;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__33160__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__33779 = state_33772;
state_33772 = G__33779;
continue;
} else {
return ret_value__33160__auto__;
}
break;
}
});
cljs$core$async$transduce_$_state_machine__33159__auto__ = function(state_33772){
switch(arguments.length){
case 0:
return cljs$core$async$transduce_$_state_machine__33159__auto____0.call(this);
case 1:
return cljs$core$async$transduce_$_state_machine__33159__auto____1.call(this,state_33772);
}
throw(new Error('Invalid arity: ' + (arguments.length - 1)));
};
cljs$core$async$transduce_$_state_machine__33159__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$transduce_$_state_machine__33159__auto____0;
cljs$core$async$transduce_$_state_machine__33159__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$transduce_$_state_machine__33159__auto____1;
return cljs$core$async$transduce_$_state_machine__33159__auto__;
})()
;})(switch__33158__auto__,c__33248__auto__,f__$1))
})();
var state__33250__auto__ = (function (){var statearr_33777 = f__33249__auto__.call(null);
(statearr_33777[(6)] = c__33248__auto__);

return statearr_33777;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__33250__auto__);
});})(c__33248__auto__,f__$1))
);

return c__33248__auto__;
});
/**
 * Puts the contents of coll into the supplied channel.
 * 
 *   By default the channel will be closed after the items are copied,
 *   but can be determined by the close? parameter.
 * 
 *   Returns a channel which will close after the items are copied.
 */
cljs.core.async.onto_chan = (function cljs$core$async$onto_chan(var_args){
var G__33781 = arguments.length;
switch (G__33781) {
case 2:
return cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$2 = (function (ch,coll){
return cljs.core.async.onto_chan.call(null,ch,coll,true);
});

cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3 = (function (ch,coll,close_QMARK_){
var c__33248__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__33248__auto__){
return (function (){
var f__33249__auto__ = (function (){var switch__33158__auto__ = ((function (c__33248__auto__){
return (function (state_33806){
var state_val_33807 = (state_33806[(1)]);
if((state_val_33807 === (7))){
var inst_33788 = (state_33806[(2)]);
var state_33806__$1 = state_33806;
var statearr_33808_33829 = state_33806__$1;
(statearr_33808_33829[(2)] = inst_33788);

(statearr_33808_33829[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33807 === (1))){
var inst_33782 = cljs.core.seq.call(null,coll);
var inst_33783 = inst_33782;
var state_33806__$1 = (function (){var statearr_33809 = state_33806;
(statearr_33809[(7)] = inst_33783);

return statearr_33809;
})();
var statearr_33810_33830 = state_33806__$1;
(statearr_33810_33830[(2)] = null);

(statearr_33810_33830[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33807 === (4))){
var inst_33783 = (state_33806[(7)]);
var inst_33786 = cljs.core.first.call(null,inst_33783);
var state_33806__$1 = state_33806;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_33806__$1,(7),ch,inst_33786);
} else {
if((state_val_33807 === (13))){
var inst_33800 = (state_33806[(2)]);
var state_33806__$1 = state_33806;
var statearr_33811_33831 = state_33806__$1;
(statearr_33811_33831[(2)] = inst_33800);

(statearr_33811_33831[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33807 === (6))){
var inst_33791 = (state_33806[(2)]);
var state_33806__$1 = state_33806;
if(cljs.core.truth_(inst_33791)){
var statearr_33812_33832 = state_33806__$1;
(statearr_33812_33832[(1)] = (8));

} else {
var statearr_33813_33833 = state_33806__$1;
(statearr_33813_33833[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33807 === (3))){
var inst_33804 = (state_33806[(2)]);
var state_33806__$1 = state_33806;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_33806__$1,inst_33804);
} else {
if((state_val_33807 === (12))){
var state_33806__$1 = state_33806;
var statearr_33814_33834 = state_33806__$1;
(statearr_33814_33834[(2)] = null);

(statearr_33814_33834[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33807 === (2))){
var inst_33783 = (state_33806[(7)]);
var state_33806__$1 = state_33806;
if(cljs.core.truth_(inst_33783)){
var statearr_33815_33835 = state_33806__$1;
(statearr_33815_33835[(1)] = (4));

} else {
var statearr_33816_33836 = state_33806__$1;
(statearr_33816_33836[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33807 === (11))){
var inst_33797 = cljs.core.async.close_BANG_.call(null,ch);
var state_33806__$1 = state_33806;
var statearr_33817_33837 = state_33806__$1;
(statearr_33817_33837[(2)] = inst_33797);

(statearr_33817_33837[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33807 === (9))){
var state_33806__$1 = state_33806;
if(cljs.core.truth_(close_QMARK_)){
var statearr_33818_33838 = state_33806__$1;
(statearr_33818_33838[(1)] = (11));

} else {
var statearr_33819_33839 = state_33806__$1;
(statearr_33819_33839[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33807 === (5))){
var inst_33783 = (state_33806[(7)]);
var state_33806__$1 = state_33806;
var statearr_33820_33840 = state_33806__$1;
(statearr_33820_33840[(2)] = inst_33783);

(statearr_33820_33840[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33807 === (10))){
var inst_33802 = (state_33806[(2)]);
var state_33806__$1 = state_33806;
var statearr_33821_33841 = state_33806__$1;
(statearr_33821_33841[(2)] = inst_33802);

(statearr_33821_33841[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33807 === (8))){
var inst_33783 = (state_33806[(7)]);
var inst_33793 = cljs.core.next.call(null,inst_33783);
var inst_33783__$1 = inst_33793;
var state_33806__$1 = (function (){var statearr_33822 = state_33806;
(statearr_33822[(7)] = inst_33783__$1);

return statearr_33822;
})();
var statearr_33823_33842 = state_33806__$1;
(statearr_33823_33842[(2)] = null);

(statearr_33823_33842[(1)] = (2));


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
});})(c__33248__auto__))
;
return ((function (switch__33158__auto__,c__33248__auto__){
return (function() {
var cljs$core$async$state_machine__33159__auto__ = null;
var cljs$core$async$state_machine__33159__auto____0 = (function (){
var statearr_33824 = [null,null,null,null,null,null,null,null];
(statearr_33824[(0)] = cljs$core$async$state_machine__33159__auto__);

(statearr_33824[(1)] = (1));

return statearr_33824;
});
var cljs$core$async$state_machine__33159__auto____1 = (function (state_33806){
while(true){
var ret_value__33160__auto__ = (function (){try{while(true){
var result__33161__auto__ = switch__33158__auto__.call(null,state_33806);
if(cljs.core.keyword_identical_QMARK_.call(null,result__33161__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__33161__auto__;
}
break;
}
}catch (e33825){if((e33825 instanceof Object)){
var ex__33162__auto__ = e33825;
var statearr_33826_33843 = state_33806;
(statearr_33826_33843[(5)] = ex__33162__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_33806);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e33825;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__33160__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__33844 = state_33806;
state_33806 = G__33844;
continue;
} else {
return ret_value__33160__auto__;
}
break;
}
});
cljs$core$async$state_machine__33159__auto__ = function(state_33806){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__33159__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__33159__auto____1.call(this,state_33806);
}
throw(new Error('Invalid arity: ' + (arguments.length - 1)));
};
cljs$core$async$state_machine__33159__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__33159__auto____0;
cljs$core$async$state_machine__33159__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__33159__auto____1;
return cljs$core$async$state_machine__33159__auto__;
})()
;})(switch__33158__auto__,c__33248__auto__))
})();
var state__33250__auto__ = (function (){var statearr_33827 = f__33249__auto__.call(null);
(statearr_33827[(6)] = c__33248__auto__);

return statearr_33827;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__33250__auto__);
});})(c__33248__auto__))
);

return c__33248__auto__;
});

cljs.core.async.onto_chan.cljs$lang$maxFixedArity = 3;

/**
 * Creates and returns a channel which contains the contents of coll,
 *   closing when exhausted.
 */
cljs.core.async.to_chan = (function cljs$core$async$to_chan(coll){
var ch = cljs.core.async.chan.call(null,cljs.core.bounded_count.call(null,(100),coll));
cljs.core.async.onto_chan.call(null,ch,coll);

return ch;
});

/**
 * @interface
 */
cljs.core.async.Mux = function(){};

cljs.core.async.muxch_STAR_ = (function cljs$core$async$muxch_STAR_(_){
if((!((_ == null))) && (!((_.cljs$core$async$Mux$muxch_STAR_$arity$1 == null)))){
return _.cljs$core$async$Mux$muxch_STAR_$arity$1(_);
} else {
var x__30893__auto__ = (((_ == null))?null:_);
var m__30894__auto__ = (cljs.core.async.muxch_STAR_[goog.typeOf(x__30893__auto__)]);
if(!((m__30894__auto__ == null))){
return m__30894__auto__.call(null,_);
} else {
var m__30894__auto____$1 = (cljs.core.async.muxch_STAR_["_"]);
if(!((m__30894__auto____$1 == null))){
return m__30894__auto____$1.call(null,_);
} else {
throw cljs.core.missing_protocol.call(null,"Mux.muxch*",_);
}
}
}
});


/**
 * @interface
 */
cljs.core.async.Mult = function(){};

cljs.core.async.tap_STAR_ = (function cljs$core$async$tap_STAR_(m,ch,close_QMARK_){
if((!((m == null))) && (!((m.cljs$core$async$Mult$tap_STAR_$arity$3 == null)))){
return m.cljs$core$async$Mult$tap_STAR_$arity$3(m,ch,close_QMARK_);
} else {
var x__30893__auto__ = (((m == null))?null:m);
var m__30894__auto__ = (cljs.core.async.tap_STAR_[goog.typeOf(x__30893__auto__)]);
if(!((m__30894__auto__ == null))){
return m__30894__auto__.call(null,m,ch,close_QMARK_);
} else {
var m__30894__auto____$1 = (cljs.core.async.tap_STAR_["_"]);
if(!((m__30894__auto____$1 == null))){
return m__30894__auto____$1.call(null,m,ch,close_QMARK_);
} else {
throw cljs.core.missing_protocol.call(null,"Mult.tap*",m);
}
}
}
});

cljs.core.async.untap_STAR_ = (function cljs$core$async$untap_STAR_(m,ch){
if((!((m == null))) && (!((m.cljs$core$async$Mult$untap_STAR_$arity$2 == null)))){
return m.cljs$core$async$Mult$untap_STAR_$arity$2(m,ch);
} else {
var x__30893__auto__ = (((m == null))?null:m);
var m__30894__auto__ = (cljs.core.async.untap_STAR_[goog.typeOf(x__30893__auto__)]);
if(!((m__30894__auto__ == null))){
return m__30894__auto__.call(null,m,ch);
} else {
var m__30894__auto____$1 = (cljs.core.async.untap_STAR_["_"]);
if(!((m__30894__auto____$1 == null))){
return m__30894__auto____$1.call(null,m,ch);
} else {
throw cljs.core.missing_protocol.call(null,"Mult.untap*",m);
}
}
}
});

cljs.core.async.untap_all_STAR_ = (function cljs$core$async$untap_all_STAR_(m){
if((!((m == null))) && (!((m.cljs$core$async$Mult$untap_all_STAR_$arity$1 == null)))){
return m.cljs$core$async$Mult$untap_all_STAR_$arity$1(m);
} else {
var x__30893__auto__ = (((m == null))?null:m);
var m__30894__auto__ = (cljs.core.async.untap_all_STAR_[goog.typeOf(x__30893__auto__)]);
if(!((m__30894__auto__ == null))){
return m__30894__auto__.call(null,m);
} else {
var m__30894__auto____$1 = (cljs.core.async.untap_all_STAR_["_"]);
if(!((m__30894__auto____$1 == null))){
return m__30894__auto____$1.call(null,m);
} else {
throw cljs.core.missing_protocol.call(null,"Mult.untap-all*",m);
}
}
}
});

/**
 * Creates and returns a mult(iple) of the supplied channel. Channels
 *   containing copies of the channel can be created with 'tap', and
 *   detached with 'untap'.
 * 
 *   Each item is distributed to all taps in parallel and synchronously,
 *   i.e. each tap must accept before the next item is distributed. Use
 *   buffering/windowing to prevent slow taps from holding up the mult.
 * 
 *   Items received when there are no taps get dropped.
 * 
 *   If a tap puts to a closed channel, it will be removed from the mult.
 */
cljs.core.async.mult = (function cljs$core$async$mult(ch){
var cs = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var m = (function (){
if(typeof cljs.core.async.t_cljs$core$async33845 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.Mult}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async33845 = (function (ch,cs,meta33846){
this.ch = ch;
this.cs = cs;
this.meta33846 = meta33846;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
cljs.core.async.t_cljs$core$async33845.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (cs){
return (function (_33847,meta33846__$1){
var self__ = this;
var _33847__$1 = this;
return (new cljs.core.async.t_cljs$core$async33845(self__.ch,self__.cs,meta33846__$1));
});})(cs))
;

cljs.core.async.t_cljs$core$async33845.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (cs){
return (function (_33847){
var self__ = this;
var _33847__$1 = this;
return self__.meta33846;
});})(cs))
;

cljs.core.async.t_cljs$core$async33845.prototype.cljs$core$async$Mux$ = cljs.core.PROTOCOL_SENTINEL;

cljs.core.async.t_cljs$core$async33845.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (cs){
return (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
});})(cs))
;

cljs.core.async.t_cljs$core$async33845.prototype.cljs$core$async$Mult$ = cljs.core.PROTOCOL_SENTINEL;

cljs.core.async.t_cljs$core$async33845.prototype.cljs$core$async$Mult$tap_STAR_$arity$3 = ((function (cs){
return (function (_,ch__$1,close_QMARK_){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.assoc,ch__$1,close_QMARK_);

return null;
});})(cs))
;

cljs.core.async.t_cljs$core$async33845.prototype.cljs$core$async$Mult$untap_STAR_$arity$2 = ((function (cs){
return (function (_,ch__$1){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.dissoc,ch__$1);

return null;
});})(cs))
;

cljs.core.async.t_cljs$core$async33845.prototype.cljs$core$async$Mult$untap_all_STAR_$arity$1 = ((function (cs){
return (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_.call(null,self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return null;
});})(cs))
;

cljs.core.async.t_cljs$core$async33845.getBasis = ((function (cs){
return (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"cs","cs",-117024463,null),new cljs.core.Symbol(null,"meta33846","meta33846",1875237065,null)], null);
});})(cs))
;

cljs.core.async.t_cljs$core$async33845.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async33845.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async33845";

cljs.core.async.t_cljs$core$async33845.cljs$lang$ctorPrWriter = ((function (cs){
return (function (this__30831__auto__,writer__30832__auto__,opt__30833__auto__){
return cljs.core._write.call(null,writer__30832__auto__,"cljs.core.async/t_cljs$core$async33845");
});})(cs))
;

cljs.core.async.__GT_t_cljs$core$async33845 = ((function (cs){
return (function cljs$core$async$mult_$___GT_t_cljs$core$async33845(ch__$1,cs__$1,meta33846){
return (new cljs.core.async.t_cljs$core$async33845(ch__$1,cs__$1,meta33846));
});})(cs))
;

}

return (new cljs.core.async.t_cljs$core$async33845(ch,cs,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var dchan = cljs.core.async.chan.call(null,(1));
var dctr = cljs.core.atom.call(null,null);
var done = ((function (cs,m,dchan,dctr){
return (function (_){
if((cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec) === (0))){
return cljs.core.async.put_BANG_.call(null,dchan,true);
} else {
return null;
}
});})(cs,m,dchan,dctr))
;
var c__33248__auto___34067 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__33248__auto___34067,cs,m,dchan,dctr,done){
return (function (){
var f__33249__auto__ = (function (){var switch__33158__auto__ = ((function (c__33248__auto___34067,cs,m,dchan,dctr,done){
return (function (state_33982){
var state_val_33983 = (state_33982[(1)]);
if((state_val_33983 === (7))){
var inst_33978 = (state_33982[(2)]);
var state_33982__$1 = state_33982;
var statearr_33984_34068 = state_33982__$1;
(statearr_33984_34068[(2)] = inst_33978);

(statearr_33984_34068[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33983 === (20))){
var inst_33881 = (state_33982[(7)]);
var inst_33893 = cljs.core.first.call(null,inst_33881);
var inst_33894 = cljs.core.nth.call(null,inst_33893,(0),null);
var inst_33895 = cljs.core.nth.call(null,inst_33893,(1),null);
var state_33982__$1 = (function (){var statearr_33985 = state_33982;
(statearr_33985[(8)] = inst_33894);

return statearr_33985;
})();
if(cljs.core.truth_(inst_33895)){
var statearr_33986_34069 = state_33982__$1;
(statearr_33986_34069[(1)] = (22));

} else {
var statearr_33987_34070 = state_33982__$1;
(statearr_33987_34070[(1)] = (23));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33983 === (27))){
var inst_33930 = (state_33982[(9)]);
var inst_33923 = (state_33982[(10)]);
var inst_33850 = (state_33982[(11)]);
var inst_33925 = (state_33982[(12)]);
var inst_33930__$1 = cljs.core._nth.call(null,inst_33923,inst_33925);
var inst_33931 = cljs.core.async.put_BANG_.call(null,inst_33930__$1,inst_33850,done);
var state_33982__$1 = (function (){var statearr_33988 = state_33982;
(statearr_33988[(9)] = inst_33930__$1);

return statearr_33988;
})();
if(cljs.core.truth_(inst_33931)){
var statearr_33989_34071 = state_33982__$1;
(statearr_33989_34071[(1)] = (30));

} else {
var statearr_33990_34072 = state_33982__$1;
(statearr_33990_34072[(1)] = (31));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33983 === (1))){
var state_33982__$1 = state_33982;
var statearr_33991_34073 = state_33982__$1;
(statearr_33991_34073[(2)] = null);

(statearr_33991_34073[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33983 === (24))){
var inst_33881 = (state_33982[(7)]);
var inst_33900 = (state_33982[(2)]);
var inst_33901 = cljs.core.next.call(null,inst_33881);
var inst_33859 = inst_33901;
var inst_33860 = null;
var inst_33861 = (0);
var inst_33862 = (0);
var state_33982__$1 = (function (){var statearr_33992 = state_33982;
(statearr_33992[(13)] = inst_33860);

(statearr_33992[(14)] = inst_33859);

(statearr_33992[(15)] = inst_33861);

(statearr_33992[(16)] = inst_33862);

(statearr_33992[(17)] = inst_33900);

return statearr_33992;
})();
var statearr_33993_34074 = state_33982__$1;
(statearr_33993_34074[(2)] = null);

(statearr_33993_34074[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33983 === (39))){
var state_33982__$1 = state_33982;
var statearr_33997_34075 = state_33982__$1;
(statearr_33997_34075[(2)] = null);

(statearr_33997_34075[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33983 === (4))){
var inst_33850 = (state_33982[(11)]);
var inst_33850__$1 = (state_33982[(2)]);
var inst_33851 = (inst_33850__$1 == null);
var state_33982__$1 = (function (){var statearr_33998 = state_33982;
(statearr_33998[(11)] = inst_33850__$1);

return statearr_33998;
})();
if(cljs.core.truth_(inst_33851)){
var statearr_33999_34076 = state_33982__$1;
(statearr_33999_34076[(1)] = (5));

} else {
var statearr_34000_34077 = state_33982__$1;
(statearr_34000_34077[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33983 === (15))){
var inst_33860 = (state_33982[(13)]);
var inst_33859 = (state_33982[(14)]);
var inst_33861 = (state_33982[(15)]);
var inst_33862 = (state_33982[(16)]);
var inst_33877 = (state_33982[(2)]);
var inst_33878 = (inst_33862 + (1));
var tmp33994 = inst_33860;
var tmp33995 = inst_33859;
var tmp33996 = inst_33861;
var inst_33859__$1 = tmp33995;
var inst_33860__$1 = tmp33994;
var inst_33861__$1 = tmp33996;
var inst_33862__$1 = inst_33878;
var state_33982__$1 = (function (){var statearr_34001 = state_33982;
(statearr_34001[(13)] = inst_33860__$1);

(statearr_34001[(14)] = inst_33859__$1);

(statearr_34001[(15)] = inst_33861__$1);

(statearr_34001[(18)] = inst_33877);

(statearr_34001[(16)] = inst_33862__$1);

return statearr_34001;
})();
var statearr_34002_34078 = state_33982__$1;
(statearr_34002_34078[(2)] = null);

(statearr_34002_34078[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33983 === (21))){
var inst_33904 = (state_33982[(2)]);
var state_33982__$1 = state_33982;
var statearr_34006_34079 = state_33982__$1;
(statearr_34006_34079[(2)] = inst_33904);

(statearr_34006_34079[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33983 === (31))){
var inst_33930 = (state_33982[(9)]);
var inst_33934 = done.call(null,null);
var inst_33935 = cljs.core.async.untap_STAR_.call(null,m,inst_33930);
var state_33982__$1 = (function (){var statearr_34007 = state_33982;
(statearr_34007[(19)] = inst_33934);

return statearr_34007;
})();
var statearr_34008_34080 = state_33982__$1;
(statearr_34008_34080[(2)] = inst_33935);

(statearr_34008_34080[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33983 === (32))){
var inst_33924 = (state_33982[(20)]);
var inst_33923 = (state_33982[(10)]);
var inst_33922 = (state_33982[(21)]);
var inst_33925 = (state_33982[(12)]);
var inst_33937 = (state_33982[(2)]);
var inst_33938 = (inst_33925 + (1));
var tmp34003 = inst_33924;
var tmp34004 = inst_33923;
var tmp34005 = inst_33922;
var inst_33922__$1 = tmp34005;
var inst_33923__$1 = tmp34004;
var inst_33924__$1 = tmp34003;
var inst_33925__$1 = inst_33938;
var state_33982__$1 = (function (){var statearr_34009 = state_33982;
(statearr_34009[(20)] = inst_33924__$1);

(statearr_34009[(22)] = inst_33937);

(statearr_34009[(10)] = inst_33923__$1);

(statearr_34009[(21)] = inst_33922__$1);

(statearr_34009[(12)] = inst_33925__$1);

return statearr_34009;
})();
var statearr_34010_34081 = state_33982__$1;
(statearr_34010_34081[(2)] = null);

(statearr_34010_34081[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33983 === (40))){
var inst_33950 = (state_33982[(23)]);
var inst_33954 = done.call(null,null);
var inst_33955 = cljs.core.async.untap_STAR_.call(null,m,inst_33950);
var state_33982__$1 = (function (){var statearr_34011 = state_33982;
(statearr_34011[(24)] = inst_33954);

return statearr_34011;
})();
var statearr_34012_34082 = state_33982__$1;
(statearr_34012_34082[(2)] = inst_33955);

(statearr_34012_34082[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33983 === (33))){
var inst_33941 = (state_33982[(25)]);
var inst_33943 = cljs.core.chunked_seq_QMARK_.call(null,inst_33941);
var state_33982__$1 = state_33982;
if(inst_33943){
var statearr_34013_34083 = state_33982__$1;
(statearr_34013_34083[(1)] = (36));

} else {
var statearr_34014_34084 = state_33982__$1;
(statearr_34014_34084[(1)] = (37));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33983 === (13))){
var inst_33871 = (state_33982[(26)]);
var inst_33874 = cljs.core.async.close_BANG_.call(null,inst_33871);
var state_33982__$1 = state_33982;
var statearr_34015_34085 = state_33982__$1;
(statearr_34015_34085[(2)] = inst_33874);

(statearr_34015_34085[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33983 === (22))){
var inst_33894 = (state_33982[(8)]);
var inst_33897 = cljs.core.async.close_BANG_.call(null,inst_33894);
var state_33982__$1 = state_33982;
var statearr_34016_34086 = state_33982__$1;
(statearr_34016_34086[(2)] = inst_33897);

(statearr_34016_34086[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33983 === (36))){
var inst_33941 = (state_33982[(25)]);
var inst_33945 = cljs.core.chunk_first.call(null,inst_33941);
var inst_33946 = cljs.core.chunk_rest.call(null,inst_33941);
var inst_33947 = cljs.core.count.call(null,inst_33945);
var inst_33922 = inst_33946;
var inst_33923 = inst_33945;
var inst_33924 = inst_33947;
var inst_33925 = (0);
var state_33982__$1 = (function (){var statearr_34017 = state_33982;
(statearr_34017[(20)] = inst_33924);

(statearr_34017[(10)] = inst_33923);

(statearr_34017[(21)] = inst_33922);

(statearr_34017[(12)] = inst_33925);

return statearr_34017;
})();
var statearr_34018_34087 = state_33982__$1;
(statearr_34018_34087[(2)] = null);

(statearr_34018_34087[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33983 === (41))){
var inst_33941 = (state_33982[(25)]);
var inst_33957 = (state_33982[(2)]);
var inst_33958 = cljs.core.next.call(null,inst_33941);
var inst_33922 = inst_33958;
var inst_33923 = null;
var inst_33924 = (0);
var inst_33925 = (0);
var state_33982__$1 = (function (){var statearr_34019 = state_33982;
(statearr_34019[(20)] = inst_33924);

(statearr_34019[(27)] = inst_33957);

(statearr_34019[(10)] = inst_33923);

(statearr_34019[(21)] = inst_33922);

(statearr_34019[(12)] = inst_33925);

return statearr_34019;
})();
var statearr_34020_34088 = state_33982__$1;
(statearr_34020_34088[(2)] = null);

(statearr_34020_34088[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33983 === (43))){
var state_33982__$1 = state_33982;
var statearr_34021_34089 = state_33982__$1;
(statearr_34021_34089[(2)] = null);

(statearr_34021_34089[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33983 === (29))){
var inst_33966 = (state_33982[(2)]);
var state_33982__$1 = state_33982;
var statearr_34022_34090 = state_33982__$1;
(statearr_34022_34090[(2)] = inst_33966);

(statearr_34022_34090[(1)] = (26));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33983 === (44))){
var inst_33975 = (state_33982[(2)]);
var state_33982__$1 = (function (){var statearr_34023 = state_33982;
(statearr_34023[(28)] = inst_33975);

return statearr_34023;
})();
var statearr_34024_34091 = state_33982__$1;
(statearr_34024_34091[(2)] = null);

(statearr_34024_34091[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33983 === (6))){
var inst_33914 = (state_33982[(29)]);
var inst_33913 = cljs.core.deref.call(null,cs);
var inst_33914__$1 = cljs.core.keys.call(null,inst_33913);
var inst_33915 = cljs.core.count.call(null,inst_33914__$1);
var inst_33916 = cljs.core.reset_BANG_.call(null,dctr,inst_33915);
var inst_33921 = cljs.core.seq.call(null,inst_33914__$1);
var inst_33922 = inst_33921;
var inst_33923 = null;
var inst_33924 = (0);
var inst_33925 = (0);
var state_33982__$1 = (function (){var statearr_34025 = state_33982;
(statearr_34025[(20)] = inst_33924);

(statearr_34025[(10)] = inst_33923);

(statearr_34025[(29)] = inst_33914__$1);

(statearr_34025[(21)] = inst_33922);

(statearr_34025[(30)] = inst_33916);

(statearr_34025[(12)] = inst_33925);

return statearr_34025;
})();
var statearr_34026_34092 = state_33982__$1;
(statearr_34026_34092[(2)] = null);

(statearr_34026_34092[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33983 === (28))){
var inst_33941 = (state_33982[(25)]);
var inst_33922 = (state_33982[(21)]);
var inst_33941__$1 = cljs.core.seq.call(null,inst_33922);
var state_33982__$1 = (function (){var statearr_34027 = state_33982;
(statearr_34027[(25)] = inst_33941__$1);

return statearr_34027;
})();
if(inst_33941__$1){
var statearr_34028_34093 = state_33982__$1;
(statearr_34028_34093[(1)] = (33));

} else {
var statearr_34029_34094 = state_33982__$1;
(statearr_34029_34094[(1)] = (34));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33983 === (25))){
var inst_33924 = (state_33982[(20)]);
var inst_33925 = (state_33982[(12)]);
var inst_33927 = (inst_33925 < inst_33924);
var inst_33928 = inst_33927;
var state_33982__$1 = state_33982;
if(cljs.core.truth_(inst_33928)){
var statearr_34030_34095 = state_33982__$1;
(statearr_34030_34095[(1)] = (27));

} else {
var statearr_34031_34096 = state_33982__$1;
(statearr_34031_34096[(1)] = (28));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33983 === (34))){
var state_33982__$1 = state_33982;
var statearr_34032_34097 = state_33982__$1;
(statearr_34032_34097[(2)] = null);

(statearr_34032_34097[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33983 === (17))){
var state_33982__$1 = state_33982;
var statearr_34033_34098 = state_33982__$1;
(statearr_34033_34098[(2)] = null);

(statearr_34033_34098[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33983 === (3))){
var inst_33980 = (state_33982[(2)]);
var state_33982__$1 = state_33982;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_33982__$1,inst_33980);
} else {
if((state_val_33983 === (12))){
var inst_33909 = (state_33982[(2)]);
var state_33982__$1 = state_33982;
var statearr_34034_34099 = state_33982__$1;
(statearr_34034_34099[(2)] = inst_33909);

(statearr_34034_34099[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33983 === (2))){
var state_33982__$1 = state_33982;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_33982__$1,(4),ch);
} else {
if((state_val_33983 === (23))){
var state_33982__$1 = state_33982;
var statearr_34035_34100 = state_33982__$1;
(statearr_34035_34100[(2)] = null);

(statearr_34035_34100[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33983 === (35))){
var inst_33964 = (state_33982[(2)]);
var state_33982__$1 = state_33982;
var statearr_34036_34101 = state_33982__$1;
(statearr_34036_34101[(2)] = inst_33964);

(statearr_34036_34101[(1)] = (29));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33983 === (19))){
var inst_33881 = (state_33982[(7)]);
var inst_33885 = cljs.core.chunk_first.call(null,inst_33881);
var inst_33886 = cljs.core.chunk_rest.call(null,inst_33881);
var inst_33887 = cljs.core.count.call(null,inst_33885);
var inst_33859 = inst_33886;
var inst_33860 = inst_33885;
var inst_33861 = inst_33887;
var inst_33862 = (0);
var state_33982__$1 = (function (){var statearr_34037 = state_33982;
(statearr_34037[(13)] = inst_33860);

(statearr_34037[(14)] = inst_33859);

(statearr_34037[(15)] = inst_33861);

(statearr_34037[(16)] = inst_33862);

return statearr_34037;
})();
var statearr_34038_34102 = state_33982__$1;
(statearr_34038_34102[(2)] = null);

(statearr_34038_34102[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33983 === (11))){
var inst_33881 = (state_33982[(7)]);
var inst_33859 = (state_33982[(14)]);
var inst_33881__$1 = cljs.core.seq.call(null,inst_33859);
var state_33982__$1 = (function (){var statearr_34039 = state_33982;
(statearr_34039[(7)] = inst_33881__$1);

return statearr_34039;
})();
if(inst_33881__$1){
var statearr_34040_34103 = state_33982__$1;
(statearr_34040_34103[(1)] = (16));

} else {
var statearr_34041_34104 = state_33982__$1;
(statearr_34041_34104[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33983 === (9))){
var inst_33911 = (state_33982[(2)]);
var state_33982__$1 = state_33982;
var statearr_34042_34105 = state_33982__$1;
(statearr_34042_34105[(2)] = inst_33911);

(statearr_34042_34105[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33983 === (5))){
var inst_33857 = cljs.core.deref.call(null,cs);
var inst_33858 = cljs.core.seq.call(null,inst_33857);
var inst_33859 = inst_33858;
var inst_33860 = null;
var inst_33861 = (0);
var inst_33862 = (0);
var state_33982__$1 = (function (){var statearr_34043 = state_33982;
(statearr_34043[(13)] = inst_33860);

(statearr_34043[(14)] = inst_33859);

(statearr_34043[(15)] = inst_33861);

(statearr_34043[(16)] = inst_33862);

return statearr_34043;
})();
var statearr_34044_34106 = state_33982__$1;
(statearr_34044_34106[(2)] = null);

(statearr_34044_34106[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33983 === (14))){
var state_33982__$1 = state_33982;
var statearr_34045_34107 = state_33982__$1;
(statearr_34045_34107[(2)] = null);

(statearr_34045_34107[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33983 === (45))){
var inst_33972 = (state_33982[(2)]);
var state_33982__$1 = state_33982;
var statearr_34046_34108 = state_33982__$1;
(statearr_34046_34108[(2)] = inst_33972);

(statearr_34046_34108[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33983 === (26))){
var inst_33914 = (state_33982[(29)]);
var inst_33968 = (state_33982[(2)]);
var inst_33969 = cljs.core.seq.call(null,inst_33914);
var state_33982__$1 = (function (){var statearr_34047 = state_33982;
(statearr_34047[(31)] = inst_33968);

return statearr_34047;
})();
if(inst_33969){
var statearr_34048_34109 = state_33982__$1;
(statearr_34048_34109[(1)] = (42));

} else {
var statearr_34049_34110 = state_33982__$1;
(statearr_34049_34110[(1)] = (43));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33983 === (16))){
var inst_33881 = (state_33982[(7)]);
var inst_33883 = cljs.core.chunked_seq_QMARK_.call(null,inst_33881);
var state_33982__$1 = state_33982;
if(inst_33883){
var statearr_34050_34111 = state_33982__$1;
(statearr_34050_34111[(1)] = (19));

} else {
var statearr_34051_34112 = state_33982__$1;
(statearr_34051_34112[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33983 === (38))){
var inst_33961 = (state_33982[(2)]);
var state_33982__$1 = state_33982;
var statearr_34052_34113 = state_33982__$1;
(statearr_34052_34113[(2)] = inst_33961);

(statearr_34052_34113[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33983 === (30))){
var state_33982__$1 = state_33982;
var statearr_34053_34114 = state_33982__$1;
(statearr_34053_34114[(2)] = null);

(statearr_34053_34114[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33983 === (10))){
var inst_33860 = (state_33982[(13)]);
var inst_33862 = (state_33982[(16)]);
var inst_33870 = cljs.core._nth.call(null,inst_33860,inst_33862);
var inst_33871 = cljs.core.nth.call(null,inst_33870,(0),null);
var inst_33872 = cljs.core.nth.call(null,inst_33870,(1),null);
var state_33982__$1 = (function (){var statearr_34054 = state_33982;
(statearr_34054[(26)] = inst_33871);

return statearr_34054;
})();
if(cljs.core.truth_(inst_33872)){
var statearr_34055_34115 = state_33982__$1;
(statearr_34055_34115[(1)] = (13));

} else {
var statearr_34056_34116 = state_33982__$1;
(statearr_34056_34116[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33983 === (18))){
var inst_33907 = (state_33982[(2)]);
var state_33982__$1 = state_33982;
var statearr_34057_34117 = state_33982__$1;
(statearr_34057_34117[(2)] = inst_33907);

(statearr_34057_34117[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33983 === (42))){
var state_33982__$1 = state_33982;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_33982__$1,(45),dchan);
} else {
if((state_val_33983 === (37))){
var inst_33950 = (state_33982[(23)]);
var inst_33941 = (state_33982[(25)]);
var inst_33850 = (state_33982[(11)]);
var inst_33950__$1 = cljs.core.first.call(null,inst_33941);
var inst_33951 = cljs.core.async.put_BANG_.call(null,inst_33950__$1,inst_33850,done);
var state_33982__$1 = (function (){var statearr_34058 = state_33982;
(statearr_34058[(23)] = inst_33950__$1);

return statearr_34058;
})();
if(cljs.core.truth_(inst_33951)){
var statearr_34059_34118 = state_33982__$1;
(statearr_34059_34118[(1)] = (39));

} else {
var statearr_34060_34119 = state_33982__$1;
(statearr_34060_34119[(1)] = (40));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33983 === (8))){
var inst_33861 = (state_33982[(15)]);
var inst_33862 = (state_33982[(16)]);
var inst_33864 = (inst_33862 < inst_33861);
var inst_33865 = inst_33864;
var state_33982__$1 = state_33982;
if(cljs.core.truth_(inst_33865)){
var statearr_34061_34120 = state_33982__$1;
(statearr_34061_34120[(1)] = (10));

} else {
var statearr_34062_34121 = state_33982__$1;
(statearr_34062_34121[(1)] = (11));

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
});})(c__33248__auto___34067,cs,m,dchan,dctr,done))
;
return ((function (switch__33158__auto__,c__33248__auto___34067,cs,m,dchan,dctr,done){
return (function() {
var cljs$core$async$mult_$_state_machine__33159__auto__ = null;
var cljs$core$async$mult_$_state_machine__33159__auto____0 = (function (){
var statearr_34063 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_34063[(0)] = cljs$core$async$mult_$_state_machine__33159__auto__);

(statearr_34063[(1)] = (1));

return statearr_34063;
});
var cljs$core$async$mult_$_state_machine__33159__auto____1 = (function (state_33982){
while(true){
var ret_value__33160__auto__ = (function (){try{while(true){
var result__33161__auto__ = switch__33158__auto__.call(null,state_33982);
if(cljs.core.keyword_identical_QMARK_.call(null,result__33161__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__33161__auto__;
}
break;
}
}catch (e34064){if((e34064 instanceof Object)){
var ex__33162__auto__ = e34064;
var statearr_34065_34122 = state_33982;
(statearr_34065_34122[(5)] = ex__33162__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_33982);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e34064;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__33160__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__34123 = state_33982;
state_33982 = G__34123;
continue;
} else {
return ret_value__33160__auto__;
}
break;
}
});
cljs$core$async$mult_$_state_machine__33159__auto__ = function(state_33982){
switch(arguments.length){
case 0:
return cljs$core$async$mult_$_state_machine__33159__auto____0.call(this);
case 1:
return cljs$core$async$mult_$_state_machine__33159__auto____1.call(this,state_33982);
}
throw(new Error('Invalid arity: ' + (arguments.length - 1)));
};
cljs$core$async$mult_$_state_machine__33159__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mult_$_state_machine__33159__auto____0;
cljs$core$async$mult_$_state_machine__33159__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mult_$_state_machine__33159__auto____1;
return cljs$core$async$mult_$_state_machine__33159__auto__;
})()
;})(switch__33158__auto__,c__33248__auto___34067,cs,m,dchan,dctr,done))
})();
var state__33250__auto__ = (function (){var statearr_34066 = f__33249__auto__.call(null);
(statearr_34066[(6)] = c__33248__auto___34067);

return statearr_34066;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__33250__auto__);
});})(c__33248__auto___34067,cs,m,dchan,dctr,done))
);


return m;
});
/**
 * Copies the mult source onto the supplied channel.
 * 
 *   By default the channel will be closed when the source closes,
 *   but can be determined by the close? parameter.
 */
cljs.core.async.tap = (function cljs$core$async$tap(var_args){
var G__34125 = arguments.length;
switch (G__34125) {
case 2:
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.core.async.tap.cljs$core$IFn$_invoke$arity$2 = (function (mult,ch){
return cljs.core.async.tap.call(null,mult,ch,true);
});

cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3 = (function (mult,ch,close_QMARK_){
cljs.core.async.tap_STAR_.call(null,mult,ch,close_QMARK_);

return ch;
});

cljs.core.async.tap.cljs$lang$maxFixedArity = 3;

/**
 * Disconnects a target channel from a mult
 */
cljs.core.async.untap = (function cljs$core$async$untap(mult,ch){
return cljs.core.async.untap_STAR_.call(null,mult,ch);
});
/**
 * Disconnects all target channels from a mult
 */
cljs.core.async.untap_all = (function cljs$core$async$untap_all(mult){
return cljs.core.async.untap_all_STAR_.call(null,mult);
});

/**
 * @interface
 */
cljs.core.async.Mix = function(){};

cljs.core.async.admix_STAR_ = (function cljs$core$async$admix_STAR_(m,ch){
if((!((m == null))) && (!((m.cljs$core$async$Mix$admix_STAR_$arity$2 == null)))){
return m.cljs$core$async$Mix$admix_STAR_$arity$2(m,ch);
} else {
var x__30893__auto__ = (((m == null))?null:m);
var m__30894__auto__ = (cljs.core.async.admix_STAR_[goog.typeOf(x__30893__auto__)]);
if(!((m__30894__auto__ == null))){
return m__30894__auto__.call(null,m,ch);
} else {
var m__30894__auto____$1 = (cljs.core.async.admix_STAR_["_"]);
if(!((m__30894__auto____$1 == null))){
return m__30894__auto____$1.call(null,m,ch);
} else {
throw cljs.core.missing_protocol.call(null,"Mix.admix*",m);
}
}
}
});

cljs.core.async.unmix_STAR_ = (function cljs$core$async$unmix_STAR_(m,ch){
if((!((m == null))) && (!((m.cljs$core$async$Mix$unmix_STAR_$arity$2 == null)))){
return m.cljs$core$async$Mix$unmix_STAR_$arity$2(m,ch);
} else {
var x__30893__auto__ = (((m == null))?null:m);
var m__30894__auto__ = (cljs.core.async.unmix_STAR_[goog.typeOf(x__30893__auto__)]);
if(!((m__30894__auto__ == null))){
return m__30894__auto__.call(null,m,ch);
} else {
var m__30894__auto____$1 = (cljs.core.async.unmix_STAR_["_"]);
if(!((m__30894__auto____$1 == null))){
return m__30894__auto____$1.call(null,m,ch);
} else {
throw cljs.core.missing_protocol.call(null,"Mix.unmix*",m);
}
}
}
});

cljs.core.async.unmix_all_STAR_ = (function cljs$core$async$unmix_all_STAR_(m){
if((!((m == null))) && (!((m.cljs$core$async$Mix$unmix_all_STAR_$arity$1 == null)))){
return m.cljs$core$async$Mix$unmix_all_STAR_$arity$1(m);
} else {
var x__30893__auto__ = (((m == null))?null:m);
var m__30894__auto__ = (cljs.core.async.unmix_all_STAR_[goog.typeOf(x__30893__auto__)]);
if(!((m__30894__auto__ == null))){
return m__30894__auto__.call(null,m);
} else {
var m__30894__auto____$1 = (cljs.core.async.unmix_all_STAR_["_"]);
if(!((m__30894__auto____$1 == null))){
return m__30894__auto____$1.call(null,m);
} else {
throw cljs.core.missing_protocol.call(null,"Mix.unmix-all*",m);
}
}
}
});

cljs.core.async.toggle_STAR_ = (function cljs$core$async$toggle_STAR_(m,state_map){
if((!((m == null))) && (!((m.cljs$core$async$Mix$toggle_STAR_$arity$2 == null)))){
return m.cljs$core$async$Mix$toggle_STAR_$arity$2(m,state_map);
} else {
var x__30893__auto__ = (((m == null))?null:m);
var m__30894__auto__ = (cljs.core.async.toggle_STAR_[goog.typeOf(x__30893__auto__)]);
if(!((m__30894__auto__ == null))){
return m__30894__auto__.call(null,m,state_map);
} else {
var m__30894__auto____$1 = (cljs.core.async.toggle_STAR_["_"]);
if(!((m__30894__auto____$1 == null))){
return m__30894__auto____$1.call(null,m,state_map);
} else {
throw cljs.core.missing_protocol.call(null,"Mix.toggle*",m);
}
}
}
});

cljs.core.async.solo_mode_STAR_ = (function cljs$core$async$solo_mode_STAR_(m,mode){
if((!((m == null))) && (!((m.cljs$core$async$Mix$solo_mode_STAR_$arity$2 == null)))){
return m.cljs$core$async$Mix$solo_mode_STAR_$arity$2(m,mode);
} else {
var x__30893__auto__ = (((m == null))?null:m);
var m__30894__auto__ = (cljs.core.async.solo_mode_STAR_[goog.typeOf(x__30893__auto__)]);
if(!((m__30894__auto__ == null))){
return m__30894__auto__.call(null,m,mode);
} else {
var m__30894__auto____$1 = (cljs.core.async.solo_mode_STAR_["_"]);
if(!((m__30894__auto____$1 == null))){
return m__30894__auto____$1.call(null,m,mode);
} else {
throw cljs.core.missing_protocol.call(null,"Mix.solo-mode*",m);
}
}
}
});

cljs.core.async.ioc_alts_BANG_ = (function cljs$core$async$ioc_alts_BANG_(var_args){
var args__31447__auto__ = [];
var len__31440__auto___34137 = arguments.length;
var i__31441__auto___34138 = (0);
while(true){
if((i__31441__auto___34138 < len__31440__auto___34137)){
args__31447__auto__.push((arguments[i__31441__auto___34138]));

var G__34139 = (i__31441__auto___34138 + (1));
i__31441__auto___34138 = G__34139;
continue;
} else {
}
break;
}

var argseq__31448__auto__ = ((((3) < args__31447__auto__.length))?(new cljs.core.IndexedSeq(args__31447__auto__.slice((3)),(0),null)):null);
return cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__31448__auto__);
});

cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (state,cont_block,ports,p__34131){
var map__34132 = p__34131;
var map__34132__$1 = ((((!((map__34132 == null)))?((((map__34132.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__34132.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__34132):map__34132);
var opts = map__34132__$1;
var statearr_34134_34140 = state;
(statearr_34134_34140[(1)] = cont_block);


var temp__5457__auto__ = cljs.core.async.do_alts.call(null,((function (map__34132,map__34132__$1,opts){
return (function (val){
var statearr_34135_34141 = state;
(statearr_34135_34141[(2)] = val);


return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state);
});})(map__34132,map__34132__$1,opts))
,ports,opts);
if(cljs.core.truth_(temp__5457__auto__)){
var cb = temp__5457__auto__;
var statearr_34136_34142 = state;
(statearr_34136_34142[(2)] = cljs.core.deref.call(null,cb));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
});

cljs.core.async.ioc_alts_BANG_.cljs$lang$maxFixedArity = (3);

cljs.core.async.ioc_alts_BANG_.cljs$lang$applyTo = (function (seq34127){
var G__34128 = cljs.core.first.call(null,seq34127);
var seq34127__$1 = cljs.core.next.call(null,seq34127);
var G__34129 = cljs.core.first.call(null,seq34127__$1);
var seq34127__$2 = cljs.core.next.call(null,seq34127__$1);
var G__34130 = cljs.core.first.call(null,seq34127__$2);
var seq34127__$3 = cljs.core.next.call(null,seq34127__$2);
return cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__34128,G__34129,G__34130,seq34127__$3);
});

/**
 * Creates and returns a mix of one or more input channels which will
 *   be put on the supplied out channel. Input sources can be added to
 *   the mix with 'admix', and removed with 'unmix'. A mix supports
 *   soloing, muting and pausing multiple inputs atomically using
 *   'toggle', and can solo using either muting or pausing as determined
 *   by 'solo-mode'.
 * 
 *   Each channel can have zero or more boolean modes set via 'toggle':
 * 
 *   :solo - when true, only this (ond other soloed) channel(s) will appear
 *        in the mix output channel. :mute and :pause states of soloed
 *        channels are ignored. If solo-mode is :mute, non-soloed
 *        channels are muted, if :pause, non-soloed channels are
 *        paused.
 * 
 *   :mute - muted channels will have their contents consumed but not included in the mix
 *   :pause - paused channels will not have their contents consumed (and thus also not included in the mix)
 */
cljs.core.async.mix = (function cljs$core$async$mix(out){
var cs = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var solo_modes = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"pause","pause",-2095325672),null,new cljs.core.Keyword(null,"mute","mute",1151223646),null], null), null);
var attrs = cljs.core.conj.call(null,solo_modes,new cljs.core.Keyword(null,"solo","solo",-316350075));
var solo_mode = cljs.core.atom.call(null,new cljs.core.Keyword(null,"mute","mute",1151223646));
var change = cljs.core.async.chan.call(null);
var changed = ((function (cs,solo_modes,attrs,solo_mode,change){
return (function (){
return cljs.core.async.put_BANG_.call(null,change,true);
});})(cs,solo_modes,attrs,solo_mode,change))
;
var pick = ((function (cs,solo_modes,attrs,solo_mode,change,changed){
return (function (attr,chs){
return cljs.core.reduce_kv.call(null,((function (cs,solo_modes,attrs,solo_mode,change,changed){
return (function (ret,c,v){
if(cljs.core.truth_(attr.call(null,v))){
return cljs.core.conj.call(null,ret,c);
} else {
return ret;
}
});})(cs,solo_modes,attrs,solo_mode,change,changed))
,cljs.core.PersistentHashSet.EMPTY,chs);
});})(cs,solo_modes,attrs,solo_mode,change,changed))
;
var calc_state = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick){
return (function (){
var chs = cljs.core.deref.call(null,cs);
var mode = cljs.core.deref.call(null,solo_mode);
var solos = pick.call(null,new cljs.core.Keyword(null,"solo","solo",-316350075),chs);
var pauses = pick.call(null,new cljs.core.Keyword(null,"pause","pause",-2095325672),chs);
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"solos","solos",1441458643),solos,new cljs.core.Keyword(null,"mutes","mutes",1068806309),pick.call(null,new cljs.core.Keyword(null,"mute","mute",1151223646),chs),new cljs.core.Keyword(null,"reads","reads",-1215067361),cljs.core.conj.call(null,(((cljs.core._EQ_.call(null,mode,new cljs.core.Keyword(null,"pause","pause",-2095325672))) && (!(cljs.core.empty_QMARK_.call(null,solos))))?cljs.core.vec.call(null,solos):cljs.core.vec.call(null,cljs.core.remove.call(null,pauses,cljs.core.keys.call(null,chs)))),change)], null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick))
;
var m = (function (){
if(typeof cljs.core.async.t_cljs$core$async34143 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mix}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async34143 = (function (out,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,meta34144){
this.out = out;
this.cs = cs;
this.solo_modes = solo_modes;
this.attrs = attrs;
this.solo_mode = solo_mode;
this.change = change;
this.changed = changed;
this.pick = pick;
this.calc_state = calc_state;
this.meta34144 = meta34144;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
cljs.core.async.t_cljs$core$async34143.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_34145,meta34144__$1){
var self__ = this;
var _34145__$1 = this;
return (new cljs.core.async.t_cljs$core$async34143(self__.out,self__.cs,self__.solo_modes,self__.attrs,self__.solo_mode,self__.change,self__.changed,self__.pick,self__.calc_state,meta34144__$1));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async34143.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_34145){
var self__ = this;
var _34145__$1 = this;
return self__.meta34144;
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async34143.prototype.cljs$core$async$Mux$ = cljs.core.PROTOCOL_SENTINEL;

cljs.core.async.t_cljs$core$async34143.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_){
var self__ = this;
var ___$1 = this;
return self__.out;
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async34143.prototype.cljs$core$async$Mix$ = cljs.core.PROTOCOL_SENTINEL;

cljs.core.async.t_cljs$core$async34143.prototype.cljs$core$async$Mix$admix_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.assoc,ch,cljs.core.PersistentArrayMap.EMPTY);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async34143.prototype.cljs$core$async$Mix$unmix_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.dissoc,ch);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async34143.prototype.cljs$core$async$Mix$unmix_all_STAR_$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_.call(null,self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async34143.prototype.cljs$core$async$Mix$toggle_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,state_map){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.partial.call(null,cljs.core.merge_with,cljs.core.merge),state_map);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async34143.prototype.cljs$core$async$Mix$solo_mode_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,mode){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_(self__.solo_modes.call(null,mode))){
} else {
throw (new Error(["Assert failed: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(["mode must be one of: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(self__.solo_modes)].join('')),"\n","(solo-modes mode)"].join('')));
}

cljs.core.reset_BANG_.call(null,self__.solo_mode,mode);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async34143.getBasis = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (){
return new cljs.core.PersistentVector(null, 10, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"out","out",729986010,null),new cljs.core.Symbol(null,"cs","cs",-117024463,null),new cljs.core.Symbol(null,"solo-modes","solo-modes",882180540,null),new cljs.core.Symbol(null,"attrs","attrs",-450137186,null),new cljs.core.Symbol(null,"solo-mode","solo-mode",2031788074,null),new cljs.core.Symbol(null,"change","change",477485025,null),new cljs.core.Symbol(null,"changed","changed",-2083710852,null),new cljs.core.Symbol(null,"pick","pick",1300068175,null),new cljs.core.Symbol(null,"calc-state","calc-state",-349968968,null),new cljs.core.Symbol(null,"meta34144","meta34144",1629469954,null)], null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async34143.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async34143.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async34143";

cljs.core.async.t_cljs$core$async34143.cljs$lang$ctorPrWriter = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (this__30831__auto__,writer__30832__auto__,opt__30833__auto__){
return cljs.core._write.call(null,writer__30832__auto__,"cljs.core.async/t_cljs$core$async34143");
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.__GT_t_cljs$core$async34143 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function cljs$core$async$mix_$___GT_t_cljs$core$async34143(out__$1,cs__$1,solo_modes__$1,attrs__$1,solo_mode__$1,change__$1,changed__$1,pick__$1,calc_state__$1,meta34144){
return (new cljs.core.async.t_cljs$core$async34143(out__$1,cs__$1,solo_modes__$1,attrs__$1,solo_mode__$1,change__$1,changed__$1,pick__$1,calc_state__$1,meta34144));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

}

return (new cljs.core.async.t_cljs$core$async34143(out,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var c__33248__auto___34307 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__33248__auto___34307,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function (){
var f__33249__auto__ = (function (){var switch__33158__auto__ = ((function (c__33248__auto___34307,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function (state_34247){
var state_val_34248 = (state_34247[(1)]);
if((state_val_34248 === (7))){
var inst_34162 = (state_34247[(2)]);
var state_34247__$1 = state_34247;
var statearr_34249_34308 = state_34247__$1;
(statearr_34249_34308[(2)] = inst_34162);

(statearr_34249_34308[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34248 === (20))){
var inst_34174 = (state_34247[(7)]);
var state_34247__$1 = state_34247;
var statearr_34250_34309 = state_34247__$1;
(statearr_34250_34309[(2)] = inst_34174);

(statearr_34250_34309[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34248 === (27))){
var state_34247__$1 = state_34247;
var statearr_34251_34310 = state_34247__$1;
(statearr_34251_34310[(2)] = null);

(statearr_34251_34310[(1)] = (28));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34248 === (1))){
var inst_34149 = (state_34247[(8)]);
var inst_34149__$1 = calc_state.call(null);
var inst_34151 = (inst_34149__$1 == null);
var inst_34152 = cljs.core.not.call(null,inst_34151);
var state_34247__$1 = (function (){var statearr_34252 = state_34247;
(statearr_34252[(8)] = inst_34149__$1);

return statearr_34252;
})();
if(inst_34152){
var statearr_34253_34311 = state_34247__$1;
(statearr_34253_34311[(1)] = (2));

} else {
var statearr_34254_34312 = state_34247__$1;
(statearr_34254_34312[(1)] = (3));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34248 === (24))){
var inst_34198 = (state_34247[(9)]);
var inst_34221 = (state_34247[(10)]);
var inst_34207 = (state_34247[(11)]);
var inst_34221__$1 = inst_34198.call(null,inst_34207);
var state_34247__$1 = (function (){var statearr_34255 = state_34247;
(statearr_34255[(10)] = inst_34221__$1);

return statearr_34255;
})();
if(cljs.core.truth_(inst_34221__$1)){
var statearr_34256_34313 = state_34247__$1;
(statearr_34256_34313[(1)] = (29));

} else {
var statearr_34257_34314 = state_34247__$1;
(statearr_34257_34314[(1)] = (30));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34248 === (4))){
var inst_34165 = (state_34247[(2)]);
var state_34247__$1 = state_34247;
if(cljs.core.truth_(inst_34165)){
var statearr_34258_34315 = state_34247__$1;
(statearr_34258_34315[(1)] = (8));

} else {
var statearr_34259_34316 = state_34247__$1;
(statearr_34259_34316[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34248 === (15))){
var inst_34192 = (state_34247[(2)]);
var state_34247__$1 = state_34247;
if(cljs.core.truth_(inst_34192)){
var statearr_34260_34317 = state_34247__$1;
(statearr_34260_34317[(1)] = (19));

} else {
var statearr_34261_34318 = state_34247__$1;
(statearr_34261_34318[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34248 === (21))){
var inst_34197 = (state_34247[(12)]);
var inst_34197__$1 = (state_34247[(2)]);
var inst_34198 = cljs.core.get.call(null,inst_34197__$1,new cljs.core.Keyword(null,"solos","solos",1441458643));
var inst_34199 = cljs.core.get.call(null,inst_34197__$1,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_34200 = cljs.core.get.call(null,inst_34197__$1,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var state_34247__$1 = (function (){var statearr_34262 = state_34247;
(statearr_34262[(13)] = inst_34199);

(statearr_34262[(9)] = inst_34198);

(statearr_34262[(12)] = inst_34197__$1);

return statearr_34262;
})();
return cljs.core.async.ioc_alts_BANG_.call(null,state_34247__$1,(22),inst_34200);
} else {
if((state_val_34248 === (31))){
var inst_34229 = (state_34247[(2)]);
var state_34247__$1 = state_34247;
if(cljs.core.truth_(inst_34229)){
var statearr_34263_34319 = state_34247__$1;
(statearr_34263_34319[(1)] = (32));

} else {
var statearr_34264_34320 = state_34247__$1;
(statearr_34264_34320[(1)] = (33));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34248 === (32))){
var inst_34206 = (state_34247[(14)]);
var state_34247__$1 = state_34247;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_34247__$1,(35),out,inst_34206);
} else {
if((state_val_34248 === (33))){
var inst_34197 = (state_34247[(12)]);
var inst_34174 = inst_34197;
var state_34247__$1 = (function (){var statearr_34265 = state_34247;
(statearr_34265[(7)] = inst_34174);

return statearr_34265;
})();
var statearr_34266_34321 = state_34247__$1;
(statearr_34266_34321[(2)] = null);

(statearr_34266_34321[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34248 === (13))){
var inst_34174 = (state_34247[(7)]);
var inst_34181 = inst_34174.cljs$lang$protocol_mask$partition0$;
var inst_34182 = (inst_34181 & (64));
var inst_34183 = inst_34174.cljs$core$ISeq$;
var inst_34184 = (cljs.core.PROTOCOL_SENTINEL === inst_34183);
var inst_34185 = (inst_34182) || (inst_34184);
var state_34247__$1 = state_34247;
if(cljs.core.truth_(inst_34185)){
var statearr_34267_34322 = state_34247__$1;
(statearr_34267_34322[(1)] = (16));

} else {
var statearr_34268_34323 = state_34247__$1;
(statearr_34268_34323[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34248 === (22))){
var inst_34207 = (state_34247[(11)]);
var inst_34206 = (state_34247[(14)]);
var inst_34205 = (state_34247[(2)]);
var inst_34206__$1 = cljs.core.nth.call(null,inst_34205,(0),null);
var inst_34207__$1 = cljs.core.nth.call(null,inst_34205,(1),null);
var inst_34208 = (inst_34206__$1 == null);
var inst_34209 = cljs.core._EQ_.call(null,inst_34207__$1,change);
var inst_34210 = (inst_34208) || (inst_34209);
var state_34247__$1 = (function (){var statearr_34269 = state_34247;
(statearr_34269[(11)] = inst_34207__$1);

(statearr_34269[(14)] = inst_34206__$1);

return statearr_34269;
})();
if(cljs.core.truth_(inst_34210)){
var statearr_34270_34324 = state_34247__$1;
(statearr_34270_34324[(1)] = (23));

} else {
var statearr_34271_34325 = state_34247__$1;
(statearr_34271_34325[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34248 === (36))){
var inst_34197 = (state_34247[(12)]);
var inst_34174 = inst_34197;
var state_34247__$1 = (function (){var statearr_34272 = state_34247;
(statearr_34272[(7)] = inst_34174);

return statearr_34272;
})();
var statearr_34273_34326 = state_34247__$1;
(statearr_34273_34326[(2)] = null);

(statearr_34273_34326[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34248 === (29))){
var inst_34221 = (state_34247[(10)]);
var state_34247__$1 = state_34247;
var statearr_34274_34327 = state_34247__$1;
(statearr_34274_34327[(2)] = inst_34221);

(statearr_34274_34327[(1)] = (31));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34248 === (6))){
var state_34247__$1 = state_34247;
var statearr_34275_34328 = state_34247__$1;
(statearr_34275_34328[(2)] = false);

(statearr_34275_34328[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34248 === (28))){
var inst_34217 = (state_34247[(2)]);
var inst_34218 = calc_state.call(null);
var inst_34174 = inst_34218;
var state_34247__$1 = (function (){var statearr_34276 = state_34247;
(statearr_34276[(7)] = inst_34174);

(statearr_34276[(15)] = inst_34217);

return statearr_34276;
})();
var statearr_34277_34329 = state_34247__$1;
(statearr_34277_34329[(2)] = null);

(statearr_34277_34329[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34248 === (25))){
var inst_34243 = (state_34247[(2)]);
var state_34247__$1 = state_34247;
var statearr_34278_34330 = state_34247__$1;
(statearr_34278_34330[(2)] = inst_34243);

(statearr_34278_34330[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34248 === (34))){
var inst_34241 = (state_34247[(2)]);
var state_34247__$1 = state_34247;
var statearr_34279_34331 = state_34247__$1;
(statearr_34279_34331[(2)] = inst_34241);

(statearr_34279_34331[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34248 === (17))){
var state_34247__$1 = state_34247;
var statearr_34280_34332 = state_34247__$1;
(statearr_34280_34332[(2)] = false);

(statearr_34280_34332[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34248 === (3))){
var state_34247__$1 = state_34247;
var statearr_34281_34333 = state_34247__$1;
(statearr_34281_34333[(2)] = false);

(statearr_34281_34333[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34248 === (12))){
var inst_34245 = (state_34247[(2)]);
var state_34247__$1 = state_34247;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_34247__$1,inst_34245);
} else {
if((state_val_34248 === (2))){
var inst_34149 = (state_34247[(8)]);
var inst_34154 = inst_34149.cljs$lang$protocol_mask$partition0$;
var inst_34155 = (inst_34154 & (64));
var inst_34156 = inst_34149.cljs$core$ISeq$;
var inst_34157 = (cljs.core.PROTOCOL_SENTINEL === inst_34156);
var inst_34158 = (inst_34155) || (inst_34157);
var state_34247__$1 = state_34247;
if(cljs.core.truth_(inst_34158)){
var statearr_34282_34334 = state_34247__$1;
(statearr_34282_34334[(1)] = (5));

} else {
var statearr_34283_34335 = state_34247__$1;
(statearr_34283_34335[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34248 === (23))){
var inst_34206 = (state_34247[(14)]);
var inst_34212 = (inst_34206 == null);
var state_34247__$1 = state_34247;
if(cljs.core.truth_(inst_34212)){
var statearr_34284_34336 = state_34247__$1;
(statearr_34284_34336[(1)] = (26));

} else {
var statearr_34285_34337 = state_34247__$1;
(statearr_34285_34337[(1)] = (27));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34248 === (35))){
var inst_34232 = (state_34247[(2)]);
var state_34247__$1 = state_34247;
if(cljs.core.truth_(inst_34232)){
var statearr_34286_34338 = state_34247__$1;
(statearr_34286_34338[(1)] = (36));

} else {
var statearr_34287_34339 = state_34247__$1;
(statearr_34287_34339[(1)] = (37));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34248 === (19))){
var inst_34174 = (state_34247[(7)]);
var inst_34194 = cljs.core.apply.call(null,cljs.core.hash_map,inst_34174);
var state_34247__$1 = state_34247;
var statearr_34288_34340 = state_34247__$1;
(statearr_34288_34340[(2)] = inst_34194);

(statearr_34288_34340[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34248 === (11))){
var inst_34174 = (state_34247[(7)]);
var inst_34178 = (inst_34174 == null);
var inst_34179 = cljs.core.not.call(null,inst_34178);
var state_34247__$1 = state_34247;
if(inst_34179){
var statearr_34289_34341 = state_34247__$1;
(statearr_34289_34341[(1)] = (13));

} else {
var statearr_34290_34342 = state_34247__$1;
(statearr_34290_34342[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34248 === (9))){
var inst_34149 = (state_34247[(8)]);
var state_34247__$1 = state_34247;
var statearr_34291_34343 = state_34247__$1;
(statearr_34291_34343[(2)] = inst_34149);

(statearr_34291_34343[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34248 === (5))){
var state_34247__$1 = state_34247;
var statearr_34292_34344 = state_34247__$1;
(statearr_34292_34344[(2)] = true);

(statearr_34292_34344[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34248 === (14))){
var state_34247__$1 = state_34247;
var statearr_34293_34345 = state_34247__$1;
(statearr_34293_34345[(2)] = false);

(statearr_34293_34345[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34248 === (26))){
var inst_34207 = (state_34247[(11)]);
var inst_34214 = cljs.core.swap_BANG_.call(null,cs,cljs.core.dissoc,inst_34207);
var state_34247__$1 = state_34247;
var statearr_34294_34346 = state_34247__$1;
(statearr_34294_34346[(2)] = inst_34214);

(statearr_34294_34346[(1)] = (28));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34248 === (16))){
var state_34247__$1 = state_34247;
var statearr_34295_34347 = state_34247__$1;
(statearr_34295_34347[(2)] = true);

(statearr_34295_34347[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34248 === (38))){
var inst_34237 = (state_34247[(2)]);
var state_34247__$1 = state_34247;
var statearr_34296_34348 = state_34247__$1;
(statearr_34296_34348[(2)] = inst_34237);

(statearr_34296_34348[(1)] = (34));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34248 === (30))){
var inst_34199 = (state_34247[(13)]);
var inst_34198 = (state_34247[(9)]);
var inst_34207 = (state_34247[(11)]);
var inst_34224 = cljs.core.empty_QMARK_.call(null,inst_34198);
var inst_34225 = inst_34199.call(null,inst_34207);
var inst_34226 = cljs.core.not.call(null,inst_34225);
var inst_34227 = (inst_34224) && (inst_34226);
var state_34247__$1 = state_34247;
var statearr_34297_34349 = state_34247__$1;
(statearr_34297_34349[(2)] = inst_34227);

(statearr_34297_34349[(1)] = (31));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34248 === (10))){
var inst_34149 = (state_34247[(8)]);
var inst_34170 = (state_34247[(2)]);
var inst_34171 = cljs.core.get.call(null,inst_34170,new cljs.core.Keyword(null,"solos","solos",1441458643));
var inst_34172 = cljs.core.get.call(null,inst_34170,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_34173 = cljs.core.get.call(null,inst_34170,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var inst_34174 = inst_34149;
var state_34247__$1 = (function (){var statearr_34298 = state_34247;
(statearr_34298[(16)] = inst_34171);

(statearr_34298[(7)] = inst_34174);

(statearr_34298[(17)] = inst_34172);

(statearr_34298[(18)] = inst_34173);

return statearr_34298;
})();
var statearr_34299_34350 = state_34247__$1;
(statearr_34299_34350[(2)] = null);

(statearr_34299_34350[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34248 === (18))){
var inst_34189 = (state_34247[(2)]);
var state_34247__$1 = state_34247;
var statearr_34300_34351 = state_34247__$1;
(statearr_34300_34351[(2)] = inst_34189);

(statearr_34300_34351[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34248 === (37))){
var state_34247__$1 = state_34247;
var statearr_34301_34352 = state_34247__$1;
(statearr_34301_34352[(2)] = null);

(statearr_34301_34352[(1)] = (38));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34248 === (8))){
var inst_34149 = (state_34247[(8)]);
var inst_34167 = cljs.core.apply.call(null,cljs.core.hash_map,inst_34149);
var state_34247__$1 = state_34247;
var statearr_34302_34353 = state_34247__$1;
(statearr_34302_34353[(2)] = inst_34167);

(statearr_34302_34353[(1)] = (10));


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
});})(c__33248__auto___34307,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
;
return ((function (switch__33158__auto__,c__33248__auto___34307,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function() {
var cljs$core$async$mix_$_state_machine__33159__auto__ = null;
var cljs$core$async$mix_$_state_machine__33159__auto____0 = (function (){
var statearr_34303 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_34303[(0)] = cljs$core$async$mix_$_state_machine__33159__auto__);

(statearr_34303[(1)] = (1));

return statearr_34303;
});
var cljs$core$async$mix_$_state_machine__33159__auto____1 = (function (state_34247){
while(true){
var ret_value__33160__auto__ = (function (){try{while(true){
var result__33161__auto__ = switch__33158__auto__.call(null,state_34247);
if(cljs.core.keyword_identical_QMARK_.call(null,result__33161__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__33161__auto__;
}
break;
}
}catch (e34304){if((e34304 instanceof Object)){
var ex__33162__auto__ = e34304;
var statearr_34305_34354 = state_34247;
(statearr_34305_34354[(5)] = ex__33162__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_34247);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e34304;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__33160__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__34355 = state_34247;
state_34247 = G__34355;
continue;
} else {
return ret_value__33160__auto__;
}
break;
}
});
cljs$core$async$mix_$_state_machine__33159__auto__ = function(state_34247){
switch(arguments.length){
case 0:
return cljs$core$async$mix_$_state_machine__33159__auto____0.call(this);
case 1:
return cljs$core$async$mix_$_state_machine__33159__auto____1.call(this,state_34247);
}
throw(new Error('Invalid arity: ' + (arguments.length - 1)));
};
cljs$core$async$mix_$_state_machine__33159__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mix_$_state_machine__33159__auto____0;
cljs$core$async$mix_$_state_machine__33159__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mix_$_state_machine__33159__auto____1;
return cljs$core$async$mix_$_state_machine__33159__auto__;
})()
;})(switch__33158__auto__,c__33248__auto___34307,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
})();
var state__33250__auto__ = (function (){var statearr_34306 = f__33249__auto__.call(null);
(statearr_34306[(6)] = c__33248__auto___34307);

return statearr_34306;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__33250__auto__);
});})(c__33248__auto___34307,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
);


return m;
});
/**
 * Adds ch as an input to the mix
 */
cljs.core.async.admix = (function cljs$core$async$admix(mix,ch){
return cljs.core.async.admix_STAR_.call(null,mix,ch);
});
/**
 * Removes ch as an input to the mix
 */
cljs.core.async.unmix = (function cljs$core$async$unmix(mix,ch){
return cljs.core.async.unmix_STAR_.call(null,mix,ch);
});
/**
 * removes all inputs from the mix
 */
cljs.core.async.unmix_all = (function cljs$core$async$unmix_all(mix){
return cljs.core.async.unmix_all_STAR_.call(null,mix);
});
/**
 * Atomically sets the state(s) of one or more channels in a mix. The
 *   state map is a map of channels -> channel-state-map. A
 *   channel-state-map is a map of attrs -> boolean, where attr is one or
 *   more of :mute, :pause or :solo. Any states supplied are merged with
 *   the current state.
 * 
 *   Note that channels can be added to a mix via toggle, which can be
 *   used to add channels in a particular (e.g. paused) state.
 */
cljs.core.async.toggle = (function cljs$core$async$toggle(mix,state_map){
return cljs.core.async.toggle_STAR_.call(null,mix,state_map);
});
/**
 * Sets the solo mode of the mix. mode must be one of :mute or :pause
 */
cljs.core.async.solo_mode = (function cljs$core$async$solo_mode(mix,mode){
return cljs.core.async.solo_mode_STAR_.call(null,mix,mode);
});

/**
 * @interface
 */
cljs.core.async.Pub = function(){};

cljs.core.async.sub_STAR_ = (function cljs$core$async$sub_STAR_(p,v,ch,close_QMARK_){
if((!((p == null))) && (!((p.cljs$core$async$Pub$sub_STAR_$arity$4 == null)))){
return p.cljs$core$async$Pub$sub_STAR_$arity$4(p,v,ch,close_QMARK_);
} else {
var x__30893__auto__ = (((p == null))?null:p);
var m__30894__auto__ = (cljs.core.async.sub_STAR_[goog.typeOf(x__30893__auto__)]);
if(!((m__30894__auto__ == null))){
return m__30894__auto__.call(null,p,v,ch,close_QMARK_);
} else {
var m__30894__auto____$1 = (cljs.core.async.sub_STAR_["_"]);
if(!((m__30894__auto____$1 == null))){
return m__30894__auto____$1.call(null,p,v,ch,close_QMARK_);
} else {
throw cljs.core.missing_protocol.call(null,"Pub.sub*",p);
}
}
}
});

cljs.core.async.unsub_STAR_ = (function cljs$core$async$unsub_STAR_(p,v,ch){
if((!((p == null))) && (!((p.cljs$core$async$Pub$unsub_STAR_$arity$3 == null)))){
return p.cljs$core$async$Pub$unsub_STAR_$arity$3(p,v,ch);
} else {
var x__30893__auto__ = (((p == null))?null:p);
var m__30894__auto__ = (cljs.core.async.unsub_STAR_[goog.typeOf(x__30893__auto__)]);
if(!((m__30894__auto__ == null))){
return m__30894__auto__.call(null,p,v,ch);
} else {
var m__30894__auto____$1 = (cljs.core.async.unsub_STAR_["_"]);
if(!((m__30894__auto____$1 == null))){
return m__30894__auto____$1.call(null,p,v,ch);
} else {
throw cljs.core.missing_protocol.call(null,"Pub.unsub*",p);
}
}
}
});

cljs.core.async.unsub_all_STAR_ = (function cljs$core$async$unsub_all_STAR_(var_args){
var G__34357 = arguments.length;
switch (G__34357) {
case 1:
return cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$1 = (function (p){
if((!((p == null))) && (!((p.cljs$core$async$Pub$unsub_all_STAR_$arity$1 == null)))){
return p.cljs$core$async$Pub$unsub_all_STAR_$arity$1(p);
} else {
var x__30893__auto__ = (((p == null))?null:p);
var m__30894__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__30893__auto__)]);
if(!((m__30894__auto__ == null))){
return m__30894__auto__.call(null,p);
} else {
var m__30894__auto____$1 = (cljs.core.async.unsub_all_STAR_["_"]);
if(!((m__30894__auto____$1 == null))){
return m__30894__auto____$1.call(null,p);
} else {
throw cljs.core.missing_protocol.call(null,"Pub.unsub-all*",p);
}
}
}
});

cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2 = (function (p,v){
if((!((p == null))) && (!((p.cljs$core$async$Pub$unsub_all_STAR_$arity$2 == null)))){
return p.cljs$core$async$Pub$unsub_all_STAR_$arity$2(p,v);
} else {
var x__30893__auto__ = (((p == null))?null:p);
var m__30894__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__30893__auto__)]);
if(!((m__30894__auto__ == null))){
return m__30894__auto__.call(null,p,v);
} else {
var m__30894__auto____$1 = (cljs.core.async.unsub_all_STAR_["_"]);
if(!((m__30894__auto____$1 == null))){
return m__30894__auto____$1.call(null,p,v);
} else {
throw cljs.core.missing_protocol.call(null,"Pub.unsub-all*",p);
}
}
}
});

cljs.core.async.unsub_all_STAR_.cljs$lang$maxFixedArity = 2;


/**
 * Creates and returns a pub(lication) of the supplied channel,
 *   partitioned into topics by the topic-fn. topic-fn will be applied to
 *   each value on the channel and the result will determine the 'topic'
 *   on which that value will be put. Channels can be subscribed to
 *   receive copies of topics using 'sub', and unsubscribed using
 *   'unsub'. Each topic will be handled by an internal mult on a
 *   dedicated channel. By default these internal channels are
 *   unbuffered, but a buf-fn can be supplied which, given a topic,
 *   creates a buffer with desired properties.
 * 
 *   Each item is distributed to all subs in parallel and synchronously,
 *   i.e. each sub must accept before the next item is distributed. Use
 *   buffering/windowing to prevent slow subs from holding up the pub.
 * 
 *   Items received when there are no matching subs get dropped.
 * 
 *   Note that if buf-fns are used then each topic is handled
 *   asynchronously, i.e. if a channel is subscribed to more than one
 *   topic it should not expect them to be interleaved identically with
 *   the source.
 */
cljs.core.async.pub = (function cljs$core$async$pub(var_args){
var G__34361 = arguments.length;
switch (G__34361) {
case 2:
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.core.async.pub.cljs$core$IFn$_invoke$arity$2 = (function (ch,topic_fn){
return cljs.core.async.pub.call(null,ch,topic_fn,cljs.core.constantly.call(null,null));
});

cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3 = (function (ch,topic_fn,buf_fn){
var mults = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var ensure_mult = ((function (mults){
return (function (topic){
var or__30160__auto__ = cljs.core.get.call(null,cljs.core.deref.call(null,mults),topic);
if(cljs.core.truth_(or__30160__auto__)){
return or__30160__auto__;
} else {
return cljs.core.get.call(null,cljs.core.swap_BANG_.call(null,mults,((function (or__30160__auto__,mults){
return (function (p1__34359_SHARP_){
if(cljs.core.truth_(p1__34359_SHARP_.call(null,topic))){
return p1__34359_SHARP_;
} else {
return cljs.core.assoc.call(null,p1__34359_SHARP_,topic,cljs.core.async.mult.call(null,cljs.core.async.chan.call(null,buf_fn.call(null,topic))));
}
});})(or__30160__auto__,mults))
),topic);
}
});})(mults))
;
var p = (function (){
if(typeof cljs.core.async.t_cljs$core$async34362 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.Pub}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async34362 = (function (ch,topic_fn,buf_fn,mults,ensure_mult,meta34363){
this.ch = ch;
this.topic_fn = topic_fn;
this.buf_fn = buf_fn;
this.mults = mults;
this.ensure_mult = ensure_mult;
this.meta34363 = meta34363;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
cljs.core.async.t_cljs$core$async34362.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (mults,ensure_mult){
return (function (_34364,meta34363__$1){
var self__ = this;
var _34364__$1 = this;
return (new cljs.core.async.t_cljs$core$async34362(self__.ch,self__.topic_fn,self__.buf_fn,self__.mults,self__.ensure_mult,meta34363__$1));
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async34362.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (mults,ensure_mult){
return (function (_34364){
var self__ = this;
var _34364__$1 = this;
return self__.meta34363;
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async34362.prototype.cljs$core$async$Mux$ = cljs.core.PROTOCOL_SENTINEL;

cljs.core.async.t_cljs$core$async34362.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (mults,ensure_mult){
return (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async34362.prototype.cljs$core$async$Pub$ = cljs.core.PROTOCOL_SENTINEL;

cljs.core.async.t_cljs$core$async34362.prototype.cljs$core$async$Pub$sub_STAR_$arity$4 = ((function (mults,ensure_mult){
return (function (p,topic,ch__$1,close_QMARK_){
var self__ = this;
var p__$1 = this;
var m = self__.ensure_mult.call(null,topic);
return cljs.core.async.tap.call(null,m,ch__$1,close_QMARK_);
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async34362.prototype.cljs$core$async$Pub$unsub_STAR_$arity$3 = ((function (mults,ensure_mult){
return (function (p,topic,ch__$1){
var self__ = this;
var p__$1 = this;
var temp__5457__auto__ = cljs.core.get.call(null,cljs.core.deref.call(null,self__.mults),topic);
if(cljs.core.truth_(temp__5457__auto__)){
var m = temp__5457__auto__;
return cljs.core.async.untap.call(null,m,ch__$1);
} else {
return null;
}
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async34362.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$1 = ((function (mults,ensure_mult){
return (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.reset_BANG_.call(null,self__.mults,cljs.core.PersistentArrayMap.EMPTY);
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async34362.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$2 = ((function (mults,ensure_mult){
return (function (_,topic){
var self__ = this;
var ___$1 = this;
return cljs.core.swap_BANG_.call(null,self__.mults,cljs.core.dissoc,topic);
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async34362.getBasis = ((function (mults,ensure_mult){
return (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"topic-fn","topic-fn",-862449736,null),new cljs.core.Symbol(null,"buf-fn","buf-fn",-1200281591,null),new cljs.core.Symbol(null,"mults","mults",-461114485,null),new cljs.core.Symbol(null,"ensure-mult","ensure-mult",1796584816,null),new cljs.core.Symbol(null,"meta34363","meta34363",-1647661318,null)], null);
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async34362.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async34362.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async34362";

cljs.core.async.t_cljs$core$async34362.cljs$lang$ctorPrWriter = ((function (mults,ensure_mult){
return (function (this__30831__auto__,writer__30832__auto__,opt__30833__auto__){
return cljs.core._write.call(null,writer__30832__auto__,"cljs.core.async/t_cljs$core$async34362");
});})(mults,ensure_mult))
;

cljs.core.async.__GT_t_cljs$core$async34362 = ((function (mults,ensure_mult){
return (function cljs$core$async$__GT_t_cljs$core$async34362(ch__$1,topic_fn__$1,buf_fn__$1,mults__$1,ensure_mult__$1,meta34363){
return (new cljs.core.async.t_cljs$core$async34362(ch__$1,topic_fn__$1,buf_fn__$1,mults__$1,ensure_mult__$1,meta34363));
});})(mults,ensure_mult))
;

}

return (new cljs.core.async.t_cljs$core$async34362(ch,topic_fn,buf_fn,mults,ensure_mult,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var c__33248__auto___34482 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__33248__auto___34482,mults,ensure_mult,p){
return (function (){
var f__33249__auto__ = (function (){var switch__33158__auto__ = ((function (c__33248__auto___34482,mults,ensure_mult,p){
return (function (state_34436){
var state_val_34437 = (state_34436[(1)]);
if((state_val_34437 === (7))){
var inst_34432 = (state_34436[(2)]);
var state_34436__$1 = state_34436;
var statearr_34438_34483 = state_34436__$1;
(statearr_34438_34483[(2)] = inst_34432);

(statearr_34438_34483[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34437 === (20))){
var state_34436__$1 = state_34436;
var statearr_34439_34484 = state_34436__$1;
(statearr_34439_34484[(2)] = null);

(statearr_34439_34484[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34437 === (1))){
var state_34436__$1 = state_34436;
var statearr_34440_34485 = state_34436__$1;
(statearr_34440_34485[(2)] = null);

(statearr_34440_34485[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34437 === (24))){
var inst_34415 = (state_34436[(7)]);
var inst_34424 = cljs.core.swap_BANG_.call(null,mults,cljs.core.dissoc,inst_34415);
var state_34436__$1 = state_34436;
var statearr_34441_34486 = state_34436__$1;
(statearr_34441_34486[(2)] = inst_34424);

(statearr_34441_34486[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34437 === (4))){
var inst_34367 = (state_34436[(8)]);
var inst_34367__$1 = (state_34436[(2)]);
var inst_34368 = (inst_34367__$1 == null);
var state_34436__$1 = (function (){var statearr_34442 = state_34436;
(statearr_34442[(8)] = inst_34367__$1);

return statearr_34442;
})();
if(cljs.core.truth_(inst_34368)){
var statearr_34443_34487 = state_34436__$1;
(statearr_34443_34487[(1)] = (5));

} else {
var statearr_34444_34488 = state_34436__$1;
(statearr_34444_34488[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34437 === (15))){
var inst_34409 = (state_34436[(2)]);
var state_34436__$1 = state_34436;
var statearr_34445_34489 = state_34436__$1;
(statearr_34445_34489[(2)] = inst_34409);

(statearr_34445_34489[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34437 === (21))){
var inst_34429 = (state_34436[(2)]);
var state_34436__$1 = (function (){var statearr_34446 = state_34436;
(statearr_34446[(9)] = inst_34429);

return statearr_34446;
})();
var statearr_34447_34490 = state_34436__$1;
(statearr_34447_34490[(2)] = null);

(statearr_34447_34490[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34437 === (13))){
var inst_34391 = (state_34436[(10)]);
var inst_34393 = cljs.core.chunked_seq_QMARK_.call(null,inst_34391);
var state_34436__$1 = state_34436;
if(inst_34393){
var statearr_34448_34491 = state_34436__$1;
(statearr_34448_34491[(1)] = (16));

} else {
var statearr_34449_34492 = state_34436__$1;
(statearr_34449_34492[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34437 === (22))){
var inst_34421 = (state_34436[(2)]);
var state_34436__$1 = state_34436;
if(cljs.core.truth_(inst_34421)){
var statearr_34450_34493 = state_34436__$1;
(statearr_34450_34493[(1)] = (23));

} else {
var statearr_34451_34494 = state_34436__$1;
(statearr_34451_34494[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34437 === (6))){
var inst_34367 = (state_34436[(8)]);
var inst_34417 = (state_34436[(11)]);
var inst_34415 = (state_34436[(7)]);
var inst_34415__$1 = topic_fn.call(null,inst_34367);
var inst_34416 = cljs.core.deref.call(null,mults);
var inst_34417__$1 = cljs.core.get.call(null,inst_34416,inst_34415__$1);
var state_34436__$1 = (function (){var statearr_34452 = state_34436;
(statearr_34452[(11)] = inst_34417__$1);

(statearr_34452[(7)] = inst_34415__$1);

return statearr_34452;
})();
if(cljs.core.truth_(inst_34417__$1)){
var statearr_34453_34495 = state_34436__$1;
(statearr_34453_34495[(1)] = (19));

} else {
var statearr_34454_34496 = state_34436__$1;
(statearr_34454_34496[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34437 === (25))){
var inst_34426 = (state_34436[(2)]);
var state_34436__$1 = state_34436;
var statearr_34455_34497 = state_34436__$1;
(statearr_34455_34497[(2)] = inst_34426);

(statearr_34455_34497[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34437 === (17))){
var inst_34391 = (state_34436[(10)]);
var inst_34400 = cljs.core.first.call(null,inst_34391);
var inst_34401 = cljs.core.async.muxch_STAR_.call(null,inst_34400);
var inst_34402 = cljs.core.async.close_BANG_.call(null,inst_34401);
var inst_34403 = cljs.core.next.call(null,inst_34391);
var inst_34377 = inst_34403;
var inst_34378 = null;
var inst_34379 = (0);
var inst_34380 = (0);
var state_34436__$1 = (function (){var statearr_34456 = state_34436;
(statearr_34456[(12)] = inst_34380);

(statearr_34456[(13)] = inst_34377);

(statearr_34456[(14)] = inst_34402);

(statearr_34456[(15)] = inst_34379);

(statearr_34456[(16)] = inst_34378);

return statearr_34456;
})();
var statearr_34457_34498 = state_34436__$1;
(statearr_34457_34498[(2)] = null);

(statearr_34457_34498[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34437 === (3))){
var inst_34434 = (state_34436[(2)]);
var state_34436__$1 = state_34436;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_34436__$1,inst_34434);
} else {
if((state_val_34437 === (12))){
var inst_34411 = (state_34436[(2)]);
var state_34436__$1 = state_34436;
var statearr_34458_34499 = state_34436__$1;
(statearr_34458_34499[(2)] = inst_34411);

(statearr_34458_34499[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34437 === (2))){
var state_34436__$1 = state_34436;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_34436__$1,(4),ch);
} else {
if((state_val_34437 === (23))){
var state_34436__$1 = state_34436;
var statearr_34459_34500 = state_34436__$1;
(statearr_34459_34500[(2)] = null);

(statearr_34459_34500[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34437 === (19))){
var inst_34367 = (state_34436[(8)]);
var inst_34417 = (state_34436[(11)]);
var inst_34419 = cljs.core.async.muxch_STAR_.call(null,inst_34417);
var state_34436__$1 = state_34436;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_34436__$1,(22),inst_34419,inst_34367);
} else {
if((state_val_34437 === (11))){
var inst_34377 = (state_34436[(13)]);
var inst_34391 = (state_34436[(10)]);
var inst_34391__$1 = cljs.core.seq.call(null,inst_34377);
var state_34436__$1 = (function (){var statearr_34460 = state_34436;
(statearr_34460[(10)] = inst_34391__$1);

return statearr_34460;
})();
if(inst_34391__$1){
var statearr_34461_34501 = state_34436__$1;
(statearr_34461_34501[(1)] = (13));

} else {
var statearr_34462_34502 = state_34436__$1;
(statearr_34462_34502[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34437 === (9))){
var inst_34413 = (state_34436[(2)]);
var state_34436__$1 = state_34436;
var statearr_34463_34503 = state_34436__$1;
(statearr_34463_34503[(2)] = inst_34413);

(statearr_34463_34503[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34437 === (5))){
var inst_34374 = cljs.core.deref.call(null,mults);
var inst_34375 = cljs.core.vals.call(null,inst_34374);
var inst_34376 = cljs.core.seq.call(null,inst_34375);
var inst_34377 = inst_34376;
var inst_34378 = null;
var inst_34379 = (0);
var inst_34380 = (0);
var state_34436__$1 = (function (){var statearr_34464 = state_34436;
(statearr_34464[(12)] = inst_34380);

(statearr_34464[(13)] = inst_34377);

(statearr_34464[(15)] = inst_34379);

(statearr_34464[(16)] = inst_34378);

return statearr_34464;
})();
var statearr_34465_34504 = state_34436__$1;
(statearr_34465_34504[(2)] = null);

(statearr_34465_34504[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34437 === (14))){
var state_34436__$1 = state_34436;
var statearr_34469_34505 = state_34436__$1;
(statearr_34469_34505[(2)] = null);

(statearr_34469_34505[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34437 === (16))){
var inst_34391 = (state_34436[(10)]);
var inst_34395 = cljs.core.chunk_first.call(null,inst_34391);
var inst_34396 = cljs.core.chunk_rest.call(null,inst_34391);
var inst_34397 = cljs.core.count.call(null,inst_34395);
var inst_34377 = inst_34396;
var inst_34378 = inst_34395;
var inst_34379 = inst_34397;
var inst_34380 = (0);
var state_34436__$1 = (function (){var statearr_34470 = state_34436;
(statearr_34470[(12)] = inst_34380);

(statearr_34470[(13)] = inst_34377);

(statearr_34470[(15)] = inst_34379);

(statearr_34470[(16)] = inst_34378);

return statearr_34470;
})();
var statearr_34471_34506 = state_34436__$1;
(statearr_34471_34506[(2)] = null);

(statearr_34471_34506[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34437 === (10))){
var inst_34380 = (state_34436[(12)]);
var inst_34377 = (state_34436[(13)]);
var inst_34379 = (state_34436[(15)]);
var inst_34378 = (state_34436[(16)]);
var inst_34385 = cljs.core._nth.call(null,inst_34378,inst_34380);
var inst_34386 = cljs.core.async.muxch_STAR_.call(null,inst_34385);
var inst_34387 = cljs.core.async.close_BANG_.call(null,inst_34386);
var inst_34388 = (inst_34380 + (1));
var tmp34466 = inst_34377;
var tmp34467 = inst_34379;
var tmp34468 = inst_34378;
var inst_34377__$1 = tmp34466;
var inst_34378__$1 = tmp34468;
var inst_34379__$1 = tmp34467;
var inst_34380__$1 = inst_34388;
var state_34436__$1 = (function (){var statearr_34472 = state_34436;
(statearr_34472[(12)] = inst_34380__$1);

(statearr_34472[(13)] = inst_34377__$1);

(statearr_34472[(17)] = inst_34387);

(statearr_34472[(15)] = inst_34379__$1);

(statearr_34472[(16)] = inst_34378__$1);

return statearr_34472;
})();
var statearr_34473_34507 = state_34436__$1;
(statearr_34473_34507[(2)] = null);

(statearr_34473_34507[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34437 === (18))){
var inst_34406 = (state_34436[(2)]);
var state_34436__$1 = state_34436;
var statearr_34474_34508 = state_34436__$1;
(statearr_34474_34508[(2)] = inst_34406);

(statearr_34474_34508[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34437 === (8))){
var inst_34380 = (state_34436[(12)]);
var inst_34379 = (state_34436[(15)]);
var inst_34382 = (inst_34380 < inst_34379);
var inst_34383 = inst_34382;
var state_34436__$1 = state_34436;
if(cljs.core.truth_(inst_34383)){
var statearr_34475_34509 = state_34436__$1;
(statearr_34475_34509[(1)] = (10));

} else {
var statearr_34476_34510 = state_34436__$1;
(statearr_34476_34510[(1)] = (11));

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
});})(c__33248__auto___34482,mults,ensure_mult,p))
;
return ((function (switch__33158__auto__,c__33248__auto___34482,mults,ensure_mult,p){
return (function() {
var cljs$core$async$state_machine__33159__auto__ = null;
var cljs$core$async$state_machine__33159__auto____0 = (function (){
var statearr_34477 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_34477[(0)] = cljs$core$async$state_machine__33159__auto__);

(statearr_34477[(1)] = (1));

return statearr_34477;
});
var cljs$core$async$state_machine__33159__auto____1 = (function (state_34436){
while(true){
var ret_value__33160__auto__ = (function (){try{while(true){
var result__33161__auto__ = switch__33158__auto__.call(null,state_34436);
if(cljs.core.keyword_identical_QMARK_.call(null,result__33161__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__33161__auto__;
}
break;
}
}catch (e34478){if((e34478 instanceof Object)){
var ex__33162__auto__ = e34478;
var statearr_34479_34511 = state_34436;
(statearr_34479_34511[(5)] = ex__33162__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_34436);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e34478;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__33160__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__34512 = state_34436;
state_34436 = G__34512;
continue;
} else {
return ret_value__33160__auto__;
}
break;
}
});
cljs$core$async$state_machine__33159__auto__ = function(state_34436){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__33159__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__33159__auto____1.call(this,state_34436);
}
throw(new Error('Invalid arity: ' + (arguments.length - 1)));
};
cljs$core$async$state_machine__33159__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__33159__auto____0;
cljs$core$async$state_machine__33159__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__33159__auto____1;
return cljs$core$async$state_machine__33159__auto__;
})()
;})(switch__33158__auto__,c__33248__auto___34482,mults,ensure_mult,p))
})();
var state__33250__auto__ = (function (){var statearr_34480 = f__33249__auto__.call(null);
(statearr_34480[(6)] = c__33248__auto___34482);

return statearr_34480;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__33250__auto__);
});})(c__33248__auto___34482,mults,ensure_mult,p))
);


return p;
});

cljs.core.async.pub.cljs$lang$maxFixedArity = 3;

/**
 * Subscribes a channel to a topic of a pub.
 * 
 *   By default the channel will be closed when the source closes,
 *   but can be determined by the close? parameter.
 */
cljs.core.async.sub = (function cljs$core$async$sub(var_args){
var G__34514 = arguments.length;
switch (G__34514) {
case 3:
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.core.async.sub.cljs$core$IFn$_invoke$arity$3 = (function (p,topic,ch){
return cljs.core.async.sub.call(null,p,topic,ch,true);
});

cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4 = (function (p,topic,ch,close_QMARK_){
return cljs.core.async.sub_STAR_.call(null,p,topic,ch,close_QMARK_);
});

cljs.core.async.sub.cljs$lang$maxFixedArity = 4;

/**
 * Unsubscribes a channel from a topic of a pub
 */
cljs.core.async.unsub = (function cljs$core$async$unsub(p,topic,ch){
return cljs.core.async.unsub_STAR_.call(null,p,topic,ch);
});
/**
 * Unsubscribes all channels from a pub, or a topic of a pub
 */
cljs.core.async.unsub_all = (function cljs$core$async$unsub_all(var_args){
var G__34517 = arguments.length;
switch (G__34517) {
case 1:
return cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$1 = (function (p){
return cljs.core.async.unsub_all_STAR_.call(null,p);
});

cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$2 = (function (p,topic){
return cljs.core.async.unsub_all_STAR_.call(null,p,topic);
});

cljs.core.async.unsub_all.cljs$lang$maxFixedArity = 2;

/**
 * Takes a function and a collection of source channels, and returns a
 *   channel which contains the values produced by applying f to the set
 *   of first items taken from each source channel, followed by applying
 *   f to the set of second items from each channel, until any one of the
 *   channels is closed, at which point the output channel will be
 *   closed. The returned channel will be unbuffered by default, or a
 *   buf-or-n can be supplied
 */
cljs.core.async.map = (function cljs$core$async$map(var_args){
var G__34520 = arguments.length;
switch (G__34520) {
case 2:
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.core.async.map.cljs$core$IFn$_invoke$arity$2 = (function (f,chs){
return cljs.core.async.map.call(null,f,chs,null);
});

cljs.core.async.map.cljs$core$IFn$_invoke$arity$3 = (function (f,chs,buf_or_n){
var chs__$1 = cljs.core.vec.call(null,chs);
var out = cljs.core.async.chan.call(null,buf_or_n);
var cnt = cljs.core.count.call(null,chs__$1);
var rets = cljs.core.object_array.call(null,cnt);
var dchan = cljs.core.async.chan.call(null,(1));
var dctr = cljs.core.atom.call(null,null);
var done = cljs.core.mapv.call(null,((function (chs__$1,out,cnt,rets,dchan,dctr){
return (function (i){
return ((function (chs__$1,out,cnt,rets,dchan,dctr){
return (function (ret){
(rets[i] = ret);

if((cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec) === (0))){
return cljs.core.async.put_BANG_.call(null,dchan,rets.slice((0)));
} else {
return null;
}
});
;})(chs__$1,out,cnt,rets,dchan,dctr))
});})(chs__$1,out,cnt,rets,dchan,dctr))
,cljs.core.range.call(null,cnt));
var c__33248__auto___34587 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__33248__auto___34587,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function (){
var f__33249__auto__ = (function (){var switch__33158__auto__ = ((function (c__33248__auto___34587,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function (state_34559){
var state_val_34560 = (state_34559[(1)]);
if((state_val_34560 === (7))){
var state_34559__$1 = state_34559;
var statearr_34561_34588 = state_34559__$1;
(statearr_34561_34588[(2)] = null);

(statearr_34561_34588[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34560 === (1))){
var state_34559__$1 = state_34559;
var statearr_34562_34589 = state_34559__$1;
(statearr_34562_34589[(2)] = null);

(statearr_34562_34589[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34560 === (4))){
var inst_34523 = (state_34559[(7)]);
var inst_34525 = (inst_34523 < cnt);
var state_34559__$1 = state_34559;
if(cljs.core.truth_(inst_34525)){
var statearr_34563_34590 = state_34559__$1;
(statearr_34563_34590[(1)] = (6));

} else {
var statearr_34564_34591 = state_34559__$1;
(statearr_34564_34591[(1)] = (7));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34560 === (15))){
var inst_34555 = (state_34559[(2)]);
var state_34559__$1 = state_34559;
var statearr_34565_34592 = state_34559__$1;
(statearr_34565_34592[(2)] = inst_34555);

(statearr_34565_34592[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34560 === (13))){
var inst_34548 = cljs.core.async.close_BANG_.call(null,out);
var state_34559__$1 = state_34559;
var statearr_34566_34593 = state_34559__$1;
(statearr_34566_34593[(2)] = inst_34548);

(statearr_34566_34593[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34560 === (6))){
var state_34559__$1 = state_34559;
var statearr_34567_34594 = state_34559__$1;
(statearr_34567_34594[(2)] = null);

(statearr_34567_34594[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34560 === (3))){
var inst_34557 = (state_34559[(2)]);
var state_34559__$1 = state_34559;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_34559__$1,inst_34557);
} else {
if((state_val_34560 === (12))){
var inst_34545 = (state_34559[(8)]);
var inst_34545__$1 = (state_34559[(2)]);
var inst_34546 = cljs.core.some.call(null,cljs.core.nil_QMARK_,inst_34545__$1);
var state_34559__$1 = (function (){var statearr_34568 = state_34559;
(statearr_34568[(8)] = inst_34545__$1);

return statearr_34568;
})();
if(cljs.core.truth_(inst_34546)){
var statearr_34569_34595 = state_34559__$1;
(statearr_34569_34595[(1)] = (13));

} else {
var statearr_34570_34596 = state_34559__$1;
(statearr_34570_34596[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34560 === (2))){
var inst_34522 = cljs.core.reset_BANG_.call(null,dctr,cnt);
var inst_34523 = (0);
var state_34559__$1 = (function (){var statearr_34571 = state_34559;
(statearr_34571[(7)] = inst_34523);

(statearr_34571[(9)] = inst_34522);

return statearr_34571;
})();
var statearr_34572_34597 = state_34559__$1;
(statearr_34572_34597[(2)] = null);

(statearr_34572_34597[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34560 === (11))){
var inst_34523 = (state_34559[(7)]);
var _ = cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null,state_34559,(10),Object,null,(9));
var inst_34532 = chs__$1.call(null,inst_34523);
var inst_34533 = done.call(null,inst_34523);
var inst_34534 = cljs.core.async.take_BANG_.call(null,inst_34532,inst_34533);
var state_34559__$1 = state_34559;
var statearr_34573_34598 = state_34559__$1;
(statearr_34573_34598[(2)] = inst_34534);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_34559__$1);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34560 === (9))){
var inst_34523 = (state_34559[(7)]);
var inst_34536 = (state_34559[(2)]);
var inst_34537 = (inst_34523 + (1));
var inst_34523__$1 = inst_34537;
var state_34559__$1 = (function (){var statearr_34574 = state_34559;
(statearr_34574[(10)] = inst_34536);

(statearr_34574[(7)] = inst_34523__$1);

return statearr_34574;
})();
var statearr_34575_34599 = state_34559__$1;
(statearr_34575_34599[(2)] = null);

(statearr_34575_34599[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34560 === (5))){
var inst_34543 = (state_34559[(2)]);
var state_34559__$1 = (function (){var statearr_34576 = state_34559;
(statearr_34576[(11)] = inst_34543);

return statearr_34576;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_34559__$1,(12),dchan);
} else {
if((state_val_34560 === (14))){
var inst_34545 = (state_34559[(8)]);
var inst_34550 = cljs.core.apply.call(null,f,inst_34545);
var state_34559__$1 = state_34559;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_34559__$1,(16),out,inst_34550);
} else {
if((state_val_34560 === (16))){
var inst_34552 = (state_34559[(2)]);
var state_34559__$1 = (function (){var statearr_34577 = state_34559;
(statearr_34577[(12)] = inst_34552);

return statearr_34577;
})();
var statearr_34578_34600 = state_34559__$1;
(statearr_34578_34600[(2)] = null);

(statearr_34578_34600[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34560 === (10))){
var inst_34527 = (state_34559[(2)]);
var inst_34528 = cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec);
var state_34559__$1 = (function (){var statearr_34579 = state_34559;
(statearr_34579[(13)] = inst_34527);

return statearr_34579;
})();
var statearr_34580_34601 = state_34559__$1;
(statearr_34580_34601[(2)] = inst_34528);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_34559__$1);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34560 === (8))){
var inst_34541 = (state_34559[(2)]);
var state_34559__$1 = state_34559;
var statearr_34581_34602 = state_34559__$1;
(statearr_34581_34602[(2)] = inst_34541);

(statearr_34581_34602[(1)] = (5));


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
});})(c__33248__auto___34587,chs__$1,out,cnt,rets,dchan,dctr,done))
;
return ((function (switch__33158__auto__,c__33248__auto___34587,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function() {
var cljs$core$async$state_machine__33159__auto__ = null;
var cljs$core$async$state_machine__33159__auto____0 = (function (){
var statearr_34582 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_34582[(0)] = cljs$core$async$state_machine__33159__auto__);

(statearr_34582[(1)] = (1));

return statearr_34582;
});
var cljs$core$async$state_machine__33159__auto____1 = (function (state_34559){
while(true){
var ret_value__33160__auto__ = (function (){try{while(true){
var result__33161__auto__ = switch__33158__auto__.call(null,state_34559);
if(cljs.core.keyword_identical_QMARK_.call(null,result__33161__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__33161__auto__;
}
break;
}
}catch (e34583){if((e34583 instanceof Object)){
var ex__33162__auto__ = e34583;
var statearr_34584_34603 = state_34559;
(statearr_34584_34603[(5)] = ex__33162__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_34559);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e34583;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__33160__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__34604 = state_34559;
state_34559 = G__34604;
continue;
} else {
return ret_value__33160__auto__;
}
break;
}
});
cljs$core$async$state_machine__33159__auto__ = function(state_34559){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__33159__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__33159__auto____1.call(this,state_34559);
}
throw(new Error('Invalid arity: ' + (arguments.length - 1)));
};
cljs$core$async$state_machine__33159__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__33159__auto____0;
cljs$core$async$state_machine__33159__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__33159__auto____1;
return cljs$core$async$state_machine__33159__auto__;
})()
;})(switch__33158__auto__,c__33248__auto___34587,chs__$1,out,cnt,rets,dchan,dctr,done))
})();
var state__33250__auto__ = (function (){var statearr_34585 = f__33249__auto__.call(null);
(statearr_34585[(6)] = c__33248__auto___34587);

return statearr_34585;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__33250__auto__);
});})(c__33248__auto___34587,chs__$1,out,cnt,rets,dchan,dctr,done))
);


return out;
});

cljs.core.async.map.cljs$lang$maxFixedArity = 3;

/**
 * Takes a collection of source channels and returns a channel which
 *   contains all values taken from them. The returned channel will be
 *   unbuffered by default, or a buf-or-n can be supplied. The channel
 *   will close after all the source channels have closed.
 */
cljs.core.async.merge = (function cljs$core$async$merge(var_args){
var G__34607 = arguments.length;
switch (G__34607) {
case 1:
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.core.async.merge.cljs$core$IFn$_invoke$arity$1 = (function (chs){
return cljs.core.async.merge.call(null,chs,null);
});

cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2 = (function (chs,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__33248__auto___34661 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__33248__auto___34661,out){
return (function (){
var f__33249__auto__ = (function (){var switch__33158__auto__ = ((function (c__33248__auto___34661,out){
return (function (state_34639){
var state_val_34640 = (state_34639[(1)]);
if((state_val_34640 === (7))){
var inst_34619 = (state_34639[(7)]);
var inst_34618 = (state_34639[(8)]);
var inst_34618__$1 = (state_34639[(2)]);
var inst_34619__$1 = cljs.core.nth.call(null,inst_34618__$1,(0),null);
var inst_34620 = cljs.core.nth.call(null,inst_34618__$1,(1),null);
var inst_34621 = (inst_34619__$1 == null);
var state_34639__$1 = (function (){var statearr_34641 = state_34639;
(statearr_34641[(7)] = inst_34619__$1);

(statearr_34641[(9)] = inst_34620);

(statearr_34641[(8)] = inst_34618__$1);

return statearr_34641;
})();
if(cljs.core.truth_(inst_34621)){
var statearr_34642_34662 = state_34639__$1;
(statearr_34642_34662[(1)] = (8));

} else {
var statearr_34643_34663 = state_34639__$1;
(statearr_34643_34663[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34640 === (1))){
var inst_34608 = cljs.core.vec.call(null,chs);
var inst_34609 = inst_34608;
var state_34639__$1 = (function (){var statearr_34644 = state_34639;
(statearr_34644[(10)] = inst_34609);

return statearr_34644;
})();
var statearr_34645_34664 = state_34639__$1;
(statearr_34645_34664[(2)] = null);

(statearr_34645_34664[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34640 === (4))){
var inst_34609 = (state_34639[(10)]);
var state_34639__$1 = state_34639;
return cljs.core.async.ioc_alts_BANG_.call(null,state_34639__$1,(7),inst_34609);
} else {
if((state_val_34640 === (6))){
var inst_34635 = (state_34639[(2)]);
var state_34639__$1 = state_34639;
var statearr_34646_34665 = state_34639__$1;
(statearr_34646_34665[(2)] = inst_34635);

(statearr_34646_34665[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34640 === (3))){
var inst_34637 = (state_34639[(2)]);
var state_34639__$1 = state_34639;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_34639__$1,inst_34637);
} else {
if((state_val_34640 === (2))){
var inst_34609 = (state_34639[(10)]);
var inst_34611 = cljs.core.count.call(null,inst_34609);
var inst_34612 = (inst_34611 > (0));
var state_34639__$1 = state_34639;
if(cljs.core.truth_(inst_34612)){
var statearr_34648_34666 = state_34639__$1;
(statearr_34648_34666[(1)] = (4));

} else {
var statearr_34649_34667 = state_34639__$1;
(statearr_34649_34667[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34640 === (11))){
var inst_34609 = (state_34639[(10)]);
var inst_34628 = (state_34639[(2)]);
var tmp34647 = inst_34609;
var inst_34609__$1 = tmp34647;
var state_34639__$1 = (function (){var statearr_34650 = state_34639;
(statearr_34650[(11)] = inst_34628);

(statearr_34650[(10)] = inst_34609__$1);

return statearr_34650;
})();
var statearr_34651_34668 = state_34639__$1;
(statearr_34651_34668[(2)] = null);

(statearr_34651_34668[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34640 === (9))){
var inst_34619 = (state_34639[(7)]);
var state_34639__$1 = state_34639;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_34639__$1,(11),out,inst_34619);
} else {
if((state_val_34640 === (5))){
var inst_34633 = cljs.core.async.close_BANG_.call(null,out);
var state_34639__$1 = state_34639;
var statearr_34652_34669 = state_34639__$1;
(statearr_34652_34669[(2)] = inst_34633);

(statearr_34652_34669[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34640 === (10))){
var inst_34631 = (state_34639[(2)]);
var state_34639__$1 = state_34639;
var statearr_34653_34670 = state_34639__$1;
(statearr_34653_34670[(2)] = inst_34631);

(statearr_34653_34670[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34640 === (8))){
var inst_34619 = (state_34639[(7)]);
var inst_34620 = (state_34639[(9)]);
var inst_34609 = (state_34639[(10)]);
var inst_34618 = (state_34639[(8)]);
var inst_34623 = (function (){var cs = inst_34609;
var vec__34614 = inst_34618;
var v = inst_34619;
var c = inst_34620;
return ((function (cs,vec__34614,v,c,inst_34619,inst_34620,inst_34609,inst_34618,state_val_34640,c__33248__auto___34661,out){
return (function (p1__34605_SHARP_){
return cljs.core.not_EQ_.call(null,c,p1__34605_SHARP_);
});
;})(cs,vec__34614,v,c,inst_34619,inst_34620,inst_34609,inst_34618,state_val_34640,c__33248__auto___34661,out))
})();
var inst_34624 = cljs.core.filterv.call(null,inst_34623,inst_34609);
var inst_34609__$1 = inst_34624;
var state_34639__$1 = (function (){var statearr_34654 = state_34639;
(statearr_34654[(10)] = inst_34609__$1);

return statearr_34654;
})();
var statearr_34655_34671 = state_34639__$1;
(statearr_34655_34671[(2)] = null);

(statearr_34655_34671[(1)] = (2));


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
});})(c__33248__auto___34661,out))
;
return ((function (switch__33158__auto__,c__33248__auto___34661,out){
return (function() {
var cljs$core$async$state_machine__33159__auto__ = null;
var cljs$core$async$state_machine__33159__auto____0 = (function (){
var statearr_34656 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_34656[(0)] = cljs$core$async$state_machine__33159__auto__);

(statearr_34656[(1)] = (1));

return statearr_34656;
});
var cljs$core$async$state_machine__33159__auto____1 = (function (state_34639){
while(true){
var ret_value__33160__auto__ = (function (){try{while(true){
var result__33161__auto__ = switch__33158__auto__.call(null,state_34639);
if(cljs.core.keyword_identical_QMARK_.call(null,result__33161__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__33161__auto__;
}
break;
}
}catch (e34657){if((e34657 instanceof Object)){
var ex__33162__auto__ = e34657;
var statearr_34658_34672 = state_34639;
(statearr_34658_34672[(5)] = ex__33162__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_34639);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e34657;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__33160__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__34673 = state_34639;
state_34639 = G__34673;
continue;
} else {
return ret_value__33160__auto__;
}
break;
}
});
cljs$core$async$state_machine__33159__auto__ = function(state_34639){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__33159__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__33159__auto____1.call(this,state_34639);
}
throw(new Error('Invalid arity: ' + (arguments.length - 1)));
};
cljs$core$async$state_machine__33159__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__33159__auto____0;
cljs$core$async$state_machine__33159__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__33159__auto____1;
return cljs$core$async$state_machine__33159__auto__;
})()
;})(switch__33158__auto__,c__33248__auto___34661,out))
})();
var state__33250__auto__ = (function (){var statearr_34659 = f__33249__auto__.call(null);
(statearr_34659[(6)] = c__33248__auto___34661);

return statearr_34659;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__33250__auto__);
});})(c__33248__auto___34661,out))
);


return out;
});

cljs.core.async.merge.cljs$lang$maxFixedArity = 2;

/**
 * Returns a channel containing the single (collection) result of the
 *   items taken from the channel conjoined to the supplied
 *   collection. ch must close before into produces a result.
 */
cljs.core.async.into = (function cljs$core$async$into(coll,ch){
return cljs.core.async.reduce.call(null,cljs.core.conj,coll,ch);
});
/**
 * Returns a channel that will return, at most, n items from ch. After n items
 * have been returned, or ch has been closed, the return chanel will close.
 * 
 *   The output channel is unbuffered by default, unless buf-or-n is given.
 */
cljs.core.async.take = (function cljs$core$async$take(var_args){
var G__34675 = arguments.length;
switch (G__34675) {
case 2:
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.core.async.take.cljs$core$IFn$_invoke$arity$2 = (function (n,ch){
return cljs.core.async.take.call(null,n,ch,null);
});

cljs.core.async.take.cljs$core$IFn$_invoke$arity$3 = (function (n,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__33248__auto___34720 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__33248__auto___34720,out){
return (function (){
var f__33249__auto__ = (function (){var switch__33158__auto__ = ((function (c__33248__auto___34720,out){
return (function (state_34699){
var state_val_34700 = (state_34699[(1)]);
if((state_val_34700 === (7))){
var inst_34681 = (state_34699[(7)]);
var inst_34681__$1 = (state_34699[(2)]);
var inst_34682 = (inst_34681__$1 == null);
var inst_34683 = cljs.core.not.call(null,inst_34682);
var state_34699__$1 = (function (){var statearr_34701 = state_34699;
(statearr_34701[(7)] = inst_34681__$1);

return statearr_34701;
})();
if(inst_34683){
var statearr_34702_34721 = state_34699__$1;
(statearr_34702_34721[(1)] = (8));

} else {
var statearr_34703_34722 = state_34699__$1;
(statearr_34703_34722[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34700 === (1))){
var inst_34676 = (0);
var state_34699__$1 = (function (){var statearr_34704 = state_34699;
(statearr_34704[(8)] = inst_34676);

return statearr_34704;
})();
var statearr_34705_34723 = state_34699__$1;
(statearr_34705_34723[(2)] = null);

(statearr_34705_34723[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34700 === (4))){
var state_34699__$1 = state_34699;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_34699__$1,(7),ch);
} else {
if((state_val_34700 === (6))){
var inst_34694 = (state_34699[(2)]);
var state_34699__$1 = state_34699;
var statearr_34706_34724 = state_34699__$1;
(statearr_34706_34724[(2)] = inst_34694);

(statearr_34706_34724[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34700 === (3))){
var inst_34696 = (state_34699[(2)]);
var inst_34697 = cljs.core.async.close_BANG_.call(null,out);
var state_34699__$1 = (function (){var statearr_34707 = state_34699;
(statearr_34707[(9)] = inst_34696);

return statearr_34707;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_34699__$1,inst_34697);
} else {
if((state_val_34700 === (2))){
var inst_34676 = (state_34699[(8)]);
var inst_34678 = (inst_34676 < n);
var state_34699__$1 = state_34699;
if(cljs.core.truth_(inst_34678)){
var statearr_34708_34725 = state_34699__$1;
(statearr_34708_34725[(1)] = (4));

} else {
var statearr_34709_34726 = state_34699__$1;
(statearr_34709_34726[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34700 === (11))){
var inst_34676 = (state_34699[(8)]);
var inst_34686 = (state_34699[(2)]);
var inst_34687 = (inst_34676 + (1));
var inst_34676__$1 = inst_34687;
var state_34699__$1 = (function (){var statearr_34710 = state_34699;
(statearr_34710[(8)] = inst_34676__$1);

(statearr_34710[(10)] = inst_34686);

return statearr_34710;
})();
var statearr_34711_34727 = state_34699__$1;
(statearr_34711_34727[(2)] = null);

(statearr_34711_34727[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34700 === (9))){
var state_34699__$1 = state_34699;
var statearr_34712_34728 = state_34699__$1;
(statearr_34712_34728[(2)] = null);

(statearr_34712_34728[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34700 === (5))){
var state_34699__$1 = state_34699;
var statearr_34713_34729 = state_34699__$1;
(statearr_34713_34729[(2)] = null);

(statearr_34713_34729[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34700 === (10))){
var inst_34691 = (state_34699[(2)]);
var state_34699__$1 = state_34699;
var statearr_34714_34730 = state_34699__$1;
(statearr_34714_34730[(2)] = inst_34691);

(statearr_34714_34730[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34700 === (8))){
var inst_34681 = (state_34699[(7)]);
var state_34699__$1 = state_34699;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_34699__$1,(11),out,inst_34681);
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
});})(c__33248__auto___34720,out))
;
return ((function (switch__33158__auto__,c__33248__auto___34720,out){
return (function() {
var cljs$core$async$state_machine__33159__auto__ = null;
var cljs$core$async$state_machine__33159__auto____0 = (function (){
var statearr_34715 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_34715[(0)] = cljs$core$async$state_machine__33159__auto__);

(statearr_34715[(1)] = (1));

return statearr_34715;
});
var cljs$core$async$state_machine__33159__auto____1 = (function (state_34699){
while(true){
var ret_value__33160__auto__ = (function (){try{while(true){
var result__33161__auto__ = switch__33158__auto__.call(null,state_34699);
if(cljs.core.keyword_identical_QMARK_.call(null,result__33161__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__33161__auto__;
}
break;
}
}catch (e34716){if((e34716 instanceof Object)){
var ex__33162__auto__ = e34716;
var statearr_34717_34731 = state_34699;
(statearr_34717_34731[(5)] = ex__33162__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_34699);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e34716;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__33160__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__34732 = state_34699;
state_34699 = G__34732;
continue;
} else {
return ret_value__33160__auto__;
}
break;
}
});
cljs$core$async$state_machine__33159__auto__ = function(state_34699){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__33159__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__33159__auto____1.call(this,state_34699);
}
throw(new Error('Invalid arity: ' + (arguments.length - 1)));
};
cljs$core$async$state_machine__33159__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__33159__auto____0;
cljs$core$async$state_machine__33159__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__33159__auto____1;
return cljs$core$async$state_machine__33159__auto__;
})()
;})(switch__33158__auto__,c__33248__auto___34720,out))
})();
var state__33250__auto__ = (function (){var statearr_34718 = f__33249__auto__.call(null);
(statearr_34718[(6)] = c__33248__auto___34720);

return statearr_34718;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__33250__auto__);
});})(c__33248__auto___34720,out))
);


return out;
});

cljs.core.async.take.cljs$lang$maxFixedArity = 3;

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_LT_ = (function cljs$core$async$map_LT_(f,ch){
if(typeof cljs.core.async.t_cljs$core$async34734 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async34734 = (function (f,ch,meta34735){
this.f = f;
this.ch = ch;
this.meta34735 = meta34735;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
cljs.core.async.t_cljs$core$async34734.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_34736,meta34735__$1){
var self__ = this;
var _34736__$1 = this;
return (new cljs.core.async.t_cljs$core$async34734(self__.f,self__.ch,meta34735__$1));
});

cljs.core.async.t_cljs$core$async34734.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_34736){
var self__ = this;
var _34736__$1 = this;
return self__.meta34735;
});

cljs.core.async.t_cljs$core$async34734.prototype.cljs$core$async$impl$protocols$Channel$ = cljs.core.PROTOCOL_SENTINEL;

cljs.core.async.t_cljs$core$async34734.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});

cljs.core.async.t_cljs$core$async34734.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch);
});

cljs.core.async.t_cljs$core$async34734.prototype.cljs$core$async$impl$protocols$ReadPort$ = cljs.core.PROTOCOL_SENTINEL;

cljs.core.async.t_cljs$core$async34734.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
var ret = cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,(function (){
if(typeof cljs.core.async.t_cljs$core$async34737 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async34737 = (function (f,ch,meta34735,_,fn1,meta34738){
this.f = f;
this.ch = ch;
this.meta34735 = meta34735;
this._ = _;
this.fn1 = fn1;
this.meta34738 = meta34738;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
cljs.core.async.t_cljs$core$async34737.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (___$1){
return (function (_34739,meta34738__$1){
var self__ = this;
var _34739__$1 = this;
return (new cljs.core.async.t_cljs$core$async34737(self__.f,self__.ch,self__.meta34735,self__._,self__.fn1,meta34738__$1));
});})(___$1))
;

cljs.core.async.t_cljs$core$async34737.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (___$1){
return (function (_34739){
var self__ = this;
var _34739__$1 = this;
return self__.meta34738;
});})(___$1))
;

cljs.core.async.t_cljs$core$async34737.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL;

cljs.core.async.t_cljs$core$async34737.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = ((function (___$1){
return (function (___$1){
var self__ = this;
var ___$2 = this;
return cljs.core.async.impl.protocols.active_QMARK_.call(null,self__.fn1);
});})(___$1))
;

cljs.core.async.t_cljs$core$async34737.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = ((function (___$1){
return (function (___$1){
var self__ = this;
var ___$2 = this;
return true;
});})(___$1))
;

cljs.core.async.t_cljs$core$async34737.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = ((function (___$1){
return (function (___$1){
var self__ = this;
var ___$2 = this;
var f1 = cljs.core.async.impl.protocols.commit.call(null,self__.fn1);
return ((function (f1,___$2,___$1){
return (function (p1__34733_SHARP_){
return f1.call(null,(((p1__34733_SHARP_ == null))?null:self__.f.call(null,p1__34733_SHARP_)));
});
;})(f1,___$2,___$1))
});})(___$1))
;

cljs.core.async.t_cljs$core$async34737.getBasis = ((function (___$1){
return (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta34735","meta34735",-1276692431,null),cljs.core.with_meta(new cljs.core.Symbol(null,"_","_",-1201019570,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tag","tag",-1290361223),new cljs.core.Symbol("cljs.core.async","t_cljs$core$async34734","cljs.core.async/t_cljs$core$async34734",601315592,null)], null)),new cljs.core.Symbol(null,"fn1","fn1",895834444,null),new cljs.core.Symbol(null,"meta34738","meta34738",756852564,null)], null);
});})(___$1))
;

cljs.core.async.t_cljs$core$async34737.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async34737.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async34737";

cljs.core.async.t_cljs$core$async34737.cljs$lang$ctorPrWriter = ((function (___$1){
return (function (this__30831__auto__,writer__30832__auto__,opt__30833__auto__){
return cljs.core._write.call(null,writer__30832__auto__,"cljs.core.async/t_cljs$core$async34737");
});})(___$1))
;

cljs.core.async.__GT_t_cljs$core$async34737 = ((function (___$1){
return (function cljs$core$async$map_LT__$___GT_t_cljs$core$async34737(f__$1,ch__$1,meta34735__$1,___$2,fn1__$1,meta34738){
return (new cljs.core.async.t_cljs$core$async34737(f__$1,ch__$1,meta34735__$1,___$2,fn1__$1,meta34738));
});})(___$1))
;

}

return (new cljs.core.async.t_cljs$core$async34737(self__.f,self__.ch,self__.meta34735,___$1,fn1,cljs.core.PersistentArrayMap.EMPTY));
})()
);
if(cljs.core.truth_((function (){var and__30148__auto__ = ret;
if(cljs.core.truth_(and__30148__auto__)){
return !((cljs.core.deref.call(null,ret) == null));
} else {
return and__30148__auto__;
}
})())){
return cljs.core.async.impl.channels.box.call(null,self__.f.call(null,cljs.core.deref.call(null,ret)));
} else {
return ret;
}
});

cljs.core.async.t_cljs$core$async34734.prototype.cljs$core$async$impl$protocols$WritePort$ = cljs.core.PROTOCOL_SENTINEL;

cljs.core.async.t_cljs$core$async34734.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,val,fn1);
});

cljs.core.async.t_cljs$core$async34734.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta34735","meta34735",-1276692431,null)], null);
});

cljs.core.async.t_cljs$core$async34734.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async34734.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async34734";

cljs.core.async.t_cljs$core$async34734.cljs$lang$ctorPrWriter = (function (this__30831__auto__,writer__30832__auto__,opt__30833__auto__){
return cljs.core._write.call(null,writer__30832__auto__,"cljs.core.async/t_cljs$core$async34734");
});

cljs.core.async.__GT_t_cljs$core$async34734 = (function cljs$core$async$map_LT__$___GT_t_cljs$core$async34734(f__$1,ch__$1,meta34735){
return (new cljs.core.async.t_cljs$core$async34734(f__$1,ch__$1,meta34735));
});

}

return (new cljs.core.async.t_cljs$core$async34734(f,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_GT_ = (function cljs$core$async$map_GT_(f,ch){
if(typeof cljs.core.async.t_cljs$core$async34740 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async34740 = (function (f,ch,meta34741){
this.f = f;
this.ch = ch;
this.meta34741 = meta34741;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
cljs.core.async.t_cljs$core$async34740.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_34742,meta34741__$1){
var self__ = this;
var _34742__$1 = this;
return (new cljs.core.async.t_cljs$core$async34740(self__.f,self__.ch,meta34741__$1));
});

cljs.core.async.t_cljs$core$async34740.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_34742){
var self__ = this;
var _34742__$1 = this;
return self__.meta34741;
});

cljs.core.async.t_cljs$core$async34740.prototype.cljs$core$async$impl$protocols$Channel$ = cljs.core.PROTOCOL_SENTINEL;

cljs.core.async.t_cljs$core$async34740.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});

cljs.core.async.t_cljs$core$async34740.prototype.cljs$core$async$impl$protocols$ReadPort$ = cljs.core.PROTOCOL_SENTINEL;

cljs.core.async.t_cljs$core$async34740.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,fn1);
});

cljs.core.async.t_cljs$core$async34740.prototype.cljs$core$async$impl$protocols$WritePort$ = cljs.core.PROTOCOL_SENTINEL;

cljs.core.async.t_cljs$core$async34740.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,self__.f.call(null,val),fn1);
});

cljs.core.async.t_cljs$core$async34740.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta34741","meta34741",-172852618,null)], null);
});

cljs.core.async.t_cljs$core$async34740.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async34740.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async34740";

cljs.core.async.t_cljs$core$async34740.cljs$lang$ctorPrWriter = (function (this__30831__auto__,writer__30832__auto__,opt__30833__auto__){
return cljs.core._write.call(null,writer__30832__auto__,"cljs.core.async/t_cljs$core$async34740");
});

cljs.core.async.__GT_t_cljs$core$async34740 = (function cljs$core$async$map_GT__$___GT_t_cljs$core$async34740(f__$1,ch__$1,meta34741){
return (new cljs.core.async.t_cljs$core$async34740(f__$1,ch__$1,meta34741));
});

}

return (new cljs.core.async.t_cljs$core$async34740(f,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.filter_GT_ = (function cljs$core$async$filter_GT_(p,ch){
if(typeof cljs.core.async.t_cljs$core$async34743 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async34743 = (function (p,ch,meta34744){
this.p = p;
this.ch = ch;
this.meta34744 = meta34744;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
cljs.core.async.t_cljs$core$async34743.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_34745,meta34744__$1){
var self__ = this;
var _34745__$1 = this;
return (new cljs.core.async.t_cljs$core$async34743(self__.p,self__.ch,meta34744__$1));
});

cljs.core.async.t_cljs$core$async34743.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_34745){
var self__ = this;
var _34745__$1 = this;
return self__.meta34744;
});

cljs.core.async.t_cljs$core$async34743.prototype.cljs$core$async$impl$protocols$Channel$ = cljs.core.PROTOCOL_SENTINEL;

cljs.core.async.t_cljs$core$async34743.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});

cljs.core.async.t_cljs$core$async34743.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch);
});

cljs.core.async.t_cljs$core$async34743.prototype.cljs$core$async$impl$protocols$ReadPort$ = cljs.core.PROTOCOL_SENTINEL;

cljs.core.async.t_cljs$core$async34743.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,fn1);
});

cljs.core.async.t_cljs$core$async34743.prototype.cljs$core$async$impl$protocols$WritePort$ = cljs.core.PROTOCOL_SENTINEL;

cljs.core.async.t_cljs$core$async34743.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_(self__.p.call(null,val))){
return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,val,fn1);
} else {
return cljs.core.async.impl.channels.box.call(null,cljs.core.not.call(null,cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch)));
}
});

cljs.core.async.t_cljs$core$async34743.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"p","p",1791580836,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta34744","meta34744",-584003013,null)], null);
});

cljs.core.async.t_cljs$core$async34743.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async34743.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async34743";

cljs.core.async.t_cljs$core$async34743.cljs$lang$ctorPrWriter = (function (this__30831__auto__,writer__30832__auto__,opt__30833__auto__){
return cljs.core._write.call(null,writer__30832__auto__,"cljs.core.async/t_cljs$core$async34743");
});

cljs.core.async.__GT_t_cljs$core$async34743 = (function cljs$core$async$filter_GT__$___GT_t_cljs$core$async34743(p__$1,ch__$1,meta34744){
return (new cljs.core.async.t_cljs$core$async34743(p__$1,ch__$1,meta34744));
});

}

return (new cljs.core.async.t_cljs$core$async34743(p,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.remove_GT_ = (function cljs$core$async$remove_GT_(p,ch){
return cljs.core.async.filter_GT_.call(null,cljs.core.complement.call(null,p),ch);
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.filter_LT_ = (function cljs$core$async$filter_LT_(var_args){
var G__34747 = arguments.length;
switch (G__34747) {
case 2:
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.filter_LT_.call(null,p,ch,null);
});

cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3 = (function (p,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__33248__auto___34787 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__33248__auto___34787,out){
return (function (){
var f__33249__auto__ = (function (){var switch__33158__auto__ = ((function (c__33248__auto___34787,out){
return (function (state_34768){
var state_val_34769 = (state_34768[(1)]);
if((state_val_34769 === (7))){
var inst_34764 = (state_34768[(2)]);
var state_34768__$1 = state_34768;
var statearr_34770_34788 = state_34768__$1;
(statearr_34770_34788[(2)] = inst_34764);

(statearr_34770_34788[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34769 === (1))){
var state_34768__$1 = state_34768;
var statearr_34771_34789 = state_34768__$1;
(statearr_34771_34789[(2)] = null);

(statearr_34771_34789[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34769 === (4))){
var inst_34750 = (state_34768[(7)]);
var inst_34750__$1 = (state_34768[(2)]);
var inst_34751 = (inst_34750__$1 == null);
var state_34768__$1 = (function (){var statearr_34772 = state_34768;
(statearr_34772[(7)] = inst_34750__$1);

return statearr_34772;
})();
if(cljs.core.truth_(inst_34751)){
var statearr_34773_34790 = state_34768__$1;
(statearr_34773_34790[(1)] = (5));

} else {
var statearr_34774_34791 = state_34768__$1;
(statearr_34774_34791[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34769 === (6))){
var inst_34750 = (state_34768[(7)]);
var inst_34755 = p.call(null,inst_34750);
var state_34768__$1 = state_34768;
if(cljs.core.truth_(inst_34755)){
var statearr_34775_34792 = state_34768__$1;
(statearr_34775_34792[(1)] = (8));

} else {
var statearr_34776_34793 = state_34768__$1;
(statearr_34776_34793[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34769 === (3))){
var inst_34766 = (state_34768[(2)]);
var state_34768__$1 = state_34768;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_34768__$1,inst_34766);
} else {
if((state_val_34769 === (2))){
var state_34768__$1 = state_34768;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_34768__$1,(4),ch);
} else {
if((state_val_34769 === (11))){
var inst_34758 = (state_34768[(2)]);
var state_34768__$1 = state_34768;
var statearr_34777_34794 = state_34768__$1;
(statearr_34777_34794[(2)] = inst_34758);

(statearr_34777_34794[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34769 === (9))){
var state_34768__$1 = state_34768;
var statearr_34778_34795 = state_34768__$1;
(statearr_34778_34795[(2)] = null);

(statearr_34778_34795[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34769 === (5))){
var inst_34753 = cljs.core.async.close_BANG_.call(null,out);
var state_34768__$1 = state_34768;
var statearr_34779_34796 = state_34768__$1;
(statearr_34779_34796[(2)] = inst_34753);

(statearr_34779_34796[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34769 === (10))){
var inst_34761 = (state_34768[(2)]);
var state_34768__$1 = (function (){var statearr_34780 = state_34768;
(statearr_34780[(8)] = inst_34761);

return statearr_34780;
})();
var statearr_34781_34797 = state_34768__$1;
(statearr_34781_34797[(2)] = null);

(statearr_34781_34797[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34769 === (8))){
var inst_34750 = (state_34768[(7)]);
var state_34768__$1 = state_34768;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_34768__$1,(11),out,inst_34750);
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
});})(c__33248__auto___34787,out))
;
return ((function (switch__33158__auto__,c__33248__auto___34787,out){
return (function() {
var cljs$core$async$state_machine__33159__auto__ = null;
var cljs$core$async$state_machine__33159__auto____0 = (function (){
var statearr_34782 = [null,null,null,null,null,null,null,null,null];
(statearr_34782[(0)] = cljs$core$async$state_machine__33159__auto__);

(statearr_34782[(1)] = (1));

return statearr_34782;
});
var cljs$core$async$state_machine__33159__auto____1 = (function (state_34768){
while(true){
var ret_value__33160__auto__ = (function (){try{while(true){
var result__33161__auto__ = switch__33158__auto__.call(null,state_34768);
if(cljs.core.keyword_identical_QMARK_.call(null,result__33161__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__33161__auto__;
}
break;
}
}catch (e34783){if((e34783 instanceof Object)){
var ex__33162__auto__ = e34783;
var statearr_34784_34798 = state_34768;
(statearr_34784_34798[(5)] = ex__33162__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_34768);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e34783;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__33160__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__34799 = state_34768;
state_34768 = G__34799;
continue;
} else {
return ret_value__33160__auto__;
}
break;
}
});
cljs$core$async$state_machine__33159__auto__ = function(state_34768){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__33159__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__33159__auto____1.call(this,state_34768);
}
throw(new Error('Invalid arity: ' + (arguments.length - 1)));
};
cljs$core$async$state_machine__33159__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__33159__auto____0;
cljs$core$async$state_machine__33159__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__33159__auto____1;
return cljs$core$async$state_machine__33159__auto__;
})()
;})(switch__33158__auto__,c__33248__auto___34787,out))
})();
var state__33250__auto__ = (function (){var statearr_34785 = f__33249__auto__.call(null);
(statearr_34785[(6)] = c__33248__auto___34787);

return statearr_34785;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__33250__auto__);
});})(c__33248__auto___34787,out))
);


return out;
});

cljs.core.async.filter_LT_.cljs$lang$maxFixedArity = 3;

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.remove_LT_ = (function cljs$core$async$remove_LT_(var_args){
var G__34801 = arguments.length;
switch (G__34801) {
case 2:
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.remove_LT_.call(null,p,ch,null);
});

cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3 = (function (p,ch,buf_or_n){
return cljs.core.async.filter_LT_.call(null,cljs.core.complement.call(null,p),ch,buf_or_n);
});

cljs.core.async.remove_LT_.cljs$lang$maxFixedArity = 3;

cljs.core.async.mapcat_STAR_ = (function cljs$core$async$mapcat_STAR_(f,in$,out){
var c__33248__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__33248__auto__){
return (function (){
var f__33249__auto__ = (function (){var switch__33158__auto__ = ((function (c__33248__auto__){
return (function (state_34864){
var state_val_34865 = (state_34864[(1)]);
if((state_val_34865 === (7))){
var inst_34860 = (state_34864[(2)]);
var state_34864__$1 = state_34864;
var statearr_34866_34904 = state_34864__$1;
(statearr_34866_34904[(2)] = inst_34860);

(statearr_34866_34904[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34865 === (20))){
var inst_34830 = (state_34864[(7)]);
var inst_34841 = (state_34864[(2)]);
var inst_34842 = cljs.core.next.call(null,inst_34830);
var inst_34816 = inst_34842;
var inst_34817 = null;
var inst_34818 = (0);
var inst_34819 = (0);
var state_34864__$1 = (function (){var statearr_34867 = state_34864;
(statearr_34867[(8)] = inst_34819);

(statearr_34867[(9)] = inst_34818);

(statearr_34867[(10)] = inst_34816);

(statearr_34867[(11)] = inst_34841);

(statearr_34867[(12)] = inst_34817);

return statearr_34867;
})();
var statearr_34868_34905 = state_34864__$1;
(statearr_34868_34905[(2)] = null);

(statearr_34868_34905[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34865 === (1))){
var state_34864__$1 = state_34864;
var statearr_34869_34906 = state_34864__$1;
(statearr_34869_34906[(2)] = null);

(statearr_34869_34906[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34865 === (4))){
var inst_34805 = (state_34864[(13)]);
var inst_34805__$1 = (state_34864[(2)]);
var inst_34806 = (inst_34805__$1 == null);
var state_34864__$1 = (function (){var statearr_34870 = state_34864;
(statearr_34870[(13)] = inst_34805__$1);

return statearr_34870;
})();
if(cljs.core.truth_(inst_34806)){
var statearr_34871_34907 = state_34864__$1;
(statearr_34871_34907[(1)] = (5));

} else {
var statearr_34872_34908 = state_34864__$1;
(statearr_34872_34908[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34865 === (15))){
var state_34864__$1 = state_34864;
var statearr_34876_34909 = state_34864__$1;
(statearr_34876_34909[(2)] = null);

(statearr_34876_34909[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34865 === (21))){
var state_34864__$1 = state_34864;
var statearr_34877_34910 = state_34864__$1;
(statearr_34877_34910[(2)] = null);

(statearr_34877_34910[(1)] = (23));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34865 === (13))){
var inst_34819 = (state_34864[(8)]);
var inst_34818 = (state_34864[(9)]);
var inst_34816 = (state_34864[(10)]);
var inst_34817 = (state_34864[(12)]);
var inst_34826 = (state_34864[(2)]);
var inst_34827 = (inst_34819 + (1));
var tmp34873 = inst_34818;
var tmp34874 = inst_34816;
var tmp34875 = inst_34817;
var inst_34816__$1 = tmp34874;
var inst_34817__$1 = tmp34875;
var inst_34818__$1 = tmp34873;
var inst_34819__$1 = inst_34827;
var state_34864__$1 = (function (){var statearr_34878 = state_34864;
(statearr_34878[(14)] = inst_34826);

(statearr_34878[(8)] = inst_34819__$1);

(statearr_34878[(9)] = inst_34818__$1);

(statearr_34878[(10)] = inst_34816__$1);

(statearr_34878[(12)] = inst_34817__$1);

return statearr_34878;
})();
var statearr_34879_34911 = state_34864__$1;
(statearr_34879_34911[(2)] = null);

(statearr_34879_34911[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34865 === (22))){
var state_34864__$1 = state_34864;
var statearr_34880_34912 = state_34864__$1;
(statearr_34880_34912[(2)] = null);

(statearr_34880_34912[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34865 === (6))){
var inst_34805 = (state_34864[(13)]);
var inst_34814 = f.call(null,inst_34805);
var inst_34815 = cljs.core.seq.call(null,inst_34814);
var inst_34816 = inst_34815;
var inst_34817 = null;
var inst_34818 = (0);
var inst_34819 = (0);
var state_34864__$1 = (function (){var statearr_34881 = state_34864;
(statearr_34881[(8)] = inst_34819);

(statearr_34881[(9)] = inst_34818);

(statearr_34881[(10)] = inst_34816);

(statearr_34881[(12)] = inst_34817);

return statearr_34881;
})();
var statearr_34882_34913 = state_34864__$1;
(statearr_34882_34913[(2)] = null);

(statearr_34882_34913[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34865 === (17))){
var inst_34830 = (state_34864[(7)]);
var inst_34834 = cljs.core.chunk_first.call(null,inst_34830);
var inst_34835 = cljs.core.chunk_rest.call(null,inst_34830);
var inst_34836 = cljs.core.count.call(null,inst_34834);
var inst_34816 = inst_34835;
var inst_34817 = inst_34834;
var inst_34818 = inst_34836;
var inst_34819 = (0);
var state_34864__$1 = (function (){var statearr_34883 = state_34864;
(statearr_34883[(8)] = inst_34819);

(statearr_34883[(9)] = inst_34818);

(statearr_34883[(10)] = inst_34816);

(statearr_34883[(12)] = inst_34817);

return statearr_34883;
})();
var statearr_34884_34914 = state_34864__$1;
(statearr_34884_34914[(2)] = null);

(statearr_34884_34914[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34865 === (3))){
var inst_34862 = (state_34864[(2)]);
var state_34864__$1 = state_34864;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_34864__$1,inst_34862);
} else {
if((state_val_34865 === (12))){
var inst_34850 = (state_34864[(2)]);
var state_34864__$1 = state_34864;
var statearr_34885_34915 = state_34864__$1;
(statearr_34885_34915[(2)] = inst_34850);

(statearr_34885_34915[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34865 === (2))){
var state_34864__$1 = state_34864;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_34864__$1,(4),in$);
} else {
if((state_val_34865 === (23))){
var inst_34858 = (state_34864[(2)]);
var state_34864__$1 = state_34864;
var statearr_34886_34916 = state_34864__$1;
(statearr_34886_34916[(2)] = inst_34858);

(statearr_34886_34916[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34865 === (19))){
var inst_34845 = (state_34864[(2)]);
var state_34864__$1 = state_34864;
var statearr_34887_34917 = state_34864__$1;
(statearr_34887_34917[(2)] = inst_34845);

(statearr_34887_34917[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34865 === (11))){
var inst_34830 = (state_34864[(7)]);
var inst_34816 = (state_34864[(10)]);
var inst_34830__$1 = cljs.core.seq.call(null,inst_34816);
var state_34864__$1 = (function (){var statearr_34888 = state_34864;
(statearr_34888[(7)] = inst_34830__$1);

return statearr_34888;
})();
if(inst_34830__$1){
var statearr_34889_34918 = state_34864__$1;
(statearr_34889_34918[(1)] = (14));

} else {
var statearr_34890_34919 = state_34864__$1;
(statearr_34890_34919[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34865 === (9))){
var inst_34852 = (state_34864[(2)]);
var inst_34853 = cljs.core.async.impl.protocols.closed_QMARK_.call(null,out);
var state_34864__$1 = (function (){var statearr_34891 = state_34864;
(statearr_34891[(15)] = inst_34852);

return statearr_34891;
})();
if(cljs.core.truth_(inst_34853)){
var statearr_34892_34920 = state_34864__$1;
(statearr_34892_34920[(1)] = (21));

} else {
var statearr_34893_34921 = state_34864__$1;
(statearr_34893_34921[(1)] = (22));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34865 === (5))){
var inst_34808 = cljs.core.async.close_BANG_.call(null,out);
var state_34864__$1 = state_34864;
var statearr_34894_34922 = state_34864__$1;
(statearr_34894_34922[(2)] = inst_34808);

(statearr_34894_34922[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34865 === (14))){
var inst_34830 = (state_34864[(7)]);
var inst_34832 = cljs.core.chunked_seq_QMARK_.call(null,inst_34830);
var state_34864__$1 = state_34864;
if(inst_34832){
var statearr_34895_34923 = state_34864__$1;
(statearr_34895_34923[(1)] = (17));

} else {
var statearr_34896_34924 = state_34864__$1;
(statearr_34896_34924[(1)] = (18));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34865 === (16))){
var inst_34848 = (state_34864[(2)]);
var state_34864__$1 = state_34864;
var statearr_34897_34925 = state_34864__$1;
(statearr_34897_34925[(2)] = inst_34848);

(statearr_34897_34925[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34865 === (10))){
var inst_34819 = (state_34864[(8)]);
var inst_34817 = (state_34864[(12)]);
var inst_34824 = cljs.core._nth.call(null,inst_34817,inst_34819);
var state_34864__$1 = state_34864;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_34864__$1,(13),out,inst_34824);
} else {
if((state_val_34865 === (18))){
var inst_34830 = (state_34864[(7)]);
var inst_34839 = cljs.core.first.call(null,inst_34830);
var state_34864__$1 = state_34864;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_34864__$1,(20),out,inst_34839);
} else {
if((state_val_34865 === (8))){
var inst_34819 = (state_34864[(8)]);
var inst_34818 = (state_34864[(9)]);
var inst_34821 = (inst_34819 < inst_34818);
var inst_34822 = inst_34821;
var state_34864__$1 = state_34864;
if(cljs.core.truth_(inst_34822)){
var statearr_34898_34926 = state_34864__$1;
(statearr_34898_34926[(1)] = (10));

} else {
var statearr_34899_34927 = state_34864__$1;
(statearr_34899_34927[(1)] = (11));

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
});})(c__33248__auto__))
;
return ((function (switch__33158__auto__,c__33248__auto__){
return (function() {
var cljs$core$async$mapcat_STAR__$_state_machine__33159__auto__ = null;
var cljs$core$async$mapcat_STAR__$_state_machine__33159__auto____0 = (function (){
var statearr_34900 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_34900[(0)] = cljs$core$async$mapcat_STAR__$_state_machine__33159__auto__);

(statearr_34900[(1)] = (1));

return statearr_34900;
});
var cljs$core$async$mapcat_STAR__$_state_machine__33159__auto____1 = (function (state_34864){
while(true){
var ret_value__33160__auto__ = (function (){try{while(true){
var result__33161__auto__ = switch__33158__auto__.call(null,state_34864);
if(cljs.core.keyword_identical_QMARK_.call(null,result__33161__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__33161__auto__;
}
break;
}
}catch (e34901){if((e34901 instanceof Object)){
var ex__33162__auto__ = e34901;
var statearr_34902_34928 = state_34864;
(statearr_34902_34928[(5)] = ex__33162__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_34864);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e34901;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__33160__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__34929 = state_34864;
state_34864 = G__34929;
continue;
} else {
return ret_value__33160__auto__;
}
break;
}
});
cljs$core$async$mapcat_STAR__$_state_machine__33159__auto__ = function(state_34864){
switch(arguments.length){
case 0:
return cljs$core$async$mapcat_STAR__$_state_machine__33159__auto____0.call(this);
case 1:
return cljs$core$async$mapcat_STAR__$_state_machine__33159__auto____1.call(this,state_34864);
}
throw(new Error('Invalid arity: ' + (arguments.length - 1)));
};
cljs$core$async$mapcat_STAR__$_state_machine__33159__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mapcat_STAR__$_state_machine__33159__auto____0;
cljs$core$async$mapcat_STAR__$_state_machine__33159__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mapcat_STAR__$_state_machine__33159__auto____1;
return cljs$core$async$mapcat_STAR__$_state_machine__33159__auto__;
})()
;})(switch__33158__auto__,c__33248__auto__))
})();
var state__33250__auto__ = (function (){var statearr_34903 = f__33249__auto__.call(null);
(statearr_34903[(6)] = c__33248__auto__);

return statearr_34903;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__33250__auto__);
});})(c__33248__auto__))
);

return c__33248__auto__;
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.mapcat_LT_ = (function cljs$core$async$mapcat_LT_(var_args){
var G__34931 = arguments.length;
switch (G__34931) {
case 2:
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$2 = (function (f,in$){
return cljs.core.async.mapcat_LT_.call(null,f,in$,null);
});

cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3 = (function (f,in$,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
cljs.core.async.mapcat_STAR_.call(null,f,in$,out);

return out;
});

cljs.core.async.mapcat_LT_.cljs$lang$maxFixedArity = 3;

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.mapcat_GT_ = (function cljs$core$async$mapcat_GT_(var_args){
var G__34934 = arguments.length;
switch (G__34934) {
case 2:
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$2 = (function (f,out){
return cljs.core.async.mapcat_GT_.call(null,f,out,null);
});

cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3 = (function (f,out,buf_or_n){
var in$ = cljs.core.async.chan.call(null,buf_or_n);
cljs.core.async.mapcat_STAR_.call(null,f,in$,out);

return in$;
});

cljs.core.async.mapcat_GT_.cljs$lang$maxFixedArity = 3;

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.unique = (function cljs$core$async$unique(var_args){
var G__34937 = arguments.length;
switch (G__34937) {
case 1:
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.core.async.unique.cljs$core$IFn$_invoke$arity$1 = (function (ch){
return cljs.core.async.unique.call(null,ch,null);
});

cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2 = (function (ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__33248__auto___34984 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__33248__auto___34984,out){
return (function (){
var f__33249__auto__ = (function (){var switch__33158__auto__ = ((function (c__33248__auto___34984,out){
return (function (state_34961){
var state_val_34962 = (state_34961[(1)]);
if((state_val_34962 === (7))){
var inst_34956 = (state_34961[(2)]);
var state_34961__$1 = state_34961;
var statearr_34963_34985 = state_34961__$1;
(statearr_34963_34985[(2)] = inst_34956);

(statearr_34963_34985[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34962 === (1))){
var inst_34938 = null;
var state_34961__$1 = (function (){var statearr_34964 = state_34961;
(statearr_34964[(7)] = inst_34938);

return statearr_34964;
})();
var statearr_34965_34986 = state_34961__$1;
(statearr_34965_34986[(2)] = null);

(statearr_34965_34986[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34962 === (4))){
var inst_34941 = (state_34961[(8)]);
var inst_34941__$1 = (state_34961[(2)]);
var inst_34942 = (inst_34941__$1 == null);
var inst_34943 = cljs.core.not.call(null,inst_34942);
var state_34961__$1 = (function (){var statearr_34966 = state_34961;
(statearr_34966[(8)] = inst_34941__$1);

return statearr_34966;
})();
if(inst_34943){
var statearr_34967_34987 = state_34961__$1;
(statearr_34967_34987[(1)] = (5));

} else {
var statearr_34968_34988 = state_34961__$1;
(statearr_34968_34988[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34962 === (6))){
var state_34961__$1 = state_34961;
var statearr_34969_34989 = state_34961__$1;
(statearr_34969_34989[(2)] = null);

(statearr_34969_34989[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34962 === (3))){
var inst_34958 = (state_34961[(2)]);
var inst_34959 = cljs.core.async.close_BANG_.call(null,out);
var state_34961__$1 = (function (){var statearr_34970 = state_34961;
(statearr_34970[(9)] = inst_34958);

return statearr_34970;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_34961__$1,inst_34959);
} else {
if((state_val_34962 === (2))){
var state_34961__$1 = state_34961;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_34961__$1,(4),ch);
} else {
if((state_val_34962 === (11))){
var inst_34941 = (state_34961[(8)]);
var inst_34950 = (state_34961[(2)]);
var inst_34938 = inst_34941;
var state_34961__$1 = (function (){var statearr_34971 = state_34961;
(statearr_34971[(10)] = inst_34950);

(statearr_34971[(7)] = inst_34938);

return statearr_34971;
})();
var statearr_34972_34990 = state_34961__$1;
(statearr_34972_34990[(2)] = null);

(statearr_34972_34990[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34962 === (9))){
var inst_34941 = (state_34961[(8)]);
var state_34961__$1 = state_34961;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_34961__$1,(11),out,inst_34941);
} else {
if((state_val_34962 === (5))){
var inst_34941 = (state_34961[(8)]);
var inst_34938 = (state_34961[(7)]);
var inst_34945 = cljs.core._EQ_.call(null,inst_34941,inst_34938);
var state_34961__$1 = state_34961;
if(inst_34945){
var statearr_34974_34991 = state_34961__$1;
(statearr_34974_34991[(1)] = (8));

} else {
var statearr_34975_34992 = state_34961__$1;
(statearr_34975_34992[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34962 === (10))){
var inst_34953 = (state_34961[(2)]);
var state_34961__$1 = state_34961;
var statearr_34976_34993 = state_34961__$1;
(statearr_34976_34993[(2)] = inst_34953);

(statearr_34976_34993[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34962 === (8))){
var inst_34938 = (state_34961[(7)]);
var tmp34973 = inst_34938;
var inst_34938__$1 = tmp34973;
var state_34961__$1 = (function (){var statearr_34977 = state_34961;
(statearr_34977[(7)] = inst_34938__$1);

return statearr_34977;
})();
var statearr_34978_34994 = state_34961__$1;
(statearr_34978_34994[(2)] = null);

(statearr_34978_34994[(1)] = (2));


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
});})(c__33248__auto___34984,out))
;
return ((function (switch__33158__auto__,c__33248__auto___34984,out){
return (function() {
var cljs$core$async$state_machine__33159__auto__ = null;
var cljs$core$async$state_machine__33159__auto____0 = (function (){
var statearr_34979 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_34979[(0)] = cljs$core$async$state_machine__33159__auto__);

(statearr_34979[(1)] = (1));

return statearr_34979;
});
var cljs$core$async$state_machine__33159__auto____1 = (function (state_34961){
while(true){
var ret_value__33160__auto__ = (function (){try{while(true){
var result__33161__auto__ = switch__33158__auto__.call(null,state_34961);
if(cljs.core.keyword_identical_QMARK_.call(null,result__33161__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__33161__auto__;
}
break;
}
}catch (e34980){if((e34980 instanceof Object)){
var ex__33162__auto__ = e34980;
var statearr_34981_34995 = state_34961;
(statearr_34981_34995[(5)] = ex__33162__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_34961);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e34980;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__33160__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__34996 = state_34961;
state_34961 = G__34996;
continue;
} else {
return ret_value__33160__auto__;
}
break;
}
});
cljs$core$async$state_machine__33159__auto__ = function(state_34961){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__33159__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__33159__auto____1.call(this,state_34961);
}
throw(new Error('Invalid arity: ' + (arguments.length - 1)));
};
cljs$core$async$state_machine__33159__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__33159__auto____0;
cljs$core$async$state_machine__33159__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__33159__auto____1;
return cljs$core$async$state_machine__33159__auto__;
})()
;})(switch__33158__auto__,c__33248__auto___34984,out))
})();
var state__33250__auto__ = (function (){var statearr_34982 = f__33249__auto__.call(null);
(statearr_34982[(6)] = c__33248__auto___34984);

return statearr_34982;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__33250__auto__);
});})(c__33248__auto___34984,out))
);


return out;
});

cljs.core.async.unique.cljs$lang$maxFixedArity = 2;

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition = (function cljs$core$async$partition(var_args){
var G__34998 = arguments.length;
switch (G__34998) {
case 2:
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.core.async.partition.cljs$core$IFn$_invoke$arity$2 = (function (n,ch){
return cljs.core.async.partition.call(null,n,ch,null);
});

cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3 = (function (n,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__33248__auto___35064 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__33248__auto___35064,out){
return (function (){
var f__33249__auto__ = (function (){var switch__33158__auto__ = ((function (c__33248__auto___35064,out){
return (function (state_35036){
var state_val_35037 = (state_35036[(1)]);
if((state_val_35037 === (7))){
var inst_35032 = (state_35036[(2)]);
var state_35036__$1 = state_35036;
var statearr_35038_35065 = state_35036__$1;
(statearr_35038_35065[(2)] = inst_35032);

(statearr_35038_35065[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35037 === (1))){
var inst_34999 = (new Array(n));
var inst_35000 = inst_34999;
var inst_35001 = (0);
var state_35036__$1 = (function (){var statearr_35039 = state_35036;
(statearr_35039[(7)] = inst_35000);

(statearr_35039[(8)] = inst_35001);

return statearr_35039;
})();
var statearr_35040_35066 = state_35036__$1;
(statearr_35040_35066[(2)] = null);

(statearr_35040_35066[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35037 === (4))){
var inst_35004 = (state_35036[(9)]);
var inst_35004__$1 = (state_35036[(2)]);
var inst_35005 = (inst_35004__$1 == null);
var inst_35006 = cljs.core.not.call(null,inst_35005);
var state_35036__$1 = (function (){var statearr_35041 = state_35036;
(statearr_35041[(9)] = inst_35004__$1);

return statearr_35041;
})();
if(inst_35006){
var statearr_35042_35067 = state_35036__$1;
(statearr_35042_35067[(1)] = (5));

} else {
var statearr_35043_35068 = state_35036__$1;
(statearr_35043_35068[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35037 === (15))){
var inst_35026 = (state_35036[(2)]);
var state_35036__$1 = state_35036;
var statearr_35044_35069 = state_35036__$1;
(statearr_35044_35069[(2)] = inst_35026);

(statearr_35044_35069[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35037 === (13))){
var state_35036__$1 = state_35036;
var statearr_35045_35070 = state_35036__$1;
(statearr_35045_35070[(2)] = null);

(statearr_35045_35070[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35037 === (6))){
var inst_35001 = (state_35036[(8)]);
var inst_35022 = (inst_35001 > (0));
var state_35036__$1 = state_35036;
if(cljs.core.truth_(inst_35022)){
var statearr_35046_35071 = state_35036__$1;
(statearr_35046_35071[(1)] = (12));

} else {
var statearr_35047_35072 = state_35036__$1;
(statearr_35047_35072[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35037 === (3))){
var inst_35034 = (state_35036[(2)]);
var state_35036__$1 = state_35036;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_35036__$1,inst_35034);
} else {
if((state_val_35037 === (12))){
var inst_35000 = (state_35036[(7)]);
var inst_35024 = cljs.core.vec.call(null,inst_35000);
var state_35036__$1 = state_35036;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_35036__$1,(15),out,inst_35024);
} else {
if((state_val_35037 === (2))){
var state_35036__$1 = state_35036;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_35036__$1,(4),ch);
} else {
if((state_val_35037 === (11))){
var inst_35016 = (state_35036[(2)]);
var inst_35017 = (new Array(n));
var inst_35000 = inst_35017;
var inst_35001 = (0);
var state_35036__$1 = (function (){var statearr_35048 = state_35036;
(statearr_35048[(10)] = inst_35016);

(statearr_35048[(7)] = inst_35000);

(statearr_35048[(8)] = inst_35001);

return statearr_35048;
})();
var statearr_35049_35073 = state_35036__$1;
(statearr_35049_35073[(2)] = null);

(statearr_35049_35073[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35037 === (9))){
var inst_35000 = (state_35036[(7)]);
var inst_35014 = cljs.core.vec.call(null,inst_35000);
var state_35036__$1 = state_35036;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_35036__$1,(11),out,inst_35014);
} else {
if((state_val_35037 === (5))){
var inst_35004 = (state_35036[(9)]);
var inst_35009 = (state_35036[(11)]);
var inst_35000 = (state_35036[(7)]);
var inst_35001 = (state_35036[(8)]);
var inst_35008 = (inst_35000[inst_35001] = inst_35004);
var inst_35009__$1 = (inst_35001 + (1));
var inst_35010 = (inst_35009__$1 < n);
var state_35036__$1 = (function (){var statearr_35050 = state_35036;
(statearr_35050[(12)] = inst_35008);

(statearr_35050[(11)] = inst_35009__$1);

return statearr_35050;
})();
if(cljs.core.truth_(inst_35010)){
var statearr_35051_35074 = state_35036__$1;
(statearr_35051_35074[(1)] = (8));

} else {
var statearr_35052_35075 = state_35036__$1;
(statearr_35052_35075[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35037 === (14))){
var inst_35029 = (state_35036[(2)]);
var inst_35030 = cljs.core.async.close_BANG_.call(null,out);
var state_35036__$1 = (function (){var statearr_35054 = state_35036;
(statearr_35054[(13)] = inst_35029);

return statearr_35054;
})();
var statearr_35055_35076 = state_35036__$1;
(statearr_35055_35076[(2)] = inst_35030);

(statearr_35055_35076[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35037 === (10))){
var inst_35020 = (state_35036[(2)]);
var state_35036__$1 = state_35036;
var statearr_35056_35077 = state_35036__$1;
(statearr_35056_35077[(2)] = inst_35020);

(statearr_35056_35077[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35037 === (8))){
var inst_35009 = (state_35036[(11)]);
var inst_35000 = (state_35036[(7)]);
var tmp35053 = inst_35000;
var inst_35000__$1 = tmp35053;
var inst_35001 = inst_35009;
var state_35036__$1 = (function (){var statearr_35057 = state_35036;
(statearr_35057[(7)] = inst_35000__$1);

(statearr_35057[(8)] = inst_35001);

return statearr_35057;
})();
var statearr_35058_35078 = state_35036__$1;
(statearr_35058_35078[(2)] = null);

(statearr_35058_35078[(1)] = (2));


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
});})(c__33248__auto___35064,out))
;
return ((function (switch__33158__auto__,c__33248__auto___35064,out){
return (function() {
var cljs$core$async$state_machine__33159__auto__ = null;
var cljs$core$async$state_machine__33159__auto____0 = (function (){
var statearr_35059 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_35059[(0)] = cljs$core$async$state_machine__33159__auto__);

(statearr_35059[(1)] = (1));

return statearr_35059;
});
var cljs$core$async$state_machine__33159__auto____1 = (function (state_35036){
while(true){
var ret_value__33160__auto__ = (function (){try{while(true){
var result__33161__auto__ = switch__33158__auto__.call(null,state_35036);
if(cljs.core.keyword_identical_QMARK_.call(null,result__33161__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__33161__auto__;
}
break;
}
}catch (e35060){if((e35060 instanceof Object)){
var ex__33162__auto__ = e35060;
var statearr_35061_35079 = state_35036;
(statearr_35061_35079[(5)] = ex__33162__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_35036);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e35060;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__33160__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__35080 = state_35036;
state_35036 = G__35080;
continue;
} else {
return ret_value__33160__auto__;
}
break;
}
});
cljs$core$async$state_machine__33159__auto__ = function(state_35036){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__33159__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__33159__auto____1.call(this,state_35036);
}
throw(new Error('Invalid arity: ' + (arguments.length - 1)));
};
cljs$core$async$state_machine__33159__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__33159__auto____0;
cljs$core$async$state_machine__33159__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__33159__auto____1;
return cljs$core$async$state_machine__33159__auto__;
})()
;})(switch__33158__auto__,c__33248__auto___35064,out))
})();
var state__33250__auto__ = (function (){var statearr_35062 = f__33249__auto__.call(null);
(statearr_35062[(6)] = c__33248__auto___35064);

return statearr_35062;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__33250__auto__);
});})(c__33248__auto___35064,out))
);


return out;
});

cljs.core.async.partition.cljs$lang$maxFixedArity = 3;

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition_by = (function cljs$core$async$partition_by(var_args){
var G__35082 = arguments.length;
switch (G__35082) {
case 2:
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$2 = (function (f,ch){
return cljs.core.async.partition_by.call(null,f,ch,null);
});

cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3 = (function (f,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__33248__auto___35152 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__33248__auto___35152,out){
return (function (){
var f__33249__auto__ = (function (){var switch__33158__auto__ = ((function (c__33248__auto___35152,out){
return (function (state_35124){
var state_val_35125 = (state_35124[(1)]);
if((state_val_35125 === (7))){
var inst_35120 = (state_35124[(2)]);
var state_35124__$1 = state_35124;
var statearr_35126_35153 = state_35124__$1;
(statearr_35126_35153[(2)] = inst_35120);

(statearr_35126_35153[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35125 === (1))){
var inst_35083 = [];
var inst_35084 = inst_35083;
var inst_35085 = new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123);
var state_35124__$1 = (function (){var statearr_35127 = state_35124;
(statearr_35127[(7)] = inst_35084);

(statearr_35127[(8)] = inst_35085);

return statearr_35127;
})();
var statearr_35128_35154 = state_35124__$1;
(statearr_35128_35154[(2)] = null);

(statearr_35128_35154[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35125 === (4))){
var inst_35088 = (state_35124[(9)]);
var inst_35088__$1 = (state_35124[(2)]);
var inst_35089 = (inst_35088__$1 == null);
var inst_35090 = cljs.core.not.call(null,inst_35089);
var state_35124__$1 = (function (){var statearr_35129 = state_35124;
(statearr_35129[(9)] = inst_35088__$1);

return statearr_35129;
})();
if(inst_35090){
var statearr_35130_35155 = state_35124__$1;
(statearr_35130_35155[(1)] = (5));

} else {
var statearr_35131_35156 = state_35124__$1;
(statearr_35131_35156[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35125 === (15))){
var inst_35114 = (state_35124[(2)]);
var state_35124__$1 = state_35124;
var statearr_35132_35157 = state_35124__$1;
(statearr_35132_35157[(2)] = inst_35114);

(statearr_35132_35157[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35125 === (13))){
var state_35124__$1 = state_35124;
var statearr_35133_35158 = state_35124__$1;
(statearr_35133_35158[(2)] = null);

(statearr_35133_35158[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35125 === (6))){
var inst_35084 = (state_35124[(7)]);
var inst_35109 = inst_35084.length;
var inst_35110 = (inst_35109 > (0));
var state_35124__$1 = state_35124;
if(cljs.core.truth_(inst_35110)){
var statearr_35134_35159 = state_35124__$1;
(statearr_35134_35159[(1)] = (12));

} else {
var statearr_35135_35160 = state_35124__$1;
(statearr_35135_35160[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35125 === (3))){
var inst_35122 = (state_35124[(2)]);
var state_35124__$1 = state_35124;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_35124__$1,inst_35122);
} else {
if((state_val_35125 === (12))){
var inst_35084 = (state_35124[(7)]);
var inst_35112 = cljs.core.vec.call(null,inst_35084);
var state_35124__$1 = state_35124;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_35124__$1,(15),out,inst_35112);
} else {
if((state_val_35125 === (2))){
var state_35124__$1 = state_35124;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_35124__$1,(4),ch);
} else {
if((state_val_35125 === (11))){
var inst_35092 = (state_35124[(10)]);
var inst_35088 = (state_35124[(9)]);
var inst_35102 = (state_35124[(2)]);
var inst_35103 = [];
var inst_35104 = inst_35103.push(inst_35088);
var inst_35084 = inst_35103;
var inst_35085 = inst_35092;
var state_35124__$1 = (function (){var statearr_35136 = state_35124;
(statearr_35136[(11)] = inst_35102);

(statearr_35136[(12)] = inst_35104);

(statearr_35136[(7)] = inst_35084);

(statearr_35136[(8)] = inst_35085);

return statearr_35136;
})();
var statearr_35137_35161 = state_35124__$1;
(statearr_35137_35161[(2)] = null);

(statearr_35137_35161[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35125 === (9))){
var inst_35084 = (state_35124[(7)]);
var inst_35100 = cljs.core.vec.call(null,inst_35084);
var state_35124__$1 = state_35124;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_35124__$1,(11),out,inst_35100);
} else {
if((state_val_35125 === (5))){
var inst_35085 = (state_35124[(8)]);
var inst_35092 = (state_35124[(10)]);
var inst_35088 = (state_35124[(9)]);
var inst_35092__$1 = f.call(null,inst_35088);
var inst_35093 = cljs.core._EQ_.call(null,inst_35092__$1,inst_35085);
var inst_35094 = cljs.core.keyword_identical_QMARK_.call(null,inst_35085,new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123));
var inst_35095 = (inst_35093) || (inst_35094);
var state_35124__$1 = (function (){var statearr_35138 = state_35124;
(statearr_35138[(10)] = inst_35092__$1);

return statearr_35138;
})();
if(cljs.core.truth_(inst_35095)){
var statearr_35139_35162 = state_35124__$1;
(statearr_35139_35162[(1)] = (8));

} else {
var statearr_35140_35163 = state_35124__$1;
(statearr_35140_35163[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35125 === (14))){
var inst_35117 = (state_35124[(2)]);
var inst_35118 = cljs.core.async.close_BANG_.call(null,out);
var state_35124__$1 = (function (){var statearr_35142 = state_35124;
(statearr_35142[(13)] = inst_35117);

return statearr_35142;
})();
var statearr_35143_35164 = state_35124__$1;
(statearr_35143_35164[(2)] = inst_35118);

(statearr_35143_35164[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35125 === (10))){
var inst_35107 = (state_35124[(2)]);
var state_35124__$1 = state_35124;
var statearr_35144_35165 = state_35124__$1;
(statearr_35144_35165[(2)] = inst_35107);

(statearr_35144_35165[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35125 === (8))){
var inst_35084 = (state_35124[(7)]);
var inst_35092 = (state_35124[(10)]);
var inst_35088 = (state_35124[(9)]);
var inst_35097 = inst_35084.push(inst_35088);
var tmp35141 = inst_35084;
var inst_35084__$1 = tmp35141;
var inst_35085 = inst_35092;
var state_35124__$1 = (function (){var statearr_35145 = state_35124;
(statearr_35145[(14)] = inst_35097);

(statearr_35145[(7)] = inst_35084__$1);

(statearr_35145[(8)] = inst_35085);

return statearr_35145;
})();
var statearr_35146_35166 = state_35124__$1;
(statearr_35146_35166[(2)] = null);

(statearr_35146_35166[(1)] = (2));


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
});})(c__33248__auto___35152,out))
;
return ((function (switch__33158__auto__,c__33248__auto___35152,out){
return (function() {
var cljs$core$async$state_machine__33159__auto__ = null;
var cljs$core$async$state_machine__33159__auto____0 = (function (){
var statearr_35147 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_35147[(0)] = cljs$core$async$state_machine__33159__auto__);

(statearr_35147[(1)] = (1));

return statearr_35147;
});
var cljs$core$async$state_machine__33159__auto____1 = (function (state_35124){
while(true){
var ret_value__33160__auto__ = (function (){try{while(true){
var result__33161__auto__ = switch__33158__auto__.call(null,state_35124);
if(cljs.core.keyword_identical_QMARK_.call(null,result__33161__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__33161__auto__;
}
break;
}
}catch (e35148){if((e35148 instanceof Object)){
var ex__33162__auto__ = e35148;
var statearr_35149_35167 = state_35124;
(statearr_35149_35167[(5)] = ex__33162__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_35124);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e35148;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__33160__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__35168 = state_35124;
state_35124 = G__35168;
continue;
} else {
return ret_value__33160__auto__;
}
break;
}
});
cljs$core$async$state_machine__33159__auto__ = function(state_35124){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__33159__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__33159__auto____1.call(this,state_35124);
}
throw(new Error('Invalid arity: ' + (arguments.length - 1)));
};
cljs$core$async$state_machine__33159__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__33159__auto____0;
cljs$core$async$state_machine__33159__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__33159__auto____1;
return cljs$core$async$state_machine__33159__auto__;
})()
;})(switch__33158__auto__,c__33248__auto___35152,out))
})();
var state__33250__auto__ = (function (){var statearr_35150 = f__33249__auto__.call(null);
(statearr_35150[(6)] = c__33248__auto___35152);

return statearr_35150;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__33250__auto__);
});})(c__33248__auto___35152,out))
);


return out;
});

cljs.core.async.partition_by.cljs$lang$maxFixedArity = 3;


//# sourceMappingURL=async.js.map?rel=1540594454021
