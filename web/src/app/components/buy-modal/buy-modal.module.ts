import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';
import { BuyModalComponent } from "./buy-modal.component";
import { UnitCurrencyPipe } from './../../pipes/unit-currency.pipe';

@NgModule({
  declarations: [BuyModalComponent,UnitCurrencyPipe],
  imports: [
    ModalModule.forRoot(),
    FormsModule,
    CommonModule
  ],
  exports: [BuyModalComponent]
})
export class BuyModalModule { }
