(self.webpackChunktemplate_web=self.webpackChunktemplate_web||[]).push([[4645],{4645:(e,t,n)=>{"use strict";n.r(t),n.d(t,{TeacherStudentsModule:()=>w});var s=n(1116),o=n(2894),i=n(4391),r=n(1041),a=n(6050),c=n(5470),d=n(7687),l=n(7368),u=n(407),g=n(1392),h=n(6189),p=n(7536);function f(e,t){if(1&e){const e=l.EpF();l.TgZ(0,"div",26),l.TgZ(1,"button",6),l.NdJ("click",function(){return l.CHM(e),l.oxw().nav.GoToUserRoute("registrar-estudiantes/csv")}),l._uU(2," Agregar estudiantes "),l.qZA(),l.qZA()}}function m(e,t){if(1&e){const e=l.EpF();l.TgZ(0,"app-grades-groups-view",27),l.NdJ("onCreateNewStrategy",function(t){return l.CHM(e),l.oxw().CreateNewStrategy(t)})("onReload",function(){return l.CHM(e),l.oxw().GetTeacherStudents()}),l.qZA()}if(2&e){const e=l.oxw();l.Q6J("students",e.students)("teacherControls",!0)("newDashboard",!0)("onStudentSearch",e.onStudentSearch)("onChange",e.onChange)}}function Z(e,t){1&e&&(l.TgZ(0,"div",29),l._uU(1," No tiene estudiantes asignados, para m\xe1s informacion contactar a su administrador "),l.qZA())}function b(e,t){if(1&e&&l.YNc(0,Z,2,0,"div",28),2&e){const e=l.oxw(),t=l.MAs(17);l.Q6J("ngIf",!(null==e.user||null==e.user.school||!e.user.school.isActive))("ngIfElse",t)}}function x(e,t){1&e&&(l.TgZ(0,"div",29),l._uU(1," No tiene estudiantes registrados "),l.qZA())}const T=function(){return{backdrop:"static",keyboard:!1}},v=[{path:"",component:(()=>{class e{constructor(e,t,n){this.nav=e,this.api=t,this.toast=n,this.onStudentSearch=new l.vpe,this.onChange=new l.vpe,this.students=[],this.teacherSubjects=[],this.teacherGroups=[],this.user=null}get schoolRegisterLink(){return`${this.api.GetHost()}registro/escuela/recomendado/${this.user?this.user.id:0}`}ngOnInit(){this.user=this.api.GetUser(),this.GetTeacherData(),this.GetTeacherStudents()}GetTeacherStudents(){this.api.Get(`/Students/OfTeacher/${this.user?this.user.id:0}`).subscribe(e=>{this.students=e,this.onChange.emit(this.students)},e=>{console.error("Error getting the students of the teacher",e)})}GetTeacherData(){this.api.Get(`/Teachers/${this.user?this.user.id:0}/Data`).subscribe(e=>{this.teacherSubjects=e.subjects,this.teacherGroups=e.teacherGroups},e=>{console.error("Error getting teacher data",e)})}SearchStudent(){}CreateNewStrategy(e){this.nav.GoToUserRoute(`grado/${e[0].grade}/grupo/${e[0].group}/plantillas`)}CopyLinkToClipBoard(){navigator.clipboard.writeText(this.schoolRegisterLink),this.toast.ShowSuccess("Link copiado")}}return e.\u0275fac=function(t){return new(t||e)(l.Y36(u.f),l.Y36(g.sM),l.Y36(h.k))},e.\u0275cmp=l.Xpm({type:e,selectors:[["app-teacher-students"]],decls:34,vars:7,consts:[[1,"content"],[1,"d-flex","align-items-center","justify-content-between","flex-wrap","mb-5"],[1,"text"],[1,"d-flex","flex-column","align-items-end",2,"gap","25px"],[1,"strategy-buttons"],[1,"btn","btn-primary",3,"click"],[1,"btn","btn-success",3,"click"],[1,"row"],[1,"col-12"],["class","d-flex align-items-center justify-content-end",4,"ngIf"],[3,"students","teacherControls","newDashboard","onStudentSearch","onChange","onCreateNewStrategy","onReload",4,"ngIf","ngIfElse"],["noStudents",""],["addStudents",""],["bsModal","","tabindex","-1","role","dialog","aria-labelledby","registerSchoolModal",1,"modal","fade",3,"config"],["registerSchoolModal","bs-modal"],[1,"modal-dialog","modal-lg"],[1,"modal-content"],[1,"modal-body"],[1,"text","text-center"],[1,"text-center","my-3"],["src","assets/img/teacher-celebrating.png","alt","finished"],[1,"text","d-flex","align-items-center","justify-content-center"],[1,"mr-3",3,"href"],[1,"zmdi","zmdi-copy","zmdi-hc-lg","clickeable","text-success",3,"click"],[1,"modal-footer","justify-content-center"],[1,"btn","btn-primary","modal-btn",3,"click"],[1,"d-flex","align-items-center","justify-content-end"],[3,"students","teacherControls","newDashboard","onStudentSearch","onChange","onCreateNewStrategy","onReload"],["class","text-center no-items-message",4,"ngIf","ngIfElse"],[1,"text-center","no-items-message"]],template:function(e,t){if(1&e){const e=l.EpF();l.TgZ(0,"div",0),l.TgZ(1,"div",1),l.TgZ(2,"div",2),l._uU(3," Tus grados y grupos registrados "),l.qZA(),l.TgZ(4,"div",3),l.TgZ(5,"div",4),l.TgZ(6,"button",5),l.NdJ("click",function(){return t.nav.GoToUserRoute("plantillas")}),l._uU(7," Crear nueva estrategia "),l.qZA(),l.TgZ(8,"button",6),l.NdJ("click",function(){return t.nav.GoToUserRoute("mis-estrategias")}),l._uU(9," Ver mis estrategias "),l.qZA(),l.qZA(),l.qZA(),l.qZA(),l.TgZ(10,"div",7),l.TgZ(11,"div",8),l.YNc(12,f,3,0,"div",9),l.YNc(13,m,1,5,"app-grades-groups-view",10),l.qZA(),l.qZA(),l.qZA(),l.YNc(14,b,1,2,"ng-template",null,11,l.W1O),l.YNc(16,x,2,0,"ng-template",null,12,l.W1O),l.TgZ(18,"div",13,14),l.TgZ(20,"div",15),l.TgZ(21,"div",16),l.TgZ(22,"div",17),l.TgZ(23,"div",18),l._uU(24," Envia este link al administrador de tu escuela para que pueda registrarse en nuestra plataforma "),l.qZA(),l.TgZ(25,"div",19),l._UZ(26,"img",20),l.qZA(),l.TgZ(27,"div",21),l.TgZ(28,"a",22),l._uU(29),l.qZA(),l.TgZ(30,"i",23),l.NdJ("click",function(){return t.CopyLinkToClipBoard()}),l.qZA(),l.qZA(),l.qZA(),l.TgZ(31,"div",24),l.TgZ(32,"button",25),l.NdJ("click",function(){l.CHM(e);const n=l.MAs(19);return t.CopyLinkToClipBoard(),n.hide()}),l._uU(33," Continuar "),l.qZA(),l.qZA(),l.qZA(),l.qZA(),l.qZA()}if(2&e){const e=l.MAs(15);l.xp6(12),l.Q6J("ngIf",!(null!=t.user&&null!=t.user.school&&t.user.school.isActive)),l.xp6(1),l.Q6J("ngIf",null==t.students?null:t.students.length)("ngIfElse",e),l.xp6(5),l.Q6J("config",l.DdM(6,T)),l.xp6(10),l.s9C("href",t.schoolRegisterLink,l.LSH),l.xp6(1),l.Oqu(t.schoolRegisterLink)}},directives:[s.O5,c.oB,p.d],styles:[".input-container[_ngcontent-%COMP%]{max-width:380px;margin:0}@media (min-width:660px) and (max-width:767px){.side-col[_ngcontent-%COMP%]{display:flex}}.side-image[_ngcontent-%COMP%]{width:100%}.nearby-container[_ngcontent-%COMP%]{padding:1rem 30px;color:#587594;font-size:.75rem;font-weight:500}.container-title[_ngcontent-%COMP%]{color:#26d7a4;font-size:.875rem;font-weight:500;margin-bottom:10px;text-align:center}.event-row[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;margin-bottom:7px}.event-group[_ngcontent-%COMP%]{padding:.5rem}.date-row[_ngcontent-%COMP%]{width:100%;text-align:center;margin-bottom:.375rem}.highlight[_ngcontent-%COMP%]{color:#fbcb63}.strategy-buttons[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;align-items:center;grid-gap:12px;gap:12px}.text[_ngcontent-%COMP%]{color:var(--gray-1,#3d5e81);font-size:16px;font-family:Mulish;font-style:normal;font-weight:700;line-height:normal}"]}),e})()}];let w=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=l.oAB({type:e}),e.\u0275inj=l.cJS({imports:[[r.u5,s.ez,i.A0,r.UX,a.G,d.M,c.zk.forRoot(),o.Bz.forChild(v)]]}),e})()}}]);