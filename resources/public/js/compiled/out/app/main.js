// Compiled by ClojureScript 1.9.946 {}
goog.provide('app.main');
goog.require('cljs.core');
cljs.core.enable_console_print_BANG_.call(null);
cljs.core.println.call(null,"This text is printed from src/app/main.cljs. Go ahead and edit it and see reloading in action.");
if(typeof app.main.app_state !== 'undefined'){
} else {
app.main.app_state = cljs.core.atom.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"text","text",-1790561697),"Hello world!"], null));
}
app.main.on_js_reload = (function app$main$on_js_reload(){
return null;
});

//# sourceMappingURL=main.js.map?rel=1540594450654
