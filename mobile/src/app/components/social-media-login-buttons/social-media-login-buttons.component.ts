import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Storage } from '@ionic/storage';

import { ComponentBase } from 'src/app/base/component-base';
import { NavController, AlertController, ToastController, ModalController, LoadingController, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'template-social-media-login-buttons',
  templateUrl: './social-media-login-buttons.component.html',
  styleUrls: ['./social-media-login-buttons.component.scss'],
})
export class SocialMediaLoginButtonsComponent {

  constructor(
    public  translate: TranslateService,
    private facebook: Facebook,
    private googlePlus: GooglePlus,
    private api: ApiService
  ) { 
  }

  @Output('onSocialLoginStart') 
  onSocialLoginStart : EventEmitter<void> = new EventEmitter();
  @Output('onSocialLoginSuccess') 
  onSocialLoginSuccess : EventEmitter<any> = new EventEmitter();
  @Output('onSocialLoginError') 
  onSocialLoginError : EventEmitter<any> = new EventEmitter();

  public async FacebookUserLogin() {
    this.onSocialLoginStart.emit();

    try {
      let currentLoginData = await this.facebook.getLoginStatus();

      if (currentLoginData.status === 'connected')
	      this.RetrieveExistingFacebookLoginData(currentLoginData.authResponse.accessToken);
      else {
        let newUserLoginData = await this.facebook.login(['email']);

        if(newUserLoginData.status == "connected")
          this.RetrieveExistingFacebookLoginData(newUserLoginData.authResponse.accessToken);
        else
          this.onSocialLoginError.emit("An error occurred...");
      }
    }
    catch(errorData) {
      this.onSocialLoginError.emit(errorData);
    }
  }

  public async GooglePlusUserLogin(){
    this.onSocialLoginStart.emit();

    try {
      let googleLoginData = await this.googlePlus.login({});
      this.LoginBySocialMedia(googleLoginData.displayName, googleLoginData.email, googleLoginData.accessToken);
    }
    catch(errorData) {
			this.onSocialLoginError.emit(errorData)
	  }
  }

  private async LoginBySocialMedia(username: string, email: string, socialToken: string) {
    let user = {
      username: username,
      email: email,
      token: socialToken
    }

    let token = await this.api.post('/Usuarios/loginBySocialMedia', user, false)
    this.onSocialLoginSuccess.emit(token)    
  }

  private async RetrieveExistingFacebookLoginData(token: string) {
    let userData = await this.facebook.api("/me?fields=name,email", []);
    this.LoginBySocialMedia(userData.name, userData.email, token);
  }


  // LoginToAPI(token) {
  //   this.storage.clear().then(()=>{
  //     this.storage.set("token",token.id);
  //     this.api.token= token.id;
  //     this.api.get("/Usuarios/withCredentials", true).subscribe((userFromServer: any)=>{
  //       this.storage.set("user", userFromServer).then(()=>{
  //         this.storage.set("ttl", moment().add(1209600, 's').toISOString()).then(() => {
  //           this.loading.dismiss();
  //           this.menuCtrl.enable(true);
  
  //           this.notiCtrl.loadNotifications()
  //           this.events.publish('user:logged', true);
  //           this.navCtrl.setRoot('DashboardPage');
  //         })
  //       })
  //     })
  //     }, (error: any) => {
  //       console.log("error Override:", error);
  //       this.loading.dismiss();
  //     })
  //   }
}