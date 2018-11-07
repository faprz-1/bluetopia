import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileImageEditorComponent } from './profile-image-editor.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [ProfileImageEditorComponent],
  exports: [ProfileImageEditorComponent]
})
export class ProfileImageEditorModule { }
