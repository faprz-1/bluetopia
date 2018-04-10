import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
/* import { NgForm} from '@angular/forms'; */
import { UserServiceProvider } from '../../providers/user/usersService';
import { PerfilPage } from '../index.paginas';

@IonicPage()
@Component({
  selector: 'page-cambiar-contrasena',
  templateUrl: 'cambiar-contrasena.html',
})
export class CambiarContrasenaPage {



  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserServiceProvider,
    public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CambiarContrasenaPage');
  }

  updatePswrd(pass){
    pass.id = localStorage.getItem("idtemplate");
    console.log("valor formulario", pass);
    if((pass.password1 == pass.password2))  {
    this.userService.updatePswrd(pass)
    .subscribe(
      // tslint:disable-next-line:no-shadowed-variable
      user => {
        console.log(user);
        this.navCtrl.popTo(PerfilPage);
        this.toaspswrd('Contraseña cambiada');
      },
      error => console.log(<any>error));

    }else{
  this.toaspswrd('Las contraseñas no coinciden');
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
