import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StudentActivitiesComponent } from './student-activities.component';

const MODULE_ROUTES = [
  { path: '', component: StudentActivitiesComponent }
];

@NgModule({
  declarations: [
    StudentActivitiesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(MODULE_ROUTES)
  ]
})
export class StudentActivitiesModule { }
