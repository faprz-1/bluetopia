import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-recuperar-contrasena',
  templateUrl: 'recuperar-contrasena.html',
})
export class RecuperarContrasenaPage {


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public toastCtrl: ToastController, 
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecuperarContrasenaPage');
  }

  sendMail(correo) {    
    
  }

  showAlert(tit, sub) {
    let alert = this.alertCtrl.create({
      title: tit,
      subTitle: sub,
      buttons: ['Ok']
    });
    alert.present();
  }
}
