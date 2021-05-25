import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from '../profile/profile.component';
import { RegisterUserComponent } from './register-user.component';

@NgModule({
  declarations: [
    RegisterUserComponent
  ],
  imports: [
    CommonModule
  ]
})
export class RegisterUserModule { }
