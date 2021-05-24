import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found.component';
import { RouterModule } from '@angular/router';

const MODULE_ROUTES = [
  { path: '', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    NotFoundComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(MODULE_ROUTES),
  ]
})
export class NotFoundModule { }
