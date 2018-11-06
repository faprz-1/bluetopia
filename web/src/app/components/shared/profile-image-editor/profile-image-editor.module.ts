import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileImageEditorComponent } from './profile-image-editor.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ProfileImageEditorComponent],
  exports: [ProfileImageEditorComponent]
})
export class ProfileImageEditorModule { }
