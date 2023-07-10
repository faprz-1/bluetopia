import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlMessagesModule } from 'src/app/components/control-messages/control-messages.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { RubricModule } from 'src/app/components/rubric/rubric.module';
import { TemplateBasedOnFormComponent } from './template-based-on-form.component';
import { LibraryFileSelectorModalModule } from '../library-file-selector-modal/library-file-selector-modal.module';
import { RubricTutorialModalModule } from '../rubric-tutorial-modal/rubric-tutorial-modal.module';

const MODULE_ROUTES = [
  { path: '', component: TemplateBasedOnFormComponent }
];

@NgModule({
  declarations: [
    TemplateBasedOnFormComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    RubricModule,
    NgSelectModule,
    ReactiveFormsModule,
    ControlMessagesModule,
    ModalModule.forRoot(),
    RubricTutorialModalModule,
    BsDatepickerModule.forRoot(),
    LibraryFileSelectorModalModule,
    // RouterModule.forChild(MODULE_ROUTES),
  ],
  exports: [TemplateBasedOnFormComponent]
})
export class TemplateBasedOnFormModule { }
