import { Component, OnInit, Input, Output ,EventEmitter } from '@angular/core';
import { ToastService } from '../../../services/toast.service';
import { ApiService } from '../../../services/api.service';

declare var Conekta;

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.scss']
})
export class AddCardComponent implements OnInit {

  @Input() user:any = null;
  @Output('close') close = new EventEmitter<any>();
  
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

  constructor(
    private api: ApiService,
    private toast: ToastService
  ) { }

  ngOnInit() {
  }

  closeModal(){
    this.close.emit();
  }

  asignedMeConekta() {
    let endpoint = `/conekta/asignedConekta`;

    let info = {
      name: this.user.username,
      email: this.user.email
    }

    this.api.post(endpoint,{info:info, userId:this.user.id},true).subscribe( res => { this.createTokoenCard(); },
    err => { this.toast.showError("No se pudo crear usuario en conekta"); });
  }

  checkUser() {
    if(this.user != null) {
      if(this.user.customerId == null) { this.asignedMeConekta(); }
      else { this.createTokoenCard(); }
    }
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
    else { this.toast.showError("Datos Incorrectos"); }
  }

  onSuccesFulToken(token) {
      var Token = token.id;

      let enpoint = "/conekta/addCardToUser";
      
      this.api.post(enpoint,{cardToken:Token, customerId: this.user.customerId},true).subscribe( res => {
        this.toast.showSuccess("Se a agregado la tarjeta correctamente");
        this.close.emit();
      }, err => { this.toast.showError("No se pudo agregar la tarjeta"); });
  }

  onErrorToken(error) { this.toast.showError(error); }

  getStatusData() {
    if(this.data.card.number == "" || this.data.card.name == "" || this.data.card.exp_year == "" || this.data.card.exp_month == ""  ||
       this.data.card.cvc == "") { return true; }
    else { return false; }
  }

}
