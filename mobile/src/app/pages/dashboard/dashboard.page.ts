import { Component, OnInit } from '@angular/core';
import { ComponentBase } from 'src/app/base/component-base';
import { BuyComponent } from "../../components/buy/buy.component";
import { BuyPagePage } from "../payment-stuff/buy-page/buy-page.page";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage extends ComponentBase implements OnInit {

  public loggedUser:any;

  listProducts = [
    {
      img: "../../../assets/img/avatar.jpg",
      name: "Product 1",
      price: "1234",
      quantity: 1
    },
    {
      img: "../../../assets/img/avatar.jpg",
      name: "Product 2",
      price: "150.00",
      quantity: 3
    },
    {
      img: "../../../assets/img/avatar.jpg",
      name: "Product 3",
      price: 100.50,
      quantity: 10
    },
    {
      img: "../../../assets/img/avatar.jpg",
      name: "Product 4",
      price: 1000,
      quantity: 1
    }
  ]

  ngOnInit() { this.getProfile(); }

  async buyModal() {
    const modal = await this.modalController.create({
      component: BuyPagePage,
      componentProps: {
        'loggedUser': this.loggedUser,
        'listProducts': this.listProducts
      }
    });
    return await modal.present();
  }

  public openNotifications() { this.navController.navigateRoot('/notification'); }

  private async getProfile() {
    this.loggedUser = await this.storage.get("user");
    this.loggedUser.imgperfil = this.loggedUser.profileImage != null ? this.api.getBaseURL() + this.loggedUser.profileImage.URL : 'assets/imgs/default_avatar.jpg';
  }
}
