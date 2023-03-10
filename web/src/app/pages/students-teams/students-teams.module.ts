import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlMessagesModule } from 'src/app/components/control-messages/control-messages.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { StudentsTeamsComponent } from './students-teams.component';

const MODULE_ROUTES = [
  { path: '', component: StudentsTeamsComponent }
];

@NgModule({
  declarations: [
    StudentsTeamsComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    NgSelectModule,
    DragDropModule,
    ReactiveFormsModule,
    ControlMessagesModule,
    RouterModule.forChild(MODULE_ROUTES),
  ]
})
export class StudentsTeamsModule { }
