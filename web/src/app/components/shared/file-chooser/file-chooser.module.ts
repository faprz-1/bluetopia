import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileChooserComponent } from './file-chooser.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [FileChooserComponent],
  exports: [FileChooserComponent]
})
export class FileChooserModule { }
