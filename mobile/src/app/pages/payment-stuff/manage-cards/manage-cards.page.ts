import { Component, OnInit } from '@angular/core';
import { ComponentBase } from 'src/app/base/component-base';

declare var Conekta;

@Component({
  selector: 'app-manage-cards',
  templateUrl: './manage-cards.page.html',
  styleUrls: ['./manage-cards.page.scss'],
})
export class ManageCardsPage extends ComponentBase implements OnInit {
  user: any;
  cards: any = [];
  ngOnInit(): void {
    this.getProfile()
    this.events.getObservable("card:newCardCreated").subscribe((card)=>{
      
      this.cards.unshift(card);
    })
  }
  ngOnDestroy(): void {
  }
  private async getProfile() {
    this.user = await this.storage.get("user");
    this.getCards();
  }
  goToAddCard() {
    this.navController.navigateForward('/settings/add-card')
  }
  public getCards() {
    let endpoint = "/Conekta/getCards";

    this.api.post(endpoint,{cutomerId:this.user.customerId},true).subscribe(res => {
      this.cards = res;
    }, err => {
      console.log(err);
    });
  }

  public deleteCard(card) {
    let enpoint = "/Conekta/deleteCard";

    this.api.post(enpoint,{cutomerId:this.user.customerId, cardId: card.id},true).subscribe( res => {
      this.getProfile();
    }, err => {
      this.errorAlert("No fue posible eliminar la tarjeta");
    });
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
}
