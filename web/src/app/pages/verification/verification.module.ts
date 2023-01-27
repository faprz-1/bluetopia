import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlMessagesModule } from 'src/app/components/control-messages/control-messages.module';

import { VerificationComponent } from './verification.component';

const MODULE_ROUTES = [
  { path: '', component: VerificationComponent }
];

@NgModule({
  declarations: [
    VerificationComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    NgSelectModule,
    ReactiveFormsModule,
    ControlMessagesModule,
    RouterModule.forChild(MODULE_ROUTES),
  ],
  // exports: [VerificationComponent]
})
export class VerificationModule { }
