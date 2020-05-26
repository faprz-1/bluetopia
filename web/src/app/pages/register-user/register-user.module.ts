import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-tooltip';
import { RegisterUserComponent } from './register-user.component';


const MODULE_ROUTES = [
  { path: '', component: RegisterUserComponent }
];

@NgModule({
  imports: [
    CommonModule ,FormsModule,TooltipModule,
    RouterModule.forChild(MODULE_ROUTES)
  ],
  declarations: [RegisterUserComponent]
})
export class RegisterUserModule { }
