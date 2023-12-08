(self.webpackChunktemplate_web=self.webpackChunktemplate_web||[]).push([[4645],{4645:(t,e,n)=>{"use strict";n.r(e),n.d(e,{TeacherStudentsModule:()=>w});var s=n(1116),o=n(2894),i=n(4391),r=n(1041),a=n(6050),c=n(5470),d=n(7687),u=n(7368),l=n(407),g=n(1392),h=n(6189),p=n(7536);function f(t,e){if(1&t){const t=u.EpF();u.TgZ(0,"div",26),u.TgZ(1,"button",6),u.NdJ("click",function(){return u.CHM(t),u.oxw().nav.GoToUserRoute("registrar-estudiantes/csv")}),u._uU(2," Agregar estudiantes "),u.qZA(),u.qZA()}}function m(t,e){if(1&t){const t=u.EpF();u.TgZ(0,"app-grades-groups-view",27),u.NdJ("onCreateNewStrategy",function(e){return u.CHM(t),u.oxw().CreateNewStrategy(e)})("onReload",function(){return u.CHM(t),u.oxw().GetTeacherStudents()}),u.qZA()}if(2&t){const t=u.oxw();u.Q6J("students",t.students)("teacherControls",!0)("newDashboard",!0)("onStudentSearch",t.onStudentSearch)("onChange",t.onChange)}}function Z(t,e){1&t&&(u.TgZ(0,"div",29),u._uU(1," No tiene estudiantes asignados, para m\xe1s informaci\xf3n contactar a su administrador "),u.qZA())}function b(t,e){if(1&t&&u.YNc(0,Z,2,0,"div",28),2&t){const t=u.oxw(),e=u.MAs(19);u.Q6J("ngIf",!(null==t.user||null==t.user.school||!t.user.school.isActive))("ngIfElse",e)}}function x(t,e){1&t&&(u.TgZ(0,"div",29),u._uU(1," No tiene estudiantes registrados "),u.qZA())}const C=function(){return{backdrop:"static",keyboard:!1}},T=[{path:"",component:(()=>{class t{constructor(t,e,n){this.nav=t,this.api=e,this.toast=n,this.onStudentSearch=new u.vpe,this.onChange=new u.vpe,this.students=[],this.teacherSubjects=[],this.teacherGroups=[],this.user=null}get schoolRegisterLink(){return`${this.api.GetHost()}registro/escuela/recomendado/${this.user?this.user.id:0}`}ngOnInit(){this.user=this.api.GetUser(),this.GetTeacherData(),this.GetTeacherStudents()}GetTeacherStudents(){this.api.Get(`/Students/OfTeacher/${this.user?this.user.id:0}`).subscribe(t=>{this.students=t,this.onChange.emit(this.students)},t=>{console.error("Error getting the students of the teacher",t)})}GetTeacherData(){this.api.Get(`/Teachers/${this.user?this.user.id:0}/Data`).subscribe(t=>{this.teacherSubjects=t.subjects,this.teacherGroups=t.teacherGroups},t=>{console.error("Error getting teacher data",t)})}SearchStudent(){}CreateNewStrategy(t){this.nav.GoToUserRoute(`grado/${t[0].grade}/grupo/${t[0].group}/plantillas`)}CopyLinkToClipBoard(){navigator.clipboard.writeText(this.schoolRegisterLink),this.toast.ShowSuccess("Link copiado")}}return t.\u0275fac=function(e){return new(e||t)(u.Y36(l.f),u.Y36(g.sM),u.Y36(h.k))},t.\u0275cmp=u.Xpm({type:t,selectors:[["app-teacher-students"]],decls:36,vars:7,consts:[[1,"content"],[1,"d-flex","align-items-center","justify-content-between","flex-wrap","mb-5"],[1,"text"],[1,"d-flex","flex-column","align-items-end",2,"gap","25px"],[1,"strategy-buttons"],[1,"btn","btn-primary",3,"click"],[1,"btn","btn-success",3,"click"],[1,"row"],[1,"col-12"],["class","d-flex align-items-center justify-content-end",4,"ngIf"],[3,"students","teacherControls","newDashboard","onStudentSearch","onChange","onCreateNewStrategy","onReload",4,"ngIf","ngIfElse"],["noStudents",""],["addStudents",""],["bsModal","","tabindex","-1","role","dialog","aria-labelledby","registerSchoolModal",1,"modal","fade",3,"config"],["registerSchoolModal","bs-modal"],[1,"modal-dialog","modal-lg"],[1,"modal-content"],[1,"modal-body"],[1,"text","text-center"],[1,"text-center","my-3"],["src","assets/img/teacher-celebrating.png","alt","finished"],[1,"text","d-flex","align-items-center","justify-content-center"],[1,"mr-3",3,"href"],[1,"zmdi","zmdi-copy","zmdi-hc-lg","clickeable","text-success",3,"click"],[1,"modal-footer","justify-content-center"],[1,"btn","btn-primary","modal-btn",3,"click"],[1,"d-flex","align-items-center","justify-content-end"],[3,"students","teacherControls","newDashboard","onStudentSearch","onChange","onCreateNewStrategy","onReload"],["class","text-center no-items-message",4,"ngIf","ngIfElse"],[1,"text-center","no-items-message"]],template:function(t,e){if(1&t){const t=u.EpF();u.TgZ(0,"div",0),u.TgZ(1,"div",1),u.TgZ(2,"div",2),u._uU(3," Tus grados y grupos registrados "),u.qZA(),u.TgZ(4,"div",3),u.TgZ(5,"div",4),u.TgZ(6,"button",5),u.NdJ("click",function(){return u.CHM(t),u.MAs(21).show()}),u._uU(7," Compartir con coordinador "),u.qZA(),u.TgZ(8,"button",5),u.NdJ("click",function(){return e.nav.GoToUserRoute("plantillas")}),u._uU(9," Crear nueva estrategia "),u.qZA(),u.TgZ(10,"button",6),u.NdJ("click",function(){return e.nav.GoToUserRoute("mis-estrategias")}),u._uU(11," Ver mis estrategias "),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.TgZ(12,"div",7),u.TgZ(13,"div",8),u.YNc(14,f,3,0,"div",9),u.YNc(15,m,1,5,"app-grades-groups-view",10),u.qZA(),u.qZA(),u.qZA(),u.YNc(16,b,1,2,"ng-template",null,11,u.W1O),u.YNc(18,x,2,0,"ng-template",null,12,u.W1O),u.TgZ(20,"div",13,14),u.TgZ(22,"div",15),u.TgZ(23,"div",16),u.TgZ(24,"div",17),u.TgZ(25,"div",18),u._uU(26," Envia este link al administrador de tu escuela para que pueda registrarse en nuestra plataforma "),u.qZA(),u.TgZ(27,"div",19),u._UZ(28,"img",20),u.qZA(),u.TgZ(29,"div",21),u.TgZ(30,"a",22),u._uU(31),u.qZA(),u.TgZ(32,"i",23),u.NdJ("click",function(){return e.CopyLinkToClipBoard()}),u.qZA(),u.qZA(),u.qZA(),u.TgZ(33,"div",24),u.TgZ(34,"button",25),u.NdJ("click",function(){u.CHM(t);const n=u.MAs(21);return e.CopyLinkToClipBoard(),n.hide()}),u._uU(35," Continuar "),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.qZA()}if(2&t){const t=u.MAs(17);u.xp6(14),u.Q6J("ngIf",!(null!=e.user&&null!=e.user.school&&e.user.school.isActive)),u.xp6(1),u.Q6J("ngIf",null==e.students?null:e.students.length)("ngIfElse",t),u.xp6(5),u.Q6J("config",u.DdM(6,C)),u.xp6(10),u.s9C("href",e.schoolRegisterLink,u.LSH),u.xp6(1),u.Oqu(e.schoolRegisterLink)}},directives:[s.O5,c.oB,p.d],styles:[".input-container[_ngcontent-%COMP%]{max-width:380px;margin:0}@media (min-width:660px) and (max-width:767px){.side-col[_ngcontent-%COMP%]{display:flex}}.side-image[_ngcontent-%COMP%]{width:100%}.nearby-container[_ngcontent-%COMP%]{padding:1rem 30px;color:#587594;font-size:.75rem;font-weight:500}.container-title[_ngcontent-%COMP%]{color:#26d7a4;font-size:.875rem;font-weight:500;margin-bottom:10px;text-align:center}.event-row[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;margin-bottom:7px}.event-group[_ngcontent-%COMP%]{padding:.5rem}.date-row[_ngcontent-%COMP%]{width:100%;text-align:center;margin-bottom:.375rem}.highlight[_ngcontent-%COMP%]{color:#fbcb63}.strategy-buttons[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;align-items:center;grid-gap:12px;gap:12px}.text[_ngcontent-%COMP%]{color:var(--gray-1,#3d5e81);font-size:16px;font-family:Mulish;font-style:normal;font-weight:700;line-height:normal}"]}),t})()}];let w=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=u.oAB({type:t}),t.\u0275inj=u.cJS({imports:[[r.u5,s.ez,i.A0,r.UX,a.G,d.M,c.zk.forRoot(),o.Bz.forChild(T)]]}),t})()}}]);