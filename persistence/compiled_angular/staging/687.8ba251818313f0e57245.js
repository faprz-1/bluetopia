(self.webpackChunktemplate_web=self.webpackChunktemplate_web||[]).push([[687],{6158:(t,e,n)=>{"use strict";n.d(e,{w:()=>s});var o=n(5821),r=n(7368),i=n(1116);function a(t,e){if(1&t&&(r.TgZ(0,"div",1),r._uU(1),r.qZA()),2&t){const t=r.oxw();r.xp6(1),r.hij(" ",null==t.errorMessage?null:t.errorMessage.label,"\n")}}let s=(()=>{class t{constructor(){}ngOnInit(){}get errorMessage(){var t,e,n,r;for(let i in null===(t=this.control)||void 0===t?void 0:t.errors)if((null===(e=this.control)||void 0===e?void 0:e.errors.hasOwnProperty(i))&&(null===(n=this.control)||void 0===n?void 0:n.touched))return o.R.GetValidatorErrorMessage(i,null===(r=this.control)||void 0===r?void 0:r.errors[i]);return null}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=r.Xpm({type:t,selectors:[["app-control-messages"]],inputs:{control:"control"},decls:1,vars:1,consts:[["class","color-red",4,"ngIf"],[1,"color-red"]],template:function(t,e){1&t&&r.YNc(0,a,2,1,"div",0),2&t&&r.Q6J("ngIf",null!==e.errorMessage)},directives:[i.O5],styles:[""]}),t})()},7536:(t,e,n)=>{"use strict";n.d(e,{d:()=>O});var o=n(7368),r=n(1041),i=n(1392),a=n(6189),s=n(1116),l=n(5470),c=n(6158),d=n(4391);const u=["addStudentModal"],g=function(t){return{active:t}};function p(t,e){if(1&t){const t=o.EpF();o.ynx(0),o.TgZ(1,"div",29),o.NdJ("click",function(){const e=o.CHM(t).$implicit;return o.oxw(2).SelectGrade(e)}),o._uU(2),o.qZA(),o.BQk()}if(2&t){const t=e.$implicit,n=o.oxw(2);o.xp6(1),o.Q6J("ngClass",o.VKq(2,g,t.key==(null==n.selectedGrade?null:n.selectedGrade.key))),o.xp6(1),o.hij(" ",t.key,"\xb0Grado ")}}function m(t,e){if(1&t){const t=o.EpF();o.TgZ(0,"div",30),o.NdJ("click",function(){return o.CHM(t),o.oxw(2).AddGrade()}),o._UZ(1,"i",31),o.qZA()}}function h(t,e){if(1&t&&(o.TgZ(0,"div",39),o.TgZ(1,"span",40),o._uU(2),o.qZA(),o._uU(3),o.qZA()),2&t){const t=e.$implicit,n=e.index;o.xp6(2),o.Oqu(n+1),o.xp6(1),o.lnq(" ",t.name," ",t.fatherLastname," ",t.motherLastname," ")}}function f(t,e){if(1&t){const t=o.EpF();o.TgZ(0,"div",41),o.TgZ(1,"div",35),o._uU(2," Estrategias "),o.qZA(),o.TgZ(3,"div",42),o.TgZ(4,"div",11),o._UZ(5,"ng-select",43),o.qZA(),o.qZA(),o._UZ(6,"div",44),o.TgZ(7,"div",45),o.TgZ(8,"button",46),o.NdJ("click",function(){o.CHM(t);const e=o.oxw().$implicit;return o.oxw(2).onCreateNewStrategy.emit(e)}),o._uU(9," Crear nueva estrategia "),o.qZA(),o.TgZ(10,"button",47),o.NdJ("click",function(){o.CHM(t);const e=o.oxw().$implicit;return o.oxw(2).onApplyExistentStrategy.emit(e)}),o._uU(11," Aplicar estrategia existente "),o.qZA(),o.qZA(),o.qZA()}if(2&t){const t=o.oxw(3);o.xp6(5),o.Q6J("items",t.strategiesStatuses)}}function Z(t,e){if(1&t&&(o.TgZ(0,"div",32),o.TgZ(1,"div",33),o.TgZ(2,"div",34),o.TgZ(3,"div",35),o._uU(4),o.qZA(),o.TgZ(5,"div",36),o.YNc(6,h,4,4,"div",37),o.qZA(),o.qZA(),o.YNc(7,f,12,1,"div",38),o.qZA(),o.qZA()),2&t){const t=e.$implicit,n=o.oxw(2);o.xp6(4),o.hij(" Grupo ",t[0].group," "),o.xp6(2),o.Q6J("ngForOf",t),o.xp6(1),o.Q6J("ngIf",n.teacherControls)}}function v(t,e){1&t&&(o.TgZ(0,"div",48),o.TgZ(1,"button",49),o._uU(2," Agregar grupo "),o.qZA(),o.qZA())}function x(t,e){if(1&t&&(o.TgZ(0,"div",22),o.TgZ(1,"div",23),o.YNc(2,p,3,4,"ng-container",24),o.YNc(3,m,2,0,"div",25),o.qZA(),o.TgZ(4,"div",26),o.YNc(5,Z,8,3,"div",27),o.YNc(6,v,3,0,"div",28),o.qZA(),o.qZA()),2&t){const t=o.oxw();o.xp6(2),o.Q6J("ngForOf",t.grades),o.xp6(1),o.Q6J("ngIf",t.adminControls),o.xp6(2),o.Q6J("ngForOf",null==t.selectedGrade?null:t.selectedGrade.groups),o.xp6(1),o.Q6J("ngIf",t.adminControls)}}const b=function(t){return{"active-2":t}};function w(t,e){if(1&t){const t=o.EpF();o.ynx(0),o.TgZ(1,"div",53),o.NdJ("click",function(){const e=o.CHM(t).$implicit;return o.oxw(2).SelectGrade(e)}),o._uU(2),o.qZA(),o.BQk()}if(2&t){const t=e.$implicit,n=o.oxw(2);o.xp6(1),o.Q6J("ngClass",o.VKq(2,b,t.key==(null==n.selectedGrade?null:n.selectedGrade.key))),o.xp6(1),o.hij(" ",t.key,"\xb0Grado ")}}function A(t,e){if(1&t){const t=o.EpF();o.TgZ(0,"div",30),o.NdJ("click",function(){return o.CHM(t),o.oxw(2).AddGrade()}),o._UZ(1,"i",31),o.qZA()}}function q(t,e){if(1&t&&(o.TgZ(0,"div",39),o.TgZ(1,"span",40),o._uU(2),o.qZA(),o._uU(3),o.qZA()),2&t){const t=e.$implicit,n=e.index;o.xp6(2),o.Oqu(n+1),o.xp6(1),o.lnq(" ",t.name," ",t.fatherLastname," ",t.motherLastname," ")}}function C(t,e){if(1&t){const t=o.EpF();o.TgZ(0,"div",58),o.TgZ(1,"button",59),o.NdJ("click",function(){o.CHM(t);const e=o.oxw().$implicit;return o.oxw(2).onCreateNewStrategy.emit(e)}),o._uU(2," Calificar alumnos "),o.qZA(),o.TgZ(3,"div",60),o.NdJ("click",function(){o.CHM(t);const e=o.oxw().$implicit,n=o.oxw(2),r=o.MAs(3);return n.SetStudentFormRelations(e[0]),r.show()}),o._uU(4," Agregar alumno "),o.qZA(),o.qZA()}}function y(t,e){if(1&t&&(o.TgZ(0,"div",54),o.TgZ(1,"div",55),o._uU(2),o.qZA(),o.TgZ(3,"div",56),o.YNc(4,q,4,4,"div",37),o.qZA(),o.YNc(5,C,5,0,"div",57),o.qZA()),2&t){const t=e.$implicit,n=o.oxw(2);o.xp6(2),o.hij(" Grupo ",t[0].group," "),o.xp6(2),o.Q6J("ngForOf",t),o.xp6(1),o.Q6J("ngIf",n.teacherControls)}}function _(t,e){1&t&&(o.TgZ(0,"div",48),o.TgZ(1,"button",49),o._uU(2," Agregar grupo "),o.qZA(),o.qZA())}function T(t,e){if(1&t&&(o.TgZ(0,"div",22),o.TgZ(1,"div",50),o.YNc(2,w,3,4,"ng-container",24),o.YNc(3,A,2,0,"div",25),o.qZA(),o.TgZ(4,"div",51),o.YNc(5,y,6,3,"div",52),o.YNc(6,_,3,0,"div",28),o.qZA(),o.qZA()),2&t){const t=o.oxw();o.xp6(2),o.Q6J("ngForOf",t.grades),o.xp6(1),o.Q6J("ngIf",t.adminControls),o.xp6(2),o.Q6J("ngForOf",null==t.selectedGrade?null:t.selectedGrade.groups),o.xp6(1),o.Q6J("ngIf",t.adminControls)}}const k=function(){return{backdrop:"static",keyboard:!1}};let O=(()=>{class t{constructor(t,e){this.api=t,this.toast=e,this.students=[],this.adminControls=!1,this.teacherControls=!1,this.newDashboard=!1,this.onStudentSearch=null,this.onChange=null,this.onAddGroup=new o.vpe,this.onAddGrade=new o.vpe,this.onApplyExistentStrategy=new o.vpe,this.onCreateNewStrategy=new o.vpe,this.onReload=new o.vpe,this.grades=[],this.selectedGrade=null,this.strategiesStatuses=[],this.subscriptions=[],this.studentForm=new r.cw({name:new r.NI("",[r.kI.required]),fatherLastname:new r.NI("",[r.kI.required]),motherLastname:new r.NI("",[]),registerNumber:new r.NI("",[r.kI.required]),grade:new r.NI("",[r.kI.required]),group:new r.NI("",[r.kI.required]),schoolId:new r.NI("",[]),teacherUserId:new r.NI("",[])})}ngOnInit(){var t,e;this.FormatStudents(),this.subscriptions.push(null===(t=this.onStudentSearch)||void 0===t?void 0:t.subscribe(t=>{})),this.subscriptions.push(null===(e=this.onChange)||void 0===e?void 0:e.subscribe(t=>{this.students=t,this.FormatStudents()}))}ngOnDestroy(){for(var t;this.subscriptions.length;)null===(t=this.subscriptions.pop())||void 0===t||t.unsubscribe()}FormatStudents(){this.students=this.students.map(t=>(t.hasOwnProperty("studentGroup")&&(t.group=t.studentGroup.group?t.studentGroup.group.name:"sin grupo",t.grade=t.studentGroup.grade?t.studentGroup.grade.name:"sin grado"),t)),this.GroupStudents()}GroupStudents(){let t={};this.grades=[],this.students.forEach(e=>{t[e.grade]?t[e.grade].push(e):t[e.grade]=[e]});for(const e in t){let n={};Object.prototype.hasOwnProperty.call(t,e)&&(t[e].forEach(t=>{n[t.group]?n[t.group].push(t):n[t.group]=[t]}),this.grades.push({key:e,groups:this.ObjectToArray(n)}))}this.grades.sort((t,e)=>t.key>e.key?1:t.key<e.key?-1:0),this.grades.length>0&&(this.selectedGrade=this.grades[0])}ObjectToArray(t){let e=[];for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e.push(t[n]);return e}SelectGrade(t){this.selectedGrade=t}AddGrade(){}SetStudentFormRelations(t){var e,n,o,r;null===(e=this.studentForm.get("grade"))||void 0===e||e.setValue(t.grade),null===(n=this.studentForm.get("group"))||void 0===n||n.setValue(t.group),null===(o=this.studentForm.get("schoolId"))||void 0===o||o.setValue(t.schoolId),null===(r=this.studentForm.get("teacherUserId"))||void 0===r||r.setValue(t.teacherUserId)}AddStudent(){if(this.studentForm.invalid)return this.toast.ShowWarning("Favor de llenar los campos obligatorios"),void this.studentForm.markAllAsTouched();this.api.Post("/Students",{student:this.studentForm.value}).subscribe(t=>{var e;this.toast.ShowSuccess("Estudiante agregado con exito"),null===(e=this.addStudentModal)||void 0===e||e.hide(),this.onReload.emit()},t=>{console.error("Error creating a student",t),this.toast.ShowError("Error al crear estudiante")})}}return t.\u0275fac=function(e){return new(e||t)(o.Y36(i.sM),o.Y36(a.k))},t.\u0275cmp=o.Xpm({type:t,selectors:[["app-grades-groups-view"]],viewQuery:function(t,e){if(1&t&&o.Gf(u,5),2&t){let t;o.iGM(t=o.CRH())&&(e.addStudentModal=t.first)}},inputs:{students:"students",adminControls:"adminControls",teacherControls:"teacherControls",newDashboard:"newDashboard",onStudentSearch:"onStudentSearch",onChange:"onChange"},outputs:{onAddGroup:"onAddGroup",onAddGrade:"onAddGrade",onApplyExistentStrategy:"onApplyExistentStrategy",onCreateNewStrategy:"onCreateNewStrategy",onReload:"onReload"},decls:39,vars:9,consts:[["class","component-content",4,"ngIf"],["bsModal","","tabindex","-1","role","dialog","aria-labelledby","addStudentModal",1,"modal","fade",3,"config"],["addStudentModal","bs-modal"],[1,"modal-dialog","modal-lg"],[1,"modal-content"],[1,"modal-header"],[1,"modal-title"],[1,"modal-body"],[3,"formGroup"],[1,"row"],[1,"col-12"],[1,"input-container"],["type","text","placeholder","Nombre","formControlName","name",1,"form-control","no-icon",3,"keyup.enter"],[1,"required-span"],[3,"control"],[1,"col-12","col-md-6"],["type","text","placeholder","Apellido paterno","formControlName","fatherLastname",1,"form-control","no-icon",3,"keyup.enter"],["type","text","placeholder","Apellido materno","formControlName","motherLastname",1,"form-control","no-icon",3,"keyup.enter"],["type","text","placeholder","N\xfamero de registro","formControlName","registerNumber",1,"form-control","no-icon",3,"keyup.enter"],[1,"modal-footer","justify-content-between"],[1,"btn","btn-outline-primary","modal-btn",3,"click"],[1,"btn","btn-primary","modal-btn",3,"click"],[1,"component-content"],[1,"d-flex"],[4,"ngFor","ngForOf"],["class","btn-add-grade clickeable text-success",3,"click",4,"ngIf"],[1,"row","mt-3"],["class","col-12 col-lg-6",4,"ngFor","ngForOf"],["class","col-12 col-lg-6 add-group-col",4,"ngIf"],[1,"tab","clickeable",3,"ngClass","click"],[1,"btn-add-grade","clickeable","text-success",3,"click"],[1,"zmdi","zmdi-plus-circle-o","zmdi-hc-2x"],[1,"col-12","col-lg-6"],[1,"group-card"],[1,"students-list"],[1,"group-title"],[1,"students"],["class","student",4,"ngFor","ngForOf"],["class","group-controls",4,"ngIf"],[1,"student"],[1,"mr-2"],[1,"group-controls"],[1,"filters"],["bindLabel","name","placeholder","Filtrar por estado",1,"form-control",3,"items"],[1,"strategies"],[1,"controls"],[1,"btn","btn-primary","btn-block",3,"click"],[1,"btn","btn-outline-primary","btn-block",3,"click"],[1,"col-12","col-lg-6","add-group-col"],[1,"btn","btn-success","btn-add-group"],[1,"px-4","d-flex"],[1,"teacher-dashboard-row"],["class","group-card-2 m-4 flex-column justify-content-between",4,"ngFor","ngForOf"],[1,"tab","border-bottom-0","clickeable",3,"ngClass","click"],[1,"group-card-2","m-4","flex-column","justify-content-between"],[1,"group-title-2"],[1,"students-2","flex-grow-1"],["class","controls mt-3",4,"ngIf"],[1,"controls","mt-3"],[1,"btn","btn-outline-success","btn-block",3,"click"],[1,"_link","clickeable",3,"click"]],template:function(t,e){if(1&t){const t=o.EpF();o.YNc(0,x,7,4,"div",0),o.YNc(1,T,7,4,"div",0),o.TgZ(2,"div",1,2),o.TgZ(4,"div",3),o.TgZ(5,"div",4),o.TgZ(6,"div",5),o.TgZ(7,"h2",6),o._uU(8,"Agregar alumno"),o.qZA(),o.qZA(),o.TgZ(9,"div",7),o.TgZ(10,"form",8),o.TgZ(11,"div",9),o.TgZ(12,"div",10),o.TgZ(13,"div",11),o.TgZ(14,"input",12),o.NdJ("keyup.enter",function(){return e.AddStudent()}),o.qZA(),o.TgZ(15,"span",13),o._uU(16,"*"),o.qZA(),o.qZA(),o._UZ(17,"app-control-messages",14),o.qZA(),o.TgZ(18,"div",15),o.TgZ(19,"div",11),o.TgZ(20,"input",16),o.NdJ("keyup.enter",function(){return e.AddStudent()}),o.qZA(),o.TgZ(21,"span",13),o._uU(22,"*"),o.qZA(),o.qZA(),o._UZ(23,"app-control-messages",14),o.qZA(),o.TgZ(24,"div",15),o.TgZ(25,"div",11),o.TgZ(26,"input",17),o.NdJ("keyup.enter",function(){return e.AddStudent()}),o.qZA(),o.qZA(),o._UZ(27,"app-control-messages",14),o.qZA(),o.TgZ(28,"div",15),o.TgZ(29,"div",11),o.TgZ(30,"input",18),o.NdJ("keyup.enter",function(){return e.AddStudent()}),o.qZA(),o.TgZ(31,"span",13),o._uU(32,"*"),o.qZA(),o.qZA(),o._UZ(33,"app-control-messages",14),o.qZA(),o.qZA(),o.qZA(),o.qZA(),o.TgZ(34,"div",19),o.TgZ(35,"button",20),o.NdJ("click",function(){return o.CHM(t),o.MAs(3).hide()}),o._uU(36," Cancelar "),o.qZA(),o.TgZ(37,"button",21),o.NdJ("click",function(){return e.AddStudent()}),o._uU(38," Agregar "),o.qZA(),o.qZA(),o.qZA(),o.qZA(),o.qZA()}2&t&&(o.Q6J("ngIf",!e.newDashboard),o.xp6(1),o.Q6J("ngIf",e.newDashboard),o.xp6(1),o.Q6J("config",o.DdM(8,k)),o.xp6(8),o.Q6J("formGroup",e.studentForm),o.xp6(7),o.Q6J("control",e.studentForm.get("name")),o.xp6(6),o.Q6J("control",e.studentForm.get("fatherLastname")),o.xp6(4),o.Q6J("control",e.studentForm.get("motherLastname")),o.xp6(6),o.Q6J("control",e.studentForm.get("registerNumber")))},directives:[s.O5,l.oB,r._Y,r.JL,r.sg,r.Fj,r.JJ,r.u,c.w,s.sg,s.mk,d.w9],styles:[".component-content[_ngcontent-%COMP%]{width:100%;max-height:100%;font-family:Mulish!important}.tab[_ngcontent-%COMP%]{font-size:.75rem;color:#758ca6;padding:8px 16px;border:2px solid #758ca6;border-radius:6px 6px 0 0;margin-right:12px}.active[_ngcontent-%COMP%], .active-2[_ngcontent-%COMP%]{border-color:#1081fb!important;color:#1081fb!important}.active-2[_ngcontent-%COMP%]{font-weight:700;font-size:1rem;background-color:#f2f8ff}.group-title[_ngcontent-%COMP%]{font-weight:600;margin-bottom:12px}.group-title[_ngcontent-%COMP%], .group-title-2[_ngcontent-%COMP%]{text-transform:capitalize;font-size:1rem;color:#1081fb;text-align:left}.group-title-2[_ngcontent-%COMP%]{font-weight:700;font-weight:600;margin-bottom:16px}.group-card[_ngcontent-%COMP%]{max-width:100%;margin-bottom:1rem;height:350px}.group-card[_ngcontent-%COMP%], .group-card-2[_ngcontent-%COMP%]{border:3px solid #758ca6;border-radius:12px;padding:12px 24px;display:flex}.group-card-2[_ngcontent-%COMP%]{height:380px;width:320px;max-width:calc(100% - 3rem);background-color:#fff}.students-list[_ngcontent-%COMP%]{width:50%;padding-right:1rem}.students-list-2[_ngcontent-%COMP%]{width:100%}.students[_ngcontent-%COMP%]{max-height:calc(100% - 40px);overflow-y:auto}.students-2[_ngcontent-%COMP%]{height:230px;overflow-y:auto}.student[_ngcontent-%COMP%]{color:#758ca6;font-size:1rem;text-transform:capitalize;margin-bottom:6px}.group-controls[_ngcontent-%COMP%]{display:flex;flex-direction:column;width:50%}.ng-select-container[_ngcontent-%COMP%]{padding-left:0!important}.add-group-col[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;height:200px}.btn-add-group[_ngcontent-%COMP%]{padding:1rem 4rem;font-size:1.25rem;font-weight:800}.btn-add-grade[_ngcontent-%COMP%]{display:flex;height:36px;align-items:center}.btn[_ngcontent-%COMP%]{font-size:1rem;min-height:-webkit-min-content!important;min-height:min-content!important;font-weight:800}.teacher-dashboard-row[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:flex-start;flex-wrap:wrap;border:2px solid #1081fb;background-color:#f2f8ff;border-radius:12px}.students-scroll[_ngcontent-%COMP%]{width:100%;height:230px;overflow-y:auto}._link[_ngcontent-%COMP%]{font-size:1rem;font-weight:700;color:#1081fb;text-align:center;width:100%;margin:12px 0;text-decoration:underline}"]}),t})()},7687:(t,e,n)=>{"use strict";n.d(e,{M:()=>d});var o=n(1116),r=n(4391),i=n(1041),a=n(6050),s=n(8838),l=n(5470),c=(n(7536),n(7368));let d=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=c.oAB({type:t}),t.\u0275inj=c.cJS({imports:[[i.u5,o.ez,r.A0,s.b,i.UX,a.G,l.zk.forRoot()]]}),t})()},7764:(t,e,n)=>{"use strict";n.d(e,{l:()=>l});var o=n(7368),r=n(1116);function i(t,e){if(1&t&&(o.TgZ(0,"span"),o._uU(1),o.qZA()),2&t){const t=e.$implicit,n=e.last;o.xp6(1),o.Oqu(t.name+(n?"":","))}}function a(t,e){if(1&t&&(o.TgZ(0,"span",13),o._uU(1),o.qZA()),2&t){const t=e.$implicit,n=e.last;o.xp6(1),o.Oqu((null==t.grade?null:t.grade.name)+(null==t.group?null:t.group.name)+(n?"":","))}}function s(t,e){if(1&t&&(o.TgZ(0,"div",3),o.TgZ(1,"div",4),o._UZ(2,"i",11),o.qZA(),o.TgZ(3,"div",6),o.YNc(4,a,2,1,"span",12),o.qZA(),o.qZA()),2&t){const t=o.oxw();o.xp6(4),o.Q6J("ngForOf",null==t.teacher?null:t.teacher.teacherGroups)}}let l=(()=>{class t{constructor(){this.teacher=null,this.showGroups=!1,this.onDelete=new o.vpe}ngOnInit(){}OnDeletedPressed(t){t.stopPropagation(),this.onDelete.emit(this.teacher)}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=o.Xpm({type:t,selectors:[["app-teacher-card"]],inputs:{teacher:"teacher",showGroups:"showGroups"},outputs:{onDelete:"onDelete"},decls:21,vars:4,consts:[[1,"card","position-relative"],[1,"delete","clickeable",3,"click"],[1,"card-body"],[1,"text-row"],[1,"img-container"],["src","assets/icons/user-green.png","alt","user"],[1,"text-row-data"],["src","assets/icons/mail-green.png","alt","mail"],["src","assets/icons/book-green.png","alt","book"],[4,"ngFor","ngForOf"],["class","text-row",4,"ngIf"],[1,"zmdi","zmdi-accounts-outline"],["class","text-uppercase",4,"ngFor","ngForOf"],[1,"text-uppercase"]],template:function(t,e){1&t&&(o.TgZ(0,"div",0),o.TgZ(1,"span",1),o.NdJ("click",function(t){return e.OnDeletedPressed(t)}),o._uU(2," \xd7 "),o.qZA(),o.TgZ(3,"div",2),o.TgZ(4,"div",3),o.TgZ(5,"div",4),o._UZ(6,"img",5),o.qZA(),o.TgZ(7,"div",6),o.TgZ(8,"span"),o._uU(9),o.qZA(),o.qZA(),o.qZA(),o.TgZ(10,"div",3),o.TgZ(11,"div",4),o._UZ(12,"img",7),o.qZA(),o.TgZ(13,"div",6),o._uU(14),o.qZA(),o.qZA(),o.TgZ(15,"div",3),o.TgZ(16,"div",4),o._UZ(17,"img",8),o.qZA(),o.TgZ(18,"div",6),o.YNc(19,i,2,1,"span",9),o.qZA(),o.qZA(),o.YNc(20,s,5,1,"div",10),o.qZA(),o.qZA()),2&t&&(o.xp6(9),o.Oqu(null==e.teacher?null:e.teacher.name),o.xp6(5),o.hij(" ",null==e.teacher?null:e.teacher.email," "),o.xp6(5),o.Q6J("ngForOf",null==e.teacher?null:e.teacher.subjects),o.xp6(1),o.Q6J("ngIf",e.showGroups))},directives:[r.sg,r.O5],styles:[".card[_ngcontent-%COMP%]{padding:1.2rem 4rem;border:2px solid #2ed2a3;border-radius:12px;color:#758ca6;font-size:1.5rem;font-weight:500;width:-webkit-max-content;width:max-content;max-width:100%;margin-bottom:0}.card-body[_ngcontent-%COMP%]{padding:0;display:flex;flex-direction:column;justify-content:space-between}.text-row[_ngcontent-%COMP%]{display:flex;align-items:center;min-height:30px;margin-bottom:10px}.text-row[_ngcontent-%COMP%]   .text-row-data[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:start;flex-grow:1;flex-wrap:wrap;line-height:30px}.text-row[_ngcontent-%COMP%]   .text-row-data[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{margin-right:.3rem}.text-row[_ngcontent-%COMP%]   .img-container[_ngcontent-%COMP%]{display:flex;align-items:center;height:-webkit-min-content;height:min-content;padding-right:12px;text-align:left}.text-row[_ngcontent-%COMP%]   .img-container[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:-webkit-max-content;width:max-content;height:-webkit-max-content;height:max-content}.delete[_ngcontent-%COMP%]{font-size:2rem;position:absolute;top:10px;right:15px;color:var(--danger)}.zmdi[_ngcontent-%COMP%]{color:#2ed2a3}"]}),t})()},8838:(t,e,n)=>{"use strict";n.d(e,{b:()=>s});var o=n(1116),r=n(1041),i=n(6050),a=(n(7764),n(7368));let s=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=a.oAB({type:t}),t.\u0275inj=a.cJS({imports:[[r.u5,o.ez,r.UX,i.G]]}),t})()},5821:(t,e,n)=>{"use strict";n.d(e,{R:()=>r});var o=n(7368);let r=(()=>{class t{constructor(){}static GetValidatorErrorMessage(t,e){return[{name:"required",label:"Campo requerido"},{name:"invalidRFC",label:"No tiene el formato adecuado"},{name:"invalidEmailAddress",label:"Correo inv\xe1lido"},{name:"invalidPassword",label:"Las contrase\xf1as no coinciden"},{name:"minlength",label:`M\xednimo ${e.requiredLength} caracteres `},{name:"maxlength",label:`M\xe1ximo ${e.requiredLength} caracteres `},{name:"invalidNumber",label:"Solo n\xfameros enteros, o con decimal"},{name:"invalidIntegerNumber",label:"Solo n\xfameros enteros"},{name:"matchstring",label:`${e.matchStringCustomLabel?e.matchStringCustomLabel:"El texto no coincide"}`}].find(e=>e.name==t)}static matchString(t,e=null){return n=>n.value?t==n.value?null:e?{matchstring:{requiredString:t,matchStringCustomLabel:e}}:{matchstring:t}:null}static CheckOnlyIntegerNumbers(t){return(null==t?void 0:t.value)?/^[0-9]+$/.test(null==t?void 0:t.value)?0==(null==t?void 0:t.value)?{invalidIntegerNumber:!0}:null:{invalidIntegerNumber:!0}:null}static CheckOnlyNumbers(t){return(null==t?void 0:t.value)?/^[1-9]\d*\.?\d*$/.test(null==t?void 0:t.value)?0==(null==t?void 0:t.value)?{invalidNumber:!0}:null:{invalidNumber:!0}:null}static EmailValidator(t){return(null==t?void 0:t.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/))?null:{invalidEmailAddress:!0}}static RfcValidator(t){return(null==t?void 0:t.value)&&(null==t?void 0:t.value.match(/^([A-Z\xd1&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/))?null:{invalidRFC:!0}}}return t.password="",t.confirmPassword="",t.\u0275fac=function(e){return new(e||t)},t.\u0275prov=o.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()}}]);