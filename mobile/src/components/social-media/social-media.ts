import { Component } from '@angular/core';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

@Component({
  selector: 'social-media',
  templateUrl: 'social-media.html'
})
export class SocialMediaComponent {

	isLoggedIn:boolean = false;
	users: any;
	authToken: any

  constructor(
  		private fb: Facebook
  		) {}

  fbLogin(){

    this.fb.getLoginStatus().then((res) => {
    	console.log(res)
	    if (res.status === 'connected') {
	        // Already logged in to FB so pass credentials to provider (in my case firebase)
	        console.log(res.authResponse.accessToken)
	        console.log(res)
	        this.fb.api("/me?fields=name,email", []).then((user) => {

	                // Get the connected user details

	                var name      = user.name;
	                var email     = user.email;

	                console.log("=== USER INFOS ===");

	                console.log("Name : " + name);
	                console.log("Email : " + email);

	                // => Open user session and redirect to the next page

	            })
			    .catch((e) => {
			        console.log('Error logging 3', e);
			    });
	        
	    } else {
        // Not already logged in to FB so sign in
        this.fb.login([ 'email'])
	    .then( (res: FacebookLoginResponse) => {
	    	console.log('RES', res)
	        // The connection was successful
	        if(res.status == "connected") {

	            // Get user ID and Token
	            var fb_id = res.authResponse.userID;
	            var fb_token = res.authResponse.accessToken;

	            // Get user infos from the API
	            this.fb.api("/me?fields=name,email", []).then((user) => {

	                // Get the connected user details

	                var name      = user.name;
	                var email     = user.email;

	                console.log("=== USER INFOS ===");

	                console.log("Name : " + name);
	                console.log("Email : " + email);

	                // => Open user session and redirect to the next page

	            })
			    .catch((e) => {
			        console.log('Error logging 3', e);
			    });

	        } 
	        // An error occurred while loging-in
	        else {

	            console.log("An error occurred...");

	        }

	    })
	    .catch((e) => {
	        console.log('Error logging 2', e);
	    });

	    }
	})
	.catch((e) => {
	        console.log('Error logging 1', e);
	    });

  }



}
