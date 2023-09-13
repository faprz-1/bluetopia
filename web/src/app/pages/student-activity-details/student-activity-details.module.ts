import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxFileDropModule } from 'ngx-file-drop';
import { StudentActivityDetailsComponent } from './student-activity-details.component';

const MODULE_ROUTES = [
  { path: '', component: StudentActivityDetailsComponent }
];

@NgModule({
  declarations: [
    StudentActivityDetailsComponent
  ],
  imports: [
    CommonModule,
    NgxFileDropModule,
    RouterModule.forChild(MODULE_ROUTES)
  ]
})
export class StudentActivityDetailsModule { }
