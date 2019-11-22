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
    this.cards.forEach(card => {
      if(card.default) this.defCard = card;
    });
  }

  getCards() {
    let endpoint = "/conekta/getCards";

    this.api.post(endpoint,{cutomerId:this.user.customerId},true).subscribe(res => {
      this.cards = res;
      this.filterDefCard();
      console.log(res);
    }, err => {
      console.log(err);
      
    });
  }

  buy() {

    let endpoint = "/conekta/orderFromCustomer";

    if(this.opcBuy == "Default") {
      console.log("D");
      this.api.post(endpoint,{cutomerId:this.user.customerId, productsItems:this.lisrProducts,cardId:null}).subscribe( res => {
        this.close.emit();
        console.log(res);
      }, err => {
        console.log(err);
      });
      
    } else if(this.opcBuy == "especifica") {
      console.log("E");
      if(this.selectedCard != '1') {
        console.log(this.selectedCard);
        this.api.post(endpoint,{cutomerId:this.user.customerId, productsItems:this.lisrProducts,cardId:this.selectedCard}).subscribe( res => {
          this.close.emit();
          console.log(res);
        }, err => {
          console.log(err);
        });
        
      } else {
        this.toast.showError("Tarjeta seleccionada incorrecta");
      }
    } else if(this.opcBuy == "token") {
      console.log("T");
      
      this.createTokoenCard();
    }

  }

  createTokoenCard() {
    console.log(Conekta);
    
    Conekta.setPublicKey(this.PUBLIC_KEY);

    let numberValidate = Conekta.Card.validateNumber(this.data.card.number);
    let expValidate = Conekta.Card.validateExpirationDate(this.data.card.exp_month,this.data.card.exp_year);
    let cvcValidate = Conekta.Card.validateCVC(this.data.card.cvc);

    var successHandler = (token) => {
      /* token keys: id, livemode, used, object */
      console.log(token);
      this.onSuccesFulToken(token);

    };
     
    var errorHandler = (err) => {
      /* err keys: object, type, message, message_to_purchaser, param, code */
      console.log(err);
      this.onErrorToken(err);
    };

    if(numberValidate && expValidate && cvcValidate) {
      Conekta.Token.create(this.data, successHandler, errorHandler);
    } else {
      this.toast.showError("Datos Incorrectos");
    }
  }

  onSuccesFulToken(token) {
      console.log(token);

      var Token = token.id;

      console.log(Token);

      let enpoint = "/conekta/createOrder";
      
      this.userInfo.name = this.data.card.name;

      this.api.post(enpoint,{productsItems: this.lisrProducts, tokenId: Token, userI:this.userInfo},true).subscribe( res => {
        console.log(res);
        this.close.emit();
      }, err => {
        console.log(err);
      });
  }

  onErrorToken(error) {
    this.toast.showError(error);
  }

  getStatusData() {
    if(this.data.card.number == "" || this.data.card.name == "" || this.data.card.exp_year == "" || this.data.card.exp_month == ""  || this.data.card.cvc == ""
    || this.userInfo.email == "" || this.userInfo.phone == "") {
      return true;
    } else {
      return false;
    }
  }

}
