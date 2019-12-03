import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ComponentBase } from 'src/app/base/component-base';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss'],
})
export class BuyComponent extends ComponentBase implements OnInit {


  @Input() loggedUser: any;
  @Input() listProducts: any = null;
  @Input() isAddCard:boolean;
  @Output() isAddCardChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() selectedCard:any = null;

  cards:any = [];
  defCard:any;

  numMeses:any = 1;

  formatProducts:any = [];

  ngOnInit() {    
    this.getCards();    
  }

  changValueAddCard(val) {
    if(val == -1) { this.isAddCardChange.emit(true) }
  }

  checkLogUser() {
    if(this.loggedUser != null && this.cards.length > 0 && this.loggedUser.customerId != null) { return true; }

    return false;
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

  async Alert(msn) {
    const alert = await this.alertController.create({
      header: 'Pago',
      subHeader: '',
      message: msn,
      buttons: ['Aceptar']
    });

    await alert.present();
  }

  filterDefCard() {
    console.log(this.cards);

    this.cards.forEach(card => { if(card.default) this.defCard = card; });
    this.chechDefCard();
  }

  chechDefCard() {
    console.log(this.selectedCard);

    if(this.selectedCard == null) { this.selectedCard = this.defCard.id; }
  }

  getCards() {
    let endpoint = "/conekta/getCards";

    this.api.post(endpoint,{cutomerId:this.loggedUser.customerId},true).subscribe(res => {
      this.cards = res;
      this.filterDefCard();
    }, err => {
      this.errorAlert("Error al obetener las tarjetas");      
    });
  }

  getCardsNoFilter() {
    let endpoint = "/conekta/getCards";

    this.api.post(endpoint,{cutomerId:this.loggedUser.customerId},true).subscribe(res => {
      this.cards = res;
    }, err => {
      this.errorAlert("Error al obetener las tarjetas");      
    });
  }

  convertProducts() {
    this.listProducts.forEach(p => {
      this.formatProducts.push({
        name: p.name,
        unit_price: p.unit_price,
        quantity: p.quantity
      });
    });
  }

  buy() {
    let endpoint = "/conekta/orderFromCustomer";
    let objToBuy = {
      cutomerId: this.loggedUser.customerId,
      productsItems: this.formatProducts,
      cardId: this.selectedCard,
      mesesCantidad: this.numMeses
    };

    this.convertProducts();

    this.api.post(endpoint,objToBuy).subscribe( res => {
      console.log(res);
      this.Alert('La compra se a realizado correctamente');
      this.modalController.dismiss();
    }, err => { this.errorAlert(err.error.error.details[0].message); });
  }

  onErrorToken(error) { this.errorAlert(error); }

  getTotal() {
    let sum = 0;

    this.listProducts.forEach(p => {
      sum += (p.unit_price * p.quantity);
    });

    if(this.listProducts == null) return 0;
    
    return sum;
  }

}
