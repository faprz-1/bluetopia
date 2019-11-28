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

  lisrProducts = [
    {
      name: "Product 1",
      unit_price: 3500,
      quantity: 1
    },
    {
      name: "Product 2",
      unit_price: 1000,
      quantity: 3
    },
    {
      name: "Product 3",
      unit_price: 100,
      quantity: 10
    },
  ]

  mesesSinIntereses:any = 1;

  numMeses:any = 3;

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
    this.getCards();
  }

  filterDefCard() {
    this.cards.forEach(card => { if(card.default) this.defCard = card; });
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

  buy() {
    if(this.mesesSinIntereses == 0) { this.numMeses = null;}

    if(this.opcBuy == "Default") { this.postBuy(null); }
    else if(this.opcBuy == "especifica") {
      if(this.selectedCard != '1') { this.postBuy(this.selectedCard); }
      else { this.errorAlert("Tarjeta seleccionada incorrecta"); }
    } else if(this.opcBuy == "token") { this.createTokoenCard(); }

  }

  public postBuy(cardId) {
    let endpoint = "/conekta/orderFromCustomer";
    let objToBuy = {
      cutomerId: this.user.customerId,
      productsItems: this.lisrProducts,
      cardId: cardId,
      meses: {
        requerido:this.mesesSinIntereses,
        cantidad:this.numMeses
      }
    }
    
    this.api.post(endpoint,objToBuy).subscribe( res => {
    }, err => { this.errorAlert("No se pudo hacer el cobro"); });
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
    else { this.errorAlert("Datos Incorrectos"); }
  }

  onSuccesFulToken(token) {
      var Token = token.id;

      let enpoint = "/conekta/createOrder";
      
      this.userInfo.name = this.data.card.name;

      let objToBuy = {
        productsItems: this.lisrProducts,
        tokenId: Token,
        userI:this.userInfo,
        meses: {
          requerido:this.mesesSinIntereses,
          cantidad:this.numMeses
        }
      }

      this.api.post(enpoint,objToBuy,true).subscribe( res => {
      }, err => { this.errorAlert("No se pudo hacer el cobro"); });
  }

  onErrorToken(error) {
    this.errorAlert(error);
  }

  getStatusData() {
    if(this.data.card.number == "" || this.data.card.name == "" || this.data.card.exp_year == "" || this.data.card.exp_month == ""  || this.data.card.cvc == ""
    || this.userInfo.email == "" || this.userInfo.phone == "") { return true; }
    else { return false; }
  }

}
