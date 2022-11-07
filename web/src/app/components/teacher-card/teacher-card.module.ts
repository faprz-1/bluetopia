import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlMessagesModule } from 'src/app/components/control-messages/control-messages.module';

import { TeacherCardComponent } from './teacher-card.component';

const MODULE_ROUTES = [
  { path: '', component: TeacherCardComponent }
];

@NgModule({
  declarations: [
    TeacherCardComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    ControlMessagesModule,
    // RouterModule.forChild(MODULE_ROUTES),
  ],
  exports: [TeacherCardComponent]
})
export class TeacherCardModule { }
