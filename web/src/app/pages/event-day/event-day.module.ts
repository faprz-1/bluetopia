import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlMessagesModule } from 'src/app/components/control-messages/control-messages.module';
import { ModalModule } from 'ngx-bootstrap/modal';

import { EventDayComponent } from './event-day.component';
import { LibraryFileSelectorModalModule } from 'src/app/components/library-file-selector-modal/library-file-selector-modal.module';

const MODULE_ROUTES = [
  { path: '', component: EventDayComponent }
];

@NgModule({
  declarations: [
    EventDayComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    NgSelectModule,
    ReactiveFormsModule,
    ControlMessagesModule,
    ModalModule.forRoot(),
    LibraryFileSelectorModalModule,
    RouterModule.forChild(MODULE_ROUTES),
  ],
  // exports: [EventDayComponent]
})
export class EventDayModule { }
