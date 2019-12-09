import { Component, OnInit } from '@angular/core';
import { ComponentBase } from 'src/app/base/component-base';

import * as moment from 'moment';

class Account {
  email: string;
  password: string;
}

@Component({
  selector: 'template-login-page',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage extends ComponentBase implements OnInit {
  loginAccount: Account = new Account();
  loggedUser:any;

  ngOnInit() {
    this.disableMenu();
  }

  public async OnLogin() {
    this.ShowLoading()
    this.api.post("/Usuarios/login", this.loginAccount, false).subscribe(
      userToken => this.GetUserWithAPIToken(userToken),
      error => this.HandleAPIError(error)
    )
  }

  public async GetUserWithAPIToken(token) {
    this.ShowLoading()
    await this.storage.clear()
    await this.api.setToken(token.id)

    this.api.get("/Usuarios/withCredentials", true).subscribe(
      userFromServer => this.SaveUserData(userFromServer),
      error => this.HandleAPIError(error)     
    )
  }

  private async SaveUserData(userFromServer: JSON) {
    this.loggedUser = userFromServer;
    console.log(this.loggedUser);
    
    await this.storage.set("user", userFromServer)
    await this.storage.set("ttl", moment().add(1209600, 's').toISOString())
    await this.AfterSuccessfulLogin()
  }  

  public async OnSocialLoginStart() {
    this.ShowLoading()
  }

  public async OnSocialLoginError(data) {
    this.ShowToast(data)
  }

  private async AfterSuccessfulLogin() {
    this.DismissLoading()
    this.enableMenu()
    this.events.publish('user:logged', true)
    if(this.loggedUser.role.id == 2) {
      this.navController.navigateRoot('refounds')
    } else {
      this.navController.navigateRoot('dashboard')
    }
  }

  public goToUrl(url) {
    this.navController.navigateRoot(url);
  }
}
