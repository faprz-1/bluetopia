(self.webpackChunktemplate_web=self.webpackChunktemplate_web||[]).push([[605],{5605:(t,e,n)=>{"use strict";n.r(e),n.d(e,{GradeProductModule:()=>O});var i=n(1116),a=n(2894),l=n(4391),r=n(1041),o=n(6050),s=n(5470),g=n(5821),u=n(7368),c=n(1392),d=n(407),m=n(4792);function p(t,e){if(1&t&&(u.TgZ(0,"div",39),u._UZ(1,"img",40),u.TgZ(2,"span",41),u._uU(3),u.qZA(),u.qZA()),2&t){const t=u.oxw();u.xp6(3),u.Oqu(t.BuildStudentFullName(t.student))}}function f(t,e){if(1&t&&(u.ynx(0),u.TgZ(1,"div",49),u.TgZ(2,"span"),u._uU(3),u.qZA(),u.qZA(),u.BQk()),2&t){const t=e.$implicit,n=u.oxw(3);u.xp6(3),u.hij(" ",n.BuildStudentFullName(t.student)," ")}}function x(t,e){if(1&t&&(u.ynx(0),u.TgZ(1,"div",49),u.TgZ(2,"span"),u._uU(3),u.qZA(),u.qZA(),u.BQk()),2&t){const t=e.$implicit;u.xp6(3),u.hij(" ",null==t.role?null:t.role.name," ")}}function Z(t,e){if(1&t&&(u.TgZ(0,"div",45),u.TgZ(1,"div",46),u.TgZ(2,"div",47),u.YNc(3,f,4,1,"ng-container",48),u.qZA(),u.TgZ(4,"div",47),u.YNc(5,x,4,1,"ng-container",48),u.qZA(),u.qZA(),u.qZA()),2&t){const t=u.oxw(2);u.xp6(3),u.Q6J("ngForOf",null==t.team?null:t.team.members),u.xp6(2),u.Q6J("ngForOf",null==t.team?null:t.team.members)}}function v(t,e){if(1&t&&(u.TgZ(0,"div",42),u.TgZ(1,"div",43),u._uU(2),u.qZA(),u.YNc(3,Z,6,2,"div",44),u.qZA()),2&t){const t=u.oxw();u.xp6(2),u.Oqu(null==t.team?null:t.team.name),u.xp6(1),u.Q6J("ngIf",!(null==t.team||null==t.team.members||!t.team.members.length))}}function h(t,e){if(1&t&&(u.TgZ(0,"div"),u._uU(1),u.qZA()),2&t){const t=u.oxw();u.xp6(1),u.Oqu(t.BuildStudentFullName(null==t.team?null:t.team.members[0].student))}}function y(t,e){if(1&t&&(u.TgZ(0,"div"),u._uU(1),u.qZA()),2&t){const t=u.oxw();u.xp6(1),u.Oqu(t.BuildStudentFullName(t.student))}}function b(t,e){1&t&&u._UZ(0,"div")}function w(t,e){if(1&t&&(u.TgZ(0,"div"),u.TgZ(1,"div",50),u.TgZ(2,"div",51),u._uU(3," Valor n\xfamerico "),u.qZA(),u.TgZ(4,"div",52),u.TgZ(5,"div",53),u._UZ(6,"input",54),u.qZA(),u.TgZ(7,"span"),u._uU(8,"sobre"),u.qZA(),u.TgZ(9,"span"),u._uU(10),u.qZA(),u.qZA(),u.qZA(),u.qZA()),2&t){const t=u.oxw();u.xp6(10),u.Oqu(null==t.parcialProduct?null:t.parcialProduct.maxCalification)}}function q(t,e){if(1&t&&(u.TgZ(0,"div",57),u.TgZ(1,"div",58),u._uU(2),u.qZA(),u.TgZ(3,"textarea",59),u.NdJ("ngModelChange",function(t){return e.$implicit.comments=t}),u.qZA(),u.qZA()),2&t){const t=e.$implicit,n=u.oxw(2);u.xp6(2),u.hij(" ",n.BuildStudentFullName(t.student)," "),u.xp6(1),u.Q6J("ngModel",t.comments)}}function _(t,e){if(1&t&&(u.TgZ(0,"div",28),u.TgZ(1,"span",29),u._uU(2,"3"),u.qZA(),u.TgZ(3,"div",30),u.TgZ(4,"div",31),u._uU(5," Agregar comentario a alg\xfan miembro del equipo "),u.qZA(),u.TgZ(6,"div",55),u.YNc(7,q,4,2,"div",56),u.qZA(),u.qZA(),u.qZA()),2&t){const t=u.oxw();u.xp6(7),u.Q6J("ngForOf",null==t.team?null:t.team.members)}}let A=(()=>{class t{constructor(t,e,n){this.activatedRoute=t,this.api=e,this.nav=n,this.strategy=null,this.student=null,this.team=null,this.parcialProduct=null,this.crumbs=[{name:"Evaluar",route:null}],this.evaluationForm=new r.cw({calification:new r.NI(null,[g.R.CheckOnlyIntegerNumbers]),comments:new r.NI(null,[])})}ngOnInit(){this.GetParams()}BuildStudentFullName(t){return t?`${t.name} ${t.fatherLastname} ${t.motherLastname}`:""}GetParams(){this.activatedRoute.params.subscribe(t=>{this.strategyId=t.strategyId,this.studentId=t.studentId,this.teamId=t.teamId,this.parcialProductId=t.parcialProductId,this.GetStrategy()})}GetStrategy(){this.api.Get(`/Strategies/${this.strategyId}`).subscribe(t=>{var e,n,i,a,l,r;this.strategy=t,t.strategyGroup&&this.crumbs.push({name:`${null===(n=null===(e=null==t?void 0:t.strategyGroup)||void 0===e?void 0:e.grade)||void 0===n?void 0:n.name}\xb0${null===(a=null===(i=null==t?void 0:t.strategyGroup)||void 0===i?void 0:i.group)||void 0===a?void 0:a.name}`.toUpperCase(),route:null}),t.isByTeams||this.GetStudent(),(null===(l=t.teams)||void 0===l?void 0:l.length)&&(this.team=t.teams.find(t=>t.id==this.teamId)),(null===(r=t.parcialProducts)||void 0===r?void 0:r.length)&&(this.parcialProduct=t.parcialProducts.find(t=>t.id==this.parcialProductId))},t=>{console.error("Error getting strategy",t)})}GetStudent(){this.api.Get(`/Students/${this.studentId}`).subscribe(t=>{this.student=t,this.crumbs.push({name:`${this.BuildStudentFullName(t)}`,route:null})})}}return t.\u0275fac=function(e){return new(e||t)(u.Y36(a.gz),u.Y36(c.sM),u.Y36(d.f))},t.\u0275cmp=u.Xpm({type:t,selectors:[["app-grade-product"]],decls:76,vars:24,consts:[[1,"content"],[1,"d-flex","justify-content-between","flex-wrap"],[3,"crumbs"],[1,"d-flex"],[1,"row","my-5",2,"gap","60px"],[1,"col-12"],[1,"d-flex","align-items-end","flex-wrap","flex-md-nowrap",2,"gap","13px"],[1,"d-flex","flex-column"],["class","d-flex align-items-center mb-3","style","gap: 16px;",4,"ngIf"],[1,"strategy-info-card"],[1,"text-primary","text-uppercase"],[1,"d-flex","align-items-center",2,"gap","12px"],["height","35",3,"src"],[1,"text-primary"],[1,"d-flex",2,"gap","24px","color","#2369B5"],[1,"text-success"],[1,"d-flex","flex-column","align-items-start"],[2,"font-size","16px"],["class","team-container w-100 flex-grow-1",4,"ngIf"],[1,"d-flex","align-items-center","flex-wrap",2,"gap","24px"],[1,"file-box"],[1,"info-col"],[1,"title"],[4,"ngIf"],[1,"btn","btn-success","d-flex","justify-content-center","align-items-center",2,"gap","6px","border-radius","12px !important"],["src","assets/icons/star-white.svg"],[1,"d-flex","flex-column",2,"gap","13px"],[3,"formGroup"],[1,"form-row"],[1,"instruction-number"],[1,"form-col"],[1,"form-section-title"],[1,"d-flex","flex-column","align-items-start","align-self-stretch",2,"gap","12px"],[3,"ngSwitch"],[4,"ngSwitchCase"],["placeholder","Comentario","rows","4",1,"form-control","with-border"],["class","form-row",4,"ngIf"],[1,"d-flex","justify-content-end","mt-4"],[1,"btn","btn-primary"],[1,"d-flex","align-items-center","mb-3",2,"gap","16px"],["src","assets/icons/user.svg","height","37"],[1,"student-name"],[1,"team-container","w-100","flex-grow-1"],[1,"title","mb-0"],["class","team w-100",4,"ngIf"],[1,"team","w-100"],[1,"d-flex","w-100",2,"gap","10px"],[1,"d-flex","flex-column","w-50",2,"gap","10px"],[4,"ngFor","ngForOf"],[1,"member"],[1,"d-flex","flex-column",2,"gap","12px"],[1,"text-bold"],[1,"d-flex","align-items-center","justify-content-start","text-1",2,"gap","12px"],[1,"input-container","m-0"],["placeholder","Calificaci\xf3n","type","text","formControlName","calification",1,"form-control","with-border","no-icon"],[1,"d-flex","align-items-start","align-self-stretch","flex-wrap",2,"gap","12px"],["class","flex-grow-1",4,"ngFor","ngForOf"],[1,"flex-grow-1"],[1,"fake-input-disabled","mb-2"],["placeholder","Comentario","rows","4",1,"form-control","with-border",3,"ngModel","ngModelChange"]],template:function(t,e){1&t&&(u.TgZ(0,"div",0),u.TgZ(1,"div",1),u._UZ(2,"app-breadcrumb",2),u._UZ(3,"div",3),u.qZA(),u.TgZ(4,"div",4),u.TgZ(5,"div",5),u.TgZ(6,"div",6),u.TgZ(7,"div",7),u.YNc(8,p,4,1,"div",8),u.TgZ(9,"div",9),u.TgZ(10,"div",10),u._uU(11),u.qZA(),u.TgZ(12,"div",11),u._UZ(13,"img",12),u.TgZ(14,"span",13),u._uU(15),u.qZA(),u.qZA(),u.TgZ(16,"div",14),u.TgZ(17,"span"),u._uU(18),u.ALo(19,"date"),u.qZA(),u.TgZ(20,"span"),u._uU(21,"-"),u.qZA(),u.TgZ(22,"span"),u._uU(23),u.ALo(24,"date"),u.qZA(),u.qZA(),u.TgZ(25,"span",15),u.TgZ(26,"b"),u._uU(27),u.qZA(),u.qZA(),u.TgZ(28,"div",16),u.TgZ(29,"div",13),u._uU(30,"T\xedtulo"),u.qZA(),u.TgZ(31,"span",17),u._uU(32),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.YNc(33,v,4,2,"div",18),u.qZA(),u.qZA(),u.TgZ(34,"div",5),u.TgZ(35,"div",19),u.TgZ(36,"div",20),u._uU(37," Archivo.pdf "),u.qZA(),u.TgZ(38,"div",21),u.TgZ(39,"div",22),u._uU(40,"Subido por"),u.qZA(),u.YNc(41,h,2,1,"div",23),u.YNc(42,y,2,1,"div",23),u.qZA(),u.TgZ(43,"div",21),u.TgZ(44,"div",22),u._uU(45,"Entregado el d\xeda"),u.qZA(),u.TgZ(46,"div"),u._uU(47,"30/08/23"),u.qZA(),u.qZA(),u.TgZ(48,"button",24),u._UZ(49,"img",25),u._uU(50," Agregar a favoritos "),u.qZA(),u.qZA(),u.qZA(),u.TgZ(51,"div",5),u.TgZ(52,"div",26),u.ynx(53,27),u.TgZ(54,"div",28),u.TgZ(55,"span",29),u._uU(56,"1"),u.qZA(),u.TgZ(57,"div",30),u.TgZ(58,"div",31),u._uU(59," Asigna la calificaci\xf3n en base a la r\xfabrica que creaste "),u.qZA(),u.TgZ(60,"div",32),u.TgZ(61,"div",33),u.YNc(62,b,1,0,"div",34),u.YNc(63,w,11,1,"div",34),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.TgZ(64,"div",28),u.TgZ(65,"span",29),u._uU(66,"2"),u.qZA(),u.TgZ(67,"div",30),u.TgZ(68,"div",31),u._uU(69," Agregar comentario al equipo "),u.qZA(),u.TgZ(70,"div",32),u._UZ(71,"textarea",35),u.qZA(),u.qZA(),u.qZA(),u.BQk(),u.YNc(72,_,8,1,"div",36),u.TgZ(73,"div",37),u.TgZ(74,"button",38),u._uU(75," Finalizar evaluaci\xf3n "),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.qZA()),2&t&&(u.xp6(2),u.Q6J("crumbs",e.crumbs),u.xp6(6),u.Q6J("ngIf",!(null!=e.strategy&&e.strategy.isByTeams)),u.xp6(3),u.AsE(" ",null==e.strategy||null==e.strategy.strategyGroup||null==e.strategy.strategyGroup.grade?null:e.strategy.strategyGroup.grade.name,"\xb0",null==e.strategy||null==e.strategy.strategyGroup||null==e.strategy.strategyGroup.group?null:e.strategy.strategyGroup.group.name," "),u.xp6(2),u.Q6J("src","assets/icons/"+(null==e.strategy||null==e.strategy.template?null:e.strategy.template.icon),u.LSH),u.xp6(2),u.Oqu(null==e.strategy||null==e.strategy.template?null:e.strategy.template.nickname),u.xp6(3),u.Oqu(u.xi3(19,18,null==e.strategy?null:e.strategy.startDate,"dd/MM/yyyy")),u.xp6(5),u.Oqu(u.xi3(24,21,null==e.strategy?null:e.strategy.endDate,"dd/MM/yyyy")),u.xp6(4),u.Oqu(null==e.strategy?null:e.strategy.topic),u.xp6(5),u.Oqu(null==e.strategy?null:e.strategy.title),u.xp6(1),u.Q6J("ngIf",null==e.strategy?null:e.strategy.isByTeams),u.xp6(8),u.Q6J("ngIf",e.strategy.isByTeams),u.xp6(1),u.Q6J("ngIf",!e.strategy.isByTeams),u.xp6(11),u.Q6J("formGroup",e.evaluationForm),u.xp6(8),u.Q6J("ngSwitch",null==e.parcialProduct||null==e.parcialProduct.evaluationType?null:e.parcialProduct.evaluationType.type),u.xp6(1),u.Q6J("ngSwitchCase","rubric"),u.xp6(1),u.Q6J("ngSwitchCase","numeric"),u.xp6(9),u.Q6J("ngIf",null==e.strategy?null:e.strategy.isByTeams))},directives:[m.L,i.O5,r.JL,r.sg,i.RF,i.n9,i.sg,r.Fj,r.JJ,r.u,r.On],pipes:[i.uU],styles:[".text-bold[_ngcontent-%COMP%]{font-weight:700}.text-1[_ngcontent-%COMP%], .text-bold[_ngcontent-%COMP%]{color:var(--gray-1,#3d5e81);font-family:Mulish;font-size:20px;font-style:normal;line-height:normal}.text-1[_ngcontent-%COMP%]{font-weight:500}.student-name[_ngcontent-%COMP%]{color:var(--blue-1,#1081fb);font-family:Mulish;font-size:24px;font-style:normal;font-weight:800;line-height:normal}.fake-input-disabled[_ngcontent-%COMP%]{width:-webkit-max-content;width:max-content;padding:6px 24px;align-items:center;border-radius:6px;border:1px solid var(--gray-1,#3d5e81);background:#f6f7f8}.fake-input-disabled[_ngcontent-%COMP%], .strategy-info-card[_ngcontent-%COMP%]{display:flex;max-width:100%;color:var(--gray-1,#3d5e81);font-family:Mulish;font-size:16px;font-style:normal;font-weight:500;line-height:normal}.strategy-info-card[_ngcontent-%COMP%]{width:350px;padding:12px;justify-content:center;flex-shrink:0;border-radius:6px;border:1px solid var(--gray-2,#758ca6);text-align:center}.strategy-info-card[_ngcontent-%COMP%], .team-container[_ngcontent-%COMP%]{flex-direction:column;align-items:flex-start;grid-gap:12px;gap:12px}.team-container[_ngcontent-%COMP%]{display:flex}.team-container[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{font-size:20px}.team-container[_ngcontent-%COMP%]   .team[_ngcontent-%COMP%], .team-container[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{color:var(--gray-1,#3d5e81);font-family:Mulish;font-style:normal;font-weight:500;line-height:normal}.team-container[_ngcontent-%COMP%]   .team[_ngcontent-%COMP%]{display:flex;padding:12px;flex-direction:column;align-items:flex-start;grid-gap:10px;gap:10px;border-radius:12px;background:var(--green-1,#26d7a4);text-align:center;font-size:16px}.team-container[_ngcontent-%COMP%]   .team[_ngcontent-%COMP%]   .member[_ngcontent-%COMP%]{display:flex;flex-wrap:nowrap;align-self:stretch;justify-content:flex-start;align-items:center;height:48px;padding:6px 24px;border-radius:6px;background-color:#f6f7f8}.team-container[_ngcontent-%COMP%]   .team[_ngcontent-%COMP%]   .member[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{width:100%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.file-box[_ngcontent-%COMP%]{width:-webkit-max-content;width:max-content;padding:10px;grid-gap:10px;gap:10px;border-radius:6px;border:1px solid var(--blue-1,#1081fb);color:var(--blue-1,#1081fb);font-size:12px}.file-box[_ngcontent-%COMP%], .info-col[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center}.info-col[_ngcontent-%COMP%]{flex-direction:column;grid-gap:6px;gap:6px;color:#3d5e81;font-family:Mulish;font-size:16px;font-style:normal;font-weight:500;line-height:normal}.info-col[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{margin:0;font-size:16px;font-weight:400;color:var(--blue-dark,#2369b5)}.instruction-number[_ngcontent-%COMP%]{margin-top:3px;color:var(--green-1,#26d7a4);font-size:24px;font-family:Mulish;font-weight:900}.form-row[_ngcontent-%COMP%]{flex-wrap:nowrap;width:100%}.form-row[_ngcontent-%COMP%], .form-row[_ngcontent-%COMP%]   .form-col[_ngcontent-%COMP%]{display:flex;align-items:flex-start;grid-gap:12px;gap:12px}.form-row[_ngcontent-%COMP%]   .form-col[_ngcontent-%COMP%]{flex-grow:1;flex-direction:column}.form-row[_ngcontent-%COMP%]   .form-section-instruction[_ngcontent-%COMP%]{font-size:16px}.form-row[_ngcontent-%COMP%]   .form-section-instruction[_ngcontent-%COMP%], .form-row[_ngcontent-%COMP%]   .form-section-title[_ngcontent-%COMP%]{color:var(--gray-1,#3d5e81);font-family:Mulish;font-style:normal;font-weight:500;line-height:normal}.form-row[_ngcontent-%COMP%]   .form-section-title[_ngcontent-%COMP%]{display:flex;align-items:flex-start;grid-gap:12px;gap:12px;font-size:20px}"]}),t})();var T=n(5709);const C=[{path:"",component:A}];let O=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=u.oAB({type:t}),t.\u0275inj=u.cJS({imports:[[r.u5,i.ez,l.A0,T.w,r.UX,o.G,s.zk.forRoot(),a.Bz.forChild(C)]]}),t})()},5821:(t,e,n)=>{"use strict";n.d(e,{R:()=>a});var i=n(7368);let a=(()=>{class t{constructor(){}static GetValidatorErrorMessage(t,e){return[{name:"required",label:"Campo requerido"},{name:"invalidRFC",label:"No tiene el formato adecuado"},{name:"invalidEmailAddress",label:"Correo inv\xe1lido"},{name:"invalidPassword",label:"Las contrase\xf1as no coinciden"},{name:"minlength",label:`M\xednimo ${e.requiredLength} caracteres `},{name:"maxlength",label:`M\xe1ximo ${e.requiredLength} caracteres `},{name:"invalidNumber",label:"Solo n\xfameros enteros, o con decimal"},{name:"invalidIntegerNumber",label:"Solo n\xfameros enteros"},{name:"matchstring",label:`${e.matchStringCustomLabel?e.matchStringCustomLabel:"El texto no coincide"}`}].find(e=>e.name==t)}static matchString(t,e=null){return n=>n.value?t==n.value?null:e?{matchstring:{requiredString:t,matchStringCustomLabel:e}}:{matchstring:t}:null}static CheckOnlyIntegerNumbers(t){return(null==t?void 0:t.value)?/^[0-9]+$/.test(null==t?void 0:t.value)?0==(null==t?void 0:t.value)?{invalidIntegerNumber:!0}:null:{invalidIntegerNumber:!0}:null}static CheckOnlyNumbers(t){return(null==t?void 0:t.value)?/^[1-9]\d*\.?\d*$/.test(null==t?void 0:t.value)?0==(null==t?void 0:t.value)?{invalidNumber:!0}:null:{invalidNumber:!0}:null}static EmailValidator(t){return(null==t?void 0:t.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/))?null:{invalidEmailAddress:!0}}static RfcValidator(t){return(null==t?void 0:t.value)&&(null==t?void 0:t.value.match(/^([A-Z\xd1&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/))?null:{invalidRFC:!0}}}return t.password="",t.confirmPassword="",t.\u0275fac=function(e){return new(e||t)},t.\u0275prov=i.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()}}]);