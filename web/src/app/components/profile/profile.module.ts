import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileImageEditorModule } from '../shared/profile-image-editor/profile-image-editor.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-tooltip';

import { ProfileComponent } from './profile.component';
import { AddCardModule } from "./add-card/add-card.module";

const MODULE_ROUTES = [
  { path: '', component: ProfileComponent }
];

@NgModule({
  imports: [
    CommonModule ,FormsModule,TooltipModule,
    RouterModule.forChild(MODULE_ROUTES),
    ProfileImageEditorModule,
    AddCardModule
  ],
  declarations: [ProfileComponent]
})
export class ProfileModule { }
