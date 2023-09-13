import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlMessagesModule } from 'src/app/components/control-messages/control-messages.module';

import { RegisterUserComponent } from './register-user.component';
import { WelcomeViewModule } from 'src/app/components/welcome-view/welcome-view.module';
import { RegisterStudentModule } from 'src/app/components/register-student/register-student.module';

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
    WelcomeViewModule,
    ReactiveFormsModule,
    RegisterStudentModule,
    ControlMessagesModule,
    RouterModule.forChild(MODULE_ROUTES),
  ]
})
export class RegisterUserModule { }
