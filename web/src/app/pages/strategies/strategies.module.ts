import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlMessagesModule } from 'src/app/components/control-messages/control-messages.module';
import { ModalModule } from 'ngx-bootstrap/modal';

import { StrategiesComponent } from './strategies.component';
import { StrategyCardModule } from 'src/app/components/strategy-card/strategy-card.module';

const MODULE_ROUTES = [
  { path: '', component: StrategiesComponent }
];

@NgModule({
  declarations: [
    StrategiesComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    NgSelectModule,
    StrategyCardModule,
    ReactiveFormsModule,
    ControlMessagesModule,
    ModalModule.forRoot(),
    RouterModule.forChild(MODULE_ROUTES),
  ],
  // exports: [StrategiesComponent]
})
export class StrategiesModule { }
