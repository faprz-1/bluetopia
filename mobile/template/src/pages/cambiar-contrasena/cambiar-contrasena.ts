import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular'
import { PerfilPage } from '../index.paginas';

@IonicPage()
@Component({
  selector: 'page-cambiar-contrasena',
  templateUrl: 'cambiar-contrasena.html',
})
export class CambiarContrasenaPage {



  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams,
    private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CambiarContrasenaPage');
  }

  updatePswrd(pass){
    pass.id = localStorage.getItem("idtemplate");
    console.log("valor formulario", pass);
    if((pass.password1 == pass.password2))  {
    }else{
    this.toaspswrd('Las contraseñas nuevas no coinciden');
    }

  }

  toaspswrd(text:string) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 2500
    });
    toast.present();
  }

}
