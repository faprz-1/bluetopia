import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlMessagesModule } from 'src/app/components/control-messages/control-messages.module';
import { ModalModule } from 'ngx-bootstrap/modal';

import { GradeProductComponent } from './grade-product.component';
import { BreadcrumbModule } from 'src/app/components/breadcrumb/breadcrumb.module';

const MODULE_ROUTES = [
  { path: '', component: GradeProductComponent }
];

@NgModule({
  declarations: [
    GradeProductComponent
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
  // exports: [GradeProductComponent]
})
export class GradeProductModule { }
