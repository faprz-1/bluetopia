import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Storage } from '@ionic/storage';

import { ComponentBase } from 'src/app/base/component-base';
import { NavController, AlertController, ToastController, ModalController, LoadingController, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { SignInWithApple, AppleSignInResponse, AppleSignInErrorResponse, ASAuthorizationAppleIDRequest } from '@ionic-native/sign-in-with-apple/ngx';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'template-social-media-login-buttons',
  templateUrl: './social-media-login-buttons.component.html',
  styleUrls: ['./social-media-login-buttons.component.scss'],
})
export class SocialMediaLoginButtonsComponent {

  loginType:any="";
  isApple: boolean = false;

  constructor(
    public  translate: TranslateService,
    private facebook: Facebook,
    private googlePlus: GooglePlus,
    private signInWithApple: SignInWithApple,
    private platform: Platform,
    private api: ApiService
  ) {
    if(this.platform.is('ios')){
      this.isApple = true;
    };
  }

  @Output('onSocialLoginStart') 
  onSocialLoginStart : EventEmitter<void> = new EventEmitter();
  @Output('onSocialLoginSuccess') 
  onSocialLoginSuccess : EventEmitter<any> = new EventEmitter();
  @Output('onSocialLoginError') 
  onSocialLoginError : EventEmitter<any> = new EventEmitter();

  public async FacebookUserLogin() {
    this.loginType = "Facebook";
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
    this.loginType = "Google";
    this.onSocialLoginStart.emit();

    try {
      let googleLoginData = await this.googlePlus.login({});
      this.LoginBySocialMedia({name:googleLoginData.displayName, email:googleLoginData.email, token:googleLoginData.accessToken});
    }
    catch(errorData) {
			this.onSocialLoginError.emit(errorData)
	  }
  }

  private async LoginBySocialMedia(user,socialMediaUserId?) {
 
    user.loginType = this.loginType
    if(socialMediaUserId){
      user.socialMediaId = socialMediaUserId;
    }

    this.api.post('/Usuarios/loginBySocialMedia', user, false).subscribe((token) => {
      console.log("token success", token);
        this.onSocialLoginSuccess.emit(token)
    }, (err) => {
      this.onSocialLoginError.emit(err);
    }) 
  }

  private async RetrieveExistingFacebookLoginData(token: string) {
    let user = {
      username: "",
      email: "",
      token: "",
      firstName: "",
      lastName: "",
      loginType: "Facebook",
      profileImageUrl: ""
    };
    let userData = await this.facebook.api("/me?fields=name,email,first_name,last_name,id", []);
    let userName = `${userData.first_name.toLowerCase().replace(".", "")}.${userData.last_name.toLowerCase().replace(".", "")}`;
    userName = userName.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    userName = userName.replace(/\s/g, "_");
    user.firstName = userData.first_name;
    user.lastName = userData.last_name;
    user.username = userName;
    user.email = userData.email;
    user.token = token;
    this.LoginBySocialMedia(user,userData.id);
  }

  public async AppleUserLogin(){
    this.loginType = "Apple";
    this.onSocialLoginStart.emit();
  
    this.signInWithApple.signin({
      requestedScopes: [
        ASAuthorizationAppleIDRequest.ASAuthorizationScopeFullName,
        ASAuthorizationAppleIDRequest.ASAuthorizationScopeEmail
      ]
    })
    .then((res: AppleSignInResponse) => {
      this.LoginBySocialMedia({name:res.fullName.givenName, email:res.email, token:res.user});
    })
    .catch((error: AppleSignInErrorResponse) => {
      alert(error.code + ' ' + error.localizedDescription);
      console.error("Error tomando datos",error);
    });
  }

}
