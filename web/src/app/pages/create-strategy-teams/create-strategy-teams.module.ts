import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlMessagesModule } from 'src/app/components/control-messages/control-messages.module';
import { ModalModule } from 'ngx-bootstrap/modal';

import { CreateStrategyTeamsComponent } from './create-strategy-teams.component';
import { BreadcrumbModule } from 'src/app/components/breadcrumb/breadcrumb.module';

const MODULE_ROUTES = [
  { path: '', component: CreateStrategyTeamsComponent }
];

@NgModule({
  declarations: [
    CreateStrategyTeamsComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    NgSelectModule,
    BreadcrumbModule,
    ReactiveFormsModule,
    ControlMessagesModule,
    ModalModule.forRoot(),
    RouterModule.forChild(MODULE_ROUTES),
  ],
  // exports: [CreateStrategyTeamsComponent]
})
export class CreateStrategyTeamsModule { }
