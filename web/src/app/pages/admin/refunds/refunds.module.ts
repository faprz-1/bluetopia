import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RefundsComponent } from "./refunds.component";
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

const MODULE_ROUTES = [
  { path: '', component: RefundsComponent }
];

@NgModule({
  declarations: [RefundsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ModalModule.forRoot(),
    RouterModule.forChild(MODULE_ROUTES),
  ]
})
export class RefundsModule { }
