import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import { LoadingService } from '../../services/loading.service';
import { ApiService } from '../../services/api.service';
import { ToastAlertService } from '../../services/toast-alert.service';
import { EventsService } from '../../services/events.service';
import { GetImageService } from '../../services/get-image.service';

import { Storage } from "@ionic/storage";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage   {

  public loggedUser: any;

  constructor(
    protected storage: Storage,
    protected navController: NavController,
    public api: ApiService,
    protected loading: LoadingService,
    public toastAlert: ToastAlertService,
    public events: EventsService,
    public imageService: GetImageService,
  ){}

  ngOnInit() {
    this.getProfile();
  }

  async errorAlert(msn) {
    const alert = await this.toastAlert.alertController.create({
      header: 'Error',
      subHeader: '',
      message: msn,
      buttons: ['Aceptar']
    });

    await alert.present();
  }

  private async getProfile() {
    this.loggedUser = await this.storage.get("user");
  }
  async ShowChangeProfileImageOptions(){

    const actionSheet = await this.toastAlert.actionSheetController.create({
      header: 'Obtener imagen de:',
      buttons: [
        {
          text: 'Camara',
          icon: 'camera',
          handler: () => {
            this.updateProfilePhotoPic();
          }
        }, {
          text: 'Galeria',
          icon: 'images',
          handler: () => {
            this.updateProfileGalleryPic();
          }
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]
      });
      await actionSheet.present();
      
}
  async updateProfilePhotoPic(){
    let newImage = await this.imageService.takePicture();
    if( newImage){
      this.saveProfilePic(newImage);
    }
  }
  async updateProfileGalleryPic(){
    let newImage = await this.imageService.openGallery();
    if( newImage){
      this.saveProfilePic(newImage);
    }
  }

  private async saveProfilePic(newImage: any){

    this.api.post("/Usuarios/" + this.loggedUser.id + "/changeProfileImage", { newImage: newImage }, true).subscribe((res: any) => {
      this.loggedUser.profileImage = res.profileImage;
      this.loggedUser.imgperfil = this.loggedUser.profileImage != null ? this.api.getBaseURL() + this.loggedUser.profileImage.URL : this.api.getBaseURL()
      this.storage.set("user", this.loggedUser).then(() => {
        this.events.publish("user:updated", true);
      })
      this.loading.Dismiss()
    }, err => {
       this.toastAlert.ShowToast('Error al actualizar imagen de perfil', 3000)
       this.loading.Dismiss()
    });
  }

  goToSettings(){
    this.navController.navigateRoot('/settings');
  }


}
