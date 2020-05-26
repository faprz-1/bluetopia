import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipeExamplePipe } from './pipe-example.pipe';

@NgModule({
  declarations: [
  PipeExamplePipe
],
  imports: [
    CommonModule
  ],
  exports:[
  ]
})
export class LocalPipesModule { }
