import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlMessagesModule } from 'src/app/components/control-messages/control-messages.module';
import { ModalModule } from 'ngx-bootstrap/modal';

import { RubricTutorialModalComponent } from './rubric-tutorial-modal.component';
import { RubricModule } from '../rubric/rubric.module';

const MODULE_ROUTES = [
  { path: '', component: RubricTutorialModalComponent }
];

@NgModule({
  declarations: [
    RubricTutorialModalComponent
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
  exports: [RubricTutorialModalComponent]
})
export class RubricTutorialModalModule { }
