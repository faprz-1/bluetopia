import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { User } from '../../models/user';
import { UserServiceProvider } from '../../providers/user/usersService';
/* import { TYPED_NULL_EXPR } from '@angular/compiler/src/output/output_ast'; */
import { PerfilPage, LoginPage } from '../index.paginas';
import { AuthGuardProvider } from '../../providers/auth-guard/auth-guard';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserServiceProvider,
    public toastCtrl: ToastController, private authService: AuthGuardProvider, public alertCtrl: AlertController) {
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
        this.toastupdate('Datos modificados');
      },
      error => console.log(<any>error));

  }

  toastupdate(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 2500
    });
    toast.present();
  }

  delete(id){
    this.userService.deleteUser(id)
      .subscribe(
        // tslint:disable-next-line:no-shadowed-variable
        id => {
          console.log("Usuario Eliminado");
          this.showAlert();
          localStorage.clear();
          this.authService.logout();
          this.navCtrl.setRoot(LoginPage);
        },
        error => console.log(<any>error));
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Eliminado',
      subTitle: '!Su cuenta ha sido correctamente eliminada!',
      buttons: ['Ok']
    });
    alert.present();
  }


}
