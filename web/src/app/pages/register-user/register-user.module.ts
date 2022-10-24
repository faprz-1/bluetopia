import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlMessagesModule } from 'src/app/components/control-messages/control-messages.module';

import { RegisterUserComponent } from './register-user.component';

const MODULE_ROUTES = [
  { path: '', component: RegisterUserComponent }
];

@NgModule({
  declarations: [
    RegisterUserComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    ControlMessagesModule,
    RouterModule.forChild(MODULE_ROUTES),
  ]
})
export class RegisterUserModule { }
