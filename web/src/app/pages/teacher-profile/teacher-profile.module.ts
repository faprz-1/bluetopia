import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlMessagesModule } from 'src/app/components/control-messages/control-messages.module';
import { TeacherCardModule } from 'src/app/components/teacher-card/teacher-card.module';
import { ModalModule } from 'ngx-bootstrap/modal';

import { TeacherProfileComponent } from './teacher-profile.component';
import { TeacherGroupsCardModule } from 'src/app/components/teacher-groups-card/teacher-groups-card.module';

const MODULE_ROUTES = [
  { path: '', component: TeacherProfileComponent }
];

@NgModule({
  declarations: [
    TeacherProfileComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    NgSelectModule,
    TeacherCardModule,
    ReactiveFormsModule,
    ControlMessagesModule,
    ModalModule.forRoot(),
    TeacherGroupsCardModule,
    RouterModule.forChild(MODULE_ROUTES),
  ],
  exports: [TeacherProfileComponent]
})
export class TeacherProfileModule { }
