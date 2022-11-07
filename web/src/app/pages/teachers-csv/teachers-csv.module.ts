import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlMessagesModule } from 'src/app/components/control-messages/control-messages.module';

import { TeachersCsvComponent } from './teachers-csv.component';
import { TeacherCardModule } from 'src/app/components/teacher-card/teacher-card.module';
import { ModalModule } from 'ngx-bootstrap/modal';

const MODULE_ROUTES = [
  { path: '', component: TeachersCsvComponent }
];

@NgModule({
  declarations: [
    TeachersCsvComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    NgSelectModule,
    TeacherCardModule,
    ReactiveFormsModule,
    ControlMessagesModule,
    ModalModule.forRoot(),
    RouterModule.forChild(MODULE_ROUTES),
  ],
  // exports: [TeachersCsvComponent]
})
export class TeachersCsvModule { }
