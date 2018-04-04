import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm} from '@angular/forms';
import { UserServiceProvider } from '../../providers/user/usersService';
import { PerfilPage } from '../index.paginas';

@IonicPage()
@Component({
  selector: 'page-cambiar-contrasena',
  templateUrl: 'cambiar-contrasena.html',
})
export class CambiarContrasenaPage {



  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CambiarContrasenaPage');
  }

  updatePswrd(pass){
    pass.id = localStorage.getItem("idtemplate");
    console.log("valor formulario", pass);
    this.userService.updatePswrd(pass)
    .subscribe(
      // tslint:disable-next-line:no-shadowed-variable
      user => {
        console.log(user);
        this.navCtrl.popTo(PerfilPage);
      },
      error => console.log(<any>error));
  }
  
}

