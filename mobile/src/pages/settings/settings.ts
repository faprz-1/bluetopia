import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, LoadingController, Nav, Events, ToastController } from 'ionic-angular';

import { Settings, ApiProvider } from '../../providers';
import { Storage } from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera';

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
  user: any;

  constructor(
    public navCtrl: NavController,
    public settings: Settings,
    public navParams: NavParams,
    public translate: TranslateService,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public api: ApiProvider,
    public storage: Storage,
    public nav: Nav,
    public modalCtrl: ModalController,
    public camera: Camera,
    public events: Events,
    public toastCtrl: ToastController
  ) {}

  passwordChangeModal() {
    let passChangeModal = this.modalCtrl.create('PasswordChangePage');
    passChangeModal.present();
  }

  updateProfilePic() {
    console.log("Updating Profile Pic")
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      sourceType: this.camera.PictureSourceType.CAMERA,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 1280,
      targetHeight: 720,
    }

    this.camera.getPicture(options).then((imageData) => {
      let loader = this.loadingCtrl.create({
        content: "Esperando a servidor..."
      });
      loader.present();
      let newImage = {
        profileImage: {
          base64ProfileImage: imageData,
          base64ProfileImageExtention: ".jpeg"
        }
      }
      this.api.post("/Usuarios/" + this.user.id + "/changeProfileImage", newImage).subscribe((res: any) => {
        this.user.profileImage = res.profileImage;
        this.user.imgperfil = this.user.profileImage != null ? this.api.baseURL + this.user.profileImage.URL : this.api.baseURL
        this.storage.set("user", this.user).then(() => {
          this.events.publish("UpdatedUser");
        })
        loader.dismiss();
      }, err => {
        let toast = this.toastCtrl.create({
          message: 'Error al actualizar imagen de perfil...',
          duration: 3000,
          position: 'bottom'
        });
        toast.present()
        loader.dismiss();
      });
    }, (err) => {
      // Handle error
      let toast = this.toastCtrl.create({
        message: 'No se pudo utilizar la camara...',
        duration: 3000,
        position: 'bottom'
      });
      toast.present()
      console.log("camera Error: ", err);
    });
  }


  logout() {
    this.alertCtrl.create({
      title: '¿Desea cerrar sesión?',
      buttons: [{
          text: 'Si',
          handler: data => {
            let loading = this.loadingCtrl.create({
              content: 'cargando...',
              dismissOnPageChange: true
            });
            loading.present();

            this.api.post("/Usuarios/logout", null, true).subscribe(() => {
              this.storage.clear().then(() => {
                loading.dismiss();
                this.nav.setRoot('LoginPage');
              })
            })
          }
        },
        {
          text: 'No',
          handler: data => {}
        }
      ]
    }).present();
  }
}
