/*! store2 - v2.14.2 - 2022-07-18
* Copyright (c) 2022 Nathan Bubna; Licensed (MIT OR GPL-3.0) */
!function(a,b){var c={version:"2.14.2",areas:{},apis:{},nsdelim:".",inherit:function(a,b){for(var c in a)b.hasOwnProperty(c)||Object.defineProperty(b,c,Object.getOwnPropertyDescriptor(a,c));return b},stringify:function(a,b){return void 0===a||"function"==typeof a?a+"":JSON.stringify(a,b||c.replace)},parse:function(a,b){try{return JSON.parse(a,b||c.revive)}catch(b){return a}},fn:function(a,b){c.storeAPI[a]=b;for(var d in c.apis)c.apis[d][a]=b},get:function(a,b){return a.getItem(b)},set:function(a,b,c){a.setItem(b,c)},remove:function(a,b){a.removeItem(b)},key:function(a,b){return a.key(b)},length:function(a){return a.length},clear:function(a){a.clear()},Store:function(a,b,d){var e=c.inherit(c.storeAPI,function(a,b,c){return 0===arguments.length?e.getAll():"function"==typeof b?e.transact(a,b,c):void 0!==b?e.set(a,b,c):"string"==typeof a||"number"==typeof a?e.get(a):"function"==typeof a?e.each(a):a?e.setAll(a,b):e.clear()});e._id=a;try{b.setItem("__store2_test","ok"),e._area=b,b.removeItem("__store2_test")}catch(a){e._area=c.storage("fake")}return e._ns=d||"",c.areas[a]||(c.areas[a]=e._area),c.apis[e._ns+e._id]||(c.apis[e._ns+e._id]=e),e},storeAPI:{area:function(a,b){var d=this[a];return d&&d.area||(d=c.Store(a,b,this._ns),this[a]||(this[a]=d)),d},namespace:function(a,b,d){if(d=d||this._delim||c.nsdelim,!a)return this._ns?this._ns.substring(0,this._ns.length-d.length):"";var e=a,f=this[e];if(!(f&&f.namespace||(f=c.Store(this._id,this._area,this._ns+e+d),f._delim=d,this[e]||(this[e]=f),b)))for(var g in c.areas)f.area(g,c.areas[g]);return f},isFake:function(a){return a?(this._real=this._area,this._area=c.storage("fake")):!1===a&&(this._area=this._real||this._area),"fake"===this._area.name},toString:function(){return"store"+(this._ns?"."+this.namespace():"")+"["+this._id+"]"},has:function(a){return this._area.has?this._area.has(this._in(a)):!!(this._in(a)in this._area)},size:function(){return this.keys().length},each:function(a,b){for(var d=0,e=c.length(this._area);d<e;d++){var f=this._out(c.key(this._area,d));if(void 0!==f&&!1===a.call(this,f,this.get(f),b))break;e>c.length(this._area)&&(e--,d--)}return b||this},keys:function(a){return this.each(function(a,b,c){c.push(a)},a||[])},get:function(a,b){var d,e=c.get(this._area,this._in(a));return"function"==typeof b&&(d=b,b=null),null!==e?c.parse(e,d):null!=b?b:e},getAll:function(a){return this.each(function(a,b,c){c[a]=b},a||{})},transact:function(a,b,c){var d=this.get(a,c),e=b(d);return this.set(a,void 0===e?d:e),this},set:function(a,b,d){var e,f=this.get(a);return null!=f&&!1===d?b:("function"==typeof d&&(e=d,d=void 0),c.set(this._area,this._in(a),c.stringify(b,e),d)||f)},setAll:function(a,b){var c,d;for(var e in a)d=a[e],this.set(e,d,b)!==d&&(c=!0);return c},add:function(a,b,d){var e=this.get(a);if(e instanceof Array)b=e.concat(b);else if(null!==e){var f=typeof e;if(f===typeof b&&"object"===f){for(var g in b)e[g]=b[g];b=e}else b=e+b}return c.set(this._area,this._in(a),c.stringify(b,d)),b},remove:function(a,b){var d=this.get(a,b);return c.remove(this._area,this._in(a)),d},clear:function(){return this._ns?this.each(function(a){c.remove(this._area,this._in(a))},1):c.clear(this._area),this},clearAll:function(){var a=this._area;for(var b in c.areas)c.areas.hasOwnProperty(b)&&(this._area=c.areas[b],this.clear());return this._area=a,this},_in:function(a){return"string"!=typeof a&&(a=c.stringify(a)),this._ns?this._ns+a:a},_out:function(a){return this._ns?a&&0===a.indexOf(this._ns)?a.substring(this._ns.length):void 0:a}},storage:function(a){return c.inherit(c.storageAPI,{items:{},name:a})},storageAPI:{length:0,has:function(a){return this.items.hasOwnProperty(a)},key:function(a){var b=0;for(var c in this.items)if(this.has(c)&&a===b++)return c},setItem:function(a,b){this.has(a)||this.length++,this.items[a]=b},removeItem:function(a){this.has(a)&&(delete this.items[a],this.length--)},getItem:function(a){return this.has(a)?this.items[a]:null},clear:function(){for(var a in this.items)this.removeItem(a)}}},d=c.Store("local",function(){try{return localStorage}catch(a){}}());d.local=d,d._=c,d.area("session",function(){try{return sessionStorage}catch(a){}}()),d.area("page",c.storage("page")),"function"==typeof b&&void 0!==b.amd?b("store2",[],function(){return d}):"undefined"!=typeof module&&module.exports?module.exports=d:(a.store&&(c.conflict=a.store),a.store=d)}(this,this&&this.define);
