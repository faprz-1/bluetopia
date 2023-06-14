import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlMessagesModule } from 'src/app/components/control-messages/control-messages.module';

import { NextDueDatesComponent } from './next-due-dates.component';

const MODULE_ROUTES = [
  { path: '', component: NextDueDatesComponent }
];

@NgModule({
  declarations: [
    NextDueDatesComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    ControlMessagesModule,
    // RouterModule.forChild(MODULE_ROUTES),
  ],
  exports: [NextDueDatesComponent]
})
export class NextDueDatesModule { }
