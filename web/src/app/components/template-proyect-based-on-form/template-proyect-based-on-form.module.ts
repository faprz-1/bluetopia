import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlMessagesModule } from 'src/app/components/control-messages/control-messages.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { RubricModule } from 'src/app/components/rubric/rubric.module';

import { TemplateProyectBasedOnFormComponent } from './template-proyect-based-on-form.component';

const MODULE_ROUTES = [
  { path: '', component: TemplateProyectBasedOnFormComponent }
];

@NgModule({
  declarations: [
    TemplateProyectBasedOnFormComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    RubricModule,
    NgSelectModule,
    ReactiveFormsModule,
    ControlMessagesModule,
    ModalModule.forRoot(),
    // RouterModule.forChild(MODULE_ROUTES),
  ],
  exports: [TemplateProyectBasedOnFormComponent]
})
export class TemplateProyectBasedOnFormModule { }
