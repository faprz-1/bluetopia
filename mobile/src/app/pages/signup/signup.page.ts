import { Component, OnInit } from '@angular/core';
import { ComponentBase } from 'src/app/base/component-base';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import * as moment from 'moment';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage extends ComponentBase implements OnInit {
  signupForm : FormGroup;

  ngOnInit() {
    this.disableMenu();

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
      this.ShowToast("La contraseña no coincide")
      return;
    }

    this.ShowLoading()
    this.api.post("/Usuarios/register", this.signupForm.value, false).subscribe(
      userToken => this.GetUserWithAPIToken(userToken),
      error => this.HandleAPIError(error)
    )
  }

  public async GetUserWithAPIToken(token) {
    this.ShowLoading();
    await this.storage.clear();
    await this.api.setToken(token.id);

    this.api.get("/Usuarios/withCredentials", true).subscribe(
      userFromServer => this.SaveUserData(userFromServer),
      error => this.HandleAPIError(error)
    )
  }

  private async SaveUserData(userFromServer: JSON) {
    await this.storage.set("user", userFromServer);
    await this.storage.set("ttl", moment().add(1209600, 's').toISOString());
    await this.AfterSuccessfulSignup();
  }  

  private async AfterSuccessfulSignup() {
    this.DismissLoading();
    this.enableMenu();
    this.events.publish('user:logged', true);
    this.navController.navigateRoot('dashboard');
  }

  public goToUrl(url) {
    this.navController.navigateRoot(url);
  }

  public async OnSocialLoginStart() {
    this.ShowLoading();
  }

  public async OnSocialLoginError(data) {
    this.ShowToast(data);
  }
}
