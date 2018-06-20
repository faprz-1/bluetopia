import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { PerfilPage, LoginPage } from '../index.paginas';

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

  user:any = {};

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public toastCtrl: ToastController, 
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditarPage');

    let id = localStorage.getItem("idtemplate")
  }

  updateUser(user) {
    user.id = localStorage.getItem("idtemplate");
  }

  toastupdate(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 2500
    });
    toast.present();
  }

  deleteConfirm(id) {
    let confirm = this.alertCtrl.create({
      title: 'Eliminar cuenta',
      message: '¿Realmente desea eliminar su cuenta?',
      buttons: [
        {
          text: 'Si',
          handler: () => {
            this.delete(id);
          }
        },
        {
          text: 'No',
          handler: () => {
            console.log('No');
          }
        }
      ]
    });
    confirm.present();
  }

  delete(id){
    
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Eliminado',
      subTitle: '!Su cuenta ha sido eliminada!',
      buttons: ['Ok']
    });
    alert.present();
  }


}
