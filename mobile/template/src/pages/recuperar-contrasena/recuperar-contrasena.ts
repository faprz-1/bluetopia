import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user/usersService';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-recuperar-contrasena',
  templateUrl: 'recuperar-contrasena.html',
})
export class RecuperarContrasenaPage {


  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, 
    public userService: UserServiceProvider, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecuperarContrasenaPage');
  }

  sendMail(correo) {    
    this.userService.sendMail(correo)
      .subscribe(
        // tslint:disable-next-line:no-shadowed-variable
        user => {
          console.log(user);
          this.showAlert('Confirmado', 'Se ha enviado un correo a su cuenta para cambiar su contraseña');
          this.navCtrl.popTo(LoginPage);
        },
        error => {
          console.log(<any>error);
          this.showAlert('Email incorrecto', '¡Este correo no se encuentra registrado!');
        });
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
