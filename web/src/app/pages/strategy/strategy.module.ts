import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlMessagesModule } from 'src/app/components/control-messages/control-messages.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { StrategyCardModule } from 'src/app/components/strategy-card/strategy-card.module';

import { StrategyComponent } from './strategy.component';

const MODULE_ROUTES = [
  { path: '', component: StrategyComponent }
];

@NgModule({
  declarations: [
    StrategyComponent
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
  // exports: [StrategyComponent]
})
export class StrategyModule { }
