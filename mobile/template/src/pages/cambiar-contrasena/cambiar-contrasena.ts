import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm} from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-cambiar-contrasena',
  templateUrl: 'cambiar-contrasena.html',
})
export class CambiarContrasenaPage {



  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  Guardar(formulario:NgForm){

    console.log("ngForm", formulario);
    console.log("valor formulario", formulario.value);
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CambiarContrasenaPage');
  }

}
