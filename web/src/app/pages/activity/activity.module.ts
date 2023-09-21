import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlMessagesModule } from 'src/app/components/control-messages/control-messages.module';
import { ModalModule } from 'ngx-bootstrap/modal';


import { LibraryFileSelectorModalModule } from 'src/app/components/library-file-selector-modal/library-file-selector-modal.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ActivityComponent } from './activity.component';
import { BreadcrumbModule } from 'src/app/components/breadcrumb/breadcrumb.module';

const MODULE_ROUTES = [
  { path: '', component: ActivityComponent}
];

@NgModule({
  declarations: [
    ActivityComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    NgSelectModule,
    BreadcrumbModule,
    ReactiveFormsModule,
    ControlMessagesModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    LibraryFileSelectorModalModule,
    RouterModule.forChild(MODULE_ROUTES),
  ]
})
export class ActivityModule { }
