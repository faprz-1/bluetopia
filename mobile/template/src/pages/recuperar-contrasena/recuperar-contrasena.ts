import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm} from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-recuperar-contrasena',
  templateUrl: 'recuperar-contrasena.html',
})
export class RecuperarContrasenaPage {


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  Enviar(formulario:NgForm){

    console.log("ngForm", formulario);
    console.log("valor formulario", formulario.value);
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecuperarContrasenaPage');
  }

}
