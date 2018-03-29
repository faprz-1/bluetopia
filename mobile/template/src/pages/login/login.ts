import { Component } from '@angular/core';
import { IonicPage} from 'ionic-angular';
import { RegistrarsePage, RecuperarContrasenaPage, PerfilPage } from '../index.paginas';
import { NgForm} from '@angular/forms';
import { FacebookProvider } from '../../providers/facebook/facebook';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  registrarse:any = RegistrarsePage;
  recu_contra:any = RecuperarContrasenaPage;
  perfil:any = PerfilPage;


  constructor(private facebookProvider: FacebookProvider) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  loginFacebook(){
    this.facebookProvider.login();
  }

}
