(self.webpackChunktemplate_web=self.webpackChunktemplate_web||[]).push([[506],{4506:(e,t,a)=>{"use strict";a.r(t),a.d(t,{TypeTemplatesModule:()=>v});var i=a(1116),l=a(2320),n=a(4391),s=a(1041),o=a(6050),r=a(5470),p=a(7368),c=a(1392),m=a(407),d=a(6189),g=a(6507);function u(e,t){if(1&e){const e=p.EpF();p.TgZ(0,"div",8),p.NdJ("click",function(t){return p.CHM(e),p.oxw().OnTemplateSelected(t)}),p._UZ(1,"img",9),p.TgZ(2,"div",10),p._uU(3),p.qZA(),p.qZA()}if(2&e){const e=t.$implicit;p.xp6(1),p.s9C("src","assets/icons/"+e.icon,p.LSH),p.xp6(2),p.hij(" ",e.nickname?e.nickname:e.name," ")}}function h(e,t){if(1&e){const e=p.EpF();p.TgZ(0,"app-template-preview-modal",11),p.NdJ("onCloseModal",function(){return p.CHM(e),p.oxw().CloseModal()})("onUseTemplate",function(t){return p.CHM(e),p.oxw().CreateStrategyBasedOnTemplate(t)}),p.qZA()}if(2&e){const e=p.oxw();p.Q6J("template",e.selectedTemplate)}}let f=(()=>{class e{constructor(e,t,a,i,l){this.api=e,this.nav=t,this.modalService=a,this.activatedRoute=i,this.toast=l,this.modalRef=null,this.templateType=null,this.selectedTemplate=null,this.grade=null,this.group=null,this.templateTypeId=0}ngOnInit(){this.GetParams()}GetParams(){this.activatedRoute.params.subscribe(e=>{this.grade=e.grade,this.group=e.group,this.templateTypeId=e.templateTypeId,this.GetTemplatesByType()})}OpenModal(e){this.modalRef=this.modalService.show(e,{backdrop:"static"})}CloseModal(){this.modalRef&&this.modalRef.hide()}GetTemplatesByType(){this.api.Get(`/TemplateTypes/${this.templateTypeId}/WithTemplates`).subscribe(e=>{this.templateType=e},e=>{console.error("Erro getting templates",e)})}GoBack(){let e="plantillas";this.grade&&this.group&&(e=`grado/${this.grade}/grupo/${this.group}/${e}`),this.nav.GoToUserRoute(e)}OnTemplateSelected(e){this.selectedTemplate=e,this.nav.GoToUserRoute(`plantillas/crear/${e.id}`)}CreateStrategyBasedOnTemplate(e){var t;this.CloseModal();let a={templateId:e.id,userId:null===(t=this.api.GetUser())||void 0===t?void 0:t.id,grade:this.grade?this.grade:null,group:this.group?this.group:null};this.api.Post("/Strategies",{strategy:a}).subscribe(e=>{this.nav.GoToUserRoute(`estrategias/${e.id}/materias`)},e=>{console.error("Error creating strategy",e),this.toast.ShowError("Error al crear la estrategia")})}}return e.\u0275fac=function(t){return new(t||e)(p.Y36(c.sM),p.Y36(m.f),p.Y36(r.tT),p.Y36(l.gz),p.Y36(d.k))},e.\u0275cmp=p.Xpm({type:e,selectors:[["app-type-templates"]],decls:12,vars:2,consts:[[1,"content"],[1,"title-row"],["src","assets/icons/back-arrow.png","alt","back",1,"clickeable",3,"click"],[1,"title"],[1,"d-flex","justify-content-center"],[1,"templates"],["class","template clickeable",3,"click",4,"ngFor","ngForOf"],["templatePreviewModal",""],[1,"template","clickeable",3,"click"],["alt","template-icon",1,"template-icon",3,"src"],[1,"template-name"],[3,"template","onCloseModal","onUseTemplate"]],template:function(e,t){1&e&&(p.TgZ(0,"div",0),p.TgZ(1,"div",1),p.TgZ(2,"div"),p.TgZ(3,"img",2),p.NdJ("click",function(){return t.GoBack()}),p.qZA(),p.qZA(),p.TgZ(4,"div",3),p._uU(5),p.qZA(),p._UZ(6,"div"),p.qZA(),p.TgZ(7,"div",4),p.TgZ(8,"div",5),p.YNc(9,u,4,2,"div",6),p.qZA(),p.qZA(),p.qZA(),p.YNc(10,h,1,1,"ng-template",null,7,p.W1O)),2&e&&(p.xp6(5),p.hij(" ",null==t.templateType?null:t.templateType.name," "),p.xp6(4),p.Q6J("ngForOf",null==t.templateType?null:t.templateType.templates))},directives:[i.sg,g.f],styles:[".title-row[_ngcontent-%COMP%]{display:flex;height:auto;justify-content:space-between;align-items:center}.title[_ngcontent-%COMP%]{margin-bottom:0}.templates[_ngcontent-%COMP%]{justify-self:center;display:flex;max-width:900px;flex-wrap:wrap;justify-content:space-around;margin-top:2rem}.template[_ngcontent-%COMP%]{display:flex;width:220px;justify-content:center;align-items:center;flex-direction:column;background-color:#f4f5f7;padding:27px 1rem;border-radius:6px;height:200px;margin:2rem 1rem}.template-icon[_ngcontent-%COMP%]{width:-webkit-min-content;width:min-content}.template-name[_ngcontent-%COMP%]{margin-top:10px;color:#1081fb;font-size:1.5rem;font-weight:700;line-height:30px;text-align:center}"]}),e})();var T=a(882);const y=[{path:"",component:f}];let v=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=p.oAB({type:e}),e.\u0275inj=p.cJS({imports:[[s.u5,i.ez,n.A0,s.UX,o.G,r.zk.forRoot(),T.c,l.Bz.forChild(y)]]}),e})()}}]);