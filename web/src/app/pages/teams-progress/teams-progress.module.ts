import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlMessagesModule } from 'src/app/components/control-messages/control-messages.module';
import { NgSelectModule } from '@ng-select/ng-select';

import { TeamsProgressComponent } from './teams-progress.component';

const MODULE_ROUTES = [
  { path: '', component: TeamsProgressComponent }
];

@NgModule({
  declarations: [
    TeamsProgressComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    NgSelectModule,
    ReactiveFormsModule,
    ControlMessagesModule,
    RouterModule.forChild(MODULE_ROUTES),
  ]
})
export class TeamsProgressModule { }
