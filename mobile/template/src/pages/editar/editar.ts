import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import { UserServiceProvider } from '../../providers/user/usersService';
/* import { TYPED_NULL_EXPR } from '@angular/compiler/src/output/output_ast'; */
import { PerfilPage } from '../index.paginas';

/**
 * Generated class for the EditarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editar',
  templateUrl: 'editar.html',
})
export class EditarPage {

  user = new User('id', 'nombre', 'apellidos', 'email', 'password', 'telefono', 'sexo', 'imgperfil', 'api_token');

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditarPage');

    let id = localStorage.getItem("idtemplate")

    this.userService.getUser(id).subscribe(
      data => {
        console.log('data:', data);
        this.user.id = data['id'];
        this.user.nombres = data['nombres'];
        this.user.apellidos = data['apellidos'];
        this.user.email = data['email'];
        this.user.telefono = data['telefono'];
        this.user.sexo = data['sexo'];
      },
      error => console.log(<any>error));
  }

  updateUser(user) {
    user.id = localStorage.getItem("idtemplate");
    this.userService.updateUser(user).subscribe(
      // tslint:disable-next-line:no-shadowed-variable
      user => {
        console.log(user);
        this.navCtrl.popTo(PerfilPage);
      },
      error => console.log(<any>error));

  }


}
