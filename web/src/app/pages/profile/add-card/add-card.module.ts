import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';
import { AddCardComponent } from "./add-card.component";

@NgModule({
  declarations: [AddCardComponent],
  imports: [
    ModalModule.forRoot(),
    FormsModule,
    CommonModule
  ],
  exports: [AddCardComponent]
})
export class AddCardModule { }
