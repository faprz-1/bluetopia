import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ComponentBase } from 'src/app/base/component-base';

declare var Conekta;

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss'],
})
export class BuyComponent extends ComponentBase implements OnInit {

  PUBLIC_KEY = 'key_MjbjZMy9XbTrWK4pCWBFjHg';

  @Input() loggedUser: any;
  @Input() listProducts: any = null;
  _isAddCard:boolean;
  @Input()
  set isAddCard(val: boolean) {
    this.isAddCardChange.emit(val);
    this._isAddCard = val;
  }
  get isAddCard() {
    return this._isAddCard;
  }
  @Output() isAddCardChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  opcBuy:any = "Default"
  cards:any = [];
  selectedCard:any = "1";
  defCard:any;
  
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

  numMeses:any = 1;

  formatProducts:any = [];

  ngOnInit() {
    console.log(this.listProducts);
    
    this.getCards();
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
    this.cards.forEach(card => { if(card.default) this.defCard = card; });
    this.chechDefCard();
  }

  chechDefCard() {
    this.selectedCard = this.defCard.id;
    // if(card.last4 == this.defCard.last4 && card.brand == this.defCard.brand && card.exp_month == this.defCard.exp_month && card.exp_month == this.defCard.exp_month){
    // }  
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

  createTokoenCard() {
    Conekta.setPublicKey(this.PUBLIC_KEY);

    let numberValidate = Conekta.Card.validateNumber(this.data.card.number);
    let expValidate = Conekta.Card.validateExpirationDate(this.data.card.exp_month,this.data.card.exp_year);
    let cvcValidate = Conekta.Card.validateCVC(this.data.card.cvc);

    var successHandler = (token) => {
      /* token keys: id, livemode, used, object */
      this.onSuccesFulToken(token);
    };
     
    var errorHandler = (err) => {
      /* err keys: object, type, message, message_to_purchaser, param, code */
      this.onErrorToken(err);
    };

    if(numberValidate && expValidate && cvcValidate) { Conekta.Token.create(this.data, successHandler, errorHandler); }
    else if(!numberValidate) { this.errorAlert("Numero de tarjeta invalido"); }
    else if(!expValidate) { this.errorAlert("Fecha de tarjeta invalido"); }
    else if(!cvcValidate) { this.errorAlert("CVC de tarjeta invalido"); }
    // else { this.errorAlert("Datos Incorrectos"); }
  }

  onSuccesFulToken(token) {
      var Token = token.id;

      let enpoint = "/conekta/addCardToUser";

      let newCard;
      this.api.post(enpoint,{cardToken:Token, customerId: this.loggedUser.customerId},true).subscribe( res => {
        newCard = res;
        this.selectedCard = newCard.id;
        this.getCardsNoFilter();
      }, err => { this.errorAlert("No se pudo agregar la tarjeta"); });
  }

  onErrorToken(error) {
    this.errorAlert(error);
  }

  getStatusData() {
    if(this.data.card.number == "" || this.data.card.name == "" || this.data.card.exp_year == "" || this.data.card.exp_month == ""  || this.data.card.cvc == ""
    || this.userInfo.email == "" || this.userInfo.phone == "") { return true; }
    else { return false; }
  }

  getTotal() {
    let sum = 0;

    this.listProducts.forEach(p => {
      sum += (p.unit_price * p.quantity);
    });

    if(this.listProducts == null) return 0;
    
    return sum;
  }

}
