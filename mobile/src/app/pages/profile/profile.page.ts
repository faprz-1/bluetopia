import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import { LoadingService } from '../../services/loading.service';
import { ApiService } from '../../services/api.service';
import { ToastAlertService } from '../../services/toast-alert.service';
import { EventsService } from '../../services/events.service';
import { GetImageService } from '../../services/get-image.service';

import { Storage } from "@ionic/storage";
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage   {
  public user: any;
  public size = "small";

  constructor(
    protected storage: Storage,
    protected navController: NavController,
    public api: ApiService,
    public userData: UserDataService,
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
    this.user = await this.api.GetUser();
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

private async saveProfilePic(newImage: any) {
    this.api.Post("/Usuarios/" + this.user.id + "/changeProfileImage",{ newImage: newImage }, true).subscribe((res: any) => {
      this.size = "";
      this.user.profileImage = res.profileImage;
      this.storage.set("user", this.user).then(() => {
        this.userData.GetUserWithAPIToken(this.api.token);
      });
    }, err => {
       this.toastAlert.ShowToast('Error al actualizar imagen de perfil', 3000);
    });
  }

  goToSettings(){
    this.navController.navigateRoot('/settings');
  }
}
