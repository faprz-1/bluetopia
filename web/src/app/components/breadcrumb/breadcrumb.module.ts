import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlMessagesModule } from 'src/app/components/control-messages/control-messages.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { BreadcrumbComponent } from './breadcrumb.component';

const MODULE_ROUTES = [
  { path: '', component: BreadcrumbComponent }
];

@NgModule({
  declarations: [
    BreadcrumbComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    NgSelectModule,
    ReactiveFormsModule,
    ControlMessagesModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    // RouterModule.forChild(MODULE_ROUTES),
  ],
  exports: [BreadcrumbComponent]
})
export class BreadcrumbModule { }
