import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlMessagesModule } from 'src/app/components/control-messages/control-messages.module';
import { ModalModule } from 'ngx-bootstrap/modal';

import { TeacherTemplateFormComponent } from './teacher-template-form.component';

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
    RouterModule.forChild(MODULE_ROUTES),
  ],
  // exports: [TeacherTemplateFormComponent]
})
export class TeacherTemplateFormModule { }
