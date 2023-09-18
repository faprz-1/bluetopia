import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlMessagesModule } from 'src/app/components/control-messages/control-messages.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BreadcrumbModule } from 'src/app/components/breadcrumb/breadcrumb.module';

import { StudentCalendarDateEventsComponent } from './student-calendar-date-events.component';
import { CalendarEventTypesCardModule } from 'src/app/components/calendar-event-types-card/calendar-event-types-card.module';
import { StudentEventCardModule } from 'src/app/components/student-event-card/student-event-card.module';

const MODULE_ROUTES = [
  { path: '', component: StudentCalendarDateEventsComponent }
];

@NgModule({
  declarations: [
    StudentCalendarDateEventsComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    NgSelectModule,
    BreadcrumbModule,
    ReactiveFormsModule,
    ControlMessagesModule,
    ModalModule.forRoot(),
    StudentEventCardModule,
    CalendarEventTypesCardModule,
    RouterModule.forChild(MODULE_ROUTES),
  ],
  // exports: [StudentCalendarDateEventsComponent]
})
export class StudentCalendarDateEventsModule { }
