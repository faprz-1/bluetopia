import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapLocationPickerComponent } from './map-location-picker.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    MapLocationPickerComponent
  ],
  exports: [
    MapLocationPickerComponent
  ]
})
export class MapLocationPickerModule { }
