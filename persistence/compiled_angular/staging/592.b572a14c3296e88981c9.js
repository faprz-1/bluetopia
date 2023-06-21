(self.webpackChunktemplate_web=self.webpackChunktemplate_web||[]).push([[592],{7254:(t,e,n)=>{"use strict";n.d(e,{R:()=>c});var i=n(8318),s=n(8470),o=n(5024),r=n(9996);function c(t,e,n,a){return(0,o.m)(n)&&(a=n,n=void 0),a?c(t,e,n).pipe((0,r.U)(t=>(0,s.k)(t)?a(...t):a(t))):new i.y(i=>{l(t,e,function(t){i.next(arguments.length>1?Array.prototype.slice.call(arguments):t)},i,n)})}function l(t,e,n,i,s){let o;if(function(t){return t&&"function"==typeof t.addEventListener&&"function"==typeof t.removeEventListener}(t)){const i=t;t.addEventListener(e,n,s),o=()=>i.removeEventListener(e,n,s)}else if(function(t){return t&&"function"==typeof t.on&&"function"==typeof t.off}(t)){const i=t;t.on(e,n),o=()=>i.off(e,n)}else if(function(t){return t&&"function"==typeof t.addListener&&"function"==typeof t.removeListener}(t)){const i=t;t.addListener(e,n),o=()=>i.removeListener(e,n)}else{if(!t||!t.length)throw new TypeError("Invalid event target");for(let o=0,r=t.length;o<r;o++)l(t[o],e,n,i,s)}i.add(o)}},810:(t,e,n)=>{"use strict";n.d(e,{e:()=>l});var i=n(8569),s=n(6882);class o{constructor(t){this.durationSelector=t}call(t,e){return e.subscribe(new r(t,this.durationSelector))}}class r extends s.Ds{constructor(t,e){super(t),this.durationSelector=e,this.hasValue=!1}_next(t){if(this.value=t,this.hasValue=!0,!this.throttled){let n;try{const{durationSelector:e}=this;n=e(t)}catch(e){return this.destination.error(e)}const i=(0,s.ft)(n,new s.IY(this));!i||i.closed?this.clearThrottle():this.add(this.throttled=i)}}clearThrottle(){const{value:t,hasValue:e,throttled:n}=this;n&&(this.remove(n),this.throttled=void 0,n.unsubscribe()),e&&(this.value=void 0,this.hasValue=!1,this.destination.next(t))}notifyNext(){this.clearThrottle()}notifyComplete(){this.clearThrottle()}}var c=n(1110);function l(t,e=i.P){return n=()=>(0,c.H)(t,e),function(t){return t.lift(new o(n))};var n}},5416:(t,e,n)=>{"use strict";n.d(e,{R:()=>s});var i=n(6882);function s(t){return e=>e.lift(new o(t))}class o{constructor(t){this.notifier=t}call(t,e){const n=new r(t),s=(0,i.ft)(this.notifier,new i.IY(n));return s&&!n.seenValue?(n.add(s),e.subscribe(n)):n}}class r extends i.Ds{constructor(t){super(t),this.seenValue=!1}notifyNext(){this.seenValue=!0,this.complete()}notifyComplete(){}}},1741:(t,e,n)=>{"use strict";n.d(e,{Z:()=>c});var i=n(8277);class s extends i.o{constructor(t,e){super(t,e),this.scheduler=t,this.work=e}requestAsyncId(t,e,n=0){return null!==n&&n>0?super.requestAsyncId(t,e,n):(t.actions.push(this),t.scheduled||(t.scheduled=requestAnimationFrame(()=>t.flush(null))))}recycleAsyncId(t,e,n=0){if(null!==n&&n>0||null===n&&this.delay>0)return super.recycleAsyncId(t,e,n);0===t.actions.length&&(cancelAnimationFrame(e),t.scheduled=void 0)}}var o=n(1098);class r extends o.v{flush(t){this.active=!0,this.scheduled=void 0;const{actions:e}=this;let n,i=-1,s=e.length;t=t||e.shift();do{if(n=t.execute(t.state,t.delay))break}while(++i<s&&(t=e.shift()));if(this.active=!1,n){for(;++i<s&&(t=e.shift());)t.unsubscribe();throw n}}}const c=new r(s)},6507:(t,e,n)=>{"use strict";n.d(e,{f:()=>s});var i=n(7368);let s=(()=>{class t{constructor(){this.template=null,this.onCloseModal=new i.vpe,this.onUseTemplate=new i.vpe}ngOnInit(){}CloseModal(){this.onCloseModal.emit()}UseTemplate(){this.onUseTemplate.emit(this.template)}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=i.Xpm({type:t,selectors:[["app-template-preview-modal"]],inputs:{template:"template"},outputs:{onCloseModal:"onCloseModal",onUseTemplate:"onUseTemplate"},decls:23,vars:7,consts:[[1,"modal-header"],["src","assets/icons/back-arrow.png","alt","back",1,"clickeable","top-left",3,"click"],[1,"modal-body"],[1,"d-flex","justify-content-around","mb-4"],[1,"template"],["alt","template-icon",1,"template-icon",3,"src"],[1,"d-flex","justify-content-center","h-100","align-items-start"],["src","assets/img/templates.png","alt","template-icon",1,"template-icon"],[1,"modal-footer","justify-content-center"],[1,"btn","btn-primary","use-template-btn",3,"click"]],template:function(t,e){1&t&&(i.TgZ(0,"div",0),i.TgZ(1,"img",1),i.NdJ("click",function(){return e.CloseModal()}),i.qZA(),i.qZA(),i.TgZ(2,"div",2),i.TgZ(3,"div",3),i.TgZ(4,"div",4),i._UZ(5,"img",5),i.qZA(),i.TgZ(6,"div",6),i._UZ(7,"img",7),i.qZA(),i.qZA(),i.TgZ(8,"p"),i._uU(9),i.qZA(),i.TgZ(10,"p"),i._uU(11),i.qZA(),i.TgZ(12,"p"),i._uU(13),i.qZA(),i.TgZ(14,"p"),i._uU(15),i.qZA(),i.TgZ(16,"p"),i._uU(17),i.qZA(),i.TgZ(18,"p"),i._uU(19),i.qZA(),i.qZA(),i.TgZ(20,"div",8),i.TgZ(21,"button",9),i.NdJ("click",function(){return e.UseTemplate()}),i._uU(22," Usar plantilla "),i.qZA(),i.qZA()),2&t&&(i.xp6(5),i.s9C("src","assets/icons/"+e.template.icon,i.LSH),i.xp6(4),i.hij(" ",e.template.description," "),i.xp6(2),i.hij(" ",e.template.difficulty," "),i.xp6(2),i.hij(" ",e.template.estimatedClasses," "),i.xp6(2),i.hij(" ",e.template.suggestedAges," "),i.xp6(2),i.hij(" ",e.template.suggestedSubjects," "),i.xp6(2),i.hij(" ",e.template.skillsDeveloped," "))},styles:[".use-template-btn[_ngcontent-%COMP%]{padding:.5rem 2rem;font-weight:800;font-size:1.25rem}.modal-header[_ngcontent-%COMP%]{padding:1.5rem}.modal-body[_ngcontent-%COMP%]{padding:0 3.25rem}.template[_ngcontent-%COMP%]{display:flex;width:150px;justify-content:center;align-items:center;flex-direction:column;background-color:#f4f5f7;padding:27px 1rem;border-radius:6px;height:125px}.template-icon[_ngcontent-%COMP%]{width:-webkit-min-content;width:min-content}"]}),t})()},882:(t,e,n)=>{"use strict";n.d(e,{c:()=>l});var i=n(1116),s=n(4391),o=n(1041),r=n(6050),c=(n(6507),n(7368));let l=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=c.oAB({type:t}),t.\u0275inj=c.cJS({imports:[[o.u5,i.ez,s.A0,o.UX,r.G]]}),t})()},2874:(t,e,n)=>{"use strict";n.d(e,{g:()=>r});var i=n(6304),s=n(7368),o=n(1392);let r=(()=>{class t{constructor(t){this.api=t,this.notifications=[]}Init(){this.LoadNotifications(),this.SusbcribeToNotifications()}SusbcribeToNotifications(){}LoadNotifications(t=!1){let e="/Notifications/getLast5";e+=t?"/"+t:"",this.api.Get(e).subscribe(t=>{this.notifications.push.apply(this.notifications,t)})}CountUnseen(){let t=0;return this.notifications.forEach(e=>{null==e.seen&&t++}),t}SetSeen(t){var e=this;return(0,i.Z)(function*(){if(null==t.seen){let n=yield e.api.Get("/Notifications/setSeen/"+t.id);e.notifications.forEach((t,i)=>{t.id==t.id&&(e.notifications[i]=n)})}})()}PrepareUrl(t){return t?t.split("/#")[1]:""}}return t.\u0275fac=function(e){return new(e||t)(s.LFG(o.sM))},t.\u0275prov=s.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()},6304:(t,e,n)=>{"use strict";function i(t,e,n,i,s,o,r){try{var c=t[o](r),l=c.value}catch(a){return void n(a)}c.done?e(l):Promise.resolve(l).then(i,s)}function s(t){return function(){var e=this,n=arguments;return new Promise(function(s,o){var r=t.apply(e,n);function c(t){i(r,s,o,c,l,"next",t)}function l(t){i(r,s,o,c,l,"throw",t)}c(void 0)})}}n.d(e,{Z:()=>s})}}]);