(self.webpackChunktemplate_web=self.webpackChunktemplate_web||[]).push([[4575],{4575:(e,t,s)=>{"use strict";s.r(t),s.d(t,{StrategiesModule:()=>T});var r=s(1116),i=s(2894),n=s(4391),a=s(1041),o=s(6050),g=s(5470),c=s(7368),l=s(1392),d=s(407),u=s(7390);function h(e,t){if(1&e){const e=c.EpF();c.TgZ(0,"div",21),c.TgZ(1,"app-strategy-card",22),c.NdJ("onChange",function(t){return c.CHM(e),c.oxw(2).OnStrategyChange(t)}),c.qZA(),c.qZA()}if(2&e){const e=t.$implicit;c.xp6(1),c.Q6J("strategy",e)}}function p(e,t){if(1&e&&(c.TgZ(0,"div",5),c.YNc(1,h,2,1,"div",20),c.qZA()),2&e){const e=c.oxw();c.xp6(1),c.Q6J("ngForOf",e.strategies)}}function f(e,t){1&e&&(c.TgZ(0,"div",23),c._uU(1," No tiene estrategias creadas, cree una nueva estrategia "),c.qZA())}let m=(()=>{class e{constructor(e,t){this.api=e,this.nav=t,this.user=null,this.startegyStatuses=[],this.grades=[],this.groups=[],this.gradeSelected=null,this.groupSelected=null,this.strategies=[],this.loading={}}ngOnInit(){this.user=this.api.GetUser(),this.GetStrategyStatuses(),this.GetGrades()}GetStrategyStatuses(){this.api.Get("/StrategyStatuses").subscribe(e=>{this.startegyStatuses=e},e=>{console.error("Error statuses",e)})}GetGrades(){this.loading.getting=!0,this.api.Get("/Grades").subscribe(e=>{this.grades=e,this.GetGroups()},e=>{console.error("Error getting grades",e),this.loading.getting=!1})}GetGroups(){this.api.Get("/Groups").subscribe(e=>{this.groups=e,this.GetStrategies()},e=>{console.error("Error getting groups",e),this.loading.getting=!1})}GetStrategies(){let e;switch(this.user.role.name){case"School":e=`/Strategies/OfSchool/${this.user?this.user.schoolId:0}`;break;case"Teacher":e=`/Strategies/OfTeacher/${this.user?this.user.id:0}`;break;default:e=""}this.api.Get(e).subscribe(e=>{this.strategies=e},e=>{console.error("Erro getting teacher strategies",e)})}OnStrategyChange(e){switch(e.type){case"delete":let t=this.strategies.findIndex(t=>t.id==e.data.strategyId);-1!=t&&this.strategies.splice(t,1)}}GoToTeams(e){this.nav.GoToUserRoute(`mis-estrategias/${e.id}/equipos`)}GoToTeamsProgress(e){this.nav.GoToUserRoute(`mis-estrategias/${e.id}/progreso-equipos`)}GoToCalendar(e){this.nav.GoToUserRoute(`estrategias/${e.id}/calendario`)}}return e.\u0275fac=function(t){return new(t||e)(c.Y36(l.sM),c.Y36(d.f))},e.\u0275cmp=c.Xpm({type:e,selectors:[["app-strategies"]],decls:25,vars:8,consts:[[1,"content"],[1,"row","mb-5"],[1,"col-12","d-flex","h-100","align-items-center","justify-content-between","header-col"],[1,"page-title"],[1,"btn","btn-primary",3,"click"],[1,"row"],[1,"col-12","d-flex","align-items-center","filters","mb-4"],[1,"flex-grow-1","filter"],[1,"input-container"],[1,"input-icon-container","icon-container-right","text-center"],["src","assets/icons/search-small.png"],["type","text","placeholder","Buscar",1,"form-control","icon-right"],[1,"select-container","filter"],["bindLabel","name","placeholder","Grado",1,"ng-select","form-control",3,"items","ngModel","change","ngModelChange"],["bindLabel","name","placeholder","Grupo",1,"ng-select","form-control",3,"items","ngModel","change","ngModelChange"],[1,"select-container","big","filter"],["bindLabel","name","placeholder","Tipo de estrategia",1,"ng-select","form-control","placeholder-primary",3,"items"],["bindLabel","name","placeholder","Estado",1,"ng-select","form-control","placeholder-primary",3,"items"],["class","row",4,"ngIf","ngIfElse"],["noStrategies",""],["class","col-12 col-md-6 col-lg-4 mb-1",4,"ngFor","ngForOf"],[1,"col-12","col-md-6","col-lg-4","mb-1"],[3,"strategy","onChange"],[1,"text-center","no-items-message"]],template:function(e,t){if(1&e&&(c.TgZ(0,"div",0),c.TgZ(1,"div",1),c.TgZ(2,"div",2),c.TgZ(3,"div",3),c._uU(4," Mis estrategias "),c.qZA(),c.TgZ(5,"button",4),c.NdJ("click",function(){return t.nav.GoToUserRoute("plantillas")}),c._uU(6," Crear nueva estrategia "),c.qZA(),c.qZA(),c.qZA(),c.TgZ(7,"div",5),c.TgZ(8,"div",6),c.TgZ(9,"div",7),c.TgZ(10,"div",8),c.TgZ(11,"div",9),c._UZ(12,"img",10),c.qZA(),c._UZ(13,"input",11),c.qZA(),c.qZA(),c.TgZ(14,"div",12),c.TgZ(15,"ng-select",13),c.NdJ("change",function(){return t.GetStrategies()})("ngModelChange",function(e){return t.gradeSelected=e}),c.qZA(),c.qZA(),c.TgZ(16,"div",12),c.TgZ(17,"ng-select",14),c.NdJ("change",function(){return t.GetStrategies()})("ngModelChange",function(e){return t.groupSelected=e}),c.qZA(),c.qZA(),c.TgZ(18,"div",15),c._UZ(19,"ng-select",16),c.qZA(),c.TgZ(20,"div",15),c._UZ(21,"ng-select",17),c.qZA(),c.qZA(),c.qZA(),c.YNc(22,p,2,1,"div",18),c.qZA(),c.YNc(23,f,2,0,"ng-template",null,19,c.W1O)),2&e){const e=c.MAs(24);c.xp6(15),c.Q6J("items",t.grades)("ngModel",t.gradeSelected),c.xp6(2),c.Q6J("items",t.groups)("ngModel",t.groupSelected),c.xp6(2),c.Q6J("items",t.startegyStatuses),c.xp6(2),c.Q6J("items",t.startegyStatuses),c.xp6(1),c.Q6J("ngIf",!!t.strategies.length)("ngIfElse",e)}},directives:[n.w9,a.JJ,a.On,r.O5,r.sg,u.c],styles:[".page-title[_ngcontent-%COMP%]{color:#3d5e81;font-size:24px;font-family:Mulish;font-weight:700}"]}),e})();var Z=s(9188);const b=[{path:"",component:m}];let T=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=c.oAB({type:e}),e.\u0275inj=c.cJS({imports:[[a.u5,r.ez,n.A0,Z.b,a.UX,o.G,g.zk.forRoot(),i.Bz.forChild(b)]]}),e})()}}]);