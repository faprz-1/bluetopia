import { Component, OnInit } from '@angular/core';
import { ComponentBase } from 'src/app/base/component-base';

declare var Conekta;

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.page.html',
  styleUrls: ['./add-card.page.scss'],
})
export class AddCardPage extends ComponentBase implements OnInit {

  public loggedUser: any;

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

  ngOnInit() {
    this.getProfile();
  }

  private async getProfile() {
    this.loggedUser = await this.storage.get("user");
    this.loggedUser.imgperfil = this.loggedUser.profileImage != null ? this.api.getBaseURL() + this.loggedUser.profileImage.URL : 'assets/imgs/default_avatar.jpg';
  }

  public asignedMeConekta() {
    let endpoint = `/conekta/asignedConekta`;

    let info = {
      name: this.loggedUser.username,
      email: this.loggedUser.email
    }

    this.api.post(endpoint,{info:info, userId:this.loggedUser.id},true).subscribe( res => {
      console.log(res);
      // this.reload();
    }, err => {
      console.log(err);
    });
  }

  public checkUser() {
    if(this.loggedUser != null) {
      if(this.loggedUser.customerId == null) {
        this.asignedMeConekta();
      } else {
        this.createTokoenCard();
      }
    }
  }

  public createTokoenCard() {
    this.ShowLoading();
    
    Conekta.setPublicKey(this.PUBLIC_KEY);

    let numberValidate = Conekta.Card.validateNumber(this.data.card.number);
    let expValidate = Conekta.Card.validateExpirationDate(this.data.card.exp_month,this.data.card.exp_year);
    let cvcValidate = Conekta.Card.validateCVC(this.data.card.cvc);

    var successHandler = (token) => {
      /* token keys: id, livemode, used, object */
      // console.log(token);
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
      this.errorAlert('No se pudo agregar la tarjeta');
    }
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

  async goSeenCardsAlert(msn) {
    const alert = await this.alertController.create({
      header: 'Error',
      subHeader: '',
      message: msn,
      buttons: ['Aceptar']
    });

    await alert.present();
  }

  public onSuccesFulToken(token) {
      var Token = token.id;

      let enpoint = "/conekta/addCardToUser";

      this.api.post(enpoint,{cardToken:Token, customerId: this.loggedUser.customerId},true).subscribe( res => {
        this.DismissLoading();
        this.ShowPromptAlert(
          "¿Desea ver las tarjetas?", 
          null, 
          'Si', 
          () => {
            this.navController.navigateRoot('/profile');
          }, 
          'No', 
          () => {}
        )
      }, err => {
        console.log(err);
      });
  }

  public onErrorToken(error) {
    this.DismissLoading();
    this.errorAlert(error);
  }

  public getStatusData() {
    if(this.data.card.number == "" || this.data.card.name == "" || this.data.card.exp_year == "" || this.data.card.exp_month == ""  || this.data.card.cvc == "") {
      return true;
    } else {
      return false;
    }
  }

}
