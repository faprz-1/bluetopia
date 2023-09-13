import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StudentDashboardComponent } from './student-dashboard.component';

const MODULE_ROUTES = [
  { path: '', component: StudentDashboardComponent }
];

@NgModule({
  declarations: [
    StudentDashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(MODULE_ROUTES)
  ]
})
export class StudentDashboardModule { }
