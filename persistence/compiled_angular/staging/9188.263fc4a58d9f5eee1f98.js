(self.webpackChunktemplate_web=self.webpackChunktemplate_web||[]).push([[9188],{7390:(t,e,n)=>{"use strict";n.d(e,{c:()=>v});var a=n(7368),r=n(1392),i=n(6189),s=n(407),l=n(1116),o=n(5470);const g=["deleteStrategyModal"];function c(t,e){1&t&&(a.TgZ(0,"div",9),a._uU(1," Category "),a.qZA())}function u(t,e){1&t&&a._UZ(0,"div",9)}function d(t,e){if(1&t&&(a.TgZ(0,"span"),a._uU(1),a.qZA()),2&t){const t=e.$implicit;a.xp6(1),a.Oqu(t.name)}}function p(t,e){if(1&t&&(a.TgZ(0,"div",23),a.YNc(1,d,2,1,"span",24),a.qZA()),2&t){const t=a.oxw();a.xp6(1),a.Q6J("ngForOf",t.strategy.subjects)}}function y(t,e){1&t&&(a.ynx(0),a.TgZ(1,"button",25),a._uU(2," Modalidad de participaci\xf3n "),a.qZA(),a.TgZ(3,"button",26),a._uU(4," Terminar de editar "),a.qZA(),a.BQk())}function f(t,e){1&t&&(a.ynx(0),a.TgZ(1,"span",27),a._uU(2,"Sin grado asignado"),a.qZA(),a.BQk())}function Z(t,e){1&t&&(a.ynx(0),a.TgZ(1,"span",27),a._uU(2,"Sin grupo asignado"),a.qZA(),a.BQk())}function m(t,e){if(1&t){const t=a.EpF();a.TgZ(0,"button",31),a.NdJ("click",function(){return a.CHM(t),a.oxw(2).GoToStrategyTeamsProgress()}),a._uU(1," Ver progreso "),a.qZA()}}function b(t,e){if(1&t){const t=a.EpF();a.TgZ(0,"button",32),a.NdJ("click",function(){return a.CHM(t),a.oxw(2).GoToCreateStrategyTeams()}),a._uU(1," Asignar equipos "),a.qZA()}if(2&t){const t=a.oxw(2);a.Q6J("disabled",!t.IsAssignTeamsEnabled())}}function h(t,e){if(1&t){const t=a.EpF();a.ynx(0),a.YNc(1,m,2,0,"button",28),a.YNc(2,b,2,1,"button",29),a.TgZ(3,"button",30),a.NdJ("click",function(){return a.CHM(t),a.oxw().GoToStrategyCalendar()}),a._uU(4," Calendario "),a.qZA(),a.BQk()}if(2&t){const t=a.oxw();a.xp6(1),a.Q6J("ngIf",null!==(null==t.strategy?null:t.strategy.isByTeams)),a.xp6(1),a.Q6J("ngIf",null===(null==t.strategy?null:t.strategy.isByTeams))}}function x(t,e){1&t&&(a.TgZ(0,"span"),a._uU(1,"Si, eliminar"),a.qZA())}function T(t,e){1&t&&(a.TgZ(0,"span"),a._UZ(1,"i",33),a.qZA())}const A=function(){return{backdrop:"static",keyboard:!1}};let v=(()=>{class t{constructor(t,e,n){this.api=t,this.toast=e,this.nav=n,this.strategy=null,this.onChange=new a.vpe,this.loading={deleting:!1}}ngOnInit(){}GoToEditStrategy(){this.nav.GoToUserRoute(`plantillas/${this.strategy.templateId}/crear/${this.strategy.id}`)}GoToStrategyDetails(){this.nav.GoToUserRoute(`mis-estrategias/${this.strategy.id}`)}GoToStrategyCalendar(){this.nav.GoToUserRoute(`mis-estrategias/${this.strategy.id}/calendario`)}GoToCreateStrategyTeams(){this.nav.GoToUserRoute(`mis-estrategias/${this.strategy.id}/crear-equipos`)}GoToStrategyTeamsProgress(){this.nav.GoToUserRoute(`mis-estrategias/${this.strategy.id}/progreso-equipos`)}DeleteStrategy(){this.loading.deleting=!0,this.api.Delete(`/Strategies/${this.strategy.id}`).subscribe(t=>{var e;this.toast.ShowSuccess("Estrateg\xeda eliminada"),this.loading.deleting=!1,null===(e=this.deleteStrategyModal)||void 0===e||e.hide(),this.onChange.emit({type:"delete",data:{strategyId:this.strategy.id}})},t=>{this.toast.ShowError("Error al eliminar estrateg\xeda"),console.error("Error deleting strategy",t),this.loading.deleting=!1})}IsAssignTeamsEnabled(){return!!this.strategy.strategyGroup&&null!=this.strategy.strategyGroup.gradeId&&0!=this.strategy.strategyGroup.gradeId&&null!=this.strategy.strategyGroup.groupId&&0!=this.strategy.strategyGroup.groupId}}return t.\u0275fac=function(e){return new(e||t)(a.Y36(r.sM),a.Y36(i.k),a.Y36(s.f))},t.\u0275cmp=a.Xpm({type:t,selectors:[["app-strategy-card"]],viewQuery:function(t,e){if(1&t&&a.Gf(g,5),2&t){let t;a.iGM(t=a.CRH())&&(e.deleteStrategyModal=t.first)}},inputs:{strategy:"strategy"},outputs:{onChange:"onChange"},decls:59,vars:28,consts:[[1,"card"],[1,"d-flex","align-items-center","justify-content-between","align-self-stretch"],[1,"group"],[1,"d-flex","align-items-center",2,"gap","16px"],["src","assets/icons/delete.svg","alt","delete",1,"clickeable",3,"click"],["src","assets/icons/edit.svg","alt","find",1,"clickeable",3,"click"],["src","assets/icons/find-in-page-success.svg","alt","edit",1,"clickeable",3,"click"],["class","category",4,"ngIf"],[1,"d-flex","flex-column","align-items-start","justify-content-start","align-self-stretch"],[1,"category"],["class","d-flex flex-column",4,"ngIf"],[1,"d-flex","flex-wrap","align-self-stretch",2,"gap","12px"],[4,"ngIf"],["bsModal","","tabindex","-1","role","dialog","aria-labelledby","deleteStrategyModal",1,"modal","fade",3,"config"],["deleteStrategyModal","bs-modal"],[1,"modal-dialog","modal-lg"],[1,"modal-content"],[1,"modal-header","d-flex","justify-content-center"],[1,"modal-title"],[1,"modal-body"],[1,"modal-footer","justify-content-around"],[1,"btn","btn-outline-primary",3,"disabled","click"],[1,"btn","btn-danger",2,"min-width","155px",3,"disabled","click"],[1,"d-flex","flex-column"],[4,"ngFor","ngForOf"],[1,"btn","btn-outline-primary","btn-block"],[1,"btn","btn-outline-success","btn-block"],[1,"badge","badge-warning"],["class","btn btn-outline-primary flex-grow-1",3,"click",4,"ngIf"],["class","btn btn-outline-primary flex-grow-1",3,"disabled","click",4,"ngIf"],[1,"btn","btn-outline-success","flex-grow-1",3,"click"],[1,"btn","btn-outline-primary","flex-grow-1",3,"click"],[1,"btn","btn-outline-primary","flex-grow-1",3,"disabled","click"],[1,"zmdi","zmdi-spinner","zmdi-hc-lg","zmdi-hc-spin"]],template:function(t,e){if(1&t){const t=a.EpF();a.TgZ(0,"div",0),a.TgZ(1,"div",1),a.TgZ(2,"div",2),a._uU(3),a.qZA(),a.TgZ(4,"div",3),a.TgZ(5,"img",4),a.NdJ("click",function(){return a.CHM(t),a.MAs(42).show()}),a.qZA(),a.TgZ(6,"img",5),a.NdJ("click",function(){return e.GoToEditStrategy()}),a.qZA(),a.TgZ(7,"img",6),a.NdJ("click",function(){return e.GoToStrategyDetails()}),a.qZA(),a.qZA(),a.qZA(),a.YNc(8,c,2,0,"div",7),a.YNc(9,u,1,0,"div",7),a.TgZ(10,"div",8),a.TgZ(11,"label",9),a._uU(12,"Autor"),a.qZA(),a._uU(13),a.qZA(),a.TgZ(14,"div",8),a.TgZ(15,"label"),a._uU(16,"T\xedtulo"),a.qZA(),a._uU(17),a.qZA(),a.TgZ(18,"div",8),a.TgZ(19,"label"),a._uU(20,"Fechas de duraci\xf3n"),a.qZA(),a._uU(21),a.ALo(22,"date"),a.ALo(23,"date"),a.qZA(),a.TgZ(24,"div",8),a.TgZ(25,"label"),a._uU(26,"Pregunta generadora"),a.qZA(),a._uU(27),a.qZA(),a.TgZ(28,"div",8),a.TgZ(29,"label"),a._uU(30,"Plantilla"),a.qZA(),a._uU(31),a.qZA(),a.TgZ(32,"div",8),a.TgZ(33,"label"),a._uU(34,"Campos formativos"),a.qZA(),a.YNc(35,p,2,1,"div",10),a.qZA(),a.TgZ(36,"div",11),a.YNc(37,y,5,0,"ng-container",12),a.YNc(38,f,3,0,"ng-container",12),a.YNc(39,Z,3,0,"ng-container",12),a.YNc(40,h,5,2,"ng-container",12),a.qZA(),a.qZA(),a.TgZ(41,"div",13,14),a.TgZ(43,"div",15),a.TgZ(44,"div",16),a.TgZ(45,"div",17),a.TgZ(46,"div",18),a._uU(47,"Eliminar estrateg\xeda"),a.qZA(),a.qZA(),a.TgZ(48,"div",19),a._uU(49," \xbfEst\xe1 seguro/a de que desea eliminar la estrateg\xeda "),a.TgZ(50,"b"),a._uU(51),a.qZA(),a._uU(52,"? "),a.qZA(),a.TgZ(53,"div",20),a.TgZ(54,"button",21),a.NdJ("click",function(){return a.CHM(t),a.MAs(42).hide()}),a._uU(55," No, cancelar "),a.qZA(),a.TgZ(56,"button",22),a.NdJ("click",function(){return e.DeleteStrategy()}),a.YNc(57,x,2,0,"span",12),a.YNc(58,T,2,0,"span",12),a.qZA(),a.qZA(),a.qZA(),a.qZA(),a.qZA()}2&t&&(a.xp6(3),a.AsE(" ",null==e.strategy||null==e.strategy.strategyGroup||null==e.strategy.strategyGroup.grade?null:e.strategy.strategyGroup.grade.name,"\xb0",null==e.strategy||null==e.strategy.strategyGroup||null==e.strategy.strategyGroup.group?null:e.strategy.strategyGroup.group.name," "),a.xp6(5),a.Q6J("ngIf",!1),a.xp6(1),a.Q6J("ngIf",!0),a.xp6(4),a.hij(" ",null==e.strategy||null==e.strategy.user?null:e.strategy.user.username," "),a.xp6(4),a.hij(" ",null!=e.strategy&&e.strategy.title?null==e.strategy?null:e.strategy.title:"Sin t\xedtulo"," "),a.xp6(4),a.AsE(" ",a.xi3(22,21,e.strategy.startDate,"shortDate")," - ",a.xi3(23,24,e.strategy.endDate,"shortDate")," "),a.xp6(6),a.hij(" ",null!=e.strategy&&e.strategy.generatingQuestion?null==e.strategy?null:e.strategy.generatingQuestion:"Sin pregunta generadora"," "),a.xp6(4),a.hij(" ",null!=e.strategy&&null!=e.strategy.template&&e.strategy.template.name?null==e.strategy||null==e.strategy.template?null:e.strategy.template.name:"Sin plantilla"," "),a.xp6(4),a.Q6J("ngIf",!!e.strategy),a.xp6(2),a.Q6J("ngIf",!1),a.xp6(1),a.Q6J("ngIf",0==(null==e.strategy.strategyGroup?null:e.strategy.strategyGroup.gradeId)),a.xp6(1),a.Q6J("ngIf",0==(null==e.strategy.strategyGroup?null:e.strategy.strategyGroup.groupId)),a.xp6(1),a.Q6J("ngIf",!0),a.xp6(1),a.Q6J("config",a.DdM(27,A)),a.xp6(10),a.hij('"',null==e.strategy?null:e.strategy.title,'"'),a.xp6(3),a.Q6J("disabled",e.loading.deleting),a.xp6(2),a.Q6J("disabled",e.loading.deleting),a.xp6(1),a.Q6J("ngIf",!e.loading.deleting),a.xp6(1),a.Q6J("ngIf",e.loading.deleting))},directives:[l.O5,o.oB,l.sg],pipes:[l.uU],styles:[".card[_ngcontent-%COMP%]{display:flex;width:100%;padding:12px;flex-direction:column;justify-content:center;align-items:flex-start;grid-gap:12px;gap:12px;border-radius:6px;border:1px solid var(--gray-2,#758ca6);background:#f5f8fa;color:var(--gray-1,#3d5e81);font-family:Mulish;font-size:16px;font-style:normal;font-weight:500;line-height:normal}.card[_ngcontent-%COMP%]   .group[_ngcontent-%COMP%]{color:var(--blue-1,#1081fb);text-transform:uppercase}.card[_ngcontent-%COMP%]   .category[_ngcontent-%COMP%], .card[_ngcontent-%COMP%]   .group[_ngcontent-%COMP%]{font-size:20px;font-weight:700}.card[_ngcontent-%COMP%]   .category[_ngcontent-%COMP%]{color:var(--green-1,#26d7a4)}.card[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{color:var(--blue-1,#1081fb);font-size:20px;font-weight:700;margin:0}.modal-content[_ngcontent-%COMP%]{color:var(--gray-1,#3d5e81);font-family:Mulish;font-size:20px;font-style:normal;font-weight:400;line-height:normal}.modal-content[_ngcontent-%COMP%]   .modal-title[_ngcontent-%COMP%]{color:var(--blue-dark,#2369b5);text-align:center;font-size:32px;font-weight:700}"]}),t})()},9188:(t,e,n)=>{"use strict";n.d(e,{b:()=>c});var a=n(1116),r=n(4391),i=n(1041),s=n(6050),l=n(5470),o=n(193),g=(n(7390),n(7368));let c=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=g.oAB({type:t}),t.\u0275inj=g.cJS({imports:[[i.u5,a.ez,r.A0,i.UX,s.G,l.zk.forRoot(),o.kn.forRoot()]]}),t})()}}]);