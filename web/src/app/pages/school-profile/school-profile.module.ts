import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlMessagesModule } from 'src/app/components/control-messages/control-messages.module';
import { ModalModule } from 'ngx-bootstrap/modal';

import { SuggestedStrategiesSliderModule } from 'src/app/components/suggested-strategies-slider/suggested-strategies-slider.module';
import { TemplateBasedOnFormModule } from 'src/app/components/template-based-on-form/template-based-on-form.module';
import { TemplateGamificationFormModule } from 'src/app/components/template-gamification-form/template-gamification-form.module';
import { TemplateExperienceFormModule } from 'src/app/components/template-experience-form/template-experience-form.module';
import { SchoolProfileComponent } from './school-profile.component';


const MODULE_ROUTES = [
  { path: '', component: SchoolProfileComponent }
];

@NgModule({
  declarations: [
    SchoolProfileComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    NgSelectModule,
    ReactiveFormsModule,
    ControlMessagesModule,
    ModalModule.forRoot(),
    TemplateBasedOnFormModule,
    TemplateExperienceFormModule,
    TemplateGamificationFormModule,
    SuggestedStrategiesSliderModule,
    RouterModule.forChild(MODULE_ROUTES),
  ]
})
export class SchoolProfileModule { }
