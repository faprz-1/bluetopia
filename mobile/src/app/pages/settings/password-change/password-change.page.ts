import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';

import { ApiService } from '../../../services/api.service';
import { NavController } from '@ionic/angular';
import { MenuService } from '../../../services/menu.service';
import { LoadingService } from '../../../services/loading.service';
import { EventsService } from '../../../services/events.service';
import { ToastAlertService } from '../../../services/toast-alert.service';

import * as moment from 'moment';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.page.html',
  styleUrls: ['./password-change.page.scss'],
})
export class PasswordChangePage   implements OnInit {

  public changePassForm: FormGroup;
  public user: any;

  constructor(
    protected navController: NavController,
    protected loading: LoadingService,
    protected storage: Storage,
    public menu: MenuService,
    protected events: EventsService,
    public api: ApiService,
    public toastAlert: ToastAlertService,
    ){}

  ngOnInit() {
    this.changePassForm = new FormGroup({
      oldPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', Validators.required),
      repPassword: new FormControl('', Validators.required)
    })
  }

  async OnSaved() {
    if (!this.changePassForm.valid) {
      return;
    }
    this.loading.Show()
    if (this.CheckNewPasswrd()) {
      await this.storage.get("user").then((user)=>{
        this.user = this.storage.get("user");
      })
      let userLogin = { 'email' : this.user.email, 'password' : this.changePassForm.value.newPassword }
      this.api.post('/Usuarios/change-password', this.changePassForm.value).subscribe(
        output => this.login(userLogin),
        error => this.api.HandleAPIError(error)
      )
    }
  }

  public async login(data:any){
    this.loading.Show()
    this.api.post("/Usuarios/login", data, false).subscribe(
      userToken => this.GetUserWithAPIToken(userToken),
      error => this.api.HandleAPIError(error)
    )
  }

  public async GetUserWithAPIToken(token) {
    this.loading.Show();
    await this.storage.clear();
    await this.api.setToken(token.id);

    this.api.get("/Usuarios/withCredentials", true).subscribe(
      userFromServer => this.SaveUserData(userFromServer,token),
      error => this.api.HandleAPIError(error)
    )
  }

  private async SaveUserData(userFromServer: JSON,token) {
    await this.storage.set("user", userFromServer);
    await this.storage.set("ttl", token);
    await this.AfterSuccessfulSignup();
  }

  private async AfterSuccessfulSignup() {
    this.loading.Dismiss();
    this.menu.Enable();
    this.events.publish('user:logged', true);
    this.navController.navigateRoot('dashboard');
  }

  private async CheckNewPasswrd() {
    if (this.changePassForm.value.newPassword != this.changePassForm.value.repPassword || this.changePassForm.value.newPassword == this.changePassForm.value.oldPassword) {
      this.toastAlert.ShowToast('Hubo un error al cambiar la contraseña. Por favor revise si no hay errores.', 3000)
      this.loading.Dismiss()
      return false
    } else { return true }
  }

  goBack() {
    this.navController.back()
  }

}
