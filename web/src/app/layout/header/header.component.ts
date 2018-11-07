import { Component, OnInit } from '@angular/core';
import { SharedService } from "../../shared/services/shared.service";
import { NotificationService } from '../../services/notification.service'; 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [
    './header.component.scss'
  ]
})
export class HeaderComponent implements OnInit {
  messagesData: Array<any>;
  tasksData: Array<any>;
  maThemeModel: string = 'teal';

  setTheme() {
    this.sharedService.setTheme(this.maThemeModel)
  }

  constructor(
    public sharedService: SharedService,
    public notiServ: NotificationService
  ) {
    sharedService.maThemeSubject.subscribe((value) => {
      this.maThemeModel = value
    })

    this.notiServ.Init()

    this.messagesData = [{
        image: 'assets/demo/img/profile-pics/1.jpg',
        name: 'Ventas',
        message: 'Tienes una nueva unidad en construccion',
        date: '12:01 PM'
      },
      {
        image: 'assets/demo/img/profile-pics/2.jpg',
        name: 'Abogado',
        message: 'Documentos listos para impresion',
        date: '02:45 PM'
      },
      {
        image: 'assets/demo/img/profile-pics/6.jpg',
        name: 'Cliente',
        message: 'Nueva falla reportada',
        date: '08:21 PM'
      }
    ];

    this.tasksData = [{
      name: 'HTML5 Validation Report',
      completed: 95,
      color: ''
    }, {
      name: 'Google Chrome Extension',
      completed: '80',
      color: 'success'
    }, {
      name: 'Social Intranet Projects',
      completed: '20',
      color: 'warning'
    }, {
      name: 'Bootstrap Admin Template',
      completed: '60',
      color: 'danger'
    }, {
      name: 'Youtube Client App',
      completed: '80',
      color: 'info'
    }]
  }

  ngOnInit() {

  }
}