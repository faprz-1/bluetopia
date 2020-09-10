import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';

import { MenuService } from '../../services/menu.service';
import { LoadingService } from '../../services/loading.service';
import { ApiService } from '../../services/api.service';
import { PushService } from '../../services/push.service';
import { EventsService } from '../../services/events.service';
import { ToastAlertService } from '../../services/toast-alert.service';

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
export class LoginPage implements OnInit {
  loginAccount: Account = new Account();
  dontClose : boolean = true;
  loggedUser:any;

  environment = environment;

  constructor(
    protected navController: NavController,
    protected loading: LoadingService,
    public menu: MenuService,
    protected events: EventsService,
    public api: ApiService,
    public pushService: PushService,
    public toastAlert: ToastAlertService,
    public translate: TranslateService,
    protected storage: Storage
  ){}

  ngOnInit() {
    this.menu.Disable();
   console.log("translate",this.translate);
   
  }

  public async OnLogin() {
     this.loading.Show()
    if(this.dontClose){
      this.loginAccount.ttl= -1
    }else{
      delete this.loginAccount.ttl;
    }
    this.api.post("/Usuarios/login", this.loginAccount, false).subscribe(
      userToken => this.GetUserWithAPIToken(userToken),
      error => this.api.HandleAPIError(error)
    )
  }

  public async GetUserWithAPIToken(token) {
     this.loading.Show()
    await this.storage.clear()
    await this.api.setToken(token.id)

    this.api.get("/Usuarios/withCredentials", true).subscribe(
      userFromServer => this.SaveUserData(userFromServer,token),
      error => this.api.HandleAPIError(error)     
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
     this.loading.Show()
  }

  public async OnSocialLoginError(data) {
    this.toastAlert.ShowToast(data)
  }

  private async AfterSuccessfulLogin() {
    this.loading.Dismiss()
    this.menu.Enable()
    this.events.publish('user:logged', true)
    
    // if(this.loggedUser.role.id == 2) {
      this.navController.navigateRoot('dashboard')
    // }
  }

  public goToUrl(url) {
    this.navController.navigateRoot(url);
  }
}
