import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlMessagesModule } from 'src/app/components/control-messages/control-messages.module';
import { ModalModule } from 'ngx-bootstrap/modal';

import { TypeTemplatesComponent } from './type-templates.component';
import { TemplatePreviewModalModule } from 'src/app/components/template-preview-modal/template-preview-modal.module';

const MODULE_ROUTES = [
  { path: '', component: TypeTemplatesComponent }
];

@NgModule({
  declarations: [
    TypeTemplatesComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    NgSelectModule,
    ReactiveFormsModule,
    ControlMessagesModule,
    ModalModule.forRoot(),
    TemplatePreviewModalModule,
    RouterModule.forChild(MODULE_ROUTES),
  ],
  // exports: [TypeTemplatesComponent]
})
export class TypeTemplatesModule { }
