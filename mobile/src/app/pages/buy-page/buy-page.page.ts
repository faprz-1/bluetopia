import { Component, OnInit, Input } from '@angular/core';
import { ComponentBase } from 'src/app/base/component-base';

declare var Conekta;
@Component({
  selector: 'app-buy-page',
  templateUrl: './buy-page.page.html',
  styleUrls: ['./buy-page.page.scss'],
})
export class BuyPagePage extends ComponentBase implements OnInit {

  @Input() loggedUser: any;
  @Input() listProducts: any = null;

  opcBuy:any = "Default"
  cards:any = [];
  selectedCard:any = "1";
  defCard:any;

  PUBLIC_KEY = 'key_MjbjZMy9XbTrWK4pCWBFjHg';
  
  data = {
    card: {
      number: "",
      name: "",
      exp_year: "",
      exp_month: "",
      cvc: ""
    }
  };

  userInfo = {
    name: "",
    email: "",
    phone: ""
  }

  mesesSinIntereses:any = 1;

  numMeses:any = 3;

  isAddCard:boolean = false;

  ngOnInit() {
    this.getProfile();
  }

  public dismissModal() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss();
  }

  async errorAlert(msn) {
    const alert = await this.alertController.create({
      header: 'Error',
      subHeader: '',
      message: msn,
      buttons: ['Aceptar']
    });

    await alert.present();
  }

  private async getProfile() {
    this.loggedUser = await this.storage.get("user");
    this.loggedUser.imgperfil = this.loggedUser.profileImage != null ? this.api.getBaseURL() + this.loggedUser.profileImage.URL : 'assets/imgs/default_avatar.jpg';
  }
}
