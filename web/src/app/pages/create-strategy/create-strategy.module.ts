import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlMessagesModule } from 'src/app/components/control-messages/control-messages.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SuggestedStrategiesSliderModule } from 'src/app/components/suggested-strategies-slider/suggested-strategies-slider.module';

import { CreateStrategyComponent } from './create-strategy.component';

const MODULE_ROUTES = [
  { path: '', component: CreateStrategyComponent }
];

@NgModule({
  declarations: [
    CreateStrategyComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    NgSelectModule,
    ReactiveFormsModule,
    ControlMessagesModule,
    ModalModule.forRoot(),
    SuggestedStrategiesSliderModule,
    RouterModule.forChild(MODULE_ROUTES),
  ],
  // exports: [CreateStrategyComponent]
})
export class CreateStrategyModule { }
