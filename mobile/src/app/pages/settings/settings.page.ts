import { Component, OnInit } from '@angular/core';
import { ComponentBase } from 'src/app/base/component-base';
import { Storage } from "@ionic/storage";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage extends ComponentBase implements OnInit {

  public loggedUser: any;

  ngOnInit() {
    this.getProfile();
  }

  private async getProfile() {
    this.loggedUser = await this.storage.get("user");
    this.loggedUser.imgperfil = this.loggedUser.profileImage != null ? this.api.getBaseURL() + this.loggedUser.profileImage.URL : 'assets/imgs/default_avatar.jpg';
  }

  public openPasswordChangePage() {
    this.navController.navigateRoot('/settings/password-change');
  }

  public logout() {
    this.ShowPromptAlert(
      "¿Desea cerrar sesión?", 
      null, 
      'Si', 
      () => {
        console.log("ASD")
        this.storage.clear();
        this.DismissLoading();
        this.navController.navigateRoot('/login');

        this.ShowLoading();
        this.api.post("/Usuarios/logout", null, true).subscribe(async () => {
          // await this.storage.clear();
          // this.DismissLoading();
          // this.navController.navigateRoot('/login');
        })
      }, 
      'No', 
      () => {
        
      }
    )
  }

  public goToAddCard() {
    this.navController.navigateRoot('/settings/add-card')
  }
}
