import { Component, OnInit } from '@angular/core';
import { ComponentBase } from 'src/app/base/component-base';

import * as moment from 'moment';

class Account {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage extends ComponentBase implements OnInit {
  signupAccount: Account = new Account(); 

  ngOnInit() {
    this.disableMenu();
  }

  public async OnSignup() {
    if(! await this.isUserDataValid(this.signupAccount)){
      return;
    }
    this.ShowLoading()
    this.api.post("/Usuarios/register", this.signupAccount, false).subscribe(
      userToken => this.GetUserWithAPIToken(userToken),
      error => this.HandleAPIError(error)
    )
  }

  public async isUserDataValid(signupAccount : Account){
    if(this.signupAccount.password != this.signupAccount.repeatPassword){
      console.log("Too bad");
      this.ShowToast("Las contraseñas no coinciden");
      return false;
    }
    return true;
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
