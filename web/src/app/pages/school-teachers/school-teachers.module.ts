import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlMessagesModule } from 'src/app/components/control-messages/control-messages.module';

import { SchoolTeachersComponent } from './school-teachers.component';

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
    ReactiveFormsModule,
    ControlMessagesModule,
    RouterModule.forChild(MODULE_ROUTES),
  ]
})
export class SchoolTeachersModule { }
