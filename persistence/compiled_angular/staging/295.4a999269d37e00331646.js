(self.webpackChunktemplate_web=self.webpackChunktemplate_web||[]).push([[295],{9295:(e,t,s)=>{"use strict";s.r(t),s.d(t,{TemplateFormModule:()=>O});var i=s(1116),n=s(2320),c=s(4391),o=s(1041),r=s(6050),a=s(5470),l=s(7368),g=s(1392),u=s(407),d=s(6189);function b(e,t){if(1&e&&(l.TgZ(0,"div",20),l._uU(1),l.qZA()),2&e){const e=l.oxw(2);l.xp6(1),l.hij(" ",e.grade+"\xb0"+e.group," ")}}const h=function(e){return{"active-tab":e}};function p(e,t){if(1&e){const e=l.EpF();l.TgZ(0,"div",21),l.NdJ("click",function(){const t=l.CHM(e).$implicit;return l.oxw(2).SelectTab(t)}),l.TgZ(1,"span",22),l._uU(2),l.qZA(),l.TgZ(3,"img",23),l.NdJ("click",function(){const t=l.CHM(e).index,s=l.oxw(2);return s.RemoveItemFromArray(s.selectedSubjects,t)}),l.qZA(),l.qZA()}if(2&e){const e=t.$implicit,s=l.oxw(2);l.Q6J("ngClass",l.VKq(2,h,e==s.selectedTab)),l.xp6(2),l.hij(" ",e.name," ")}}function m(e,t){if(1&e){const e=l.EpF();l.TgZ(0,"div",31),l.TgZ(1,"span"),l._uU(2),l.qZA(),l.TgZ(3,"img",23),l.NdJ("click",function(){const t=l.CHM(e).index,s=l.oxw().$implicit;return l.oxw(2).RemoveItemFromArray(s.sepObjectives,t)}),l.qZA(),l.qZA()}if(2&e){const e=t.$implicit;l.xp6(2),l.Oqu(e.name)}}function f(e,t){if(1&e){const e=l.EpF();l.TgZ(0,"div",31),l.TgZ(1,"span"),l._uU(2),l.qZA(),l.TgZ(3,"img",23),l.NdJ("click",function(){const t=l.CHM(e).index,s=l.oxw().$implicit;return l.oxw(2).RemoveItemFromArray(s.skills,t)}),l.qZA(),l.qZA()}if(2&e){const e=t.$implicit;l.xp6(2),l.Oqu(e.name)}}const v=function(e){return{"d-none":e}};function Z(e,t){if(1&e){const e=l.EpF();l.TgZ(0,"div",24),l.TgZ(1,"div",10),l.TgZ(2,"label"),l._uU(3,"Selecciona los objetivos de la SEP que buscas abordar en tu estrategia"),l.qZA(),l.TgZ(4,"div",11),l.TgZ(5,"ng-select",25,26),l.NdJ("change",function(t){const s=l.CHM(e).$implicit,i=l.MAs(6);return l.oxw(2).OnObjectiveSelected(s,t),i.handleClearClick()}),l.qZA(),l.qZA(),l.TgZ(7,"div",27),l.YNc(8,m,4,1,"div",28),l.qZA(),l.qZA(),l.TgZ(9,"div",10),l.TgZ(10,"label"),l._uU(11,"Selecciona las competencias que buscas abordar en tu estrategia"),l.qZA(),l.TgZ(12,"div",11),l.TgZ(13,"ng-select",29,30),l.NdJ("change",function(t){const s=l.CHM(e).$implicit,i=l.MAs(14);return l.oxw(2).OnSkillSelected(s,t),i.handleClearClick()}),l.qZA(),l.qZA(),l.TgZ(15,"div",27),l.YNc(16,f,4,1,"div",28),l.qZA(),l.qZA(),l.qZA()}if(2&e){const e=t.$implicit,s=l.oxw(2);l.Q6J("ngClass",l.VKq(5,v,e!=s.selectedTab)),l.xp6(5),l.Q6J("items",s.sepObjectives),l.xp6(3),l.Q6J("ngForOf",e.sepObjectives),l.xp6(5),l.Q6J("items",s.skills),l.xp6(3),l.Q6J("ngForOf",e.skills)}}function j(e,t){1&e&&(l.TgZ(0,"span"),l._UZ(1,"i",34),l.qZA())}function S(e,t){1&e&&(l.TgZ(0,"span"),l._uU(1,"Continuar"),l.qZA())}function k(e,t){if(1&e){const e=l.EpF();l.TgZ(0,"button",32),l.NdJ("click",function(){return l.CHM(e),l.oxw(2).SaveStragey()}),l.YNc(1,j,2,0,"span",33),l.YNc(2,S,2,0,"span",33),l.qZA()}if(2&e){const e=l.oxw(2);l.Q6J("disabled",e.loading.saving),l.xp6(1),l.Q6J("ngIf",e.loading.saving),l.xp6(1),l.Q6J("ngIf",!e.loading.saving)}}function A(e,t){if(1&e){const e=l.EpF();l.TgZ(0,"div",4),l.TgZ(1,"div",5),l.TgZ(2,"img",6),l.NdJ("click",function(){return l.CHM(e),l.oxw().GoBack()}),l.qZA(),l.qZA(),l.TgZ(3,"div",7),l.TgZ(4,"div",8),l._uU(5," Proyectos "),l.qZA(),l.YNc(6,b,2,1,"div",9),l.TgZ(7,"div",10),l.TgZ(8,"label"),l._uU(9,"Selecciona la o las asignaturas"),l.qZA(),l.TgZ(10,"div",11),l.TgZ(11,"ng-select",12,13),l.NdJ("change",function(t){l.CHM(e);const s=l.MAs(12);return l.oxw().OnSelectedSubjectsChange(t),s.handleClearClick()}),l.qZA(),l.qZA(),l.qZA(),l.TgZ(13,"div",14),l.TgZ(14,"div",15),l.YNc(15,p,4,4,"div",16),l.qZA(),l.YNc(16,Z,17,7,"div",17),l.qZA(),l.qZA(),l.TgZ(17,"div",18),l.YNc(18,k,3,3,"button",19),l.qZA(),l.qZA()}if(2&e){const e=l.oxw();l.xp6(6),l.Q6J("ngIf",e.grade&&e.group),l.xp6(5),l.Q6J("items",e.teacherSubjects),l.xp6(4),l.Q6J("ngForOf",e.selectedSubjects),l.xp6(1),l.Q6J("ngForOf",e.selectedSubjects),l.xp6(2),l.Q6J("ngIf",null==e.selectedSubjects?null:e.selectedSubjects.length)}}function T(e,t){1&e&&(l.TgZ(0,"div",35),l._UZ(1,"i",36),l.qZA())}const x=[{path:"",component:(()=>{class e{constructor(e,t,s,i,n){this.api=e,this.activatedRoute=t,this.nav=s,this.zone=i,this.toast=n,this.strategy=null,this.selectedTab=null,this.loading={getting:!1,saving:!1},this.teacherSubjects=[],this.selectedSubjects=[],this.sepObjectives=[],this.skills=[]}ngOnInit(){this.user=this.api.GetUser(),this.GetParams(),this.GetTeacherSubjects(),this.GetSepObjectives(),this.GetSkills()}GoBack(){let e="plantillas";this.grade&&this.group&&(e=`grado/${this.grade}/grupo/${this.group}/${e}`),this.nav.GoToUserRoute(e)}GetParams(){this.activatedRoute.params.subscribe(e=>{this.strategyId=e.strategyId,this.GetStrategy()})}GetTeacherSubjects(){this.api.Get("/Subjects").subscribe(e=>{this.teacherSubjects=e},e=>{console.error("Error getting teacher subjects",e)})}GetSepObjectives(){this.api.Get("/SepObjectives").subscribe(e=>{this.sepObjectives=e},e=>{console.error("Error getting sep objectives",e)})}GetSkills(){this.api.Get("/Skills").subscribe(e=>{this.skills=e},e=>{console.error("Error getting skills",e)})}GetStrategy(){this.loading.getting=!0,this.api.Get(`/Strategies/${this.strategyId}`).subscribe(e=>{this.strategy=e,e&&e.subjects&&(this.selectedSubjects=e.subjects,this.selectedTab=this.selectedSubjects[0]),this.loading.getting=!1,console.log(e)},e=>{console.error("Error getting strategy",e),this.loading.getting=!1})}SaveStragey(){this.AreFormsValid()?(this.loading.saving=!0,this.api.Patch(`/Strategies/${this.strategyId}`,{strategy:{id:this.strategyId,subjects:this.selectedSubjects}}).subscribe(e=>{this.nav.GoToUserRoute(`estrategias/${this.strategyId}`),this.loading.saving=!1},e=>{console.error("Error updating strategy",e),this.loading.saving=!1})):this.toast.ShowWarning("Favor de seleccionar objetivos y competencias para todas las materias")}OnSelectedSubjectsChange(e){e&&(this.selectedSubjects.push(e),this.selectedTab=e)}OnObjectiveSelected(e,t){t&&(e.sepObjectives&&Array.isArray(e.sepObjectives)?e.sepObjectives.push(t):e.sepObjectives=[t])}OnSkillSelected(e,t){t&&this.selectedSubjects.forEach(e=>{e.skills&&Array.isArray(e.skills)?e.skills.push(t):e.skills=[t]})}SelectTab(e){this.selectedTab=e}AreFormsValid(){let e=!0;return this.selectedSubjects.forEach(t=>{t.sepObjectives&&0!=t.sepObjectives.length||(e=!1),t.skills&&0!=t.skills.length||(e=!1)}),e}RemoveItemFromArray(e,t){this.zone.run(()=>{e.splice(t,1)})}}return e.\u0275fac=function(t){return new(t||e)(l.Y36(g.sM),l.Y36(n.gz),l.Y36(u.f),l.Y36(l.R0b),l.Y36(d.k))},e.\u0275cmp=l.Xpm({type:e,selectors:[["app-template-form"]],decls:5,vars:2,consts:[[1,"content"],[1,"row-header"],["class","d-flex justify-content-between",4,"ngIf","ngIfElse"],["bigLoading",""],[1,"d-flex","justify-content-between"],[1,"back-section"],["src","assets/icons/back-arrow.png","alt","back-arrow",1,"back-icon","clickeable",3,"click"],[1,"form-section"],[1,"title"],["class","subtitle text-uppercase",4,"ngIf"],[1,"text"],[1,"input-container"],["bindLabel","name","placeholder","Campos formativos",1,"form-control","with-border",3,"items","change"],["subjectsSelect",""],[1,"subjects-forms"],[1,"subjects-tabs"],["class","subject-tab clickeable",3,"ngClass","click",4,"ngFor","ngForOf"],["class","subject-form mb-5",3,"ngClass",4,"ngFor","ngForOf"],[1,"controls","mb-5"],["class","btn btn-primary",3,"disabled","click",4,"ngIf"],[1,"subtitle","text-uppercase"],[1,"subject-tab","clickeable",3,"ngClass","click"],[1,"mr-2"],["src","assets/icons/close-circle.png","alt","close.png",1,"clickeable",3,"click"],[1,"subject-form","mb-5",3,"ngClass"],["bindLabel","name","placeholder","Objetivos",1,"form-control","with-border",3,"items","change"],["objectivesSelect",""],[1,"list"],["class","list-item",4,"ngFor","ngForOf"],["bindLabel","name","placeholder","Competencias",1,"form-control","with-border",3,"items","change"],["skillsSelect",""],[1,"list-item"],[1,"btn","btn-primary",3,"disabled","click"],[4,"ngIf"],[1,"zmdi","zmdi-spinner","zmdi-hc-lg","zmdi-hc-spin"],[1,"d-flex","align-items-center","justify-content-center"],[1,"zmdi","zmdi-spinner","zmdi-hc-5x","zmdi-hc-spin"]],template:function(e,t){if(1&e&&(l.TgZ(0,"div",0),l._UZ(1,"div",1),l.YNc(2,A,19,5,"div",2),l.qZA(),l.YNc(3,T,2,0,"ng-template",null,3,l.W1O)),2&e){const e=l.MAs(4);l.xp6(2),l.Q6J("ngIf",!t.loading.getting)("ngIfElse",e)}},directives:[i.O5,c.w9,i.sg,i.mk],styles:[".back-icon[_ngcontent-%COMP%]{margin-right:4rem}.title[_ngcontent-%COMP%]{color:#587594;font-size:1.75rem;font-weight:700;margin-bottom:.6rem}.subtitle[_ngcontent-%COMP%]{color:#587594;font-size:1.5rem;font-weight:500;margin-bottom:.75rem}.text[_ngcontent-%COMP%]{font-size:1.25rem;color:#587594}.subjects-tabs[_ngcontent-%COMP%]{display:flex;margin-bottom:.75rem}.subject-tab[_ngcontent-%COMP%]{border:2px solid #587594;padding:.5rem 1rem;margin-right:1.25rem;border-radius:6px 6px 0 0}.active-tab[_ngcontent-%COMP%]{background-color:#587594;color:#fff}.form-section[_ngcontent-%COMP%]{margin-right:2rem;width:100%}.subject-form[_ngcontent-%COMP%]{border:2px solid #587594;border-radius:6px;padding:1.5rem 3rem;background-color:#f6f7f8}.list-item[_ngcontent-%COMP%]{display:flex;width:100%;height:3rem;justify-content:space-between;align-items:center;background-color:#fff;margin-bottom:.75rem;padding:0 1rem;color:#003169;font-size:1.125rem;font-weight:500}.controls[_ngcontent-%COMP%]{margin:auto auto 0}.btn[_ngcontent-%COMP%]{font-size:1.25rem;font-weight:800;padding:1rem 4rem}"]}),e})()}];let O=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=l.oAB({type:e}),e.\u0275inj=l.cJS({imports:[[o.u5,i.ez,c.A0,o.UX,r.G,a.zk.forRoot(),n.Bz.forChild(x)]]}),e})()},407:(e,t,s)=>{"use strict";s.d(t,{f:()=>o});var i=s(7368),n=s(2320),c=s(1392);let o=(()=>{class e{constructor(e,t){this.router=e,this.api=t,this.user=null}HasInitialSlash(e){return!!e&&"/"==e.charAt(0)}GoToUserRoute(e){this.user=this.api.GetUser(),this.user&&(this.user&&this.user.role&&!e.includes(this.user.role.name.toLowerCase())?this.router.navigate([`/inicio/${this.user.role.name.toLowerCase()}${this.HasInitialSlash(e)?"":"/"}${e}`]):this.router.navigate([`${this.HasInitialSlash(e)?"":"/"}${e}`]))}GoTo(e){this.router.navigate([`${this.HasInitialSlash(e)?"":"/"}${e}`])}}return e.\u0275fac=function(t){return new(t||e)(i.LFG(n.F0),i.LFG(c.sM))},e.\u0275prov=i.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()}}]);