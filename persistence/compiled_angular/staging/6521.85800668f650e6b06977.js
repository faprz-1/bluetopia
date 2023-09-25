(self.webpackChunktemplate_web=self.webpackChunktemplate_web||[]).push([[6521],{6866:(e,t)=>{"use strict";var i=function(){function e(){}return e.EOL="\r\n",e.BOM="\ufeff",e.DEFAULT_FIELD_SEPARATOR=",",e.DEFAULT_DECIMAL_SEPARATOR=".",e.DEFAULT_QUOTE='"',e.DEFAULT_SHOW_TITLE=!1,e.DEFAULT_TITLE="My Report",e.DEFAULT_FILENAME="mycsv.csv",e.DEFAULT_SHOW_LABELS=!1,e.DEFAULT_USE_BOM=!0,e.DEFAULT_HEADER=[],e.DEFAULT_NO_DOWNLOAD=!1,e.DEFAULT_NULL_TO_EMPTY_STRING=!1,e}();t.hd={filename:i.DEFAULT_FILENAME,fieldSeparator:i.DEFAULT_FIELD_SEPARATOR,quoteStrings:i.DEFAULT_QUOTE,decimalseparator:i.DEFAULT_DECIMAL_SEPARATOR,showLabels:i.DEFAULT_SHOW_LABELS,showTitle:i.DEFAULT_SHOW_TITLE,title:i.DEFAULT_TITLE,useBom:i.DEFAULT_USE_BOM,headers:i.DEFAULT_HEADER,noDownload:i.DEFAULT_NO_DOWNLOAD,nullToEmptyString:i.DEFAULT_NULL_TO_EMPTY_STRING},t.nk=function(){function e(e,i,o){this.csv="";var a=o||{};this.data="object"!=typeof e?JSON.parse(e):e,this._options=function(e){for(var t,i=[],o=1;o<arguments.length;o++)i[o-1]=arguments[o];for(var a,h=s(e),u=1;u<arguments.length;u++){for(var l in t=Object(arguments[u]))r.call(t,l)&&(h[l]=t[l]);if(Object.getOwnPropertySymbols){a=Object.getOwnPropertySymbols(t);for(var f=0;f<a.length;f++)n.call(t,a[f])&&(h[a[f]]=t[a[f]])}}return h}({},t.hd,a),this._options.filename&&(this._options.filename=i),this.generateCsv()}return e.prototype.generateCsv=function(){if(this._options.useBom&&(this.csv+=i.BOM),this._options.showTitle&&(this.csv+=this._options.title+"\r\n\n"),this.getHeaders(),this.getBody(),""!=this.csv){if(this._options.noDownload)return this.csv;var e=new Blob([this.csv],{type:"text/csv;charset=utf8;"});if(navigator.msSaveBlob){var t=this._options.filename.replace(/ /g,"_")+".csv";navigator.msSaveBlob(e,t)}else{encodeURI(this.csv);var r=document.createElement("a");r.href=URL.createObjectURL(e),r.setAttribute("visibility","hidden"),r.download=this._options.filename.replace(/ /g,"_")+".csv",document.body.appendChild(r),r.click(),document.body.removeChild(r)}}else console.log("Invalid data")},e.prototype.getHeaders=function(){var e=this;if(this._options.headers.length>0){var t=this._options.headers.reduce(function(t,i){return t+i+e._options.fieldSeparator},"");t=t.slice(0,-1),this.csv+=t+i.EOL}},e.prototype.getBody=function(){for(var e=0;e<this.data.length;e++){var t="";for(var r in this.data[e])t+=this.formatData(this.data[e][r])+this._options.fieldSeparator;t=t.slice(0,-1),this.csv+=t+i.EOL}},e.prototype.formatData=function(t){return"locale"===this._options.decimalseparator&&e.isFloat(t)?t.toLocaleString():"."!==this._options.decimalseparator&&e.isFloat(t)?t.toString().replace(".",this._options.decimalseparator):"string"==typeof t?(t=t.replace(/"/g,'""'),(this._options.quoteStrings||t.indexOf(",")>-1||t.indexOf("\n")>-1||t.indexOf("\r")>-1)&&(t=this._options.quoteStrings+t+this._options.quoteStrings),t):this._options.nullToEmptyString?null===t?"":t:"boolean"==typeof t?t?"TRUE":"FALSE":t},e.isFloat=function(e){return+e===e&&(!isFinite(e)||Boolean(e%1))},e}();var r=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable;function s(e){if(null==e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}},1178:function(e,t){var i,r;void 0===(r="function"==typeof(i=function e(){"use strict";var t="undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0!==t?t:{},i=!t.document&&!!t.postMessage,r=i&&/blob:/i.test((t.location||{}).protocol),n={},s=0,o={parse:function(i,r){var a=(r=r||{}).dynamicTyping||!1;if(b(a)&&(r.dynamicTypingFunction=a,a={}),r.dynamicTyping=a,r.transform=!!b(r.transform)&&r.transform,r.worker&&o.WORKERS_SUPPORTED){var h=function(){if(!o.WORKERS_SUPPORTED)return!1;var i,r,a=(i=t.URL||t.webkitURL||null,r=e.toString(),o.BLOB_URL||(o.BLOB_URL=i.createObjectURL(new Blob(["(",r,")();"],{type:"text/javascript"})))),h=new t.Worker(a);return h.onmessage=m,h.id=s++,n[h.id]=h}();return h.userStep=r.step,h.userChunk=r.chunk,h.userComplete=r.complete,h.userError=r.error,r.step=b(r.step),r.chunk=b(r.chunk),r.complete=b(r.complete),r.error=b(r.error),delete r.worker,void h.postMessage({input:i,config:r,workerId:h.id})}var d=null;return"string"==typeof i?d=r.download?new u(r):new f(r):!0===i.readable&&b(i.read)&&b(i.on)?d=new c(r):(t.File&&i instanceof File||i instanceof Object)&&(d=new l(r)),d.stream(i)},unparse:function(e,t){var i=!1,r=!0,n=",",s="\r\n",a='"',h=a+a,u=!1,l=null,f=!1;!function(){if("object"==typeof t){if("string"!=typeof t.delimiter||o.BAD_DELIMITERS.filter(function(e){return-1!==t.delimiter.indexOf(e)}).length||(n=t.delimiter),("boolean"==typeof t.quotes||"function"==typeof t.quotes||Array.isArray(t.quotes))&&(i=t.quotes),"boolean"!=typeof t.skipEmptyLines&&"string"!=typeof t.skipEmptyLines||(u=t.skipEmptyLines),"string"==typeof t.newline&&(s=t.newline),"string"==typeof t.quoteChar&&(a=t.quoteChar),"boolean"==typeof t.header&&(r=t.header),Array.isArray(t.columns)){if(0===t.columns.length)throw new Error("Option columns is empty");l=t.columns}void 0!==t.escapeChar&&(h=t.escapeChar+a),"boolean"==typeof t.escapeFormulae&&(f=t.escapeFormulae)}}();var c=new RegExp(p(a),"g");if("string"==typeof e&&(e=JSON.parse(e)),Array.isArray(e)){if(!e.length||Array.isArray(e[0]))return _(null,e,u);if("object"==typeof e[0])return _(l||d(e[0]),e,u)}else if("object"==typeof e)return"string"==typeof e.data&&(e.data=JSON.parse(e.data)),Array.isArray(e.data)&&(e.fields||(e.fields=e.meta&&e.meta.fields),e.fields||(e.fields=Array.isArray(e.data[0])?e.fields:d(e.data[0])),Array.isArray(e.data[0])||"object"==typeof e.data[0]||(e.data=[e.data])),_(e.fields||[],e.data||[],u);throw new Error("Unable to serialize unrecognized input");function d(e){if("object"!=typeof e)return[];var t=[];for(var i in e)t.push(i);return t}function _(e,t,i){var o="";"string"==typeof e&&(e=JSON.parse(e)),"string"==typeof t&&(t=JSON.parse(t));var a=Array.isArray(e)&&0<e.length,h=!Array.isArray(t[0]);if(a&&r){for(var u=0;u<e.length;u++)0<u&&(o+=n),o+=m(e[u],u);0<t.length&&(o+=s)}for(var l=0;l<t.length;l++){var f=a?e.length:t[l].length,c=!1,d=a?0===Object.keys(t[l]).length:0===t[l].length;if(i&&!a&&(c="greedy"===i?""===t[l].join("").trim():1===t[l].length&&0===t[l][0].length),"greedy"===i&&a){for(var p=[],_=0;_<f;_++)p.push(t[l][h?e[_]:_]);c=""===p.join("").trim()}if(!c){for(var g=0;g<f;g++)0<g&&!d&&(o+=n),o+=m(t[l][a&&h?e[g]:g],g);l<t.length-1&&(!i||0<f&&!d)&&(o+=s)}}return o}function m(e,t){if(null==e)return"";if(e.constructor===Date)return JSON.stringify(e).slice(1,25);!0===f&&"string"==typeof e&&null!==e.match(/^[=+\-@].*$/)&&(e="'"+e);var r=e.toString().replace(c,h);return"boolean"==typeof i&&i||"function"==typeof i&&i(e,t)||Array.isArray(i)&&i[t]||function(e,t){for(var i=0;i<t.length;i++)if(-1<e.indexOf(t[i]))return!0;return!1}(r,o.BAD_DELIMITERS)||-1<r.indexOf(n)||" "===r.charAt(0)||" "===r.charAt(r.length-1)?a+r+a:r}}};if(o.RECORD_SEP=String.fromCharCode(30),o.UNIT_SEP=String.fromCharCode(31),o.BYTE_ORDER_MARK="\ufeff",o.BAD_DELIMITERS=["\r","\n",'"',o.BYTE_ORDER_MARK],o.WORKERS_SUPPORTED=!i&&!!t.Worker,o.NODE_STREAM_INPUT=1,o.LocalChunkSize=10485760,o.RemoteChunkSize=5242880,o.DefaultDelimiter=",",o.Parser=_,o.ParserHandle=d,o.NetworkStreamer=u,o.FileStreamer=l,o.StringStreamer=f,o.ReadableStreamStreamer=c,t.jQuery){var a=t.jQuery;a.fn.parse=function(e){var i=e.config||{},r=[];return this.each(function(e){if("INPUT"!==a(this).prop("tagName").toUpperCase()||"file"!==a(this).attr("type").toLowerCase()||!t.FileReader||!this.files||0===this.files.length)return!0;for(var n=0;n<this.files.length;n++)r.push({file:this.files[n],inputElem:this,instanceConfig:a.extend({},i)})}),n(),this;function n(){if(0!==r.length){var t,i,n,h=r[0];if(b(e.before)){var u=e.before(h.file,h.inputElem);if("object"==typeof u){if("abort"===u.action)return t=h.file,i=h.inputElem,n=u.reason,void(b(e.error)&&e.error({name:"AbortError"},t,i,n));if("skip"===u.action)return void s();"object"==typeof u.config&&(h.instanceConfig=a.extend(h.instanceConfig,u.config))}else if("skip"===u)return void s()}var l=h.instanceConfig.complete;h.instanceConfig.complete=function(e){b(l)&&l(e,h.file,h.inputElem),s()},o.parse(h.file,h.instanceConfig)}else b(e.complete)&&e.complete()}function s(){r.splice(0,1),n()}}}function h(e){this._handle=null,this._finished=!1,this._completed=!1,this._halted=!1,this._input=null,this._baseIndex=0,this._partialLine="",this._rowCount=0,this._start=0,this._nextChunk=null,this.isFirstChunk=!0,this._completeResults={data:[],errors:[],meta:{}},(function(e){var t=y(e);t.chunkSize=parseInt(t.chunkSize),e.step||e.chunk||(t.chunkSize=null),this._handle=new d(t),(this._handle.streamer=this)._config=t}).call(this,e),this.parseChunk=function(e,i){if(this.isFirstChunk&&b(this._config.beforeFirstChunk)){var n=this._config.beforeFirstChunk(e);void 0!==n&&(e=n)}this.isFirstChunk=!1,this._halted=!1;var s=this._partialLine+e;this._partialLine="";var a=this._handle.parse(s,this._baseIndex,!this._finished);if(!this._handle.paused()&&!this._handle.aborted()){var h=a.meta.cursor;this._finished||(this._partialLine=s.substring(h-this._baseIndex),this._baseIndex=h),a&&a.data&&(this._rowCount+=a.data.length);var u=this._finished||this._config.preview&&this._rowCount>=this._config.preview;if(r)t.postMessage({results:a,workerId:o.WORKER_ID,finished:u});else if(b(this._config.chunk)&&!i){if(this._config.chunk(a,this._handle),this._handle.paused()||this._handle.aborted())return void(this._halted=!0);a=void 0,this._completeResults=void 0}return this._config.step||this._config.chunk||(this._completeResults.data=this._completeResults.data.concat(a.data),this._completeResults.errors=this._completeResults.errors.concat(a.errors),this._completeResults.meta=a.meta),this._completed||!u||!b(this._config.complete)||a&&a.meta.aborted||(this._config.complete(this._completeResults,this._input),this._completed=!0),u||a&&a.meta.paused||this._nextChunk(),a}this._halted=!0},this._sendError=function(e){b(this._config.error)?this._config.error(e):r&&this._config.error&&t.postMessage({workerId:o.WORKER_ID,error:e,finished:!1})}}function u(e){var t;(e=e||{}).chunkSize||(e.chunkSize=o.RemoteChunkSize),h.call(this,e),this._nextChunk=i?function(){this._readChunk(),this._chunkLoaded()}:function(){this._readChunk()},this.stream=function(e){this._input=e,this._nextChunk()},this._readChunk=function(){if(this._finished)this._chunkLoaded();else{if(t=new XMLHttpRequest,this._config.withCredentials&&(t.withCredentials=this._config.withCredentials),i||(t.onload=E(this._chunkLoaded,this),t.onerror=E(this._chunkError,this)),t.open(this._config.downloadRequestBody?"POST":"GET",this._input,!i),this._config.downloadRequestHeaders){var e=this._config.downloadRequestHeaders;for(var r in e)t.setRequestHeader(r,e[r])}this._config.chunkSize&&t.setRequestHeader("Range","bytes="+this._start+"-"+(this._start+this._config.chunkSize-1));try{t.send(this._config.downloadRequestBody)}catch(e){this._chunkError(e.message)}i&&0===t.status&&this._chunkError()}},this._chunkLoaded=function(){4===t.readyState&&(t.status<200||400<=t.status?this._chunkError():(this._start+=this._config.chunkSize?this._config.chunkSize:t.responseText.length,this._finished=!this._config.chunkSize||this._start>=function(e){var t=e.getResponseHeader("Content-Range");return null===t?-1:parseInt(t.substring(t.lastIndexOf("/")+1))}(t),this.parseChunk(t.responseText)))},this._chunkError=function(e){this._sendError(new Error(t.statusText||e))}}function l(e){var t,i;(e=e||{}).chunkSize||(e.chunkSize=o.LocalChunkSize),h.call(this,e);var r="undefined"!=typeof FileReader;this.stream=function(e){this._input=e,i=e.slice||e.webkitSlice||e.mozSlice,r?((t=new FileReader).onload=E(this._chunkLoaded,this),t.onerror=E(this._chunkError,this)):t=new FileReaderSync,this._nextChunk()},this._nextChunk=function(){this._finished||this._config.preview&&!(this._rowCount<this._config.preview)||this._readChunk()},this._readChunk=function(){var e=this._input;if(this._config.chunkSize){var n=Math.min(this._start+this._config.chunkSize,this._input.size);e=i.call(e,this._start,n)}var s=t.readAsText(e,this._config.encoding);r||this._chunkLoaded({target:{result:s}})},this._chunkLoaded=function(e){this._start+=this._config.chunkSize,this._finished=!this._config.chunkSize||this._start>=this._input.size,this.parseChunk(e.target.result)},this._chunkError=function(){this._sendError(t.error)}}function f(e){var t;h.call(this,e=e||{}),this.stream=function(e){return t=e,this._nextChunk()},this._nextChunk=function(){if(!this._finished){var e,i=this._config.chunkSize;return i?(e=t.substring(0,i),t=t.substring(i)):(e=t,t=""),this._finished=!t,this.parseChunk(e)}}}function c(e){h.call(this,e=e||{});var t=[],i=!0,r=!1;this.pause=function(){h.prototype.pause.apply(this,arguments),this._input.pause()},this.resume=function(){h.prototype.resume.apply(this,arguments),this._input.resume()},this.stream=function(e){this._input=e,this._input.on("data",this._streamData),this._input.on("end",this._streamEnd),this._input.on("error",this._streamError)},this._checkIsFinished=function(){r&&1===t.length&&(this._finished=!0)},this._nextChunk=function(){this._checkIsFinished(),t.length?this.parseChunk(t.shift()):i=!0},this._streamData=E(function(e){try{t.push("string"==typeof e?e:e.toString(this._config.encoding)),i&&(i=!1,this._checkIsFinished(),this.parseChunk(t.shift()))}catch(e){this._streamError(e)}},this),this._streamError=E(function(e){this._streamCleanUp(),this._sendError(e)},this),this._streamEnd=E(function(){this._streamCleanUp(),r=!0,this._streamData("")},this),this._streamCleanUp=E(function(){this._input.removeListener("data",this._streamData),this._input.removeListener("end",this._streamEnd),this._input.removeListener("error",this._streamError)},this)}function d(e){var t,i,r,n=Math.pow(2,53),s=-n,a=/^\s*-?(\d+\.?|\.\d+|\d+\.\d+)(e[-+]?\d+)?\s*$/,h=/(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/,u=this,l=0,f=0,c=!1,d=!1,m=[],g={data:[],errors:[],meta:{}};if(b(e.step)){var v=e.step;e.step=function(t){if(g=t,S())k();else{if(k(),0===g.data.length)return;l+=t.data.length,e.preview&&l>e.preview?i.abort():(g.data=g.data[0],v(g,u))}}}function E(t){return"greedy"===e.skipEmptyLines?""===t.join("").trim():1===t.length&&0===t[0].length}function k(){if(g&&r&&(O("Delimiter","UndetectableDelimiter","Unable to auto-detect delimiting character; defaulted to '"+o.DefaultDelimiter+"'"),r=!1),e.skipEmptyLines)for(var t=0;t<g.data.length;t++)E(g.data[t])&&g.data.splice(t--,1);return S()&&function(){if(g)if(Array.isArray(g.data[0])){for(var t=0;S()&&t<g.data.length;t++)g.data[t].forEach(i);g.data.splice(0,1)}else g.data.forEach(i);function i(t,i){b(e.transformHeader)&&(t=e.transformHeader(t,i)),m.push(t)}}(),function(){if(!g||!e.header&&!e.dynamicTyping&&!e.transform)return g;function t(t,i){var r,n=e.header?{}:[];for(r=0;r<t.length;r++){var s=r,o=t[r];e.header&&(s=r>=m.length?"__parsed_extra":m[r]),e.transform&&(o=e.transform(o,s)),o=w(s,o),"__parsed_extra"===s?(n[s]=n[s]||[],n[s].push(o)):n[s]=o}return e.header&&(r>m.length?O("FieldMismatch","TooManyFields","Too many fields: expected "+m.length+" fields but parsed "+r,f+i):r<m.length&&O("FieldMismatch","TooFewFields","Too few fields: expected "+m.length+" fields but parsed "+r,f+i)),n}var i=1;return!g.data.length||Array.isArray(g.data[0])?(g.data=g.data.map(t),i=g.data.length):g.data=t(g.data,0),e.header&&g.meta&&(g.meta.fields=m),f+=i,g}()}function S(){return e.header&&0===m.length}function w(t,i){return r=t,e.dynamicTypingFunction&&void 0===e.dynamicTyping[r]&&(e.dynamicTyping[r]=e.dynamicTypingFunction(r)),!0===(e.dynamicTyping[r]||e.dynamicTyping)?"true"===i||"TRUE"===i||"false"!==i&&"FALSE"!==i&&(function(e){if(a.test(e)){var t=parseFloat(e);if(s<t&&t<n)return!0}return!1}(i)?parseFloat(i):h.test(i)?new Date(i):""===i?null:i):i;var r}function O(e,t,i,r){var n={type:e,code:t,message:i};void 0!==r&&(n.row=r),g.errors.push(n)}this.parse=function(n,s,a){if(e.newline||(e.newline=function(e,t){e=e.substring(0,1048576);var i=new RegExp(p(t)+"([^]*?)"+p(t),"gm"),r=(e=e.replace(i,"")).split("\r"),n=e.split("\n");if(1===r.length||1<n.length&&n[0].length<r[0].length)return"\n";for(var s=0,o=0;o<r.length;o++)"\n"===r[o][0]&&s++;return s>=r.length/2?"\r\n":"\r"}(n,e.quoteChar||'"')),r=!1,e.delimiter)b(e.delimiter)&&(e.delimiter=e.delimiter(n),g.meta.delimiter=e.delimiter);else{var h=function(t,i,r,n,s){var a,h,u,l;s=s||[",","\t","|",";",o.RECORD_SEP,o.UNIT_SEP];for(var f=0;f<s.length;f++){var c=s[f],d=0,p=0,m=0;u=void 0;for(var g=new _({comments:n,delimiter:c,newline:i,preview:10}).parse(t),v=0;v<g.data.length;v++)if(r&&E(g.data[v]))m++;else{var y=g.data[v].length;p+=y,void 0!==u?0<y&&(d+=Math.abs(y-u),u=y):u=y}0<g.data.length&&(p/=g.data.length-m),(void 0===h||d<=h)&&(void 0===l||l<p)&&1.99<p&&(h=d,a=c,l=p)}return{successful:!!(e.delimiter=a),bestDelimiter:a}}(n,e.newline,e.skipEmptyLines,e.comments,e.delimitersToGuess);h.successful?e.delimiter=h.bestDelimiter:(r=!0,e.delimiter=o.DefaultDelimiter),g.meta.delimiter=e.delimiter}var u=y(e);return e.preview&&e.header&&u.preview++,t=n,i=new _(u),g=i.parse(t,s,a),k(),c?{meta:{paused:!0}}:g||{meta:{paused:!1}}},this.paused=function(){return c},this.pause=function(){c=!0,i.abort(),t=b(e.chunk)?"":t.substring(i.getCharIndex())},this.resume=function(){u.streamer._halted?(c=!1,u.streamer.parseChunk(t,!0)):setTimeout(u.resume,3)},this.aborted=function(){return d},this.abort=function(){d=!0,i.abort(),g.meta.aborted=!0,b(e.complete)&&e.complete(g),t=""}}function p(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function _(e){var t,i=(e=e||{}).delimiter,r=e.newline,n=e.comments,s=e.step,a=e.preview,h=e.fastMode,u=t=void 0===e.quoteChar?'"':e.quoteChar;if(void 0!==e.escapeChar&&(u=e.escapeChar),("string"!=typeof i||-1<o.BAD_DELIMITERS.indexOf(i))&&(i=","),n===i)throw new Error("Comment character same as delimiter");!0===n?n="#":("string"!=typeof n||-1<o.BAD_DELIMITERS.indexOf(n))&&(n=!1),"\n"!==r&&"\r"!==r&&"\r\n"!==r&&(r="\n");var l=0,f=!1;this.parse=function(e,o,c){if("string"!=typeof e)throw new Error("Input must be a string");var d=e.length,_=i.length,m=r.length,g=n.length,v=b(s),y=[],E=[],k=[],S=l=0;if(!e)return B();if(h||!1!==h&&-1===e.indexOf(t)){for(var w=e.split(r),O=0;O<w.length;O++){if(l+=(k=w[O]).length,O!==w.length-1)l+=r.length;else if(c)return B();if(!n||k.substring(0,g)!==n){if(v){if(y=[],I(k.split(i)),j(),f)return B()}else I(k.split(i));if(a&&a<=O)return y=y.slice(0,a),B(!0)}}return B()}for(var T=e.indexOf(i,l),R=e.indexOf(r,l),L=new RegExp(p(u)+p(t),"g"),D=e.indexOf(t,l);;)if(e[l]!==t)if(n&&0===k.length&&e.substring(l,l+g)===n){if(-1===R)return B();R=e.indexOf(r,l=R+m),T=e.indexOf(i,l)}else{if(-1!==T&&(T<R||-1===R)){if(!(T<D)){k.push(e.substring(l,T)),T=e.indexOf(i,l=T+_);continue}var C=z(T,D,R);if(C&&void 0!==C.nextDelim){D=C.quoteSearch,k.push(e.substring(l,T=C.nextDelim)),T=e.indexOf(i,l=T+_);continue}}if(-1===R)break;if(k.push(e.substring(l,R)),M(R+m),v&&(j(),f))return B();if(a&&y.length>=a)return B(!0)}else for(D=l,l++;;){if(-1===(D=e.indexOf(t,D+1)))return c||E.push({type:"Quotes",code:"MissingQuotes",message:"Quoted field unterminated",row:y.length,index:l}),U();if(D===d-1)return U(e.substring(l,D).replace(L,t));if(t!==u||e[D+1]!==u){if(t===u||0===D||e[D-1]!==u){-1!==T&&T<D+1&&(T=e.indexOf(i,D+1)),-1!==R&&R<D+1&&(R=e.indexOf(r,D+1));var A=F(-1===R?T:Math.min(T,R));if(e[D+1+A]===i){k.push(e.substring(l,D).replace(L,t)),e[l=D+1+A+_]!==t&&(D=e.indexOf(t,l)),T=e.indexOf(i,l),R=e.indexOf(r,l);break}var x=F(R);if(e.substring(D+1+x,D+1+x+m)===r){if(k.push(e.substring(l,D).replace(L,t)),M(D+1+x+m),T=e.indexOf(i,l),D=e.indexOf(t,l),v&&(j(),f))return B();if(a&&y.length>=a)return B(!0);break}E.push({type:"Quotes",code:"InvalidQuotes",message:"Trailing quote on quoted field is malformed",row:y.length,index:l}),D++}}else D++}return U();function I(e){y.push(e),S=l}function F(t){var i=0;if(-1!==t){var r=e.substring(D+1,t);r&&""===r.trim()&&(i=r.length)}return i}function U(t){return c||(void 0===t&&(t=e.substring(l)),k.push(t),l=d,I(k),v&&j()),B()}function M(t){l=t,I(k),k=[],R=e.indexOf(r,l)}function B(e){return{data:y,errors:E,meta:{delimiter:i,linebreak:r,aborted:f,truncated:!!e,cursor:S+(o||0)}}}function j(){s(B()),y=[],E=[]}function z(r,n,s){var o={nextDelim:void 0,quoteSearch:void 0},a=e.indexOf(t,n+1);if(n<r&&r<a&&(a<s||-1===s)){var h=e.indexOf(i,a);if(-1===h)return o;a<h&&(a=e.indexOf(t,a+1)),o=z(h,a,s)}else o={nextDelim:r,quoteSearch:n};return o}},this.abort=function(){f=!0},this.getCharIndex=function(){return l}}function m(e){var t=e.data,i=n[t.workerId],r=!1;if(t.error)i.userError(t.error,t.file);else if(t.results&&t.results.data){var s={abort:function(){r=!0,g(t.workerId,{data:[],errors:[],meta:{aborted:!0}})},pause:v,resume:v};if(b(i.userStep)){for(var o=0;o<t.results.data.length&&(i.userStep({data:t.results.data[o],errors:t.results.errors,meta:t.results.meta},s),!r);o++);delete t.results}else b(i.userChunk)&&(i.userChunk(t.results,s,t.file),delete t.results)}t.finished&&!r&&g(t.workerId,t.results)}function g(e,t){var i=n[e];b(i.userComplete)&&i.userComplete(t),i.terminate(),delete n[e]}function v(){throw new Error("Not implemented.")}function y(e){if("object"!=typeof e||null===e)return e;var t=Array.isArray(e)?[]:{};for(var i in e)t[i]=y(e[i]);return t}function E(e,t){return function(){e.apply(t,arguments)}}function b(e){return"function"==typeof e}return r&&(t.onmessage=function(e){var i=e.data;if(void 0===o.WORKER_ID&&i&&(o.WORKER_ID=i.workerId),"string"==typeof i.input)t.postMessage({workerId:o.WORKER_ID,results:o.parse(i.input,i.config),finished:!0});else if(t.File&&i.input instanceof File||i.input instanceof Object){var r=o.parse(i.input,i.config);r&&t.postMessage({workerId:o.WORKER_ID,results:r,finished:!0})}}),(u.prototype=Object.create(h.prototype)).constructor=u,(l.prototype=Object.create(h.prototype)).constructor=l,(f.prototype=Object.create(f.prototype)).constructor=f,(c.prototype=Object.create(h.prototype)).constructor=c,o})?i.apply(t,[]):i)||(e.exports=r)},1148:(e,t,i)=>{"use strict";i.d(t,{m:()=>a});var r=i(6866),n=i(7368),s=i(1178);let o=(()=>{let e=class{constructor(){this._papa=s}parse(e,t){return this._papa.parse(e,t)}unparse(e,t){return this._papa.unparse(e,t)}setLocalChunkSize(e){this._papa.LocalChunkSize=e}setRemoteChunkSize(e){this._papa.RemoteChunkSize=e}setDefaultDelimiter(e){this._papa.DefaultDelimiter=e}get badDelimiters(){return this._papa.BAD_DELIMITERS}get recordSeparator(){return this._papa.RECORD_SEP}get unitSeparator(){return this._papa.UNIT_SEP}get workersSupported(){return this._papa.WORKERS_SUPPORTED}};return e.\u0275fac=function(t){return new(t||e)},e.\u0275prov=(0,n.Yz7)({factory:function(){return new e},token:e,providedIn:"root"}),e})(),a=(()=>{class e{constructor(e){this.papa=e,this.options={fieldSeparator:",",showLabels:!0,keys:[],headers:[]}}ReadCSV(e){return Promise.resolve(this.papa.parse(e,{header:!0,skipEmptyLines:!0,encoding:"ISO-8859-3",complete:(e,t)=>e.data}))}GenerateCSV(e,t,i=[],n=[]){return this.options.keys=i,this.options.headers=n,new r.nk(t,e,this.options)}}return e.\u0275fac=function(t){return new(t||e)(n.LFG(o))},e.\u0275prov=n.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()},2722:(e,t,i)=>{"use strict";i.d(t,{p:()=>o});var r=i(7368),n=i(1392),s=i(2693);let o=(()=>{class e{constructor(e,t){this.api=e,this.http=t}GetNormalByHTTP(e){return this.http.get(e,{responseType:"blob"})}GetByHTTP(e){return this.http.get(this.api.GetBaseURL()+e,{responseType:"blob"})}Download(e,t=""){this.GetByHTTP(e).subscribe(e=>{const i=document.createElement("a"),r=URL.createObjectURL(e);i.setAttribute("href",r),i.setAttribute("download",t),i.click(),i.remove()})}DownloadWithoutApi(e,t=""){this.GetNormalByHTTP(e).subscribe(e=>{const i=document.createElement("a"),r=URL.createObjectURL(e);i.setAttribute("href",r),i.setAttribute("download",t),i.click(),i.remove()})}}return e.\u0275fac=function(t){return new(t||e)(r.LFG(n.sM),r.LFG(s.eN))},e.\u0275prov=r.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()}}]);