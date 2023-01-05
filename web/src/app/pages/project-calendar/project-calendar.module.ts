import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlMessagesModule } from 'src/app/components/control-messages/control-messages.module';
import { ModalModule } from 'ngx-bootstrap/modal';

import { ProjectCalendarComponent } from './project-calendar.component';
import { EventCalendarModule } from 'src/app/components/event-calendar/event-calendar.module';

const MODULE_ROUTES = [
  { path: '', component: ProjectCalendarComponent }
];

@NgModule({
  declarations: [
    ProjectCalendarComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    NgSelectModule,
    ReactiveFormsModule,
    EventCalendarModule,
    ControlMessagesModule,
    ModalModule.forRoot(),
    RouterModule.forChild(MODULE_ROUTES),
  ],
  // exports: [ProjectCalendarComponent]
})
export class ProjectCalendarModule { }
