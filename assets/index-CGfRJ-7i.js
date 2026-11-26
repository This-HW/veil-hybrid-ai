(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function n(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(r){if(r.ep)return;r.ep=!0;const o=n(r);fetch(r.href,o)}})();const hs={VITE_FIREBASE_API_KEY:"AIzaSyCoYO6IdufTxK2G4XuXUT6tfawta6Vx9Mw",VITE_FIREBASE_APP_ID:"1:827521129601:web:0c8393a21eddf82a1f4180",VITE_FIREBASE_AUTH_DOMAIN:"veil-hybrid-ai-a45a3.firebaseapp.com",VITE_FIREBASE_MESSAGING_SENDER_ID:"827521129601",VITE_FIREBASE_PROJECT_ID:"veil-hybrid-ai-a45a3",VITE_FIREBASE_STORAGE_BUCKET:"veil-hybrid-ai-a45a3.firebasestorage.app"},B=hs,je={apiKey:B.VITE_FIREBASE_API_KEY,authDomain:B.VITE_FIREBASE_AUTH_DOMAIN,projectId:B.VITE_FIREBASE_PROJECT_ID,storageBucket:B.VITE_FIREBASE_STORAGE_BUCKET,messagingSenderId:B.VITE_FIREBASE_MESSAGING_SENDER_ID,appId:B.VITE_FIREBASE_APP_ID},Ke=B.VITE_RECAPTCHA_SITE_KEY??"",ce=!!(je.apiKey&&je.projectId),it="gemini-3.5-flash-lite",ze="veil.appcheck.debug-token",fs=()=>{};var Dt={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ln=function(t){const e=[];let n=0;for(let s=0;s<t.length;s++){let r=t.charCodeAt(s);r<128?e[n++]=r:r<2048?(e[n++]=r>>6|192,e[n++]=r&63|128):(r&64512)===55296&&s+1<t.length&&(t.charCodeAt(s+1)&64512)===56320?(r=65536+((r&1023)<<10)+(t.charCodeAt(++s)&1023),e[n++]=r>>18|240,e[n++]=r>>12&63|128,e[n++]=r>>6&63|128,e[n++]=r&63|128):(e[n++]=r>>12|224,e[n++]=r>>6&63|128,e[n++]=r&63|128)}return e},ps=function(t){const e=[];let n=0,s=0;for(;n<t.length;){const r=t[n++];if(r<128)e[s++]=String.fromCharCode(r);else if(r>191&&r<224){const o=t[n++];e[s++]=String.fromCharCode((r&31)<<6|o&63)}else if(r>239&&r<365){const o=t[n++],i=t[n++],a=t[n++],c=((r&7)<<18|(o&63)<<12|(i&63)<<6|a&63)-65536;e[s++]=String.fromCharCode(55296+(c>>10)),e[s++]=String.fromCharCode(56320+(c&1023))}else{const o=t[n++],i=t[n++];e[s++]=String.fromCharCode((r&15)<<12|(o&63)<<6|i&63)}}return e.join("")},at={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let r=0;r<t.length;r+=3){const o=t[r],i=r+1<t.length,a=i?t[r+1]:0,c=r+2<t.length,l=c?t[r+2]:0,h=o>>2,f=(o&3)<<4|a>>4;let p=(a&15)<<2|l>>6,I=l&63;c||(I=64,i||(p=64)),s.push(n[h],n[f],n[p],n[I])}return s.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(ln(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):ps(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let r=0;r<t.length;){const o=n[t.charAt(r++)],a=r<t.length?n[t.charAt(r)]:0;++r;const l=r<t.length?n[t.charAt(r)]:64;++r;const f=r<t.length?n[t.charAt(r)]:64;if(++r,o==null||a==null||l==null||f==null)throw new gs;const p=o<<2|a>>4;if(s.push(p),l!==64){const I=a<<4&240|l>>2;if(s.push(I),f!==64){const R=l<<6&192|f;s.push(R)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class gs extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const ms=function(t){const e=ln(t);return at.encodeByteArray(e,!0)},dn=function(t){return ms(t).replace(/\./g,"")},We=function(t){try{return at.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function G(t){return un(void 0,t)}function un(t,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const n=e;return new Date(n.getTime());case Object:t===void 0&&(t={});break;case Array:t=[];break;default:return e}for(const n in e)!e.hasOwnProperty(n)||!Es(n)||(t[n]=un(t[n],e[n]));return t}function Es(t){return t!=="__proto__"}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ct(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bs=()=>ct().__FIREBASE_DEFAULTS__,ys=()=>{if(typeof process>"u"||typeof Dt>"u")return;const t=Dt.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},ws=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&We(t[1]);return e&&JSON.parse(e)},_s=()=>{try{return fs()||bs()||ys()||ws()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},hn=()=>_s()?.config;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class de{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,s)=>{n?this.reject(n):this.resolve(s),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,s))}}}function lt(){try{return typeof indexedDB=="object"}catch{return!1}}function Ss(){return new Promise((t,e)=>{try{let n=!0;const s="validate-browser-context-for-indexeddb-analytics-module",r=self.indexedDB.open(s);r.onsuccess=()=>{r.result.close(),n||self.indexedDB.deleteDatabase(s),t(!0)},r.onupgradeneeded=()=>{n=!1},r.onerror=()=>{e(r.error?.message||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ts="FirebaseError";class Q extends Error{constructor(e,n,s){super(n),this.code=e,this.customData=s,this.name=Ts,Object.setPrototypeOf(this,Q.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,dt.prototype.create)}}class dt{constructor(e,n,s){this.service=e,this.serviceName=n,this.errors=s}create(e,...n){const s=n[0]||{},r=`${this.service}/${e}`,o=this.errors[e],i=o?As(o,s):"Error",a=`${this.serviceName}: ${i} (${r}).`;return new Q(r,a,s)}}function As(t,e){try{let n=0,s="";for(;n<t.length;){const r=t.indexOf("{$",n);if(r===-1){s+=t.substring(n);break}const o=t.indexOf("}",r+2);if(o===-1){s+=t.substring(n);break}const i=t.substring(r+2,o),a=e[i];s+=t.substring(n,r)+(a!=null?String(a):`<${i}?>`),n=o+1}return s}catch{return t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nt(t){return JSON.parse(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Is=function(t){let e={},n={},s={},r="";try{const o=t.split(".");e=Nt(We(o[0])||""),n=Nt(We(o[1])||""),r=o[2],s=n.d||{},delete n.d}catch{}return{header:e,claims:n,data:s,signature:r}},Cs=function(t){const e=Is(t).claims;return typeof e=="object"&&e.hasOwnProperty("iat")?e.iat:null};function qe(t,e){if(t===e)return!0;const n=Object.keys(t),s=Object.keys(e);for(const r of n){if(!s.includes(r))return!1;const o=t[r],i=e[r];if(Pt(o)&&Pt(i)){if(!qe(o,i))return!1}else if(o!==i)return!1}for(const r of s)if(!n.includes(r))return!1;return!0}function Pt(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vs=1e3,Os=2,Rs=4*60*60*1e3,ks=.5;function Ds(t,e=vs,n=Os){const s=e*Math.pow(n,t),r=Math.round(ks*s*(Math.random()-.5)*2);return Math.min(Rs,s+r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fn(t){return t&&t._delegate?t._delegate:t}class j{constructor(e,n,s){this.name=e,this.instanceFactory=n,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const F="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ns{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const s=new de;if(this.instancesDeferred.set(n,s),this.isInitialized(n)||this.shouldAutoInitialize())try{const r=this.getOrInitializeService({instanceIdentifier:n});r&&s.resolve(r)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){const n=this.normalizeInstanceIdentifier(e?.identifier),s=e?.optional??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(r){if(s)return null;throw r}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Ms(e))try{this.getOrInitializeService({instanceIdentifier:F})}catch{}for(const[n,s]of this.instancesDeferred.entries()){const r=this.normalizeInstanceIdentifier(n);try{const o=this.getOrInitializeService({instanceIdentifier:r});s.resolve(o)}catch{}}}}clearInstance(e=F){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=F){return this.instances.has(e)}getOptions(e=F){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,s=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const r=this.getOrInitializeService({instanceIdentifier:s,options:n});for(const[o,i]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(o);s===a&&i.resolve(r)}return r}onInit(e,n){const s=this.normalizeInstanceIdentifier(n),r=this.onInitCallbacks.get(s)??new Set;r.add(e),this.onInitCallbacks.set(s,r);const o=this.instances.get(s);return o&&e(o,s),()=>{r.delete(e)}}invokeOnInitCallbacks(e,n){const s=this.onInitCallbacks.get(n);if(s)for(const r of s)try{r(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let s=this.instances.get(e);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:Ps(e),options:n}),this.instances.set(e,s),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(s,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,s)}catch{}return s||null}normalizeInstanceIdentifier(e=F){return this.component?this.component.multipleInstances?e:F:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Ps(t){return t===F?void 0:t}function Ms(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ls{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new Ns(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var m;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(m||(m={}));const xs={debug:m.DEBUG,verbose:m.VERBOSE,info:m.INFO,warn:m.WARN,error:m.ERROR,silent:m.SILENT},$s=m.INFO,Bs={[m.DEBUG]:"log",[m.VERBOSE]:"log",[m.INFO]:"info",[m.WARN]:"warn",[m.ERROR]:"error"},Fs=(t,e,...n)=>{if(e<t.logLevel)return;const s=new Date().toISOString(),r=Bs[e];if(r)console[r](`[${s}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class ut{constructor(e){this.name=e,this._logLevel=$s,this._logHandler=Fs,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in m))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?xs[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,m.DEBUG,...e),this._logHandler(this,m.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,m.VERBOSE,...e),this._logHandler(this,m.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,m.INFO,...e),this._logHandler(this,m.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,m.WARN,...e),this._logHandler(this,m.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,m.ERROR,...e),this._logHandler(this,m.ERROR,...e)}}const Us=(t,e)=>e.some(n=>t instanceof n);let Mt,Lt;function Hs(){return Mt||(Mt=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Gs(){return Lt||(Lt=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const pn=new WeakMap,Ye=new WeakMap,gn=new WeakMap,Ne=new WeakMap,ht=new WeakMap;function Vs(t){const e=new Promise((n,s)=>{const r=()=>{t.removeEventListener("success",o),t.removeEventListener("error",i)},o=()=>{n(x(t.result)),r()},i=()=>{s(t.error),r()};t.addEventListener("success",o),t.addEventListener("error",i)});return e.then(n=>{n instanceof IDBCursor&&pn.set(n,t)}).catch(()=>{}),ht.set(e,t),e}function js(t){if(Ye.has(t))return;const e=new Promise((n,s)=>{const r=()=>{t.removeEventListener("complete",o),t.removeEventListener("error",i),t.removeEventListener("abort",i)},o=()=>{n(),r()},i=()=>{s(t.error||new DOMException("AbortError","AbortError")),r()};t.addEventListener("complete",o),t.addEventListener("error",i),t.addEventListener("abort",i)});Ye.set(t,e)}let Je={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return Ye.get(t);if(e==="objectStoreNames")return t.objectStoreNames||gn.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return x(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function Ks(t){Je=t(Je)}function zs(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const s=t.call(Pe(this),e,...n);return gn.set(s,e.sort?e.sort():[e]),x(s)}:Gs().includes(t)?function(...e){return t.apply(Pe(this),e),x(pn.get(this))}:function(...e){return x(t.apply(Pe(this),e))}}function Ws(t){return typeof t=="function"?zs(t):(t instanceof IDBTransaction&&js(t),Us(t,Hs())?new Proxy(t,Je):t)}function x(t){if(t instanceof IDBRequest)return Vs(t);if(Ne.has(t))return Ne.get(t);const e=Ws(t);return e!==t&&(Ne.set(t,e),ht.set(e,t)),e}const Pe=t=>ht.get(t);function qs(t,e,{blocked:n,upgrade:s,blocking:r,terminated:o}={}){const i=indexedDB.open(t,e),a=x(i);return s&&i.addEventListener("upgradeneeded",c=>{s(x(i.result),c.oldVersion,c.newVersion,x(i.transaction),c)}),n&&i.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),a.then(c=>{o&&c.addEventListener("close",()=>o()),r&&c.addEventListener("versionchange",l=>r(l.oldVersion,l.newVersion,l))}).catch(()=>{}),a}const Ys=["get","getKey","getAll","getAllKeys","count"],Js=["put","add","delete","clear"],Me=new Map;function xt(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(Me.get(e))return Me.get(e);const n=e.replace(/FromIndex$/,""),s=e!==n,r=Js.includes(n);if(!(n in(s?IDBIndex:IDBObjectStore).prototype)||!(r||Ys.includes(n)))return;const o=async function(i,...a){const c=this.transaction(i,r?"readwrite":"readonly");let l=c.store;return s&&(l=l.index(a.shift())),(await Promise.all([l[n](...a),r&&c.done]))[0]};return Me.set(e,o),o}Ks(t=>({...t,get:(e,n,s)=>xt(e,n)||t.get(e,n,s),has:(e,n)=>!!xt(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xs{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(Zs(n)){const s=n.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(n=>n).join(" ")}}function Zs(t){return t.getComponent()?.type==="VERSION"}const Xe="@firebase/app",$t="0.16.7";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const v=new ut("@firebase/app"),Qs="@firebase/app-compat",er="@firebase/analytics-compat",tr="@firebase/analytics",nr="@firebase/app-check-compat",sr="@firebase/app-check",rr="@firebase/auth",or="@firebase/auth-compat",ir="@firebase/crashlytics",ar="@firebase/database",cr="@firebase/data-connect",lr="@firebase/database-compat",dr="@firebase/functions",ur="@firebase/functions-compat",hr="@firebase/installations",fr="@firebase/installations-compat",pr="@firebase/messaging",gr="@firebase/messaging-compat",mr="@firebase/performance",Er="@firebase/performance-compat",br="@firebase/remote-config",yr="@firebase/remote-config-compat",wr="@firebase/storage",_r="@firebase/storage-compat",Sr="@firebase/firestore",Tr="@firebase/ai",Ar="@firebase/firestore-compat",Ir="firebase";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ze="[DEFAULT]",Cr={[Xe]:"fire-core",[Qs]:"fire-core-compat",[tr]:"fire-analytics",[er]:"fire-analytics-compat",[sr]:"fire-app-check",[nr]:"fire-app-check-compat",[rr]:"fire-auth",[or]:"fire-auth-compat",[ir]:"fire-cls",[ar]:"fire-rtdb",[cr]:"fire-data-connect",[lr]:"fire-rtdb-compat",[dr]:"fire-fn",[ur]:"fire-fn-compat",[hr]:"fire-iid",[fr]:"fire-iid-compat",[pr]:"fire-fcm",[gr]:"fire-fcm-compat",[mr]:"fire-perf",[Er]:"fire-perf-compat",[br]:"fire-rc",[yr]:"fire-rc-compat",[wr]:"fire-gcs",[_r]:"fire-gcs-compat",[Sr]:"fire-fst",[Ar]:"fire-fst-compat",[Tr]:"fire-vertex","fire-js":"fire-js",[Ir]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ae=new Map,vr=new Map,Qe=new Map;function Bt(t,e){try{t.container.addComponent(e)}catch(n){v.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function X(t){const e=t.name;if(Qe.has(e))return v.debug(`There were multiple attempts to register component ${e}.`),!1;Qe.set(e,t);for(const n of Ae.values())Bt(n,t);for(const n of vr.values())Bt(n,t);return!0}function ft(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function Or(t){return t==null?!1:t.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rr={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different {$mismatchedParam}. Existing: '{$oldValue}'. New: '{$newValue}'.","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},D=new dt("app","Firebase",Rr);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kr{constructor(e,n,s){this._isDeleted=!1,this._options={...e},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new j("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw D.create("app-deleted",{appName:this._name})}}function mn(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const s={name:Ze,automaticDataCollectionEnabled:!0,...e},r=s.name;if(typeof r!="string"||!r)throw D.create("bad-app-name",{appName:String(r)});if(n||(n=hn()),!n)throw D.create("no-options");const o=Ae.get(r);if(o)if(qe(n,o.options)){if(qe(s,o.config))return o;throw D.create("duplicate-app",{appName:r,mismatchedParam:"config",oldValue:JSON.stringify(o.config),newValue:JSON.stringify(s)})}else throw D.create("duplicate-app",{appName:r,mismatchedParam:"options",oldValue:JSON.stringify(o.options),newValue:JSON.stringify(n)});const i=new Ls(r);for(const c of Qe.values())i.addComponent(c);const a=new kr(n,s,i);return Ae.set(r,a),a}function En(t=Ze){const e=Ae.get(t);if(!e&&t===Ze&&hn())return mn();if(!e)throw D.create("no-app",{appName:t});return e}function V(t,e,n){let s=Cr[t]??t;n&&(s+=`-${n}`);const r=s.match(/\s|\//),o=e.match(/\s|\//);if(r||o){const i=[`Unable to register library "${s}" with version "${e}":`];r&&i.push(`library name "${s}" contains illegal characters (whitespace or "/")`),r&&o&&i.push("and"),o&&i.push(`version name "${e}" contains illegal characters (whitespace or "/")`),v.warn(i.join(" "));return}X(new j(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dr="firebase-heartbeat-database",Nr=1,ue="firebase-heartbeat-store";let Le=null;function bn(){return Le||(Le=qs(Dr,Nr,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(ue)}catch(n){console.warn(n)}}}}).catch(t=>{throw D.create("idb-open",{originalErrorMessage:t.message})})),Le}async function Pr(t){try{const n=(await bn()).transaction(ue),s=await n.objectStore(ue).get(yn(t));return await n.done,s}catch(e){if(e instanceof Q)v.warn(e.message);else{const n=D.create("idb-get",{originalErrorMessage:e?.message});v.warn(n.message)}}}async function Ft(t,e){try{const s=(await bn()).transaction(ue,"readwrite");await s.objectStore(ue).put(e,yn(t)),await s.done}catch(n){if(n instanceof Q)v.warn(n.message);else{const s=D.create("idb-set",{originalErrorMessage:n?.message});v.warn(s.message)}}}function yn(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mr=1024,Lr=30;class xr{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new Br(n),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}async triggerHeartbeat(){try{const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=Ut();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(r=>r.date===s))return;if(this._heartbeatsCache.heartbeats.push({date:s,agent:n}),this._heartbeatsCache.heartbeats.length>Lr){const r=Fr(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(r,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){v.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=Ut(),{heartbeatsToSend:n,unsentEntries:s}=$r(this._heartbeatsCache.heartbeats),r=dn(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}catch(e){return v.warn(e),""}}}function Ut(){return new Date().toISOString().substring(0,10)}function $r(t,e=Mr){const n=[];let s=t.slice();for(const r of t){const o=n.find(i=>i.agent===r.agent);if(o){if(o.dates.push(r.date),Ht(n)>e){o.dates.pop();break}}else if(n.push({agent:r.agent,dates:[r.date]}),Ht(n)>e){n.pop();break}s=s.slice(1)}return{heartbeatsToSend:n,unsentEntries:s}}class Br{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return lt()?Ss().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await Pr(this.app);return n?.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return Ft(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return Ft(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function Ht(t){return dn(JSON.stringify({version:2,heartbeats:t})).length}function Fr(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let s=1;s<t.length;s++)t[s].date<n&&(n=t[s].date,e=s);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ur(t){X(new j("platform-logger",e=>new Xs(e),"PRIVATE")),X(new j("heartbeat",e=>new xr(e),"PRIVATE")),V(Xe,$t,t),V(Xe,$t,"esm2020"),V("fire-js","")}/**
 * @license
 * Copyright 2026 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const et="firebase-js-sdk-policy",Hr=["https://www.googletagmanager.com/gtag/js","https://apis.google.com/js/api.js","https://www.google.com/recaptcha/api.js","https://www.google.com/recaptcha/enterprise.js"];let ge,wn=!1;function _n(t){if(!Hr.some(n=>t.startsWith(n)&&(t.length===n.length||t.charAt(n.length)==="?")))throw new TypeError(`Firebase: Refusing to load untrusted script URL: ${t}`);return t}function Gr(){if(ge===void 0){ge=null;const t=typeof window<"u"?window.trustedTypes:void 0;if(t?.createPolicy)try{ge=t.createPolicy(et,{createScriptURL:_n})}catch{wn=!0}}return ge}function Vr(t,e){_n(e);const n=Gr();if(n){t.src=n.createScriptURL(e);return}try{t.src=e}catch(s){throw wn&&v.error(`Unable to load ${e} because this page requires Trusted Types for scripts but does not allow the "${et}" Trusted Types policy. To fix this, add "${et}" to the trusted-types directive of the page's Content-Security-Policy.`),s}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Ur("");var jr="firebase",Kr="13.4.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */V(jr,Kr,"app");/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tt=new Map,Sn={activated:!1,tokenObservers:[]},zr={initialized:!1,enabled:!1};function b(t){return tt.get(t)||{...Sn}}function Wr(t,e){return tt.set(t,e),tt.get(t)}function Oe(){return zr}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tn="https://content-firebaseappcheck.googleapis.com/v1",qr="exchangeRecaptchaEnterpriseToken",Yr="exchangeDebugToken",Gt={RETRIAL_MIN_WAIT:30*1e3,RETRIAL_MAX_WAIT:16*60*1e3},Jr=24*60*60*1e3;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xr{constructor(e,n,s,r,o){if(this.operation=e,this.retryPolicy=n,this.getWaitDuration=s,this.lowerBound=r,this.upperBound=o,this.pending=null,this.nextErrorWaitInterval=r,r>o)throw new Error("Proactive refresh lower bound greater than upper bound!")}start(){this.nextErrorWaitInterval=this.lowerBound,this.process(!0).catch(()=>{})}stop(){this.pending&&(this.pending.reject("cancelled"),this.pending=null)}isRunning(){return!!this.pending}async process(e){this.stop();try{this.pending=new de,this.pending.promise.catch(n=>{}),await Zr(this.getNextRun(e)),this.pending.resolve(),await this.pending.promise,this.pending=new de,this.pending.promise.catch(n=>{}),await this.operation(),this.pending.resolve(),await this.pending.promise,this.process(!0).catch(()=>{})}catch(n){this.retryPolicy(n)?this.process(!1).catch(()=>{}):this.stop()}}getNextRun(e){if(e)return this.nextErrorWaitInterval=this.lowerBound,this.getWaitDuration();{const n=this.nextErrorWaitInterval;return this.nextErrorWaitInterval*=2,this.nextErrorWaitInterval>this.upperBound&&(this.nextErrorWaitInterval=this.upperBound),n}}}function Zr(t){return new Promise(e=>{setTimeout(e,t)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qr={"already-initialized":"You have already called initializeAppCheck() for FirebaseApp {$appName} with different options. To avoid this error, call initializeAppCheck() with the same options as when it was originally called. This will return the already initialized instance.","use-before-activation":"App Check is being used before initializeAppCheck() is called for FirebaseApp {$appName}. Call initializeAppCheck() before instantiating other Firebase services.","fetch-network-error":"Fetch failed to connect to a network. Check Internet connection. Original error: {$originalErrorMessage}.","fetch-parse-error":"Fetch client could not parse response. Original error: {$originalErrorMessage}.","fetch-status-error":"Fetch server returned an HTTP error status. HTTP status: {$httpStatus}.","storage-open":"Error thrown when opening storage. Original error: {$originalErrorMessage}.","storage-get":"Error thrown when reading from storage. Original error: {$originalErrorMessage}.","storage-set":"Error thrown when writing to storage. Original error: {$originalErrorMessage}.","recaptcha-error":"ReCAPTCHA error.","initial-throttle":"{$httpStatus} error. Attempts allowed again after {$time}",throttled:"Requests throttled due to previous {$httpStatus} error. Attempts allowed again after {$time}"},_=new dt("appCheck","AppCheck",Qr);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vt(t=!1){return t?self.grecaptcha?.enterprise:self.grecaptcha}function pt(t){if(!b(t).activated)throw _.create("use-before-activation",{appName:t.name})}function An(t){const e=Math.round(t/1e3),n=Math.floor(e/(3600*24)),s=Math.floor((e-n*3600*24)/3600),r=Math.floor((e-n*3600*24-s*3600)/60),o=e-n*3600*24-s*3600-r*60;let i="";return n&&(i+=me(n)+"d:"),s&&(i+=me(s)+"h:"),i+=me(r)+"m:"+me(o)+"s",i}function me(t){return t===0?"00":t>=10?t.toString():"0"+t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function gt({url:t,body:e},n){const s={"Content-Type":"application/json"},r=n.getImmediate({optional:!0});if(r){const f=await r.getHeartbeatsHeader();f&&(s["X-Firebase-Client"]=f)}const o={method:"POST",body:JSON.stringify(e),headers:s};let i;try{i=await fetch(t,o)}catch(f){throw _.create("fetch-network-error",{originalErrorMessage:f?.message})}if(i.status!==200)throw _.create("fetch-status-error",{httpStatus:i.status});let a;try{a=await i.json()}catch(f){throw _.create("fetch-parse-error",{originalErrorMessage:f?.message})}const c=a.ttl.match(/^([\d.]+)(s)$/);if(!c||!c[2]||isNaN(Number(c[1])))throw _.create("fetch-parse-error",{originalErrorMessage:`ttl field (timeToLive) is not in standard Protobuf Duration format: ${a.ttl}`});const l=Number(c[1])*1e3,h=Date.now();return{token:a.token,expireTimeMillis:h+l,issuedAtTimeMillis:h}}function eo(t,e){const{projectId:n,appId:s,apiKey:r}=t.options;return{url:`${Tn}/projects/${n}/apps/${s}:${qr}?key=${r}`,body:{recaptcha_enterprise_token:e}}}function In(t,e){const{projectId:n,appId:s,apiKey:r}=t.options;return{url:`${Tn}/projects/${n}/apps/${s}:${Yr}?key=${r}`,body:{debug_token:e}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const to="firebase-app-check-database",no=1,he="firebase-app-check-store",Cn="debug-token";let Ee=null;function vn(){return Ee||(Ee=new Promise((t,e)=>{try{const n=indexedDB.open(to,no);n.onsuccess=s=>{t(s.target.result)},n.onerror=s=>{e(_.create("storage-open",{originalErrorMessage:s.target.error?.message}))},n.onupgradeneeded=s=>{const r=s.target.result;switch(s.oldVersion){case 0:r.createObjectStore(he,{keyPath:"compositeKey"})}}}catch(n){e(_.create("storage-open",{originalErrorMessage:n?.message}))}}),Ee)}function so(t){return Rn(kn(t))}function ro(t,e){return On(kn(t),e)}function oo(t){return On(Cn,t)}function io(){return Rn(Cn)}async function On(t,e){const s=(await vn()).transaction(he,"readwrite"),o=s.objectStore(he).put({compositeKey:t,value:e});return new Promise((i,a)=>{o.onsuccess=c=>{i()},s.onerror=c=>{a(_.create("storage-set",{originalErrorMessage:c.target.error?.message}))}})}async function Rn(t){const n=(await vn()).transaction(he,"readonly"),r=n.objectStore(he).get(t);return new Promise((o,i)=>{r.onsuccess=a=>{const c=a.target.result;o(c?c.value:void 0)},n.onerror=a=>{i(_.create("storage-get",{originalErrorMessage:a.target.error?.message}))}})}function kn(t){return`${t.options.appId}-${t.name}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const M=new ut("@firebase/app-check");/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ao(t){if(lt()){let e;try{e=await so(t)}catch(n){M.warn(`Failed to read token from IndexedDB. Error: ${n}`)}return e}}function xe(t,e){return lt()?ro(t,e).catch(n=>{M.warn(`Failed to write token to IndexedDB. Error: ${n}`)}):Promise.resolve()}async function co(t){let e;try{e=await io()}catch{}if(e)return e;{const n=crypto.randomUUID();let s=`To use this token for app debugging, register it with your project.

Firebase App Check debug token: ${n}

`;const r=t?.options.appId,o=t?.options.projectId;return o&&r?s+=`You can do so in the Firebase Console:
https://console.firebase.google.com/project/${o}/appcheck/apps?selectedAppId=${r}

Or using the Firebase CLI:
firebase appcheck:debugtokens:create ${n} --project ${o} --app ${r}

`:s+=`You will need to add it to your app's App Check settings in the Firebase Console for it to work.

`,s+=`Note: To keep your project secure, please revoke and delete this token using the
Firebase Console or the CLI (\`firebase appcheck:debugtokens:delete\`) when you finish debugging.

Warning: This debug token is a secret and should not be shared or uploaded to source code.

Debug Token Guide: https://firebase.google.com/docs/app-check/web/debug-provider
Firebase CLI install instructions: https://firebase.google.com/docs/cli
`,console.log(s),oo(n).catch(i=>M.warn(`Failed to persist debug token to IndexedDB. Error: ${i}`)),n}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mt(){return Oe().enabled}async function Et(){const t=Oe();if(t.enabled&&t.token)return t.token.promise;throw Error(`
            Can't get debug token in production mode.
        `)}function lo(t){const e=ct(),n=Oe();if(n.initialized=!0,typeof e.FIREBASE_APPCHECK_DEBUG_TOKEN!="string"&&e.FIREBASE_APPCHECK_DEBUG_TOKEN!==!0)return;n.enabled=!0;const s=new de;n.token=s,typeof e.FIREBASE_APPCHECK_DEBUG_TOKEN=="string"?s.resolve(e.FIREBASE_APPCHECK_DEBUG_TOKEN):s.resolve(co(t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uo={error:"UNKNOWN_ERROR"};function ho(t){return at.encodeString(JSON.stringify(t),!1)}async function nt(t,e=!1,n=!1){const s=t.app;pt(s);const r=b(s);let o=r.token,i;if(o&&!q(o)&&(r.token=void 0,o=void 0),!o){const l=await r.cachedTokenPromise;l&&(q(l)?o=l:await xe(s,void 0))}if(!e&&o&&q(o))return{token:o.token};let a=!1;if(mt())try{const l=await Et();r.exchangeTokenPromise||(r.exchangeTokenPromise=gt(In(s,l),t.heartbeatServiceProvider).finally(()=>{r.exchangeTokenPromise=void 0}),a=!0);const h=await r.exchangeTokenPromise;return await xe(s,h),r.token=h,{token:h.token}}catch(l){return l.code==="appCheck/throttled"||l.code==="appCheck/initial-throttle"?M.warn(l.message):n&&M.error(l),$e(l)}try{r.exchangeTokenPromise||(r.exchangeTokenPromise=r.provider.getToken().finally(()=>{r.exchangeTokenPromise=void 0}),a=!0),o=await b(s).exchangeTokenPromise}catch(l){l.code==="appCheck/throttled"||l.code==="appCheck/initial-throttle"?M.warn(l.message):n&&M.error(l),i=l}let c;return o?i?q(o)?c={token:o.token,internalError:i}:c=$e(i):(c={token:o.token},r.token=o,await xe(s,o)):c=$e(i),a&&Pn(s,c),c}async function fo(t){const e=t.app;pt(e);const{provider:n}=b(e);if(mt()){const s=await Et(),r=In(e,s);r.body.limited_use=!0;const{token:o}=await gt(r,t.heartbeatServiceProvider);return{token:o}}else{const{token:s}=await n.getToken(!0);return{token:s}}}function Dn(t,e,n,s){const{app:r}=t,o=b(r),i={next:n,error:s,type:e};if(o.tokenObservers=[...o.tokenObservers,i],o.token&&q(o.token)){const a=o.token;Promise.resolve().then(()=>{n({token:a.token}),jt(t)}).catch(()=>{})}o.cachedTokenPromise.then(()=>jt(t))}function Nn(t,e){const n=b(t),s=n.tokenObservers.filter(r=>r.next!==e);s.length===0&&n.tokenRefresher&&n.tokenRefresher.isRunning()&&n.tokenRefresher.stop(),n.tokenObservers=s}function jt(t){const{app:e}=t,n=b(e);let s=n.tokenRefresher;s||(s=po(t),n.tokenRefresher=s),!s.isRunning()&&n.isTokenAutoRefreshEnabled&&s.start()}function po(t){const{app:e}=t;return new Xr(async()=>{const n=b(e);let s;if(n.token?s=await nt(t,!0):s=await nt(t),s.error)throw s.error;if(s.internalError)throw s.internalError},()=>!0,()=>{const n=b(e);if(n.token){let s=n.token.issuedAtTimeMillis+(n.token.expireTimeMillis-n.token.issuedAtTimeMillis)*.5+3e5;const r=n.token.expireTimeMillis-5*60*1e3;return s=Math.min(s,r),Math.max(0,s-Date.now())}else return 0},Gt.RETRIAL_MIN_WAIT,Gt.RETRIAL_MAX_WAIT)}function Pn(t,e){const n=b(t).tokenObservers;for(const s of n)try{s.type==="EXTERNAL"&&e.error!=null?s.error(e.error):s.next(e)}catch{}}function q(t){return t.expireTimeMillis-Date.now()>0}function $e(t){return{token:ho(uo),error:t}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class go{constructor(e,n){this.app=e,this.heartbeatServiceProvider=n}_delete(){const{tokenObservers:e}=b(this.app);for(const n of e)Nn(this.app,n.next);return Promise.resolve()}}function mo(t,e){return new go(t,e)}function Eo(t){return{getToken:e=>nt(t,e),getLimitedUseToken:()=>fo(t),addTokenListener:e=>Dn(t,"INTERNAL",e),removeTokenListener:e=>Nn(t.app,e)}}const bo="@firebase/app-check",yo="0.13.2",wo="https://www.google.com/recaptcha/enterprise.js";function _o(t,e){const n=new de,s=b(t);s.reCAPTCHAState={initialized:n};const r=So(t),o=Vt(!0);return o?Kt(t,e,o,r,n):Io(()=>{const i=Vt(!0);if(!i)throw new Error("no recaptcha");Kt(t,e,i,r,n)}),n.promise}function Kt(t,e,n,s,r){n.ready(()=>{Ao(t,e,n,s),r.resolve(n)})}function So(t){const e=`fire_app_check_${t.name}`,n=document.createElement("div");return n.id=e,n.style.display="none",document.body.appendChild(n),e}async function To(t){pt(t);const n=await b(t).reCAPTCHAState.initialized.promise;return new Promise((s,r)=>{const o=b(t).reCAPTCHAState;n.ready(()=>{s(n.execute(o.widgetId,{action:"fire_app_check"}))})})}function Ao(t,e,n,s){const r=n.render(s,{sitekey:e,size:"invisible",callback:()=>{b(t).reCAPTCHAState.succeeded=!0},"error-callback":()=>{b(t).reCAPTCHAState.succeeded=!1}}),o=b(t);o.reCAPTCHAState={...o.reCAPTCHAState,widgetId:r}}function Io(t){const e=document.createElement("script");Vr(e,wo+"?render=explicit"),e.onload=t,document.head.appendChild(e)}class bt{constructor(e){this._siteKey=e,this._throttleData=null}async getToken(e=!1){vo(this._throttleData);const n=await To(this._app).catch(r=>{throw _.create("recaptcha-error")});if(!b(this._app).reCAPTCHAState?.succeeded)throw _.create("recaptcha-error");let s;try{const r=eo(this._app,n);e&&(r.body.limited_use=!0),s=await gt(r,this._heartbeatServiceProvider)}catch(r){throw r.code?.includes("fetch-status-error")?(this._throttleData=Co(Number(r.customData?.httpStatus),this._throttleData),_.create("initial-throttle",{time:An(this._throttleData.allowRequestsAfter-Date.now()),httpStatus:this._throttleData.httpStatus})):r}return this._throttleData=null,s}initialize(e){this._app=e,this._heartbeatServiceProvider=ft(e,"heartbeat"),_o(e,this._siteKey).catch(()=>{})}isEqual(e){return e instanceof bt?this._siteKey===e._siteKey:!1}}class yt{constructor(e){this._customProviderOptions=e}async getToken(){const e=await this._customProviderOptions.getToken(),n=Cs(e.token),s=n!==null&&n<Date.now()&&n>0?n*1e3:Date.now();return{...e,issuedAtTimeMillis:s}}initialize(e){this._app=e}isEqual(e){return e instanceof yt?this._customProviderOptions.getToken.toString()===e._customProviderOptions.getToken.toString():!1}}function Co(t,e){if(t===404||t===403)return{backoffCount:1,allowRequestsAfter:Date.now()+Jr,httpStatus:t};{const n=e?e.backoffCount:0,s=Ds(n,1e3,2);return{backoffCount:n+1,allowRequestsAfter:Date.now()+s,httpStatus:t}}}function vo(t){if(t&&Date.now()-t.allowRequestsAfter<=0)throw _.create("throttled",{time:An(t.allowRequestsAfter-Date.now()),httpStatus:t.httpStatus})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Oo(t=En(),e){t=fn(t);const n=ft(t,"app-check");if(Oe().initialized||lo(t),mt()&&Et().then(r=>{console.log(`Firebase App Check debug token: ${r}`)}),n.isInitialized()){const r=n.getImmediate(),o=n.getOptions();if(o&&!!o.isTokenAutoRefreshEnabled==!!e.isTokenAutoRefreshEnabled&&o.provider?.isEqual(e.provider))return r;throw _.create("already-initialized",{appName:t.name})}const s=n.initialize({options:e});return Ro(t,e.provider,e.isTokenAutoRefreshEnabled),b(t).isTokenAutoRefreshEnabled&&Dn(s,"INTERNAL",()=>{}),s}function Ro(t,e,n=!1){const s=Wr(t,{...Sn});s.activated=!0,s.provider=e,s.cachedTokenPromise=ao(t).then(r=>(r&&q(r)&&(s.token=r,Pn(t,{token:r.token})),r)),s.isTokenAutoRefreshEnabled=n&&t.automaticDataCollectionEnabled,!t.automaticDataCollectionEnabled&&n&&M.warn("`isTokenAutoRefreshEnabled` is true but `automaticDataCollectionEnabled` was set to false during `initializeApp()`. This blocks automatic token refresh."),s.provider.initialize(t)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ko="app-check",zt="app-check-internal";function Do(){X(new j(ko,t=>{const e=t.getProvider("app").getImmediate(),n=t.getProvider("heartbeat");return mo(e,n)},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((t,e,n)=>{t.getProvider(zt).initialize()})),X(new j(zt,t=>{const e=t.getProvider("app-check").getImmediate();return Eo(e)},"PUBLIC").setInstantiationMode("EXPLICIT")),V(bo,yo)}Do();var Wt="@firebase/ai",st="3.1.0";/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Z="AI",No="global",Po="firebasevertexai.googleapis.com",Ie="v1beta",qt=st,Mo="gl-js",Lo="hybrid",xo=180*1e3,$o="gemini-3.5-flash-lite";/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class u extends Q{constructor(e,n,s){const r=Z,o=`${r}/${e}`,i=`${r}: ${n} (${o})`;super(e,i),this.code=e,this.customErrorData=s,Error.captureStackTrace&&Error.captureStackTrace(this,u),Object.setPrototypeOf(this,u.prototype),this.toString=()=>i}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yt=["user","model","function","system"],Mn={HARM_SEVERITY_UNSUPPORTED:"HARM_SEVERITY_UNSUPPORTED"},y={SAFETY:"SAFETY",RECITATION:"RECITATION",BLOCKLIST:"BLOCKLIST",PROHIBITED_CONTENT:"PROHIBITED_CONTENT",SPII:"SPII",MALFORMED_FUNCTION_CALL:"MALFORMED_FUNCTION_CALL",IMAGE_SAFETY:"IMAGE_SAFETY",IMAGE_PROHIBITED_CONTENT:"IMAGE_PROHIBITED_CONTENT",IMAGE_OTHER:"IMAGE_OTHER",NO_IMAGE:"NO_IMAGE",IMAGE_RECITATION:"IMAGE_RECITATION",LANGUAGE:"LANGUAGE",UNEXPECTED_TOOL_CALL:"UNEXPECTED_TOOL_CALL",TOO_MANY_TOOL_CALLS:"TOO_MANY_TOOL_CALLS",MISSING_THOUGHT_SIGNATURE:"MISSING_THOUGHT_SIGNATURE",MALFORMED_RESPONSE:"MALFORMED_RESPONSE"},S={PREFER_ON_DEVICE:"prefer_on_device",ONLY_ON_DEVICE:"only_on_device",ONLY_IN_CLOUD:"only_in_cloud",PREFER_IN_CLOUD:"prefer_in_cloud"},P={ON_DEVICE:"on_device",IN_CLOUD:"in_cloud"};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const d={ERROR:"error",REQUEST_ERROR:"request-error",RESPONSE_ERROR:"response-error",FETCH_ERROR:"fetch-error",SESSION_CLOSED:"session-closed",INVALID_CONTENT:"invalid-content",API_NOT_ENABLED:"api-not-enabled",ALREADY_INITIALIZED:"already-initialized",INVALID_SCHEMA:"invalid-schema",NO_API_KEY:"no-api-key",NO_APP_ID:"no-app-id",NO_MODEL:"no-model",NO_PROJECT_ID:"no-project-id",PARSE_FAILED:"parse-failed",UNSUPPORTED:"unsupported"};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const z={STRING:"string",NUMBER:"number",INTEGER:"integer",BOOLEAN:"boolean",ARRAY:"array",OBJECT:"object"};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const N={AGENT_PLATFORM:"AGENT_PLATFORM",GOOGLE_AI:"GOOGLE_AI"};/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ln{constructor(e){this.backendType=e}}class Re extends Ln{constructor(){super(N.GOOGLE_AI)}_getModelPath(e,n){return`/${Ie}/projects/${e}/${n}`}_getTemplatePath(e,n){return`/${Ie}/projects/${e}/templates/${n}`}}class xn extends Ln{constructor(e){super(N.AGENT_PLATFORM),this.location=No,e&&(this.location=e)}_getModelPath(e,n){return`/${Ie}/projects/${e}/locations/${this.location}/${n}`}_getTemplatePath(e,n){return`/${Ie}/projects/${e}/locations/${this.location}/templates/${n}`}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bo(t){if(t instanceof Re)return`${Z}/googleai`;if(t instanceof xn)return`${Z}/agentplatform/${t.location}`;throw new u(d.ERROR,`Invalid backend: ${JSON.stringify(t.backendType)}`)}function Fo(t){const e=t.split("/");if(e[0]!==Z)throw new u(d.ERROR,`Invalid instance identifier, unknown prefix '${e[0]}'`);switch(e[1]){case"agentplatform":const s=e[2];if(!s)throw new u(d.ERROR,`Invalid instance identifier, unknown location '${t}'`);return new xn(s);case"googleai":return new Re;default:throw new u(d.ERROR,`Invalid instance identifier string: '${t}'`)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const E=new ut("@firebase/ai");var k;(function(t){t.UNAVAILABLE="unavailable",t.DOWNLOADABLE="downloadable",t.DOWNLOADING="downloading",t.AVAILABLE="available"})(k||(k={}));/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $n={type:"text",languages:["en"]},Be=[$n,{type:"image"}],Fe=[$n];class C{constructor(e,n,s){this.languageModelProvider=e,this.mode=n,this.downloadPromise=null,this.onDeviceParams={createOptions:{expectedInputs:Be,expectedOutputs:Fe}},s&&(this.onDeviceParams=s,this.onDeviceParams.createOptions?(this.onDeviceParams.createOptions.expectedInputs||(this.onDeviceParams.createOptions.expectedInputs=Be),this.onDeviceParams.createOptions.expectedOutputs||(this.onDeviceParams.createOptions.expectedOutputs=Fe)):this.onDeviceParams.createOptions={expectedInputs:Be,expectedOutputs:Fe})}async isAvailable(e){if(!this.mode)return E.debug("On-device inference unavailable because mode is undefined."),!1;if(this.mode===S.ONLY_IN_CLOUD)return E.debug('On-device inference unavailable because mode is "only_in_cloud".'),!1;const n=await this.languageModelProvider?.availability(this.onDeviceParams.createOptions);if(this.mode===S.ONLY_ON_DEVICE){if(n===k.UNAVAILABLE)throw new u(d.API_NOT_ENABLED,"Local LanguageModel API not available in this environment.");if(n===k.DOWNLOADABLE||n===k.DOWNLOADING){E.debug("Waiting for download of LanguageModel to complete.");try{await this.downloadPromise}catch(s){throw new u(d.ERROR,s.message)}return!0}return!0}return n!==k.AVAILABLE?(E.debug(`On-device inference unavailable because availability is "${n}".`),!1):C.isOnDeviceRequest(e)?!0:(E.debug("On-device inference unavailable because request is incompatible."),!1)}async generateContent(e){const n=await this.createSession(),s=await Promise.all(e.contents.map(C.toLanguageModelMessage)),r=await n.prompt(s,this.onDeviceParams.promptOptions);return C.toResponse(r)}async generateContentStream(e){const n=await this.createSession(),s=await Promise.all(e.contents.map(C.toLanguageModelMessage)),r=n.promptStreaming(s,this.onDeviceParams.promptOptions);return C.toStreamResponse(r)}async countTokens(e){throw new u(d.REQUEST_ERROR,"Count Tokens is not yet available for on-device model.")}static isOnDeviceRequest(e){if(e.contents.length===0)return E.debug("Empty prompt rejected for on-device inference."),!1;for(const n of e.contents){if(n.parts.some(s=>"functionResponse"in s))return E.debug("Content with a function response part rejected for on-device inference."),!1;for(const s of n.parts)if("inlineData"in s&&s.inlineData&&C.SUPPORTED_MIME_TYPES.indexOf(s.inlineData.mimeType)===-1)return E.debug(`Unsupported mime type "${s.inlineData.mimeType}" rejected for on-device inference.`),!1}return!0}async downloadIfAvailable(e){const n=await this.languageModelProvider?.availability(this.onDeviceParams.createOptions);return(n===k.DOWNLOADABLE||n===k.DOWNLOADING)&&this.download(e),n}download(e){if(this.downloadPromise)return;const n={...this.onDeviceParams.createOptions};n&&!n.monitor&&e&&(n.monitor=s=>{s.addEventListener("downloadprogress",r=>{e(r.loaded)})}),this.downloadPromise=this.languageModelProvider?.create(n).finally(()=>{this.downloadPromise=null})}static async toLanguageModelMessage(e){const n=await Promise.all(e.parts.map(C.toLanguageModelMessageContent));return{role:C.toLanguageModelMessageRole(e.role),content:n}}static async toLanguageModelMessageContent(e){if("text"in e&&typeof e.text=="string")return{type:"text",value:e.text};if("inlineData"in e&&e.inlineData){const s=await(await fetch(`data:${e.inlineData.mimeType};base64,${e.inlineData.data}`)).blob();return{type:"image",value:await createImageBitmap(s)}}throw new u(d.REQUEST_ERROR,"Processing of this Part type is not currently supported.")}static toLanguageModelMessageRole(e){return e==="model"?"assistant":"user"}async createSession(){if(!this.languageModelProvider)throw new u(d.UNSUPPORTED,"Chrome AI requested for unsupported browser version.");const e=await this.languageModelProvider.create(this.onDeviceParams.createOptions);return this.oldSession&&this.oldSession.destroy(),this.oldSession=e,e}static toResponse(e){return{json:async()=>({candidates:[{content:{parts:[{text:e}]}}]})}}static toStreamResponse(e){const n=new TextEncoder;return{body:e.pipeThrough(new TransformStream({transform(s,r){const o=JSON.stringify({candidates:[{content:{role:"model",parts:[{text:s}]}}]});r.enqueue(n.encode(`data: ${o}

`))}}))}}}C.SUPPORTED_MIME_TYPES=["image/jpeg","image/png"];function Uo(t,e,n){const r=(e||ct()).LanguageModel;if(r&&t)return new C(r,t,n)}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ho{constructor(e,n,s,r,o){this.app=e,this.backend=n,this.chromeAdapterFactory=o;const i=r?.getImmediate({optional:!0}),a=s?.getImmediate({optional:!0});this.auth=a||null,this.appCheck=i||null}_delete(){return Promise.resolve()}set options(e){this._options=e}get options(){return this._options}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Go(t,{instanceIdentifier:e}){if(!e)throw new u(d.ERROR,"AIService instance identifier is undefined.");const n=Fo(e),s=t.getProvider("app").getImmediate(),r=t.getProvider("auth-internal"),o=t.getProvider("app-check-internal");return new Ho(s,n,r,o,Uo)}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vo(t){if(t.app?.options?.apiKey)if(t.app?.options?.projectId){if(!t.app?.options?.appId)throw new u(d.NO_APP_ID,'The "appId" field is empty in the local Firebase config. Firebase AI requires this field to contain a valid app ID.')}else throw new u(d.NO_PROJECT_ID,'The "projectId" field is empty in the local Firebase config. Firebase AI requires this field to contain a valid project ID.');else throw new u(d.NO_API_KEY,'The "apiKey" field is empty in the local Firebase config. Firebase AI requires this field to contain a valid API key.');const e={apiKey:t.app.options.apiKey,project:t.app.options.projectId,appId:t.app.options.appId,automaticDataCollectionEnabled:t.app.automaticDataCollectionEnabled,backend:t.backend};if(Or(t.app)&&t.app.settings.appCheckToken){const n=t.app.settings.appCheckToken;e.getAppCheckToken=()=>Promise.resolve({token:n})}else t.appCheck&&(t.options?.useLimitedUseAppCheckTokens?e.getAppCheckToken=()=>t.appCheck.getLimitedUseToken():e.getAppCheckToken=()=>t.appCheck.getToken());return t.auth&&(e.getAuthToken=()=>t.auth.getToken()),e}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class le{constructor(e,n){this._apiSettings=Vo(e),this.model=le.normalizeModelName(n,this._apiSettings.backend.backendType)}static normalizeModelName(e,n){return n===N.GOOGLE_AI?le.normalizeGoogleAIModelName(e):le.normalizeVertexAIModelName(e)}static normalizeGoogleAIModelName(e){return`models/${e}`}static normalizeVertexAIModelName(e){let n;return e.includes("/")?e.startsWith("models/")?n=`publishers/google/${e}`:n=e:n=`publishers/google/models/${e}`,n}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jo="Timeout has expired.",Ue="AbortError";class Ko{constructor(e){this.params=e}toString(){const e=new URL(this.baseUrl);return e.pathname=this.pathname,e.search=this.queryParams.toString(),e.toString()}get pathname(){return this.params.templateId?`${this.params.apiSettings.backend._getTemplatePath(this.params.apiSettings.project,this.params.templateId)}:${this.params.task}`:`${this.params.apiSettings.backend._getModelPath(this.params.apiSettings.project,this.params.model)}:${this.params.task}`}get baseUrl(){return this.params.singleRequestOptions?.baseUrl??`https://${Po}`}get queryParams(){const e=new URLSearchParams;return this.params.stream&&e.set("alt","sse"),e}}function zo(t){const e=[];return e.push(`${Mo}/${qt}`),e.push(`fire/${qt}`),(t.params.apiSettings.inferenceMode===S.PREFER_ON_DEVICE||t.params.apiSettings.inferenceMode===S.PREFER_IN_CLOUD)&&e.push(Lo),e.join(" ")}async function Wo(t){const e=new Headers;if(e.append("Content-Type","application/json"),e.append("x-goog-api-client",zo(t)),e.append("x-goog-api-key",t.params.apiSettings.apiKey),t.params.apiSettings.automaticDataCollectionEnabled&&e.append("X-Firebase-Appid",t.params.apiSettings.appId),t.params.apiSettings.getAppCheckToken){const n=await t.params.apiSettings.getAppCheckToken();n&&(e.append("X-Firebase-AppCheck",n.token),n.error&&E.warn(`Unable to obtain a valid App Check token: ${n.error.message}`))}if(t.params.apiSettings.getAuthToken){const n=await t.params.apiSettings.getAuthToken();n&&e.append("Authorization",`Firebase ${n.accessToken}`)}return e}async function wt(t,e){const n=new Ko(t);let s;const r=t.singleRequestOptions?.signal,o=t.singleRequestOptions?.timeout!=null&&t.singleRequestOptions.timeout>=0?t.singleRequestOptions.timeout:xo,i=new AbortController,a=setTimeout(()=>{i.abort(new DOMException(jo,Ue)),E.debug(`Aborting request to ${n} due to timeout (${o}ms)`)},o),c=AbortSignal.any(r?[r,i.signal]:[i.signal]);if(r&&r.aborted)throw clearTimeout(a),new DOMException(r.reason??"Aborted externally before fetch",Ue);try{const l={method:"POST",headers:await Wo(n),signal:c,body:e};if(s=await fetch(n.toString(),l),!s.ok){let h="",f;try{const p=await s.json();h=p.error.message,p.error.details&&(h+=` ${JSON.stringify(p.error.details)}`,f=p.error.details)}catch{}throw s.status===403&&f&&f.some(p=>p.reason==="SERVICE_DISABLED")&&f.some(p=>p.links?.[0]?.description.includes("Google developers console API activation"))?new u(d.API_NOT_ENABLED,`The Firebase AI SDK requires the Firebase AI API ('firebasevertexai.googleapis.com') to be enabled in your Firebase project. Enable this API by visiting the Firebase Console at https://console.firebase.google.com/project/${n.params.apiSettings.project}/ailogic/ and clicking "Get started". If you enabled this API recently, wait a few minutes for the action to propagate to our systems and then retry.`,{status:s.status,statusText:s.statusText,errorDetails:f}):new u(d.FETCH_ERROR,`Error fetching from ${n}: [${s.status} ${s.statusText}] ${h}`,{status:s.status,statusText:s.statusText,errorDetails:f})}}catch(l){let h=l;throw l.code!==d.FETCH_ERROR&&l.code!==d.API_NOT_ENABLED&&l instanceof Error&&l.name!==Ue&&(h=new u(d.ERROR,`Error fetching from ${n.toString()}: ${l.message}`),h.stack=l.stack),h}finally{clearTimeout(a)}return s}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function be(t){if(t.candidates&&t.candidates.length>0){if(t.candidates.length>1&&E.warn(`This response had ${t.candidates.length} candidates. Returning text from the first candidate only. Access response.candidates directly to use the other candidates.`),Fn(t.candidates[0]))throw new u(d.RESPONSE_ERROR,`Response error: ${H(t)}. Response body stored in error.response`,{response:t});return!0}else return!1}function O(t){return"type"in t&&t.type?t:t.text!==void 0?{...t,type:"text"}:t.inlineData!==void 0?{...t,type:"inlineData"}:t.functionCall!==void 0?{...t,type:"functionCall"}:t.functionResponse!==void 0?{...t,type:"functionResponse"}:t.fileData!==void 0?{...t,type:"fileData"}:t.executableCode!==void 0?{...t,type:"executableCode"}:t.codeExecutionResult!==void 0?{...t,type:"codeExecutionResult"}:t}function Ce(t,e=P.IN_CLOUD){if(t.candidates?.[0]&&!t.candidates[0].hasOwnProperty("index")&&(t.candidates[0].index=0),t.candidates)for(const s of t.candidates)s.content?.parts&&(s.content.parts=s.content.parts.map(O));const n=qo(t);return n.inferenceSource=e,n}function qo(t){return t.text=()=>{if(be(t))return Jt(t,e=>!("thought"in e&&e.thought));if(t.promptFeedback)throw new u(d.RESPONSE_ERROR,`Text not available. ${H(t)}`,{response:t});return""},t.thoughtSummary=()=>{if(be(t)){const e=Jt(t,n=>!!("thought"in n&&n.thought));return e===""?void 0:e}else if(t.promptFeedback)throw new u(d.RESPONSE_ERROR,`Thought summary not available. ${H(t)}`,{response:t})},t.inlineDataParts=()=>{if(be(t))return Yo(t);if(t.promptFeedback)throw new u(d.RESPONSE_ERROR,`Data not available. ${H(t)}`,{response:t})},t.functionCalls=()=>{if(be(t))return Bn(t);if(t.promptFeedback)throw new u(d.RESPONSE_ERROR,`Function call not available. ${H(t)}`,{response:t})},t}function Jt(t,e){const n=[];if(t.candidates?.[0].content?.parts)for(const s of t.candidates?.[0].content?.parts){const r=O(s);r.type==="text"&&e(r)&&n.push(r.text)}return n.length>0?n.join(""):""}function Bn(t){if(!t)return;const e=[];if(t.candidates?.[0].content?.parts)for(const n of t.candidates?.[0].content?.parts){const s=O(n);s.type==="functionCall"&&e.push(s.functionCall)}if(e.length>0)return e}function Yo(t){const e=[];if(t.candidates?.[0].content?.parts)for(const n of t.candidates?.[0].content?.parts){const s=O(n);s.type==="inlineData"&&e.push(s)}if(e.length>0)return e}const Jo=[y.RECITATION,y.SAFETY,y.BLOCKLIST,y.PROHIBITED_CONTENT,y.SPII,y.MALFORMED_FUNCTION_CALL,y.IMAGE_SAFETY,y.IMAGE_PROHIBITED_CONTENT,y.IMAGE_OTHER,y.NO_IMAGE,y.IMAGE_RECITATION,y.LANGUAGE,y.UNEXPECTED_TOOL_CALL,y.TOO_MANY_TOOL_CALLS,y.MISSING_THOUGHT_SIGNATURE,y.MALFORMED_RESPONSE];function Fn(t){return!!t.finishReason&&Jo.some(e=>e===t.finishReason)}function H(t){let e="";if((!t.candidates||t.candidates.length===0)&&t.promptFeedback)e+="Response was blocked",t.promptFeedback?.blockReason&&(e+=` due to ${t.promptFeedback.blockReason}`),t.promptFeedback?.blockReasonMessage&&(e+=`: ${t.promptFeedback.blockReasonMessage}`);else if(t.candidates?.[0]){const n=t.candidates[0];Fn(n)&&(e+=`Candidate was blocked due to ${n.finishReason}`,n.finishMessage&&(e+=`: ${n.finishMessage}`))}return e}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _t(t){if(t!=null){if(typeof t=="string")return{role:"system",parts:[{type:"text",text:t}]};if(t.type==="text"||"text"in t&&typeof t.text=="string")return{role:"system",parts:[G(O(t))]};if(t.parts){const e=t.parts.map(n=>G(O(n)));return t.role?{...t,parts:e}:{role:"system",parts:e}}}}function ie(t){let e=[];if(typeof t=="string")e=[{type:"text",text:t}];else for(const n of t)typeof n=="string"?e.push({type:"text",text:n}):e.push(G(O(n)));return Xo(e)}function Xo(t){const e={role:"user",parts:[]};let n=!1,s=!1;for(const r of t)r.type==="functionResponse"||"functionResponse"in r?s=!0:n=!0,e.parts.push(r);if(n&&s)throw new u(d.INVALID_CONTENT,"Within a single message, FunctionResponse cannot be mixed with other type of Part in the request for sending chat message.");if(!n&&!s)throw new u(d.INVALID_CONTENT,"No Content is provided for sending chat message.");return e}function He(t){let e;if(t.contents){const n=t;e={...n,contents:n.contents.map(s=>({...s,parts:s.parts?s.parts.map(O):[]}))}}else e={contents:[ie(t)]};return t.systemInstruction&&(e.systemInstruction=_t(t.systemInstruction)),e}function Zo(t){return t.parts&&Array.isArray(t.parts)?{...t,parts:t.parts.map(St)}:t}function St(t){let e;if("type"in t){const{type:n,...s}=t;e=s}else e=t;return e.functionResponse&&(e={...e,functionResponse:Zo(e.functionResponse)}),e}function Tt(t){return t.parts?{...t,parts:t.parts.map(St)}:t}function Un(t){return t==null||typeof t=="string"?t:"parts"in t&&Array.isArray(t.parts)?Tt(t):St(t)}function Hn(t){const e={...t};return e.contents&&(e.contents=e.contents.map(Tt)),e.systemInstruction&&(e.systemInstruction=Un(e.systemInstruction)),e}function Qo(t){const e={...t};return e.contents&&(e.contents=e.contents.map(Tt)),e.systemInstruction&&(e.systemInstruction=Un(e.systemInstruction)),e}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gn(t){if(t.safetySettings?.forEach(e=>{if(e.method)throw new u(d.UNSUPPORTED,"SafetySetting.method is not supported in the the Gemini Developer API. Please remove this property.")}),t.generationConfig?.topK){const e=Math.round(t.generationConfig.topK);e!==t.generationConfig.topK&&(E.warn("topK in GenerationConfig has been rounded to the nearest integer to match the format for requests to the Gemini Developer API."),t.generationConfig.topK=e)}return t}function At(t){return{candidates:t.candidates?ti(t.candidates):void 0,promptFeedback:t.promptFeedback?ni(t.promptFeedback):void 0,usageMetadata:t.usageMetadata}}function ei(t,e){return{generateContentRequest:{model:e,...t}}}function ti(t){const e=[];let n;return e&&t.forEach(s=>{let r;if(s.citationMetadata&&(r={citations:s.citationMetadata.citationSources}),s.safetyRatings&&(n=s.safetyRatings.map(i=>({...i,severity:i.severity??Mn.HARM_SEVERITY_UNSUPPORTED,probabilityScore:i.probabilityScore??0,severityScore:i.severityScore??0}))),s.content?.parts?.some(i=>"videoMetadata"in i&&i.videoMetadata))throw new u(d.UNSUPPORTED,"Part.videoMetadata is not supported in the Gemini Developer API. Please remove this property.");const o={index:s.index,content:s.content,finishReason:s.finishReason,finishMessage:s.finishMessage,safetyRatings:n,citationMetadata:r,groundingMetadata:s.groundingMetadata,urlContextMetadata:s.urlContextMetadata};e.push(o)}),e}function ni(t){const e=[];return(t.safetyRatings??[]).forEach(s=>{e.push({category:s.category,probability:s.probability,severity:s.severity??Mn.HARM_SEVERITY_UNSUPPORTED,probabilityScore:s.probabilityScore??0,severityScore:s.severityScore??0,blocked:s.blocked})}),{blockReason:t.blockReason,safetyRatings:e,blockReasonMessage:t.blockReasonMessage}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xt=/^data\: (.*)(?:\n\n|\r\r|\r\n\r\n)/;async function si(t,e,n){const s=t.body.pipeThrough(new TextDecoderStream("utf8",{fatal:!0})),r=ai(s),[o,i]=r.tee(),{response:a,firstValue:c}=await ri(i,e,n);return{stream:ii(o,e,n),response:a,firstValue:c}}async function ri(t,e,n){const[s,r]=t.tee(),o=s.getReader(),{value:i}=await o.read();return{firstValue:i,response:oi(r,e,n)}}async function oi(t,e,n){const s=[],r=t.getReader();for(;;){const{done:o,value:i}=await r.read();if(o){let a=ci(s);return e.backend.backendType===N.GOOGLE_AI&&(a=At(a)),Ce(a,n)}s.push(i)}}async function*ii(t,e,n){const s=t.getReader();for(;;){const{value:r,done:o}=await s.read();if(o)break;let i;e.backend.backendType===N.GOOGLE_AI?i=Ce(At(r),n):i=Ce(r,n);const a=i.candidates?.[0];!a?.content?.parts&&!a?.finishReason&&!a?.citationMetadata&&!a?.urlContextMetadata||(yield i)}}function ai(t){const e=t.getReader();return new ReadableStream({start(s){let r="";return o();function o(){return e.read().then(({value:i,done:a})=>{if(a){if(r.trim()){s.error(new u(d.PARSE_FAILED,"Failed to parse stream"));return}s.close();return}r+=i;let c=r.match(Xt),l;for(;c;){try{l=JSON.parse(c[1])}catch{s.error(new u(d.PARSE_FAILED,`Error parsing JSON response: "${c[1]}`));return}s.enqueue(l),r=r.substring(c[0].length),c=r.match(Xt)}return o()})}}})}function ci(t){const n={promptFeedback:t[t.length-1]?.promptFeedback};for(const s of t)if(s.candidates)for(const r of s.candidates){const o=r.index||0;n.candidates||(n.candidates=[]),n.candidates[o]||(n.candidates[o]={index:r.index}),n.candidates[o].citationMetadata=r.citationMetadata,n.candidates[o].finishReason=r.finishReason,n.candidates[o].finishMessage=r.finishMessage,n.candidates[o].safetyRatings=r.safetyRatings,n.candidates[o].groundingMetadata=r.groundingMetadata;const i=r.urlContextMetadata;if(typeof i=="object"&&i!==null&&Object.keys(i).length>0&&(n.candidates[o].urlContextMetadata=i),r.content){if(!r.content.parts)continue;n.candidates[o].content||(n.candidates[o].content={role:r.content.role||"user",parts:[]});for(const a of r.content.parts){if("text"in a&&a.text==="")continue;if(Object.keys(a).length===0)throw new u(d.INVALID_CONTENT,"Part should have at least one property, but there are none. This is likely caused by a malformed response from the backend.");const c=O({...a});Object.keys(c).length>0&&n.candidates[o].content.parts.push(c)}}}return n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const li=[d.FETCH_ERROR,d.ERROR,d.API_NOT_ENABLED];async function Vn(t,e,n,s){if(!e)return{response:await s(),inferenceSource:P.IN_CLOUD};switch(e.mode){case S.ONLY_ON_DEVICE:if(await e.isAvailable(t))return{response:await n(),inferenceSource:P.ON_DEVICE};throw new u(d.UNSUPPORTED,"Inference mode is ONLY_ON_DEVICE, but an on-device model is not available.");case S.ONLY_IN_CLOUD:return{response:await s(),inferenceSource:P.IN_CLOUD};case S.PREFER_IN_CLOUD:try{return{response:await s(),inferenceSource:P.IN_CLOUD}}catch(r){if(r instanceof u&&li.includes(r.code)&&await e.isAvailable(t))return{response:await n(),inferenceSource:P.ON_DEVICE};throw r}case S.PREFER_ON_DEVICE:return await e.isAvailable(t)?{response:await n(),inferenceSource:P.ON_DEVICE}:{response:await s(),inferenceSource:P.IN_CLOUD};default:throw new u(d.ERROR,`Unexpected infererence mode: ${e.mode}`)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function di(t,e,n,s){return n=Hn(n),t.backend.backendType===N.GOOGLE_AI&&(n=Gn(n)),wt({task:"streamGenerateContent",model:e,apiSettings:t,stream:!0,singleRequestOptions:s},JSON.stringify(n))}async function jn(t,e,n,s,r){const o=await Vn(n,s,()=>s.generateContentStream(n),()=>di(t,e,n,r));return si(o.response,t,o.inferenceSource)}async function ui(t,e,n,s){return n=Hn(n),t.backend.backendType===N.GOOGLE_AI&&(n=Gn(n)),wt({model:e,task:"generateContent",apiSettings:t,stream:!1,singleRequestOptions:s},JSON.stringify(n))}async function Kn(t,e,n,s,r){const o=await Vn(n,s,()=>s.generateContent(n),()=>ui(t,e,n,r)),i=await hi(o.response,t);return{response:Ce(i,o.inferenceSource)}}async function hi(t,e){const n=await t.json();return e.backend.backendType===N.GOOGLE_AI?At(n):n}/**
 * @license
 * Copyright 2026 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zt="SILENT_ERROR",Qt=10;class fi{constructor(e,n,s){this.params=n,this.requestOptions=s,this._history=[],this._sendPromise=Promise.resolve(),this._apiSettings=e}async getHistory(){return await this._sendPromise,G(this._history).map(e=>({...e,parts:e.parts?e.parts.map(O):[]}))}async _sendMessage(e,n){let s={};await this._sendPromise;const r=[];return this._sendPromise=this._sendPromise.then(async()=>{let o,i=0;const a=this.requestOptions?.maxSequentialFunctionCalls??Qt;do{let c;if(o){i++;const f=await this._callFunctionsAsNeeded(o);c=ie(f)}else c=ie(e);const l=this._formatRequest(c,[...r]);r.push(c);const h=await this._callGenerateContent(l,n);if(h)if(s=h,o=this._getCallableFunctionCalls(h.response),h.response.candidates&&h.response.candidates.length>0){const f={parts:h.response.candidates?.[0].content.parts||[],role:h.response.candidates?.[0].content.role||"model"};r.push(G(f))}else{const f=H(h.response);f&&E.warn(`sendMessage() was unsuccessful. ${f}. Inspect response object for details.`)}else o=void 0}while(o&&i<a);o&&i>=a&&E.warn(`Automatic function calling exceeded the limit of ${a} function calls. Returning last model response.`)}),await this._sendPromise,this._history=this._history.concat(r),s}async _sendMessageStream(e,n){await this._sendPromise;const s=[],o=(async()=>{let i,a=0;const c=this.requestOptions?.maxSequentialFunctionCalls??Qt;let l;do{let h;if(i){a++;const p=await this._callFunctionsAsNeeded(i);h=ie(p)}else h=ie(e);const f=this._formatRequest(h,[...s]);if(s.push(h),l=await this._callGenerateContentStream(f,n),i=this._getCallableFunctionCalls(l.firstValue),i&&l.firstValue&&l.firstValue.candidates&&l.firstValue.candidates.length>0){const p={...l.firstValue.candidates[0].content};p.role||(p.role="model"),s.push(p)}}while(i&&a<c);return i&&a>=c&&E.warn(`Automatic function calling exceeded the limit of ${c} function calls. Returning last model response.`),{stream:l.stream,response:l.response}})();return this._sendPromise=this._sendPromise.then(async()=>o).catch(i=>{throw new Error(Zt)}).then(i=>i.response).then(i=>{if(i.candidates&&i.candidates.length>0){this._history=this._history.concat(s);const a={...i.candidates[0].content};a.role||(a.role="model"),this._history.push(G(a))}else{const a=H(i);a&&E.warn(`sendMessageStream() was unsuccessful. ${a}. Inspect response object for details.`)}}).catch(i=>{i.message!==Zt&&i.name!=="AbortError"&&E.error(i)}),o}_getCallableFunctionCalls(e){const n=this.params?.tools?.find(r=>r.functionDeclarations);if(!n?.functionDeclarations)return;const s=Bn(e);if(s){for(const r of s)if(!n.functionDeclarations?.some(i=>i.name===r.name&&typeof i.functionReference=="function"))return;return s}}async _callFunctionsAsNeeded(e){const n=[],s=[],r=this.params?.tools?.find(o=>o.functionDeclarations);if(r&&r.functionDeclarations){for(const i of e){const a=r.functionDeclarations.find(c=>c.name===i.name);if(a?.functionReference){const c=Promise.resolve(a.functionReference(i.args)).catch(l=>{const h=new u(d.ERROR,`Error in user-defined function "${a.name}": ${l.message}`);throw h.stack=l.stack,h});n.push({name:i.name,id:i.id,results:c}),s.push(c)}}await Promise.all(s);const o=[];for(const{name:i,id:a,results:c}of n){const l={name:i,response:await c};a&&(l.id=a),o.push({type:"functionResponse",functionResponse:l})}return o}else throw new u(d.REQUEST_ERROR,'No function declarations were provided in "tools".')}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pi=["text","inlineData","functionCall","functionResponse","thought","thoughtSignature"],gi={user:["text","inlineData","functionResponse"],function:["functionResponse"],model:["text","functionCall","thought","thoughtSignature"],system:["text"]},en={user:["model"],function:["model"],model:["user","function"],system:[]};function mi(t){let e=null;for(const n of t){const{role:s,parts:r}=n;if(!e&&s!=="user")throw new u(d.INVALID_CONTENT,`First Content should be with role 'user', got ${s}`);if(!Yt.includes(s))throw new u(d.INVALID_CONTENT,`Each item should include role field. Got ${s} but valid roles are: ${JSON.stringify(Yt)}`);if(!Array.isArray(r))throw new u(d.INVALID_CONTENT,"Content should have 'parts' property with an array of Parts");if(r.length===0)throw new u(d.INVALID_CONTENT,"Each Content should have at least one part");const o={text:0,inlineData:0,functionCall:0,functionResponse:0,thought:0,thoughtSignature:0,fileData:0,executableCode:0,codeExecutionResult:0};for(const a of r){if(a.type)o[a.type]+=1;else for(const c of["text","inlineData","functionCall","functionResponse","fileData","executableCode","codeExecutionResult"])c in a&&(o[c]+=1);"thought"in a&&a.thought&&(o.thought+=1),"thoughtSignature"in a&&a.thoughtSignature&&(o.thoughtSignature+=1)}const i=gi[s];for(const a of pi)if(!i.includes(a)&&o[a]>0)throw new u(d.INVALID_CONTENT,`Content with role '${s}' can't contain '${a}' part`);if(e&&!en[s].includes(e.role))throw new u(d.INVALID_CONTENT,`Content with role '${s}' can't follow '${e.role}'. Valid previous roles: ${JSON.stringify(en)}`);e=n}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ei extends fi{constructor(e,n,s,r,o){super(e,r,o),this.model=n,this.chromeAdapter=s,this.params=r,this.requestOptions=o,r?.history&&(mi(r.history),this._history=G(r.history)),this.params?.systemInstruction!=null&&(this.params={...this.params,systemInstruction:_t(this.params.systemInstruction)})}_formatRequest(e,n){return{safetySettings:this.params?.safetySettings,generationConfig:this.params?.generationConfig,tools:this.params?.tools,toolConfig:this.params?.toolConfig,systemInstruction:this.params?.systemInstruction,contents:[...this._history,...n,e]}}_callGenerateContent(e,n){return Kn(this._apiSettings,this.model,e,this.chromeAdapter,{...this.requestOptions,...n})}_callGenerateContentStream(e,n){return jn(this._apiSettings,this.model,e,this.chromeAdapter,{...this.requestOptions,...n})}async sendMessage(e,n){return this._sendMessage(e,n)}async sendMessageStream(e,n){return this._sendMessageStream(e,n)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function bi(t,e,n,s){n=Qo(n);let r="";if(t.backend.backendType===N.GOOGLE_AI){const i=ei(n,e);r=JSON.stringify(i)}else r=JSON.stringify(n);return(await wt({model:e,task:"countTokens",apiSettings:t,stream:!1,singleRequestOptions:s},r)).json()}async function yi(t,e,n,s,r){if(s?.mode===S.ONLY_ON_DEVICE)throw new u(d.UNSUPPORTED,"countTokens() is not supported for on-device models.");return bi(t,e,n,r)}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wi extends le{constructor(e,n,s,r){super(e,n.model),this.chromeAdapter=r,this.generationConfig=n.generationConfig||{},_i(this.generationConfig),this.safetySettings=n.safetySettings||[],this.tools=n.tools,this.toolConfig=n.toolConfig,this.systemInstruction=_t(n.systemInstruction),this.requestOptions=s||{}}async initializeDeviceModel(e){if(!this.chromeAdapter||this.chromeAdapter.mode===S.ONLY_IN_CLOUD)return;if(await this.chromeAdapter.downloadIfAvailable(e)===k.UNAVAILABLE){const s=new u(d.API_NOT_ENABLED,"Local LanguageModel API not available in this environment.");if(this.chromeAdapter.mode===S.ONLY_ON_DEVICE)throw s;E.debug(s.message)}await this.chromeAdapter.downloadPromise}async generateContent(e,n){const s=He(e);return Kn(this._apiSettings,this.model,{generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,...s},this.chromeAdapter,{...this.requestOptions,...n})}async generateContentStream(e,n){const s=He(e),{stream:r,response:o}=await jn(this._apiSettings,this.model,{generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,...s},this.chromeAdapter,{...this.requestOptions,...n});return{stream:r,response:o}}startChat(e){return new Ei(this._apiSettings,this.model,this.chromeAdapter,{tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,generationConfig:this.generationConfig,safetySettings:this.safetySettings,...e},this.requestOptions)}async countTokens(e,n){const s=He(e);return yi(this._apiSettings,this.model,s,this.chromeAdapter,{...this.requestOptions,...n})}}function _i(t){if(t.thinkingConfig?.thinkingBudget!=null&&t.thinkingConfig?.thinkingLevel)throw new u(d.UNSUPPORTED,"Cannot set both thinkingBudget and thinkingLevel in a config.");if(t.responseSchema!=null&&t.responseJsonSchema!=null)throw new u(d.UNSUPPORTED,"Cannot set both responseSchema and responseJsonSchema in a config.");if((t.responseSchema!=null||t.responseJsonSchema!=null)&&t.responseMimeType!=="application/json"&&t.responseMimeType!=="text/x.enum")throw new u(d.UNSUPPORTED,'responseMimeType must be set to "application/json" or "text/x.enum" if responseSchema or responseJsonSchema are set.')}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class w{constructor(e){if(!e.type&&!e.anyOf)throw new u(d.INVALID_SCHEMA,"A schema must have either a 'type' or an 'anyOf' array of sub-schemas.");for(const n in e)this[n]=e[n];this.type=e.type,this.format=e.hasOwnProperty("format")?e.format:void 0,this.nullable=e.hasOwnProperty("nullable")?!!e.nullable:!1}toJSON(){const e={type:this.type};for(const n in this)this.hasOwnProperty(n)&&this[n]!==void 0&&(n!=="required"||this.type===z.OBJECT)&&(e[n]=this[n]);return e}static array(e){return new Ii(e,e.items)}static object(e){return new Ci(e,e.properties,e.optionalProperties)}static string(e){return new tn(e)}static enumString(e){return new tn(e,e.enum)}static integer(e){return new Si(e)}static number(e){return new Ti(e)}static boolean(e){return new Ai(e)}static anyOf(e){return new vi(e)}}class Si extends w{constructor(e){super({type:z.INTEGER,...e})}}class Ti extends w{constructor(e){super({type:z.NUMBER,...e})}}class Ai extends w{constructor(e){super({type:z.BOOLEAN,...e})}}class tn extends w{constructor(e,n){super({type:z.STRING,...e}),this.enum=n}toJSON(){const e=super.toJSON();return this.enum&&(e.enum=this.enum),e}}class Ii extends w{constructor(e,n){super({type:z.ARRAY,...e}),this.items=n}toJSON(){const e=super.toJSON();return e.items=this.items.toJSON(),e}}class Ci extends w{constructor(e,n,s=[]){super({type:z.OBJECT,...e}),this.properties=n,this.optionalProperties=s}toJSON(){const e=super.toJSON();e.properties={...this.properties};const n=[];if(this.optionalProperties){for(const s of this.optionalProperties)if(!this.properties.hasOwnProperty(s))throw new u(d.INVALID_SCHEMA,`Property "${s}" specified in "optionalProperties" does not exist.`)}for(const s in this.properties)this.properties.hasOwnProperty(s)&&(e.properties[s]=this.properties[s].toJSON(),this.optionalProperties.includes(s)||n.push(s));return n.length>0&&(e.required=n),delete e.optionalProperties,e}}class vi extends w{constructor(e){if(e.anyOf.length===0)throw new u(d.INVALID_SCHEMA,"The 'anyOf' array must not be empty.");super({...e,type:void 0}),this.anyOf=e.anyOf}toJSON(){const e=super.toJSON();return this.anyOf&&Array.isArray(this.anyOf)&&(e.anyOf=this.anyOf.map(n=>n.toJSON())),e}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Oi(t=En(),e){t=fn(t);const n=ft(t,Z),s=e?.backend??new Re,r=Bo(s),o=n.getImmediate({identifier:r}),i=o.options;if(i){const a=e?.useLimitedUseAppCheckTokens,c=!!i.useLimitedUseAppCheckTokens;if(a!=null&&!!a!==c)throw new u(d.ALREADY_INITIALIZED,`getAI() has already been called for app "${t.name}" and this backend with useLimitedUseAppCheckTokens: ${c}. This option cannot be changed after the AI instance has been initialized. Pass the desired options to the first getAI() call for this app and backend, or omit useLimitedUseAppCheckTokens to reuse the existing instance.`);return o}return o.options={useLimitedUseAppCheckTokens:e?.useLimitedUseAppCheckTokens??!1},o}const Ri=["mode","onDeviceParams","inCloudParams"];function rt(t,e,n){const s=e;let r;if(s.mode){for(const a of Object.keys(e))Ri.includes(a)||E.warn(`When a hybrid inference mode is specified (mode is currently set to ${s.mode}), "${a}" cannot be configured at the top level. Configuration for in-cloud and on-device must be done separately in inCloudParams and onDeviceParams. Configuration values set outside of inCloudParams and onDeviceParams will be ignored.`);r=s.inCloudParams||{model:$o}}else r=e;if(!r.model)throw new u(d.NO_MODEL,"Must provide a model name. Example: getGenerativeModel({ model: 'my-model-name' })");const o=t.chromeAdapterFactory?.(s.mode,typeof window>"u"?void 0:window,s.onDeviceParams),i=new wi(t,r,n,o);return i._apiSettings.inferenceMode=s.mode,i}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ki(){X(new j(Z,Go,"PUBLIC").setMultipleInstances(!0)),V(Wt,st),V(Wt,st,"esm2020")}ki();let oe,Ge,we="";function Di(){try{const t=new URLSearchParams(location.search).get("appcheck_debug");return t?(localStorage.setItem(ze,t),t):localStorage.getItem(ze)??""}catch{return""}}function Ni(t){try{localStorage.setItem(ze,t.trim())}catch{}}function Pi(){return we}function Mi(){const t=Di();if(t)return t;const e=typeof crypto<"u"&&"randomUUID"in crypto?crypto.randomUUID():`veil-${Math.random().toString(36).slice(2)}-${Date.now().toString(36)}`;return Ni(e),e}function zn(){if(!ce)throw new Error("Firebase is not configured. Copy .env.example to .env.local and fill in the web config of your Firebase project.");if(oe)return oe;oe=mn(je);const t=self;let e;return Ke?e=new bt(Ke):(we=Mi(),t.FIREBASE_APPCHECK_DEBUG_TOKEN=we,e=new yt({getToken:async()=>({token:we,expireTimeMillis:Date.now()+30*6e4})})),Oo(oe,{provider:e,isTokenAutoRefreshEnabled:!0}),oe}function Wn(){const t=zn();return Ge||(Ge=Oi(t,{backend:new Re})),Ge}async function qn(){const t=globalThis.LanguageModel;if(!t?.availability)return"unknown";try{const e=await t.availability();return e==="available"||e==="downloadable"||e==="downloading"||e==="unavailable"?e:"unknown"}catch{return"unknown"}}const Li=w.object({properties:{entities:w.array({items:w.object({properties:{type:w.enumString({enum:["PERSON","ORG","LOCATION","HEALTH","FINANCE","LEGAL","OTHER"]}),value:w.string()}})}),localSufficient:w.boolean(),reason:w.string()}}),xi=`You are the privacy scanner inside Veil, a note app for confidential case work.
The user pastes a note. Text that already looks like [EMAIL_1] or [PHONE_2] has been replaced and must be left alone.
List every remaining span that could identify a real person or expose private information: person names, organisations, exact locations, health conditions, money amounts tied to a person, legal matters, usernames, and any other free-text identifier.
Copy values exactly as written. Never invent text that is not in the note.
Also judge whether the user's request can be answered well by a small on-device model (localSufficient), and give a one-sentence reason.`;function $i(){return rt(Wn(),{mode:S.ONLY_ON_DEVICE,onDeviceParams:{createOptions:{expectedInputs:[{type:"text",languages:["en"]}],expectedOutputs:[{type:"text",languages:["en"]}],initialPrompts:[{role:"system",content:[{type:"text",value:xi}]}]},promptOptions:{responseConstraint:Li}}})}function nn(t,e){return`NOTE
"""
${t}
"""

REQUEST
${e}

Return the JSON object described by the schema.`}function Bi(t){const e=t.indexOf("{"),n=t.lastIndexOf("}");if(e===-1||n===-1)return{entities:[],localSufficient:!1,reason:"Unparsable scan output"};try{const s=JSON.parse(t.slice(e,n+1));return{entities:Array.isArray(s.entities)?s.entities.filter(o=>!!(o&&typeof o.value=="string")).map(o=>({type:String(o.type??"OTHER"),value:o.value})):[],localSufficient:!!s.localSufficient,reason:typeof s.reason=="string"?s.reason:""}}catch{return{entities:[],localSufficient:!1,reason:"Unparsable scan output"}}}const Fi=`You are Veil, a careful assistant for confidential case work.
The text you receive was redacted on the user's device: tokens such as [PERSON_1], [ORG_2] or [HEALTH_3] stand for private values that were removed before sending.
Never guess or invent their real values. Reuse the tokens exactly as written.
Answer the request concretely in English, under 220 words, in short paragraphs or a dash list. Write plain text only: no markdown bold, headings or tables. Do not mention the redaction process unless it changes the answer.`,sn=`You are Veil, running fully on this device.
Answer the request in plain English, at most 140 words, no markdown, no preamble.`;function Ui(t){const e=Wn();return t==="device"?rt(e,{mode:S.ONLY_ON_DEVICE,onDeviceParams:{createOptions:{expectedInputs:[{type:"text",languages:["en"]}],expectedOutputs:[{type:"text",languages:["en"]}],initialPrompts:[{role:"system",content:[{type:"text",value:sn}]}]}}}):rt(e,{mode:S.PREFER_IN_CLOUD,inCloudParams:{model:it,systemInstruction:Fi,generationConfig:{temperature:.45,maxOutputTokens:700}},onDeviceParams:{createOptions:{expectedInputs:[{type:"text",languages:["en"]}],expectedOutputs:[{type:"text",languages:["en"]}],initialPrompts:[{role:"system",content:[{type:"text",value:sn}]}]}}})}function rn(t,e){return`REDACTED NOTE
"""
${t}
"""

REQUEST
${e}`}const Yn=[{type:"EMAIL",re:/\b[\w.+-]+@[\w-]+\.[\w.-]{2,}\b/g},{type:"URL",re:/\bhttps?:\/\/[^\s<>"')]+/g},{type:"IP",re:/\b(?:\d{1,3}\.){3}\d{1,3}\b/g},{type:"GOV_ID",re:/\b\d{6}[-\s]?[1-8]\d{6}\b/g},{type:"RECORD_ID",re:/\b(?:ACCT|CASE|EMP|SW|TCK|TICKET)[-\s#]*[A-Z0-9][A-Z0-9-]{3,}/g},{type:"RECORD_ID",re:/\b[A-Z]{2,5}-\d{4}-\d{3,5}\b/g},{type:"CARD",re:/\b(?:\d[ -]?){13,18}\d\b/g},{type:"PHONE",re:/(?:\+?82[-\s.]?)?0(?:1[016789]|2|3[1-3]|4[1-4]|5[1-5]|6[1-5]|7[0-5])[-\s.]?\d{3,4}[-\s.]?\d{4}\b/g},{type:"ACCOUNT",re:/\b\d{3,6}-\d{2,6}-\d{4,8}\b/g},{type:"DATE",re:/\b(?:19|20)\d{2}[-./년]\s?\d{1,2}[-./월]\s?\d{1,2}일?\b/g},{type:"MONEY",re:/\b\d{1,3}(?:,\d{3})+(?:\.\d+)?\s?(?:KRW|USD|EUR|GBP|JPY|원)/g},{type:"MONEY",re:/\b\d+(?:\.\d+)?\s?(?:KRW|USD|EUR|GBP|JPY|원)\b/g},{type:"ADDRESS",re:/\b\d{1,5}\s+[A-Z][\w'-]*(?:\s[A-Z][\w'-]*)*\s(?:Street|St|Road|Rd|Avenue|Ave|Lane|Ln|Boulevard|Blvd|Drive|Dr)\b/g},{type:"ADDRESS",re:/\b[A-Z][A-Za-z]+-(?:ro|gil|dong|gu)\b(?:\s\d+(?:-\d+)?(?:-gil)?)?/g},{type:"ADDRESS",re:/\b[A-Za-z가-힣0-9]+(?:로|길|동|읍|면|리)\s?\d+(?:-\d+)?(?:번지)?/g},{type:"PERSON",re:/\b(?:Client|Employee|Patient|Applicant|Claimant|Contact|Name|Landlord|Manager|Tenant)\s*[:=]\s*([A-Z][a-z]+(?:\s[A-Z][a-z]+){0,2})/g,group:1},{type:"PERSON",re:/\b(?:Mr|Mrs|Ms|Miss|Dr|Prof)\.?\s+([A-Z][a-z]+)/g,group:1},{type:"PERSON",re:/\b(?:worker|manager|landlord|agent|nurse|doctor|officer|HRBP|counsellor|therapist|supervisor|teacher)\s+([A-Z][a-z]+\s[A-Z][a-z]+)/g,group:1}];function Hi(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Jn(t,e,n){return e?t.replace(new RegExp(Hi(e),"g"),n):t}function Gi(t){let e=t;const n=[],s=new Map;for(const r of Yn)e=e.replace(r.re,(...o)=>{const i=String(o[0]),a=String(o[r.group??0]??i),c=a.trim();if(c.length<2)return i;const l=n.find(p=>p.value===c);if(l)return i.replace(a,l.placeholder);const h=(s.get(r.type)??0)+1;s.set(r.type,h);const f=`[${r.type}_${h}]`;return n.push({type:r.type,value:c,placeholder:f,source:"rule"}),i.replace(a,f)});return{masked:e,entities:n}}function Vi(t,e,n){const s=[...e],r=new Map;for(const a of e){const c=Number(a.placeholder.replace(/\D+(\d+)\]$/,"$1"))||0;r.set(a.type,Math.max(r.get(a.type)??0,c))}for(const a of n){const c=(a.value??"").trim();if(c.length<2||!t.includes(c)||s.some(f=>f.value===c))continue;const l=(a.type??"OTHER").toUpperCase().replace(/[^A-Z_]/g,"")||"OTHER",h=(r.get(l)??0)+1;r.set(l,h),s.push({type:l,value:c,placeholder:`[${l}_${h}]`,source:"device"})}const o=[...s].sort((a,c)=>c.value.length-a.value.length);let i=t;for(const a of o)i=Jn(i,a.value,a.placeholder);return{masked:i,entities:s}}function ji(t){const e=new Set;for(const n of Yn)for(const s of t.match(n.re)??[])s.startsWith("[")||e.add(s);return[...e]}function Ki(t,e){let n=e,s=0;for(const r of[...t].sort((o,i)=>i.placeholder.length-o.placeholder.length)){const o=n;n=Jn(n,r.placeholder,r.value),n!==o&&(s+=1)}return{text:n,restored:s}}function Xn(t){return t.length}const zi=3500;function Zn(t,e){const n=c=>c.replace(/\s+/g," ").trim().toLowerCase(),s=n(t),r=n(e);if(s.length<24)return!1;if(r.includes(s)&&s.length>60)return!0;const o=s.slice(0,120);if(o.length>40&&r.includes(o))return!0;const i=Math.min(80,Math.max(0,r.length-300)),a=r.slice(i,i+160);return a.length>60&&s.includes(a)}function Qn(t,e,n){return Promise.race([t,new Promise((s,r)=>setTimeout(()=>r(new Error(`${n} did not finish in ${Math.round(e/1e3)}s — the on-device model may still be downloading`)),e))])}function T(){return typeof performance<"u"?performance.now():Date.now()}function es(t){return t instanceof Error?t.message:String(t)}async function Wi(t,e,n){const s=[],r=se=>{s.push(se),n.onStage?.(se)},o=T(),i=Gi(t);r({label:"Pattern mask",source:"local",ms:T()-o,detail:`${i.entities.length} structured identifier(s) — device only`});const a=await qn();let c="unavailable",l="On-device model not available in this browser.",h=!1,f="";const p=[];if(a==="available"||a==="downloadable"||a==="downloading"){const se=T();try{const pe=$i(),De=await Qn((async()=>(await pe.initializeDeviceModel(),pe.generateContent(nn(i.masked,e))))(),8e3,"The on-device privacy scan"),re=Bi(De.response.text());if(Zn(De.response.text(),nn(i.masked,e)))throw new Error("the browser's Prompt API echoed the prompt — no real on-device model");p.push(...re.entities),h=re.localSufficient,f=re.reason,c="ran",l=`Gemini Nano reviewed the note locally; ${re.entities.length} semantic entit${re.entities.length===1?"y":"ies"} flagged.`,r({label:"Nano privacy scan",source:"on-device",ms:T()-se,detail:De.response.inferenceSource??"on_device"})}catch(pe){c="failed",l=`On-device scan failed (${es(pe)}). Nothing is sent without your approval.`,r({label:"Nano privacy scan",source:"on-device",ms:T()-se,detail:"unavailable — fell back to pattern masking"})}}else r({label:"Nano privacy scan",source:"on-device",ms:0,detail:a==="unknown"?"Chrome Prompt API not detected":`on-device model ${a} in this browser`});const I=T(),{masked:R,entities:ee}=Vi(t,i.entities,p);r({label:"Placeholder merge",source:"local",ms:T()-I,detail:`${ee.length} placeholder(s) applied`});const ke=T(),$=ji(R);r({label:"Residual scan",source:"local",ms:T()-ke,detail:$.length===0?"clean — nothing raw left":`${$.length} leftover(s) blocked`});let te,ne;const kt=R.length>zi;return n.localOnly?(te="device",ne="Device-only mode is on — the cloud is never contacted."):c!=="ran"?(te="cloud",ne="No on-device model here, so a redacted escalation is the only way to answer in this browser."):h&&!kt?(te="device",ne=f||"The on-device model judged this answer small enough to keep local."):(te="cloud",ne=f||(kt?"The note is longer than the on-device context, so the answer needs the cloud.":"The request needs more reasoning than the on-device model should carry.")),{original:t,task:e,masked:R,entities:ee,stages:s,device:a,deviceScan:c,deviceNote:l,lane:te,laneReason:ne,residual:$,localSufficient:h}}async function qi(t,e){const n=[],s=l=>{n.push(l),e.onStage?.(l)},r=async l=>{const h=T(),f=Ui(l),p=await Qn((async()=>(l==="device"&&await f.initializeDeviceModel(),f.generateContentStream(rn(t.masked,t.task))))(),l==="device"?2e4:6e4,l==="device"?"The on-device answer":"The cloud answer");let I="";for await(const ke of p.stream){const $=ke.text();$&&(I+=$,e.onDelta?.($))}const R=await p.response,ee=R.inferenceSource==="on_device"||l==="device"?"on-device":"cloud";return s({label:l==="cloud"?"Cloud reasoning":"On-device answer",source:ee==="on-device"?"on-device":"cloud",ms:T()-h,detail:R.inferenceSource??l}),I||(I=R.text()),{text:I,source:ee}};let o;try{o=await r(t.lane)}catch(l){if(t.lane==="cloud")s({label:"Cloud reasoning",source:"cloud",ms:0,detail:`failed: ${es(l)} — retrying on device`}),o=await r("device");else throw l}if(Zn(o.text,rn(t.masked,t.task)))throw s({label:"On-device answer",source:"on-device",ms:0,detail:"rejected: the browser's Prompt API echoed the prompt"}),new Error("The on-device model in this browser is a stub that echoes its input, so Veil will not use its output. Use Chrome desktop 139+ with the Gemini Nano model downloaded, or leave device-only mode off.");const i=T(),{text:a,restored:c}=Ki(t.entities,o.text);return s({label:"Local restore",source:"local",ms:T()-i,detail:`${c} real value(s) put back on this device`}),{raw:o.text,text:a,restored:c,source:o.source,stages:n}}const _e=[{id:"case-note",label:"Housing case note",blurb:"Social work · home visit",task:"Summarise the open risks and the next three actions for this case.",note:`Home visit 2026-11-18, 14:20, 42 Bongcheon-ro 12-gil, Gwanak-gu, Seoul.
Client: Mira Han (DOB 1988-03-14, case SW-2026-0417), phone 010-4412-7788.
Lives with two children; the youngest has asthma and takes Montelukast daily.
Landlord Mr. Park has refused to fix the bathroom leak for the third time; the client says she was told to "wait until spring".
Income: 1,400,000 KRW per month from part-time cleaning at Greenline Office Services. Rent arrears 1,850,000 KRW since September.
Client reports feeling watched by the neighbour and describes low mood, no self-harm ideation. Referred to the district mental health centre, contact worker Yuna Seo, 02-889-4411.
Next visit 2026-11-25.`},{id:"exit-interview",label:"Exit interview",blurb:"HR · people team",task:"Draft a neutral summary for the leadership review and list the follow-ups we owe this employee.",note:`Exit interview, 2026-11-20, conducted by HRBP Jaeho Lim.
Employee: Daniel Cho, senior backend engineer, employee EMP-2019-4471, personal mail d.cho@fastmail.com, phone 010-9931-2244.
Reason for leaving: accepted an offer elsewhere. Last day 2026-12-05.
Concerns raised: the on-call rotation is "unsustainable", and feedback from his manager Sunmi Park feels "dismissive".
He also said the payment outage on 2026-10-02 came from an unapproved config change by a contractor, whom he named in the room.
Severance expectation: 3 years 4 months of service, about 11,400,000 KRW.
He asked not to be contacted at his personal number after 2026-12-05.`},{id:"support-ticket",label:"Billing dispute",blurb:"Customer support · refund",task:"Write a reply that acknowledges the double charge, states exactly what we will do, and gives a timeline.",note:`Ticket TICKET-48211 opened 2026-11-19 by Yerin Kim (yerin.kim@hanmail.net, 010-5521-8842), account ACCT-9931-4471-22.
She was charged 79,000 KRW twice on 2026-11-17 for a plan she cancelled on 2026-11-02.
Card ending 4417; billing address 17 Seolleung-ro 88-gil, Gangnam-gu.
She is eight months pregnant and asked to be contacted by email only; she cannot take calls during hospital appointments at Samsung Medical Center.
An agent promised a refund on the first call but nothing has arrived.`}],g=t=>{const e=document.getElementById(t);if(!e)throw new Error(`missing #${t}`);return e},It=g("note-input"),Ct=g("task-input"),vt=g("local-only"),fe=g("run-btn"),K=g("send-btn"),L=g("approve"),Se=g("masked-text"),ot=g("entities"),Ot=g("gate"),W=g("gate-note"),Y=g("answer-body"),Te=g("answer-source"),ts=g("stage-log"),ns=g("receipt"),on=g("receipt-list"),an=g("stats"),ss=g("receipt-mini"),Rt=g("boundary-hint"),ye=g("intake-error"),cn=g("templates"),U=g("device-chip"),ae=g("device-label"),Yi=g("footer-mode");let A=null,rs=!1;const os="veil.usage";function is(){try{const t=localStorage.getItem(os);if(!t)return{runs:0,deviceRuns:0,cloudRuns:0,masked:0};const e=JSON.parse(t);return{runs:Number(e.runs??0),deviceRuns:Number(e.deviceRuns??0),cloudRuns:Number(e.cloudRuns??0),masked:Number(e.masked??0)}}catch{return{runs:0,deviceRuns:0,cloudRuns:0,masked:0}}}function Ji(t){try{localStorage.setItem(os,JSON.stringify(t))}catch{}}function ve(t,e,n){rs=e;const s=t.querySelector(".btn-spinner"),r=t.querySelector(".btn-label");s&&(s.hidden=!e),r&&n&&(r.textContent=n),t.disabled=e,fe.disabled=e||!ce,K.disabled=e||!L.checked||!A}function J(t){if(!t){ye.hidden=!0,ye.textContent="";return}ye.hidden=!1,ye.textContent=t}function as(t){const e=document.createElement("div");e.className="stage-line";const n=document.createElement("span");n.className=`src ${t.source}`,n.textContent=t.source;const s=document.createElement("span");s.className="what",s.textContent=t.detail?`${t.label} — ${t.detail}`:t.label;const r=document.createElement("span");r.className="ms",r.textContent=`${Math.round(t.ms)}ms`,e.append(n,s,r),ts.append(e)}function Xi(){ts.textContent=""}function Zi(t,e){const n=new Map(e.map(r=>[r.placeholder,r]));Se.textContent="";const s=t.split(/(\[[A-Z_]+_\d+\])/g);for(const r of s){const o=n.get(r);if(o){const i=document.createElement("span");i.className=`tok ${o.source}`,i.textContent=r,i.title=o.type,Se.append(i)}else Se.append(document.createTextNode(r))}}function Qi(t){ot.textContent="";for(const e of t.slice(0,24)){const n=document.createElement("span");n.className=`entity-chip ${e.source}`;const s=document.createElement("span");s.className="type",s.textContent=e.type,n.append(s,document.createTextNode(e.placeholder)),ot.append(n)}}function Ve(t,e){Te.hidden=!1,Te.className=`source-pill ${e}`,Te.textContent=t}function cs(){const t=is(),e=t.runs===0?0:Math.round(t.deviceRuns/t.runs*100);an.textContent="";const n=[["runs",String(t.runs)],["kept on device",`${e}%`],["entities hidden",String(t.masked)]];for(const[s,r]of n){const o=document.createElement("span"),i=document.createElement("strong");i.textContent=r,o.append(i,document.createTextNode(` ${s}`)),an.append(o)}}function ea(){cn.textContent="";for(const t of _e){const e=document.createElement("button");e.type="button",e.className="template-btn",e.textContent=t.label,e.title=t.blurb,e.addEventListener("click",()=>{It.value=t.note,Ct.value=t.task,ls(),ds()}),cn.append(e)}}function ls(){A=null,L.checked=!1,Ot.hidden=!0,ns.hidden=!0,ss.hidden=!0,Te.hidden=!0,Y.textContent="";const t=document.createElement("p");t.className="empty",t.textContent="Veil answers here. Placeholders come back as the real names on your device — the model never sees them.",Y.append(t),ot.textContent="",Xi(),Se.textContent="The redacted version of your note appears here — this is the exact text that would be sent.",Rt.textContent="Nothing yet.",K.disabled=!0,J(null)}function ds(){vt.checked&&(Rt.textContent="Device-only mode.")}async function ta(){const t=await qn();U.classList.remove("ready","off"),t==="available"?(U.classList.add("ready"),ae.textContent="Gemini Nano ready on this device"):t==="downloadable"||t==="downloading"?(U.classList.add("ready"),ae.textContent=`Gemini Nano ${t} — starts on first run`):t==="unavailable"?(U.classList.add("off"),ae.textContent="No on-device model in this browser"):(U.classList.add("off"),ae.textContent="Chrome Prompt API not detected")}async function na(){const t=It.value.trim(),e=Ct.value.trim();if(t.length<20){J("Add a note first — at least a couple of sentences, so there is something worth protecting.");return}if(!e){J("Say what you need from the note (for example: draft a reply, list the risks).");return}ls(),ve(fe,!0,"Running…"),L.disabled=!0;try{const n=await Wi(t,e,{localOnly:vt.checked,onStage:as});A=n,n.deviceScan==="failed"&&(U.classList.remove("ready"),U.classList.add("off"),ae.textContent="On-device model unusable in this browser"),Zi(n.masked,n.entities),Qi(n.entities),ss.hidden=!1,g("raw-sent").textContent=String(Xn(n.masked)),g("entity-count").textContent=String(n.entities.length),g("scan-source").textContent=n.deviceScan==="ran"?"Nano + rules (device)":"rules only (device)",Rt.textContent=n.lane==="cloud"?"Waiting for your approval":"Staying on this device",n.lane==="device"?await us():(Ot.hidden=!1,W.className="microcopy dim",W.textContent=n.laneReason,n.deviceScan!=="ran"&&(W.className="microcopy",W.textContent=`${n.laneReason} Semantic masking (names, free-text details) needs Chrome 139+ on desktop — read the redacted text below before you approve it.`),n.residual.length>0?(W.className="microcopy",W.textContent=`Blocked: ${n.residual.length} unmasked value(s) survived the scan.`,L.disabled=!0):L.disabled=!1)}catch(n){J(n instanceof Error?n.message:String(n))}finally{ve(fe,!1,"Run privacy pass"),A&&(K.disabled=!L.checked||A.residual.length>0)}}async function us(){if(!A)return;Ot.hidden=!0,ve(K,!0,"Asking…"),Y.textContent="";const t=document.createElement("span");t.className="streaming",Y.append(t),Ve("thinking…","");try{const e=await qi(A,{onDelta:r=>{t.textContent+=r,Y.scrollTop=Y.scrollHeight},onStage:as});t.classList.remove("streaming"),t.textContent=e.text,Ve(e.source==="on-device"?"on-device · nothing sent":"cloud · redacted only",e.source==="on-device"?"on_device":"in_cloud");const n=is();n.runs+=1,e.source==="on-device"?n.deviceRuns+=1:n.cloudRuns+=1,n.masked+=A.entities.length,Ji(n),ns.hidden=!1,on.textContent="";const s=[`${A.entities.length} entit${A.entities.length===1?"y":"ies"} replaced before any request left this device.`,`Sent to the cloud: ${A.lane==="cloud"?`${Xn(A.masked)} characters of masked text, 0 raw names`:"nothing"}.`,`Inference ran ${e.source==="on-device"?"on your device":`in Google's cloud (${it})`}.`,`${e.restored} real value(s) restored locally after the answer.`];for(const r of s){const o=document.createElement("li");o.textContent=r,on.append(o)}cs()}catch(e){t.classList.remove("streaming"),t.textContent="",J(`The answer failed: ${e instanceof Error?e.message:String(e)}. The masked text is still here; nothing else was sent.`),Ve("failed","offline-lock")}finally{ve(K,!1,"Send masked request")}}function sa(){if(ea(),cs(),ta(),Yi.textContent=ce?`cloud: ${it} · App Check: ${Ke?"reCAPTCHA Enterprise":`debug ${Pi().slice(0,8)||"—"}`}`:"Firebase not configured",L.addEventListener("change",()=>{K.disabled=rs||!L.checked||!A}),fe.addEventListener("click",()=>void na()),K.addEventListener("click",()=>void us()),vt.addEventListener("change",ds),!ce){const t=document.createElement("div");t.className="setup",t.innerHTML="<strong>Firebase is not configured.</strong><div>Copy <code>.env.example</code> to <code>.env.local</code>, paste your project's web config, then run <code>npm run dev</code> again.</div>",document.querySelector(".intake")?.append(t),fe.disabled=!0}_e[0]&&(It.value=_e[0].note,Ct.value=_e[0].task),(async()=>{try{zn()}catch(t){ce&&J(t instanceof Error?t.message:String(t))}})()}sa();
//# sourceMappingURL=index-CGfRJ-7i.js.map
