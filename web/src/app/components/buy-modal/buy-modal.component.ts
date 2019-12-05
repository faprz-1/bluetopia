import { Component, OnInit, Input, Output ,EventEmitter } from '@angular/core';
import { ToastService } from '../../services/toast.service';
import { ApiService } from '../../services/api.service';

declare var Conekta;

@Component({
  selector: 'app-buy-modal',
  templateUrl: './buy-modal.component.html',
  styleUrls: ['./buy-modal.component.scss']
})
export class BuyModalComponent implements OnInit {

  @Input() user:any = null;
  @Output('close') close = new EventEmitter<any>();
  @Input() listProducts:any = [];
  @Output() addCardChange: EventEmitter<number> = new EventEmitter<number>();

  cards:any = [];
  selectedCard:any;
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

  numMeses:any = 1;

  formatProducts:any = [];

  constructor(
    private api: ApiService,
    private toast: ToastService
  ) { }

  ngOnInit() {
    this.reload();
  }

  reload() {
    this.getCards();
  }

  closeModal(){
    this.close.emit();
  }

  filterDefCard() {
    this.cards.forEach(card => { if(card.default) this.defCard = card; });
    this.selectedCard = this.defCard.id;
  }

  getCards(card = null) {
    let endpoint = "/conekta/getCards";

    this.api.post(endpoint,{cutomerId:this.user.customerId},true).subscribe(res => {
      this.cards = res;
      this.filterDefCard();
      if(card != null) {
        this.selectedCard = card.id;
        this.toast.showSuccess("Se a agregado la tarjeta correctamente");
        this.addCardChange.emit(1);
      }
    }, err => { this.toast.showError("Error al obetener las tarjetas"); });
  }

  convertProducts() {
    this.listProducts.forEach(p => {
      let intPrice;
      let floatPrice = parseFloat(p.price).toFixed(2);
      let stringPrice = floatPrice.toString();
      intPrice = this.convertPrice(stringPrice);

      this.formatProducts.push({
        name: p.name,
        unit_price: intPrice,
        quantity: p.quantity
      });
    });
  }

  convertPrice(price) {
    let intPrice;
    if(price.indexOf(".") != -1) {
      intPrice= parseInt(price.replace(".",""))
    } else if(price.indexOf(".") == -1) {
      let axuPrice = price+"00";
      intPrice = parseInt(axuPrice);
    }

    return intPrice;
  }

  buy() {
    this.convertProducts();

    console.log(this.formatProducts);
    
    
    // let endpoint = "/conekta/orderFromCustomer";
    // let objToBuy = {
    //   cutomerId: this.user.customerId,
    //   productsItems: this.formatProducts,
    //   cardId: this.selectedCard,
    //   mesesCantidad: this.numMeses
    // };

    // this.api.post(endpoint,objToBuy).subscribe( res => {
    //   this.toast.showSuccess("La compra se a realizado correctamente");
    //   this.closeModal();
    // }, err => { this.toast.showError(err.error.error.details[0].message); });
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
    else if(!numberValidate) { this.toast.showError("Numero de tarjeta invalido"); }
    else if(!expValidate) { this.toast.showError("Fecha de tarjeta invalido"); }
    else if(!cvcValidate) { this.toast.showError("CVC de tarjeta invalido"); }
  }

  onSuccesFulToken(token) {
      var Token = token.id;
      let enpoint = "/conekta/addCardToUser";

      if(this.cards.length < 5) {
        this.api.post(enpoint,{cardToken:Token, customerId: this.user.customerId},true).subscribe( res => {
          this.getCards(res);
        }, err => { this.toast.showError("No se pudo agregar la tarjeta"); });
      } else {
        this.toast.showError("No puedes agregar mas de 5 tarjetas");
      }
  }

  onErrorToken(error) { this.toast.showError(error); }

  getStatusData() {
    if(this.data.card.number == "" || this.data.card.name == "" || this.data.card.exp_year == "" || this.data.card.exp_month == ""  || this.data.card.cvc == "")
    { return true; } else {return false; }
  }

  getTotal() {
    let sum = 0;

    this.listProducts.forEach(p => {
      sum += (p.price * p.quantity);
    });

    if(this.listProducts == null) return 0;
    
    return sum;
  }

}
