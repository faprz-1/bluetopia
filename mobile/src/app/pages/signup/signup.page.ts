import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';

import { MenuService } from '../../services/menu.service';
import { LoadingService } from '../../services/loading.service';
import { ApiService } from '../../services/api.service';
import { EventsService } from '../../services/events.service';
import { ToastAlertService } from '../../services/toast-alert.service';

import * as moment from 'moment';
import { UserDataService } from 'src/app/services/user-data.service';
import { Storage } from '@ionic/storage';

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
    public userData: UserDataService,
    public toastAlert: ToastAlertService,
    protected storage: Storage,
  ){}

  ngOnInit() {
    this.menu.Disable();

    this.signupForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^\\s*[-+.\\w]+@[-.\\w]+.[-.\\w]+\\s*$')
      ])),
      password: new FormControl('', Validators.required),
      repeatPassword: new FormControl('', Validators.required),
    });
  }

  public async OnSignup() {
    if (!this.signupForm.valid) return;
    if (this.signupForm.value.password != this.signupForm.value.repeatPassword){
      this.toastAlert.ShowToast("La contraseña no coincide")
      return;
    }
    this.api.Post("/Usuarios/register", this.signupForm.value, false).subscribe(
      userToken => this.GetUserWithAPIToken(userToken),
      error => this.api.HandleAPIError(error)
    )
  }

  public async GetUserWithAPIToken(token) {
    if(token) {
      await this.userData.GetUserWithAPIToken(token);
      await this.AfterSuccessfulSignup();
    }
  } 

  private async AfterSuccessfulSignup() {
    this.menu.Enable();
    this.navController.navigateRoot('dashboard');
  }

  public GoToUrl(url) {
    this.navController.navigateRoot(url);
  }

  public async OnSocialLoginStart() {
     this.loading.Show();
  }

  public async OnSocialLoginError(data) {
    this.toastAlert.ShowToast(data);
  }
}
