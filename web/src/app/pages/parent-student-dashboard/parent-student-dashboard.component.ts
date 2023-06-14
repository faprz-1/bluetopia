import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-parent-student-dashboard',
  templateUrl: './parent-student-dashboard.component.html',
  styleUrls: ['./parent-student-dashboard.component.scss']
})
export class ParentStudentDashboardComponent implements OnInit {

  user: any = null;
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
  reminders: Array<any> = [
    {
      name: 'Ensayo de energía renobable',
    },
    {
      name: 'Presentación de la contaminación',
    },
    {
      name: 'Prototipo de robotica',
    },
    {
      name: 'Prototipo del jardin hidroponico',
    },
  ]

  constructor(
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.user = this.api.GetUser();
  }

  ToggleReminder(reminder: any) {
    reminder.checked = !reminder.checked;
  }

  DeleteNotifications(idx: number) {
    this.notifications.splice(idx, 1);
  }

}
