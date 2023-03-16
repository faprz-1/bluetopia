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
  strategiesActive: Array<any> = [
    {title: 'Los egipcios y la agricultura'},
    {title: 'Literatura tradicional romana'},
    {title: 'Números aplicados a la permacultura'},
  ];
  strategiesFinished: Array<any> = [
    {title: 'Los egipcios y la agricultura'},
    {title: 'Literatura tradicional romana'},
    {title: 'Números aplicados a la permacultura'},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
