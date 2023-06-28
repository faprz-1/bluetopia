import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlMessagesModule } from 'src/app/components/control-messages/control-messages.module';
import { ModalModule } from 'ngx-bootstrap/modal';

import { TemplatesPreviewSliderComponent } from './templates-preview-slider.component';

const MODULE_ROUTES = [
  { path: '', component: TemplatesPreviewSliderComponent }
];

@NgModule({
  declarations: [
    TemplatesPreviewSliderComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    NgSelectModule,
    ReactiveFormsModule,
    ControlMessagesModule,
    ModalModule.forRoot(),
    // RouterModule.forChild(MODULE_ROUTES),
  ],
  exports: [TemplatesPreviewSliderComponent]
})
export class TemplatesPreviewSliderModule { }
