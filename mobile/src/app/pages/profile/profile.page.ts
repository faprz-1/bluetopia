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

  private async getProfile() {
    this.loggedUser = await this.storage.get("user");
    this.loggedUser.imgperfil = this.loggedUser.profileImage != null ? this.api.getBaseURL() + this.loggedUser.profileImage.URL : 'assets/imgs/default_avatar.jpg'
  }

  async updateProfilePic(){
    let newImage = await this.takePicture();

    if(newImage!=null){
      await this.saveProfilePic(newImage)
    }
  }

  private async saveProfilePic(newImage: any){
    this.api.post("/Usuarios/" + this.loggedUser.id + "/changeProfileImage", newImage, true).subscribe((res: any) => {
      this.loggedUser.profileImage = res.profileImage;
      this.loggedUser.imgperfil = this.loggedUser.profileImage != null ? this.api.getBaseURL() + this.loggedUser.profileImage.URL : this.api.getBaseURL()
      this.storage.set("user", this.loggedUser).then(() => {
        this.events.publish("UpdatedUser");
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
