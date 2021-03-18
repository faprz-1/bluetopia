import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage {
  public loggedUser:any;

  constructor(
    protected storage: Storage,
    protected navController: NavController,
    public api: ApiService,
  ){}

  public openNotifications() { 
    this.navController.navigateRoot('/notification');
  }
}
