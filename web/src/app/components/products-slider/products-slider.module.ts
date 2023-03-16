import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlMessagesModule } from 'src/app/components/control-messages/control-messages.module';

import { ProductsSliderComponent } from './products-slider.component';

const MODULE_ROUTES = [
  { path: '', component: ProductsSliderComponent }
];

@NgModule({
  declarations: [
    ProductsSliderComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    ControlMessagesModule,
    // RouterModule.forChild(MODULE_ROUTES),
  ],
  exports: [ProductsSliderComponent]
})
export class ProductsSliderModule { }
