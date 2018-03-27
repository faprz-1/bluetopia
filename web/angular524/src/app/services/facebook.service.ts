  import { Injectable } from '@angular/core';
  import { AuthService, FacebookLoginProvider, GoogleLoginProvider } from 'angular5-social-login';
 import {UserService} from '../services/user.service';

  @Injectable()
  export class FacebookService {

    constructor( private socialAuthService: AuthService, private userService: UserService ) { }



    public socialSignIn(socialPlatform : string) {
      let socialPlatformProvider;
      if(socialPlatform == "facebook"){
        socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
      }else if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }

      return this.socialAuthService.signIn(socialPlatformProvider);
      // .then(
      //   (userData) => {
      //     console.log(socialPlatform+" sign in data : " , userData);
      //     // Now sign-in with userData
      //
      //   }
      // );
    }
}
