(self.webpackChunktemplate_web=self.webpackChunktemplate_web||[]).push([[130],{130:(t,e,a)=>{"use strict";a.r(e),a.d(e,{StrategyCreationFormModule:()=>G});var s=a(1116),n=a(2894),i=a(4391),o=a(1041),l=a(6050),p=a(5470),r=a(7899),c=a(5148),m=a(5422),g=a(3752),h=a(7368),u=a(1392),d=a(407),f=a(6189),v=a(8451);function k(t,e){if(1&t){const t=h.EpF();h.TgZ(0,"div"),h.TgZ(1,"app-template-based-on-form",2),h.NdJ("goBackEvent",function(){return h.CHM(t),h.oxw().GoBack()}),h.qZA(),h.qZA()}if(2&t){const t=h.oxw();h.xp6(1),h.Q6J("template",t.template)}}const b=[{path:"",component:(()=>{class t{constructor(t,e,a,s){this.api=t,this.nav=e,this.activatedRoute=a,this.toast=s,this.template=null,this.selectedTemplate=null,this.templateId=0,this.loading={getting:!0}}ngOnInit(){this.GetParams()}GoBack(){this.nav.GoToUserRoute(`plantillas/${this.templateId}`)}GetParams(){this.activatedRoute.params.subscribe(t=>{this.templateId=t.templateId,this.GetTemplate()})}GetTemplate(){this.api.Get(`/Templates/${this.templateId}`).subscribe(t=>{this.template=t,this.loading.getting=!1},t=>{console.error("Erro getting templates",t),this.loading.getting=!1})}}return t.\u0275fac=function(e){return new(e||t)(h.Y36(u.sM),h.Y36(d.f),h.Y36(n.gz),h.Y36(f.k))},t.\u0275cmp=h.Xpm({type:t,selectors:[["app-strategy-creation-form"]],decls:2,vars:1,consts:[[1,"content"],[4,"ngIf"],[3,"template","goBackEvent"]],template:function(t,e){1&t&&(h.TgZ(0,"div",0),h.YNc(1,k,2,1,"div",1),h.qZA()),2&t&&(h.xp6(1),h.Q6J("ngIf",!e.loading.getting))},directives:[s.O5,v.V],styles:[""]}),t})()}];let G=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=h.oAB({type:t}),t.\u0275inj=h.cJS({imports:[[o.u5,s.ez,i.A0,o.UX,l.G,p.zk.forRoot(),c.s,g._,m.n,r.X,n.Bz.forChild(b)]]}),t})()}}]);