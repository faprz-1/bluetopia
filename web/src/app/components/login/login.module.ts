import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {TooltipModule} from "ngx-tooltip";

import { LoginComponent } from "./login.component";
import { FilterPipe } from '../../filter.pipe';


const MODULE_ROUTES = [
    { path: '', component: LoginComponent }
];

@NgModule({
  imports: [
    CommonModule ,FormsModule,TooltipModule,
    RouterModule.forChild(MODULE_ROUTES),
  	ToastModule.forRoot()
  ]
  ,
  declarations: [LoginComponent,FilterPipe]
  ,providers:[
  ]
})
export class LoginModule { }


