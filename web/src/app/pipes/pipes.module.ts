import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JarabeFilterPipe } from './jarabe-filter/jarabe-filter.pipe';
import { JarabeImagePipe } from './jarabe-image/jarabe-image.pipe';
import { LocalDatePipe } from './local-date/localdate.pipe';
import { SafePipe } from './safe/safe.pipe';

@NgModule({
  declarations: [
    JarabeFilterPipe,
    JarabeImagePipe,
    SafePipe,
    LocalDatePipe,
  ],
  exports: [
    JarabeFilterPipe,
    JarabeImagePipe,
    SafePipe,
    LocalDatePipe,
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
