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
  tasksData: Array < any > ;
  maThemeModel: string;

  setTheme() {
    this.sharedService.setTheme(this.maThemeModel)
  }
  constructor(
    public notiServ: NotificationService,
    public api: ApiService, 
    public router : Router,
    public sharedService : SharedService
  ) {
    this.notiServ.Init()
  }

  cerrarSession() {
    this.api.Post('/Usuarios/logout', { tokens: localStorage.getItem("fireTokens") != null ? localStorage.getItem("fireTokens") : [] }, true).subscribe(() => {
      localStorage.clear();
    });
    localStorage.clear();
  }

  ngOnInit() {}
}