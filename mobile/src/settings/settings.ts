import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, LoadingController, Nav } from 'ionic-angular';

import { Settings, ApiProvider } from '../../providers';
import { Storage } from '@ionic/storage';

/**
 * The Settings page is a simple form that syncs with a Settings provider
 * to enable the user to customize settings for the app.
 *
 */
@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  constructor(
    public navCtrl: NavController,
    public settings: Settings,
    public navParams: NavParams,
    public translate: TranslateService,
    public alertCtrl:AlertController,
    public loadingCtrl:LoadingController,
    public api:ApiProvider,
    public storage:Storage,
    public nav: Nav,
    public modalCtrl : ModalController
  ) { }

  passwordChangeModal() {
    let passChangeModal = this.modalCtrl.create('PasswordChangePage');
    passChangeModal.present();
  }


  logout(){
    this.alertCtrl.create({
      title: '¿Desea cerrar sesión?',
      buttons: [
        {
          text: 'Si',
          handler: data => {
            let loading = this.loadingCtrl.create({content: 'cargando...', dismissOnPageChange: true});
            loading.present();
            this.api.post("/Usuarios/logout",null,true).subscribe(()=>{
              this.storage.clear().then(()=>{
                loading.dismiss();
                this.nav.setRoot('LoginPage');
              })
            })
          }
        },
        {
          text: 'No',
          handler: data => {
          }
        }
      ]
    }).present();
  }
}
