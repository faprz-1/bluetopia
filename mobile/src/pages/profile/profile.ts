import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ToastController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ApiProvider } from '../../providers';
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  user : any

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public storage : Storage, 
    public api : ApiProvider,
    public camera: Camera,
    public events: Events,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController
    ) {
    this.storage.get("user").then((user: any )=>{ 
      if(user!=null){
        this.user= user; 
        this.user.imgperfil = this.user.profileImage != null ? this.api.baseURL + this.user.profileImage.URL : 'assets/imgs/default_avatar.jpg'
      }
    }) 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  gotoSettings() {
    this.navCtrl.setRoot('SettingsPage')
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

}
