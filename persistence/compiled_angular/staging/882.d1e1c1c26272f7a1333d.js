(self.webpackChunktemplate_web=self.webpackChunktemplate_web||[]).push([[882],{6050:(o,e,t)=>{"use strict";t.d(e,{G:()=>i});var n=t(1116),r=t(7368);let i=(()=>{class o{}return o.\u0275fac=function(e){return new(e||o)},o.\u0275mod=r.oAB({type:o}),o.\u0275inj=r.cJS({imports:[[n.ez]]}),o})()},2882:(o,e,t)=>{"use strict";t.r(e),t.d(e,{LoginModule:()=>q});var n=t(1116),r=t(9609),i=t(529),s=t(1041),a=t(7368),c=t(6189),l=t(1892),g=t(1392),d=t(2378),u=t(8118),p=t(6158);function m(o,e){1&o&&(a.TgZ(0,"div",6),a._uU(1,"Template Jarabe"),a.qZA())}function h(o,e){1&o&&(a.TgZ(0,"div",6),a._uU(1,"Template Jarabe STAGING"),a.qZA())}function f(o,e){1&o&&(a.TgZ(0,"div",6),a._uU(1,"Template Jarabe LOCAL"),a.qZA())}function Z(o,e){1&o&&(a.TgZ(0,"div",23),a._uU(1," Campo obligatorio* "),a.qZA())}function b(o,e){1&o&&(a.TgZ(0,"div",23),a._uU(1," Correo electr\xf3nico no valido"),a.qZA())}function w(o,e){if(1&o&&(a.TgZ(0,"div",21),a.YNc(1,Z,2,0,"div",22),a.YNc(2,b,2,0,"div",22),a.qZA()),2&o){a.oxw();const o=a.MAs(12);a.xp6(1),a.Q6J("ngIf",null==o.errors?null:o.errors.required),a.xp6(1),a.Q6J("ngIf",null==o.errors?null:o.errors.pattern)}}function v(o,e){if(1&o&&(a.TgZ(0,"button",24),a._uU(1,"CONTINUAR"),a.qZA()),2&o){a.oxw();const o=a.MAs(7);a.Q6J("disabled",!o.valid)}}function x(o,e){if(1&o){const o=a.EpF();a.TgZ(0,"div"),a.TgZ(1,"h4"),a._uU(2,"Ingrese el PIN"),a.qZA(),a._UZ(3,"br"),a.TgZ(4,"input",25),a.NdJ("ngModelChange",function(e){return a.CHM(o),a.oxw(2).pin=e}),a.qZA(),a._UZ(5,"br"),a._UZ(6,"br"),a.TgZ(7,"button",26),a.NdJ("click",function(){return a.CHM(o),a.oxw(2).TryPIN()}),a._uU(8,"CONTINUAR"),a.qZA(),a._UZ(9,"br"),a._UZ(10,"br"),a.qZA()}if(2&o){const o=a.oxw(2);a.xp6(4),a.Q6J("ngModel",o.pin),a.xp6(3),a.Q6J("disabled",""==o.pin)}}function P(o,e){if(1&o){const o=a.EpF();a.TgZ(0,"div"),a.TgZ(1,"h2",11),a._uU(2,"Ingresa tu nueva contrase\xf1a"),a.qZA(),a.TgZ(3,"input",27),a.NdJ("ngModelChange",function(e){return a.CHM(o),a.oxw(2).newPassword=e}),a.qZA(),a._UZ(4,"br"),a._UZ(5,"br"),a.TgZ(6,"button",26),a.NdJ("click",function(){return a.CHM(o),a.oxw(2).SetPassword()}),a._uU(7,"ACEPTAR"),a.qZA(),a.qZA()}if(2&o){const o=a.oxw(2);a.xp6(3),a.Q6J("ngModel",o.newPassword),a.xp6(3),a.Q6J("disabled",o.successUpdate)}}function A(o,e){if(1&o){const o=a.EpF();a.TgZ(0,"div",7),a.TgZ(1,"div",8),a.TgZ(2,"div",9),a.TgZ(3,"div",10),a.TgZ(4,"h2",11),a._uU(5,"Ingresa tu correo"),a.qZA(),a.TgZ(6,"form",12,13),a.NdJ("ngSubmit",function(){a.CHM(o);const e=a.MAs(7);return a.oxw().SendEmail(e.value)}),a.TgZ(8,"label",14),a._uU(9,"Correo electr\xf3nico"),a.qZA(),a.TgZ(10,"div",15),a._UZ(11,"input",16,17),a.YNc(13,w,3,2,"div",18),a.qZA(),a._UZ(14,"br"),a.YNc(15,v,2,1,"button",19),a.qZA(),a.YNc(16,x,11,2,"div",20),a.YNc(17,P,8,2,"div",20),a.qZA(),a.qZA(),a.qZA(),a.qZA()}if(2&o){const o=a.MAs(12),e=a.oxw();a.xp6(13),a.Q6J("ngIf",o.invalid&&(o.dirty||o.touched)),a.xp6(2),a.Q6J("ngIf",!e.procesandoEmail),a.xp6(1),a.Q6J("ngIf",1==e.tryPin),a.xp6(1),a.Q6J("ngIf",1==e.changuePass)}}function _(o,e){if(1&o&&(a.TgZ(0,"button",24),a._uU(1," CONTINUAR "),a.qZA()),2&o){const o=a.oxw(2);a.Q6J("disabled",!o.loginForm.valid)}}function T(o,e){if(1&o){const o=a.EpF();a.TgZ(0,"div",7),a.TgZ(1,"div",8),a.TgZ(2,"div",9),a.TgZ(3,"div",10),a.TgZ(4,"h2",11),a._uU(5,"Iniciar sesi\xf3n"),a.qZA(),a.TgZ(6,"form",28),a.NdJ("ngSubmit",function(){a.CHM(o);const e=a.oxw();return e.Login(e.loginForm.value)}),a.TgZ(7,"label",14),a._uU(8,"Correo electr\xf3nico"),a.qZA(),a.TgZ(9,"div",15),a._UZ(10,"input",29),a._UZ(11,"app-control-messages",30),a.qZA(),a.TgZ(12,"label",14),a._uU(13,"Contrase\xf1a"),a.qZA(),a.TgZ(14,"div",15),a._UZ(15,"input",31),a._UZ(16,"app-control-messages",30),a.qZA(),a._UZ(17,"br"),a.YNc(18,_,2,1,"button",19),a.qZA(),a._UZ(19,"br"),a.TgZ(20,"div"),a.TgZ(21,"a",32),a.NdJ("click",function(){return a.CHM(o),a.oxw().passwordForgotten=!0}),a._uU(22,"Olvid\xe9 mi contrase\xf1a"),a.qZA(),a.qZA(),a.qZA(),a.qZA(),a.qZA(),a.qZA()}if(2&o){const o=a.oxw();a.xp6(6),a.Q6J("formGroup",o.loginForm),a.xp6(5),a.Q6J("control",o.loginForm.get("email")),a.xp6(5),a.Q6J("control",o.loginForm.get("name")),a.xp6(2),a.Q6J("ngIf",!o.procesando)}}let I=(()=>{class o{constructor(o,e,t,n,r,a){if(this.toast=e,this.router=t,this.api=n,this.notiServ=r,this.pushService=a,this.environment=i.N,this.passwordForgotten=!1,this.procesando=!1,this.procesandoEmail=!1,this.email="",this.pin="",this.newPassword="",this.changuePass=!1,this.tryPin=!1,this.successUpdate=!1,localStorage.getItem("token")){let o=this.api.GetUser().role.name.toLowerCase();this.router.navigate([`/inicio/${o}/`])}this.loginForm=new s.cw({email:new s.NI("",s.kI.required),password:new s.NI("",s.kI.required)})}ngOnInit(){localStorage.getItem("cambio")&&localStorage.clear(),localStorage.getItem("creado")&&localStorage.clear()}Login(o){this.procesando=!0,this.api.Post("/Usuarios/login",o,!1).subscribe(o=>{localStorage.clear(),this.api.SetToken(o.id),this.api.Get("/Usuarios/withCredentials",!0).subscribe(o=>{this.procesando=!1,localStorage.setItem("user",JSON.stringify(o)),localStorage.setItem("ttl",r().add(1209600,"s").toISOString()),this.notiServ.LoadNotifications(),this.pushService.GetUserID(),this.toast.ShowSuccess("Sesi\xf3n iniciada exitosamente");let e=this.api.GetUser().role.name.toLowerCase();this.router.navigate([`/inicio/${e}/`])},o=>{this.procesando=!1,this.toast.ShowError(o.error.error.message)})},o=>{this.procesando=!1,this.toast.ShowError(o.error.error.message)})}SendEmail(o){this.email=o.emailtoRecover,this.procesandoEmail=!0,this.api.Post("/PasswordResetPINs/createAndSend",{email:this.email},!1).subscribe(o=>{"notRegistered"==o.msg?(this.toast.ShowError("Usuario no registrado"),this.procesando=!1):(this.toast.ShowSuccess("Se envio el correo correctamente"),this.tryPin=!0),this.procesandoEmail=!1},o=>{this.toast.ShowError(o.err),this.procesando=!1,this.tryPin=!1,this.procesandoEmail=!1})}TryPIN(){this.api.Post("/PasswordResetPINs/consume",{pin:this.pin,email:this.email},!1).subscribe(o=>{"Pin incorrecto"==o.msg?(this.toast.ShowError("PIN incorrecto"),this.pin=""):(this.toast.ShowSuccess("PIN correcto"),this.tryPin=!1,this.changuePass=!0)})}SetPassword(){this.api.Post("/PasswordResetPINs/resetPassword",{password:this.newPassword,email:this.email},!1).subscribe(o=>{"usuario actualizado"==o.msg?(this.toast.ShowSuccess("Contrase\xf1a asignada correctamente"),this.successUpdate=!0,this.passwordForgotten=!1,this.changuePass=!1,this.procesando=!1):this.toast.ShowSuccess("Sucedio un Error")})}}return o.\u0275fac=function(e){return new(e||o)(a.Y36(a.s_b),a.Y36(c.k),a.Y36(l.F0),a.Y36(g.sM),a.Y36(d.g),a.Y36(u._))},o.\u0275cmp=a.Xpm({type:o,selectors:[["app-login"]],decls:9,vars:5,consts:[[1,"loginBack"],[1,"row","justify-content-center","segment","title"],[1,"col-auto"],["src","assets/img/logo.png","alt","",1,"logo-img"],["class","lema",4,"ngIf"],["class","container",4,"ngIf"],[1,"lema"],[1,"container"],[1,"row"],[1,"col-12","col-lg-4"],[1,"circular","segment"],[1,"m-4"],[3,"ngSubmit"],["recoverPassword","ngForm"],[1,"colorPrincipal"],[1,"form-group"],["type","email","id","email","name","emailtoRecover","ngModel","","required","","pattern","[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$",1,"form-control","text-center"],["emailtoRecover","ngModel"],["class","alert alert-danger",4,"ngIf"],["class","btn colorPrincipal fondo","type","submit",3,"disabled",4,"ngIf"],[4,"ngIf"],[1,"alert","alert-danger"],["class","form-control-feedback text-center",4,"ngIf"],[1,"form-control-feedback","text-center"],["type","submit",1,"btn","colorPrincipal","fondo",3,"disabled"],["type","number","name","pin",3,"ngModel","ngModelChange"],[1,"btn","colorPrincipal","fondo",3,"disabled","click"],["type","password","name","newPassword",1,"form-control-feedback","text-center",3,"ngModel","ngModelChange"],[3,"formGroup","ngSubmit"],["type","email","id","email","placeholder","ejemplo@email.com","name","email","required","","pattern","[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$","formControlName","email",1,"form-control","text-center"],[3,"control"],["type","password","placeholder","Contrase\xf1a","name","password","required","","formControlName","password",1,"form-control","text-center"],[2,"color","orange",3,"click"]],template:function(o,e){1&o&&(a.TgZ(0,"div",0),a.TgZ(1,"div",1),a.TgZ(2,"div",2),a._UZ(3,"img",3),a.YNc(4,m,2,0,"div",4),a.YNc(5,h,2,0,"div",4),a.YNc(6,f,2,0,"div",4),a.qZA(),a.qZA(),a.YNc(7,A,18,4,"div",5),a.YNc(8,T,23,4,"div",5),a.qZA()),2&o&&(a.xp6(4),a.Q6J("ngIf",e.environment.production&&!e.environment.staging),a.xp6(1),a.Q6J("ngIf",!e.environment.production&&e.environment.staging),a.xp6(1),a.Q6J("ngIf",!e.environment.production&&!e.environment.staging),a.xp6(1),a.Q6J("ngIf",1==e.passwordForgotten),a.xp6(1),a.Q6J("ngIf",0==e.passwordForgotten))},directives:[n.O5,s._Y,s.JL,s.F,s.Fj,s.JJ,s.On,s.Q7,s.c5,s.wV,s.sg,s.u,p.w],styles:[".colorPrincipal[_ngcontent-%COMP%]{color:orange}.colorPrincipal.fondo[_ngcontent-%COMP%]{background-color:orange}.loader[_ngcontent-%COMP%]{border:10px solid #f3f3f3;border-top:10px orange;border-radius:50%;width:50px;height:50px;animation:spin 2s linear infinite}@keyframes spin{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}.loginBack[_ngcontent-%COMP%]{background-image:url(/assets/fondo/jarabe.jpg);background-color:orange!important;position:absolute;background-repeat:no-repeat;background-size:cover;width:100%;height:100%}.form-group[_ngcontent-%COMP%]{margin:5px auto;border-radius:10px}input[_ngcontent-%COMP%]{border-radius:10px!important}.circular.segment[_ngcontent-%COMP%]{margin-left:auto;margin-right:auto;background-color:hsla(0,0%,100%,.95)!important;display:table-cell;padding:2em;text-align:center;vertical-align:middle;border-radius:20px;width:500px;height:500px}.title.segment[_ngcontent-%COMP%]{margin-bottom:10px;padding:30px;background-color:hsla(0,0%,100%,.9)}.title[_ngcontent-%COMP%]{font-size:2em;text-align:center}.logo-img[_ngcontent-%COMP%]{height:100px}.lema[_ngcontent-%COMP%]{font-size:1em;text-align:center}.color.white[_ngcontent-%COMP%]{color:#fff}.row[_ngcontent-%COMP%]{margin:0;padding:0}"]}),o})();var S=t(6050);const U=[{path:"",component:I}];let q=(()=>{class o{}return o.\u0275fac=function(e){return new(e||o)},o.\u0275mod=a.oAB({type:o}),o.\u0275inj=a.cJS({imports:[[n.ez,s.u5,s.UX,l.Bz.forChild(U),S.G]]}),o})()}}]);