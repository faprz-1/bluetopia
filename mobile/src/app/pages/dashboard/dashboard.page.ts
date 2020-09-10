import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  public loggedUser:any;

  constructor(
    protected storage: Storage,
    protected navController: NavController,
  ){}

  ngOnInit() { this.getProfile(); }


  public openNotifications() { this.navController.navigateRoot('/notification'); }

  private async getProfile() {
    this.loggedUser = await this.storage.get("user");
    this.loggedUser.imgperfil = this.loggedUser.profileImage != null ? this.api.getBaseURL() + this.loggedUser.profileImage.URL : 'assets/imgs/default_avatar.jpg';
  }
}
