import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CambiarContrasenaPage, LoginPage} from '../index.paginas';
import {Http, Response} from  "@angular/http";
import { User } from '../../models/user';
import { UserServiceProvider } from '../../providers/user/usersService';
import { AuthGuardProvider } from '../../providers/auth-guard/auth-guard';
@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {
	user = new User ('id', 'nombre', 'apellidos', 'email', 'password', 'telefono', 'sexo','imgperfil','api_token');
	image = 'http://template3.test/laravel_5.6.9/public/';

  constructor(private authService:AuthGuardProvider, public navCtrl: NavController,
                  public navParams: NavParams, public userService:UserServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');

    let id=localStorage.getItem("idtemplate")

    this.userService.getUser(id).subscribe(
      data => {
        console.log ('data:',data);
        this.user.id = data['id'];
        this.user.nombres = data ['nombres'];
        this.user.apellidos = data ['apellidos'];
        this.user.email = data ['email'];
        this.user.password = data ['password'];
        this.user.telefono = data ['telefono'];
        this.user.sexo = data ['sexo'];
        this.user.imgperfil = data ['imgperfil'];
      },
      error => console.log(<any>error));
  }


  logout(){
  	localStorage.clear();
  	this.navCtrl.push(LoginPage);
  }

  ionViewCanEnter() {
  return this.authService.authenticated();
}

  }
