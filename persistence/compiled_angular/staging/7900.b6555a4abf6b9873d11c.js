(self.webpackChunktemplate_web=self.webpackChunktemplate_web||[]).push([[7900],{7900:(e,t,n)=>{"use strict";n.r(t),n.d(t,{CreateStrategyTeamsModule:()=>w});var s=n(1116),o=n(2894),i=n(4391),a=n(1041),r=n(6050),l=n(5470),c=n(6304),g=n(5959),u=n(7368),m=n(1392),d=n(407),p=n(4792);function f(e,t){1&e&&(u.TgZ(0,"div",6),u.TgZ(1,"div",7),u.TgZ(2,"div",8),u.TgZ(3,"div",9),u._uU(4," El grupo que seleccionaste no cuenta con alumnos, dir\xedgete a la secci\xf3n "),u.TgZ(5,"b"),u._uU(6,"Inicio"),u.qZA(),u._uU(7," o a la secci\xf3n "),u.TgZ(8,"b"),u._uU(9,"Datos de los alumnos"),u.qZA(),u._uU(10," para a\xf1adir alumnos. "),u.qZA(),u.qZA(),u.qZA(),u.qZA())}function h(e,t){if(1&e&&(u.TgZ(0,"ng-option",31),u._uU(1),u.qZA()),2&e){const e=t.$implicit;u.Q6J("value",e),u.xp6(1),u.hij("",e," equipos")}}function x(e,t){if(1&e&&(u.TgZ(0,"ng-option",31),u._uU(1),u.qZA()),2&e){const e=t.$implicit,n=u.oxw(4);u.Q6J("value",e),u.xp6(1),u.Oqu(n.BuildStudentFullName(e))}}function v(e,t){if(1&e){const e=u.EpF();u.TgZ(0,"div",40),u.TgZ(1,"span"),u._uU(2),u.qZA(),u.TgZ(3,"img",41),u.NdJ("click",function(){const t=u.CHM(e).index,n=u.oxw(2).$implicit;return u.oxw(3).RemoveMemberOfTeam(n,t)}),u.qZA(),u.qZA()}if(2&e){const e=t.$implicit,n=u.oxw(5);u.xp6(2),u.hij(" ",n.BuildStudentFullName(e)," ")}}function Z(e,t){if(1&e&&(u.TgZ(0,"div",38),u.YNc(1,v,4,1,"div",39),u.qZA()),2&e){const e=u.oxw().$implicit;u.xp6(1),u.Q6J("ngForOf",e.members)}}function y(e,t){if(1&e){const e=u.EpF();u.TgZ(0,"div",32),u.TgZ(1,"div",33),u.TgZ(2,"div",34),u._uU(3),u.qZA(),u.TgZ(4,"ng-select",35,36),u.NdJ("change",function(t){const n=u.CHM(e).$implicit,s=u.MAs(5);return u.oxw(3).OnStudentSelected(n,t,s)}),u.YNc(6,x,2,2,"ng-option",25),u.qZA(),u.YNc(7,Z,2,1,"div",37),u.qZA(),u.qZA()}if(2&e){const e=t.$implicit,n=t.index,s=u.oxw(3);u.xp6(3),u.hij("Equipo ",n+1,""),u.xp6(3),u.Q6J("ngForOf",s.studentsOptions),u.xp6(1),u.Q6J("ngIf",!(null==e||null==e.members||!e.members.length))}}function b(e,t){if(1&e){const e=u.EpF();u.ynx(0),u.TgZ(1,"div",7),u.TgZ(2,"span",11),u._uU(3,"2"),u.qZA(),u.TgZ(4,"div",8),u.TgZ(5,"div",12),u._uU(6," Selecciona la cantidad de equipos que quieres formar, conforme a la cantidad de alumnos que tienes "),u.qZA(),u.TgZ(7,"div",13),u.TgZ(8,"div",21),u.TgZ(9,"div",22),u._uU(10),u.qZA(),u.TgZ(11,"div",23),u._uU(12),u.qZA(),u.qZA(),u.TgZ(13,"ng-select",24),u.NdJ("change",function(t){return u.CHM(e),u.oxw(2).OnTeamsOptionSelected(t)}),u.YNc(14,h,2,2,"ng-option",25),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.TgZ(15,"div",7),u.TgZ(16,"span",11),u._uU(17,"3"),u.qZA(),u.TgZ(18,"div",8),u.TgZ(19,"div",12),u._uU(20," Acomoda a tus alumnos en los equipos "),u.qZA(),u.TgZ(21,"ng-select",26),u.NdJ("change",function(t){return u.CHM(e),u.oxw(2).OnFillModeChange(t)}),u.TgZ(22,"ng-option",27),u._uU(23,"Manual"),u.qZA(),u.TgZ(24,"ng-option",28),u._uU(25,"Aleatorio"),u.qZA(),u.qZA(),u.TgZ(26,"div",29),u.YNc(27,y,8,3,"div",30),u.qZA(),u.qZA(),u.qZA(),u.BQk()}if(2&e){const e=u.oxw(2);u.xp6(10),u.AsE(" ",null==e.grade?null:e.grade.name,"\xb0 ",null==e.group?null:e.group.name," "),u.xp6(2),u.hij(" ",e.students.length," Alumnos "),u.xp6(2),u.Q6J("ngForOf",e.teamsOptions),u.xp6(7),u.Q6J("clearable",!1),u.xp6(6),u.Q6J("ngForOf",e.strategyTeams)}}function T(e,t){if(1&e){const e=u.EpF();u.TgZ(0,"div",10),u.TgZ(1,"div",7),u.TgZ(2,"span",11),u._uU(3,"1"),u.qZA(),u.TgZ(4,"div",8),u.TgZ(5,"div",12),u._uU(6," \xbfDeseas que tu proyecto sea por equipos? "),u.qZA(),u.TgZ(7,"div",13),u.TgZ(8,"label",14),u._uU(9," Si "),u.TgZ(10,"input",15),u.NdJ("change",function(){return u.CHM(e),u.oxw().saver.next()}),u.qZA(),u._UZ(11,"span",16),u.qZA(),u.TgZ(12,"label",17),u._uU(13," No "),u.TgZ(14,"input",18),u.NdJ("change",function(){return u.CHM(e),u.oxw().saver.next()}),u.qZA(),u._UZ(15,"span",16),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.YNc(16,b,28,6,"ng-container",19),u.TgZ(17,"button",20),u.NdJ("click",function(){return u.CHM(e),u.oxw().SaveAll(!0)}),u._uU(18," Continuar "),u.qZA(),u.qZA()}if(2&e){const e=u.oxw();let t;u.Q6J("formGroup",e.strategyTeamsForm),u.xp6(10),u.Q6J("value",!0),u.xp6(4),u.Q6J("value",!1),u.xp6(2),u.Q6J("ngIf",!(null==(t=e.strategyTeamsForm.get("isByTeams"))||!t.value))}}let O=(()=>{class e{constructor(e,t,n){this.activatedRoute=e,this.api=t,this.nav=n,this.students=[],this.studentsOptions=[],this.teamsOptions=[2,3,4,5,6,7,8],this.strategyTeams=[],this.saver=new g.xQ,this.saving=!1,this.crumbs=[{name:"Equipos",route:null},{name:"Asigna a tus alumnos",route:null}],this.strategyTeamsForm=new a.cw({isByTeams:new a.NI(null,[a.kI.required]),teamsNumber:new a.NI(null,[]),fillMode:new a.NI("manual",[])})}ngOnInit(){this.saver.subscribe(()=>{this.SaveAll()}),this.GetParams()}BuildStudentFullName(e){return`${e.name} ${e.fatherLastname} ${e.motherLastname}`}GetParams(){this.activatedRoute.params.subscribe(e=>{this.strategyId=e.strategyId,this.GetStrategy()})}SaveAll(e=!1){var t=this;return(0,c.Z)(function*(){if(!t.saving)try{t.saving=!0,yield t.SaveStrategy(),yield t.SaveStrategyTeams(),t.saving=!1,e&&t.nav.GoToUserRoute(`mis-estrategias/${t.strategyId}/${t.strategyTeamsForm.value.isByTeams?"asignar-roles":"progreso-equipos"}`)}catch(n){console.error("Error saving changes",n),t.saving=!1}})()}GetStrategy(){this.api.Get(`/Strategies/${this.strategyId}`).subscribe(e=>{var t,n,s,o;null===(t=this.strategyTeamsForm.get("isByTeams"))||void 0===t||t.setValue(e.isByTeams),this.strategy=e,this.grade=e.strategyGroup?e.strategyGroup.grade:null,this.group=e.strategyGroup?e.strategyGroup.group:null,(null===(n=e.teams)||void 0===n?void 0:n.length)&&(null===(s=this.strategyTeamsForm.get("teamsNumber"))||void 0===s||s.setValue(null===(o=e.teams)||void 0===o?void 0:o.length),this.strategyTeams=e.teams.map(e=>(e.members=e.members.map(e=>e.student),e))),this.GetGradeGroupStudents()},e=>{console.error("Error getting strategy",e)})}SaveStrategy(){return new Promise((e,t)=>{let n=Object.assign({id:this.strategyId},this.strategyTeamsForm.value);this.api.Patch(`/Strategies/${this.strategyId}/OnlyStrategy/1`,{strategy:n}).subscribe(t=>{e()},e=>{console.error("Error saving strategy",e),t(e)})})}SaveStrategyTeams(){return new Promise((e,t)=>{this.api.Patch(`/Teams/OfStrategy/${this.strategyId}`,{teams:this.strategyTeams}).subscribe(t=>{e()},e=>{console.error("Error patching teams",e),t(e)})})}GetGradeGroupStudents(){var e;let t="/Students";const n=this.api.GetUser();switch(null===(e=null==n?void 0:n.role)||void 0===e?void 0:e.name){case"School":t+=`/OfSchool/${n.schoolId}`;break;case"Teacher":t+=`/OfTeacher/${n.id}`;break;default:t+=`/OfSchool/${n.schoolId}`}this.api.Get(`${t}/FilteredBy/Grade/${this.grade?this.grade.id:0}/Group/${this.group?this.group.id:0}`).subscribe(e=>{this.students=e,this.strategyTeams.length&&(this.studentsOptions=e.filter(e=>!this.strategyTeams.some(t=>t.members.some(t=>t.id==e.id))))},e=>{console.error("Error getting students",e)})}OnFillModeChange(e){if("auto"==e){const e=this.strategyTeams.length;if(e>0){this.OnTeamsOptionSelected(e);let t=Math.ceil(this.studentsOptions.length/e);this.strategyTeams.forEach(e=>{for(let n=0;n<t;n++){let t=Math.floor(this.studentsOptions.length*Math.random());this.OnStudentSelected(e,this.studentsOptions[t],null)}})}}}OnTeamsOptionSelected(e){if(e){this.studentsOptions=Array.from(this.students),this.strategyTeams=[];for(let t=0;t<e;t++)this.strategyTeams.push(Object.assign({},{members:[]}));this.saver.next()}}OnStudentSelected(e,t,n){if(t){e.members.push(t);const s=this.studentsOptions.findIndex(e=>e.id==(null==t?void 0:t.id));-1!=s&&this.studentsOptions.splice(s,1),n&&n.handleClearClick(),this.saver.next()}}RemoveMemberOfTeam(e,t){this.studentsOptions.push(...e.members.splice(t,1)),this.saver.next()}}return e.\u0275fac=function(t){return new(t||e)(u.Y36(o.gz),u.Y36(m.sM),u.Y36(d.f))},e.\u0275cmp=u.Xpm({type:e,selectors:[["app-create-strategy-teams"]],decls:6,vars:3,consts:[[1,"content"],[1,"d-flex","justify-content-between","flex-wrap"],[3,"crumbs"],[1,"d-flex"],["class","d-flex flex-column mt-5",4,"ngIf"],["class","d-flex flex-column mt-5","style","gap: 13px;",3,"formGroup",4,"ngIf"],[1,"d-flex","flex-column","mt-5"],[1,"form-row"],[1,"form-col"],[1,"no-students-message"],[1,"d-flex","flex-column","mt-5",2,"gap","13px",3,"formGroup"],[1,"instruction-number"],[1,"form-section-title"],[1,"d-flex","flex-column","align-items-start",2,"gap","12px"],["for","isByTeamsYes",1,"m-0","checkbox-label"],["type","radio","id","isByTeamsYes","name","isByTeams","formControlName","isByTeams",1,"checkbox-input",3,"value","change"],[1,"checkbox-custom"],["for","isByTeamsNo",1,"m-0","checkbox-label"],["type","radio","id","isByTeamsNo","name","isByTeams","formControlName","isByTeams",1,"checkbox-input",3,"value","change"],[4,"ngIf"],[1,"btn","align-self-end","btn-primary",3,"click"],[1,"d-flex",2,"gap","12px"],[1,"fake-input-disabled","text-uppercase"],[1,"fake-input-disabled"],["placeholder","Equipos","formControlName","teamsNumber",1,"form-control","with-border","align-self-stretch",3,"change"],[3,"value",4,"ngFor","ngForOf"],["formControlName","fillMode","placeholder","Acomodo",1,"form-control","with-border","align-self-stretch",3,"clearable","change"],["value","manual"],["value","auto"],[1,"row","align-self-stretch"],["class","col-12 col-md-6 col-lg-4",4,"ngFor","ngForOf"],[3,"value"],[1,"col-12","col-md-6","col-lg-4"],[1,"team-container"],[1,"title"],["placeholder","Selecciona estudiante",1,"form-control","with-border",3,"change"],["studentsSelect",""],["class","team align-self-stretch",4,"ngIf"],[1,"team","align-self-stretch"],["class","member",4,"ngFor","ngForOf"],[1,"member"],["src","assets/icons/delete.svg","alt","delete",1,"clickeable",3,"click"]],template:function(e,t){1&e&&(u.TgZ(0,"div",0),u.TgZ(1,"div",1),u._UZ(2,"app-breadcrumb",2),u._UZ(3,"div",3),u.qZA(),u.YNc(4,f,11,0,"div",4),u.YNc(5,T,19,4,"div",5),u.qZA()),2&e&&(u.xp6(2),u.Q6J("crumbs",t.crumbs),u.xp6(2),u.Q6J("ngIf",0==t.students.length),u.xp6(1),u.Q6J("ngIf",t.students.length>0))},directives:[p.L,s.O5,a.JL,a.sg,a._,a.Fj,a.JJ,a.u,i.w9,s.sg,i.xv],styles:['@charset "UTF-8";.instruction-number[_ngcontent-%COMP%]{margin-top:3px;color:var(--green-1,#26d7a4);font-size:24px;font-family:Mulish;font-weight:900}.form-row[_ngcontent-%COMP%]{flex-wrap:nowrap;width:100%}.form-row[_ngcontent-%COMP%], .form-row[_ngcontent-%COMP%]   .form-col[_ngcontent-%COMP%]{display:flex;align-items:flex-start;grid-gap:12px;gap:12px}.form-row[_ngcontent-%COMP%]   .form-col[_ngcontent-%COMP%]{flex-grow:1;flex-direction:column}.form-row[_ngcontent-%COMP%]   .form-section-instruction[_ngcontent-%COMP%]{color:var(--gray-1,#3d5e81);font-family:Mulish;font-size:16px;font-style:normal;font-weight:500;line-height:normal}.form-row[_ngcontent-%COMP%]   .form-section-title[_ngcontent-%COMP%]{display:flex;align-items:flex-start;grid-gap:12px;gap:12px}.form-row[_ngcontent-%COMP%]   .form-section-title[_ngcontent-%COMP%], .no-students-message[_ngcontent-%COMP%]{color:var(--gray-1,#3d5e81);font-size:20px;font-family:Mulish;font-style:normal;font-weight:500;line-height:normal}.no-students-message[_ngcontent-%COMP%]   b[_ngcontent-%COMP%]{color:var(--green-1,#26d7a4)}.checkbox-input[_ngcontent-%COMP%]{display:none}.checkbox-label[_ngcontent-%COMP%]{display:inline-block;position:relative;padding-left:30px;cursor:pointer;font-size:16px}.checkbox-custom[_ngcontent-%COMP%]{position:absolute;top:0;left:0;width:20px;height:20px;border:2px solid #2369b5;background-color:#fff;border-radius:3px}.checkbox-input[_ngcontent-%COMP%]:checked + .checkbox-custom[_ngcontent-%COMP%]:after{content:"\u2713";font-size:18px;color:#2369b5;position:absolute;top:50%;left:50%;transform:translateX(-50%) translateY(-50%)}.fake-input-disabled[_ngcontent-%COMP%]{display:flex;width:-webkit-max-content;width:max-content;max-width:100%;padding:6px 24px;align-items:center;border-radius:6px;border:1px solid var(--gray-1,#3d5e81);background:#f6f7f8;color:var(--gray-1,#3d5e81);font-family:Mulish;font-size:16px;font-style:normal;font-weight:500;line-height:normal}.team-container[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:flex-start;grid-gap:12px;gap:12px}.team-container[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{font-size:20px}.team-container[_ngcontent-%COMP%]   .team[_ngcontent-%COMP%], .team-container[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{color:var(--gray-1,#3d5e81);font-family:Mulish;font-style:normal;font-weight:500;line-height:normal}.team-container[_ngcontent-%COMP%]   .team[_ngcontent-%COMP%]{display:flex;padding:12px;flex-direction:column;align-items:flex-start;grid-gap:10px;gap:10px;border-radius:12px;background:var(--gray-3,#c1ccd7);text-align:center;font-size:16px}.team-container[_ngcontent-%COMP%]   .team[_ngcontent-%COMP%]   .member[_ngcontent-%COMP%]{display:flex;align-self:stretch;height:43px;padding:6px 24px;justify-content:space-between;align-items:center;border-radius:6px;background:var(--d-9-d-9-d-9,#fff)}']}),e})();var _=n(5709);const q=[{path:"",component:O}];let w=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=u.oAB({type:e}),e.\u0275inj=u.cJS({imports:[[a.u5,s.ez,i.A0,_.w,a.UX,r.G,l.zk.forRoot(),o.Bz.forChild(q)]]}),e})()}}]);