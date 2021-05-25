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
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.page.html',
  styleUrls: ['./password-change.page.scss'],
})
export class PasswordChangePage   implements OnInit {
  public changePassForm: FormGroup;
  public user: any;

  get doPasswordsMatch() {
    const form = this.changePassForm.value;
    return form.newPassword === form.repPassword;
  }

  constructor(
    protected navController: NavController,
    protected loading: LoadingService,
    protected storage: Storage,
    public menu: MenuService,
    protected events: EventsService,
    public api: ApiService,
    public userData: UserDataService,
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
    if (!this.changePassForm.valid || !this.doPasswordsMatch) {
      return;
    }
    
    if (this.CheckNewPasswrd()) {
      this.user = await this.api.GetUser();
      let userLogin = { 'email' : this.user.email, 'password' : this.changePassForm.value.newPassword }
      this.api.Post('/Usuarios/change-password', this.changePassForm.value).subscribe(
        output => this.login(userLogin),
        error => this.api.HandleAPIError(error)
      )
    }
  }

  public async login(data:any){
    this.loading.Show()
    this.api.Post("/Usuarios/login", data, false).subscribe(
      userToken => this.GetUserWithAPIToken(userToken),
      error => this.api.HandleAPIError(error)
    )
  }

  public async GetUserWithAPIToken(token) {
    this.loading.Show();
    if(token){
      this.userData.GetUserWithAPIToken(token)
      await this.AfterSuccessfulSignup();
    }else{

    }
  }

  private async AfterSuccessfulSignup() {
    this.menu.Enable();
    this.userData.loggedUser$.emit(true);
    this.navController.navigateRoot('dashboard');
  }

  private async CheckNewPasswrd() {
    if (this.changePassForm.value.newPassword != this.changePassForm.value.repPassword || this.changePassForm.value.newPassword == this.changePassForm.value.oldPassword) {
      this.toastAlert.ShowToast('Hubo un error al cambiar la contraseña. Por favor revise si no hay errores.', 3000)
      return false
    } else { return true }
  }

  goBack() {
    this.navController.back()
  }

}
