import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, 
  AlertController } from 'ionic-angular'; 
import { RegistrarsePage, RecuperarContrasenaPage, PerfilPage } from '../index.paginas';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user: any;
  registrarse:any = RegistrarsePage;
  recu_contra:any = RecuperarContrasenaPage;
  perfil:any = PerfilPage;
  rootPage: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,  
    public alertCtrl: AlertController) { 

    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(user){
    console.log(user);
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Acceso Denegado',
      subTitle: '!No se ha iniciado sesión correctamente!',
      buttons: ['Ok']
    });
    alert.present();
  }

  }
