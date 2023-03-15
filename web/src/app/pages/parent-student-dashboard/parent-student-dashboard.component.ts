import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parent-student-dashboard',
  templateUrl: './parent-student-dashboard.component.html',
  styleUrls: ['./parent-student-dashboard.component.scss']
})
export class ParentStudentDashboardComponent implements OnInit {

  notifications: Array<any> = [
    {name: 'Ha sido calificado el documento "Los caracoles.pdf"'}
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
