import { Component, OnInit, Input } from '@angular/core';
import { ComponentBase } from 'src/app/base/component-base';

@Component({
  selector: 'app-buy-page',
  templateUrl: './buy-page.page.html',
  styleUrls: ['./buy-page.page.scss'],
})
export class BuyPagePage extends ComponentBase implements OnInit {

  @Input() loggedUser: any;
  @Input() listProducts: any = null;
  isAddCard:boolean = false;
  selectedCard:any = null;

  ngOnInit() { this.getProfile(); }

  changValueAddCard(val) { this.isAddCard = val; }

  public dismissModal() { this.modalController.dismiss(); }

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

  getTokenCard(val) {
    this.selectedCard = val;
    this.isAddCard = false;
  }
}
