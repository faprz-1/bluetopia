(self.webpackChunktemplate_web=self.webpackChunktemplate_web||[]).push([[572],{572:(t,e,n)=>{"use strict";n.r(e),n.d(e,{CreateActivityModule:()=>q});var i=n(1116),o=n(2894),r=n(4391),a=n(1041),c=n(6050),s=n(5470),l=n(5110),d=n(193),g=n(9355),f=n(529),m=n(7368),u=n(1392),p=n(407),v=n(6189),Z=n(6211);function h(t,e){1&t&&(m.TgZ(0,"div",32),m._UZ(1,"img",33),m._UZ(2,"img",34),m._UZ(3,"img",35),m.qZA())}function x(t,e){if(1&t&&(m.TgZ(0,"div",38),m._UZ(1,"i",39),m._uU(2),m.qZA()),2&t){const t=e.$implicit;m.xp6(2),m.hij(" ",t.name," ")}}function _(t,e){if(1&t&&(m.TgZ(0,"div",36),m.YNc(1,x,3,1,"div",37),m.qZA()),2&t){const t=m.oxw();m.xp6(1),m.Q6J("ngForOf",t.GetFiles("new"))}}function y(t,e){1&t&&(m.TgZ(0,"div",32),m._UZ(1,"img",40),m._UZ(2,"img",41),m._UZ(3,"img",42),m.qZA())}function b(t,e){if(1&t&&(m.TgZ(0,"div",38),m._UZ(1,"i",39),m._uU(2),m.qZA()),2&t){const t=e.$implicit;m.xp6(2),m.hij(" ",t.name," ")}}function w(t,e){if(1&t&&(m.TgZ(0,"div",36),m.YNc(1,b,3,1,"div",37),m.qZA()),2&t){const t=m.oxw();m.xp6(1),m.Q6J("ngForOf",t.GetFiles("old"))}}function C(t,e){1&t&&(m.TgZ(0,"span"),m._uU(1,"Continuar"),m.qZA())}function A(t,e){1&t&&(m.TgZ(0,"span"),m._UZ(1,"i",43),m.qZA())}const M=function(){return{adaptivePosition:!0,containerClass:"theme-dark-blue"}},O=[{path:"",component:(()=>{class t{constructor(t,e,n,i){this.api=t,this.nav=e,this.activatedRoute=n,this.toast=i,this.activities=[],this.loading=!1,this.activityForm=new a.cw({name:new a.NI(null,[a.kI.required]),instructions:new a.NI(null,[a.kI.required]),date:new a.NI(null,[a.kI.required]),strategyId:new a.NI(null,[a.kI.required]),resources:new a.NI([],[]),maxCalification:new a.NI([],[a.kI.required])})}get formatedDate(){return this.date?g(this.date).format("DD/MM/YY"):""}ngOnInit(){this.GetParams()}GetParams(){this.activatedRoute.params.subscribe(t=>{var e,n;this.strategyId=t.strategyId,this.date=t.date,null===(e=this.activityForm.get("date"))||void 0===e||e.setValue(new Date(g(this.date).toISOString())),null===(n=this.activityForm.get("strategyId"))||void 0===n||n.setValue(this.strategyId)})}GoBack(){this.nav.GoToUserRoute(`mis-estrategias/${this.strategyId}/calendario/${this.date}`)}OnFileSelected(t){Array.from(t.target.files).forEach(t=>{const e=new FileReader;e.onload=e=>{var n,i;let o={encodedFileContainer:"resources",base64File:btoa(e.target.result),name:t.name,resize:!1,fileExtention:"."+(null===(n=t.name.split(".").pop())||void 0===n?void 0:n.toLowerCase())};null===(i=this.activityForm.get("resources"))||void 0===i||i.value.push(o)},e.readAsBinaryString(t)})}OnLibraryFilesSelected(t){var e,n;null===(e=this.activityForm.get("resources"))||void 0===e||e.setValue(null===(n=this.activityForm.get("resources"))||void 0===n?void 0:n.value.concat(t))}SaveActivity(){if(this.activityForm.invalid)return this.toast.ShowWarning("Favor de llenar todos los campos"),void this.activityForm.markAllAsTouched();this.loading=!0;let t=Object.assign(Object.assign({},this.activityForm.value),{date:g(this.activityForm.value.date).tz(f.N.timeZone).toISOString(),strategyId:this.strategyId,isActivity:!0});this.api.Post("/ParcialProducts/activity",t).subscribe(t=>{this.loading=!1,this.toast.ShowSuccess("Evento creado correctamente"),this.GoBack()},t=>{console.error("Error creating event",t),this.loading=!1})}GetFiles(t){var e,n;switch(t){case"new":return null===(e=this.activityForm.get("resources"))||void 0===e?void 0:e.value.filter(t=>!t.id);case"old":return null===(n=this.activityForm.get("resources"))||void 0===n?void 0:n.value.filter(t=>!!t.id);default:return[]}}}return t.\u0275fac=function(e){return new(e||t)(m.Y36(u.sM),m.Y36(p.f),m.Y36(o.gz),m.Y36(v.k))},t.\u0275cmp=m.Xpm({type:t,selectors:[["app-create-activity"]],decls:65,vars:10,consts:[[1,"content"],[1,"row-header"],[1,"title"],[1,"d-flex","justify-content-between","align-items-center","mb-4"],[1,"back-section"],["src","assets/icons/back-arrow.png","alt","back-arrow",1,"back-icon","clickeable",3,"click"],[1,"event-date"],[1,"form-container",3,"formGroup"],[1,"form-row"],[1,"instruction-number"],[1,"form-col"],[1,"form-section-title"],[1,"input-container","with-border-thin"],["type","text","placeholder","T\xedtulo","formControlName","name",1,"form-control","no-icon"],[1,"input-container"],["formControlName","instructions","placeholder","Instrucciones de la actividad","rows","6",1,"form-control","with-border-thin"],["type","number","placeholder","Calificaci\xf3n m\xe1xima","formControlName","maxCalification",1,"form-control","no-icon"],["type","text","formControlName","date","placeholder","Fecha","bsDatepicker","",1,"form-control","no-icon","with-border",3,"bsConfig"],["parcialProductDatePicker","bsDatepicker"],[1,"flex-files-container"],[1,"flex-files"],["class","flex-icons",4,"ngIf"],["class","flex-resources",4,"ngIf"],["type","file","multiple","",1,"d-none",3,"change"],["fileInput",""],[1,"btn","btn-success","btn-block",3,"click"],[1,"flex-files","mr-0"],[1,"d-flex","justify-content-end","my-4"],[1,"btn","btn-primary","btn-bigger",3,"click"],[4,"ngIf"],[3,"onFilesSelectd"],["libraryModal",""],[1,"flex-icons"],["src","assets/icons/video-recorder.png","alt","video"],["src","assets/icons/gallery.png","alt","video"],["src","assets/icons/book-closed-green.png","alt","video"],[1,"flex-resources"],["class","resource",4,"ngFor","ngForOf"],[1,"resource"],[1,"zmdi","zmdi-file","zmdi-hc-2x","text-primary","mr-3"],["src","assets/icons/library.png","alt","video"],["src","assets/icons/movie.png","alt","video"],["src","assets/icons/microscope.png","alt","video"],[1,"zmdi","zmdi-spinner","zmdi-hc-lg","zmdi-hc-spin"]],template:function(t,e){if(1&t){const t=m.EpF();m.TgZ(0,"div",0),m.TgZ(1,"div",1),m._UZ(2,"div"),m.TgZ(3,"div",2),m._uU(4," Calendario "),m.qZA(),m._UZ(5,"div"),m.qZA(),m.TgZ(6,"div",3),m.TgZ(7,"div",4),m.TgZ(8,"img",5),m.NdJ("click",function(){return e.GoBack()}),m.qZA(),m.qZA(),m.TgZ(9,"div",6),m._uU(10),m.qZA(),m._UZ(11,"div"),m.qZA(),m.TgZ(12,"form",7),m.TgZ(13,"div",8),m.TgZ(14,"span",9),m._uU(15,"1"),m.qZA(),m.TgZ(16,"div",10),m.TgZ(17,"div",11),m._uU(18," Escribe un nombre para tu actividad "),m.qZA(),m.TgZ(19,"div",12),m._UZ(20,"input",13),m.qZA(),m.qZA(),m.qZA(),m.TgZ(21,"div",8),m.TgZ(22,"span",9),m._uU(23,"2"),m.qZA(),m.TgZ(24,"div",10),m.TgZ(25,"div",11),m._uU(26," Escribe las instrucciones "),m.qZA(),m.TgZ(27,"div",14),m._UZ(28,"textarea",15),m.qZA(),m.qZA(),m.qZA(),m.TgZ(29,"div",8),m.TgZ(30,"span",9),m._uU(31,"3"),m.qZA(),m.TgZ(32,"div",10),m.TgZ(33,"div",11),m._uU(34," Escribe la calificaci\xf3n m\xe1xima "),m.qZA(),m.TgZ(35,"div",12),m._UZ(36,"input",16),m.qZA(),m.qZA(),m.qZA(),m.TgZ(37,"div",8),m.TgZ(38,"span",9),m._uU(39,"4"),m.qZA(),m.TgZ(40,"div",10),m.TgZ(41,"div",11),m._uU(42," Selecciona la fecha "),m.qZA(),m.TgZ(43,"div",14),m._UZ(44,"input",17,18),m.qZA(),m.qZA(),m.qZA(),m.TgZ(46,"div",19),m.TgZ(47,"div",20),m.YNc(48,h,4,0,"div",21),m.YNc(49,_,2,1,"div",22),m.TgZ(50,"input",23,24),m.NdJ("change",function(t){return e.OnFileSelected(t)}),m.qZA(),m.TgZ(52,"button",25),m.NdJ("click",function(){return m.CHM(t),m.MAs(51).click()}),m._uU(53," Adjuntar alg\xfan recurso "),m.qZA(),m.qZA(),m.TgZ(54,"div",26),m.YNc(55,y,4,0,"div",21),m.YNc(56,w,2,1,"div",22),m.TgZ(57,"button",25),m.NdJ("click",function(){return m.CHM(t),m.MAs(64).OpenModal()}),m._uU(58," Adjuntar de la biblioteca "),m.qZA(),m.qZA(),m.qZA(),m.qZA(),m.TgZ(59,"div",27),m.TgZ(60,"button",28),m.NdJ("click",function(){return e.SaveActivity()}),m.YNc(61,C,2,0,"span",29),m.YNc(62,A,2,0,"span",29),m.qZA(),m.qZA(),m.qZA(),m.TgZ(63,"app-library-file-selector-modal",30,31),m.NdJ("onFilesSelectd",function(t){return e.OnLibraryFilesSelected(t)}),m.qZA()}2&t&&(m.xp6(10),m.hij(" ",e.formatedDate," "),m.xp6(2),m.Q6J("formGroup",e.activityForm),m.xp6(32),m.Q6J("bsConfig",m.DdM(9,M)),m.xp6(4),m.Q6J("ngIf",!e.GetFiles("new").length),m.xp6(1),m.Q6J("ngIf",!!e.GetFiles("new").length),m.xp6(6),m.Q6J("ngIf",!e.GetFiles("old").length),m.xp6(1),m.Q6J("ngIf",!!e.GetFiles("old").length),m.xp6(5),m.Q6J("ngIf",!e.loading),m.xp6(1),m.Q6J("ngIf",e.loading))},directives:[a._Y,a.JL,a.sg,a.Fj,a.JJ,a.u,a.wV,d.Y5,d.Np,i.O5,Z.p,i.sg],styles:[".title[_ngcontent-%COMP%]{color:#26d7a4}.subtitle[_ngcontent-%COMP%]{font-size:1.5rem;font-weight:500;color:#587594;margin-bottom:.75rem}.event-date[_ngcontent-%COMP%]{width:155px;height:40px;flex-direction:column;justify-content:center;grid-gap:10px;gap:10px;flex-shrink:0;border-radius:6px 6px 0 0;background:var(--green-1,#26d7a4);color:#fff;font-family:Mulish;font-size:28px;font-style:normal;font-weight:700;line-height:normal}.event-date[_ngcontent-%COMP%], .flex-row[_ngcontent-%COMP%]{display:flex;align-items:center}.flex-row[_ngcontent-%COMP%]{justify-content:space-between;margin-bottom:.75rem}.flex-row[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{padding-left:1.5rem!important}.flex-files-container[_ngcontent-%COMP%]{display:flex}.flex-files[_ngcontent-%COMP%]{flex-direction:column;justify-content:center;width:335px;margin:0 3rem 3rem 0}.flex-files[_ngcontent-%COMP%], .flex-icons[_ngcontent-%COMP%]{display:flex;align-items:center}.flex-icons[_ngcontent-%COMP%]{justify-content:space-around;height:100%}.flex-icons[_ngcontent-%COMP%], .flex-resources[_ngcontent-%COMP%]{width:100%;margin-bottom:1.25rem}.flex-resources[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;justify-content:center}.flex-resources[_ngcontent-%COMP%]   .resource[_ngcontent-%COMP%]{display:flex;align-items:center;margin-bottom:.4rem}.btn-bigger[_ngcontent-%COMP%]{font-size:1.25rem;font-weight:800;padding:1rem 8rem}@media (min-width:0px) and (max-width:925px){.flex-files-container[_ngcontent-%COMP%]{flex-direction:column;align-items:center}.flex-files[_ngcontent-%COMP%]{margin-right:0;width:100%;max-width:335px}}@media (min-width:0px) and (max-width:550px){.flex-row[_ngcontent-%COMP%]{flex-direction:column!important}.w-75[_ngcontent-%COMP%]{width:100%!important}}.form-container[_ngcontent-%COMP%]{display:inline-flex;padding:12px 24px;flex-direction:column;align-items:flex-start;grid-gap:24px;gap:24px;background:#f6f7f8}.form-container[_ngcontent-%COMP%]   .instruction-number[_ngcontent-%COMP%]{margin-top:3px;color:var(--green-1,#26d7a4);font-size:24px;font-family:Mulish;font-weight:900}.form-container[_ngcontent-%COMP%]   .form-row[_ngcontent-%COMP%]{display:flex;align-items:flex-start;grid-gap:12px;gap:12px;width:100%}.form-container[_ngcontent-%COMP%]   .form-row[_ngcontent-%COMP%]   .form-col[_ngcontent-%COMP%]{display:flex;flex-grow:1;flex-direction:column;grid-gap:12px;gap:12px;align-items:flex-start}.form-container[_ngcontent-%COMP%]   .form-section-instruction[_ngcontent-%COMP%]{font-size:16px}.form-container[_ngcontent-%COMP%]   .form-section-instruction[_ngcontent-%COMP%], .form-container[_ngcontent-%COMP%]   .form-section-title[_ngcontent-%COMP%]{color:var(--gray-1,#3d5e81);font-family:Mulish;font-style:normal;font-weight:500;line-height:normal}.form-container[_ngcontent-%COMP%]   .form-section-title[_ngcontent-%COMP%]{display:flex;align-items:flex-start;grid-gap:12px;gap:12px;font-size:20px}.input-container[_ngcontent-%COMP%]{margin:0}"]}),t})()}];let q=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=m.oAB({type:t}),t.\u0275inj=m.cJS({imports:[[a.u5,i.ez,r.A0,a.UX,c.G,s.zk.forRoot(),d.kn.forRoot(),l.N,o.Bz.forChild(O)]]}),t})()}}]);