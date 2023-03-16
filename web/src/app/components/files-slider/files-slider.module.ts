import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlMessagesModule } from 'src/app/components/control-messages/control-messages.module';

import { FilesSliderComponent } from './files-slider.component';

const MODULE_ROUTES = [
  { path: '', component: FilesSliderComponent }
];

@NgModule({
  declarations: [
    FilesSliderComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    ControlMessagesModule,
    // RouterModule.forChild(MODULE_ROUTES),
  ],
  exports: [FilesSliderComponent]
})
export class FilesSliderModule { }
