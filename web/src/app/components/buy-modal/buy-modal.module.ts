import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';
import { BuyModalComponent } from "./buy-modal.component";

@NgModule({
  declarations: [BuyModalComponent],
  imports: [
    ModalModule.forRoot(),
    FormsModule,
    CommonModule
  ],
  exports: [BuyModalComponent]
})
export class BuyModalModule { }
