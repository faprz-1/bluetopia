(self.webpackChunktemplate_web=self.webpackChunktemplate_web||[]).push([[6153],{4866:(t,e,n)=>{"use strict";n.d(e,{W:()=>k});var i=n(7368),a=n(9355),o=n(529),r=n(1392),c=n(407),s=n(2894),l=n(1116);function d(t,e){if(1&t&&(i.TgZ(0,"th",10),i._uU(1),i.qZA()),2&t){const t=e.$implicit;i.xp6(1),i.hij(" ",t.name," ")}}function h(t,e){if(1&t&&(i.TgZ(0,"div",20),i._uU(1),i.qZA()),2&t){const t=e.$implicit,n=i.oxw(5);i.xp6(1),i.hij(" ",n.GetEventName(t)," ")}}function g(t,e){if(1&t){const t=i.EpF();i.TgZ(0,"div",14),i.TgZ(1,"div",15),i.TgZ(2,"span",16),i._uU(3),i.qZA(),i.TgZ(4,"img",17),i.NdJ("click",function(){i.CHM(t);const e=i.oxw().$implicit;return i.oxw(3).AddEvent(e)}),i.qZA(),i.qZA(),i.TgZ(5,"div",18),i.YNc(6,h,2,1,"div",19),i.qZA(),i.qZA()}if(2&t){const t=i.oxw().$implicit,e=i.oxw(3);i.xp6(3),i.hij(" ",e.FormatDay(t.day)," "),i.xp6(3),i.Q6J("ngForOf",e.GetEventsOfDate(e.year+"-"+(e.currentMonth+1)+"-"+t.day))}}function u(t,e){if(1&t&&(i.TgZ(0,"td"),i.YNc(1,g,7,2,"div",13),i.qZA()),2&t){const t=e.$implicit;i.xp6(1),i.Q6J("ngIf",t.day)}}function p(t,e){if(1&t&&(i.TgZ(0,"tr",11),i.YNc(1,u,2,1,"td",12),i.qZA()),2&t){const t=e.$implicit;i.xp6(1),i.Q6J("ngForOf",t)}}function f(t,e){if(1&t&&(i.TgZ(0,"table",7),i.TgZ(1,"thead"),i.TgZ(2,"tr"),i.YNc(3,d,2,1,"th",8),i.qZA(),i.qZA(),i.TgZ(4,"tbody"),i.YNc(5,p,2,1,"tr",9),i.qZA(),i.qZA()),2&t){const t=i.oxw();i.xp6(3),i.Q6J("ngForOf",t.weekDays),i.xp6(2),i.Q6J("ngForOf",t.month)}}function m(t,e){if(1&t&&(i.TgZ(0,"div",29),i._UZ(1,"img",30),i.TgZ(2,"div",31),i._uU(3),i.qZA(),i.qZA()),2&t){const t=e.$implicit,n=i.oxw(3);i.xp6(1),i.MGl("src","assets/icons/calendar-event-types/",n.GetEventDetails(t).icon,"",i.LSH),i.xp6(2),i.hij(" ",n.GetEventDetails(t).type," ")}}const y=function(t){return{"day-active clickeable":t}};function v(t,e){if(1&t){const t=i.EpF();i.TgZ(0,"div",23),i.TgZ(1,"h1",24),i._uU(2),i.qZA(),i.TgZ(3,"div",25),i.NdJ("click",function(){const e=i.CHM(t).$implicit;return i.oxw(2).onDayClicked.emit(e.date)}),i.TgZ(4,"div",26),i._uU(5),i.qZA(),i.TgZ(6,"div",27),i.YNc(7,m,4,2,"div",28),i.qZA(),i.qZA(),i.qZA()}if(2&t){const t=e.$implicit;i.xp6(2),i.Oqu(t.name),i.xp6(1),i.Q6J("ngClass",i.VKq(4,y,!(null==t.events||!t.events.length))),i.xp6(2),i.hij(" ",t.date.split("-").pop()," "),i.xp6(2),i.Q6J("ngForOf",t.events)}}function x(t,e){if(1&t&&(i.TgZ(0,"div",21),i.YNc(1,v,8,6,"div",22),i.qZA()),2&t){const t=i.oxw();i.xp6(1),i.Q6J("ngForOf",t.currentWeek)}}let k=(()=>{class t{constructor(t,e,n){this.api=t,this.nav=e,this.activatedRoute=n,this.strategyId=null,this.events=[],this.config={controlsAlign:"start",mode:"monthly"},this.onDayClicked=new i.vpe,this.weekDays=[{value:1,name:"Lunes"},{value:2,name:"Martes"},{value:3,name:"Mi\xe9rcoles"},{value:4,name:"Jueves"},{value:5,name:"Viernes"},{value:6,name:"S\xe1bado"},{value:0,name:"Domingo"}],this.year=a().tz(o.N.timeZone).get("year"),this.currentMonth=a().tz(o.N.timeZone).get("month"),this.month=[],this.currentWeek=[]}get controlsLabel(){let t=`${a(this.currentWeek[0].date).format("MMMM")}`;switch(this.weekFirstDay>this.weekLastDay&&(t+=`-${a(this.currentWeek[this.currentWeek.length-1].date).format("MMMM")}`),t+=` ${this.year}`,this.config.mode){case"monthly":return`${a(`${this.year}-${this.currentMonth+1}-01`).format("MMMM")}`;case"weekly":return`${this.weekFirstDay}-${this.weekLastDay} ${t}`;default:return t}}get weekFirstDay(){var t;const e=null===(t=this.currentWeek[0])||void 0===t?void 0:t.date;return e?e.split("-").pop():"??"}get weekLastDay(){var t;const e=null===(t=this.currentWeek[this.currentWeek.length-1])||void 0===t?void 0:t.date;return e?e.split("-").pop():"??"}ngOnInit(){a.locale("es"),this.currentWeek=Array.from(this.weekDays),this.GetParams(),this.PopulateMonth(),this.PopulateWeek()}GetParams(){this.activatedRoute.params.subscribe(t=>{this.strategyId=t.strategyId})}ChangeCalendarTick(t){switch(this.config.mode){case"monthly":this.currentMonth+=t,-1==this.currentMonth?(t=this.currentMonth=11,this.year--):12==this.currentMonth&&(t=this.currentMonth=0,this.year++),this.PopulateMonth();break;case"weekly":this.PopulateWeek(a(this.currentWeek[0].date).add(t,"week").tz(o.N.timeZone).format("YYYY-MM-DD"));break;default:this.currentMonth+=t,-1==this.currentMonth?(t=this.currentMonth=11,this.year--):12==this.currentMonth&&(t=this.currentMonth=0,this.year++),this.PopulateMonth()}}PopulateMonth(){const t=a().tz(o.N.timeZone).month(this.currentMonth).daysInMonth();let e=1,n=e,i=this.weekDays.map(t=>Object.assign({},t));for(this.month=[];e<=t;){let t=a(`${this.year}-${this.currentMonth+1}-${e}`).tz("America/Mexico_City"),o=a(`${this.year}-${this.currentMonth+1}-${n}`).tz("America/Mexico_City");const r=t.day();r==this.weekDays[0].value&&o.day()==this.weekDays[6].value&&(this.month.push(i),i=this.weekDays.map(t=>Object.assign({},t))),i.find(t=>r==t.value).day=e,n=e,e++}i[0].day&&this.month.push(i)}FormatDay(t){let e="";return"number"==typeof t&&(e=String(t)),1==e.length?`0${e}`:e}AddEvent(t){this.nav.GoToUserRoute(`mis-estrategias/${this.strategyId}/calendario/${this.year}-${this.currentMonth+1}-${t.day}`)}GetEventsOfDate(t=""){let e=t.split("-");return 1==e[1].length&&(e[1]=`0${e[1]}`),1==e[2].length&&(e[2]=`0${e[2]}`),(t=e.join("-"))?this.events.filter(e=>!!e.date&&e.date.includes(t)):[]}GetEventName(t){return t.name?t.name:t.parcialProduct?`${t.parcialProduct.name}`:"Sin nombre"}GetEventDetails(t){var e,n;let i={icon:"activity.png",type:"Actividad"};return(null==t?void 0:t.isFinal)?(i.icon="event.png",i.type="Evento de cierre"):(null===(e=null==t?void 0:t.parcialProduct)||void 0===e?void 0:e.isFinal)?(i.icon="final-product.png",i.type="Producto final"):(null===(n=null==t?void 0:t.parcialProduct)||void 0===n?void 0:n.isActivity)?(i.icon="activity.png",i.type="Actividad"):(i.icon="parcial-product.png",i.type="Producto parcial"),i}PopulateWeek(t=""){const e=(t?a(t):a()).tz(o.N.timeZone),n=e.clone().startOf("week").isoWeekday(1),i=e.clone().endOf("week").isoWeekday(7),r=[];let c=n.clone();for(;c.isSameOrBefore(i,"day");)r.push(c.format("YYYY-MM-DD")),c.add(1,"day");this.currentWeek.forEach((t,e)=>{t.date=r[e],t.events=this.GetEventsOfDate(t.date)})}}return t.\u0275fac=function(e){return new(e||t)(i.Y36(r.sM),i.Y36(c.f),i.Y36(s.gz))},t.\u0275cmp=i.Xpm({type:t,selectors:[["app-event-calendar"]],inputs:{strategyId:"strategyId",events:"events",config:"config"},outputs:{onDayClicked:"onDayClicked"},decls:8,vars:6,consts:[[1,"calendar"],[2,"gap","1.6rem"],["src","assets/icons/left.png","alt","left",1,"control-icon","clickeable",3,"click"],[1,"month-year","text-capitalize"],["src","assets/icons/right.png","alt","left",1,"control-icon","clickeable",3,"click"],["class","calendar-table",4,"ngIf"],["class","d-flex align-items-start align-self-stretch mt-4 gap-2",4,"ngIf"],[1,"calendar-table"],["class","text-center",4,"ngFor","ngForOf"],["class","calendar-week",4,"ngFor","ngForOf"],[1,"text-center"],[1,"calendar-week"],[4,"ngFor","ngForOf"],["class","calendar-day",4,"ngIf"],[1,"calendar-day"],[1,"day-title-row"],[1,"day-title"],["width","24","src","assets/icons/add-circle.png","alt","add",1,"clickeable",3,"click"],[1,"day-events"],["class","day-event",4,"ngFor","ngForOf"],[1,"day-event"],[1,"d-flex","align-items-start","align-self-stretch","mt-4","gap-2"],["class","d-flex flex-column flex-grow-1 align-self-stretch gap-3",4,"ngFor","ngForOf"],[1,"d-flex","flex-column","flex-grow-1","align-self-stretch","gap-3"],[1,"text"],[1,"d-flex","flex-column","week-day-container",3,"ngClass","click"],[1,"d-flex","justify-content-start","gap-3"],[1,"d-flex","flex-column","justify-content-center","align-items-center","flex-grow-1","gap-4"],["class","d-flex flex-column align-items-center gap-2",4,"ngFor","ngForOf"],[1,"d-flex","flex-column","align-items-center","gap-2"],[2,"width","50px",3,"src"],[1,"event-type"]],template:function(t,e){1&t&&(i.TgZ(0,"div",0),i.TgZ(1,"div",1),i.TgZ(2,"img",2),i.NdJ("click",function(){return e.ChangeCalendarTick(-1)}),i.qZA(),i.TgZ(3,"div",3),i._uU(4),i.qZA(),i.TgZ(5,"img",4),i.NdJ("click",function(){return e.ChangeCalendarTick(1)}),i.qZA(),i.qZA(),i.YNc(6,f,6,2,"table",5),i.YNc(7,x,2,1,"div",6),i.qZA()),2&t&&(i.xp6(1),i.Gre("d-flex align-items-center ","justify-content-"+e.config.controlsAlign,""),i.xp6(3),i.hij(" ",e.controlsLabel," "),i.xp6(2),i.Q6J("ngIf","monthly"==e.config.mode),i.xp6(1),i.Q6J("ngIf","weekly"==e.config.mode))},directives:[l.O5,l.sg,l.mk],styles:[".month-year[_ngcontent-%COMP%]{color:#587594;font-size:1.75rem}.control-icon[_ngcontent-%COMP%]{width:-webkit-min-content;width:min-content;height:-webkit-min-content;height:min-content}.calendar-table[_ngcontent-%COMP%]{border-collapse:initial;border-spacing:1rem}.calendar-week[_ngcontent-%COMP%]{grid-gap:1rem;gap:1rem}.calendar-day[_ngcontent-%COMP%]{width:140px;height:120px;flex-grow:1;border:1px solid #26d7a4;padding:.8rem}.day-title-row[_ngcontent-%COMP%]{width:100%;display:flex;justify-content:space-around;margin-bottom:.1rem}.day-title[_ngcontent-%COMP%]{font-size:1rem;font-weight:800;line-height:24px}.day-events[_ngcontent-%COMP%]{width:100%;height:calc(100% - 24px - .1rem);overflow-y:auto;font-size:.8rem}.day-events[_ngcontent-%COMP%]   .day-event[_ngcontent-%COMP%]:last-child{border-bottom:none}.day-event[_ngcontent-%COMP%]{text-align:center;width:100%;padding-bottom:.4rem;border-bottom:2px solid #587594}.week-day-container[_ngcontent-%COMP%]{padding:16px;grid-gap:10px;gap:10px;flex:1 0 0;align-self:stretch;border-radius:6px;border:2px solid #1081fb;color:var(--Gray-1,#3d5e81);font-family:Mulish;font-size:16px;font-weight:800}.day-active[_ngcontent-%COMP%]{background:rgba(16,129,251,.6);box-shadow:4px 4px 6px 0 rgba(0,0,0,.17);color:#fff!important}.event-type[_ngcontent-%COMP%]{font-size:20px}"]}),t})()},6153:(t,e,n)=>{"use strict";n.d(e,{h:()=>l});var i=n(1116),a=n(4391),o=n(1041),r=n(6050),c=n(5470),s=(n(4866),n(7368));let l=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=s.oAB({type:t}),t.\u0275inj=s.cJS({imports:[[o.u5,i.ez,a.A0,o.UX,r.G,c.zk.forRoot()]]}),t})()}}]);