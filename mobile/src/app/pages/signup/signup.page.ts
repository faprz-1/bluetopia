import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';

import { MenuService } from '../../services/menu.service';
import { LoadingService } from '../../services/loading.service';
import { ApiService } from '../../services/api.service';
import { EventsService } from '../../services/events.service';
import { ToastAlertService } from '../../services/toast-alert.service';

import * as moment from 'moment';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signupForm : FormGroup;

  constructor(
    protected navController: NavController,
    protected loading: LoadingService,
    public menu: MenuService,
    protected events: EventsService,
    public api: ApiService,
    public toastAlert: ToastAlertService,
    protected storage: Storage,
  ){}

  ngOnInit() {
    this.menu.Disable();

    this.signupForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      repeatPassword: new FormControl('', Validators.required),
    })
  }

  public async OnSignup() {
    if(!this.signupForm.valid)return;
    if(this.signupForm.value.password != this.signupForm.value.repeatPassword){
      this.toastAlert.ShowToast("La contraseña no coincide")
      return;
    }

     this.loading.Show()
    this.api.post("/Usuarios/register", this.signupForm.value, false).subscribe(
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

  public goToUrl(url) {
    this.navController.navigateRoot(url);
  }

  public async OnSocialLoginStart() {
     this.loading.Show();
  }

  public async OnSocialLoginError(data) {
    this.toastAlert.ShowToast(data);
  }
}
