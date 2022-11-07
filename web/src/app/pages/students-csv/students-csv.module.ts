import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlMessagesModule } from 'src/app/components/control-messages/control-messages.module';

import { StudentsCsvComponent } from './students-csv.component';
import { TeacherCardModule } from 'src/app/components/teacher-card/teacher-card.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { GradesGroupsViewModule } from 'src/app/components/grades-groups-view/grades-groups-view.module';

const MODULE_ROUTES = [
  { path: '', component: StudentsCsvComponent }
];

@NgModule({
  declarations: [
    StudentsCsvComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    NgSelectModule,
    TeacherCardModule,
    ReactiveFormsModule,
    ControlMessagesModule,
    GradesGroupsViewModule,
    ModalModule.forRoot(),
    RouterModule.forChild(MODULE_ROUTES),
  ],
  // exports: [StudentsCsvComponent]
})
export class StudentsCsvModule { }
