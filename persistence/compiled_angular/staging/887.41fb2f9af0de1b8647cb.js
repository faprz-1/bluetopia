(self.webpackChunktemplate_web=self.webpackChunktemplate_web||[]).push([[887],{4887:(t,e,n)=>{"use strict";n.r(e),n.d(e,{EventDayModule:()=>y});var i=n(1116),a=n(2894),o=n(4391),r=n(1041),s=n(6050),l=n(5470),d=n(9355),c=n(529),g=n(7368),u=n(1392),p=n(407),f=n(6189);const m=["deleteEventConfirmationModal"];function v(t,e){if(1&t){const t=g.EpF();g.TgZ(0,"div",22),g.TgZ(1,"div",23),g.TgZ(2,"span",24),g._uU(3),g.qZA(),g.TgZ(4,"div",25),g.TgZ(5,"img",26),g.NdJ("click",function(){const e=g.CHM(t).$implicit,n=g.oxw(),i=g.MAs(18);return n.selectedEvent=e,i.show()}),g.qZA(),g.qZA(),g.qZA(),g.TgZ(6,"div",27),g._uU(7," Categor\xeda "),g.qZA(),g.TgZ(8,"div",17),g.TgZ(9,"span"),g._uU(10),g.qZA(),g.qZA(),g.TgZ(11,"div",28),g.TgZ(12,"label",29),g.TgZ(13,"b"),g._uU(14,"Instrucciones"),g.qZA(),g.qZA(),g.TgZ(15,"span"),g._uU(16),g.qZA(),g.qZA(),g.qZA()}if(2&t){const t=e.$implicit,n=g.oxw();g.xp6(3),g.AsE(" ",null==n.strategy||null==n.strategy.strategyGroup||null==n.strategy.strategyGroup.grade?null:n.strategy.strategyGroup.grade.name,"\xb0",null==n.strategy||null==n.strategy.strategyGroup||null==n.strategy.strategyGroup.group?null:n.strategy.strategyGroup.group.name," "),g.xp6(7),g.Oqu(t.name),g.xp6(6),g.Oqu(t.instructions?t.instructions:"Sin instrucciones")}}const h=function(){return{backdrop:"static",keyboard:!1}};let Z=(()=>{class t{constructor(t,e,n,i){this.api=t,this.nav=e,this.activatedRoute=n,this.toast=i,this.strategyId=null,this.date=null,this.strategy=null,this.selectedEvent=null,this.events=[],this.loading={deleting:!1}}get formatedDate(){return this.date?d(this.date).tz(c.N.timeZone).format("DD/MM/YY"):""}ngOnInit(){this.GetParams()}GetParams(){this.activatedRoute.params.subscribe(t=>{this.strategyId=t.strategyId,this.date=t.date,this.GetStrategy()})}GoBack(){this.nav.GoToUserRoute(`mis-estrategias/${this.strategyId}/calendario`)}GetStrategy(){this.api.Get(`/Strategies/${this.strategyId}`).subscribe(t=>{var e;this.strategy=t,(null===(e=null==t?void 0:t.events)||void 0===e?void 0:e.length)&&(this.events=t.events.filter(t=>!!t.date&&t.date.includes(d(this.date).tz(c.N.timeZone).format("YYYY-MM-DD"))))},t=>{console.error("Error getting activities",t)})}DeleteEvent(){this.loading.deleting=!0,this.api.Delete(`/Events/${this.selectedEvent.id}`).subscribe(t=>{var e;null===(e=this.deleteEventConfirmationModal)||void 0===e||e.hide(),this.GetStrategy(),this.loading.deleting=!1},t=>{console.error("Error deleting event",t),this.toast.ShowSuccess("Evento eliminado correctamente"),this.loading.deleting=!1})}GoToCreateEventOrProduct(){this.nav.GoToUserRoute(`mis-estrategias/${this.strategyId}/calendario/${this.date}/crear`)}}return t.\u0275fac=function(e){return new(e||t)(g.Y36(u.sM),g.Y36(p.f),g.Y36(a.gz),g.Y36(f.k))},t.\u0275cmp=g.Xpm({type:t,selectors:[["app-event-day"]],viewQuery:function(t,e){if(1&t&&g.Gf(m,5),2&t){let t;g.iGM(t=g.CRH())&&(e.deleteEventConfirmationModal=t.first)}},decls:32,vars:7,consts:[[1,"content"],[1,"row-header"],[1,"title"],[1,"d-flex","justify-content-between","align-items-center","mb-4"],[1,"back-section"],["src","assets/icons/back-arrow.png","alt","back-arrow",1,"back-icon","clickeable",3,"click"],[1,"event-date"],[1,"d-flex","flex-column","align-items-center","w-100",2,"gap","24px"],[1,"d-flex","align-items-center","justify-content-between","w-100",2,"gap","24px"],["class","event-card",4,"ngFor","ngForOf"],[1,"btn","btn-success",3,"click"],["bsModal","","tabindex","-1","role","dialog","aria-labelledby","deleteEventConfirmationModal",1,"modal","fade",3,"config"],["deleteEventConfirmationModal","bs-modal"],[1,"modal-dialog","modal-lg"],[1,"modal-content"],[1,"modal-body","finish-modal-content"],[1,"d-flex","flex-column",2,"gap","12px"],[1,""],[1,"title","text-danger"],[1,"d-flex","align-items-center","justify-content-end","w-100",2,"gap","48px"],[1,"btn","btn-secondary","w-50",3,"disabled","click"],[1,"btn","btn-primary","w-50",3,"disabled","click"],[1,"event-card"],[1,"d-flex","align-items-center","justify-content-between","align-self-stretch"],[1,"text-primary","text-uppercase"],[1,"d-flex","align-items-center",2,"gap","12px"],["src","assets/icons/delete.svg",1,"clickeable",3,"click"],[1,"text-success"],[1,"d-flex","flex-column"],[1,"text-primary","mb-1"]],template:function(t,e){if(1&t){const t=g.EpF();g.TgZ(0,"div",0),g.TgZ(1,"div",1),g._UZ(2,"div"),g.TgZ(3,"div",2),g._uU(4," Calendario "),g.qZA(),g._UZ(5,"div"),g.qZA(),g.TgZ(6,"div",3),g.TgZ(7,"div",4),g.TgZ(8,"img",5),g.NdJ("click",function(){return e.GoBack()}),g.qZA(),g.qZA(),g.TgZ(9,"div",6),g._uU(10),g.qZA(),g._UZ(11,"div"),g.qZA(),g.TgZ(12,"div",7),g.TgZ(13,"div",8),g.YNc(14,v,17,4,"div",9),g.qZA(),g.TgZ(15,"button",10),g.NdJ("click",function(){return e.GoToCreateEventOrProduct()}),g._uU(16," Agregar evento o producto "),g.qZA(),g.qZA(),g.qZA(),g.TgZ(17,"div",11,12),g.TgZ(19,"div",13),g.TgZ(20,"div",14),g.TgZ(21,"div",15),g.TgZ(22,"div",16),g.TgZ(23,"div",17),g._uU(24),g.qZA(),g.TgZ(25,"div",18),g._uU(26," Al eliminarlo ya no podr\xe1 recuperarlo "),g.qZA(),g.TgZ(27,"div",19),g.TgZ(28,"button",20),g.NdJ("click",function(){return g.CHM(t),g.MAs(18).hide()}),g._uU(29," No, cancelar "),g.qZA(),g.TgZ(30,"button",21),g.NdJ("click",function(){return e.DeleteEvent()}),g._uU(31," Si, eliminar "),g.qZA(),g.qZA(),g.qZA(),g.qZA(),g.qZA(),g.qZA(),g.qZA()}2&t&&(g.xp6(10),g.hij(" ",e.formatedDate," "),g.xp6(4),g.Q6J("ngForOf",e.events),g.xp6(3),g.Q6J("config",g.DdM(6,h)),g.xp6(7),g.hij(' \xbfEst\xe1 seguro/a de que desea eliminar el evento "',null==e.selectedEvent?null:e.selectedEvent.name,'"? '),g.xp6(4),g.Q6J("disabled",e.loading.deleting),g.xp6(2),g.Q6J("disabled",e.loading.deleting))},directives:[i.sg,l.oB],styles:[".title[_ngcontent-%COMP%]{color:#26d7a4}.subtitle[_ngcontent-%COMP%]{font-size:1.5rem;font-weight:500;color:#587594;margin-bottom:.75rem}.event-date[_ngcontent-%COMP%]{width:155px;height:40px;align-items:center;grid-gap:10px;gap:10px;flex-shrink:0;border-radius:6px 6px 0 0;background:var(--green-1,#26d7a4);color:#fff;font-size:28px;font-weight:700}.event-card[_ngcontent-%COMP%], .event-date[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:center;font-family:Mulish;font-style:normal;line-height:normal}.event-card[_ngcontent-%COMP%]{width:400px;max-width:100%;padding:12px;align-items:flex-start;grid-gap:12px;gap:12px;border-radius:6px;border:1px solid var(--gray-2,#758ca6);color:var(--gray-1,#3d5e81);font-size:16px;font-weight:500}.btn[_ngcontent-%COMP%]{max-width:-webkit-max-content;max-width:max-content}.finish-modal-content[_ngcontent-%COMP%]{display:inline-flex;padding:44px 39px;flex-direction:column;align-items:center;grid-gap:24px;gap:24px;color:var(--gray-1,#3d5e81);font-family:Mulish;font-size:24px;font-style:normal;font-weight:400;line-height:normal}.finish-modal-content[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]{align-self:stretch!important}.finish-modal-content[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{color:var(--blue-dark,#2369b5);text-align:center;font-family:Mulish;font-size:32px;font-style:normal;font-weight:700;line-height:normal}"]}),t})();var x=n(5110);const b=[{path:"",component:Z}];let y=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=g.oAB({type:t}),t.\u0275inj=g.cJS({imports:[[r.u5,i.ez,o.A0,r.UX,s.G,l.zk.forRoot(),x.N,a.Bz.forChild(b)]]}),t})()}}]);