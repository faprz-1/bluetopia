import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlMessagesModule } from 'src/app/components/control-messages/control-messages.module';
import { ModalModule } from 'ngx-bootstrap/modal';

import { CalendarEventTypesCardComponent } from './calendar-event-types-card.component';

const MODULE_ROUTES = [
  { path: '', component: CalendarEventTypesCardComponent }
];

@NgModule({
  declarations: [
    CalendarEventTypesCardComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    NgSelectModule,
    ReactiveFormsModule,
    ControlMessagesModule,
    ModalModule.forRoot(),
    // RouterModule.forChild(MODULE_ROUTES), // uncomment this to make a page of this componet
  ],
  exports: [CalendarEventTypesCardComponent] // comment this to make a page of this componet
})
export class CalendarEventTypesCardModule { }
