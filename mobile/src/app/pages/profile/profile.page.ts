import { Component, OnInit } from '@angular/core';
import { ComponentBase } from 'src/app/base/component-base';
import { Storage } from "@ionic/storage";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage extends ComponentBase {

  public loggedUser: any;


  ngOnInit() {
    this.getProfile();
  }

  async errorAlert(msn) {
    const alert = await this.alertController.create({
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

    const actionSheet = await this.actionSheetController.create({
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
        this.events.publish("user:updated");
      })
      this.DismissLoading()
    }, err => {
       this.ShowToast('Error al actualizar imagen de perfil', 3000)
       this.DismissLoading()
    });
  }

  goToSettings(){
    this.navController.navigateRoot('/settings');
  }


}
