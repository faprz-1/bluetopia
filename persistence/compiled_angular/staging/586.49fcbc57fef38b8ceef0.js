(self.webpackChunktemplate_web=self.webpackChunktemplate_web||[]).push([[586],{7586:(s,e,o)=>{"use strict";o.r(e),o.d(e,{ProfileModule:()=>U});var i=o(1116),r=o(7368),n=o(3149),t=o(1392),a=o(5470),d=o(6189),l=o(1041);let c=(()=>{class s{constructor(s,e,o){this.toast=s,this.api=e,this.zone=o,this.imageChanged=new r.vpe,this.img="",this.processed=!1,this.processing=!1,this.newfile="",this.success=!1,this.user=this.api.GetUser()}openFileBrowser(s){s.preventDefault(),document.getElementById("base64File").click()}onFileChange(s){var e,o;const i=new FileReader;if((null===(e=null==s?void 0:s.target)||void 0===e?void 0:e.files)&&s.target.files.length>0){const e=null===(o=null==s?void 0:s.target)||void 0===o?void 0:o.files[0];i.onload=e=>{var o,i,r,n,t;const a=e.target.result,d=null===(i=null===(o=null==s?void 0:s.target)||void 0===o?void 0:o.files)||void 0===i?void 0:i.item(0),l={encodedFileContainer:"profileImages",name:null==d?void 0:d.name,resize:!0,base64File:btoa(a),fileExtention:"."+(null===(t=null===(n=null===(r=null==d?void 0:d.name)||void 0===r?void 0:r.split("."))||void 0===n?void 0:n.pop())||void 0===t?void 0:t.toLowerCase())};this.newfile=l,this.UpdateProfile(this.newfile)},i.readAsBinaryString(e)}}UpdateProfile(s){this.success=!1,this.processed=!1,this.processing=!0,this.api.Post(`/Usuarios/${this.user.id}/changeProfileImage`,{newImage:s},!0).subscribe(s=>{this.processing=!1,this.zone.run(()=>{this.user.profileImage=s.profileImage}),this.api.SetUser(this.user),this.processed=!0,this.success=!0,this.imageChanged.emit(s.profileImage),this.toast.ShowSuccess("Se ha actualizado la imagen de perfil")},s=>{this.processing=!1,this.processed=!0,this.success=!1,this.toast.ShowError("Error al actualizar la imagen de perfil")})}}return s.\u0275fac=function(e){return new(e||s)(r.Y36(d.k),r.Y36(t.sM),r.Y36(r.R0b))},s.\u0275cmp=r.Xpm({type:s,selectors:[["app-profile-image-editor"]],outputs:{imageChanged:"imageChanged"},decls:4,vars:0,consts:[["type","file","id","base64File","name","base64File","ngModel","","accept","image/*",1,"d-none",3,"change"],["base64File","ngModel"],["type","button",1,"btn","btn-primary",3,"click"],[1,"zmdi","zmdi-camera"]],template:function(s,e){1&s&&(r.TgZ(0,"input",0,1),r.NdJ("change",function(s){return e.onFileChange(s)}),r.qZA(),r.TgZ(2,"button",2),r.NdJ("click",function(s){return e.openFileBrowser(s)}),r._UZ(3,"i",3),r.qZA())},directives:[l.Fj,l.JJ,l.On],styles:[""]}),s})();var u=o(237);function g(s,e){if(1&s&&(r.TgZ(0,"div",16),r.TgZ(1,"p"),r._uU(2," Nombre de usuario: "),r.TgZ(3,"strong"),r._uU(4),r.qZA(),r.qZA(),r.qZA()),2&s){const s=r.oxw(3);r.xp6(4),r.hij(" ",null==s.user?null:s.user.username,"")}}function w(s,e){if(1&s&&(r.TgZ(0,"div",16),r.TgZ(1,"p"),r._uU(2,"Nombre completo: "),r.TgZ(3,"strong"),r._uU(4),r.qZA(),r.qZA(),r.qZA()),2&s){const s=r.oxw(3);r.xp6(4),r.hij(" ",null==s.user?null:s.user.name,"")}}function m(s,e){if(1&s&&(r.TgZ(0,"div",16),r.TgZ(1,"p"),r._uU(2,"Correo: "),r.TgZ(3,"strong"),r._uU(4),r.qZA(),r.qZA(),r.qZA()),2&s){const s=r.oxw(3);r.xp6(4),r.hij(" ",null==s.user?null:s.user.email,"")}}function h(s,e){if(1&s){const s=r.EpF();r.TgZ(0,"div",3),r.TgZ(1,"div",9),r.TgZ(2,"div",10),r.TgZ(3,"div",11),r.TgZ(4,"app-profile-image-editor",12),r.NdJ("imageChanged",function(e){return r.CHM(s),r.oxw(2).ImageChanged(e)}),r.qZA(),r._UZ(5,"img",13),r.ALo(6,"jarabeImage"),r.qZA(),r.TgZ(7,"div",14),r.YNc(8,g,5,1,"div",15),r.YNc(9,w,5,1,"div",15),r.YNc(10,m,5,1,"div",15),r.TgZ(11,"div",16),r.TgZ(12,"button",17),r.NdJ("click",function(e){r.CHM(s);const o=r.oxw(2),i=r.MAs(2);return o.OpenModal(i,e)}),r._uU(13," Cambiar contrase\xf1a "),r.qZA(),r.qZA(),r.qZA(),r.qZA(),r.qZA(),r.qZA()}if(2&s){const s=r.oxw(2);r.xp6(5),r.Q6J("src",r.xi3(6,4,null==s.user?null:s.user.profileImage,"medium"),r.LSH),r.xp6(3),r.Q6J("ngIf",null==s.user?null:s.user.username),r.xp6(1),r.Q6J("ngIf",null==s.user?null:s.user.name),r.xp6(1),r.Q6J("ngIf",null==s.user?null:s.user.email)}}function p(s,e){if(1&s&&(r.TgZ(0,"section",2),r.TgZ(1,"div",3),r.TgZ(2,"div",4),r.TgZ(3,"div",5),r._uU(4," Perfil "),r._UZ(5,"i",6),r.qZA(),r.qZA(),r._UZ(6,"div",7),r.qZA(),r.YNc(7,h,14,7,"div",8),r.qZA()),2&s){const s=r.oxw();r.xp6(7),r.Q6J("ngIf",null!=s.user)}}function f(s,e){1&s&&(r.TgZ(0,"div",35),r._uU(1," Ingrese su contrase\xf1a actual "),r.qZA())}function Z(s,e){1&s&&(r.TgZ(0,"div",35),r._uU(1," Minimo 3 caracteres "),r.qZA())}function P(s,e){1&s&&(r.TgZ(0,"div",35),r._uU(1," Confirme su contrase\xf1a "),r.qZA())}function v(s,e){1&s&&(r.TgZ(0,"div",35),r._uU(1," Las contrase\xf1as no son identicas "),r.qZA())}function A(s,e){if(1&s){const s=r.EpF();r.TgZ(0,"button",36),r.NdJ("click",function(){return r.CHM(s),r.oxw(2).ChangeUserPassword()}),r._uU(1," Guardar "),r.qZA()}}function b(s,e){1&s&&(r.TgZ(0,"button",37),r._UZ(1,"i",38),r.qZA())}const C=function(s){return{"is-invalid":s}};function q(s,e){if(1&s){const s=r.EpF();r.TgZ(0,"div",18),r.TgZ(1,"h5",19),r._uU(2," Cambiar contrase\xf1a "),r.qZA(),r.TgZ(3,"button",20),r.NdJ("click",function(){r.CHM(s);const e=r.oxw();return e.CloseModal(),e.CleanForm()}),r.TgZ(4,"span",21),r._uU(5,"\xd7"),r.qZA(),r.qZA(),r.qZA(),r.TgZ(6,"div",22),r.TgZ(7,"div",3),r.TgZ(8,"div",23),r.TgZ(9,"div",24),r.TgZ(10,"label",25),r._uU(11," Contrase\xf1a actual: "),r.qZA(),r.TgZ(12,"input",26),r.NdJ("ngModelChange",function(e){return r.CHM(s),r.oxw().userPasswords.oldPassword=e}),r.qZA(),r.YNc(13,f,2,0,"div",27),r.qZA(),r.TgZ(14,"div",24),r.TgZ(15,"label",25),r._uU(16," Nueva contrase\xf1a: "),r.qZA(),r.TgZ(17,"input",28),r.NdJ("ngModelChange",function(e){return r.CHM(s),r.oxw().userPasswords.newPassword=e}),r.qZA(),r.YNc(18,Z,2,0,"div",27),r.qZA(),r.TgZ(19,"div",24),r.TgZ(20,"label",25),r._uU(21," Confirmar contrase\xf1a: "),r.qZA(),r.TgZ(22,"input",29),r.NdJ("ngModelChange",function(e){return r.CHM(s),r.oxw().userPasswords.newPassword2=e}),r.qZA(),r.YNc(23,P,2,0,"div",27),r.YNc(24,v,2,0,"div",27),r.qZA(),r.qZA(),r.qZA(),r.qZA(),r.TgZ(25,"div",30),r.TgZ(26,"div",31),r.TgZ(27,"button",32),r.NdJ("click",function(){r.CHM(s);const e=r.oxw();return e.CloseModal(),e.CleanForm()}),r._uU(28," Cancelar "),r.qZA(),r.YNc(29,A,2,0,"button",33),r.YNc(30,b,2,0,"button",34),r.qZA(),r.qZA()}if(2&s){const s=r.oxw();r.xp6(12),r.Q6J("ngClass",r.VKq(12,C,s.isFormSended&&!s.userPasswords.oldPassword))("ngModel",s.userPasswords.oldPassword),r.xp6(1),r.Q6J("ngIf",s.isFormSended&&!s.userPasswords.oldPassword),r.xp6(4),r.Q6J("ngClass",r.VKq(14,C,s.isFormSended&&!s.IsNewPasswordValid(s.userPasswords.newPassword)))("ngModel",s.userPasswords.newPassword),r.xp6(1),r.Q6J("ngIf",s.isFormSended&&!s.IsNewPasswordValid(s.userPasswords.newPassword)),r.xp6(4),r.Q6J("ngClass",r.VKq(16,C,s.isFormSended&&(0==s.IsNewPassword2Valid(s.userPasswords.newPassword2)||"no-match"==s.IsNewPassword2Valid(s.userPasswords.newPassword2))))("ngModel",s.userPasswords.newPassword2),r.xp6(1),r.Q6J("ngIf",s.isFormSended&&0==s.IsNewPassword2Valid(s.userPasswords.newPassword2)),r.xp6(1),r.Q6J("ngIf",s.isFormSended&&"no-match"==s.IsNewPassword2Valid(s.userPasswords.newPassword2)),r.xp6(5),r.Q6J("ngIf",!s.isPromiseActive),r.xp6(1),r.Q6J("ngIf",s.isPromiseActive)}}let T=(()=>{class s{constructor(s,e,o,i){this.sharedService=s,this.api=e,this.modalService=o,this.toast=i,this.ready=!0,this.isFormSended=!1,this.isPromiseActive=!1,this.userPasswords={oldPassword:"",newPassword:"",newPassword2:""}}ngOnInit(){this.api.Get("/Usuarios/withCredentials",!0).subscribe(s=>{localStorage.setItem("user",JSON.stringify(s)),this.Reload()})}Reload(){this.ready=!1,this.user=this.api.GetUser(),this.ready=!0}OpenModal(s,e){e.stopPropagation(),this.mtModalRef=this.modalService.show(s,{backdrop:"static"})}CloseModal(){this.mtModalRef.hide()}ChangeUserPassword(){if(this.isFormSended=!0,!this.IsPasswordFormValid()||this.isPromiseActive)return;let s={oldPassword:this.userPasswords.oldPassword,newPassword:this.userPasswords.newPassword};this.isPromiseActive=!0,this.api.Post("/Usuarios/change-password",s).subscribe(s=>{this.toast.ShowSuccess("Cotrase\xf1a actualizada correctamente"),this.CloseModal(),this.CleanForm(),this.isPromiseActive=!1},s=>{this.toast.ShowError(`Error al actualizar la contrase\xf1a ${s.error.error.message}`),this.isPromiseActive=!1})}CleanForm(){for(const s in this.userPasswords)this.userPasswords.hasOwnProperty(s)&&(this.userPasswords[s]="");this.isFormSended=!1}IsNewPasswordValid(s){return!(!s||s.length<3)}IsNewPassword2Valid(s){return!!s&&(s==this.userPasswords.newPassword||"no-match")}IsPasswordFormValid(){let s=!0;return this.IsNewPassword2Valid(this.userPasswords.newPassword2)&&"no-match"!=this.IsNewPassword2Valid(this.userPasswords.newPassword2)||(s=!1),this.IsNewPasswordValid(this.userPasswords.newPassword)||(s=!1),this.userPasswords.oldPassword.length||(s=!1),s}ImageChanged(s){this.user.profileImage=s,this.sharedService.userProfileImageUpdated$.emit(s)}}return s.\u0275fac=function(e){return new(e||s)(r.Y36(n.F),r.Y36(t.sM),r.Y36(a.tT),r.Y36(d.k))},s.\u0275cmp=r.Xpm({type:s,selectors:[["app-profile"]],decls:3,vars:1,consts:[["class","content",4,"ngIf"],["changePassword",""],[1,"content"],[1,"row"],[1,"col-8"],[1,"display-4"],[1,"zmdi","zmdi-camera"],[1,"col-4","d-flex","align-items-center","justify-content-end"],["class","row",4,"ngIf"],[1,"col-lg-3","col-md-5","col-sm-6","pl-0"],[1,"card","ml-3"],[1,"card-img"],[2,"top","10px","right","15px","position","absolute",3,"imageChanged"],[1,"card-img-top",3,"src"],[1,"card-body"],["class","form-group row mb-2",4,"ngIf"],[1,"form-group","row","mb-2"],[1,"btn","btn-block","btn-primary",3,"click"],[1,"modal-header"],[1,"modal-title"],["aria-label","Close",1,"close",3,"click"],["aria-hidden","true"],[1,"modal-body"],[1,"col-12"],[1,"form-group"],["for","oldPassword"],["name","oldPassword","type","password",1,"form-control",3,"ngClass","ngModel","ngModelChange"],["class","invalid",4,"ngIf"],["name","newPassword","type","password",1,"form-control",3,"ngClass","ngModel","ngModelChange"],["name","newPassword2","type","password",1,"form-control",3,"ngClass","ngModel","ngModelChange"],[1,"modal-footer"],[1,"text-right"],[1,"btn","btn-secondary","mr-3",3,"click"],["class","btn btn-primary",3,"click",4,"ngIf"],["class","btn btn-primary",4,"ngIf"],[1,"invalid"],[1,"btn","btn-primary",3,"click"],[1,"btn","btn-primary"],[1,"zmdi","zmdi-spinner","zmdi-hc-spin","zmdi-hc-lg"]],template:function(s,e){1&s&&(r.YNc(0,p,8,1,"section",0),r.YNc(1,q,31,18,"ng-template",null,1,r.W1O)),2&s&&r.Q6J("ngIf",null!=e.user)},directives:[i.O5,c,l.Fj,i.mk,l.JJ,l.On],pipes:[u.b],styles:[".profile-card[_ngcontent-%COMP%]{margin-left:10vw;margin-right:auto;margin-top:5vh;width:20vw}.invalid[_ngcontent-%COMP%]{color:red}"]}),s})();var I=o(1892),x=o(3064);let M=(()=>{class s{}return s.\u0275fac=function(e){return new(e||s)},s.\u0275mod=r.oAB({type:s}),s.\u0275inj=r.cJS({imports:[[i.ez,l.u5,l.UX]]}),s})();const N=[{path:"",component:T}];let U=(()=>{class s{}return s.\u0275fac=function(e){return new(e||s)},s.\u0275mod=r.oAB({type:s}),s.\u0275inj=r.cJS({imports:[[i.ez,I.Bz.forChild(N),a.zk.forRoot(),l.u5,l.UX,x.D,M]]}),s})()}}]);