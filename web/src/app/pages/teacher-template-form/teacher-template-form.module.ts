import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlMessagesModule } from 'src/app/components/control-messages/control-messages.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TemplateProyectBasedOnFormModule } from 'src/app/components/template-proyect-based-on-form/template-proyect-based-on-form.module';

import { TeacherTemplateFormComponent } from './teacher-template-form.component';
import { TemplateGamificationFormModule } from 'src/app/components/template-gamification-form/template-gamification-form.module';
import { TemplateExperienceFormModule } from 'src/app/components/template-experience-form/template-experience-form.module';

const MODULE_ROUTES = [
  { path: '', component: TeacherTemplateFormComponent }
];

@NgModule({
  declarations: [
    TeacherTemplateFormComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    NgSelectModule,
    ReactiveFormsModule,
    ControlMessagesModule,
    ModalModule.forRoot(),
    TemplateExperienceFormModule,
    TemplateGamificationFormModule,
    TemplateProyectBasedOnFormModule,
    RouterModule.forChild(MODULE_ROUTES),
  ],
  // exports: [TeacherTemplateFormComponent]
})
export class TeacherTemplateFormModule { }
