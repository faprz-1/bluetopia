import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss']
})
export class StudentDashboardComponent implements OnInit {

  popovers:any = {
    popoverTL: false,
    popoverTC: false,
    popoverTR: false,
    popoverBL: false,
    popoverBC: false,
    popoverBR: false
  }

  constructor() { }

  ngOnInit(): void {}

  OnMouseOver(type:string) { this.popovers[type] = true; }

  OnMouseOut(type:string) { this.popovers[type] = false; }
}
