import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileImageEditorModule } from '../shared/profile-image-editor/profile-image-editor.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-tooltip';

import { ProfileComponent } from './profile.component';

const MODULE_ROUTES = [
  { path: '', component: ProfileComponent }
];

@NgModule({
  imports: [
    CommonModule ,FormsModule,TooltipModule,
    RouterModule.forChild(MODULE_ROUTES),
    ProfileImageEditorModule,
  ],
  declarations: [ProfileComponent]
})
export class ProfileModule { }
