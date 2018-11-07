import { Component, OnInit } from '@angular/core';
import { SharedService } from "../../shared/services/shared.service";
import { NotificationService } from '../../services/notification.service'; 
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [
    './header.component.scss'
  ]
})
export class HeaderComponent implements OnInit {
  messagesData: Array < any > ;
  tasksData: Array < any > ;
  maThemeModel: string = 'teal';

  setTheme() {
    this.sharedService.setTheme(this.maThemeModel)
  }

  constructor(
    public sharedService: SharedService,
    public notiServ: NotificationService,
    public api: ApiService, 
    public router : Router
  ) {
    sharedService.maThemeSubject.subscribe((value) => {
      this.maThemeModel = value
    })

    this.notiServ.Init()
  }

  cerrarSession() {
    this.api.post('/Usuarios/logout', { tokens: localStorage.getItem("fireTokens") != null ? localStorage.getItem("fireTokens") : [] }, true).subscribe(() => {
      localStorage.clear();
    });
    localStorage.clear();
  }

  ngOnInit() {}
}