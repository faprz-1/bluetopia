(self.webpackChunktemplate_web=self.webpackChunktemplate_web||[]).push([[6065],{6065:(t,e,i)=>{"use strict";i.r(e),i.d(e,{StrategyModule:()=>y});var n=i(1116),a=i(2894),s=i(4391),r=i(1041),o=i(6050),l=i(5470),g=i(9188),c=i(7368),u=i(1392),p=i(6189),d=i(407);const m=["templateTopicSelect"],h=[{path:"",component:(()=>{class t{constructor(t,e,i,n){this.activatedRoute=t,this.api=e,this.toast=i,this.nav=n,this.strategyId=null,this.strategy=null,this.templateTopics=[],this.loading={getting:!0},this.strategyForm=new r.cw({id:new r.NI(null,[]),topic:new r.NI(null,[r.kI.required]),title:new r.NI(null,[r.kI.required]),generatingQuestion:new r.NI(null,[r.kI.required]),subjects:new r.NI([],r.kI.required)}),this.AddTemplateTopic=t=>{var e;let i={name:t,userId:null===(e=this.api.GetUser())||void 0===e?void 0:e.id},n=this.strategyForm.get("topic");this.loading.templateTopic=!0,null==n||n.disable(),this.api.Post("/TemplateTopics",{templateTopic:i}).subscribe(t=>{var e;this.templateTopics=this.templateTopics.concat([t]),null==n||n.setValue(t.name),this.loading.templateTopic=!1,null==n||n.enable(),null===(e=this.templateTopicSelect)||void 0===e||e.close()},t=>{console.error("Error creatong templateTopic",t),this.loading.templateTopic=!1,null==n||n.enable()})}}get strategyGroup(){var t,e,i,n,a,s,r,o;return(null===(e=null===(t=this.strategy)||void 0===t?void 0:t.strategyGroup)||void 0===e?void 0:e.group)&&(null===(n=null===(i=this.strategy)||void 0===i?void 0:i.strategyGroup)||void 0===n?void 0:n.grade)?`${null===(s=null===(a=this.strategy)||void 0===a?void 0:a.strategyGroup)||void 0===s?void 0:s.grade.name}\xb0${null===(o=null===(r=this.strategy)||void 0===r?void 0:r.strategyGroup)||void 0===o?void 0:o.group.name}`:"Sin grupo"}ngOnInit(){this.GetTemplateTopics(),this.GetParams()}GoBack(){this.nav.GoToUserRoute("mis-estrategias")}GetParams(){this.activatedRoute.params.subscribe(t=>{this.strategyId=t.strategyId,this.GetStrategy()})}GetStrategy(){this.api.Get(`/Strategies/${this.strategyId}`).subscribe(t=>{this.strategy=t,this.InitializeFormData(),this.loading.getting=!1},t=>{console.error("Error getting strategy data",t),this.loading.getting=!1})}InitializeFormData(){this.strategyForm.setValue({id:this.strategy.id?this.strategy.id:null,topic:this.strategy.topic?this.strategy.topic:null,title:this.strategy.title?this.strategy.title:null,generatingQuestion:this.strategy.generatingQuestion?this.strategy.generatingQuestion:null,subjects:this.strategy.subjects?this.strategy.subjects:[]})}GetTemplateTopics(){var t;this.api.Get(`/TemplateTopics/OfSchool/${null===(t=this.api.GetUser())||void 0===t?void 0:t.schoolId}`).subscribe(t=>{this.templateTopics=t},t=>{console.error("Erro getting template topics",t)})}GoToEditDetails(){this.nav.GoToUserRoute("plantillas/"+this.strategy.templateId+"/crear/"+this.strategy.id)}SaveStrategy(){return new Promise((t,e)=>{this.api.Patch(`/Strategies/${this.strategyId}`,{strategy:this.strategyForm.value}).subscribe(e=>{this.strategy=e,this.InitializeFormData(),this.toast.ShowSuccess("Cambios guardados correctamente"),t(!0)},e=>{this.toast.ShowError("Error al guardar cambios, intente nuevamente"),console.error("Error updating strategy",e),t(!1)})})}}return t.\u0275fac=function(e){return new(e||t)(c.Y36(a.gz),c.Y36(u.sM),c.Y36(p.k),c.Y36(d.f))},t.\u0275cmp=c.Xpm({type:t,selectors:[["app-strategy"]],viewQuery:function(t,e){if(1&t&&c.Gf(m,5),2&t){let t;c.iGM(t=c.CRH())&&(e.templateTopicSelect=t.first)}},decls:42,vars:7,consts:[[1,"content"],[1,"title-row","mb-5"],["src","assets/icons/back-arrow.png","alt","back",1,"clickeable",3,"click"],[1,"nav-row"],["src","assets/icons/right-chevron.svg"],[1,"category"],[1,"mb-5"],[1,"btn","btn-primary",3,"click"],[1,"strategy-form",3,"formGroup"],[1,"d-flex","align-items-center","justify-content-between","align-self-stretch","text-uppercase"],[1,"m-0"],[1,"d-flex","flex-column","w-100"],[1,"input-container"],["bindLabel","name","bindValue","name","placeholder","Tem\xe1tica","addTagText","Agregar","formControlName","topic",1,"form-control",3,"items","addTag","loading"],["templateTopicSelect",""],["type","text","placeholder","T\xedtulo","formControlName","title",1,"form-control","no-icon"],[1,"d-flex","align-items-center","justify-content-between","flex-wrap","w-100",2,"gap","24px"],[1,"btn","btn-outline-success","btn-control",3,"click"],[1,"btn","btn-success","btn-control",3,"click"]],template:function(t,e){1&t&&(c.TgZ(0,"div",0),c.TgZ(1,"div",1),c.TgZ(2,"div"),c.TgZ(3,"img",2),c.NdJ("click",function(){return e.GoBack()}),c.qZA(),c.qZA(),c.TgZ(4,"div",3),c.TgZ(5,"span"),c._uU(6,"Mis Estrategias"),c.qZA(),c._UZ(7,"img",4),c.TgZ(8,"span"),c._uU(9),c.qZA(),c._UZ(10,"img",4),c.TgZ(11,"span",5),c._uU(12),c.qZA(),c.qZA(),c.qZA(),c.TgZ(13,"div",6),c.TgZ(14,"button",7),c.NdJ("click",function(){return e.GoToEditDetails()}),c._uU(15," Editar paso por paso "),c.qZA(),c.qZA(),c.TgZ(16,"div",8),c.TgZ(17,"div",9),c.TgZ(18,"label",10),c._uU(19),c.qZA(),c.qZA(),c.TgZ(20,"div",11),c.TgZ(21,"label"),c._uU(22,"Tem\xe1tica"),c.qZA(),c.TgZ(23,"div",12),c.TgZ(24,"div",12),c._UZ(25,"ng-select",13,14),c.qZA(),c.qZA(),c.qZA(),c.TgZ(27,"div",11),c.TgZ(28,"label"),c._uU(29,"T\xedtulo"),c.qZA(),c.TgZ(30,"div",12),c._UZ(31,"input",15),c.qZA(),c.qZA(),c.TgZ(32,"div",11),c.TgZ(33,"label"),c._uU(34,"Pregunta generadora"),c.qZA(),c.TgZ(35,"div",12),c._UZ(36,"input",15),c.qZA(),c.qZA(),c.TgZ(37,"div",16),c.TgZ(38,"button",17),c.NdJ("click",function(){return e.GoBack()}),c._uU(39," No guardar cambios "),c.qZA(),c.TgZ(40,"button",18),c.NdJ("click",function(){return e.SaveStrategy()}),c._uU(41," Guardar "),c.qZA(),c.qZA(),c.qZA(),c.qZA()),2&t&&(c.xp6(9),c.Oqu(null!=e.strategy&&null!=e.strategy.template&&e.strategy.template.nickname?null==e.strategy||null==e.strategy.template?null:e.strategy.template.nickname:null==e.strategy||null==e.strategy.template?null:e.strategy.template.name),c.xp6(3),c.Oqu(null==e.strategy?null:e.strategy.title),c.xp6(4),c.Q6J("formGroup",e.strategyForm),c.xp6(3),c.Oqu(e.strategyGroup),c.xp6(6),c.Q6J("items",e.templateTopics)("addTag",e.AddTemplateTopic)("loading",e.loading.templateTopic))},directives:[r.JL,r.sg,s.w9,r.JJ,r.u,r.Fj],styles:[".category[_ngcontent-%COMP%]{color:var(--green-1,#26d7a4);font-size:32px;font-weight:700}.category[_ngcontent-%COMP%], .strategy-form[_ngcontent-%COMP%]{font-family:Mulish;font-style:normal;line-height:normal}.strategy-form[_ngcontent-%COMP%]{display:inline-flex;flex-direction:column;align-items:flex-start;justify-content:flex-start;grid-gap:24px;gap:24px;width:540px;max-width:100%;color:var(--gray-1,#3d5e81);font-size:16px;font-weight:500}.strategy-form[_ngcontent-%COMP%]   .input-container[_ngcontent-%COMP%]{margin-bottom:0}.strategy-form[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{color:var(--blue-1,#1081fb);font-size:20px;font-weight:700}.strategy-form[_ngcontent-%COMP%]   .form-control[_ngcontent-%COMP%]{font-size:16px;font-weight:500}.strategy-form[_ngcontent-%COMP%]   .btn-control[_ngcontent-%COMP%]{flex:1 0 calc(50% - 12px);min-width:-webkit-max-content;min-width:max-content}.subjects[_ngcontent-%COMP%]{flex-direction:column;align-items:flex-start;grid-gap:6px;gap:6px}.subjects[_ngcontent-%COMP%], .subjects[_ngcontent-%COMP%]   .subject[_ngcontent-%COMP%]{display:flex;align-self:stretch}.subjects[_ngcontent-%COMP%]   .subject[_ngcontent-%COMP%]{justify-content:space-between;border-radius:6px;align-items:center;padding:4px 12px;min-height:46px;background:#f4f5f7}"]}),t})()}];let y=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=c.oAB({type:t}),t.\u0275inj=c.cJS({imports:[[r.u5,n.ez,s.A0,g.b,r.UX,o.G,l.zk.forRoot(),a.Bz.forChild(h)]]}),t})()}}]);