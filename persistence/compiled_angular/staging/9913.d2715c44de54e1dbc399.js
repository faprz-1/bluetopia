(self.webpackChunktemplate_web=self.webpackChunktemplate_web||[]).push([[9913],{9913:(t,e,i)=>{"use strict";i.r(e),i.d(e,{ActivityModule:()=>C});var n=i(1116),o=i(2894),l=i(4391),a=i(1041),c=i(6050),s=i(5470),r=i(5110),d=i(193),u=i(7368),g=i(1392),p=i(6189),f=i(407),v=i(2722),h=i(4792);function m(t,e){if(1&t&&(u.TgZ(0,"div",13),u._uU(1),u.qZA()),2&t){const t=u.oxw();u.xp6(1),u.hij("",t.evaluation.calification," / 100")}}function x(t,e){1&t&&(u.TgZ(0,"div",13),u._uU(1,"-- / 100"),u.qZA())}function Z(t,e){if(1&t&&(u.TgZ(0,"div",13),u._uU(1),u.qZA()),2&t){const t=u.oxw();u.xp6(1),u.Oqu(t.evaluation.comment?t.evaluation.comment:"Sin comentarios")}}function b(t,e){1&t&&(u.TgZ(0,"div",13),u._uU(1,"--"),u.qZA())}function A(t,e){if(1&t){const t=u.EpF();u.TgZ(0,"div",35),u.TgZ(1,"div",36),u._UZ(2,"img",37),u.TgZ(3,"div",38),u._uU(4),u.qZA(),u.TgZ(5,"i",39),u.NdJ("click",function(){const e=u.CHM(t).$implicit;return u.oxw().DownloadResource(e.file)}),u.qZA(),u.qZA(),u.qZA()}if(2&t){const t=e.$implicit;u.xp6(4),u.hij(" ",null==t.file?null:t.file.name," ")}}function y(t,e){1&t&&(u.TgZ(0,"div",40),u._uU(1," Da click en subir y selecciona tu trabajo "),u.qZA())}function T(t,e){if(1&t){const t=u.EpF();u.TgZ(0,"i",43),u.NdJ("click",function(){u.CHM(t);const e=u.oxw().$implicit;return u.oxw().DeleteFile(e)}),u.qZA()}}function q(t,e){if(1&t){const t=u.EpF();u.TgZ(0,"div",41),u.TgZ(1,"div",36),u._UZ(2,"img",37),u.TgZ(3,"div",38),u._uU(4),u.qZA(),u.TgZ(5,"div",23),u.TgZ(6,"i",39),u.NdJ("click",function(){const e=u.CHM(t).$implicit;return u.oxw().DownloadResource(e)}),u.qZA(),u.YNc(7,T,1,0,"i",42),u.qZA(),u.qZA(),u.qZA()}if(2&t){const t=e.$implicit,i=u.oxw();u.xp6(4),u.hij(" ",t.name," "),u.xp6(3),u.Q6J("ngIf",!(null!=i.evaluation&&i.evaluation.isDone))}}function w(t,e){if(1&t){const t=u.EpF();u.TgZ(0,"button",44),u.NdJ("click",function(){return u.CHM(t),u.oxw(),u.MAs(61).click()}),u._uU(1," Subir mi trabajo "),u.qZA()}}function _(t,e){1&t&&(u.TgZ(0,"div",3),u.TgZ(1,"div",45),u.TgZ(2,"div",46),u.TgZ(3,"div",47),u._uU(4,"Esta actividad no requiere que entregues un archivo"),u.qZA(),u.qZA(),u.qZA(),u.qZA())}function M(t,e){if(1&t&&(u.TgZ(0,"span"),u._uU(1),u.qZA()),2&t){const t=u.oxw();u.xp6(1),u.hij(" ",null!=t.evaluation&&t.evaluation.isDone?"Deshacer entrega":"Marcar como completado"," ")}}function k(t,e){1&t&&(u.TgZ(0,"span"),u._UZ(1,"i",48),u.qZA())}let P=(()=>{class t{constructor(t,e,i,n,o){this.api=t,this.toast=e,this.activatedRoute=i,this.nav=n,this.downloadService=o,this.eventId=null,this.event=null,this.evaluation=null,this.studentFiles=[],this.loading={updating:!1},this.crumbs=[{name:"Mis actividades",route:null},{name:"Actividad 1",route:null}]}ngOnInit(){this.GetParams()}GetParams(){this.activatedRoute.params.subscribe(t=>{this.eventId=t.activityId,this.GetEvent()})}GetEvent(){this.api.Get(`/Events/${this.eventId}`).subscribe(t=>{this.event=t,this.GetStudentFiles()},t=>{console.error("Error getting parcial product",t)})}GetStudentFiles(){const t=this.api.GetUser();this.api.Get(`/Evaluations/OfStudent/${t.student.id}/OfProduct/${this.event.parcialProduct?this.event.parcialProduct.id:this.event.id}`).subscribe(t=>{this.evaluation=t,this.studentFiles=t.studentFiles||[]},t=>{console.error("Error getting student evaluation",t)})}GetEventDetails(){var t,e,i,n,o,l,a,c,s,r,d,u,g;let p={icon:"activity.png",type:"Actividad",title:"T\xedtulo",instructions:"Instrucciones"};return(null===(t=this.event)||void 0===t?void 0:t.isFinal)?(p.icon="event.png",p.type="Evento de cierre",p.title=null===(e=this.event)||void 0===e?void 0:e.name,p.instructions=null===(i=this.event)||void 0===i?void 0:i.instructions):(null===(o=null===(n=this.event)||void 0===n?void 0:n.parcialProduct)||void 0===o?void 0:o.isFinal)?(p.icon="final-product.png",p.type="Producto final",p.title=null===(l=this.event)||void 0===l?void 0:l.parcialProduct.name,p.instructions=null===(a=this.event)||void 0===a?void 0:a.parcialProduct.instructions):(null===(s=null===(c=this.event)||void 0===c?void 0:c.parcialProduct)||void 0===s?void 0:s.isActivity)?(p.icon="activity.png",p.type="Actividad",p.title=null===(r=this.event)||void 0===r?void 0:r.parcialProduct.name,p.instructions=null===(d=this.event)||void 0===d?void 0:d.parcialProduct.instructions):(p.icon="parcial-product.png",p.type="Producto parcial",p.title=null===(u=this.event)||void 0===u?void 0:u.parcialProduct.name,p.instructions=null===(g=this.event)||void 0===g?void 0:g.parcialProduct.instructions),p}DownloadResource(t){this.downloadService.Download(t.URL,null==t?void 0:t.name)}OnFileSelected(t){let e=Array.from(t.target.files);e.length&&e.forEach(t=>{const e=new FileReader;e.onload=e=>{var i;let n={encodedFileContainer:"studentActivitiesFiles",base64File:btoa(e.target.result),name:t.name,resize:!1,fileExtention:"."+(null===(i=t.name.split(".").pop())||void 0===i?void 0:i.toLowerCase())};this.UploadFile(n)},e.readAsBinaryString(t)})}UploadFile(t){this.api.Patch(`/Evaluations/${this.evaluation.id}/UploadFile`,{file:t}).subscribe(t=>{this.GetStudentFiles()},t=>{console.error("Error getting student evaluation",t)})}DeleteFile(t){this.api.Delete(`/Evaluations/${this.evaluation.id}/StudentFile/${t.id}`).subscribe(t=>{this.GetStudentFiles()})}ToggleMarkAsDone(){this.loading.updating=!0,this.api.Patch(`/Evaluations/${this.evaluation.id}/ToggleIsDone`,{}).subscribe(t=>{this.evaluation.isDone=t.isDone,this.loading.updating=!1},t=>{this.loading.updating=!1})}}return t.\u0275fac=function(e){return new(e||t)(u.Y36(g.sM),u.Y36(p.k),u.Y36(o.gz),u.Y36(f.f),u.Y36(v.p))},t.\u0275cmp=u.Xpm({type:t,selectors:[["app-activity"]],decls:67,vars:20,consts:[[1,"content"],[1,"d-flex","align-items-center","justify-content-between","mb-5"],["theme","dark-blue",3,"crumbs","onGoBack"],[1,"row"],[1,"col-12","col-md-6","col-lg-4","align-self-stretch","mb-4"],[1,"card-container","position-relative"],["src","assets/icons/heart_plus.png",1,"absolute-top-right","clickeable"],[1,"d-flex","w-100","align-items-center","justify-content-start","gap-2"],[3,"src"],[1,"sub-title-activity"],[1,"background-activity"],[1,"d-flex","flex-column","align-items-start","gap-2"],[1,"text-activity"],[1,"subtext-activity"],[1,"text"],["class","subtext-activity",4,"ngIf"],[1,"card-container"],[1,"d-flex","align-items-start","gap-3"],["src","assets/icons/books.png ","alt","back-arrow ",1,"icon-padding"],[1,"sub-titles"],[1,"d-flex","flex-column","justify-content-center","align-items-center","gap-3"],["class","file-card align-self-stretch",4,"ngFor","ngForOf"],[1,"card-container","justify-content-between"],[1,"d-flex","align-items-center","gap-2"],["src","assets/icons/bullet-point.png ","alt","back-arrow ",1,"bullet-point"],[1,"d-flex","flex-column","align-self-stretch","gap-3","p-3","file-input-box"],["class","text-center",4,"ngIf"],["class","file-card",4,"ngFor","ngForOf"],["class","btn btn-medium btn-outline-purple",3,"click",4,"ngIf"],["accept",".pdf","multiple","","type","file",1,"d-none",3,"change"],["fileInput",""],["class","row",4,"ngIf"],[1,"d-flex","flex-column","align-self-stretch","align-items-center","justify-content-center","gap-4"],[1,"btn","btn-outline-purple","btn-block",3,"click"],[4,"ngIf"],[1,"file-card","align-self-stretch"],[1,"d-flex","align-items-center","justify-content-between","gap-2"],["src","assets/icons/pdf-icon.png"],[1,"file-name"],[1,"zmdi","zmdi-download","zmdi-hc-lg","text-white","clickeable",3,"click"],[1,"text-center"],[1,"file-card"],["class","zmdi zmdi-close-circle-o zmdi-hc-lg text-white clickeable",3,"click",4,"ngIf"],[1,"zmdi","zmdi-close-circle-o","zmdi-hc-lg","text-white","clickeable",3,"click"],[1,"btn","btn-medium","btn-outline-purple",3,"click"],[1,"col-12"],[1,"not-file"],[1,"not-file-text"],[1,"zmdi","zmdi-spinner","zmdi-hc-lg","zmdi-hc-spin"]],template:function(t,e){1&t&&(u.TgZ(0,"div",0),u.TgZ(1,"div",1),u.TgZ(2,"app-breadcrumb",2),u.NdJ("onGoBack",function(){return e.nav.GoBack()}),u.qZA(),u.qZA(),u.TgZ(3,"div",3),u.TgZ(4,"div",4),u.TgZ(5,"div",5),u._UZ(6,"img",6),u.TgZ(7,"div",7),u._UZ(8,"img",8),u.TgZ(9,"div",9),u._uU(10),u.qZA(),u.qZA(),u.TgZ(11,"div",10),u.TgZ(12,"div",11),u.TgZ(13,"div",12),u._uU(14,"Fecha de entrega"),u.qZA(),u.TgZ(15,"div",13),u._uU(16),u.ALo(17,"date"),u.qZA(),u.qZA(),u.qZA(),u.TgZ(18,"div",10),u.TgZ(19,"div",11),u.TgZ(20,"div",12),u._uU(21,"Titulo"),u.qZA(),u.TgZ(22,"div",13),u._uU(23),u.qZA(),u.qZA(),u.qZA(),u.TgZ(24,"div",10),u.TgZ(25,"div",11),u.TgZ(26,"div",12),u._uU(27,"Instrucciones"),u.qZA(),u.TgZ(28,"div",14),u._uU(29),u.qZA(),u.qZA(),u.qZA(),u.TgZ(30,"div",10),u.TgZ(31,"div",11),u.TgZ(32,"div",12),u._uU(33,"Calificaci\xf3n"),u.qZA(),u.YNc(34,m,2,1,"div",15),u.YNc(35,x,2,0,"div",15),u.qZA(),u.qZA(),u.TgZ(36,"div",10),u.TgZ(37,"div",11),u.TgZ(38,"div",12),u._uU(39,"Comentarios"),u.qZA(),u.YNc(40,Z,2,1,"div",15),u.YNc(41,b,2,0,"div",15),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.TgZ(42,"div",4),u.TgZ(43,"div",16),u.TgZ(44,"div",17),u._UZ(45,"img",18),u.TgZ(46,"div",19),u._uU(47,"Recursos de la biblioteca que el profesor te recomienda ver para hacer la actividad"),u.qZA(),u.qZA(),u.TgZ(48,"div",20),u.YNc(49,A,6,1,"div",21),u.qZA(),u.qZA(),u.qZA(),u.TgZ(50,"div",4),u.TgZ(51,"div",22),u.TgZ(52,"div",23),u._UZ(53,"img",24),u.TgZ(54,"div",19),u._uU(55,"Subir mi actividad resuelta"),u.qZA(),u.qZA(),u.TgZ(56,"div",25),u.YNc(57,y,2,0,"div",26),u.YNc(58,q,8,2,"div",27),u.YNc(59,w,2,0,"button",28),u.TgZ(60,"input",29,30),u.NdJ("change",function(t){return e.OnFileSelected(t)}),u.qZA(),u.qZA(),u.YNc(62,_,5,0,"div",31),u.TgZ(63,"div",32),u.TgZ(64,"button",33),u.NdJ("click",function(){return e.ToggleMarkAsDone()}),u.YNc(65,M,2,1,"span",34),u.YNc(66,k,2,0,"span",34),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.qZA()),2&t&&(u.xp6(2),u.Q6J("crumbs",e.crumbs),u.xp6(6),u.MGl("src","assets/icons/calendar-event-types/",e.GetEventDetails().icon,"",u.LSH),u.xp6(2),u.Oqu(e.GetEventDetails().type),u.xp6(6),u.Oqu(u.xi3(17,17,null==e.event?null:e.event.date,"dd/MM/yyyy")),u.xp6(7),u.Oqu(e.GetEventDetails().title),u.xp6(6),u.Oqu(e.GetEventDetails().instructions),u.xp6(5),u.Q6J("ngIf",null==e.evaluation?null:e.evaluation.hasBeenEvaluated),u.xp6(1),u.Q6J("ngIf",!(null!=e.evaluation&&e.evaluation.hasBeenEvaluated)),u.xp6(5),u.Q6J("ngIf",null==e.evaluation?null:e.evaluation.hasBeenEvaluated),u.xp6(1),u.Q6J("ngIf",!(null!=e.evaluation&&e.evaluation.hasBeenEvaluated)),u.xp6(8),u.Q6J("ngForOf",null==e.event||null==e.event.parcialProduct?null:e.event.parcialProduct.resources),u.xp6(8),u.Q6J("ngIf",!(null!=e.studentFiles&&e.studentFiles.length)),u.xp6(1),u.Q6J("ngForOf",e.studentFiles),u.xp6(1),u.Q6J("ngIf",!(null!=e.evaluation&&e.evaluation.isDone)),u.xp6(3),u.Q6J("ngIf",!1),u.xp6(3),u.Q6J("ngIf",!e.loading.updating),u.xp6(1),u.Q6J("ngIf",e.loading.updating))},directives:[h.L,n.O5,n.sg],pipes:[n.uU],styles:[".card-container[_ngcontent-%COMP%]{width:100%;height:100%;display:flex;padding:24px;flex-direction:column;align-items:flex-start;grid-gap:24px;gap:24px;border-radius:24px;background:#f7fbff}.bullet-point[_ngcontent-%COMP%]{width:24px;height:24px}.sub-titles[_ngcontent-%COMP%]{color:var(--Gray-1,#3d5e81);font-family:Mulish;font-size:16px;font-style:normal;font-weight:700;line-height:normal;margin-top:1pt!important;margin-left:2pt!important}.not-file[_ngcontent-%COMP%]{display:flex;height:86px;padding:8px 16px;flex-direction:column;justify-content:center;align-items:center;grid-gap:8px;gap:8px;align-self:stretch;border-radius:6px;background:#e9eff5}.not-file-text[_ngcontent-%COMP%]{color:#3d5e81;text-align:center;font-family:Mulish;font-size:14px;font-style:normal;font-weight:500;line-height:normal;width:100%}.check-complete-button[_ngcontent-%COMP%]{display:flex;padding:8px 16px;justify-content:center;align-items:center;grid-gap:10px;gap:10px;border-radius:500px;border:2px solid #8128db;margin-left:130pt;margin-right:80pt}.check-complete-text[_ngcontent-%COMP%]{color:#8128db;text-align:center;font-family:Mulish;font-size:16px;font-style:normal;font-weight:800;line-height:normal;letter-spacing:.8px}.file-card[_ngcontent-%COMP%]{max-width:100%;padding:10px;grid-gap:10px;gap:10px;border-radius:12px;background:#9bc478}.file-name[_ngcontent-%COMP%]{flex-grow:1;color:var(--d-9-d-9-d-9,#fff);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-family:Mulish;font-size:16px;font-weight:700}.padding[_ngcontent-%COMP%]{margin-top:6pt}.icon-padding[_ngcontent-%COMP%]{margin-top:8pt!important;margin-left:9pt!important}.background[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:flex-start;align-content:flex-start;grid-gap:48px;gap:48px;align-self:stretch;flex-wrap:wrap}.sub-title-activity[_ngcontent-%COMP%]{font-size:16px}.sub-title-activity[_ngcontent-%COMP%], .text-activity[_ngcontent-%COMP%]{color:var(--Gray-1,#3d5e81);font-family:Mulish;font-style:normal;font-weight:700;line-height:normal}.text-activity[_ngcontent-%COMP%]{font-size:14px}.subtext-activity[_ngcontent-%COMP%]{color:#1081fb;font-size:14px}.subtext-activity[_ngcontent-%COMP%], .text[_ngcontent-%COMP%]{font-family:Mulish;font-style:normal;font-weight:500;line-height:normal}.text[_ngcontent-%COMP%]{color:var(--Gray-1,#3d5e81);font-size:16px}.back-arrow[_ngcontent-%COMP%]{display:flex;padding:28px;margin-bottom:25pt;margin-left:25pt;margin-top:5pt;align-items:center;grid-gap:10px;gap:10px;align-self:stretch}.back-text[_ngcontent-%COMP%]{color:var(--Blue-dark,#2369b5);font-family:Mulish;font-size:20px;font-style:normal;font-weight:700;line-height:normal}.send[_ngcontent-%COMP%]{display:flex;padding:8px 16px;justify-content:center;align-items:center;grid-gap:10px;gap:10px;border-radius:500px;background:#d9dcde;margin-top:10pt;margin-left:180pt;margin-right:80pt}.send-text[_ngcontent-%COMP%]{color:#fff;text-align:center;font-family:Mulish;font-size:24px;font-style:normal;font-weight:800;line-height:normal;letter-spacing:1.2px}.absolute-top-right[_ngcontent-%COMP%]{position:absolute;top:10px;right:10px}.file-input-box[_ngcontent-%COMP%]{color:#3d5e81;font-family:Mulish;font-size:16px;font-style:normal;font-weight:500;line-height:normal;border-radius:6px;border:2px dashed #8128db;background:#e9eff5;box-shadow:4px 4px 6px 0 rgba(0,0,0,.17)}"]}),t})();var O=i(5709);const U=[{path:"",component:P}];let C=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=u.oAB({type:t}),t.\u0275inj=u.cJS({imports:[[a.u5,n.ez,l.A0,O.w,a.UX,c.G,s.zk.forRoot(),d.kn.forRoot(),r.N,o.Bz.forChild(U)]]}),t})()},2722:(t,e,i)=>{"use strict";i.d(e,{p:()=>a});var n=i(7368),o=i(1392),l=i(2693);let a=(()=>{class t{constructor(t,e){this.api=t,this.http=e}GetNormalByHTTP(t){return this.http.get(t,{responseType:"blob"})}GetByHTTP(t){return this.http.get(this.api.GetBaseURL()+t,{responseType:"blob"})}Download(t,e=""){this.GetByHTTP(t).subscribe(t=>{const i=document.createElement("a"),n=URL.createObjectURL(t);i.setAttribute("href",n),i.setAttribute("download",e),i.click(),i.remove()})}DownloadWithoutApi(t,e=""){this.GetNormalByHTTP(t).subscribe(t=>{const i=document.createElement("a"),n=URL.createObjectURL(t);i.setAttribute("href",n),i.setAttribute("download",e),i.click(),i.remove()})}}return t.\u0275fac=function(e){return new(e||t)(n.LFG(o.sM),n.LFG(l.eN))},t.\u0275prov=n.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()}}]);