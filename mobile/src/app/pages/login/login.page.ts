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
import { UserDataService } from 'src/app/services/user-data.service';

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

  environment = environment;

  constructor(
    protected navController: NavController,
    protected loading: LoadingService,
    public menu: MenuService,
    protected events: EventsService,
    public api: ApiService,
    public pushService: PushService,
    public toastAlert: ToastAlertService,
    public userData: UserDataService,
    public translate: TranslateService,
    protected storage: Storage
  ){}

  ngOnInit() {
    this.menu.Disable();
   
  }

  public async OnLogin() {
    this.loginAccount.ttl = this.dontClose ? -1 : undefined;
    this.api.Post("/Usuarios/login", this.loginAccount, false).subscribe(
      userToken => this.GetUserCredentials(userToken),
      error => this.api.HandleAPIError(error)
    )
  }

  GetUserCredentials(token){
    this.userData.GetUserWithAPIToken(token).then(()=>{
      this.AfterSuccessfulLogin();
    },error => this.api.HandleAPIError(error))
  }

  public async OnSocialLoginStart() {
     this.loading.Show()
  }

  public async OnSocialLoginError(data) {
    this.toastAlert.ShowToast(data)
  }

  private async AfterSuccessfulLogin() {
    this.menu.Enable();
    this.navController.navigateRoot('dashboard');
  }

  public GoToUrl(url) {
    this.navController.navigateRoot(url);
  }
}
