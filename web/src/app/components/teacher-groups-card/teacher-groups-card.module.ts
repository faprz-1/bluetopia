import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlMessagesModule } from 'src/app/components/control-messages/control-messages.module';
import { ModalModule } from 'ngx-bootstrap/modal';

import { TeacherGroupsCardComponent } from './teacher-groups-card.component';

const MODULE_ROUTES = [
  { path: '', component: TeacherGroupsCardComponent }
];

@NgModule({
  declarations: [
    TeacherGroupsCardComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    NgSelectModule,
    ReactiveFormsModule,
    ControlMessagesModule,
    ModalModule.forRoot(),
    // RouterModule.forChild(MODULE_ROUTES),
  ],
  exports: [TeacherGroupsCardComponent]
})
export class TeacherGroupsCardModule { }
