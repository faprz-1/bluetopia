import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlMessagesModule } from 'src/app/components/control-messages/control-messages.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TemplateSliderModule } from 'src/app/components/template-slider/template-slider.module';

import { TemplatesComponent } from './templates.component';

const MODULE_ROUTES = [
  { path: '', component: TemplatesComponent }
];

@NgModule({
  declarations: [
    TemplatesComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    NgSelectModule,
    ReactiveFormsModule,
    TemplateSliderModule,
    ControlMessagesModule,
    ModalModule.forRoot(),
    RouterModule.forChild(MODULE_ROUTES),
  ],
  // exports: [TemplatesComponent]
})
export class TemplatesModule { }
