import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ComponentBase } from 'src/app/base/component-base';

declare var Conekta;

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent extends ComponentBase implements OnInit {

  @Input() loggedUser: any;
  @Output() tokenCard: EventEmitter<boolean> = new EventEmitter<boolean>();


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

  cards:any = [];

  ngOnInit() { this.getCards(); }

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

  onErrorToken(error) { this.errorAlert(error); }

  getCards() {
    let endpoint = "/conekta/getCards";

    this.api.post(endpoint,{cutomerId:this.loggedUser.customerId},true).subscribe(res => {
      this.cards = res;
    }, err => {
      this.errorAlert("Error al obetener las tarjetas");      
    });
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

      var card;

      if(this.cards.length < 5) {
        this.api.post(enpoint,{cardToken:Token, customerId: this.loggedUser.customerId},true).subscribe( res => {
          card = res;
          this.tokenCard.emit(card.id);
        }, err => { this.errorAlert("No se pudo agregar la tarjeta"); });
      } else {
        this.errorAlert("No puedes agregar mas de 5 tarjetas");
      }
  }

  getStatusData() {
    if(this.data.card.number == "" || this.data.card.name == "" || this.data.card.exp_year == "" || this.data.card.exp_month == ""  || this.data.card.cvc == ""
    || this.userInfo.email == "" || this.userInfo.phone == "") { return true; }
    else { return false; }
  }

}
