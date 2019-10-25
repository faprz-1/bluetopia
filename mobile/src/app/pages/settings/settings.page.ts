import { Component, OnInit } from '@angular/core';
import { ComponentBase } from 'src/app/base/component-base';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage extends ComponentBase {

  public openPasswordChangePage() {
    this.navController.navigateRoot('/settings/password-change')
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
}
