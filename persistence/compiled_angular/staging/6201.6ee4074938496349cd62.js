(self.webpackChunktemplate_web=self.webpackChunktemplate_web||[]).push([[6201],{7631:(e,t,n)=>{"use strict";n.r(t),n.d(t,{ParentStudentDashboardModule:()=>J});var i=n(1116),o=n(2894),r=n(4391),s=n(1041),c=n(6050),a=n(5470),l=n(9355),d=n(7368);function g(e,t){if(1&e&&(d.TgZ(0,"div",10),d.TgZ(1,"div",11),d._uU(2),d.ALo(3,"date"),d.qZA(),d.TgZ(4,"div"),d._uU(5),d.qZA(),d.TgZ(6,"div",12),d._uU(7),d.qZA(),d.qZA()),2&e){const e=t.$implicit;d.xp6(2),d.Oqu(d.xi3(3,3,e.date,"dd/MM/yyy")),d.xp6(3),d.Oqu(e.text),d.xp6(2),d.Oqu(null==e.sender?null:e.sender.username)}}let m=(()=>{class e{constructor(){this.messages=[{date:l().toISOString(),text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",sender:{username:"Eliza Hern\xe1ndez"}},{date:l().toISOString(),text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",sender:{username:"Eliza Hern\xe1ndez"}},{date:l().toISOString(),text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",sender:{username:"Eliza Hern\xe1ndez"}}]}ngOnInit(){}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d.Xpm({type:e,selectors:[["app-messages"]],decls:12,vars:1,consts:[[1,"messages-container"],[1,"d-flex","align-items-center","justify-content-center","mb-3"],["src","assets/icons/mail-messages.png","alt","mail.png",1,"mr-2"],[1,"messages-title","ml-2"],[1,"d-flex","flex-column","flex-grow-1","justify-content-start",2,"overflow-y","auto"],["class","message",4,"ngFor","ngForOf"],[1,"input-container","my-3"],["type","text","placeholder","Mensaje nuevo",1,"form-control","no-icon"],[1,"d-flex","align-items-center","justify-content-center"],[1,"btn","btn-outline-primary"],[1,"message"],[1,"date"],[1,"sender"]],template:function(e,t){1&e&&(d.TgZ(0,"div",0),d.TgZ(1,"div",1),d._UZ(2,"img",2),d.TgZ(3,"div",3),d._uU(4,"Mensajes"),d.qZA(),d.qZA(),d.TgZ(5,"div",4),d.YNc(6,g,8,6,"div",5),d.qZA(),d.TgZ(7,"div",6),d._UZ(8,"input",7),d.qZA(),d.TgZ(9,"div",8),d.TgZ(10,"button",9),d._uU(11," Enviar "),d.qZA(),d.qZA(),d.qZA()),2&e&&(d.xp6(6),d.Q6J("ngForOf",t.messages))},directives:[i.sg],pipes:[i.uU],styles:[".messages-container[_ngcontent-%COMP%]{width:100%;display:flex;flex-direction:column;background-color:rgba(193,204,215,.2);padding:1rem;min-height:450px;height:100%}.messages-title[_ngcontent-%COMP%]{font-size:1.5rem;font-weight:700;color:#587594}.message[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:start;font-size:.8rem!important;font-weight:500;color:#587594;margin:.75rem 0;padding:0 .5rem}.message[_ngcontent-%COMP%]   .date[_ngcontent-%COMP%]{font-weight:300}.message[_ngcontent-%COMP%]   .sender[_ngcontent-%COMP%]{font-weight:700}.input-container[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{background-color:#fff}"]}),e})(),u=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=d.oAB({type:e}),e.\u0275inj=d.cJS({imports:[[s.u5,i.ez,s.UX,c.G]]}),e})();function p(e,t){if(1&e&&(d.TgZ(0,"div",6),d._uU(1),d.qZA()),2&e){const e=t.$implicit;d.xp6(1),d.hij(" ",e.date," ")}}let f=(()=>{class e{constructor(){this.dueDates=[{date:l().format("DD/MM/YYYY")},{date:l().format("DD/MM/YYYY")},{date:l().format("DD/MM/YYYY")}]}ngOnInit(){}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d.Xpm({type:e,selectors:[["app-next-due-dates"]],decls:8,vars:1,consts:[[1,"next-due-dates-container"],[1,"next-due-dates-title"],[1,"d-flex","flex-column","align-items-center","flex-grow-1","overflow-hidden"],["class","due-date",4,"ngFor","ngForOf"],[1,"d-flex","align-items-center","justify-content-center",2,"margin-top","12px"],[1,"btn","btn-outline-primary"],[1,"due-date"]],template:function(e,t){1&e&&(d.TgZ(0,"div",0),d.TgZ(1,"div",1),d._uU(2,"Pr\xf3ximas entregas"),d.qZA(),d.TgZ(3,"div",2),d.YNc(4,p,2,1,"div",3),d.qZA(),d.TgZ(5,"div",4),d.TgZ(6,"button",5),d._uU(7," Ver detalles "),d.qZA(),d.qZA(),d.qZA()),2&e&&(d.xp6(4),d.Q6J("ngForOf",t.dueDates))},directives:[i.sg],styles:[".next-due-dates-container[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:start;width:100%;border:2px solid #26d7a4;border-radius:6px;height:200px;max-height:200px;padding:.75rem}.next-due-dates-title[_ngcontent-%COMP%]{font-size:1.5rem;color:#587594;font-weight:700;text-align:center;margin-bottom:6px}.due-date[_ngcontent-%COMP%]{font-size:.875rem;font-weight:800;color:#587594;margin:6px 0}.highlighted[_ngcontent-%COMP%]{color:#eec264}"]}),e})(),Z=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=d.oAB({type:e}),e.\u0275inj=d.cJS({imports:[[s.u5,i.ez,s.UX,c.G]]}),e})();var x=n(1392);function h(e,t){if(1&e&&(d.TgZ(0,"div",14),d._uU(1),d.qZA()),2&e){const e=t.$implicit;d.xp6(1),d.hij(" ",e.name," ")}}function v(e,t){if(1&e&&(d.TgZ(0,"div",9),d.TgZ(1,"div",10),d._uU(2),d.qZA(),d.TgZ(3,"div",11),d._uU(4),d.qZA(),d.TgZ(5,"div",12),d.YNc(6,h,2,1,"div",13),d.qZA(),d.qZA()),2&e){const e=t.$implicit;d.xp6(2),d.hij(" ",e.label," "),d.xp6(2),d.hij(" ",e.number," "),d.xp6(2),d.Q6J("ngForOf",e.events)}}let _=(()=>{class e{constructor(e){this.api=e,this.now=l(),this.days=[]}get today(){return`Fecha de hoy ${this.now.format("DD/MM/YYYY")}`}ngOnInit(){this.PopulateWeek()}PopulateWeek(){const e=["L","M","M","J","V","S","S"],t=this.now.weekday();let n=this.now.daysInMonth();this.days=[];for(let i=1;i<8;i++){let o=Number(this.now.format("MM")),r=Number(this.now.format("DD"));r=r-t+i,r<=0?(o--,r=l().month(o-1).daysInMonth()+r):r>n&&(o++,r-=n);let s={value:i,label:e[i-1],number:r,date:l(this.GetDate(this.now.year(),o,r)).format("YYYY-MM-DD"),events:[{name:"Entrega de investigaci\xf3n de las marmotas"},{name:"Practica \u201cExperimento y conozco mi entorno\u201d"}]};this.days.push(s)}}GetDate(e,t,n){switch(typeof t){case"string":t.length<2&&(t=`0${t}`);break;case"number":t=t<=9?`0${t}`:`${t}`}switch(typeof n){case"string":n.length<2&&(n=`0${n}`);break;case"number":n=n<=9?`0${n}`:`${n}`}return`${e}-${t}-${n}`}}return e.\u0275fac=function(t){return new(t||e)(d.Y36(x.sM))},e.\u0275cmp=d.Xpm({type:e,selectors:[["app-week-calendar"]],decls:11,vars:2,consts:[[1,"w-100","week-calendar-container"],[1,"flex-column","align-items-center","justify-content-center"],[1,"d-flex","align-items-center","justify-content-center","mb-4"],["src","assets/icons/calendar.png","alt","calendar.png",1,"mr-3"],[1,"today-title"],[1,"d-flex","align-items-center","justify-content-between"],["class","week-day",4,"ngFor","ngForOf"],[1,"d-flex","align-items-center","justify-content-center","mt-4"],[1,"btn","btn-outline-success"],[1,"week-day"],[1,"day-label"],[1,"day"],[1,"events"],["class","event mb-2",4,"ngFor","ngForOf"],[1,"event","mb-2"]],template:function(e,t){1&e&&(d.TgZ(0,"div",0),d.TgZ(1,"div",1),d.TgZ(2,"div",2),d._UZ(3,"img",3),d.TgZ(4,"div",4),d._uU(5),d.qZA(),d.qZA(),d.TgZ(6,"div",5),d.YNc(7,v,7,3,"div",6),d.qZA(),d.TgZ(8,"div",7),d.TgZ(9,"button",8),d._uU(10," Ver calendario completo "),d.qZA(),d.qZA(),d.qZA(),d.qZA()),2&e&&(d.xp6(5),d.Oqu(t.today),d.xp6(2),d.Q6J("ngForOf",t.days))},directives:[i.sg],styles:[".week-calendar-container[_ngcontent-%COMP%]{padding:24px 12px;background-color:rgba(193,204,215,.2);border-radius:6px}.today-title[_ngcontent-%COMP%]{font-size:1.5rem;font-weight:700;color:#587594}.week-day[_ngcontent-%COMP%]{display:flex;flex-direction:column;flex-grow:1;align-items:center;justify-content:start;margin:0 .375rem}.week-day[_ngcontent-%COMP%]   .day-label[_ngcontent-%COMP%]{font-size:1.125rem;color:#26d7a4;font-weight:800;margin-bottom:.5rem;text-transform:uppercase}.week-day[_ngcontent-%COMP%]   .day[_ngcontent-%COMP%]{font-size:.875rem;color:#587594;font-weight:800;margin-bottom:.5rem}.week-day[_ngcontent-%COMP%]   .events[_ngcontent-%COMP%]{display:flex;flex-direction:column;padding:6px;background-color:#fff}.week-day[_ngcontent-%COMP%]   .events[_ngcontent-%COMP%]   .event[_ngcontent-%COMP%]{text-align:start;font-size:.75rem;color:#02306a}"]}),e})(),b=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=d.oAB({type:e}),e.\u0275inj=d.cJS({imports:[[s.u5,i.ez,s.UX,c.G]]}),e})();function y(e,t){if(1&e&&(d.TgZ(0,"div",6),d._UZ(1,"img",7),d.TgZ(2,"div",8),d._uU(3),d.qZA(),d.qZA()),2&e){const e=t.$implicit,n=d.oxw();d.xp6(1),d.MGl("src","assets/icons/",n.GetIcon(e),"",d.LSH),d.xp6(2),d.hij(" ",e.name," ")}}let w=(()=>{class e{constructor(){this.files=[{name:"Matar a un ruise\xf1or.mp3",url:""},{name:"Matar a un ruise\xf1or.jpg",url:""},{name:"Matar a un ruise\xf1or.doc",url:""}]}ngOnInit(){}GetIcon(e){return["mp3","wav"].includes(e.name.split(".").pop())?"music.png":["jpg","png"].includes(e.name.split(".").pop())?"gallery-alt.png":"document.png"}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d.Xpm({type:e,selectors:[["app-files-slider"]],decls:7,vars:1,consts:[[1,"files-slider-container"],[1,"slider-arrow"],["src","assets/icons/arrow-long-left.png","alt","back"],[1,"d-flex","h-100","align-items-center","justify-content-between","flex-grow-1"],["class","file-container",4,"ngFor","ngForOf"],["src","assets/icons/arrow-long-right.png","alt","back"],[1,"file-container"],[3,"src"],[1,"file-name"]],template:function(e,t){1&e&&(d.TgZ(0,"div",0),d.TgZ(1,"div",1),d._UZ(2,"img",2),d.qZA(),d.TgZ(3,"div",3),d.YNc(4,y,4,2,"div",4),d.qZA(),d.TgZ(5,"div",1),d._UZ(6,"img",5),d.qZA(),d.qZA()),2&e&&(d.xp6(4),d.Q6J("ngForOf",t.files))},directives:[i.sg],styles:[".files-slider-container[_ngcontent-%COMP%]{width:100%;height:100%;display:flex;align-items:center}.slider-arrow[_ngcontent-%COMP%]{padding:0 .75rem}.file-container[_ngcontent-%COMP%], .slider-arrow[_ngcontent-%COMP%]{display:flex;align-items:center}.file-container[_ngcontent-%COMP%]{height:100%;flex-direction:column;justify-content:center;background-color:#fff;border-radius:6px;max-width:135px;min-width:-webkit-min-content;min-width:min-content;padding:6px;margin:0 .4rem}.file-container[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{margin-bottom:5px}.file-container[_ngcontent-%COMP%]   .file-name[_ngcontent-%COMP%]{margin-top:5px;text-align:center;font-size:.75rem;font-weight:500;color:#2369b5}"]}),e})(),A=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=d.oAB({type:e}),e.\u0275inj=d.cJS({imports:[[s.u5,i.ez,s.UX,c.G]]}),e})();function q(e,t){if(1&e&&(d.TgZ(0,"div",6),d._UZ(1,"img",7),d.TgZ(2,"div",8),d._uU(3),d.qZA(),d.qZA()),2&e){const e=t.$implicit;d.xp6(1),d.Q6J("src",e.url,d.LSH),d.xp6(2),d.hij(" ",e.name," ")}}let O=(()=>{class e{constructor(){this.parcialProducts=[{name:"Esculturas de animales",url:"assets/img/animals.png"},{name:'Ensayo "Mi mundo"',url:"assets/img/ensayo.png"}]}ngOnInit(){}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d.Xpm({type:e,selectors:[["app-products-slider"]],decls:7,vars:1,consts:[[1,"products-slider-container"],[1,"d-flex","justify-content-center","align-items-center"],["src","assets/icons/arrow-long-up.png","alt","back"],[1,"d-flex","flex-column","justify-content-between","flex-grow-1"],["class","product",4,"ngFor","ngForOf"],["src","assets/icons/arrow-long-down.png","alt","back"],[1,"product"],["alt","",3,"src"],[1,"product-name"]],template:function(e,t){1&e&&(d.TgZ(0,"div",0),d.TgZ(1,"div",1),d._UZ(2,"img",2),d.qZA(),d.TgZ(3,"div",3),d.YNc(4,q,4,2,"div",4),d.qZA(),d.TgZ(5,"div",1),d._UZ(6,"img",5),d.qZA(),d.qZA()),2&e&&(d.xp6(4),d.Q6J("ngForOf",t.parcialProducts))},directives:[i.sg],styles:[".products-slider-container[_ngcontent-%COMP%]{width:100%;height:100%;display:flex;flex-direction:column;align-items:center}.product[_ngcontent-%COMP%]{margin:12px 0}.product-name[_ngcontent-%COMP%]{font-size:.75rem;font-weight:500;color:#02306a;text-align:center;margin-top:12px}"]}),e})(),M=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=d.oAB({type:e}),e.\u0275inj=d.cJS({imports:[[s.u5,i.ez,s.UX,c.G]]}),e})();function T(e,t){if(1&e){const e=d.EpF();d.TgZ(0,"div",40),d._uU(1),d.TgZ(2,"img",41),d.NdJ("click",function(){const t=d.CHM(e).index;return d.oxw().DeleteNotifications(t)}),d.qZA(),d.qZA()}if(2&e){const e=t.$implicit;d.xp6(1),d.hij(" ",e.name," ")}}function P(e,t){if(1&e&&(d.TgZ(0,"div",42),d._uU(1),d.qZA()),2&e){const e=t.$implicit;d.xp6(1),d.hij(" ",e.title," ")}}function C(e,t){if(1&e&&(d.TgZ(0,"div",42),d._uU(1),d.qZA()),2&e){const e=t.$implicit;d.xp6(1),d.hij(" ",e.title," ")}}function U(e,t){1&e&&(d.TgZ(0,"div",43),d.TgZ(1,"div",23),d._UZ(2,"img",44),d.TgZ(3,"div",39),d._uU(4,"Productos"),d.qZA(),d.qZA(),d.TgZ(5,"div",15),d.TgZ(6,"button",45),d._uU(7," Ver todos "),d.qZA(),d.qZA(),d._UZ(8,"app-products-slider",46),d.qZA())}function k(e,t){1&e&&d._UZ(0,"img",54)}const j=function(e){return{checked:e}};function Y(e,t){if(1&e){const e=d.EpF();d.TgZ(0,"div",50),d.TgZ(1,"div",51),d.NdJ("click",function(){const t=d.CHM(e).$implicit;return d.oxw(2).ToggleReminder(t)}),d.YNc(2,k,1,0,"img",52),d.qZA(),d.TgZ(3,"div",53),d._uU(4),d.qZA(),d.qZA()}if(2&e){const e=t.$implicit;d.xp6(1),d.Q6J("ngClass",d.VKq(3,j,e.checked)),d.xp6(1),d.Q6J("ngIf",e.checked),d.xp6(2),d.hij(" ",e.name," ")}}function F(e,t){if(1&e&&(d.TgZ(0,"div",47),d.TgZ(1,"div",23),d.TgZ(2,"div",39),d._uU(3,"Recordatorios"),d.qZA(),d.qZA(),d.TgZ(4,"div",48),d.YNc(5,Y,5,5,"div",49),d.qZA(),d.TgZ(6,"div",15),d.TgZ(7,"button",45),d._uU(8," Ver mis recordatorios "),d.qZA(),d.qZA(),d.qZA()),2&e){const e=d.oxw();d.xp6(5),d.Q6J("ngForOf",e.reminders)}}const z=[{path:"",component:(()=>{class e{constructor(e){this.api=e,this.user=null,this.notifications=[{name:'Ha sido calificado el documento "Los caracoles.pdf"'}],this.strategiesActive=[{title:"Los egipcios y la agricultura"},{title:"Literatura tradicional romana"},{title:"N\xfameros aplicados a la permacultura"}],this.strategiesFinished=[{title:"Los egipcios y la agricultura"},{title:"Literatura tradicional romana"},{title:"N\xfameros aplicados a la permacultura"}],this.reminders=[{name:"Ensayo de energ\xeda renobable"},{name:"Presentaci\xf3n de la contaminaci\xf3n"},{name:"Prototipo de robotica"},{name:"Prototipo del jardin hidroponico"}]}ngOnInit(){this.user=this.api.GetUser()}ToggleReminder(e){e.checked=!e.checked}DeleteNotifications(e){this.notifications.splice(e,1)}}return e.\u0275fac=function(t){return new(t||e)(d.Y36(x.sM))},e.\u0275cmp=d.Xpm({type:e,selectors:[["app-parent-student-dashboard"]],decls:58,vars:5,consts:[[1,"content"],[1,"d-flex","flex-column","align-items-center","justify-content-center"],["class","notification",4,"ngFor","ngForOf"],[1,"dashboard-content"],[1,"dashboard-section","left","mr-2"],[1,"mb-3"],[1,"dashboard-content","flex-grow-1","mb-3"],[1,"dashboard-section","flex-grow-1","left","mr-2"],[1,"d-flex"],[1,"card-section","flex-grow-1","justify-content-between","mr-2","mb-3",2,"max-height","250px"],[1,"d-flex","align-items-center","justify-content-center","mb-3"],["src","assets/icons/play.png","alt","play.png",1,"mr-2"],[1,"section-title-2","text-success","ml-2"],[1,"d-flex","flex-column","align-items-start","justify-content-start","overflow-auto"],["class","strategy-text",4,"ngFor","ngForOf"],[1,"d-flex","align-items-center","justify-content-center","mt-3"],[1,"btn","btn-outline-success","px-5"],[1,"card-section","flex-grow-1","justify-content-between","ml-2","mb-3",2,"max-height","250px"],["src","assets/icons/text-check.png","alt","text-check.png",1,"mr-2"],[1,"section-title-2","ml-2"],[1,"btn","btn-outline-primary","px-5"],[1,"card-section","flex-row"],[1,"d-flex","flex-column","mr-2",2,"max-width","200px"],[1,"d-flex","align-items-center","justify-content-center"],["src","assets/icons/music-small.png",1,"mx-1"],["src","assets/icons/gallery-small-alt.png",1,"mx-1"],["src","assets/icons/document-small.png",1,"mx-1"],["src","assets/icons/play-small-alt.png",1,"mx-1"],[1,"gallery-text"],[1,"btn","btn-outline-primary"],[1,"flex-grow-1","ml-2"],["src","assets/img/dashboard.png"],[1,"dashboard-section","right","ml-2"],["class","card-section flex-grow-1 mr-2 mb-0",4,"ngIf"],["class","reminders-section mr-2 mb-0",4,"ngIf"],[1,"dashboard-section","flex-grow-1","right","ml-2"],[1,"flex-grow-1","mb-3"],[1,"card-section","mr-2","mb-3"],["src","assets/icons/star-rounded.png","alt","star.png",1,"mr-2"],[1,"section-title","ml-2"],[1,"notification"],["src","assets/icons/close.png","alt","close.png",1,"clickeable","ml-3",3,"click"],[1,"strategy-text"],[1,"card-section","flex-grow-1","mr-2","mb-0"],["src","assets/icons/cube.png","alt","cube.png",1,"mr-2"],[1,"btn","btn-outline-primary","px-5","mb-3"],[1,"flex-grow-1"],[1,"reminders-section","mr-2","mb-0"],[1,"reminders"],["class","reminder",4,"ngFor","ngForOf"],[1,"reminder"],[1,"checkbox","clickeable",3,"ngClass","click"],["src","assets/icons/check.png","alt","check",4,"ngIf"],[1,"reminder-text"],["src","assets/icons/check.png","alt","check"]],template:function(e,t){1&e&&(d.TgZ(0,"div",0),d.TgZ(1,"div",1),d.YNc(2,T,3,1,"div",2),d.qZA(),d.TgZ(3,"div",3),d.TgZ(4,"div",4),d._UZ(5,"app-week-calendar",5),d.TgZ(6,"div",6),d.TgZ(7,"div",7),d.TgZ(8,"div",8),d.TgZ(9,"div",9),d.TgZ(10,"div",10),d._UZ(11,"img",11),d.TgZ(12,"div",12),d._uU(13,"Estrategias activas"),d.qZA(),d.qZA(),d.TgZ(14,"div",13),d.YNc(15,P,2,1,"div",14),d.qZA(),d.TgZ(16,"div",15),d.TgZ(17,"button",16),d._uU(18," Ver todas "),d.qZA(),d.qZA(),d.qZA(),d.TgZ(19,"div",17),d.TgZ(20,"div",10),d._UZ(21,"img",18),d.TgZ(22,"div",19),d._uU(23,"Estrategias terminadas"),d.qZA(),d.qZA(),d.TgZ(24,"div",13),d.YNc(25,C,2,1,"div",14),d.qZA(),d.TgZ(26,"div",15),d.TgZ(27,"button",20),d._uU(28," Ver todas "),d.qZA(),d.qZA(),d.qZA(),d.qZA(),d.TgZ(29,"div",21),d.TgZ(30,"div",22),d.TgZ(31,"div",23),d._UZ(32,"img",24),d._UZ(33,"img",25),d._UZ(34,"img",26),d._UZ(35,"img",27),d.qZA(),d.TgZ(36,"div",28),d._uU(37," Recursos subidos por el maestro "),d.qZA(),d.TgZ(38,"div",23),d.TgZ(39,"button",29),d._uU(40," Ver todos "),d.qZA(),d.qZA(),d.qZA(),d._UZ(41,"app-files-slider",30),d.qZA(),d.TgZ(42,"div",8),d._UZ(43,"img",31),d.qZA(),d.qZA(),d.TgZ(44,"div",32),d.YNc(45,U,9,0,"div",33),d.YNc(46,F,9,1,"div",34),d.qZA(),d.qZA(),d.qZA(),d.TgZ(47,"div",35),d._UZ(48,"app-next-due-dates",5),d._UZ(49,"app-messages",36),d.TgZ(50,"div",37),d.TgZ(51,"div",23),d._UZ(52,"img",38),d.TgZ(53,"div",39),d._uU(54,"Mis favoritos"),d.qZA(),d.qZA(),d.TgZ(55,"div",15),d.TgZ(56,"button",20),d._uU(57," Ver "),d.qZA(),d.qZA(),d.qZA(),d.qZA(),d.qZA(),d.qZA()),2&e&&(d.xp6(2),d.Q6J("ngForOf",t.notifications),d.xp6(13),d.Q6J("ngForOf",t.strategiesActive),d.xp6(10),d.Q6J("ngForOf",t.strategiesFinished),d.xp6(20),d.Q6J("ngIf","Parent"==(null==t.user||null==t.user.role?null:t.user.role.name)),d.xp6(1),d.Q6J("ngIf","Student"==(null==t.user||null==t.user.role?null:t.user.role.name)))},directives:[i.sg,_,w,i.O5,f,m,O,i.mk],styles:[".notification[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;background-color:rgba(38,215,164,.10196078431372549);color:#587594;min-width:-webkit-max-content;min-width:max-content;width:80%;max-width:100%;font-size:1.25rem;font-weight:500;padding:.75rem 0}.dashboard-content[_ngcontent-%COMP%]{margin-top:1.25rem;margin-bottom:2rem;display:flex;width:100%}.dashboard-content[_ngcontent-%COMP%]   .dashboard-section[_ngcontent-%COMP%]{display:flex;flex-direction:column}.left[_ngcontent-%COMP%]{flex-basis:70%}.right[_ngcontent-%COMP%]{flex-basis:30%}.section-title[_ngcontent-%COMP%]{font-size:1.5rem;font-weight:700;color:#587594}.section-title-2[_ngcontent-%COMP%]{font-size:1.25rem;font-weight:700;color:#2369b5}.card-section[_ngcontent-%COMP%]{display:flex;flex-direction:column;padding:1rem 2rem;border-radius:6px;background-color:rgba(193,204,215,.2)}.strategy-text[_ngcontent-%COMP%]{font-size:1rem;font-weight:600;color:#587594;margin:2px 0}.gallery-text[_ngcontent-%COMP%]{font-size:1.25rem;font-weight:700;color:#587594;margin:.75rem 0;text-align:center}.reminders-section[_ngcontent-%COMP%]{display:flex;flex-direction:column;flex-grow:1;border-radius:6px;border:2px solid #eec264;background-color:#fff;padding:1rem}.reminders-section[_ngcontent-%COMP%]   .reminders[_ngcontent-%COMP%]{display:flex;flex-direction:column;overflow-y:auto}.reminders-section[_ngcontent-%COMP%]   .reminders[_ngcontent-%COMP%]   .reminder[_ngcontent-%COMP%]{margin:.75rem 0;display:flex;align-items:center}.reminders-section[_ngcontent-%COMP%]   .reminders[_ngcontent-%COMP%]   .reminder[_ngcontent-%COMP%]   .checkbox[_ngcontent-%COMP%]{margin-right:.75rem;width:24px;height:24px;border:2px solid #eec264;border-radius:6px;display:flex;align-items:center;justify-content:center}.reminders-section[_ngcontent-%COMP%]   .reminders[_ngcontent-%COMP%]   .reminder[_ngcontent-%COMP%]   .checked[_ngcontent-%COMP%]{border-color:#26d7a4}.reminders-section[_ngcontent-%COMP%]   .reminders[_ngcontent-%COMP%]   .reminder[_ngcontent-%COMP%]   .reminder-text[_ngcontent-%COMP%]{font-size:.875rem;font-weight:700;color:#587594}"]}),e})()}];let J=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=d.oAB({type:e}),e.\u0275inj=d.cJS({imports:[[s.u5,i.ez,r.A0,u,A,Z,b,s.UX,M,c.G,a.zk.forRoot(),o.Bz.forChild(z)]]}),e})()}}]);