import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { Routes, RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ProfileImageEditorModule } from 'src/app/components/profile-image-editor/profile-image-editor.module';

const MODULE_ROUTES: Routes = [
  { path: '', component: ProfileComponent }
];

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(MODULE_ROUTES),
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    ProfileImageEditorModule
  ]
})
export class ProfileModule { }
