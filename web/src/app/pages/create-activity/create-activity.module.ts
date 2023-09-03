import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlMessagesModule } from 'src/app/components/control-messages/control-messages.module';
import { ModalModule } from 'ngx-bootstrap/modal';


import { LibraryFileSelectorModalModule } from 'src/app/components/library-file-selector-modal/library-file-selector-modal.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CreateActivityComponent } from './create-activity.component';

const MODULE_ROUTES = [
  { path: '', component: CreateActivityComponent }
];


@NgModule({
  declarations: [
    CreateActivityComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    NgSelectModule,
    ReactiveFormsModule,
    ControlMessagesModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    LibraryFileSelectorModalModule,
    RouterModule.forChild(MODULE_ROUTES),
  ]
})
export class CreateActivityModule { }
