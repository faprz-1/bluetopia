(self.webpackChunktemplate_web=self.webpackChunktemplate_web||[]).push([[751],{9952:(t,e,n)=>{"use strict";n.r(e),n.d(e,{CreateStrategyModule:()=>M});var i=n(1116),a=n(2894),o=n(4391),l=n(1041),s=n(6050),g=n(5470),r=n(7899),c=n(7368),d=n(1392),p=n(407),m=n(6189),f=n(4187);function u(t,e){1&t&&c._UZ(0,"div",40)}function Z(t,e){1&t&&c._UZ(0,"div",41)}function v(t,e){if(1&t){const t=c.EpF();c.TgZ(0,"div",20),c.TgZ(1,"div",21),c.TgZ(2,"div",22),c._UZ(3,"img",23),c.TgZ(4,"div",24),c._uU(5),c.qZA(),c.qZA(),c.TgZ(6,"div",25),c._uU(7),c.qZA(),c.qZA(),c.TgZ(8,"div",26),c.TgZ(9,"div",27),c._uU(10," Grado de dificultad para planear: "),c.qZA(),c.TgZ(11,"div",28),c._uU(12),c.qZA(),c.TgZ(13,"div",29),c.YNc(14,u,1,0,"div",30),c.YNc(15,Z,1,0,"div",31),c.qZA(),c.qZA(),c.TgZ(16,"div",26),c.TgZ(17,"div",32),c._UZ(18,"img",33),c.qZA(),c.TgZ(19,"div",34),c._uU(20," Tiempo de clases estimado: "),c.qZA(),c.TgZ(21,"div"),c._uU(22),c.qZA(),c.qZA(),c.TgZ(23,"div",26),c.TgZ(24,"div",32),c._UZ(25,"img",35),c.qZA(),c.TgZ(26,"div",34),c._uU(27," Edades sugeridas: "),c.qZA(),c.TgZ(28,"div"),c._uU(29),c.qZA(),c.qZA(),c.TgZ(30,"div",26),c.TgZ(31,"div",32),c._UZ(32,"img",36),c.qZA(),c.TgZ(33,"div",34),c._uU(34," Asignaturas sugeridas: "),c.qZA(),c.TgZ(35,"div"),c._uU(36),c.qZA(),c.qZA(),c.TgZ(37,"div",26),c.TgZ(38,"div",32),c._UZ(39,"img",37),c.qZA(),c.TgZ(40,"div",34),c._uU(41," Competencias que desarrolla especialmente: "),c.qZA(),c.TgZ(42,"div"),c._uU(43),c.qZA(),c.qZA(),c.TgZ(44,"div",38),c.TgZ(45,"button",39),c.NdJ("click",function(){return c.CHM(t),c.oxw().CreateStrategyBasedOnTemplate()}),c._uU(46," Crear nueva "),c.qZA(),c.qZA(),c.qZA()}if(2&t){const t=c.oxw();c.xp6(3),c.s9C("src","assets/icons/"+t.template.icon,c.LSH),c.xp6(2),c.hij(" ",t.template.nickname?t.template.nickname:t.template.name," "),c.xp6(2),c.hij(" ",t.template.description," "),c.xp6(5),c.hij(" ",t.template.difficulty+" de 5"," "),c.xp6(2),c.Q6J("ngForOf",t.GetArray(t.template.difficulty)),c.xp6(1),c.Q6J("ngForOf",t.GetArray(5-t.template.difficulty)),c.xp6(7),c.hij(" ",t.template.estimatedClasses," "),c.xp6(7),c.hij(" ",t.template.suggestedAges," "),c.xp6(7),c.hij(" ",t.template.suggestedSubjects," "),c.xp6(7),c.hij(" ",t.template.skillsDeveloped," "),c.xp6(2),c.Q6J("disabled",t.loading.creating)}}const _=function(){return[]},x=function(){return{backdrop:"static",keyboard:!1}},h=[{path:"",component:(()=>{class t{constructor(t,e,n,i,a){this.api=t,this.nav=e,this.modalService=n,this.activatedRoute=i,this.toast=a,this.modalRef=null,this.template=null,this.selectedTemplate=null,this.templateId=0,this.loading={creating:!1,getting:!0}}ngOnInit(){this.GetParams()}GetParams(){this.activatedRoute.params.subscribe(t=>{this.templateId=t.templateId,this.GetTemplate()})}OpenModal(t){this.modalRef=this.modalService.show(t,{backdrop:"static"})}CloseModal(){this.modalRef&&this.modalRef.hide()}GetTemplate(){this.api.Get(`/Templates/${this.templateId}`).subscribe(t=>{this.template=t,this.loading.getting=!1},t=>{console.error("Erro getting templates",t),this.loading.getting=!1})}GoBack(){this.nav.GoToUserRoute("plantillas")}CreateStrategyBasedOnTemplate(){var t;let e={templateId:this.template.id,userId:null===(t=this.api.GetUser())||void 0===t?void 0:t.id,grade:null,group:null};this.loading.creating=!0,this.api.Post("/Strategies",{strategy:e}).subscribe(t=>{let e=`plantillas/${this.templateId}/crear/${t.id}`;this.loading.creating=!1,this.nav.GoToUserRoute(e)},t=>{console.error("Error creating strategy",t),this.toast.ShowError("Error al crear la estrategia"),this.loading.creating=!1})}GetArray(t){return Array(t).fill(0)}GoToNewStrategyForm(){this.nav.GoToUserRoute(`plantillas/${this.templateId}/crear`)}}return t.\u0275fac=function(e){return new(e||t)(c.Y36(d.sM),c.Y36(p.f),c.Y36(g.tT),c.Y36(a.gz),c.Y36(m.k))},t.\u0275cmp=c.Xpm({type:t,selectors:[["app-create-strategy"]],decls:31,vars:6,consts:[[1,"content"],[1,"title-row"],["src","assets/icons/back-arrow.png","alt","back",1,"clickeable",3,"click"],[1,"title","mb-0"],["src","assets/icons/right-chevron.svg"],["class","template-info mt-5",4,"ngIf"],[1,"tamplates-suggestions","my-5"],[1,"info"],[1,"instructions"],[1,"title"],[1,"text"],[1,"input-container"],["bindLabel","name","placeholder","Tematica",1,"ng-select","form-control",3,"items"],[1,"w-100"],["bsModal","","tabindex","-1","role","dialog","aria-labelledby","first-time-configuration",1,"modal","fade",3,"config"],["templatePreviewModal","bs-modal"],[1,"modal-dialog","modal-lg"],[1,"modal-header"],[1,"modal-content"],[1,"modal-body","template-preview-modal"],[1,"template-info","mt-5"],[1,"description"],[1,"template"],["alt","template-icon",1,"template-icon",3,"src"],[1,"template-name"],[1,"description-text"],[1,"info-row"],[1,"info-topic","no-icon"],[1,""],[1,"difficulty-container"],["class","difficulty-bar",4,"ngFor","ngForOf"],["class","difficulty-bar disabled",4,"ngFor","ngForOf"],[1,"icon-container"],["src","assets/icons/class.svg","alt",""],[1,"info-topic"],["src","assets/icons/student-metric.svg","alt",""],["src","assets/icons/books-collection.svg","alt",""],["src","assets/icons/brain.svg","alt",""],[1,"d-flex","justify-content-end","w-100","mt-4"],[1,"btn","btn-primary",3,"disabled","click"],[1,"difficulty-bar"],[1,"difficulty-bar","disabled"]],template:function(t,e){1&t&&(c.TgZ(0,"div",0),c.TgZ(1,"div",1),c.TgZ(2,"div"),c.TgZ(3,"img",2),c.NdJ("click",function(){return e.GoBack()}),c.qZA(),c.qZA(),c.TgZ(4,"div",3),c.TgZ(5,"span"),c._uU(6,"Nueva estrategia"),c.qZA(),c._UZ(7,"img",4),c.TgZ(8,"span"),c._uU(9),c.qZA(),c.qZA(),c._UZ(10,"div"),c.qZA(),c.YNc(11,v,47,11,"div",5),c.TgZ(12,"div",6),c.TgZ(13,"div",7),c.TgZ(14,"div",8),c.TgZ(15,"div",9),c._uU(16,"Plantillas"),c.qZA(),c.TgZ(17,"div",10),c._uU(18," Otros profesores han creado estrategias que podr\xe1s utilizar y modificar para tu clase "),c.qZA(),c.TgZ(19,"div",10),c._uU(20," A continuaci\xf3n puede buscar plantillas por tem\xe1ticas "),c.qZA(),c.qZA(),c.TgZ(21,"div",11),c._UZ(22,"ng-select",12),c.qZA(),c.qZA(),c.TgZ(23,"div",13),c._UZ(24,"app-suggested-strategies-slider"),c.qZA(),c.qZA(),c.qZA(),c.TgZ(25,"div",14,15),c.TgZ(27,"div",16),c._UZ(28,"div",17),c.TgZ(29,"div",18),c._UZ(30,"div",19),c.qZA(),c.qZA(),c.qZA()),2&t&&(c.xp6(9),c.Oqu(null!=e.template&&e.template.nickname?null==e.template?null:e.template.nickname:null==e.template?null:e.template.name),c.xp6(2),c.Q6J("ngIf",!e.loading.getting),c.xp6(11),c.Q6J("items",c.DdM(4,_)),c.xp6(3),c.Q6J("config",c.DdM(5,x)))},directives:[i.O5,o.w9,f.H,g.oB,i.sg],styles:[".title-row[_ngcontent-%COMP%]{grid-gap:24px;gap:24px}.title[_ngcontent-%COMP%], .title-row[_ngcontent-%COMP%]{display:flex;align-items:center}.title[_ngcontent-%COMP%]{color:var(--gray-1,#3d5e81);font-size:24px;font-family:Mulish;font-weight:700;grid-gap:14px;gap:14px}.template-info[_ngcontent-%COMP%]{display:flex;flex-direction:column;grid-gap:8px;gap:8px;align-items:flex-start}.template-info[_ngcontent-%COMP%]   .description[_ngcontent-%COMP%]{display:flex;align-items:center;grid-gap:22px;gap:22px;width:100%}.template-info[_ngcontent-%COMP%]   .description[_ngcontent-%COMP%]   .template[_ngcontent-%COMP%]{padding:0;min-width:160px;height:125px;margin:0}.template-info[_ngcontent-%COMP%]   .description[_ngcontent-%COMP%]   .template[_ngcontent-%COMP%]   .template-name[_ngcontent-%COMP%]{color:var(--blue-1,#1081fb);text-align:center;font-size:18px;font-family:Mulish;font-style:normal;font-weight:700;line-height:normal;margin:0}.template-info[_ngcontent-%COMP%]   .description[_ngcontent-%COMP%]   .description-text[_ngcontent-%COMP%], .template-info[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%]{color:var(--gray-1,#3d5e81);font-size:16px;font-family:Mulish;font-style:normal;font-weight:400;line-height:normal}.template-info[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:flex-start;grid-gap:12px;gap:12px}.template-info[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%]   .info-topic[_ngcontent-%COMP%]{width:240px;max-width:100%;padding:0}.template-info[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%]   .no-icon[_ngcontent-%COMP%]{width:calc(240px + 28px + 12px);padding:0!important}.template-info[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%]   .icon-container[_ngcontent-%COMP%]{display:flex;justify-content:flex-end;width:28px}.tamplates-suggestions[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:flex-start;grid-gap:24px;gap:24px;padding:24px;border-radius:12px;background:var(--blue-light,#f2f8ff)}.tamplates-suggestions[_ngcontent-%COMP%]   .info[_ngcontent-%COMP%]{display:flex;flex-direction:column;grid-gap:16px;gap:16px}.tamplates-suggestions[_ngcontent-%COMP%]   .info[_ngcontent-%COMP%]   .instructions[_ngcontent-%COMP%]{display:flex;flex-direction:column;grid-gap:8px;gap:8px;color:var(--gray-1,#3d5e81);font-family:Mulish;font-style:normal;font-weight:400;line-height:normal}.tamplates-suggestions[_ngcontent-%COMP%]   .info[_ngcontent-%COMP%]   .instructions[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{font-size:24px}.tamplates-suggestions[_ngcontent-%COMP%]   .info[_ngcontent-%COMP%]   .instructions[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]{font-size:16px}.tamplates-suggestions[_ngcontent-%COMP%]   .ng-select[_ngcontent-%COMP%]{border-radius:6px;border:1px solid var(--gray-1,#3d5e81);background:#fff}.template-preview-modal[_ngcontent-%COMP%]{display:inline-flex;padding:24px;flex-direction:column;align-items:flex-start;grid-gap:24px;gap:24px}"]}),t})()}];let M=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=c.oAB({type:t}),t.\u0275inj=c.cJS({imports:[[l.u5,i.ez,o.A0,l.UX,s.G,g.zk.forRoot(),r.X,a.Bz.forChild(h)]]}),t})()}}]);