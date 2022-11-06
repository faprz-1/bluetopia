import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlMessagesModule } from 'src/app/components/control-messages/control-messages.module';

import { WelcomeViewComponent } from './welcome-view.component';

const MODULE_ROUTES = [
  { path: '', component: WelcomeViewComponent }
];

@NgModule({
  declarations: [
    WelcomeViewComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    ControlMessagesModule,
    // RouterModule.forChild(MODULE_ROUTES),
  ],
  exports: [WelcomeViewComponent]
})
export class WelcomeViewModule { }
