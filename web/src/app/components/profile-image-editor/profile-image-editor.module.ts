import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileImageEditorComponent } from './profile-image-editor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProfileImageEditorComponent
  ],
  exports: [
    ProfileImageEditorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProfileImageEditorModule { }
