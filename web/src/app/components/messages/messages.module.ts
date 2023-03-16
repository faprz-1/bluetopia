import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlMessagesModule } from 'src/app/components/control-messages/control-messages.module';

import { MessagesComponent } from './messages.component';

const MODULE_ROUTES = [
  { path: '', component: MessagesComponent }
];

@NgModule({
  declarations: [
    MessagesComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    ControlMessagesModule,
    // RouterModule.forChild(MODULE_ROUTES),
  ],
  exports: [MessagesComponent]
})
export class MessagesModule { }
