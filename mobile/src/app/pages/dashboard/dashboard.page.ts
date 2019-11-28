import { Component, OnInit } from '@angular/core';
import { ComponentBase } from 'src/app/base/component-base';
import { BuyComponent } from "../../components/buy/buy.component";
import { BuyPagePage } from "../buy-page/buy-page.page";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage extends ComponentBase implements OnInit {

  ngOnInit() {
    this.getProfile();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: BuyPagePage
    });
    return await modal.present();
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  
  public loggedUser:any;

  public openNotifications() {
    this.navController.navigateRoot('/notification');
  }

  public goTo() {
    this.navController.navigateRoot('/buy-page');
  }

  private async getProfile() {
    this.loggedUser = await this.storage.get("user");
    this.loggedUser.imgperfil = this.loggedUser.profileImage != null ? this.api.getBaseURL() + this.loggedUser.profileImage.URL : 'assets/imgs/default_avatar.jpg';
  }
}
