import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlMessagesModule } from 'src/app/components/control-messages/control-messages.module';

import { TemplatePreviewModalComponent } from './template-preview-modal.component';

const MODULE_ROUTES = [
  { path: '', component: TemplatePreviewModalComponent }
];

@NgModule({
  declarations: [
    TemplatePreviewModalComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    NgSelectModule,
    ReactiveFormsModule,
    ControlMessagesModule,
    // RouterModule.forChild(MODULE_ROUTES),
  ],
  exports: [TemplatePreviewModalComponent]
})
export class TemplatePreviewModalModule { }
