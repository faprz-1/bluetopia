import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { ToastAlertService } from '../../services/toast-alert.service';
import { LoadingService } from '../../services/loading.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage   implements OnInit {

  public loggedUser: any;

  constructor(
    protected navController: NavController,
    protected loading: LoadingService,
    protected storage: Storage,
    public api: ApiService,
    public toastAlert: ToastAlertService,
  ){}

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
    this.toastAlert.ShowPromptAlert(
      "¿Desea cerrar sesión?", 
      null, 
      'Si', 
      () => {
        this.storage.clear();
        this.loading.Dismiss();
        this.navController.navigateRoot('/login');

        this.loading.Show();
        this.api.post("/Usuarios/logout", null, true).subscribe(async () => { })
      }, 
      'No', 
      () => {
        
      }
    )
  }

}
