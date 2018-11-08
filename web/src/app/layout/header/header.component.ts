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

  constructor(
    public notiServ: NotificationService,
    public api: ApiService, 
    public router : Router
  ) {
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