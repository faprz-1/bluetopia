(self.webpackChunktemplate_web=self.webpackChunktemplate_web||[]).push([[5470],{5470:(e,t,i)=>{"use strict";i.d(t,{tT:()=>w,oB:()=>_,zk:()=>S});var s=i(7368),n=i(9627),o=i(2655),r=i(9276);const d=["*"];let h=(()=>{class e{constructor(){this.hide=Function,this.setClass=Function}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275prov=s.Yz7({token:e,factory:e.\u0275fac}),e})(),a=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275prov=s.Yz7({token:e,factory:e.\u0275fac}),e})();const l={backdrop:!0,keyboard:!0,focus:!0,show:!1,ignoreBackdropClick:!1,class:"",animated:!0,initialState:{}},c=new s.OlP("override-default-config"),m="modal-scrollbar-measure",u="modal-open",p="in",g="show",f="backdrop-click";let b=(()=>{class e{constructor(e,t,i){this._element=t,this._renderer=i,this.isShown=!1,this.isModalHiding=!1,this.clickStartedInContent=!1,this.config=Object.assign({},e)}ngOnInit(){this.isAnimated&&this._renderer.addClass(this._element.nativeElement,"fade"),this._renderer.setStyle(this._element.nativeElement,"display","block"),setTimeout(()=>{this.isShown=!0,this._renderer.addClass(this._element.nativeElement,(0,n.XA)()?p:g)},this.isAnimated?150:0),document&&document.body&&(1===this.bsModalService.getModalsCount()&&(this.bsModalService.checkScrollbar(),this.bsModalService.setScrollbar()),this._renderer.addClass(document.body,u)),this._element.nativeElement&&this._element.nativeElement.focus()}onClickStarted(e){this.clickStartedInContent=e.target!==this._element.nativeElement}onClickStop(e){this.config.ignoreBackdropClick||"static"===this.config.backdrop||e.target!==this._element.nativeElement||this.clickStartedInContent?this.clickStartedInContent=!1:(this.bsModalService.setDismissReason(f),this.hide())}onPopState(){this.bsModalService.setDismissReason("browser-back-navigation-clicked"),this.hide()}onEsc(e){this.isShown&&(27!==e.keyCode&&"Escape"!==e.key||e.preventDefault(),this.config.keyboard&&this.level===this.bsModalService.getModalsCount()&&(this.bsModalService.setDismissReason("esc"),this.hide()))}ngOnDestroy(){this.isShown&&this.hide()}hide(){!this.isModalHiding&&this.isShown&&(this.isModalHiding=!0,this._renderer.removeClass(this._element.nativeElement,(0,n.XA)()?p:g),setTimeout(()=>{this.isShown=!1,document&&document.body&&1===this.bsModalService.getModalsCount()&&this._renderer.removeClass(document.body,u),this.bsModalService.hide(this.config.id),this.isModalHiding=!1},this.isAnimated?300:0))}}return e.\u0275fac=function(t){return new(t||e)(s.Y36(a),s.Y36(s.SBq),s.Y36(s.Qsj))},e.\u0275cmp=s.Xpm({type:e,selectors:[["modal-container"]],hostAttrs:["role","dialog","tabindex","-1",1,"modal"],hostVars:3,hostBindings:function(e,t){1&e&&s.NdJ("mousedown",function(e){return t.onClickStarted(e)})("mouseup",function(e){return t.onClickStop(e)})("popstate",function(){return t.onPopState()},!1,s.Jf7)("keydown.esc",function(e){return t.onEsc(e)},!1,s.Jf7),2&e&&s.uIk("aria-modal",!0)("aria-labelledby",t.config.ariaLabelledBy)("aria-describedby",t.config.ariaDescribedby)},ngContentSelectors:d,decls:3,vars:2,consts:[["role","document"],[1,"modal-content"]],template:function(e,t){1&e&&(s.F$t(),s.TgZ(0,"div",0),s.TgZ(1,"div",1),s.Hsn(2),s.qZA(),s.qZA()),2&e&&s.Tol("modal-dialog"+(t.config.class?" "+t.config.class:""))},encapsulation:2}),e})(),v=(()=>{class e{constructor(e,t){this._isShown=!1,this.element=e,this.renderer=t}get isAnimated(){return this._isAnimated}set isAnimated(e){this._isAnimated=e}get isShown(){return this._isShown}set isShown(e){this._isShown=e,e?this.renderer.addClass(this.element.nativeElement,"in"):this.renderer.removeClass(this.element.nativeElement,"in"),(0,n.XA)()||(e?this.renderer.addClass(this.element.nativeElement,"show"):this.renderer.removeClass(this.element.nativeElement,"show"))}ngOnInit(){this.isAnimated&&(this.renderer.addClass(this.element.nativeElement,"fade"),n.cQ.reflow(this.element.nativeElement)),this.isShown=!0}}return e.\u0275fac=function(t){return new(t||e)(s.Y36(s.SBq),s.Y36(s.Qsj))},e.\u0275cmp=s.Xpm({type:e,selectors:[["bs-modal-backdrop"]],hostAttrs:[1,"modal-backdrop"],decls:0,vars:0,template:function(e,t){},encapsulation:2}),e})(),_=(()=>{class e{constructor(e,t,i,n,o){this._element=e,this._renderer=i,this.onShow=new s.vpe,this.onShown=new s.vpe,this.onHide=new s.vpe,this.onHidden=new s.vpe,this._isShown=!1,this.isBodyOverflowing=!1,this.originalBodyPadding=0,this.scrollbarWidth=0,this.timerHideModal=0,this.timerRmBackDrop=0,this.isNested=!1,this.clickStartedInContent=!1,this._backdrop=n.createLoader(e,t,i),this._config=o||l}set config(e){this._config=this.getConfig(e)}get config(){return this._config}get isShown(){return this._isShown}onClickStarted(e){this.clickStartedInContent=e.target!==this._element.nativeElement}onClickStop(e){this.config.ignoreBackdropClick||"static"===this.config.backdrop||e.target!==this._element.nativeElement||this.clickStartedInContent?this.clickStartedInContent=!1:(this.dismissReason=f,this.hide(e))}onEsc(e){this._isShown&&(27!==e.keyCode&&"Escape"!==e.key||e.preventDefault(),this.config.keyboard&&(this.dismissReason="esc",this.hide()))}ngOnDestroy(){this.config=void 0,this._isShown&&(this._isShown=!1,this.hideModal(),this._backdrop.dispose())}ngOnInit(){this._config=this._config||this.getConfig(),setTimeout(()=>{this._config.show&&this.show()},0)}toggle(){return this._isShown?this.hide():this.show()}show(){this.dismissReason=null,this.onShow.emit(this),this._isShown||(clearTimeout(this.timerHideModal),clearTimeout(this.timerRmBackDrop),this._isShown=!0,this.checkScrollbar(),this.setScrollbar(),n.tj&&n.tj.body&&(n.tj.body.classList.contains(u)?this.isNested=!0:this._renderer.addClass(n.tj.body,u)),this.showBackdrop(()=>{this.showElement()}))}hide(e){e&&e.preventDefault(),this.onHide.emit(this),this._isShown&&(n.u9.clearTimeout(this.timerHideModal),n.u9.clearTimeout(this.timerRmBackDrop),this._isShown=!1,this._renderer.removeClass(this._element.nativeElement,p),(0,n.XA)()||this._renderer.removeClass(this._element.nativeElement,g),this._config.animated?this.timerHideModal=n.u9.setTimeout(()=>this.hideModal(),300):this.hideModal())}getConfig(e){return Object.assign({},this._config,e)}showElement(){this._element.nativeElement.parentNode&&this._element.nativeElement.parentNode.nodeType===Node.ELEMENT_NODE||n.tj&&n.tj.body&&n.tj.body.appendChild(this._element.nativeElement),this._renderer.setAttribute(this._element.nativeElement,"aria-hidden","false"),this._renderer.setAttribute(this._element.nativeElement,"aria-modal","true"),this._renderer.setStyle(this._element.nativeElement,"display","block"),this._renderer.setProperty(this._element.nativeElement,"scrollTop",0),this._config.animated&&n.cQ.reflow(this._element.nativeElement),this._renderer.addClass(this._element.nativeElement,p),(0,n.XA)()||this._renderer.addClass(this._element.nativeElement,g);const e=()=>{this._config.focus&&this._element.nativeElement.focus(),this.onShown.emit(this)};this._config.animated?setTimeout(e,300):e()}hideModal(){this._renderer.setAttribute(this._element.nativeElement,"aria-hidden","true"),this._renderer.setStyle(this._element.nativeElement,"display","none"),this.showBackdrop(()=>{this.isNested||(n.tj&&n.tj.body&&this._renderer.removeClass(n.tj.body,u),this.resetScrollbar()),this.resetAdjustments(),this.focusOtherModal(),this.onHidden.emit(this)})}showBackdrop(e){if(!this._isShown||!this.config.backdrop||this.backdrop&&this.backdrop.instance.isShown)if(!this._isShown&&this.backdrop){this.backdrop.instance.isShown=!1;const t=()=>{this.removeBackdrop(),e&&e()};this.backdrop.instance.isAnimated?this.timerRmBackDrop=n.u9.setTimeout(t,150):t()}else e&&e();else{if(this.removeBackdrop(),this._backdrop.attach(v).to("body").show({isAnimated:this._config.animated}),this.backdrop=this._backdrop._componentRef,!e)return;if(!this._config.animated)return void e();setTimeout(e,150)}}removeBackdrop(){this._backdrop.hide()}focusOtherModal(){if(null==this._element.nativeElement.parentElement)return;const e=this._element.nativeElement.parentElement.querySelectorAll(".in[bsModal]");e.length&&e[e.length-1].focus()}resetAdjustments(){this._renderer.setStyle(this._element.nativeElement,"paddingLeft",""),this._renderer.setStyle(this._element.nativeElement,"paddingRight","")}checkScrollbar(){this.isBodyOverflowing=n.tj.body.clientWidth<n.u9.innerWidth,this.scrollbarWidth=this.getScrollbarWidth()}setScrollbar(){n.tj&&(this.originalBodyPadding=parseInt(n.u9.getComputedStyle(n.tj.body).getPropertyValue("padding-right")||0,10),this.isBodyOverflowing&&(n.tj.body.style.paddingRight=`${this.originalBodyPadding+this.scrollbarWidth}px`))}resetScrollbar(){n.tj.body.style.paddingRight=`${this.originalBodyPadding}px`}getScrollbarWidth(){const e=this._renderer.createElement("div");this._renderer.addClass(e,m),this._renderer.appendChild(n.tj.body,e);const t=e.offsetWidth-e.clientWidth;return this._renderer.removeChild(n.tj.body,e),t}}return e.\u0275fac=function(t){return new(t||e)(s.Y36(s.SBq),s.Y36(s.s_b),s.Y36(s.Qsj),s.Y36(o.oj),s.Y36(c,8))},e.\u0275dir=s.lG2({type:e,selectors:[["","bsModal",""]],hostBindings:function(e,t){1&e&&s.NdJ("mousedown",function(e){return t.onClickStarted(e)})("mouseup",function(e){return t.onClickStop(e)})("keydown.esc",function(e){return t.onEsc(e)})},inputs:{config:"config"},outputs:{onShow:"onShow",onShown:"onShown",onHide:"onHide",onHidden:"onHidden"},exportAs:["bs-modal"]}),e})(),w=(()=>{class e{constructor(e,t,i){this.clf=t,this.modalDefaultOption=i,this.onShow=new s.vpe,this.onShown=new s.vpe,this.onHide=new s.vpe,this.onHidden=new s.vpe,this.isBodyOverflowing=!1,this.originalBodyPadding=0,this.scrollbarWidth=0,this.modalsCount=0,this.lastDismissReason=null,this.loaders=[],this._backdropLoader=this.clf.createLoader(null,null,null),this._renderer=e.createRenderer(null,null),this.config=i?Object.assign({},l,i):l}show(e,t){this.modalsCount++,this._createLoaders();const i=(null==t?void 0:t.id)||(new Date).getUTCMilliseconds();return this.config=this.modalDefaultOption?Object.assign({},l,this.modalDefaultOption,t):Object.assign({},l,t),this.config.id=i,this._showBackdrop(),this.lastDismissReason=null,this._showModal(e)}hide(e){1!==this.modalsCount&&null!=e||(this._hideBackdrop(),this.resetScrollbar()),this.modalsCount=this.modalsCount>=1&&null!=e?this.modalsCount-1:0,setTimeout(()=>{this._hideModal(e),this.removeLoaders(e)},this.config.animated?150:0)}_showBackdrop(){const e=this.config.backdrop||"static"===this.config.backdrop,t=!this.backdropRef||!this.backdropRef.instance.isShown;1===this.modalsCount&&(this.removeBackdrop(),e&&t&&(this._backdropLoader.attach(v).to("body").show({isAnimated:this.config.animated}),this.backdropRef=this._backdropLoader._componentRef))}_hideBackdrop(){this.backdropRef&&(this.backdropRef.instance.isShown=!1,setTimeout(()=>this.removeBackdrop(),this.config.animated?150:0))}_showModal(e){var t;const i=this.loaders[this.loaders.length-1];if(this.config&&this.config.providers)for(const s of this.config.providers)i.provide(s);const n=new h,o=i.provide({provide:a,useValue:this.config}).provide({provide:h,useValue:n}).attach(b).to("body");return n.hide=()=>o.instance.hide(),n.setClass=e=>{o.instance.config.class=e},n.onHidden=new s.vpe,n.onHide=new s.vpe,this.copyEvent(i.onBeforeHide,n.onHide),this.copyEvent(i.onHidden,n.onHidden),o.show({content:e,isAnimated:this.config.animated,initialState:this.config.initialState,bsModalService:this,id:this.config.id}),o.instance.level=this.getModalsCount(),n.content=i.getInnerComponent()||null,n.id=null===(t=o.instance.config)||void 0===t?void 0:t.id,n}_hideModal(e){if(null!=e){const t=this.loaders.findIndex(t=>t.instance.config.id===e),i=this.loaders[t];i&&i.hide(e)}else this.loaders.forEach(e=>{e.hide(e.instance.config.id)})}getModalsCount(){return this.modalsCount}setDismissReason(e){this.lastDismissReason=e}removeBackdrop(){this._renderer.removeClass(document.body,u),this._backdropLoader.hide(),this.backdropRef=null}checkScrollbar(){this.isBodyOverflowing=document.body.clientWidth<window.innerWidth,this.scrollbarWidth=this.getScrollbarWidth()}setScrollbar(){document&&(this.originalBodyPadding=parseInt(window.getComputedStyle(document.body).getPropertyValue("padding-right")||"0",10),this.isBodyOverflowing&&(document.body.style.paddingRight=`${this.originalBodyPadding+this.scrollbarWidth}px`))}resetScrollbar(){document.body.style.paddingRight=`${this.originalBodyPadding}px`}getScrollbarWidth(){const e=this._renderer.createElement("div");this._renderer.addClass(e,m),this._renderer.appendChild(document.body,e);const t=e.offsetWidth-e.clientWidth;return this._renderer.removeChild(document.body,e),t}_createLoaders(){const e=this.clf.createLoader(null,null,null);this.copyEvent(e.onBeforeShow,this.onShow),this.copyEvent(e.onShown,this.onShown),this.copyEvent(e.onBeforeHide,this.onHide),this.copyEvent(e.onHidden,this.onHidden),this.loaders.push(e)}removeLoaders(e){if(null!=e){const t=this.loaders.findIndex(t=>t.instance.config.id===e);t>=0&&(this.loaders.splice(t,1),this.loaders.forEach((e,t)=>{e.instance.level=t+1}))}else this.loaders.splice(0,this.loaders.length)}copyEvent(e,t){e.subscribe(e=>{t.emit(this.lastDismissReason||e)})}}return e.\u0275fac=function(t){return new(t||e)(s.LFG(s.FYo),s.LFG(o.oj),s.LFG(c,8))},e.\u0275prov=s.Yz7({token:e,factory:e.\u0275fac}),e})(),S=(()=>{class e{static forRoot(){return{ngModule:e,providers:[w,o.oj,r.sA]}}static forChild(){return{ngModule:e,providers:[w,o.oj,r.sA]}}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=s.oAB({type:e}),e.\u0275inj=s.cJS({}),e})()}}]);