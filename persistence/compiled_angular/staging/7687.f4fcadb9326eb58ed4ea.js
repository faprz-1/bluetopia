(self.webpackChunktemplate_web=self.webpackChunktemplate_web||[]).push([[7687],{6158:(t,e,n)=>{"use strict";n.d(e,{w:()=>a});var o=n(5821),r=n(7368),i=n(1116);function s(t,e){if(1&t&&(r.TgZ(0,"div",1),r._uU(1),r.qZA()),2&t){const t=r.oxw();r.xp6(1),r.hij(" ",null==t.errorMessage?null:t.errorMessage.label,"\n")}}let a=(()=>{class t{constructor(){}ngOnInit(){}get errorMessage(){var t,e,n,r;for(let i in null===(t=this.control)||void 0===t?void 0:t.errors)if((null===(e=this.control)||void 0===e?void 0:e.errors.hasOwnProperty(i))&&(null===(n=this.control)||void 0===n?void 0:n.touched))return o.R.GetValidatorErrorMessage(i,null===(r=this.control)||void 0===r?void 0:r.errors[i]);return null}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=r.Xpm({type:t,selectors:[["app-control-messages"]],inputs:{control:"control"},decls:1,vars:1,consts:[["class","color-red",4,"ngIf"],[1,"color-red"]],template:function(t,e){1&t&&r.YNc(0,s,2,1,"div",0),2&t&&r.Q6J("ngIf",null!==e.errorMessage)},directives:[i.O5],styles:[""]}),t})()},7536:(t,e,n)=>{"use strict";n.d(e,{d:()=>Q});var o=n(7368),r=n(1041),i=n(1392),s=n(6189),a=n(1116),d=n(5470),c=n(6158),l=n(4391);const u=["addStudentModal"],g=function(t){return{active:t}};function p(t,e){if(1&t){const t=o.EpF();o.ynx(0),o.TgZ(1,"div",38),o.NdJ("click",function(){const e=o.CHM(t).$implicit;return o.oxw(2).SelectGrade(e)}),o._uU(2),o.qZA(),o.BQk()}if(2&t){const t=e.$implicit,n=o.oxw(2);o.xp6(1),o.Q6J("ngClass",o.VKq(2,g,t.key==(null==n.selectedGrade?null:n.selectedGrade.key))),o.xp6(1),o.hij(" ",t.key,"\xb0Grado ")}}function m(t,e){if(1&t){const t=o.EpF();o.TgZ(0,"div",39),o.NdJ("click",function(){return o.CHM(t),o.oxw(2).AddGrade()}),o._UZ(1,"i",40),o.qZA()}}function h(t,e){if(1&t&&(o.TgZ(0,"div",48),o.TgZ(1,"span",49),o._uU(2),o.qZA(),o._uU(3),o.qZA()),2&t){const t=e.$implicit,n=e.index;o.xp6(2),o.Oqu(n+1),o.xp6(1),o.lnq(" ",t.name," ",t.fatherLastname," ",t.motherLastname," ")}}function f(t,e){if(1&t){const t=o.EpF();o.TgZ(0,"div",50),o.TgZ(1,"div",44),o._uU(2," Estrategias "),o.qZA(),o.TgZ(3,"div",51),o.TgZ(4,"div",12),o._UZ(5,"ng-select",52),o.qZA(),o.qZA(),o._UZ(6,"div",53),o.TgZ(7,"div",54),o.TgZ(8,"button",55),o.NdJ("click",function(){o.CHM(t);const e=o.oxw().$implicit;return o.oxw(2).onCreateNewStrategy.emit(e)}),o._uU(9," Crear nueva estrategia "),o.qZA(),o.TgZ(10,"button",56),o.NdJ("click",function(){o.CHM(t);const e=o.oxw().$implicit;return o.oxw(2).onApplyExistentStrategy.emit(e)}),o._uU(11," Aplicar estrategia existente "),o.qZA(),o.qZA(),o.qZA()}if(2&t){const t=o.oxw(3);o.xp6(5),o.Q6J("items",t.strategiesStatuses)}}function v(t,e){if(1&t&&(o.TgZ(0,"div",41),o.TgZ(1,"div",42),o.TgZ(2,"div",43),o.TgZ(3,"div",44),o._uU(4),o.qZA(),o.TgZ(5,"div",45),o.YNc(6,h,4,4,"div",46),o.qZA(),o.qZA(),o.YNc(7,f,12,1,"div",47),o.qZA(),o.qZA()),2&t){const t=e.$implicit,n=o.oxw(2);o.xp6(4),o.hij(" Grupo ",t[0].group," "),o.xp6(2),o.Q6J("ngForOf",t),o.xp6(1),o.Q6J("ngIf",n.teacherControls)}}function Z(t,e){1&t&&(o.TgZ(0,"div",57),o.TgZ(1,"button",58),o._uU(2," Agregar grupo "),o.qZA(),o.qZA())}function w(t,e){if(1&t&&(o.TgZ(0,"div",31),o.TgZ(1,"div",32),o.YNc(2,p,3,4,"ng-container",33),o.YNc(3,m,2,0,"div",34),o.qZA(),o.TgZ(4,"div",35),o.YNc(5,v,8,3,"div",36),o.YNc(6,Z,3,0,"div",37),o.qZA(),o.qZA()),2&t){const t=o.oxw();o.xp6(2),o.Q6J("ngForOf",t.grades),o.xp6(1),o.Q6J("ngIf",t.adminControls),o.xp6(2),o.Q6J("ngForOf",null==t.selectedGrade?null:t.selectedGrade.groups),o.xp6(1),o.Q6J("ngIf",t.adminControls)}}const x=function(t){return{"active-2":t}};function b(t,e){if(1&t){const t=o.EpF();o.ynx(0),o.TgZ(1,"div",62),o.NdJ("click",function(){const e=o.CHM(t).$implicit;return o.oxw(2).SelectGrade(e)}),o._uU(2),o.qZA(),o.BQk()}if(2&t){const t=e.$implicit,n=o.oxw(2);o.xp6(1),o.Q6J("ngClass",o.VKq(2,x,t.key==(null==n.selectedGrade?null:n.selectedGrade.key))),o.xp6(1),o.hij(" ",t.key,"\xb0Grado ")}}function A(t,e){if(1&t){const t=o.EpF();o.TgZ(0,"div",39),o.NdJ("click",function(){return o.CHM(t),o.oxw(2).AddGrade()}),o._UZ(1,"i",40),o.qZA()}}function C(t,e){1&t&&(o.TgZ(0,"div",73),o._uU(1," Aqu\xed podr\xe1s una contrase\xf1a para que ingresen tus alumnos. "),o.qZA())}function q(t,e){1&t&&(o.TgZ(0,"div",73),o._uU(1," Copia el link de registro y comp\xe1rtelo con tus alumnos. "),o.qZA())}function T(t,e){1&t&&o._UZ(0,"img",74)}function k(t,e){1&t&&(o.TgZ(0,"span"),o._UZ(1,"i",75),o.qZA())}function _(t,e){if(1&t&&(o.TgZ(0,"div",48),o.TgZ(1,"span",49),o._uU(2),o.qZA(),o._uU(3),o.qZA()),2&t){const t=e.$implicit,n=e.index;o.xp6(2),o.Oqu(n+1),o.xp6(1),o.lnq(" ",t.name," ",t.fatherLastname," ",t.motherLastname," ")}}function M(t,e){if(1&t){const t=o.EpF();o.TgZ(0,"div",76),o.TgZ(1,"div",77),o.NdJ("click",function(){o.CHM(t);const e=o.oxw().$implicit,n=o.oxw(2),r=o.MAs(41);return n.SetStudentFormRelations(e[0]),r.show()}),o._uU(2," Agregar alumno "),o.qZA(),o.qZA()}}function y(t,e){if(1&t){const t=o.EpF();o.TgZ(0,"div",63),o.TgZ(1,"div",64),o.TgZ(2,"div",65),o._uU(3),o.qZA(),o.TgZ(4,"div",66),o.NdJ("mouseover",function(){const e=o.CHM(t).$implicit;return o.oxw(2).OnMouseOver("popoverPassword",e[0])})("mouseout",function(){return o.CHM(t),o.oxw(2).OnMouseOut("popoverPassword")})("click",function(){return o.CHM(t),o.oxw(2),o.MAs(3).show()}),o.YNc(5,C,2,0,"div",67),o._UZ(6,"img",68),o.qZA(),o.TgZ(7,"div",66),o.NdJ("mouseover",function(){const e=o.CHM(t).$implicit;return o.oxw(2).OnMouseOver("popoverLink",e[0])})("mouseout",function(){return o.CHM(t),o.oxw(2).OnMouseOut("popoverLink")})("click",function(){const e=o.CHM(t).$implicit;return o.oxw(2).GenerateAndCopyLink(e[0].studentGroup)}),o.YNc(8,q,2,0,"div",67),o.YNc(9,T,1,0,"img",69),o.YNc(10,k,2,0,"span",70),o.qZA(),o.qZA(),o.TgZ(11,"div",71),o.YNc(12,_,4,4,"div",46),o.qZA(),o.YNc(13,M,3,0,"div",72),o.qZA()}if(2&t){const t=e.$implicit,n=o.oxw(2);o.xp6(3),o.hij(" Grupo ",t[0].group," "),o.xp6(2),o.Q6J("ngIf",(null==n.popovers?null:n.popovers.popoverPassword)&&n.selectedGroup==t[0]),o.xp6(3),o.Q6J("ngIf",(null==n.popovers?null:n.popovers.popoverLink)&&n.selectedGroup==t[0]),o.xp6(1),o.Q6J("ngIf",n.loading.generatingLink!=t[0].group),o.xp6(1),o.Q6J("ngIf",n.loading.generatingLink==t[0].group),o.xp6(2),o.Q6J("ngForOf",t),o.xp6(1),o.Q6J("ngIf",n.teacherControls)}}function P(t,e){1&t&&(o.TgZ(0,"div",57),o.TgZ(1,"button",58),o._uU(2," Agregar grupo "),o.qZA(),o.qZA())}function O(t,e){if(1&t&&(o.TgZ(0,"div",31),o.TgZ(1,"div",59),o.YNc(2,b,3,4,"ng-container",33),o.YNc(3,A,2,0,"div",34),o.qZA(),o.TgZ(4,"div",60),o.YNc(5,y,14,7,"div",61),o.YNc(6,P,3,0,"div",37),o.qZA(),o.qZA()),2&t){const t=o.oxw();o.xp6(2),o.Q6J("ngForOf",t.grades),o.xp6(1),o.Q6J("ngIf",t.adminControls),o.xp6(2),o.Q6J("ngForOf",null==t.selectedGrade?null:t.selectedGrade.groups),o.xp6(1),o.Q6J("ngIf",t.adminControls)}}function N(t,e){if(1&t){const t=o.EpF();o.TgZ(0,"div",78),o.NdJ("click",function(){return o.CHM(t),o.oxw().TogglePassword("current")}),o._UZ(1,"img",79),o.qZA()}}function I(t,e){if(1&t){const t=o.EpF();o.TgZ(0,"div",78),o.NdJ("click",function(){return o.CHM(t),o.oxw().TogglePassword("current")}),o._UZ(1,"img",80),o.qZA()}}function G(t,e){if(1&t){const t=o.EpF();o.TgZ(0,"div",78),o.NdJ("click",function(){return o.CHM(t),o.oxw().TogglePassword("new")}),o._UZ(1,"img",79),o.qZA()}}function F(t,e){if(1&t){const t=o.EpF();o.TgZ(0,"div",78),o.NdJ("click",function(){return o.CHM(t),o.oxw().TogglePassword("new")}),o._UZ(1,"img",80),o.qZA()}}function J(t,e){if(1&t){const t=o.EpF();o.TgZ(0,"div",78),o.NdJ("click",function(){return o.CHM(t),o.oxw().TogglePassword("confirmation")}),o._UZ(1,"img",79),o.qZA()}}function S(t,e){if(1&t){const t=o.EpF();o.TgZ(0,"div",78),o.NdJ("click",function(){return o.CHM(t),o.oxw().TogglePassword("confirmation")}),o._UZ(1,"img",80),o.qZA()}}const U=function(){return{backdrop:"static",keyboard:!1}};let Q=(()=>{class t{constructor(t,e){this.api=t,this.toast=e,this.students=[],this.adminControls=!1,this.teacherControls=!1,this.newDashboard=!1,this.onStudentSearch=null,this.onChange=null,this.onAddGroup=new o.vpe,this.onAddGrade=new o.vpe,this.onApplyExistentStrategy=new o.vpe,this.onCreateNewStrategy=new o.vpe,this.onReload=new o.vpe,this.grades=[],this.selectedGrade=null,this.selectedGroup=null,this.strategiesStatuses=[],this.loading={generatingLink:null},this.subscriptions=[],this.studentForm=new r.cw({name:new r.NI("",[r.kI.required]),fatherLastname:new r.NI("",[r.kI.required]),motherLastname:new r.NI("",[]),registerNumber:new r.NI("",[r.kI.required,r.kI.pattern(/^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/)]),grade:new r.NI("",[r.kI.required]),group:new r.NI("",[r.kI.required]),schoolId:new r.NI("",[]),teacherUserId:new r.NI("",[])}),this.passwordForm=new r.cw({currentPassword:new r.NI("",[]),newPassword:new r.NI("",[r.kI.required,r.kI.minLength(3)]),confirmation:new r.NI("",[r.kI.required,r.kI.minLength(3)])}),this.popovers={popoverPassword:!1,popoverLink:!1},this.showPassword={current:!1,new:!1,confirmation:!1},this.user=this.api.GetUser(),this.GetTeacherData()}ngOnInit(){var t,e;this.subscriptions.push(null===(t=this.onStudentSearch)||void 0===t?void 0:t.subscribe(t=>{})),this.subscriptions.push(null===(e=this.onChange)||void 0===e?void 0:e.subscribe(t=>{this.students=t,this.GetTeacherData()}))}ngOnDestroy(){for(var t;this.subscriptions.length;)null===(t=this.subscriptions.pop())||void 0===t||t.unsubscribe()}FormatStudents(){this.students=this.students.map(t=>(t.hasOwnProperty("studentGroup")&&(t.group=t.studentGroup.group?t.studentGroup.group.name:"sin grupo",t.grade=t.studentGroup.grade?t.studentGroup.grade.name:"sin grado"),t)),this.GroupStudents()}GroupStudents(){let t={};this.grades=[],this.students.forEach(e=>{t[e.grade]?t[e.grade].push(e):t[e.grade]=[e]});for(const e in t){let n={};Object.prototype.hasOwnProperty.call(t,e)&&(t[e].forEach(t=>{t=this.SetMasterKey(t),n[t.group]?n[t.group].push(t):n[t.group]=[t]}),this.grades.push({key:e,groups:this.ObjectToArray(n)}))}this.grades.sort((t,e)=>t.key>e.key?1:t.key<e.key?-1:0),this.grades.length>0&&(this.selectedGrade=this.grades[0])}ObjectToArray(t){let e=[];for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e.push(t[n]);return e}GetTeacherData(){this.api.Get(`/Teachers/${this.user?this.user.id:0}/Data`).subscribe(t=>{this.teacherGroups=t.teacherGroups,this.FormatStudents()},t=>{console.error("Error getting teacher data",t)})}SetMasterKey(t){if(0==this.teacherGroups.length)return t;let e=this.teacherGroups.filter(e=>e.groupId==t.studentGroup.groupId&&e.gradeId==t.studentGroup.gradeId);return 0==e.length||(t.masterKey=e[0].masterKey),t}SelectGrade(t){var e;this.selectedGrade=t,null===(e=this.passwordForm.get("newPassword"))||void 0===e||e.setValue(t.masterKey)}AddGrade(){}SetStudentFormRelations(t){var e,n,o,r;null===(e=this.studentForm.get("grade"))||void 0===e||e.setValue(t.grade),null===(n=this.studentForm.get("group"))||void 0===n||n.setValue(t.group),null===(o=this.studentForm.get("schoolId"))||void 0===o||o.setValue(t.schoolId),null===(r=this.studentForm.get("teacherUserId"))||void 0===r||r.setValue(t.teacherUserId)}AddStudent(){if(this.studentForm.invalid)return this.toast.ShowWarning("Favor de llenar los campos obligatorios"),void this.studentForm.markAllAsTouched();this.api.Post("/Students",{student:this.studentForm.value}).subscribe(t=>{var e;this.toast.ShowSuccess("Estudiante agregado con exito"),null===(e=this.addStudentModal)||void 0===e||e.hide(),this.onReload.emit()},t=>{console.error("Error creating a student",t),this.toast.ShowError("Error al crear estudiante")})}GenerateAndCopyLink(t){let e={schoolId:this.api.GetUser().schoolId,gradeId:null==t?void 0:t.gradeId,groupId:null==t?void 0:t.groupId};this.api.Patch("/StudentsGroups/RegisterUid",e).subscribe(t=>{navigator.clipboard.writeText(`${this.api.GetHost()}registro/estudiante/${t}`),this.toast.ShowSuccess("Link copiado al portapapeles")},t=>{this.toast.ShowError("Error al generar link")}),this.selectedGroup=null}OnMouseOver(t,e){var n;this.selectedGroup=e,null===(n=this.passwordForm.get("currentPassword"))||void 0===n||n.setValue(e.masterKey),this.popovers[t]=!0}OnMouseOut(t){this.popovers[t]=!1}TogglePassword(t){this.showPassword[t]=!this.showPassword[t];var e=document.getElementById(t);e.type="password"===e.type?"text":"password"}IsNewPasswordValid(){var t,e;let n=null===(t=this.passwordForm.get("newPassword"))||void 0===t?void 0:t.value,o=null===(e=this.passwordForm.get("confirmation"))||void 0===e?void 0:e.value;return n!=o&&this.toast.ShowWarning("Las contrase\xf1as no coinciden"),n===o}SaveGroupPassword(){var t,e;if(this.IsNewPasswordValid()){var n={new:null===(t=this.passwordForm.get("newPassword"))||void 0===t?void 0:t.value,confirmation:null===(e=this.passwordForm.get("confirmation"))||void 0===e?void 0:e.value,groupId:this.selectedGroup.studentGroup.groupId,gradeId:this.selectedGroup.studentGroup.gradeId,teacherId:this.user.teacher.id,schoolId:this.user.schoolId};this.loading.password=!0,this.api.Post("/TeacherGroups/setKey",n,!0).subscribe(t=>{var e;this.CleanPasswordForm(),null===(e=this.passwordForm.get("currentPassword"))||void 0===e||e.setValue(n.new),this.toast.ShowSuccess("Contrase\xf1a creada"),this.loading.password=!1,this.GetTeacherData()},t=>{this.loading.password=!1,this.toast.ShowError("Error al guardar contrase\xf1a")})}}CleanPasswordForm(){var t,e;this.selectedGroup=null,null===(t=this.passwordForm.get("newPassword"))||void 0===t||t.setValue(""),null===(e=this.passwordForm.get("confirmation"))||void 0===e||e.setValue("")}}return t.\u0275fac=function(e){return new(e||t)(o.Y36(i.sM),o.Y36(s.k))},t.\u0275cmp=o.Xpm({type:t,selectors:[["app-grades-groups-view"]],viewQuery:function(t,e){if(1&t&&o.Gf(u,5),2&t){let t;o.iGM(t=o.CRH())&&(e.addStudentModal=t.first)}},inputs:{students:"students",adminControls:"adminControls",teacherControls:"teacherControls",newDashboard:"newDashboard",onStudentSearch:"onStudentSearch",onChange:"onChange"},outputs:{onAddGroup:"onAddGroup",onAddGrade:"onAddGrade",onApplyExistentStrategy:"onApplyExistentStrategy",onCreateNewStrategy:"onCreateNewStrategy",onReload:"onReload"},decls:77,vars:22,consts:[["class","component-content",4,"ngIf"],["bsModal","","tabindex","-1","role","dialog","aria-labelledby","passwordModal",1,"modal","fade",3,"config"],["passwordModal","bs-modal"],[1,"modal-dialog","modal-lg"],[1,"modal-content"],[1,"modal-header"],[1,"modal-title"],[1,"modal-body"],[3,"formGroup"],[1,"row"],[1,"col-12","col-md-8"],["for","current",1,"text"],[1,"input-container"],["class","input-icon-container text-center clickeable",3,"click",4,"ngIf"],["id","current","type","password","placeholder","Contrase\xf1a actual","formControlName","currentPassword",1,"form-control",3,"disabled"],[1,"col-12","col-md-6"],["id","new","type","password","placeholder","Nueva Contrase\xf1a","formControlName","newPassword",1,"form-control"],[1,"required-span"],[3,"control"],["id","confirmation","type","password","placeholder","Confirma la contrase\xf1a","formControlName","confirmation",1,"form-control"],[1,"modal-footer","justify-content-between"],[1,"btn","btn-outline-primary","modal-btn",3,"click"],[1,"btn","btn-primary","modal-btn",3,"disabled","click"],["bsModal","","tabindex","-1","role","dialog","aria-labelledby","addStudentModal",1,"modal","fade",3,"config"],["addStudentModal","bs-modal"],[1,"col-12"],["type","text","placeholder","Nombre","formControlName","name",1,"form-control","no-icon",3,"keyup.enter"],["type","text","placeholder","Apellido paterno","formControlName","fatherLastname",1,"form-control","no-icon",3,"keyup.enter"],["type","text","placeholder","Apellido materno","formControlName","motherLastname",1,"form-control","no-icon",3,"keyup.enter"],["type","text","placeholder","CURP","formControlName","registerNumber",1,"form-control","no-icon",3,"keyup.enter"],[1,"btn","btn-primary","modal-btn",3,"click"],[1,"component-content"],[1,"d-flex"],[4,"ngFor","ngForOf"],["class","btn-add-grade clickeable text-success",3,"click",4,"ngIf"],[1,"row","mt-3"],["class","col-12 col-lg-6",4,"ngFor","ngForOf"],["class","col-12 col-lg-6 add-group-col",4,"ngIf"],[1,"tab","clickeable",3,"ngClass","click"],[1,"btn-add-grade","clickeable","text-success",3,"click"],[1,"zmdi","zmdi-plus-circle-o","zmdi-hc-2x"],[1,"col-12","col-lg-6"],[1,"group-card"],[1,"students-list"],[1,"group-title"],[1,"students"],["class","student",4,"ngFor","ngForOf"],["class","group-controls",4,"ngIf"],[1,"student"],[1,"mr-2"],[1,"group-controls"],[1,"filters"],["bindLabel","name","placeholder","Filtrar por estado",1,"form-control",3,"items"],[1,"strategies"],[1,"controls"],[1,"btn","btn-primary","btn-block",3,"click"],[1,"btn","btn-outline-primary","btn-block",3,"click"],[1,"col-12","col-lg-6","add-group-col"],[1,"btn","btn-success","btn-add-group"],[1,"px-4","d-flex"],[1,"teacher-dashboard-row"],["class","group-card-2 m-4 flex-column justify-content-between",4,"ngFor","ngForOf"],[1,"tab","border-bottom-0","clickeable",3,"ngClass","click"],[1,"group-card-2","m-4","flex-column","justify-content-between"],[1,"d-flex","flex-wrap","justify-content-between","align-items-center","mb-4",2,"gap","12px"],[1,"group-title-2","mb-0"],[1,"col-container","d-flex","flex-column","justify-content-center","align-items-center",3,"mouseover","mouseout","click"],["class","popover-right",4,"ngIf"],["src","assets/icons/lock.svg",1,"icon"],["class","icon","src","assets/icons/link.svg",4,"ngIf"],[4,"ngIf"],[1,"students-2","flex-grow-1"],["class","controls mt-3",4,"ngIf"],[1,"popover-right"],["src","assets/icons/link.svg",1,"icon"],[1,"zmdi","zmdi-spinner","zmdi-hc-lg","zmdi-hc-spin"],[1,"controls","mt-3"],[1,"_link","clickeable",3,"click"],[1,"input-icon-container","text-center","clickeable",3,"click"],["src","assets/icons/hide.svg"],["src","assets/icons/show.svg"]],template:function(t,e){if(1&t){const t=o.EpF();o.YNc(0,w,7,4,"div",0),o.YNc(1,O,7,4,"div",0),o.TgZ(2,"div",1,2),o.TgZ(4,"div",3),o.TgZ(5,"div",4),o.TgZ(6,"div",5),o.TgZ(7,"h2",6),o._uU(8,"Asignar contrase\xf1a"),o.qZA(),o.qZA(),o.TgZ(9,"div",7),o.TgZ(10,"form",8),o.TgZ(11,"div",9),o.TgZ(12,"div",10),o.TgZ(13,"label",11),o._uU(14,"Contrase\xf1a actual"),o.qZA(),o.TgZ(15,"div",12),o.YNc(16,N,2,0,"div",13),o.YNc(17,I,2,0,"div",13),o._UZ(18,"input",14),o.qZA(),o.qZA(),o.TgZ(19,"div",15),o.TgZ(20,"div",12),o.YNc(21,G,2,0,"div",13),o.YNc(22,F,2,0,"div",13),o._UZ(23,"input",16),o.TgZ(24,"span",17),o._uU(25,"*"),o.qZA(),o._UZ(26,"app-control-messages",18),o.qZA(),o.qZA(),o.TgZ(27,"div",15),o.TgZ(28,"div",12),o.YNc(29,J,2,0,"div",13),o.YNc(30,S,2,0,"div",13),o._UZ(31,"input",19),o.TgZ(32,"span",17),o._uU(33,"*"),o.qZA(),o._UZ(34,"app-control-messages",18),o.qZA(),o.qZA(),o.qZA(),o.qZA(),o.qZA(),o.TgZ(35,"div",20),o.TgZ(36,"button",21),o.NdJ("click",function(){o.CHM(t);const n=o.MAs(3);return e.CleanPasswordForm(),n.hide()}),o._uU(37," Cancelar "),o.qZA(),o.TgZ(38,"button",22),o.NdJ("click",function(){o.CHM(t);const n=o.MAs(3);return e.SaveGroupPassword(),n.hide()}),o._uU(39," Guardar cambios "),o.qZA(),o.qZA(),o.qZA(),o.qZA(),o.qZA(),o.TgZ(40,"div",23,24),o.TgZ(42,"div",3),o.TgZ(43,"div",4),o.TgZ(44,"div",5),o.TgZ(45,"h2",6),o._uU(46,"Agregar alumno"),o.qZA(),o.qZA(),o.TgZ(47,"div",7),o.TgZ(48,"form",8),o.TgZ(49,"div",9),o.TgZ(50,"div",25),o.TgZ(51,"div",12),o.TgZ(52,"input",26),o.NdJ("keyup.enter",function(){return e.AddStudent()}),o.qZA(),o.TgZ(53,"span",17),o._uU(54,"*"),o.qZA(),o.qZA(),o._UZ(55,"app-control-messages",18),o.qZA(),o.TgZ(56,"div",15),o.TgZ(57,"div",12),o.TgZ(58,"input",27),o.NdJ("keyup.enter",function(){return e.AddStudent()}),o.qZA(),o.TgZ(59,"span",17),o._uU(60,"*"),o.qZA(),o.qZA(),o._UZ(61,"app-control-messages",18),o.qZA(),o.TgZ(62,"div",15),o.TgZ(63,"div",12),o.TgZ(64,"input",28),o.NdJ("keyup.enter",function(){return e.AddStudent()}),o.qZA(),o.qZA(),o._UZ(65,"app-control-messages",18),o.qZA(),o.TgZ(66,"div",15),o.TgZ(67,"div",12),o.TgZ(68,"input",29),o.NdJ("keyup.enter",function(){return e.AddStudent()}),o.qZA(),o.TgZ(69,"span",17),o._uU(70,"*"),o.qZA(),o.qZA(),o._UZ(71,"app-control-messages",18),o.qZA(),o.qZA(),o.qZA(),o.qZA(),o.TgZ(72,"div",20),o.TgZ(73,"button",21),o.NdJ("click",function(){return o.CHM(t),o.MAs(41).hide()}),o._uU(74," Cancelar "),o.qZA(),o.TgZ(75,"button",30),o.NdJ("click",function(){return e.AddStudent()}),o._uU(76," Agregar "),o.qZA(),o.qZA(),o.qZA(),o.qZA(),o.qZA()}2&t&&(o.Q6J("ngIf",!e.newDashboard),o.xp6(1),o.Q6J("ngIf",e.newDashboard),o.xp6(1),o.Q6J("config",o.DdM(20,U)),o.xp6(8),o.Q6J("formGroup",e.passwordForm),o.xp6(6),o.Q6J("ngIf",e.showPassword.current),o.xp6(1),o.Q6J("ngIf",!e.showPassword.current),o.xp6(1),o.Q6J("disabled",!0),o.xp6(3),o.Q6J("ngIf",e.showPassword.new),o.xp6(1),o.Q6J("ngIf",!e.showPassword.new),o.xp6(4),o.Q6J("control",e.passwordForm.get("newPassword")),o.xp6(3),o.Q6J("ngIf",e.showPassword.confirmation),o.xp6(1),o.Q6J("ngIf",!e.showPassword.confirmation),o.xp6(4),o.Q6J("control",e.passwordForm.get("confirmation")),o.xp6(4),o.Q6J("disabled",e.passwordForm.invalid),o.xp6(2),o.Q6J("config",o.DdM(21,U)),o.xp6(8),o.Q6J("formGroup",e.studentForm),o.xp6(7),o.Q6J("control",e.studentForm.get("name")),o.xp6(6),o.Q6J("control",e.studentForm.get("fatherLastname")),o.xp6(4),o.Q6J("control",e.studentForm.get("motherLastname")),o.xp6(6),o.Q6J("control",e.studentForm.get("registerNumber")))},directives:[a.O5,d.oB,r._Y,r.JL,r.sg,r.Fj,r.JJ,r.u,c.w,a.sg,a.mk,l.w9],styles:[".component-content[_ngcontent-%COMP%]{width:100%;max-height:100%;font-family:Mulish!important}.tab[_ngcontent-%COMP%]{font-size:.75rem;color:#758ca6;padding:8px 16px;border:2px solid #758ca6;border-radius:6px 6px 0 0;margin-right:12px}.active[_ngcontent-%COMP%], .active-2[_ngcontent-%COMP%]{border-color:#1081fb!important;color:#1081fb!important}.active-2[_ngcontent-%COMP%]{font-weight:700;font-size:1rem;background-color:#f2f8ff}.group-title[_ngcontent-%COMP%]{font-weight:600;margin-bottom:12px}.group-title[_ngcontent-%COMP%], .group-title-2[_ngcontent-%COMP%]{text-transform:capitalize;font-size:1rem;color:#1081fb;text-align:left}.group-title-2[_ngcontent-%COMP%]{font-weight:700;font-weight:600;margin-bottom:16px}.group-card[_ngcontent-%COMP%]{max-width:100%;margin-bottom:1rem;height:350px}.group-card[_ngcontent-%COMP%], .group-card-2[_ngcontent-%COMP%]{border:3px solid #758ca6;border-radius:12px;padding:12px 24px;display:flex}.group-card-2[_ngcontent-%COMP%]{height:380px;width:320px;max-width:calc(100% - 3rem);background-color:#fff}.students-list[_ngcontent-%COMP%]{width:50%;padding-right:1rem}.students-list-2[_ngcontent-%COMP%]{width:100%}.students[_ngcontent-%COMP%]{max-height:calc(100% - 40px);overflow-y:auto}.students-2[_ngcontent-%COMP%]{height:230px;overflow-y:auto}.student[_ngcontent-%COMP%]{color:#758ca6;font-size:1rem;text-transform:capitalize;margin-bottom:6px}.group-controls[_ngcontent-%COMP%]{display:flex;flex-direction:column;width:50%}.ng-select-container[_ngcontent-%COMP%]{padding-left:0!important}.add-group-col[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;height:200px}.btn-add-group[_ngcontent-%COMP%]{padding:1rem 4rem;font-size:1.25rem;font-weight:800}.btn-add-grade[_ngcontent-%COMP%]{display:flex;height:36px;align-items:center}.btn[_ngcontent-%COMP%]{font-size:1rem;min-height:-webkit-min-content!important;min-height:min-content!important;font-weight:800}.teacher-dashboard-row[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:flex-start;flex-wrap:wrap;border:2px solid #1081fb;background-color:#f2f8ff;border-radius:12px}.students-scroll[_ngcontent-%COMP%]{width:100%;height:230px;overflow-y:auto}._link[_ngcontent-%COMP%]{font-size:1rem;font-weight:700;color:#1081fb;text-align:center;width:100%;margin:12px 0;text-decoration:underline}.col-container[_ngcontent-%COMP%]{background-color:#f4f5f7;position:relative;cursor:pointer!important}div.popover-right[_ngcontent-%COMP%]{background-color:#d0e4fc;border:none;padding:1rem;position:absolute;bottom:110%;height:auto!important;color:#3d5e81;border-radius:5px}@media (min-width:768px){div.popover-right[_ngcontent-%COMP%]{left:-70%}div.popover-right[_ngcontent-%COMP%] > .triangle[_ngcontent-%COMP%]{width:0;height:0;border-color:#d0e4fc #d0e4fc transparent transparent;border-style:solid;border-width:20px;position:absolute;top:100%;right:10%;z-index:0}}@media (max-width:767px){div.popover-right[_ngcontent-%COMP%]{top:-70%}div.popover-right[_ngcontent-%COMP%] > .triangle[_ngcontent-%COMP%]{width:0;height:0;border:20px solid transparent;border-top-color:#d0e4fc;position:absolute;top:100%;left:42%;z-index:0}}"]}),t})()},7687:(t,e,n)=>{"use strict";n.d(e,{M:()=>l});var o=n(1116),r=n(4391),i=n(1041),s=n(6050),a=n(8838),d=n(5470),c=(n(7536),n(7368));let l=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=c.oAB({type:t}),t.\u0275inj=c.cJS({imports:[[i.u5,o.ez,r.A0,a.b,i.UX,s.G,d.zk.forRoot()]]}),t})()},7764:(t,e,n)=>{"use strict";n.d(e,{l:()=>d});var o=n(7368),r=n(1116);function i(t,e){if(1&t&&(o.TgZ(0,"span"),o._uU(1),o.qZA()),2&t){const t=e.$implicit,n=e.last;o.xp6(1),o.Oqu(t.name+(n?"":","))}}function s(t,e){if(1&t&&(o.TgZ(0,"span",13),o._uU(1),o.qZA()),2&t){const t=e.$implicit,n=e.last;o.xp6(1),o.Oqu((null==t.grade?null:t.grade.name)+(null==t.group?null:t.group.name)+(n?"":","))}}function a(t,e){if(1&t&&(o.TgZ(0,"div",3),o.TgZ(1,"div",4),o._UZ(2,"i",11),o.qZA(),o.TgZ(3,"div",6),o.YNc(4,s,2,1,"span",12),o.qZA(),o.qZA()),2&t){const t=o.oxw();o.xp6(4),o.Q6J("ngForOf",null==t.teacher?null:t.teacher.teacherGroups)}}let d=(()=>{class t{constructor(){this.teacher=null,this.showGroups=!1,this.onDelete=new o.vpe}ngOnInit(){}OnDeletedPressed(t){t.stopPropagation(),this.onDelete.emit(this.teacher)}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=o.Xpm({type:t,selectors:[["app-teacher-card"]],inputs:{teacher:"teacher",showGroups:"showGroups"},outputs:{onDelete:"onDelete"},decls:21,vars:4,consts:[[1,"card","position-relative"],[1,"delete","clickeable",3,"click"],[1,"card-body"],[1,"text-row"],[1,"img-container"],["src","assets/icons/user-green.png","alt","user"],[1,"text-row-data"],["src","assets/icons/mail-green.png","alt","mail"],["src","assets/icons/book-green.png","alt","book"],[4,"ngFor","ngForOf"],["class","text-row",4,"ngIf"],[1,"zmdi","zmdi-accounts-outline"],["class","text-uppercase",4,"ngFor","ngForOf"],[1,"text-uppercase"]],template:function(t,e){1&t&&(o.TgZ(0,"div",0),o.TgZ(1,"span",1),o.NdJ("click",function(t){return e.OnDeletedPressed(t)}),o._uU(2," \xd7 "),o.qZA(),o.TgZ(3,"div",2),o.TgZ(4,"div",3),o.TgZ(5,"div",4),o._UZ(6,"img",5),o.qZA(),o.TgZ(7,"div",6),o.TgZ(8,"span"),o._uU(9),o.qZA(),o.qZA(),o.qZA(),o.TgZ(10,"div",3),o.TgZ(11,"div",4),o._UZ(12,"img",7),o.qZA(),o.TgZ(13,"div",6),o._uU(14),o.qZA(),o.qZA(),o.TgZ(15,"div",3),o.TgZ(16,"div",4),o._UZ(17,"img",8),o.qZA(),o.TgZ(18,"div",6),o.YNc(19,i,2,1,"span",9),o.qZA(),o.qZA(),o.YNc(20,a,5,1,"div",10),o.qZA(),o.qZA()),2&t&&(o.xp6(9),o.Oqu(null==e.teacher?null:e.teacher.name),o.xp6(5),o.hij(" ",null==e.teacher?null:e.teacher.email," "),o.xp6(5),o.Q6J("ngForOf",null==e.teacher?null:e.teacher.subjects),o.xp6(1),o.Q6J("ngIf",e.showGroups))},directives:[r.sg,r.O5],styles:[".card[_ngcontent-%COMP%]{padding:1.2rem 4rem;border:2px solid #2ed2a3;border-radius:12px;color:#758ca6;font-size:1.5rem;font-weight:500;width:-webkit-max-content;width:max-content;max-width:100%;margin-bottom:0}.card-body[_ngcontent-%COMP%]{padding:0;display:flex;flex-direction:column;justify-content:space-between}.text-row[_ngcontent-%COMP%]{display:flex;align-items:center;min-height:30px;margin-bottom:10px}.text-row[_ngcontent-%COMP%]   .text-row-data[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:start;flex-grow:1;flex-wrap:wrap;line-height:30px}.text-row[_ngcontent-%COMP%]   .text-row-data[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{margin-right:.3rem}.text-row[_ngcontent-%COMP%]   .img-container[_ngcontent-%COMP%]{display:flex;align-items:center;height:-webkit-min-content;height:min-content;padding-right:12px;text-align:left}.text-row[_ngcontent-%COMP%]   .img-container[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:-webkit-max-content;width:max-content;height:-webkit-max-content;height:max-content}.delete[_ngcontent-%COMP%]{font-size:2rem;position:absolute;top:10px;right:15px;color:var(--danger)}.zmdi[_ngcontent-%COMP%]{color:#2ed2a3}"]}),t})()},8838:(t,e,n)=>{"use strict";n.d(e,{b:()=>a});var o=n(1116),r=n(1041),i=n(6050),s=(n(7764),n(7368));let a=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=s.oAB({type:t}),t.\u0275inj=s.cJS({imports:[[r.u5,o.ez,r.UX,i.G]]}),t})()},5821:(t,e,n)=>{"use strict";n.d(e,{R:()=>r});var o=n(7368);let r=(()=>{class t{constructor(){}static GetValidatorErrorMessage(t,e){return[{name:"required",label:"Campo requerido"},{name:"invalidRFC",label:"No tiene el formato adecuado"},{name:"invalidEmailAddress",label:"Correo inv\xe1lido"},{name:"invalidPassword",label:"Las contrase\xf1as no coinciden"},{name:"minlength",label:`M\xednimo ${e.requiredLength} caracteres `},{name:"maxlength",label:`M\xe1ximo ${e.requiredLength} caracteres `},{name:"invalidNumber",label:"Solo n\xfameros enteros, o con decimal"},{name:"invalidIntegerNumber",label:"Solo n\xfameros enteros"},{name:"matchstring",label:`${e.matchStringCustomLabel?e.matchStringCustomLabel:"El texto no coincide"}`}].find(e=>e.name==t)}static matchString(t,e=null){return n=>n.value?t==n.value?null:e?{matchstring:{requiredString:t,matchStringCustomLabel:e}}:{matchstring:t}:null}static CheckOnlyIntegerNumbers(t){return(null==t?void 0:t.value)?/^[0-9]+$/.test(null==t?void 0:t.value)?0==(null==t?void 0:t.value)?{invalidIntegerNumber:!0}:null:{invalidIntegerNumber:!0}:null}static CheckOnlyNumbers(t){return(null==t?void 0:t.value)?/^[1-9]\d*\.?\d*$/.test(null==t?void 0:t.value)?0==(null==t?void 0:t.value)?{invalidNumber:!0}:null:{invalidNumber:!0}:null}static EmailValidator(t){return(null==t?void 0:t.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/))?null:{invalidEmailAddress:!0}}static RfcValidator(t){return(null==t?void 0:t.value)&&(null==t?void 0:t.value.match(/^([A-Z\xd1&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/))?null:{invalidRFC:!0}}}return t.password="",t.confirmPassword="",t.\u0275fac=function(e){return new(e||t)},t.\u0275prov=o.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()}}]);