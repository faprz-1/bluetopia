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

  environment = environment;
  ngOnInit() {
    this.disableMenu();
   console.log("translate",this.translate);
   
  }

  public async OnLogin() {
    this.ShowLoading()
    if(this.dontClose){
      this.loginAccount.ttl= -1
    }else{
      delete this.loginAccount.ttl;
    }
    this.api.post("/Usuarios/login", this.loginAccount, false).subscribe(
      userToken => {
      this.GetUserCredentials(userToken);
      },
      error => this.HandleAPIError(error)
    )
  }
GetUserCredentials(token){
  this.userData.GetUserWithAPIToken(token).then(()=>{
    this.AfterSuccessfulLogin();
  },error => this.HandleAPIError(error))
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
   
    // if(this.userData.loggedUser.role.id == 2) {
    //   this.navController.navigateRoot('refounds')
    // } else {
      this.navController.navigateRoot('dashboard')
    // }
  }

  public goToUrl(url) {
    this.navController.navigateRoot(url);
  }
}
