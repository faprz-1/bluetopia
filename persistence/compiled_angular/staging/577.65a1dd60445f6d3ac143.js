(self.webpackChunktemplate_web=self.webpackChunktemplate_web||[]).push([[577],{2577:(s,e,r)=>{"use strict";r.r(e),r.d(e,{ProfileModule:()=>N});var o=r(1116),i=r(7368),n=r(3149),t=r(1392),a=r(5470),l=r(6189),d=r(1041);let u=(()=>{class s{constructor(s,e,r){this.toast=s,this.api=e,this.zone=r,this.imageChanged=new i.vpe,this.img="",this.processed=!1,this.processing=!1,this.newfile="",this.success=!1,this.user=this.api.GetUser()}openFileBrowser(s){s.preventDefault(),document.getElementById("base64File").click()}onFileChange(s){var e,r;const o=new FileReader;if((null===(e=null==s?void 0:s.target)||void 0===e?void 0:e.files)&&s.target.files.length>0){const e=null===(r=null==s?void 0:s.target)||void 0===r?void 0:r.files[0];o.onload=e=>{var r,o,i,n,t;const a=e.target.result,l=null===(o=null===(r=null==s?void 0:s.target)||void 0===r?void 0:r.files)||void 0===o?void 0:o.item(0),d={encodedFileContainer:"profileImages",name:null==l?void 0:l.name,resize:!0,base64File:btoa(a),fileExtention:"."+(null===(t=null===(n=null===(i=null==l?void 0:l.name)||void 0===i?void 0:i.split("."))||void 0===n?void 0:n.pop())||void 0===t?void 0:t.toLowerCase())};this.newfile=d,this.UpdateProfile(this.newfile)},o.readAsBinaryString(e)}}UpdateProfile(s){this.success=!1,this.processed=!1,this.processing=!0,this.api.Post(`/Usuarios/${this.user.id}/changeProfileImage`,{newImage:s},!0).subscribe(s=>{this.processing=!1,this.zone.run(()=>{this.user.profileImage=s.profileImage}),this.api.SetUser(this.user),this.processed=!0,this.success=!0,this.imageChanged.emit(s.profileImage),this.toast.ShowSuccess("Se ha actualizado la imagen de perfil")},s=>{this.processing=!1,this.processed=!0,this.success=!1,this.toast.ShowError("Error al actualizar la imagen de perfil")})}}return s.\u0275fac=function(e){return new(e||s)(i.Y36(l.k),i.Y36(t.sM),i.Y36(i.R0b))},s.\u0275cmp=i.Xpm({type:s,selectors:[["app-profile-image-editor"]],outputs:{imageChanged:"imageChanged"},decls:4,vars:0,consts:[["type","file","id","base64File","name","base64File","ngModel","","accept","image/*",1,"d-none",3,"change"],["base64File","ngModel"],["type","button",1,"btn","btn-primary",3,"click"],[1,"zmdi","zmdi-camera"]],template:function(s,e){1&s&&(i.TgZ(0,"input",0,1),i.NdJ("change",function(s){return e.onFileChange(s)}),i.qZA(),i.TgZ(2,"button",2),i.NdJ("click",function(s){return e.openFileBrowser(s)}),i._UZ(3,"i",3),i.qZA())},directives:[d.Fj,d.JJ,d.On],styles:[""]}),s})();var c=r(529);let g=(()=>{class s{constructor(s){this.api=s,this.sizes=["","avatar","thumb","small","medium","big"]}transform(s={URL:""},e=""){return s&&s.URL?(s.URL=this.GetFullUrl(s.URL,this.api),s.resize?(e=this.CheckSizeName(e),this.PrepareUrlWithSufix(s.URL,e)):s.URL):"assets/img/no-image-found.png"}GetFullUrl(s,e){return s.includes("https://")||s.includes("http://")||e&&(e.hasOwnProperty("baseURL")?s=e.baseURL+s:e.getBaseURL&&(s=e.getBaseURL()+s)),s}CheckSizeName(s){return-1===this.sizes.findIndex(e=>e===s)&&(s=""),s}PrepareUrlWithSufix(s,e){let r=s.split("/").reverse();return r[0]=`${e}`+r[0],c.N.baseURL+r.reverse().join("/")}}return s.\u0275fac=function(e){return new(e||s)(i.Y36(t.sM,16))},s.\u0275pipe=i.Yjl({name:"jarabeImage",type:s,pure:!0}),s})();function h(s,e){if(1&s&&(i.TgZ(0,"div",16),i.TgZ(1,"p"),i._uU(2," Nombre de usuario: "),i.TgZ(3,"strong"),i._uU(4),i.qZA(),i.qZA(),i.qZA()),2&s){const s=i.oxw(3);i.xp6(4),i.hij(" ",null==s.user?null:s.user.username,"")}}function m(s,e){if(1&s&&(i.TgZ(0,"div",16),i.TgZ(1,"p"),i._uU(2,"Nombre completo: "),i.TgZ(3,"strong"),i._uU(4),i.qZA(),i.qZA(),i.qZA()),2&s){const s=i.oxw(3);i.xp6(4),i.hij(" ",null==s.user?null:s.user.name,"")}}function w(s,e){if(1&s&&(i.TgZ(0,"div",16),i.TgZ(1,"p"),i._uU(2,"Correo: "),i.TgZ(3,"strong"),i._uU(4),i.qZA(),i.qZA(),i.qZA()),2&s){const s=i.oxw(3);i.xp6(4),i.hij(" ",null==s.user?null:s.user.email,"")}}function p(s,e){if(1&s){const s=i.EpF();i.TgZ(0,"div",3),i.TgZ(1,"div",9),i.TgZ(2,"div",10),i.TgZ(3,"div",11),i.TgZ(4,"app-profile-image-editor",12),i.NdJ("imageChanged",function(e){return i.CHM(s),i.oxw(2).ImageChanged(e)}),i.qZA(),i._UZ(5,"img",13),i.ALo(6,"jarabeImage"),i.qZA(),i.TgZ(7,"div",14),i.YNc(8,h,5,1,"div",15),i.YNc(9,m,5,1,"div",15),i.YNc(10,w,5,1,"div",15),i.TgZ(11,"div",16),i.TgZ(12,"button",17),i.NdJ("click",function(e){i.CHM(s);const r=i.oxw(2),o=i.MAs(2);return r.OpenModal(o,e)}),i._uU(13," Cambiar contrase\xf1a "),i.qZA(),i.qZA(),i.qZA(),i.qZA(),i.qZA(),i.TgZ(14,"div",18),i.TgZ(15,"div",3),i.TgZ(16,"div",19),i.TgZ(17,"label"),i._uU(18,"Mi n\xfamero"),i.qZA(),i.TgZ(19,"div",20),i._uU(20),i.qZA(),i.qZA(),i.TgZ(21,"div",19),i.TgZ(22,"label"),i._uU(23,"Puesto"),i.qZA(),i.TgZ(24,"div",20),i._uU(25),i.qZA(),i.qZA(),i.TgZ(26,"div",19),i.TgZ(27,"label"),i._uU(28,"Escuela"),i.qZA(),i.TgZ(29,"div",20),i._uU(30),i.qZA(),i.qZA(),i.TgZ(31,"div",19),i.TgZ(32,"label"),i._uU(33,"Tel\xe9fono de la escuela"),i.qZA(),i.TgZ(34,"div",20),i._uU(35),i.qZA(),i.qZA(),i.TgZ(36,"div",19),i.TgZ(37,"label"),i._uU(38,"Direcci\xf3n de la escuela"),i.qZA(),i.TgZ(39,"div",20),i._uU(40),i.qZA(),i.qZA(),i.qZA(),i.qZA(),i.qZA()}if(2&s){const s=i.oxw(2);i.xp6(5),i.Q6J("src",i.xi3(6,9,null==s.user?null:s.user.profileImage,"medium"),i.LSH),i.xp6(3),i.Q6J("ngIf",null==s.user?null:s.user.username),i.xp6(1),i.Q6J("ngIf",null==s.user?null:s.user.name),i.xp6(1),i.Q6J("ngIf",null==s.user?null:s.user.email),i.xp6(10),i.hij(" ",null!=s.user&&null!=s.user.data&&s.user.data.phone?null==s.user||null==s.user.data?null:s.user.data.phone:"Sin registro"," "),i.xp6(5),i.hij(" ",null!=s.user&&null!=s.user.data&&s.user.data.workTitle?null==s.user||null==s.user.data?null:s.user.data.workTitle:"Sin registro"," "),i.xp6(5),i.hij(" ",null!=s.user&&null!=s.user.school&&s.user.school.name?null==s.user||null==s.user.school?null:s.user.school.name:"Sin registro"," "),i.xp6(5),i.hij(" ",null!=s.user&&null!=s.user.school&&s.user.school.phone?null==s.user||null==s.user.school?null:s.user.school.phone:"Sin registro"," "),i.xp6(5),i.hij(" ",null!=s.user&&null!=s.user.school&&s.user.school.address?null==s.user||null==s.user.school?null:s.user.school.address:"Sin registro"," ")}}function Z(s,e){if(1&s&&(i.TgZ(0,"section",2),i.TgZ(1,"div",3),i.TgZ(2,"div",4),i.TgZ(3,"div",5),i._uU(4," Perfil "),i._UZ(5,"i",6),i.qZA(),i.qZA(),i._UZ(6,"div",7),i.qZA(),i.YNc(7,p,41,12,"div",8),i.qZA()),2&s){const s=i.oxw();i.xp6(7),i.Q6J("ngIf",null!=s.user)}}function f(s,e){1&s&&(i.TgZ(0,"div",38),i._uU(1," Ingrese su contrase\xf1a actual "),i.qZA())}function P(s,e){1&s&&(i.TgZ(0,"div",38),i._uU(1," Minimo 3 caracteres "),i.qZA())}function v(s,e){1&s&&(i.TgZ(0,"div",38),i._uU(1," Confirme su contrase\xf1a "),i.qZA())}function A(s,e){1&s&&(i.TgZ(0,"div",38),i._uU(1," Las contrase\xf1as no son identicas "),i.qZA())}function b(s,e){if(1&s){const s=i.EpF();i.TgZ(0,"button",39),i.NdJ("click",function(){return i.CHM(s),i.oxw(2).ChangeUserPassword()}),i._uU(1," Guardar "),i.qZA()}}function T(s,e){1&s&&(i.TgZ(0,"button",40),i._UZ(1,"i",41),i.qZA())}const q=function(s){return{"is-invalid":s}};function C(s,e){if(1&s){const s=i.EpF();i.TgZ(0,"div",21),i.TgZ(1,"h5",22),i._uU(2," Cambiar contrase\xf1a "),i.qZA(),i.TgZ(3,"button",23),i.NdJ("click",function(){i.CHM(s);const e=i.oxw();return e.CloseModal(),e.CleanForm()}),i.TgZ(4,"span",24),i._uU(5,"\xd7"),i.qZA(),i.qZA(),i.qZA(),i.TgZ(6,"div",25),i.TgZ(7,"div",3),i.TgZ(8,"div",26),i.TgZ(9,"div",27),i.TgZ(10,"label",28),i._uU(11," Contrase\xf1a actual: "),i.qZA(),i.TgZ(12,"input",29),i.NdJ("ngModelChange",function(e){return i.CHM(s),i.oxw().userPasswords.oldPassword=e}),i.qZA(),i.YNc(13,f,2,0,"div",30),i.qZA(),i.TgZ(14,"div",27),i.TgZ(15,"label",28),i._uU(16," Nueva contrase\xf1a: "),i.qZA(),i.TgZ(17,"input",31),i.NdJ("ngModelChange",function(e){return i.CHM(s),i.oxw().userPasswords.newPassword=e}),i.qZA(),i.YNc(18,P,2,0,"div",30),i.qZA(),i.TgZ(19,"div",27),i.TgZ(20,"label",28),i._uU(21," Confirmar contrase\xf1a: "),i.qZA(),i.TgZ(22,"input",32),i.NdJ("ngModelChange",function(e){return i.CHM(s),i.oxw().userPasswords.newPassword2=e}),i.qZA(),i.YNc(23,v,2,0,"div",30),i.YNc(24,A,2,0,"div",30),i.qZA(),i.qZA(),i.qZA(),i.qZA(),i.TgZ(25,"div",33),i.TgZ(26,"div",34),i.TgZ(27,"button",35),i.NdJ("click",function(){i.CHM(s);const e=i.oxw();return e.CloseModal(),e.CleanForm()}),i._uU(28," Cancelar "),i.qZA(),i.YNc(29,b,2,0,"button",36),i.YNc(30,T,2,0,"button",37),i.qZA(),i.qZA()}if(2&s){const s=i.oxw();i.xp6(12),i.Q6J("ngClass",i.VKq(12,q,s.isFormSended&&!s.userPasswords.oldPassword))("ngModel",s.userPasswords.oldPassword),i.xp6(1),i.Q6J("ngIf",s.isFormSended&&!s.userPasswords.oldPassword),i.xp6(4),i.Q6J("ngClass",i.VKq(14,q,s.isFormSended&&!s.IsNewPasswordValid(s.userPasswords.newPassword)))("ngModel",s.userPasswords.newPassword),i.xp6(1),i.Q6J("ngIf",s.isFormSended&&!s.IsNewPasswordValid(s.userPasswords.newPassword)),i.xp6(4),i.Q6J("ngClass",i.VKq(16,q,s.isFormSended&&(0==s.IsNewPassword2Valid(s.userPasswords.newPassword2)||"no-match"==s.IsNewPassword2Valid(s.userPasswords.newPassword2))))("ngModel",s.userPasswords.newPassword2),i.xp6(1),i.Q6J("ngIf",s.isFormSended&&0==s.IsNewPassword2Valid(s.userPasswords.newPassword2)),i.xp6(1),i.Q6J("ngIf",s.isFormSended&&"no-match"==s.IsNewPassword2Valid(s.userPasswords.newPassword2)),i.xp6(5),i.Q6J("ngIf",!s.isPromiseActive),i.xp6(1),i.Q6J("ngIf",s.isPromiseActive)}}let U=(()=>{class s{constructor(s,e,r,o){this.sharedService=s,this.api=e,this.modalService=r,this.toast=o,this.ready=!0,this.isFormSended=!1,this.isPromiseActive=!1,this.userPasswords={oldPassword:"",newPassword:"",newPassword2:""}}ngOnInit(){this.api.Get("/Usuarios/withCredentials",!0).subscribe(s=>{localStorage.setItem("user",JSON.stringify(s)),this.Reload()})}Reload(){this.ready=!1,this.user=this.api.GetUser(),this.ready=!0}OpenModal(s,e){e.stopPropagation(),this.mtModalRef=this.modalService.show(s,{backdrop:"static"})}CloseModal(){this.mtModalRef.hide()}ChangeUserPassword(){if(this.isFormSended=!0,!this.IsPasswordFormValid()||this.isPromiseActive)return;let s={oldPassword:this.userPasswords.oldPassword,newPassword:this.userPasswords.newPassword};this.isPromiseActive=!0,this.api.Post("/Usuarios/change-password",s).subscribe(s=>{this.toast.ShowSuccess("Cotrase\xf1a actualizada correctamente"),this.CloseModal(),this.CleanForm(),this.isPromiseActive=!1},s=>{this.toast.ShowError(`Error al actualizar la contrase\xf1a ${s.error.error.message}`),this.isPromiseActive=!1})}CleanForm(){for(const s in this.userPasswords)this.userPasswords.hasOwnProperty(s)&&(this.userPasswords[s]="");this.isFormSended=!1}IsNewPasswordValid(s){return!(!s||s.length<3)}IsNewPassword2Valid(s){return!!s&&(s==this.userPasswords.newPassword||"no-match")}IsPasswordFormValid(){let s=!0;return this.IsNewPassword2Valid(this.userPasswords.newPassword2)&&"no-match"!=this.IsNewPassword2Valid(this.userPasswords.newPassword2)||(s=!1),this.IsNewPasswordValid(this.userPasswords.newPassword)||(s=!1),this.userPasswords.oldPassword.length||(s=!1),s}ImageChanged(s){this.user.profileImage=s,this.sharedService.userProfileImageUpdated$.emit(s)}}return s.\u0275fac=function(e){return new(e||s)(i.Y36(n.F),i.Y36(t.sM),i.Y36(a.tT),i.Y36(l.k))},s.\u0275cmp=i.Xpm({type:s,selectors:[["app-profile"]],decls:3,vars:1,consts:[["class","content",4,"ngIf"],["changePassword",""],[1,"content"],[1,"row"],[1,"col-8"],[1,"display-4"],[1,"zmdi","zmdi-camera"],[1,"col-4","d-flex","align-items-center","justify-content-end"],["class","row",4,"ngIf"],[1,"col-lg-3","col-md-5","col-sm-6","pl-0"],[1,"card","ml-3"],[1,"card-img"],[2,"top","10px","right","15px","position","absolute",3,"imageChanged"],[1,"card-img-top",3,"src"],[1,"card-body"],["class","form-group row mb-2",4,"ngIf"],[1,"form-group","row","mb-2"],[1,"btn","btn-block","btn-primary",3,"click"],[1,"col-12","col-sm-6","col-md-7","col-lg-9"],[1,"col-12","col-md-6","data-col"],[1,"text"],[1,"modal-header"],[1,"modal-title"],["aria-label","Close",1,"close",3,"click"],["aria-hidden","true"],[1,"modal-body"],[1,"col-12"],[1,"form-group"],["for","oldPassword"],["name","oldPassword","type","password",1,"form-control",3,"ngClass","ngModel","ngModelChange"],["class","invalid",4,"ngIf"],["name","newPassword","type","password",1,"form-control",3,"ngClass","ngModel","ngModelChange"],["name","newPassword2","type","password",1,"form-control",3,"ngClass","ngModel","ngModelChange"],[1,"modal-footer"],[1,"text-right"],[1,"btn","btn-secondary","mr-3",3,"click"],["class","btn btn-primary",3,"click",4,"ngIf"],["class","btn btn-primary",4,"ngIf"],[1,"invalid"],[1,"btn","btn-primary",3,"click"],[1,"btn","btn-primary"],[1,"zmdi","zmdi-spinner","zmdi-hc-spin","zmdi-hc-lg"]],template:function(s,e){1&s&&(i.YNc(0,Z,8,1,"section",0),i.YNc(1,C,31,18,"ng-template",null,1,i.W1O)),2&s&&i.Q6J("ngIf",null!=e.user)},directives:[o.O5,u,d.Fj,o.mk,d.JJ,d.On],pipes:[g],styles:[".profile-card[_ngcontent-%COMP%]{margin-left:10vw;margin-right:auto;margin-top:5vh;width:20vw}.invalid[_ngcontent-%COMP%]{color:red}.data-col[_ngcontent-%COMP%]{margin-bottom:1rem}.data-col[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{font-size:1.25rem;font-weight:600;margin-bottom:0}.data-col[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]{text-transform:capitalize}"]}),s})();var x=r(2894),I=r(3064);let M=(()=>{class s{}return s.\u0275fac=function(e){return new(e||s)},s.\u0275mod=i.oAB({type:s}),s.\u0275inj=i.cJS({imports:[[o.ez,d.u5,d.UX]]}),s})();const _=[{path:"",component:U}];let N=(()=>{class s{}return s.\u0275fac=function(e){return new(e||s)},s.\u0275mod=i.oAB({type:s}),s.\u0275inj=i.cJS({imports:[[o.ez,x.Bz.forChild(_),a.zk.forRoot(),d.u5,d.UX,I.D,M]]}),s})()}}]);