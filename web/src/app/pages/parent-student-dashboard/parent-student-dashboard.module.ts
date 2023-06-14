import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlMessagesModule } from 'src/app/components/control-messages/control-messages.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MessagesModule } from 'src/app/components/messages/messages.module';
import { NextDueDatesModule } from 'src/app/components/next-due-dates/next-due-dates.module';
import { WeekCalendarModule } from 'src/app/components/week-calendar/week-calendar.module';
import { FilesSliderModule } from 'src/app/components/files-slider/files-slider.module';
import { ProductsSliderModule } from 'src/app/components/products-slider/products-slider.module';

import { ParentStudentDashboardComponent } from './parent-student-dashboard.component';

const MODULE_ROUTES = [
  { path: '', component: ParentStudentDashboardComponent }
];

@NgModule({
  declarations: [
    ParentStudentDashboardComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    NgSelectModule,
    MessagesModule,
    FilesSliderModule,
    NextDueDatesModule,
    WeekCalendarModule,
    ReactiveFormsModule,
    ProductsSliderModule,
    ControlMessagesModule,
    ModalModule.forRoot(),
    RouterModule.forChild(MODULE_ROUTES),
  ],
  // exports: [ParentStudentDashboardComponent]
})
export class ParentStudentDashboardModule { }
