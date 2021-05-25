import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCardComponent } from './user-card.component';

@NgModule({
  declarations: [
    UserCardComponent
  ],
  exports: [
    UserCardComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UserCardModule { }
