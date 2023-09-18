import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlMessagesModule } from 'src/app/components/control-messages/control-messages.module';
import { ModalModule } from 'ngx-bootstrap/modal';

import { StudentCalendarComponent } from './student-calendar.component';
import { CalendarEventTypesCardModule } from 'src/app/components/calendar-event-types-card/calendar-event-types-card.module';
import { EventCalendarModule } from 'src/app/components/event-calendar/event-calendar.module';

const MODULE_ROUTES = [
  { path: '', component: StudentCalendarComponent }
];

@NgModule({
  declarations: [
    StudentCalendarComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    NgSelectModule,
    ReactiveFormsModule,
    EventCalendarModule,
    ControlMessagesModule,
    ModalModule.forRoot(),
    CalendarEventTypesCardModule,
    RouterModule.forChild(MODULE_ROUTES),
  ],
  // exports: [StudentCalendarComponent]
})
export class StudentCalendarModule { }
