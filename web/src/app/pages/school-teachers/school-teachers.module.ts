import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlMessagesModule } from 'src/app/components/control-messages/control-messages.module';

import { SchoolTeachersComponent } from './school-teachers.component';
import { TeacherCardModule } from 'src/app/components/teacher-card/teacher-card.module';

const MODULE_ROUTES = [
  { path: '', component: SchoolTeachersComponent }
];

@NgModule({
  declarations: [
    SchoolTeachersComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    NgSelectModule,
    TeacherCardModule,
    ReactiveFormsModule,
    ControlMessagesModule,
    RouterModule.forChild(MODULE_ROUTES),
  ],
  // exports: [SchoolTeachersComponent]
})
export class SchoolTeachersModule { }
