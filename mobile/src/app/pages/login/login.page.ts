import { Component, OnInit } from '@angular/core';
import { ComponentBase } from 'src/app/base/component-base';

import * as moment from 'moment';
import { environment } from 'src/environments/environment';

class Account {
  email: string;
  password: string;
  ttl:number;
}
@Component({
  selector: 'template-login-page',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage extends ComponentBase implements OnInit {
  loginAccount: Account = new Account();
  dontClose : boolean = true;
  loggedUser:any;

  environment = environment;
  ngOnInit() {
    this.disableMenu();
  }

  public async OnLogin() {
    this.ShowLoading()
    if(this.dontClose){
      this.loginAccount.ttl= -1
    }else{
      delete this.loginAccount.ttl;
    }
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
      userFromServer => this.SaveUserData(userFromServer,token),
      error => this.HandleAPIError(error)     
    )
  }

  private async SaveUserData(userFromServer: JSON,token) {
    this.loggedUser = userFromServer;
    await this.storage.set("user", userFromServer)
    await this.storage.set("ttl", token)
    this.pushService.updatePushToken();
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
    
    // if(this.loggedUser.role.id == 2) {
      this.navController.navigateRoot('dashboard')
    // }
  }

  public goToUrl(url) {
    this.navController.navigateRoot(url);
  }
}
