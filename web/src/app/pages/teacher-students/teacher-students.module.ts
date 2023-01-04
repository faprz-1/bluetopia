import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlMessagesModule } from 'src/app/components/control-messages/control-messages.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { GradesGroupsViewModule } from 'src/app/components/grades-groups-view/grades-groups-view.module';

import { TeacherStudentsComponent } from './teacher-students.component';

const MODULE_ROUTES = [
  { path: '', component: TeacherStudentsComponent }
];

@NgModule({
  declarations: [
    TeacherStudentsComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    NgSelectModule,
    ReactiveFormsModule,
    ControlMessagesModule,
    GradesGroupsViewModule,
    ModalModule.forRoot(),
    RouterModule.forChild(MODULE_ROUTES),
  ],
  // exports: [TeacherStudentsComponent]
})
export class TeacherStudentsModule { }
