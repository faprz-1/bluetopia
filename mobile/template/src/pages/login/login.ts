import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegistrarsePage, RecuperarContrasenaPage, PerfilPage } from '../index.paginas';
import { NgForm} from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  registrarse:any = RegistrarsePage;
  recu_contra:any = RecuperarContrasenaPage;
  perfil:any = PerfilPage;


  constructor(public navCtrl: NavController, public navParams: NavParams) {}



  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
