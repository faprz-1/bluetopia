(self.webpackChunktemplate_web=self.webpackChunktemplate_web||[]).push([[988],{6158:(t,e,r)=>{"use strict";r.d(e,{w:()=>c});var i=r(5821),o=r(7368),n=r(1116);function s(t,e){if(1&t&&(o.TgZ(0,"div",1),o._uU(1),o.qZA()),2&t){const t=o.oxw();o.xp6(1),o.hij(" ",null==t.errorMessage?null:t.errorMessage.label,"\n")}}let c=(()=>{class t{constructor(){}ngOnInit(){}get errorMessage(){var t,e,r,o;for(let n in null===(t=this.control)||void 0===t?void 0:t.errors)if((null===(e=this.control)||void 0===e?void 0:e.errors.hasOwnProperty(n))&&(null===(r=this.control)||void 0===r?void 0:r.touched))return i.R.GetValidatorErrorMessage(n,null===(o=this.control)||void 0===o?void 0:o.errors[n]);return null}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=o.Xpm({type:t,selectors:[["app-control-messages"]],inputs:{control:"control"},decls:1,vars:1,consts:[["class","color-red",4,"ngIf"],[1,"color-red"]],template:function(t,e){1&t&&o.YNc(0,s,2,1,"div",0),2&t&&o.Q6J("ngIf",null!==e.errorMessage)},directives:[n.O5],styles:[""]}),t})()},6988:(t,e,r)=>{"use strict";r.r(e),r.d(e,{TeacherTemplateFormModule:()=>z});var i=r(1116),o=r(2320),n=r(4391),s=r(1041),c=r(6050),a=r(5470),l=r(7368);function u(t,e){if(1&t&&(l.TgZ(0,"div",8),l.TgZ(1,"div",9),l.TgZ(2,"input",13),l.NdJ("ngModelChange",function(t){return e.$implicit.value=t}),l.qZA(),l.qZA(),l.TgZ(3,"textarea",14),l.NdJ("ngModelChange",function(t){return e.$implicit.description=t}),l.qZA(),l.qZA()),2&t){const t=e.$implicit;l.xp6(2),l.Q6J("ngModel",t.value),l.xp6(1),l.Q6J("ngModel",t.description)}}function d(t,e){if(1&t){const t=l.EpF();l.TgZ(0,"div",15),l.TgZ(1,"img",6),l.NdJ("click",function(){return l.CHM(t),l.oxw(2).AddCol()}),l.qZA(),l.TgZ(2,"img",7),l.NdJ("click",function(){return l.CHM(t),l.oxw(2).RemoveCol()}),l.qZA(),l.qZA()}}function p(t,e){if(1&t&&(l.TgZ(0,"div",2),l.TgZ(1,"div",8),l.TgZ(2,"div",9),l._uU(3,"Valor"),l.qZA(),l.TgZ(4,"textarea",10),l.NdJ("ngModelChange",function(t){return e.$implicit.description=t}),l.qZA(),l.qZA(),l.YNc(5,u,4,2,"div",11),l.YNc(6,d,3,0,"div",12),l.qZA()),2&t){const t=e.$implicit,r=e.last;l.xp6(4),l.Q6J("ngModel",t.description),l.xp6(1),l.Q6J("ngForOf",t.concepts),l.xp6(1),l.Q6J("ngIf",r)}}let g=(()=>{class t{constructor(){this.onReset=null,this.exportRubrics=new l.vpe,this.subscriptions=[],this.rubrics=[{description:"",concepts:[{value:1,description:""}]}]}ngOnInit(){this.onReset&&this.subscriptions.push(this.onReset.subscribe(()=>{this.ExportRubrics()})),setTimeout(()=>{this.ExportRubrics()},500)}AddRow(){this.rubrics.push({description:"",concepts:this.rubrics[0].concepts.map(t=>Object.assign({},t))})}RemoveRow(){1!=this.rubrics.length&&this.rubrics.pop()}AddCol(){const t=this.rubrics[0].concepts.length+1;this.rubrics.forEach(e=>{e.concepts.unshift({value:t,description:""})})}RemoveCol(){1!=this.rubrics[0].concepts.length&&this.rubrics.forEach(t=>{t.concepts.shift()})}ExportRubrics(){this.exportRubrics.emit(this.rubrics)}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=l.Xpm({type:t,selectors:[["app-rubric"]],inputs:{onReset:"onReset"},outputs:{exportRubrics:"exportRubrics"},decls:8,vars:1,consts:[[1,"rubric"],["class","rubric-row",4,"ngFor","ngForOf"],[1,"rubric-row"],[1,"rubric-item",2,"opacity","0"],[1,"rubric-col"],[1,"controls"],["src","assets/icons/add-circle.png","alt","add",1,"clickeable",3,"click"],["src","assets/icons/remove-circle.png","alt","add",1,"clickeable",3,"click"],[1,"rubric-item"],[1,"rubric-title"],["placeholder","Rubro",1,"rubric-input",3,"ngModel","ngModelChange"],["class","rubric-item",4,"ngFor","ngForOf"],["class","controls vertical",4,"ngIf"],["type","text",3,"ngModel","ngModelChange"],["placeholder","Descripci\xf3n",1,"rubric-input",3,"ngModel","ngModelChange"],[1,"controls","vertical"]],template:function(t,e){1&t&&(l.TgZ(0,"div",0),l.YNc(1,p,7,3,"div",1),l.TgZ(2,"div",2),l._UZ(3,"div",3),l.TgZ(4,"div",4),l.TgZ(5,"div",5),l.TgZ(6,"img",6),l.NdJ("click",function(){return e.AddRow()}),l.qZA(),l.TgZ(7,"img",7),l.NdJ("click",function(){return e.RemoveRow()}),l.qZA(),l.qZA(),l.qZA(),l.qZA(),l.qZA()),2&t&&(l.xp6(1),l.Q6J("ngForOf",e.rubrics))},directives:[i.sg,s.Fj,s.JJ,s.On,i.O5],styles:[".rubric-item[_ngcontent-%COMP%], .rubric-row[_ngcontent-%COMP%]{display:flex;align-items:center}.rubric-item[_ngcontent-%COMP%]{flex-direction:column;border-radius:6px;overflow:hidden;margin-right:1.5rem;margin-bottom:1.5rem;width:150px;min-width:150px}.rubric-title[_ngcontent-%COMP%]{background-color:#d3e8ff;padding:.75rem}.rubric-input[_ngcontent-%COMP%], .rubric-title[_ngcontent-%COMP%]{width:100%;text-align:center;color:#587594}.rubric-input[_ngcontent-%COMP%]{background-color:#e8f3ff;border:none;resize:none;height:6rem;padding:.5rem;font-size:1rem}.controls[_ngcontent-%COMP%]{display:flex;justify-content:center;width:150px}.controls[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{margin:.25rem}.vertical[_ngcontent-%COMP%]{flex-direction:column}.vertical[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:-webkit-min-content;width:min-content}.rubric-title[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{color:#587594;width:100%;border:none;text-align:center;background:transparent}"]}),t})(),m=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=l.oAB({type:t}),t.\u0275inj=l.cJS({imports:[[s.u5,i.ez,n.A0,s.UX,c.G,a.zk.forRoot()]]}),t})();var h=r(6304),Z=r(1392),v=r(407),f=r(6189),b=r(6158);function T(t,e){if(1&t&&(l.TgZ(0,"div",19),l.TgZ(1,"label"),l._uU(2,"Escribe tu tem\xe1tica"),l.qZA(),l.TgZ(3,"div",20),l._UZ(4,"input",27),l._UZ(5,"app-control-messages",25),l.qZA(),l.qZA()),2&t){const t=l.oxw(2);l.xp6(5),l.Q6J("control",t.strategyForm.get("customTopic"))}}function A(t,e){if(1&t){const t=l.EpF();l.TgZ(0,"div"),l.TgZ(1,"div",16),l.TgZ(2,"div",17),l._uU(3," Ficha de descripcion del proyecto "),l.qZA(),l.TgZ(4,"form",18),l.TgZ(5,"div",19),l.TgZ(6,"label"),l._uU(7,"Selecciona tu tem\xe1tica"),l.qZA(),l.TgZ(8,"div",20),l.TgZ(9,"ng-select",21),l.NdJ("change",function(e){return l.CHM(t),l.oxw().OnTopicSelected(e)}),l.qZA(),l.qZA(),l.qZA(),l.YNc(10,T,6,1,"div",22),l.TgZ(11,"div",19),l.TgZ(12,"label"),l._uU(13,"Rellena los campos"),l.qZA(),l.TgZ(14,"div",23),l._uU(15,"Recuerda que tu t\xedtulo debe ser creativo"),l.qZA(),l.TgZ(16,"div",20),l._UZ(17,"input",24),l._UZ(18,"app-control-messages",25),l.qZA(),l.qZA(),l.TgZ(19,"div",19),l.TgZ(20,"div",20),l._UZ(21,"input",26),l._UZ(22,"app-control-messages",25),l.qZA(),l.qZA(),l.qZA(),l.qZA(),l.qZA()}if(2&t){const t=l.oxw();let e;l.xp6(4),l.Q6J("formGroup",t.strategyForm),l.xp6(5),l.Q6J("items",t.templateTopics)("multiple",!1),l.xp6(1),l.Q6J("ngIf",(null==(e=t.strategyForm.get("topic"))?null:e.value)==t.NEW_TOPIC_NAME),l.xp6(8),l.Q6J("control",t.strategyForm.get("title")),l.xp6(4),l.Q6J("control",t.strategyForm.get("generatingQuestion"))}}function y(t,e){if(1&t&&(l.TgZ(0,"div",19),l.TgZ(1,"label"),l._uU(2,"Escribe tu tipo de producto"),l.qZA(),l.TgZ(3,"div",20),l._UZ(4,"input",34),l._UZ(5,"app-control-messages",25),l.qZA(),l.qZA()),2&t){const t=l.oxw(2);l.xp6(5),l.Q6J("control",t.parcialProductForm.get("customParcialProductTypeName"))}}function w(t,e){if(1&t){const t=l.EpF();l.TgZ(0,"div"),l.TgZ(1,"div",16),l.TgZ(2,"div",28),l._uU(3," Productos parciales "),l.qZA(),l.TgZ(4,"form",18),l.TgZ(5,"div",19),l.TgZ(6,"label"),l._uU(7,"Selecciona tu tipo de producto"),l.qZA(),l.TgZ(8,"div",20),l._UZ(9,"ng-select",29),l.qZA(),l.qZA(),l.YNc(10,y,6,1,"div",22),l.TgZ(11,"div",19),l.TgZ(12,"div",20),l._UZ(13,"input",30),l._UZ(14,"app-control-messages",25),l.qZA(),l.qZA(),l.TgZ(15,"div",19),l.TgZ(16,"div",20),l._UZ(17,"input",31),l._UZ(18,"app-control-messages",25),l.qZA(),l.qZA(),l.TgZ(19,"div",32),l._uU(20," Configura la r\xfabrica "),l.qZA(),l.TgZ(21,"div"),l.TgZ(22,"app-rubric",33),l.NdJ("exportRubrics",function(e){return l.CHM(t),l.oxw().CatchRubrics(e)}),l.qZA(),l.qZA(),l.qZA(),l.qZA(),l.qZA()}if(2&t){const t=l.oxw();let e;l.xp6(4),l.Q6J("formGroup",t.parcialProductForm),l.xp6(5),l.Q6J("items",t.parcialProductTypes)("multiple",!1),l.xp6(1),l.Q6J("ngIf",0==(null==(e=t.parcialProductForm.get("parcialProductTypeId"))?null:e.value)),l.xp6(4),l.Q6J("control",t.parcialProductForm.get("name")),l.xp6(4),l.Q6J("control",t.parcialProductForm.get("instructions")),l.xp6(4),l.Q6J("onReset",t.onReset)}}function q(t,e){if(1&t){const t=l.EpF();l.TgZ(0,"div"),l.TgZ(1,"div",16),l.TgZ(2,"div",17),l._uU(3," Productos finales "),l.qZA(),l.TgZ(4,"form",18),l.TgZ(5,"div",19),l.TgZ(6,"label"),l._uU(7,"Selecciona tu tipo de producto"),l.qZA(),l.TgZ(8,"div",20),l._UZ(9,"ng-select",29),l.qZA(),l.qZA(),l.TgZ(10,"div",19),l.TgZ(11,"div",20),l._UZ(12,"input",30),l._UZ(13,"app-control-messages",25),l.qZA(),l.qZA(),l.TgZ(14,"div",19),l.TgZ(15,"div",20),l._UZ(16,"input",31),l._UZ(17,"app-control-messages",25),l.qZA(),l.qZA(),l.TgZ(18,"div",32),l._uU(19," Configura la r\xfabrica "),l.qZA(),l.TgZ(20,"div"),l.TgZ(21,"app-rubric",33),l.NdJ("exportRubrics",function(e){return l.CHM(t),l.oxw().CatchRubrics(e)}),l.qZA(),l.qZA(),l.qZA(),l.qZA(),l.qZA()}if(2&t){const t=l.oxw();l.xp6(4),l.Q6J("formGroup",t.parcialProductForm),l.xp6(5),l.Q6J("items",t.parcialProductTypes)("multiple",!1),l.xp6(4),l.Q6J("control",t.parcialProductForm.get("name")),l.xp6(4),l.Q6J("control",t.parcialProductForm.get("instructions")),l.xp6(4),l.Q6J("onReset",t.onReset)}}function x(t,e){if(1&t){const t=l.EpF();l.TgZ(0,"div"),l.TgZ(1,"div",16),l.TgZ(2,"div",17),l._uU(3," Evento cierre "),l.qZA(),l.TgZ(4,"form",18),l.TgZ(5,"div",19),l.TgZ(6,"label"),l._uU(7,"Selecciona tu tipo de evento de cierre"),l.qZA(),l.TgZ(8,"div",20),l._UZ(9,"ng-select",35),l.qZA(),l.qZA(),l.TgZ(10,"div",19),l.TgZ(11,"div",20),l._UZ(12,"input",30),l._UZ(13,"app-control-messages",25),l.qZA(),l.qZA(),l.TgZ(14,"div",19),l.TgZ(15,"div",20),l._UZ(16,"input",31),l._UZ(17,"app-control-messages",25),l.qZA(),l.qZA(),l.TgZ(18,"div",19),l.TgZ(19,"label"),l._uU(20,"Selecciona la fecha de tu evento de cierre"),l.qZA(),l.TgZ(21,"div",20),l._UZ(22,"input",36),l._UZ(23,"app-control-messages",25),l.qZA(),l.qZA(),l.TgZ(24,"div",32),l._uU(25," Configura la r\xfabrica "),l.qZA(),l.TgZ(26,"div"),l.TgZ(27,"app-rubric",33),l.NdJ("exportRubrics",function(e){return l.CHM(t),l.oxw().CatchRubrics(e)}),l.qZA(),l.qZA(),l.qZA(),l.qZA(),l.qZA()}if(2&t){const t=l.oxw();l.xp6(4),l.Q6J("formGroup",t.eventForm),l.xp6(5),l.Q6J("items",t.parcialProductTypes)("multiple",!1),l.xp6(4),l.Q6J("control",t.eventForm.get("name")),l.xp6(4),l.Q6J("control",t.eventForm.get("instructions")),l.xp6(6),l.Q6J("control",t.eventForm.get("date")),l.xp6(4),l.Q6J("onReset",t.onReset)}}function P(t,e){if(1&t){const t=l.EpF();l.TgZ(0,"button",37),l.NdJ("click",function(){l.CHM(t);const e=l.oxw(),r=l.MAs(23);return e.NextStep(r,!1)}),l._uU(1," Guardar "),l.qZA()}}function _(t,e){if(1&t){const t=l.EpF();l.TgZ(0,"div",38),l.TgZ(1,"div",39),l._uU(2," Se ha creado exitosamete tu proyecto "),l.qZA(),l.TgZ(3,"div",40),l._UZ(4,"img",41),l.qZA(),l.TgZ(5,"div",42),l._uU(6," \xbfQuieres calendarizar tu proyecto? "),l.qZA(),l.TgZ(7,"div",42),l._uU(8," Ahora asigna las actividades en las fechas correspondiente "),l.qZA(),l.qZA(),l.TgZ(9,"div",43),l.TgZ(10,"button",44),l.NdJ("click",function(){return l.CHM(t),l.oxw().SaveProject(!0)}),l._uU(11," Guardar y volver "),l.qZA(),l.TgZ(12,"button",45),l.NdJ("click",function(){return l.CHM(t),l.oxw().GoToProjectCalendar()}),l._uU(13," Calendarizar "),l.qZA(),l.qZA()}}const C=function(t){return{checked:t}};let I=(()=>{class t{constructor(t,e,r,i,o,n){this.api=t,this.activatedRoute=e,this.nav=r,this.modalService=i,this.toast=o,this.zone=n,this.NEW_TOPIC_NAME="Agregar uno nuevo",this.onReset=new l.vpe,this.modalRef=null,this.templateTopics=[],this.parcialProducts=[],this.parcialProductTypes=[],this.eventTypes=[],this.strategy=null,this.strategyForm=new s.cw({id:new s.NI(null,[s.kI.required]),topic:new s.NI(null,[s.kI.required]),customTopic:new s.NI(null,[]),title:new s.NI(null,[s.kI.required]),generatingQuestion:new s.NI(null,[s.kI.required])}),this.parcialProductForm=new s.cw({parcialProductTypeId:new s.NI(null,[s.kI.required]),name:new s.NI(null,[s.kI.required]),customParcialProductTypeName:new s.NI(null,[]),instructions:new s.NI(null,[s.kI.required]),rubric:new s.NI(null,[s.kI.required])}),this.eventForm=new s.cw({parcialProductTypeId:new s.NI(null,[s.kI.required]),name:new s.NI(null,[s.kI.required]),instructions:new s.NI(null,[s.kI.required]),date:new s.NI(null,[s.kI.required]),rubric:new s.NI(null,[s.kI.required])}),this.step=1}get nextButtonText(){switch(this.step){case 1:return"Crear productos parciales";case 2:return"Crear productos finales";case 3:return"Crear evento de cierre";case 4:return"Finalizar";default:return"Salir"}}ngOnInit(){this.GetTemplateTopics(),this.GetParcialProductTypes(),this.GetEventTypes(),this.GetParams()}OpenModal(t){this.modalRef=this.modalService.show(t,{backdrop:"static"})}CloseModal(){this.modalRef&&this.modalRef.hide()}GoBack(){1==this.step?this.nav.GoToUserRoute(`estrategias/${this.strategyId}/materias`):this.step--}RemoveItemFromArray(t,e){this.zone.run(()=>{t.splice(e,1)})}OnTopicSelected(t){const e=this.strategyForm.get("customTopic");t?"string"==typeof t&&t==this.NEW_TOPIC_NAME||"object"==typeof t&&t.name==this.NEW_TOPIC_NAME?null==e||e.setValidators([s.kI.required]):(null==e||e.setValue(null),null==e||e.clearValidators(),null==e||e.markAsUntouched()):null==e||e.clearValidators()}OnParcialProdutcTypeSelected(t){const e=this.parcialProductForm.get("customParcialProductTypeName");t?"string"==typeof t&&t==this.NEW_TOPIC_NAME||"object"==typeof t&&t.name==this.NEW_TOPIC_NAME?null==e||e.setValidators([s.kI.required]):(null==e||e.setValue(null),null==e||e.clearValidators(),null==e||e.markAsUntouched()):null==e||e.clearValidators()}NextStep(t,e=!0){this.Save().then(r=>{this.onReset.emit(),4==this.step?this.OpenModal(t):r&&e&&this.step++})}Save(){var t=this;return new Promise(function(){var e=(0,h.Z)(function*(e,r){try{switch(t.step){case 1:e(yield t.SaveStragey());break;case 2:e(yield t.SaveParcialProduct());break;case 3:e(yield t.SaveParcialProduct(!0));break;case 4:e(yield t.SaveEvent());break;default:e(!1)}}catch(i){t.toast.ShowError("Error al guardar la informaci\xf3n"),console.error(i)}});return function(t,r){return e.apply(this,arguments)}}())}GetParams(){this.activatedRoute.params.subscribe(t=>{this.grade=t.grade,this.group=t.group,this.templateId=t.templateId,this.strategyId=t.strategyId,this.GetStrategy()})}GetTemplateTopics(){this.api.Get("/TemplateTopics").subscribe(t=>{this.templateTopics=t,this.templateTopics.unshift({id:0,name:this.NEW_TOPIC_NAME})},t=>{console.error("Erro getting template topics",t)})}GetParcialProductTypes(){this.api.Get("/ParcialProductTypes").subscribe(t=>{t.unshift({id:0,name:this.NEW_TOPIC_NAME}),this.parcialProductTypes=t},t=>{console.error("Error getting parcial product types",t)})}GetEventTypes(){this.api.Get("/EventTypes").subscribe(t=>{this.eventTypes=t},t=>{console.error("Error getting event types",t)})}InitializeStrategyForm(t){var e,r,i,o;null===(e=this.strategyForm.get("id"))||void 0===e||e.setValue(t.id),null===(r=this.strategyForm.get("topic"))||void 0===r||r.setValue(t.topic),null===(i=this.strategyForm.get("title"))||void 0===i||i.setValue(t.title),null===(o=this.strategyForm.get("generatingQuestion"))||void 0===o||o.setValue(t.generatingQuestion),this.strategyForm.updateValueAndValidity()}GetStrategy(){this.api.Get(`/Strategies/${this.strategyId}`).subscribe(t=>{this.strategy=t,this.InitializeStrategyForm(t)},t=>{console.error("Error getting strategy",t)})}SaveStragey(){return new Promise((t,e)=>{if(!this.strategyForm.valid)return this.toast.ShowWarning("Favor de llenar todos los campos correctamente"),this.strategyForm.markAllAsTouched(),void t(!1);this.api.Patch(`/Strategies/${this.strategyId}`,{strategy:this.strategyForm.value}).subscribe(e=>{this.InitializeStrategyForm(e),t(!0)},e=>{console.error("Error updating strategy",e),t(!1)})})}SaveParcialProduct(t=!1){return new Promise((e,r)=>{if(!this.parcialProductForm.valid)return this.toast.ShowWarning("Favor de llenar todos los campos correctamente"),this.parcialProductForm.markAllAsTouched(),void e(!1);let i=Object.assign(Object.assign({},this.parcialProductForm.value),{isFinal:t,strategyId:this.strategyId});this.api.Post("/ParcialProducts",{parcialProduct:i}).subscribe(t=>{this.strategy.parcialProducts.push(t),this.parcialProductForm.reset(),e(!0)},t=>{console.error("Error posting new parcial product",t),e(!1)})})}SaveEvent(){return new Promise((t,e)=>{if(!this.eventForm.valid)return this.toast.ShowWarning("Favor de llenar todos los campos correctamente"),this.eventForm.markAllAsTouched(),void t(!1);let r=Object.assign(Object.assign({},this.eventForm.value),{strategyId:this.strategyId,isFinal:!0});this.api.Post("/ParcialProducts",{parcialProduct:r}).subscribe(e=>{t(!0)},e=>{console.error("Error posting new event",e),t(!1)})})}CatchRubrics(t){var e,r;switch(this.step){case 2:case 3:null===(e=this.parcialProductForm.get("rubric"))||void 0===e||e.setValue(t);break;case 4:null===(r=this.eventForm.get("rubric"))||void 0===r||r.setValue(t)}}SaveProject(t=!1){this.CloseModal(),t&&this.nav.GoToUserRoute("mis-estudiantes")}GoToProjectCalendar(){this.CloseModal(),this.nav.GoToUserRoute(`estrategias/${this.strategyId}/calendario`)}}return t.\u0275fac=function(e){return new(e||t)(l.Y36(Z.sM),l.Y36(o.gz),l.Y36(v.f),l.Y36(a.tT),l.Y36(f.k),l.Y36(l.R0b))},t.\u0275cmp=l.Xpm({type:t,selectors:[["app-template-proyect-based-on-form"]],decls:24,vars:19,consts:[[1,"w-100"],[1,"d-flex","justify-content-between","align-items-center","mb-4"],[1,"back-section"],["src","assets/icons/back-arrow.png","alt","back-arrow",1,"back-icon","clickeable",3,"click"],[1,"steps-indicator"],[1,"radio-button",3,"ngClass"],[1,""],[1,"row"],[1,"d-sm-none","d-md-block","col-lg-2","col-xl-1"],[1,"col"],[3,"ngSwitch"],[4,"ngSwitchCase"],[1,"controls"],["class","btn btn-outline-primary mr-4",3,"click",4,"ngIf"],[1,"btn","btn-primary","mb-5",3,"click"],["finishModal",""],[1,"form-section"],[1,"title"],[3,"formGroup"],[1,"text"],[1,"input-container"],["bindLabel","name","bindValue","name","placeholder","Tem\xe1ticas","formControlName","topic",1,"form-control","with-border",3,"items","multiple","change"],["class","text",4,"ngIf"],[1,"text-small"],["type","text","placeholder","Titulo del proyecto","formControlName","title",1,"form-control","no-icon","w-100"],[3,"control"],["type","text","placeholder","Pregunta generadora","formControlName","generatingQuestion",1,"form-control","no-icon","w-100"],["type","text","placeholder","Tematica del proyecto","formControlName","customTopic",1,"form-control","no-icon","w-100"],[1,"title","mb-3"],["groupBy","type","bindLabel","name","bindValue","id","placeholder","Tipos de productos","formControlName","parcialProductTypeId",1,"form-control","with-border",3,"items","multiple"],["type","text","placeholder","Nombre","formControlName","name",1,"form-control","no-icon","w-100"],["type","text","placeholder","Instrucciones","formControlName","instructions",1,"form-control","no-icon","w-100"],[1,"subtitle"],[3,"onReset","exportRubrics"],["type","text","placeholder","Tipo de prducto","formControlName","customParcialProductTypeName",1,"form-control","no-icon","w-100"],["bindLabel","name","bindValue","id","placeholder","Tipos de eventos de cierre","formControlName","parcialProductTypeId",1,"form-control","with-border",3,"items","multiple"],["type","date","formControlName","date",1,"form-control","no-icon"],[1,"btn","btn-outline-primary","mr-4",3,"click"],[1,"modal-body"],[1,"text","text-center","mt-5"],[1,"text-center","my-3"],["src","assets/img/teacher-celebrating.png","alt","finish"],[1,"text","text-center"],[1,"modal-footer","d-flex","justify-content-around","my-4"],[1,"btn","btn-outline-primary",3,"click"],[1,"btn","btn-primary",3,"click"]],template:function(t,e){if(1&t){const t=l.EpF();l.TgZ(0,"div",0),l.TgZ(1,"div",1),l.TgZ(2,"div",2),l.TgZ(3,"img",3),l.NdJ("click",function(){return e.GoBack()}),l.qZA(),l.qZA(),l.TgZ(4,"div",4),l._UZ(5,"div",5),l._UZ(6,"div",5),l._UZ(7,"div",5),l._UZ(8,"div",5),l.qZA(),l._UZ(9,"div",6),l.qZA(),l.TgZ(10,"div",7),l._UZ(11,"div",8),l.TgZ(12,"div",9),l.TgZ(13,"div",10),l.YNc(14,A,23,6,"div",11),l.YNc(15,w,23,7,"div",11),l.YNc(16,q,22,6,"div",11),l.YNc(17,x,28,7,"div",11),l.qZA(),l.qZA(),l.qZA(),l.TgZ(18,"div",12),l.YNc(19,P,2,0,"button",13),l.TgZ(20,"button",14),l.NdJ("click",function(){l.CHM(t);const r=l.MAs(23);return e.NextStep(r)}),l._uU(21),l.qZA(),l.qZA(),l.qZA(),l.YNc(22,_,14,0,"ng-template",null,15,l.W1O)}2&t&&(l.xp6(5),l.Q6J("ngClass",l.VKq(11,C,e.step>=1)),l.xp6(1),l.Q6J("ngClass",l.VKq(13,C,e.step>=2)),l.xp6(1),l.Q6J("ngClass",l.VKq(15,C,e.step>=3)),l.xp6(1),l.Q6J("ngClass",l.VKq(17,C,e.step>=4)),l.xp6(5),l.Q6J("ngSwitch",e.step),l.xp6(1),l.Q6J("ngSwitchCase",1),l.xp6(1),l.Q6J("ngSwitchCase",2),l.xp6(1),l.Q6J("ngSwitchCase",3),l.xp6(1),l.Q6J("ngSwitchCase",4),l.xp6(2),l.Q6J("ngIf",!1),l.xp6(2),l.hij(" ",e.nextButtonText," "))},directives:[i.mk,i.RF,i.n9,i.O5,s._Y,s.JL,s.sg,n.w9,s.JJ,s.u,s.Fj,b.w,g],styles:[".title[_ngcontent-%COMP%]{color:#587594;font-size:1.75rem;font-weight:700;margin-bottom:2.3rem}.subtitle[_ngcontent-%COMP%]{color:#587594;font-size:1.5rem;font-weight:500;margin-bottom:.75rem}.text[_ngcontent-%COMP%]{font-size:1.25rem;color:#587594}.text-small[_ngcontent-%COMP%]{font-size:1rem;margin-bottom:.75rem}.steps-indicator[_ngcontent-%COMP%]{display:flex}.radio-button[_ngcontent-%COMP%]{margin:0 1.5rem}.controls[_ngcontent-%COMP%]{display:flex;justify-content:flex-end}.btn[_ngcontent-%COMP%]{font-size:1.25rem;font-weight:800;padding:1rem 3rem}.list-item[_ngcontent-%COMP%]{display:flex;width:100%;height:3rem;justify-content:space-between;align-items:center;background-color:#fff;margin-bottom:.75rem;padding:0 1rem;color:#003169;font-size:1.125rem;font-weight:500;border:2px solid #587594;border-radius:6px}.list-item[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{margin-left:1rem}"]}),t})(),N=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=l.oAB({type:t}),t.\u0275inj=l.cJS({imports:[[s.u5,i.ez,m,n.A0,s.UX,c.G,a.zk.forRoot()]]}),t})(),k=(()=>{class t{constructor(){}ngOnInit(){}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=l.Xpm({type:t,selectors:[["app-template-gamification-form"]],decls:2,vars:0,template:function(t,e){1&t&&(l.TgZ(0,"p"),l._uU(1,"template-gamification-form works!"),l.qZA())},styles:[""]}),t})(),M=(()=>{class t{constructor(){}ngOnInit(){}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=l.Xpm({type:t,selectors:[["app-template-experience-form"]],decls:2,vars:0,template:function(t,e){1&t&&(l.TgZ(0,"p"),l._uU(1,"template-experience-form works!"),l.qZA())},styles:[""]}),t})();function U(t,e){1&t&&(l.TgZ(0,"div"),l._UZ(1,"app-template-proyect-based-on-form"),l.qZA())}function F(t,e){1&t&&(l.TgZ(0,"div"),l._UZ(1,"app-template-gamification-form"),l.qZA())}function J(t,e){1&t&&(l.TgZ(0,"div"),l._UZ(1,"app-template-experience-form"),l.qZA())}function S(t,e){if(1&t&&(l.ynx(0),l.TgZ(1,"div",4),l.YNc(2,U,2,0,"div",5),l.YNc(3,F,2,0,"div",5),l.YNc(4,J,2,0,"div",5),l.qZA(),l.BQk()),2&t){const t=l.oxw();l.xp6(1),l.Q6J("ngSwitch",t.templateId),l.xp6(1),l.Q6J("ngSwitchCase",1),l.xp6(1),l.Q6J("ngSwitchCase",2),l.xp6(1),l.Q6J("ngSwitchCase",3)}}function R(t,e){1&t&&(l.TgZ(0,"div",6),l._UZ(1,"i",7),l.qZA())}let O=(()=>{class t{constructor(t,e,r,i,o){this.api=t,this.activatedRoute=e,this.nav=r,this.modalService=i,this.toast=o,this.strategy=null,this.loading=!1}ngOnInit(){this.GetParams()}GetParams(){this.activatedRoute.params.subscribe(t=>{this.strategyId=t.strategyId,this.GetStrategy()})}GetStrategy(){this.loading=!0,this.api.Get(`/Strategies/${this.strategyId}`).subscribe(t=>{this.strategy=t,this.templateId=t.templateId,this.loading=!1},t=>{console.error("Error getting strategy",t),this.loading=!1})}}return t.\u0275fac=function(e){return new(e||t)(l.Y36(Z.sM),l.Y36(o.gz),l.Y36(v.f),l.Y36(a.tT),l.Y36(f.k))},t.\u0275cmp=l.Xpm({type:t,selectors:[["app-teacher-template-form"]],decls:5,vars:2,consts:[[1,"content"],[1,"row-header"],[4,"ngIf","ngIfElse"],["bigLoading",""],[3,"ngSwitch"],[4,"ngSwitchCase"],[1,"d-flex","align-items-center","justify-content-center"],[1,"zmdi","zmdi-spinner","zmdi-hc-5x","zmdi-hc-spin"]],template:function(t,e){if(1&t&&(l.TgZ(0,"div",0),l._UZ(1,"div",1),l.YNc(2,S,5,4,"ng-container",2),l.qZA(),l.YNc(3,R,2,0,"ng-template",null,3,l.W1O)),2&t){const t=l.MAs(4);l.xp6(2),l.Q6J("ngIf",!e.loading)("ngIfElse",t)}},directives:[i.O5,i.RF,i.n9,I,k,M],styles:[""]}),t})(),E=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=l.oAB({type:t}),t.\u0275inj=l.cJS({imports:[[s.u5,i.ez,m,n.A0,s.UX,c.G,a.zk.forRoot()]]}),t})(),Q=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=l.oAB({type:t}),t.\u0275inj=l.cJS({imports:[[s.u5,i.ez,m,n.A0,s.UX,c.G,a.zk.forRoot()]]}),t})();const G=[{path:"",component:O}];let z=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=l.oAB({type:t}),t.\u0275inj=l.cJS({imports:[[s.u5,i.ez,n.A0,s.UX,c.G,a.zk.forRoot(),Q,E,N,o.Bz.forChild(G)]]}),t})()},407:(t,e,r)=>{"use strict";r.d(e,{f:()=>s});var i=r(7368),o=r(2320),n=r(1392);let s=(()=>{class t{constructor(t,e){this.router=t,this.api=e,this.user=null}HasInitialSlash(t){return!!t&&"/"==t.charAt(0)}GoToUserRoute(t){this.user=this.api.GetUser(),this.user&&(this.user&&this.user.role&&!t.includes(this.user.role.name.toLowerCase())?this.router.navigate([`/inicio/${this.user.role.name.toLowerCase()}${this.HasInitialSlash(t)?"":"/"}${t}`]):this.router.navigate([`${this.HasInitialSlash(t)?"":"/"}${t}`]))}GoTo(t){this.router.navigate([`${this.HasInitialSlash(t)?"":"/"}${t}`])}}return t.\u0275fac=function(e){return new(e||t)(i.LFG(o.F0),i.LFG(n.sM))},t.\u0275prov=i.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()},5821:(t,e,r)=>{"use strict";r.d(e,{R:()=>o});var i=r(7368);let o=(()=>{class t{constructor(){}static GetValidatorErrorMessage(t,e){return[{name:"required",label:"Campo requerido"},{name:"invalidRFC",label:"No tiene el formato adecuado"},{name:"invalidEmailAddress",label:"Correo inv\xe1lido"},{name:"invalidPassword",label:"Las contrase\xf1as no coinciden"},{name:"minlength",label:`M\xednimo ${e.requiredLength} caracteres `},{name:"maxlength",label:`M\xe1ximo ${e.requiredLength} caracteres `},{name:"invalidNumber",label:"Solo n\xfameros enteros, o con decimal"},{name:"invalidIntegerNumber",label:"Solo n\xfameros enteros"},{name:"matchstring",label:`${e.matchStringCustomLabel?e.matchStringCustomLabel:"El texto no coincide"}`}].find(e=>e.name==t)}static matchString(t,e=null){return r=>r.value?t==r.value?null:e?{matchstring:{requiredString:t,matchStringCustomLabel:e}}:{matchstring:t}:null}static CheckOnlyIntegerNumbers(t){return(null==t?void 0:t.value)?/^[0-9]+$/.test(null==t?void 0:t.value)?0==(null==t?void 0:t.value)?{invalidIntegerNumber:!0}:null:{invalidIntegerNumber:!0}:null}static CheckOnlyNumbers(t){return(null==t?void 0:t.value)?/^[1-9]\d*\.?\d*$/.test(null==t?void 0:t.value)?0==(null==t?void 0:t.value)?{invalidNumber:!0}:null:{invalidNumber:!0}:null}static EmailValidator(t){return(null==t?void 0:t.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/))?null:{invalidEmailAddress:!0}}static RfcValidator(t){return(null==t?void 0:t.value)&&(null==t?void 0:t.value.match(/^([A-Z\xd1&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/))?null:{invalidRFC:!0}}}return t.password="",t.confirmPassword="",t.\u0275fac=function(e){return new(e||t)},t.\u0275prov=i.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()}}]);