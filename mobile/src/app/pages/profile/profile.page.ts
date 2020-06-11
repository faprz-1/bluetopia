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

  cards: any = [];

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
    this.loggedUser.imgperfil = this.loggedUser.profileImage != null ? this.api.getBaseURL() + this.loggedUser.profileImage.URL : 'assets/imgs/default_avatar.jpg';
    this.getCards();
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

  // public getCards() {
  //   let endpoint = "/conekta/getCards";

  //   this.api.post(endpoint,{cutomerId:this.loggedUser.customerId},true).subscribe(res => {
  //     this.cards = res;
  //   }, err => {
  //     console.log(err);
  //   });
  // }

  // public deleteCard(card) {
  //   let enpoint = "/conekta/deleteCard";

  //   this.api.post(enpoint,{cutomerId:this.loggedUser.customerId, cardId: card.id},true).subscribe( res => {
  //     this.getProfile();
  //   }, err => {
  //     this.errorAlert("No se pudo eliminar la tarjeta");
  //   });
  // }

}
