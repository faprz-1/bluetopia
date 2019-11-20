import { Component, OnInit, Input, Output ,EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { ToastService } from '../../../services/toast.service';
import { ApiService } from '../../../services/api.service';

declare var Conekta;

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.scss']
})
export class AddCardComponent implements OnInit {

  @Input() user:any;
  @Output('close') close = new EventEmitter<any>();
  
  PUBLIC_KEY = 'key_MjbjZMy9XbTrWK4pCWBFjHg';
  
  data = {
    card: {
      number: "4242424242424242",
      name: "Javier Pedreiro",
      exp_year: "2022",
      exp_month: "12",
      cvc: "123"
    }
  };

  conektaTokenObject:any;

  aux:any = [];

  constructor(
    private api: ApiService,
    private toast: ToastService
  ) { }

  ngOnInit() {
  }

  closeModal(){
    this.close.emit();
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

      let objToken = {
        cardToken: Token,
        date: null,
        userId: this.user.id
      }

      objToken.date = moment().toISOString();

      console.log(objToken);

      let enpoint = "/Usuarios/addCard";
      

      this.api.post(enpoint,objToken,true).subscribe( res => {
        console.log(res);
      }, err => {
        console.log(err);
      });
      
      // let endpoint = "/pays/createOrder";
  
      // this.api.post(endpoint,{Token:Token}).subscribe( res => {
      //   console.log(res);
      // }, err => {
      //   console.log(err);
      // });
  }

  onErrorToken(error) {
    this.toast.showError(error);
  }

}
