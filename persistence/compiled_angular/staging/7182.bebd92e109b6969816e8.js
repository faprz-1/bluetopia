(self.webpackChunktemplate_web=self.webpackChunktemplate_web||[]).push([[7182],{6158:(e,t,r)=>{"use strict";r.d(t,{w:()=>a});var o=r(5821),n=r(7368),s=r(1116);function i(e,t){if(1&e&&(n.TgZ(0,"div",1),n._uU(1),n.qZA()),2&e){const e=n.oxw();n.xp6(1),n.hij(" ",null==e.errorMessage?null:e.errorMessage.label,"\n")}}let a=(()=>{class e{constructor(){}ngOnInit(){}get errorMessage(){var e,t,r,n;for(let s in null===(e=this.control)||void 0===e?void 0:e.errors)if((null===(t=this.control)||void 0===t?void 0:t.errors.hasOwnProperty(s))&&(null===(r=this.control)||void 0===r?void 0:r.touched))return o.R.GetValidatorErrorMessage(s,null===(n=this.control)||void 0===n?void 0:n.errors[s]);return null}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=n.Xpm({type:e,selectors:[["app-control-messages"]],inputs:{control:"control"},decls:1,vars:1,consts:[["class","color-red",4,"ngIf"],[1,"color-red"]],template:function(e,t){1&e&&n.YNc(0,i,2,1,"div",0),2&e&&n.Q6J("ngIf",null!==t.errorMessage)},directives:[s.O5],styles:[""]}),e})()},7182:(e,t,r)=>{"use strict";r.r(t),r.d(t,{RegisterUserModule:()=>Y});var o=r(1116),n=r(2894),s=r(1041),i=r(6050),a=r(9609),c=r(5821),l=r(7368),u=r(407),d=r(6189),g=r(1392),p=r(2874),m=r(8118),h=r(6158),Z=r(4391);function v(e,t){if(1&e&&(l.TgZ(0,"ng-option",16),l._uU(1),l.qZA()),2&e){const e=t.$implicit;l.Q6J("value",e.studentId),l.xp6(1),l.Oqu(null==e.student?null:e.student.registerNumber)}}let f=(()=>{class e{constructor(e,t,r,o){this.activatedRoute=e,this.api=t,this.toast=r,this.nav=o,this.onBackClicked=new l.vpe,this.onNextClicked=new l.vpe,this.registerUid=null,this.studentGroups=[],this.credentialsForm=new s.cw({studentId:new s.NI(null,[s.kI.required]),username:new s.NI(null,[s.kI.required]),password:new s.NI(null,[s.kI.required])})}ngOnInit(){this.GetParams()}GetParams(){this.activatedRoute.params.subscribe(e=>{this.registerUid=e.registerUid,this.GetStudentGroups()})}GetStudentGroups(){this.api.Get(`/StudentsGroups/ByRegisterUid/${this.registerUid}`).subscribe(e=>{this.studentGroups=e.filter(e=>!!e.student&&!e.student.userId)},e=>{this.toast.ShowError("Este link ya no es v\xe1lido"),this.nav.GoTo("landing-page")})}BuildStudentFullName(e){return e?`${e.name} ${e.fatherLastname} ${e.motherLastname}`:""}RegisterStudent(){var e,t;if(this.credentialsForm.invalid)return this.toast.ShowWarning("Favor de llenar todos los campos correctamente"),void this.credentialsForm.markAllAsTouched();let r=this.credentialsForm.value;r.schoolId=null===(t=null===(e=this.studentGroups[0])||void 0===e?void 0:e.student)||void 0===t?void 0:t.schoolId,this.onNextClicked.emit(r)}}return e.\u0275fac=function(t){return new(t||e)(l.Y36(n.gz),l.Y36(g.sM),l.Y36(d.k),l.Y36(u.f))},e.\u0275cmp=l.Xpm({type:e,selectors:[["app-register-student"]],outputs:{onBackClicked:"onBackClicked",onNextClicked:"onNextClicked"},decls:32,vars:3,consts:[[1,"d-flex","flex-column","w-100",2,"gap","48px"],[1,"d-flex","flex-column","justify-content-center","align-items-center",2,"gap","12px"],[1,"title"],[1,"text"],[3,"formGroup"],[1,"text","w-100","text-left"],["formControlName","studentId","placeholder","Selecciona tu n\xfamero de registro",1,"form-control","with-border","w-100",3,"clearable"],[3,"value",4,"ngFor","ngForOf"],[1,"text","text-left","w-100"],[1,"input-container","mb-2"],[1,"input-icon-container"],["src","assets/icons/user.svg"],["type","text","placeholder","Usuario","formControlName","username",1,"form-control","with-border"],["src","assets/icons/lock.png"],["type","password","placeholder","Contrase\xf1a","formControlName","password",1,"form-control","with-border"],[1,"btn","btn-success",3,"click"],[3,"value"]],template:function(e,t){1&e&&(l.TgZ(0,"div",0),l.TgZ(1,"div",1),l.TgZ(2,"div",2),l._uU(3,"\xa1Bienvenido Alumno!"),l.qZA(),l.TgZ(4,"div",3),l._uU(5,"Crea tu usuario"),l.qZA(),l.qZA(),l.ynx(6,4),l.TgZ(7,"div",1),l.TgZ(8,"div",5),l._uU(9,"Selecciona tu n\xfamero de registro"),l.qZA(),l.TgZ(10,"ng-select",6),l.YNc(11,v,2,2,"ng-option",7),l.qZA(),l.qZA(),l.TgZ(12,"div",1),l.TgZ(13,"div",3),l._uU(14,"Crea tus credenciales"),l.qZA(),l.TgZ(15,"div",3),l._uU(16," Para la contrase\xf1a te recomendamos utilizar algo que puedas recordar, puede ser tu nombre, tu color favorito , tu cumplea\xf1os o tu personaje favorito. "),l.qZA(),l.TgZ(17,"div",8),l._uU(18,"Usuario"),l.qZA(),l.TgZ(19,"div",9),l.TgZ(20,"div",10),l._UZ(21,"img",11),l.qZA(),l._UZ(22,"input",12),l.qZA(),l.TgZ(23,"div",8),l._uU(24,"Contrase\xf1a"),l.qZA(),l.TgZ(25,"div",9),l.TgZ(26,"div",10),l._UZ(27,"img",13),l.qZA(),l._UZ(28,"input",14),l.qZA(),l.qZA(),l.BQk(),l.TgZ(29,"div",1),l.TgZ(30,"button",15),l.NdJ("click",function(){return t.RegisterStudent()}),l._uU(31," Empezar "),l.qZA(),l.qZA(),l.qZA()),2&e&&(l.xp6(6),l.Q6J("formGroup",t.credentialsForm),l.xp6(4),l.Q6J("clearable",!1),l.xp6(1),l.Q6J("ngForOf",t.studentGroups))},directives:[s.JL,s.sg,Z.w9,s.JJ,s.u,o.sg,s.Fj,Z.xv],styles:[""]}),e})();const w=function(e){return{"text-success":e}};let T=(()=>{class e{constructor(e,t){this.nav=e,this.api=t,this.userType=""}get text1(){switch(this.userType){case"maestro":return"Aqu\xed podr\xe1s dise\xf1ar estrategias de aprendizaje paso a paso, tambi\xe9n podr\xe1s consultar y usar estrategias ya creadas.";default:return"En esta plataforma tus docentes podr\xe1n crear sus estrategias r\xe1pida y ordenadamente."}}get text2(){switch(this.userType){case"maestro":return"De forma acompa\xf1ada lograr\xe1s reinventar tus clases.";default:return"Tus alumnos se podr\xe1n conectar con el profesor y recibir y subir sus tareas."}}get text3(){switch(this.userType){case"maestro":return"Y ser\xe1 sencillo planear";default:return"Tus padres de familia podr\xe1n estar al tanto de todo lo que su hijo esta realizando y ver sus trabajos as\xed como compratirlos en redes sociales."}}get text4(){switch(this.userType){case"maestro":return"Comienza registrando a tus alumnos";default:return"Comienza registrando a tus maestros"}}ngOnInit(){}GoToAddTeachers(){const e=this.api.GetUser();this.nav.GoTo(`inicio/${e.role.name.toLowerCase()}/registrar-maestros`)}GoToAddByCsv(){const e=this.api.GetUser();let t=`inicio/${e.role.name.toLowerCase()}`;switch(e.role.name){case"Teacher":t+="/registrar-estudiantes";break;default:t+="/registrar-maestros"}this.nav.GoTo(`${t}/csv`)}}return e.\u0275fac=function(t){return new(t||e)(l.Y36(u.f),l.Y36(g.sM))},e.\u0275cmp=l.Xpm({type:e,selectors:[["app-welcome-view"]],inputs:{userType:"userType"},decls:22,vars:8,consts:[[1,"d-flex","w-100","justify-content-center"],[1,"welcome-container"],[1,"header-container","mt-3"],[1,"title","mb-4",3,"ngClass"],[1,"text"],[1,"d-flex","align-items-center",2,"margin-bottom","12px"],[1,"text","mr-3"],["src","assets/img/welcome_1.png","alt","welcome_1"],["src","assets/img/welcome_2.png","alt","welcome_1"],[1,"text","ml-3"],[1,"subtitle","mt-5","mb-4"],[1,"d-md-flex","w-100","justify-content-center","gap-45","flex-xs-column"],[1,"w-50","btn","btn-outline-primary","mb-4",3,"click"],[1,"w-50","btn","btn-primary","mb-4",3,"click"]],template:function(e,t){1&e&&(l.TgZ(0,"div",0),l.TgZ(1,"div",1),l.TgZ(2,"div",2),l.TgZ(3,"div",3),l._uU(4),l.qZA(),l.TgZ(5,"div",4),l._uU(6),l.qZA(),l.qZA(),l.TgZ(7,"div",5),l.TgZ(8,"div",6),l._uU(9),l.qZA(),l._UZ(10,"img",7),l.qZA(),l.TgZ(11,"div",5),l._UZ(12,"img",8),l.TgZ(13,"div",9),l._uU(14),l.qZA(),l.qZA(),l.TgZ(15,"div",10),l._uU(16),l.qZA(),l.TgZ(17,"div",11),l.TgZ(18,"button",12),l.NdJ("click",function(){return t.nav.GoToUserRoute("")}),l._uU(19," Continuar sin registrar "),l.qZA(),l.TgZ(20,"button",13),l.NdJ("click",function(){return t.GoToAddByCsv()}),l._uU(21," Registrar "),l.qZA(),l.qZA(),l.qZA(),l.qZA()),2&e&&(l.xp6(3),l.Q6J("ngClass",l.VKq(6,w,"maestro"==t.userType)),l.xp6(1),l.hij(" \xa1Bienvenido ","escuela"!=t.userType?t.userType:"","! "),l.xp6(2),l.hij(" ",t.text1," "),l.xp6(3),l.hij(" ",t.text2," "),l.xp6(5),l.hij(" ",t.text3," "),l.xp6(2),l.hij(" ",t.text4," "))},directives:[o.mk],styles:[".welcome-container[_ngcontent-%COMP%]{max-width:100%;width:850px}.faded-title[_ngcontent-%COMP%]{font-size:8rem;font-weight:700;color:rgba(189,221,255,.3333333333333333)}.header-container[_ngcontent-%COMP%]{margin-bottom:58px;max-width:500px;display:inline-block}.subtitle[_ngcontent-%COMP%]{font-size:2rem;font-weight:500;color:var(--blue-dark,#2369b5);font-family:Mulish}.btn[_ngcontent-%COMP%]{font-size:1.25rem;padding:16px 25px;font-weight:800}.btns-container[_ngcontent-%COMP%]{width:100%;max-width:550px;margin-bottom:2rem;display:inline-block}.form[_ngcontent-%COMP%]{width:100%;max-width:380px}.form[_ngcontent-%COMP%], .link[_ngcontent-%COMP%]{margin-bottom:74px}.link[_ngcontent-%COMP%]{font-size:1.25rem;font-weight:800;color:#1081fb}.gap-45[_ngcontent-%COMP%]{grid-gap:45px;gap:45px}"]}),e})();function x(e,t){if(1&e){const e=l.EpF();l.TgZ(0,"button",31),l.NdJ("click",function(){return l.CHM(e),l.oxw(3).Forward()}),l._uU(1," Registrarme "),l.qZA()}}const b=function(e){return{"justify-content-md-between":e}};function q(e,t){if(1&e){const e=l.EpF();l.TgZ(0,"div",14),l.TgZ(1,"div",15),l.TgZ(2,"div",16),l._uU(3," \xa1Bienvenido! "),l.qZA(),l.TgZ(4,"div",17),l._uU(5," Comienza gratis tu registro hoy "),l.qZA(),l.qZA(),l.TgZ(6,"form",18),l.TgZ(7,"div",19),l.TgZ(8,"div",20),l._UZ(9,"img",21),l.qZA(),l.TgZ(10,"input",22),l.NdJ("keyup.enter",function(){return l.CHM(e),l.oxw(2).LoginUser()}),l.qZA(),l.qZA(),l._UZ(11,"app-control-messages",23),l.TgZ(12,"div",19),l.TgZ(13,"div",20),l._UZ(14,"img",24),l.qZA(),l.TgZ(15,"input",25),l.NdJ("keyup.enter",function(){return l.CHM(e),l.oxw(2).LoginUser()}),l.qZA(),l.qZA(),l._UZ(16,"app-control-messages",23),l.qZA(),l.TgZ(17,"div",26),l.NdJ("click",function(){return l.CHM(e),l.oxw(2).passwordForgotten=!0}),l.TgZ(18,"a"),l._uU(19," \xbfOlvidaste tu contrase\xf1a? "),l.qZA(),l.qZA(),l.TgZ(20,"div",27),l.TgZ(21,"div",28),l.YNc(22,x,2,0,"button",29),l.TgZ(23,"button",30),l.NdJ("click",function(){return l.CHM(e),l.oxw(2).LoginUser()}),l._uU(24," Iniciar sesi\xf3n "),l.qZA(),l.qZA(),l.qZA(),l.qZA()}if(2&e){const e=l.oxw(2);l.xp6(6),l.Q6J("formGroup",e.userForm),l.xp6(5),l.Q6J("control",e.userForm.get("email")),l.xp6(5),l.Q6J("control",e.userForm.get("password")),l.xp6(5),l.Q6J("ngClass",l.VKq(5,b,e.canRegister)),l.xp6(1),l.Q6J("ngIf",e.canRegister)}}function A(e,t){if(1&e){const e=l.EpF();l.TgZ(0,"div"),l.TgZ(1,"app-register-student",34),l.NdJ("onBackClicked",function(){return l.CHM(e),l.oxw(3).GoBack()})("onNextClicked",function(t){return l.CHM(e),l.oxw(3).ApiRegisterUser(t,null,"Student")}),l.qZA(),l.qZA()}}function C(e,t){if(1&e){const e=l.EpF();l.TgZ(0,"div"),l.TgZ(1,"div",15),l.TgZ(2,"div",35),l._uU(3," Cu\xe9ntanos m\xe1s sobre t\xed "),l.qZA(),l.TgZ(4,"div",17),l._uU(5," Y m\xe1s sobre la instituci\xf3n que representas "),l.qZA(),l.qZA(),l.TgZ(6,"form",18),l.TgZ(7,"div",19),l.TgZ(8,"div",20),l._UZ(9,"img",36),l.qZA(),l._UZ(10,"input",37),l.TgZ(11,"span",38),l._uU(12,"*"),l.qZA(),l.qZA(),l._UZ(13,"app-control-messages",23),l.TgZ(14,"div",19),l.TgZ(15,"div",20),l._UZ(16,"img",39),l.qZA(),l._UZ(17,"input",40),l.qZA(),l._UZ(18,"app-control-messages",23),l.ynx(19,41),l.TgZ(20,"div",19),l.TgZ(21,"div",20),l._UZ(22,"img",42),l.qZA(),l._UZ(23,"input",43),l.TgZ(24,"span",38),l._uU(25,"*"),l.qZA(),l.qZA(),l._UZ(26,"app-control-messages",23),l.TgZ(27,"div",19),l.TgZ(28,"div",20),l._UZ(29,"img",44),l.qZA(),l._UZ(30,"input",45),l.TgZ(31,"span",38),l._uU(32,"*"),l.qZA(),l.qZA(),l._UZ(33,"app-control-messages",23),l.TgZ(34,"div",19),l.TgZ(35,"div",20),l._UZ(36,"img",46),l.qZA(),l._UZ(37,"input",47),l.qZA(),l._UZ(38,"app-control-messages",23),l.BQk(),l.TgZ(39,"div",19),l.TgZ(40,"div",20),l._UZ(41,"img",48),l.qZA(),l._UZ(42,"input",49),l.TgZ(43,"span",38),l._uU(44,"*"),l.qZA(),l.qZA(),l._UZ(45,"app-control-messages",23),l.TgZ(46,"div",19),l.TgZ(47,"div",20),l._UZ(48,"img",21),l.qZA(),l._UZ(49,"input",50),l.TgZ(50,"span",38),l._uU(51,"*"),l.qZA(),l.qZA(),l._UZ(52,"app-control-messages",23),l.TgZ(53,"div",19),l.TgZ(54,"div",20),l._UZ(55,"img",24),l.qZA(),l.TgZ(56,"input",51),l.NdJ("keyup",function(){return l.CHM(e),l.oxw(3).OnPasswordChange()})("keyup.enter",function(){return l.CHM(e),l.oxw(3).RegisterUser()}),l.qZA(),l.TgZ(57,"span",38),l._uU(58,"*"),l.qZA(),l.qZA(),l._UZ(59,"app-control-messages",23),l.TgZ(60,"div",19),l.TgZ(61,"div",20),l._UZ(62,"img",24),l.qZA(),l.TgZ(63,"input",52),l.NdJ("keyup.enter",function(){return l.CHM(e),l.oxw(3).RegisterUser()}),l.qZA(),l.TgZ(64,"span",38),l._uU(65,"*"),l.qZA(),l.qZA(),l._UZ(66,"app-control-messages",23),l.qZA(),l.TgZ(67,"div",27),l.TgZ(68,"div",53),l.TgZ(69,"button",54),l.NdJ("click",function(){return l.CHM(e),l.oxw(3).Back()}),l._uU(70," Volver "),l.qZA(),l.TgZ(71,"button",31),l.NdJ("click",function(){return l.CHM(e),l.oxw(3).RegisterUser()}),l._uU(72," Registrar "),l.qZA(),l.qZA(),l.qZA(),l.qZA()}if(2&e){const e=l.oxw(3);l.xp6(6),l.Q6J("formGroup",e.userRegisterForm),l.xp6(7),l.Q6J("control",e.userForm.get("username")),l.xp6(5),l.Q6J("control",e.userRegisterForm.get("phone")),l.xp6(1),l.Q6J("formGroup",e.schoolForm),l.xp6(7),l.Q6J("control",e.schoolForm.get("name")),l.xp6(7),l.Q6J("control",e.schoolForm.get("address")),l.xp6(5),l.Q6J("control",e.schoolForm.get("phone")),l.xp6(7),l.Q6J("control",e.userRegisterForm.get("workTitle")),l.xp6(7),l.Q6J("control",e.userRegisterForm.get("email")),l.xp6(7),l.Q6J("control",e.userRegisterForm.get("password")),l.xp6(7),l.Q6J("control",e.userRegisterForm.get("confirmPassword"))}}function U(e,t){if(1&e&&(l.TgZ(0,"div",14),l.TgZ(1,"div",11),l.YNc(2,A,2,0,"div",32),l.YNc(3,C,73,11,"div",33),l.qZA(),l.qZA()),2&e){const e=l.oxw(2);l.xp6(1),l.Q6J("ngSwitch",e.userType),l.xp6(1),l.Q6J("ngSwitchCase","estudiante")}}function k(e,t){if(1&e&&(l.TgZ(0,"div",55),l._UZ(1,"app-welcome-view",56),l.qZA()),2&e){const e=l.oxw(2);l.xp6(1),l.Q6J("userType",e.userType)}}function _(e,t){if(1&e&&(l.TgZ(0,"div",6),l.TgZ(1,"div",7),l.TgZ(2,"div",8),l.TgZ(3,"div"),l._UZ(4,"img",9),l.qZA(),l.TgZ(5,"div",10),l.TgZ(6,"div",11),l.YNc(7,q,25,7,"div",12),l.YNc(8,U,4,2,"div",12),l.YNc(9,k,2,1,"div",13),l.qZA(),l.qZA(),l.qZA(),l.qZA(),l.qZA()),2&e){const e=l.oxw();l.xp6(6),l.Q6J("ngSwitch",e.registerStep),l.xp6(1),l.Q6J("ngSwitchCase",1),l.xp6(1),l.Q6J("ngSwitchCase",2),l.xp6(1),l.Q6J("ngSwitchCase",3)}}function y(e,t){1&e&&(l.TgZ(0,"div",68),l._uU(1," Campo obligatorio "),l.qZA())}function N(e,t){1&e&&(l.TgZ(0,"div",68),l._uU(1," Correo electr\xf3nico no valido"),l.qZA())}function I(e,t){if(1&e){const e=l.EpF();l.TgZ(0,"div",8),l.TgZ(1,"h2",60),l._uU(2,"Ingresa tu correo"),l.qZA(),l.TgZ(3,"div",61),l.TgZ(4,"div",62),l.TgZ(5,"input",63),l.NdJ("ngModelChange",function(t){return l.CHM(e),l.oxw(2).email=t}),l.qZA(),l.YNc(6,y,2,0,"div",64),l.YNc(7,N,2,0,"div",64),l.qZA(),l.TgZ(8,"div",27),l.TgZ(9,"div",65),l.TgZ(10,"button",66),l.NdJ("click",function(){return l.CHM(e),l.oxw(2).SendEmail()}),l._uU(11,"Continuar"),l.qZA(),l.TgZ(12,"button",67),l.NdJ("click",function(){return l.CHM(e),l.oxw(2).GoBack()}),l._uU(13,"Cancelar"),l.qZA(),l.qZA(),l.qZA(),l.qZA(),l.qZA()}if(2&e){const e=l.oxw(2);l.xp6(5),l.Q6J("ngModel",e.email),l.xp6(1),l.Q6J("ngIf",!e.email),l.xp6(1),l.Q6J("ngIf",e.email&&!e.pattern.test(e.email)),l.xp6(3),l.Q6J("disabled",e.loading),l.xp6(2),l.Q6J("disabled",e.loading)}}function S(e,t){1&e&&(l.TgZ(0,"div",8),l._UZ(1,"i",69),l.qZA())}function J(e,t){if(1&e){const e=l.EpF();l.TgZ(0,"div",8),l.TgZ(1,"div",61),l.TgZ(2,"div",62),l.TgZ(3,"h4",17),l._uU(4,"Ingrese el PIN"),l.qZA(),l.TgZ(5,"input",70),l.NdJ("ngModelChange",function(t){return l.CHM(e),l.oxw(2).pin=t}),l.qZA(),l.qZA(),l.TgZ(6,"div",27),l.TgZ(7,"div",65),l.TgZ(8,"button",66),l.NdJ("click",function(){return l.CHM(e),l.oxw(2).TryPIN()}),l._uU(9,"Continuar"),l.qZA(),l.TgZ(10,"button",67),l.NdJ("click",function(){return l.CHM(e),l.oxw(2).GoBack()}),l._uU(11,"Cancelar"),l.qZA(),l.qZA(),l.qZA(),l.qZA(),l.qZA()}if(2&e){const e=l.oxw(2);l.xp6(5),l.Q6J("ngModel",e.pin),l.xp6(3),l.Q6J("disabled",e.loading),l.xp6(2),l.Q6J("disabled",e.loading)}}function M(e,t){if(1&e){const e=l.EpF();l.TgZ(0,"div",8),l.TgZ(1,"div",61),l.TgZ(2,"div",62),l.TgZ(3,"h2",60),l._uU(4,"Ingresa tu nueva contrase\xf1a"),l.qZA(),l.TgZ(5,"input",71),l.NdJ("ngModelChange",function(t){return l.CHM(e),l.oxw(2).newPassword=t}),l.qZA(),l.qZA(),l.TgZ(6,"div",27),l.TgZ(7,"div",65),l.TgZ(8,"button",66),l.NdJ("click",function(){return l.CHM(e),l.oxw(2).SetPassword()}),l._uU(9,"Continuar"),l.qZA(),l.TgZ(10,"button",67),l.NdJ("click",function(){return l.CHM(e),l.oxw(2).GoBack()}),l._uU(11,"Cancelar"),l.qZA(),l.qZA(),l.qZA(),l.qZA(),l.qZA()}if(2&e){const e=l.oxw(2);l.xp6(5),l.Q6J("ngModel",e.newPassword),l.xp6(3),l.Q6J("disabled",e.loading),l.xp6(2),l.Q6J("disabled",e.loading)}}function P(e,t){if(1&e&&(l.TgZ(0,"div",57),l.TgZ(1,"div",58),l.TgZ(2,"div",8),l._UZ(3,"img",9),l.TgZ(4,"div",16),l._uU(5,"Recupera tu cuenta"),l.qZA(),l.qZA(),l.YNc(6,I,14,5,"div",59),l.YNc(7,S,2,0,"div",59),l.YNc(8,J,12,3,"div",59),l.YNc(9,M,12,3,"div",59),l.qZA(),l.qZA()),2&e){const e=l.oxw();l.xp6(6),l.Q6J("ngIf",0==e.step),l.xp6(1),l.Q6J("ngIf",e.loading),l.xp6(1),l.Q6J("ngIf",2==e.step),l.xp6(1),l.Q6J("ngIf",3==e.step)}}let F=(()=>{class e{constructor(e,t,r,o,n,i){this.navigation=e,this.activeRoute=t,this.toast=r,this.api=o,this.notiServ=n,this.pushService=i,this.registerStep=1,this.userType="",this.teacherIdToAbsorb="",this.studentGroupRegisterUid=null,this.userForm=new s.cw({email:new s.NI(null,[s.kI.required,s.kI.email]),password:new s.NI(null,[s.kI.required,s.kI.minLength(3)])}),this.userRegisterForm=new s.cw({username:new s.NI(null,[s.kI.required]),workTitle:new s.NI(null,[s.kI.required]),email:new s.NI(null,[s.kI.required,s.kI.email]),password:new s.NI(null,[s.kI.required]),confirmPassword:new s.NI(null,[s.kI.required]),phone:new s.NI(null,[s.kI.required,c.R.CheckOnlyIntegerNumbers]),school:new s.cw({name:new s.NI(null,[s.kI.required]),phone:new s.NI(null,[s.kI.required,c.R.CheckOnlyIntegerNumbers]),address:new s.NI(null,[s.kI.required,s.kI.minLength(3)])})}),this.passwordForgotten=!1,this.email="",this.pin="",this.newPassword="",this.successUpdate=!1,this.loading=!1,this.step=0,this.pattern=new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$")}get schoolForm(){return this.userRegisterForm.get("school")}get canRegister(){switch(this.userType){case"estudiante":return!1;default:return!0}}ngOnInit(){this.GetParams()}GetParams(){this.activeRoute.params.subscribe(e=>{var t,r,o,n;this.userType=e.userType,this.teacherIdToAbsorb=e.teacherId,this.studentGroupRegisterUid=e.registerUid,(this.teacherIdToAbsorb||this.studentGroupRegisterUid)&&(this.registerStep=2),"maestro"==this.userType&&(null===(t=this.userRegisterForm.get("phone"))||void 0===t||t.clearValidators(),null===(r=this.userRegisterForm.get("phone"))||void 0===r||r.setValidators([c.R.CheckOnlyIntegerNumbers]),null===(o=this.schoolForm.get("phone"))||void 0===o||o.clearValidators(),null===(n=this.schoolForm.get("phone"))||void 0===n||n.setValidators([c.R.CheckOnlyIntegerNumbers]))})}Back(){this.registerStep--}Forward(){this.registerStep++}OnPasswordChange(){this.userRegisterForm.controls.confirmPassword.setValidators([s.kI.required,c.R.matchString(this.userRegisterForm.controls.password.value,"Las contrase\xf1as no coinciden")]),this.userRegisterForm.updateValueAndValidity()}RegisterUser(){if(this.userRegisterForm.invalid)return void this.toast.ShowWarning("Favor de llenar todos los campos");let e=Object.assign({},this.userRegisterForm.value);this.teacherIdToAbsorb&&(e.teacherIdToAbsorb=this.teacherIdToAbsorb),this.ApiRegisterUser({email:e.email,password:e.password,active:!0},e,this.userType.toLowerCase())}ApiRegisterUser(e,t,r){e.active=!0,this.api.Post("/Usuarios",{user:e,userData:t,role:r}).subscribe(t=>{this.api.Post("/Usuarios/login",{email:e.email?e.email:e.username,password:e.password}).subscribe(e=>{localStorage.clear(),this.api.SetToken(e.id),this.api.Get("/Usuarios/withCredentials",!0).subscribe(e=>{localStorage.setItem("user",JSON.stringify(e)),localStorage.setItem("ttl",a().add(1209600,"s").toISOString()),this.notiServ.LoadNotifications(),this.pushService.GetUserID(),this.toast.ShowSuccess("Cuenta registrada correctamente");let t=this.api.GetUser(),r=t.role.name.toLowerCase();"School"==t.role.name||"Teacher"==t.role.name?this.Forward():this.navigation.GoTo(`/inicio/${r}/`)},e=>{this.toast.ShowError(e.error.error.message)})})})}LoginUser(){const e=this.userForm.value;e.email&&e.password?this.api.Post("/Usuarios/login",{email:e.email,password:e.password},!1).subscribe(e=>{localStorage.clear(),this.api.SetToken(e.id),this.api.Get("/Usuarios/withCredentials",!0).subscribe(e=>{localStorage.setItem("user",JSON.stringify(e)),localStorage.setItem("ttl",a().add(1209600,"s").toISOString()),this.notiServ.LoadNotifications(),this.pushService.GetUserID(),this.toast.ShowSuccess("Sesi\xf3n iniciada exitosamente");let t=this.api.GetUser().role.name.toLowerCase();this.navigation.GoTo(`/inicio/${t}/`)},e=>{this.toast.ShowError(e.error.error.message)})},e=>{this.toast.ShowError(e.error.error.message)}):this.toast.ShowWarning("Favor de escribir sus credenciales")}SendEmail(){this.loading=!0,this.step=1,this.api.Post("/PasswordResetPINs/createAndSend",{email:this.email},!1).subscribe(e=>{"notRegistered"==e.msg?(this.toast.ShowError("Usuario no registrado"),this.step=0):(this.toast.ShowSuccess("Se envio el correo correctamente"),this.step=2),this.loading=!1},e=>{this.toast.ShowError(e.err),this.loading=!1,this.step=0})}TryPIN(){this.loading=!0,this.api.Post("/PasswordResetPINs/consume",{pin:this.pin,email:this.email},!1).subscribe(e=>{"Pin incorrecto"==e.msg?(this.toast.ShowError("PIN incorrecto"),this.pin="",this.step=0,this.loading=!1):(this.toast.ShowSuccess("PIN correcto"),this.step=3,this.loading=!1)},e=>{this.toast.ShowError(e.err),this.loading=!1,this.step=0})}SetPassword(){this.api.Post("/PasswordResetPINs/resetPassword",{password:this.newPassword,email:this.email},!1).subscribe(e=>{"usuario actualizado"==e.msg?(this.toast.ShowSuccess("Contrase\xf1a asignada correctamente"),this.successUpdate=!0,this.loading=!1,this.step=0,this.passwordForgotten=!1,this.email=""):(this.toast.ShowSuccess("Sucedio un Error"),this.loading=!1,this.step=0)})}GoBack(){this.passwordForgotten=!1,this.step=0,this.loading=!1}}return e.\u0275fac=function(t){return new(t||e)(l.Y36(u.f),l.Y36(n.gz),l.Y36(d.k),l.Y36(g.sM),l.Y36(p.g),l.Y36(m._))},e.\u0275cmp=l.Xpm({type:e,selectors:[["app-register-user"]],decls:7,vars:3,consts:[[1,"full-page"],[1,"d-flex","h-100"],[1,"vertical-text-container"],[1,"vertical-text","faded-title"],["class","w-100 vertical-content",4,"ngIf"],["class","w-100 vertical-content container",4,"ngIf"],[1,"w-100","vertical-content"],[1,"row","m-0"],[1,"col-12","text-center"],["src","assets/img/project_name_medium.png","alt","Bluetopia",1,"title-img"],[1,"text-center"],[3,"ngSwitch"],["class","header-container mb-0",4,"ngSwitchCase"],["class","mb-0",4,"ngSwitchCase"],[1,"header-container","mb-0"],[1,"header-container"],[1,"title"],[1,"text"],[1,"form","d-inline-block",3,"formGroup"],[1,"input-container"],[1,"input-icon-container","text-center"],["src","assets/icons/mail.png"],["type","text","placeholder","Correo electronico","formControlName","email",1,"form-control",3,"keyup.enter"],[3,"control"],["src","assets/icons/lock.png"],["type","password","placeholder","Contrase\xf1a","formControlName","password",1,"form-control",3,"keyup.enter"],[1,"link",3,"click"],[1,"btns-container"],[1,"d-flex","justify-content-center","flex-wrap",3,"ngClass"],["class","mb-5 btn btn-primary",3,"click",4,"ngIf"],[1,"mb-5","btn","btn-success",3,"click"],[1,"mb-5","btn","btn-primary",3,"click"],[4,"ngSwitchCase"],[4,"ngSwitchDefault"],[3,"onBackClicked","onNextClicked"],[1,"title","text-success"],["src","assets/icons/user.png"],["type","text","placeholder","Nombre","formControlName","username",1,"form-control"],[1,"required-span"],["src","assets/icons/phone.png"],["type","text","maxlength","10","placeholder","Tel\xe9fono","formControlName","phone",1,"form-control"],[3,"formGroup"],["src","assets/icons/school.png"],["type","text","placeholder","Nombre de la instituci\xf3n","formControlName","name",1,"form-control"],["src","assets/icons/location.png"],["type","text","placeholder","Direcci\xf3n","formControlName","address",1,"form-control"],["src","assets/icons/user-phone.png"],["type","text","maxlength","10","placeholder","Tel\xe9fono escolar","formControlName","phone",1,"form-control"],["src","assets/icons/users-group.png"],["type","text","placeholder","Puesto","formControlName","workTitle",1,"form-control"],["type","text","placeholder","Correo","formControlName","email",1,"form-control"],["type","password","placeholder","Contrase\xf1a","formControlName","password",1,"form-control",3,"keyup","keyup.enter"],["type","password","placeholder","Confirmar contrase\xf1a","formControlName","confirmPassword",1,"form-control",3,"keyup.enter"],[1,"d-flex","justify-content-center","justify-content-md-between","flex-wrap"],[1,"mb-5","btn","btn-outline-primary",3,"click"],[1,"mb-0"],[3,"userType"],[1,"w-100","vertical-content","container"],[1,"row"],["class","col-12 text-center",4,"ngIf"],[1,"m-4","text"],[1,"form","d-inline-block"],[1,"form-group"],["type","email","id","email","name","email","required","","pattern","[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$","placeholder","ejemplo@correo.com",1,"form-control","text-center",3,"ngModel","ngModelChange"],["class","form-control-feedback color-red text-center",4,"ngIf"],[1,"d-flex","justify-content-between","row"],["type","submit",1,"btn","btn-success","col-4",3,"disabled","click"],[1,"btn","btn-secondary","col-4",3,"disabled","click"],[1,"form-control-feedback","color-red","text-center"],[1,"zmdi","zmdi-spinner","zmdi-hc-4x","zmdi-hc-spin"],["type","number","name","pin",1,"form-control",3,"ngModel","ngModelChange"],["type","password","name","newPassword",1,"form-control","text-center",3,"ngModel","ngModelChange"]],template:function(e,t){1&e&&(l.TgZ(0,"div",0),l.TgZ(1,"div",1),l.TgZ(2,"div",2),l.TgZ(3,"div",3),l._uU(4),l.qZA(),l.qZA(),l.YNc(5,_,10,4,"div",4),l.YNc(6,P,10,4,"div",5),l.qZA(),l.qZA()),2&e&&(l.xp6(4),l.hij(" ",t.userType," "),l.xp6(1),l.Q6J("ngIf",!t.passwordForgotten),l.xp6(1),l.Q6J("ngIf",t.passwordForgotten))},directives:[o.O5,o.RF,o.n9,s._Y,s.JL,s.sg,s.Fj,s.JJ,s.u,h.w,o.mk,o.ED,f,s.nD,T,s.Q7,s.c5,s.On,s.wV],styles:[".vertical-text-container[_ngcontent-%COMP%]{position:relative;height:100%;width:413px}.vertical-text[_ngcontent-%COMP%]{text-transform:uppercase;position:absolute;top:50%;left:50%;transform:translateX(-50%) translateY(-50%) rotate(-90deg)}.faded-title[_ngcontent-%COMP%]{font-size:8rem;font-weight:700;color:rgba(189,221,255,.3333333333333333)}.header-container[_ngcontent-%COMP%]{margin-bottom:58px;max-width:550px;display:inline-block}.btn[_ngcontent-%COMP%]{font-size:1.25rem;width:225px;padding:16px 0;font-weight:800}.btns-container[_ngcontent-%COMP%]{width:100%;display:inline-block}.form[_ngcontent-%COMP%]{width:100%;max-width:380px}.form[_ngcontent-%COMP%], .link[_ngcontent-%COMP%]{margin-bottom:74px}.link[_ngcontent-%COMP%]{font-size:1.25rem;font-weight:800;color:#1081fb}"]}),e})(),R=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=l.oAB({type:e}),e.\u0275inj=l.cJS({imports:[[s.u5,o.ez,s.UX,i.G]]}),e})();var G=r(5470),Q=r(193);let O=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=l.oAB({type:e}),e.\u0275inj=l.cJS({imports:[[s.u5,o.ez,Z.A0,s.UX,i.G,G.zk.forRoot(),Q.kn.forRoot()]]}),e})();const z=[{path:"",component:F}];let Y=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=l.oAB({type:e}),e.\u0275inj=l.cJS({imports:[[s.u5,o.ez,R,s.UX,O,i.G,n.Bz.forChild(z)]]}),e})()},5821:(e,t,r)=>{"use strict";r.d(t,{R:()=>n});var o=r(7368);let n=(()=>{class e{constructor(){}static GetValidatorErrorMessage(e,t){return[{name:"required",label:"Campo requerido"},{name:"invalidRFC",label:"No tiene el formato adecuado"},{name:"invalidEmailAddress",label:"Correo inv\xe1lido"},{name:"invalidPassword",label:"Las contrase\xf1as no coinciden"},{name:"minlength",label:`M\xednimo ${t.requiredLength} caracteres `},{name:"maxlength",label:`M\xe1ximo ${t.requiredLength} caracteres `},{name:"invalidNumber",label:"Solo n\xfameros enteros, o con decimal"},{name:"invalidIntegerNumber",label:"Solo n\xfameros enteros"},{name:"matchstring",label:`${t.matchStringCustomLabel?t.matchStringCustomLabel:"El texto no coincide"}`}].find(t=>t.name==e)}static matchString(e,t=null){return r=>r.value?e==r.value?null:t?{matchstring:{requiredString:e,matchStringCustomLabel:t}}:{matchstring:e}:null}static CheckOnlyIntegerNumbers(e){return(null==e?void 0:e.value)?/^[0-9]+$/.test(null==e?void 0:e.value)?0==(null==e?void 0:e.value)?{invalidIntegerNumber:!0}:null:{invalidIntegerNumber:!0}:null}static CheckOnlyNumbers(e){return(null==e?void 0:e.value)?/^[1-9]\d*\.?\d*$/.test(null==e?void 0:e.value)?0==(null==e?void 0:e.value)?{invalidNumber:!0}:null:{invalidNumber:!0}:null}static EmailValidator(e){return(null==e?void 0:e.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/))?null:{invalidEmailAddress:!0}}static RfcValidator(e){return(null==e?void 0:e.value)&&(null==e?void 0:e.value.match(/^([A-Z\xd1&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/))?null:{invalidRFC:!0}}}return e.password="",e.confirmPassword="",e.\u0275fac=function(t){return new(t||e)},e.\u0275prov=o.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()}}]);