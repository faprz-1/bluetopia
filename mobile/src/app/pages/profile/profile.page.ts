import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import { LoadingService } from '../../services/loading.service';
import { ApiService } from '../../services/api.service';
import { ToastAlertService } from '../../services/toast-alert.service';
import { EventsService } from '../../services/events.service';
import { GetFileService } from '../../services/get-file.service';

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
    public getFile: GetFileService,
  ){}

  ngOnInit() {
    this.GetUser();
  }

  ionViewWillEnter() {
    this.GetUser();
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

  private async GetUser() {
    this.user = await this.api.GetUser();
  }

  goToSettings(){
    this.navController.navigateRoot('/settings');
  }
}
