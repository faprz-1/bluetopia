import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {TooltipModule} from "ngx-tooltip";

import { DashboardComponent } from "./dashboard.component";


const MODULE_ROUTES = [
    { path: '', component: DashboardComponent }
];

@NgModule({
  imports: [
    CommonModule ,FormsModule,TooltipModule,
    RouterModule.forChild(MODULE_ROUTES)
  ]
  ,
  declarations: [DashboardComponent]
})
export class DashboardModule { }


