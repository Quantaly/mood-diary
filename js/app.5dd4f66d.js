(function(e){function t(t){for(var r,o,c=t[0],s=t[1],u=t[2],d=0,p=[];d<c.length;d++)o=c[d],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&p.push(a[o][0]),a[o]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r]);l&&l(t);while(p.length)p.shift()();return i.push.apply(i,u||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],r=!0,c=1;c<n.length;c++){var s=n[c];0!==a[s]&&(r=!1)}r&&(i.splice(t--,1),e=o(o.s=n[0]))}return e}var r={},a={app:0},i=[];function o(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=r,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(n,r,function(t){return e[t]}.bind(null,r));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/podcast-app/";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],s=c.push.bind(c);c.push=t,c=c.slice();for(var u=0;u<c.length;u++)t(c[u]);var l=s;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("cd49")},"14d1":function(e,t,n){"use strict";var r=n("b9b8"),a=n.n(r);a.a},b9b8:function(e,t,n){},cd49:function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app",[n("v-app-bar",{attrs:{app:"",color:"green",dark:""}},[n("v-app-bar-nav-icon",{on:{click:function(t){e.drawerOpen=!e.drawerOpen}}}),n("v-toolbar-title",[e._v("Mood Diary")])],1),n("router-view"),n("v-navigation-drawer",{attrs:{fixed:"",temporary:""},model:{value:e.drawerOpen,callback:function(t){e.drawerOpen=t},expression:"drawerOpen"}},[n("v-list",[n("v-list-item",{attrs:{disabled:e.storagePersisted},on:{click:e.persistStorage}},[n("v-list-item-action",[n("v-icon",[e._v("mdi-"+e._s(e.storageIcon))])],1),n("v-list-item-content",[n("v-list-item-title",[e._v(e._s(e.storageMessage))])],1)],1),n("v-list-item",{on:{click:e.exportXML}},[n("v-list-item-action",[n("v-icon",[e._v("mdi-application-export")])],1),n("v-list-item-content",[n("v-list-item-title",[e._v("Export XML")])],1)],1),n("v-list-item",{on:{click:e.importXML}},[n("v-list-item-action",[n("v-icon",[e._v("mdi-application-import")])],1),n("v-list-item-content",[n("v-list-item-title",[e._v("Import XML")])],1)],1)],1)],1)],1)},i=[],o=(n("d3b7"),n("3ca3"),n("ddb0"),n("2b3d"),n("d4ec")),c=n("bee2"),s=n("262e"),u=n("2caf"),l=n("9ab4"),d=n("60a3"),p=(n("a9e3"),n("25eb"),n("25f0"),n("b85c")),f=(n("96cf"),n("1da1"));n("99af");function v(e,t){try{console.group(e),t()}finally{console.groupEnd()}}var m=1,b="mood-diary:db",h="entry",g="musings",y="entry",x=new Promise((function(e,t){var n=indexedDB.open(b,m);n.addEventListener("success",(function(){return e(n.result)})),n.addEventListener("error",(function(){return t(n.error)})),n.addEventListener("blocked",(function(){alert("Please close all other tabs with this site open!"),t(n.error)})),n.addEventListener("upgradeneeded",(function(e){var t=n.result;v("Upgrading database from ".concat(e.oldVersion," to ").concat(e.newVersion),(function(){for(var n=function(e){v("".concat(e," -> ").concat(e+1),(function(){switch(e){case 0:t.createObjectStore(h,{keyPath:"date"});var n=t.createObjectStore(g,{autoIncrement:!0});n.createIndex(y,"entry");break}}))},r=e.oldVersion;r<e.newVersion;r++)n(r)}))}))}));function w(e){return new Promise((function(t,n){e.addEventListener("success",(function(){return t(e.result)})),e.addEventListener("error",(function(){return n(e.error)}))}))}function j(e){return new Promise((function(t,n){e.addEventListener("complete",(function(){return t()})),e.addEventListener("error",(function(){return n(e.error)}))}))}function k(e,t){return new Promise((function(n,r){e.addEventListener("success",(function(){var r=e.result;r&&!t(r)?r.continue():n()})),e.addEventListener("error",(function(){return r(e.error)}))}))}function O(e,t){null!==e&&void 0!==e&&t(e)}var S=O;function _(e){return L.apply(this,arguments)}function L(){return L=Object(f["a"])(regeneratorRuntime.mark((function e(t){var n,r,a,i,o,c,s,u;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.text();case 2:return n=e.sent,r=new DOMParser,a=r.parseFromString(n,"text/xml"),e.next=7,x;case 7:return i=e.sent,o=i.transaction([h,g],"readwrite"),c=o.objectStore(h),s=o.objectStore(g),u=[],S(a.querySelector("diary"),(function(e){var t,n=Object(p["a"])(e.querySelectorAll("entry"));try{var r=function(){var e=t.value;S(e.getAttribute("date"),(function(t){S(e.getAttribute("mood"),(function(n){var r=Number.parseInt(n),a={date:t,mood:r};u.push(w(c.put(a)));var i,o=Object(p["a"])(e.querySelectorAll("musings"));try{var l=function(){var e=i.value;S(e.getAttribute("type"),(function(n){var r={entry:t,type:n,contents:e.textContent||""};u.push(w(s.put(r)))}))};for(o.s();!(i=o.n()).done;)l()}catch(d){o.e(d)}finally{o.f()}}))}))};for(n.s();!(t=n.n()).done;)r()}catch(a){n.e(a)}finally{n.f()}})),e.next=15,Promise.all(u);case 15:return e.next=17,j(o);case 17:case"end":return e.stop()}}),e)}))),L.apply(this,arguments)}function V(){return M.apply(this,arguments)}function M(){return M=Object(f["a"])(regeneratorRuntime.mark((function e(){var t,n,r,a,i,o,c,s,u,l;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,x;case 2:return t=e.sent,n=t.transaction([h,g],"readonly"),r=n.objectStore(h),a=n.objectStore(g),i=a.index(y),o=new Document,c=o.createElement("diary"),o.appendChild(c),s=[],e.next=13,k(r.openCursor(),(function(e){var t=e.value,n=o.createElement("entry");c.appendChild(n),n.setAttribute("date",t.date),n.setAttribute("mood",t.mood.toString()),s.push(k(i.openCursor(t.date),(function(e){var t=e.value,r=o.createElement("musings");n.appendChild(r),r.setAttribute("type",t.type),r.appendChild(o.createTextNode(t.contents))})))}));case 13:return e.next=15,Promise.all(s);case 15:return u=new XMLSerializer,l=u.serializeToString(o),e.abrupt("return",new Blob([l],{type:"text/xml"}));case 18:case"end":return e.stop()}}),e)}))),M.apply(this,arguments)}var E=function(e){Object(s["a"])(n,e);var t=Object(u["a"])(n);function n(){var e;return Object(o["a"])(this,n),e=t.apply(this,arguments),e.drawerOpen=!1,e.storagePersisted=!1,e}return Object(c["a"])(n,[{key:"created",value:function(){var e=this;navigator.storage.persisted().then((function(t){return e.storagePersisted=t}))}},{key:"persistStorage",value:function(){var e=this;navigator.storage.persist().then((function(t){return e.storagePersisted=t}))}},{key:"exportXML",value:function(){V().then((function(e){var t=document.createElement("a");t.href=URL.createObjectURL(e),t.download="diary.xml",t.style.display="none",document.body.appendChild(t),t.click(),t.remove()}))}},{key:"importXML",value:function(){var e=document.createElement("input");e.type="file",e.accept="text/xml",e.style.display="none",e.addEventListener("input",(function(){var t;(null===e||void 0===e||null===(t=e.files)||void 0===t?void 0:t[0])&&_(e.files[0]).then((function(){location.reload(!1)}))})),document.body.appendChild(e),e.click(),e.remove()}},{key:"storageMessage",get:function(){return this.storagePersisted?"Storage persisted":"Persist storage"}},{key:"storageIcon",get:function(){return this.storagePersisted?"database-check":"database"}}]),n}(d["c"]);E=Object(l["a"])([Object(d["a"])({})],E);var P=E,R=P,I=n("2877"),A=n("6544"),C=n.n(A),T=n("7496"),D=n("40dc"),$=n("5bc1"),B=n("132d"),K=n("8860"),N=n("da13"),X=n("1800"),q=n("5d23"),F=n("f774"),U=n("2a7f"),z=Object(I["a"])(R,a,i,!1,null,null,null),H=z.exports;C()(z,{VApp:T["a"],VAppBar:D["a"],VAppBarNavIcon:$["a"],VIcon:B["a"],VList:K["a"],VListItem:N["a"],VListItemAction:X["a"],VListItemContent:q["a"],VListItemTitle:q["c"],VNavigationDrawer:F["a"],VToolbarTitle:U["a"]});var J=n("9483");Object(J["a"])("".concat("/podcast-app/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}});var Y=n("8c4f"),G=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("v-main",[n("v-container",{attrs:{fluid:""}},[n("v-list",e._l(e.entries,(function(t){return n("v-list-item",{key:t.date,attrs:{to:"/"+t.date}},[n("v-list-item-content",[n("v-list-item-title",[e._v(e._s(t.date))]),n("v-list-item-subtitle",[e._v("Mood: "+e._s(t.mood))])],1),n("v-list-item-action",[n("v-btn",{attrs:{icon:""},on:{click:function(n){return n.preventDefault(),e.deleteEntry(t.date)}}},[n("v-icon",[e._v("mdi-delete")])],1)],1)],1)})),1)],1)],1),n("v-btn",{attrs:{fixed:"",bottom:"",right:"",fab:"",dark:"",color:"green",to:"/"+e.today}},[n("v-icon",[e._v("mdi-calendar-today")])],1)],1)},Q=[],W=(n("4d90"),/^\d\d\d\d-\d\d-\d\d$/);function Z(e){var t=e.getFullYear().toString().padStart(4,"0"),n=(e.getMonth()+1).toString().padStart(2,"0"),r=e.getDate().toString().padStart(2,"0");return"".concat(t,"-").concat(n,"-").concat(r)}function ee(e){if(e instanceof Date&&(e=Z(e)),!W.test(e))throw"".concat(e," is not a valid date string");return e}function te(){return ne.apply(this,arguments)}function ne(){return ne=Object(f["a"])(regeneratorRuntime.mark((function e(){var t,n,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,x;case 2:return t=e.sent,n=t.transaction(h,"readonly"),r=n.objectStore(h),e.abrupt("return",w(r.getAll()));case 6:case"end":return e.stop()}}),e)}))),ne.apply(this,arguments)}function re(e,t){return ae.apply(this,arguments)}function ae(){return ae=Object(f["a"])(regeneratorRuntime.mark((function e(t,n){var r,a,i,o,c,s,u;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t=ee(t),e.next=3,x;case 3:if(r=e.sent,!n&&void 0!==n){e.next=22;break}return a=r.transaction(h,"readwrite"),i=a.objectStore(h),e.next=9,w(i.get(t));case 9:if(o=e.sent,void 0!==o){e.next=19;break}return c={date:t,mood:0},e.next=14,w(i.put(c));case 14:return e.next=16,j(a);case 16:return e.abrupt("return",c);case 19:return e.abrupt("return",o);case 20:e.next=25;break;case 22:return s=r.transaction(h,"readonly"),u=s.objectStore(h),e.abrupt("return",w(u.get(t)));case 25:case"end":return e.stop()}}),e)}))),ae.apply(this,arguments)}function ie(e){return oe.apply(this,arguments)}function oe(){return oe=Object(f["a"])(regeneratorRuntime.mark((function e(t){var n,r,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(W.test(t.date)){e.next=2;break}throw"".concat(t.date," is not a valid date string");case 2:return e.next=4,x;case 4:return n=e.sent,r=n.transaction(h,"readwrite"),a=r.objectStore(h),e.next=9,w(a.put(t));case 9:return e.next=11,j(r);case 11:case"end":return e.stop()}}),e)}))),oe.apply(this,arguments)}function ce(e,t){return se.apply(this,arguments)}function se(){return se=Object(f["a"])(regeneratorRuntime.mark((function e(t,n){var r,a,i,o,c,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t=ee(t),e.next=3,x;case 3:return r=e.sent,a=r.transaction([h,g],"readwrite"),i=a.objectStore(h),o=a.objectStore(g),e.next=9,w(i.count(t));case 9:if(e.t0=e.sent,e.t0>0){e.next=13;break}throw a.abort(),"".concat(t," does not have an entry");case 13:return c={entry:t,type:n,contents:""},e.next=16,w(o.add(c));case 16:return s=e.sent,e.next=19,j(a);case 19:return e.abrupt("return",s);case 20:case"end":return e.stop()}}),e)}))),se.apply(this,arguments)}function ue(e){return le.apply(this,arguments)}function le(){return le=Object(f["a"])(regeneratorRuntime.mark((function e(t){var n,r,a,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t=ee(t),e.next=3,x;case 3:return n=e.sent,r=n.transaction(g,"readonly"),a=r.objectStore(g),i=a.index(y),e.abrupt("return",w(i.getAllKeys(t)));case 8:case"end":return e.stop()}}),e)}))),le.apply(this,arguments)}function de(e){return pe.apply(this,arguments)}function pe(){return pe=Object(f["a"])(regeneratorRuntime.mark((function e(t){var n,r,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,x;case 2:return n=e.sent,r=n.transaction(g,"readonly"),a=r.objectStore(g),e.abrupt("return",w(a.get(t)));case 6:case"end":return e.stop()}}),e)}))),pe.apply(this,arguments)}function fe(e,t){return ve.apply(this,arguments)}function ve(){return ve=Object(f["a"])(regeneratorRuntime.mark((function e(t,n){var r,a,i,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(W.test(t.entry)){e.next=2;break}throw"".concat(t.entry," is not a valid date string");case 2:return e.next=4,x;case 4:return r=e.sent,a=r.transaction(g,"readwrite"),i=a.objectStore(g),e.next=9,w(i.put(t,n));case 9:return o=e.sent,e.next=12,j(a);case 12:return e.abrupt("return",o);case 13:case"end":return e.stop()}}),e)}))),ve.apply(this,arguments)}function me(e){return be.apply(this,arguments)}function be(){return be=Object(f["a"])(regeneratorRuntime.mark((function e(t){var n,r,a,i,o,c,s,u,l,d;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t=ee(t),e.next=3,x;case 3:return n=e.sent,r=n.transaction([h,g],"readwrite"),a=r.objectStore(h),i=r.objectStore(g),o=i.index(y),e.next=10,w(a.count(t));case 10:if(e.t0=e.sent,c=e.t0>0,!c){e.next=28;break}return s=[],s.push(w(a.delete(t))),e.t1=p["a"],e.next=18,w(o.getAllKeys(t));case 18:e.t2=e.sent,u=(0,e.t1)(e.t2);try{for(u.s();!(l=u.n()).done;)d=l.value,s.push(w(i.delete(d)))}catch(f){u.e(f)}finally{u.f()}return e.next=23,Promise.all(s);case 23:return e.next=25,j(r);case 25:return e.abrupt("return",!0);case 28:return e.abrupt("return",!1);case 29:case"end":return e.stop()}}),e)}))),be.apply(this,arguments)}function he(e){return ge.apply(this,arguments)}function ge(){return ge=Object(f["a"])(regeneratorRuntime.mark((function e(t){var n,r,a,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,x;case 2:return n=e.sent,r=n.transaction(g,"readwrite"),a=r.objectStore(g),e.next=7,w(a.count(t));case 7:if(e.t0=e.sent,i=e.t0>0,!i){e.next=17;break}return e.next=12,w(a.delete(t));case 12:return e.next=14,j(r);case 14:return e.abrupt("return",!0);case 17:return e.abrupt("return",!1);case 18:case"end":return e.stop()}}),e)}))),ge.apply(this,arguments)}var ye=function(e){Object(s["a"])(n,e);var t=Object(u["a"])(n);function n(){var e;return Object(o["a"])(this,n),e=t.apply(this,arguments),e.entries=[],e}return Object(c["a"])(n,[{key:"updateListing",value:function(){var e=this;te().then((function(t){return e.entries=t.reverse()}))}},{key:"created",value:function(){this.updateListing()}},{key:"deleteEntry",value:function(e){var t=this;me(e).then((function(){t.updateListing()}))}},{key:"today",get:function(){var e=new Date;return e.getHours()<5&&e.setTime(e.getTime()-864e5),Z(e)}}]),n}(d["c"]);ye=Object(l["a"])([Object(d["a"])({})],ye);var xe=ye,we=xe,je=n("8336"),ke=n("a523"),Oe=n("f6c4"),Se=Object(I["a"])(we,G,Q,!1,null,null,null),_e=Se.exports;C()(Se,{VBtn:je["a"],VContainer:ke["a"],VIcon:B["a"],VList:K["a"],VListItem:N["a"],VListItemAction:X["a"],VListItemContent:q["a"],VListItemSubtitle:q["b"],VListItemTitle:q["c"],VMain:Oe["a"]});var Le=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("v-main",[n("v-container",{attrs:{fluid:""}},[n("h1",[e._v(e._s(e.date))]),n("div",{staticClass:"slider-container"},[n("v-slider",{attrs:{label:"Mood",min:"-5",max:"5",step:"1",ticks:"","tick-labels":[-5,-4,-3,-2,-1,0,1,2,3,4,5],color:"green","track-color":"light-green"},on:{change:e.updateMood},model:{value:e.entry.mood,callback:function(t){e.$set(e.entry,"mood",t)},expression:"entry.mood"}})],1),e._l(e.musings,(function(t,r){return n("div",{key:t},[n("v-divider"),n("div",{staticClass:"padded-container"},[n("MusingsEditor",{attrs:{musingsKey:t},on:{delete:function(t){return e.deleteMusings(r)}}})],1)],1)})),n("v-divider"),n("div",{staticClass:"padded-container"},[n("v-btn",{staticClass:"white--text",attrs:{color:"green"},on:{click:e.addMusings}},[n("v-icon",{attrs:{left:""}},[e._v("mdi-pencil")]),e._v("Muse ")],1)],1)],2)],1),n("v-btn",{attrs:{fixed:"",bottom:"",right:"",fab:"",dark:"",color:"green",to:"/"}},[n("v-icon",[e._v("mdi-home")])],1)],1)},Ve=[],Me=(n("a434"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("v-textarea",{attrs:{color:"green","auto-grow":"",filled:""},on:{change:e.updateMusings},model:{value:e.musings.contents,callback:function(t){e.$set(e.musings,"contents",t)},expression:"musings.contents"}}),n("v-btn",{attrs:{color:"lightgrey"},on:{click:e.deleteThis}},[n("v-icon",{attrs:{left:""}},[e._v("mdi-delete")]),e._v("Delete ")],1)],1)}),Ee=[],Pe=function(e){Object(s["a"])(n,e);var t=Object(u["a"])(n);function n(){var e;return Object(o["a"])(this,n),e=t.apply(this,arguments),e.musings={entry:"",type:"text",contents:""},e}return Object(c["a"])(n,[{key:"created",value:function(){var e=this;de(this.musingsKey).then((function(t){return e.musings=t}))}},{key:"updateMusings",value:function(){fe(this.musings,this.musingsKey)}},{key:"deleteThis",value:function(){var e=this;he(this.musingsKey).then((function(t){t&&e.$emit("delete")}))}}]),n}(d["c"]);Object(l["a"])([Object(d["b"])()],Pe.prototype,"musingsKey",void 0),Pe=Object(l["a"])([Object(d["a"])({})],Pe);var Re=Pe,Ie=Re,Ae=n("a844"),Ce=Object(I["a"])(Ie,Me,Ee,!1,null,null,null),Te=Ce.exports;C()(Ce,{VBtn:je["a"],VIcon:B["a"],VTextarea:Ae["a"]});var De=function(e){Object(s["a"])(n,e);var t=Object(u["a"])(n);function n(){var e;return Object(o["a"])(this,n),e=t.apply(this,arguments),e.entry={date:"",mood:0},e.musings=[],e}return Object(c["a"])(n,[{key:"updateMood",value:function(){ie(this.entry)}},{key:"created",value:function(){var e=this;re(this.date).then((function(t){return e.entry=t})),ue(this.date).then((function(t){return e.musings=t}))}},{key:"addMusings",value:function(){var e=this;ce(this.date,"text").then((function(t){e.musings.push(t)}))}},{key:"deleteMusings",value:function(e){this.musings.splice(e,1)}},{key:"date",get:function(){return this.$route.params.date}}]),n}(d["c"]);De=Object(l["a"])([Object(d["a"])({components:{MusingsEditor:Te}})],De);var $e=De,Be=$e,Ke=(n("14d1"),n("ce7e")),Ne=n("ba0d"),Xe=Object(I["a"])(Be,Le,Ve,!1,null,"a69d27a6",null),qe=Xe.exports;C()(Xe,{VBtn:je["a"],VContainer:ke["a"],VDivider:Ke["a"],VIcon:B["a"],VMain:Oe["a"],VSlider:Ne["a"]}),r["a"].use(Y["a"]);var Fe=[{path:"/",name:"Home",component:_e},{path:"/:date",name:"Entry",component:qe}],Ue=new Y["a"]({routes:Fe}),ze=Ue,He=n("f309");r["a"].use(He["a"]);var Je=new He["a"]({});r["a"].config.productionTip=!1;var Ye={router:ze,vuetify:Je,render:function(e){return e(H)}};new r["a"](Ye).$mount("#app")}});
//# sourceMappingURL=app.5dd4f66d.js.map