(self.webpackChunktemplate_web=self.webpackChunktemplate_web||[]).push([[5817],{5817:(t,e,a)=>{"use strict";a.r(e),a.d(e,{ProjectCalendarModule:()=>m});var s=a(1116),r=a(2894),i=a(4391),n=a(1041),c=a(6050),o=a(5470),l=a(7368),d=a(1392),g=a(407),u=a(4866);function p(t,e){if(1&t&&l._UZ(0,"app-event-calendar",9),2&t){const t=l.oxw();l.Q6J("strategyId",t.strategyId)("events",t.strategy.events)}}let h=(()=>{class t{constructor(t,e,a,s){this.api=t,this.activatedRoute=e,this.nav=a,this.modalService=s,this.strategyId=null,this.strategy=null,this.modalRef=null}ngOnInit(){this.GetParams()}OpenModal(t){this.modalRef=this.modalService.show(t,{backdrop:"static"})}CloseModal(){this.modalRef&&this.modalRef.hide()}GetParams(){this.activatedRoute.params.subscribe(t=>{this.strategyId=t.strategyId,this.GetStrategy()})}GetStrategy(){this.api.Get(`/Strategies/${this.strategyId}`).subscribe(t=>{this.strategy=t},t=>{console.error("Error getting strategy",t)})}GoBack(){this.nav.GoToUserRoute("mis-estudiantes")}GetStrategyEvents(){}}return t.\u0275fac=function(e){return new(e||t)(l.Y36(d.sM),l.Y36(r.gz),l.Y36(g.f),l.Y36(o.tT))},t.\u0275cmp=l.Xpm({type:t,selectors:[["app-project-calendar"]],decls:12,vars:1,consts:[[1,"content"],[1,"row-header","mb-5"],[1,"back-section"],["src","assets/icons/back-arrow.png","alt","back-arrow",1,"back-icon","clickeable",3,"click"],[1,"d-flex","flex-column","mb-4",2,"gap","12px"],[1,"title","mb-0"],[1,"subtitle"],[1,"text"],[3,"strategyId","events",4,"ngIf"],[3,"strategyId","events"]],template:function(t,e){1&t&&(l.TgZ(0,"div",0),l.TgZ(1,"div",1),l.TgZ(2,"div",2),l.TgZ(3,"img",3),l.NdJ("click",function(){return e.GoBack()}),l.qZA(),l.qZA(),l.qZA(),l.TgZ(4,"div",4),l.TgZ(5,"div",5),l._uU(6," Calendario "),l.qZA(),l.TgZ(7,"div",6),l._uU(8," Planea tus estrategias para cada d\xeda "),l.qZA(),l.TgZ(9,"div",7),l._uU(10," Selecciona el d\xeda para visualizar las actividades planeadas para esa fecha y crear nuevas "),l.qZA(),l.qZA(),l.YNc(11,p,1,2,"app-event-calendar",8),l.qZA()),2&t&&(l.xp6(11),l.Q6J("ngIf",!!e.strategy))},directives:[s.O5,u.W],styles:[".title[_ngcontent-%COMP%]{color:#26d7a4}.subtitle[_ngcontent-%COMP%]{font-size:1.75rem;color:#587594;font-weight:700}"]}),t})();var v=a(6153);const f=[{path:"",component:h}];let m=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=l.oAB({type:t}),t.\u0275inj=l.cJS({imports:[[n.u5,s.ez,i.A0,n.UX,v.h,c.G,o.zk.forRoot(),r.Bz.forChild(f)]]}),t})()}}]);