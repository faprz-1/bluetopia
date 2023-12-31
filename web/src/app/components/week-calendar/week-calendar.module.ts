import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlMessagesModule } from 'src/app/components/control-messages/control-messages.module';

import { WeekCalendarComponent } from './week-calendar.component';

const MODULE_ROUTES = [
  { path: '', component: WeekCalendarComponent }
];

@NgModule({
  declarations: [
    WeekCalendarComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    ControlMessagesModule,
    // RouterModule.forChild(MODULE_ROUTES),
  ],
  exports: [WeekCalendarComponent]
})
export class WeekCalendarModule { }
