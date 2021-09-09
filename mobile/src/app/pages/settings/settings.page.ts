import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { ToastAlertService } from '../../services/toast-alert.service';
import { UserDataService } from '../../services/user-data.service';
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
    private userData: UserDataService,
  ){}

  ngOnInit() {
    this.GetUser();
  }

  private async GetUser() {
    this.loggedUser = this.userData.loggedUser;
  }

  public OpenPasswordChangePage() {
    this.navController.navigateRoot('/settings/password-change');
  }

  public LogOut() {
    this.toastAlert.ShowPromptAlert(
      "¿Desea cerrar sesión?", 
      null, 
      'Si', 
      async () => {
        await this.userData.LogOut();
        this.navController.navigateRoot('/login');
      }, 
      'No', 
      () => undefined,
    );
  }

}
