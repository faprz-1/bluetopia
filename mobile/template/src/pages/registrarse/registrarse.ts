import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController  } from 'ionic-angular';
import { NgForm} from '@angular/forms';
import { LoginPage } from '../index.paginas';

@IonicPage()
@Component({
  selector: 'page-registrarse',
  templateUrl: 'registrarse.html',
})
export class RegistrarsePage {

  usuario:Object ={
    nombre: null,
    apellido: null,
    correo: null,
    password:null,
    password1:null,
    telefono:null,
    sexo:""
  }

  constructor( public alertCtrl: AlertController,
              private navCtrl:NavController) {}

  registrarse(formulario:NgForm){

    console.log("ngForm", formulario);
    console.log("valor formulario", formulario.value);

    console.log("Usuario", this.usuario);

    let confirm = this.alertCtrl.create({
    title: '!!FELICIDADES¡¡',
    message: 'Tú registro fue todo un !EXITO¡',
    buttons: [
      {
        text: 'Iniciar Sección',
        handler: () => {

          this.navCtrl.push(LoginPage);

          console.log('Agree clicked');
        }
      }
    ]
  });
  confirm.present();
}
  }
