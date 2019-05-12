import { Component } from '@angular/core';
import { LoadingController, MenuController, NavController } from 'ionic-angular';

import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { ApiProvider } from '../../providers';
import { Storage } from '@ionic/storage';
import { NotificationProvider } from '../../providers/notification/notification';
import { Events } from 'ionic-angular';

import * as moment from 'moment';

@Component({
  selector: 'social-media',
  templateUrl: 'social-media.html'
})
export class SocialMediaComponent {

	isLoggedIn:boolean = false;
	users: any;
	authToken: any
	procesando: boolean = false
	loading = this.loadingCtrl.create({content: 'Cargando...', dismissOnPageChange: true});

  constructor(
  		private fb: Facebook,
  		private api: ApiProvider,
  		private loadingCtrl: LoadingController,
  		private notiCtrl : NotificationProvider,
  		private storage: Storage,
  		private menuCtrl: MenuController,
  		public navCtrl: NavController,
  		public events: Events
  		) {}

  fbLogin(){
  	this.loading = this.loadingCtrl.create({content: 'Cargando...', dismissOnPageChange: true});
  	let user = { username : "", email : "", token : ""}
  	this.loading.present();

    this.fb.getLoginStatus().then((res) => {
    	console.log(res)
	    if (res.status === 'connected') {
	        // Already logged in to FB so pass credentials to provider (in my case firebase)
	        console.log(res.authResponse.accessToken)
	        console.log(res)
	        this.fb.api("/me?fields=name,email", []).then((data) => {

                user.username  = data.name;
                user.email = data.email;
                user.token = res.authResponse.accessToken;

                this.api.post('/Usuarios/loginBySocialMedia', user, false).subscribe(
			      (token: any)=>{
			      	console.log(token)  	
				    this.doLogin(token);
	
			      },(err: any)=>{
			      	console.log(err)
			      	this.loading.dismiss();
			      });

	            })
			    .catch((e) => {
			        console.log('Error logging 3', e);
			        this.loading.dismiss();
			    });
	        
	    } else {
        // Not already logged in to FB so sign in
        this.fb.login([ 'email'])
	    .then( (res: FacebookLoginResponse) => {
	    	console.log('RES', res)
	        if(res.status == "connected") {

	            var fb_id = res.authResponse.userID;
	            var fb_token = res.authResponse.accessToken;

	            this.fb.api("/me?fields=name,email", []).then((data) => {

		            user.username  = data.name;
	                user.email = data.email;
	                user.token = res.authResponse.accessToken;

	                this.api.post('/Usuarios/loginBySocialMedia', user, false).subscribe(
				      (token: any)=>{
				      	console.log(token)
				      	
				      	this.doLogin(token);
		
				      },(err: any)=>{
				      	console.log(err)
				      	this.loading.dismiss();
				      });

	            })
			    .catch((e) => {
			        console.log('Error logging 3', e);
			        this.loading.dismiss();
			    });

	        } 
	        else {
	            console.log("An error occurred...");
	            this.loading.dismiss();
	        }

	    })
	    .catch((e) => {
	        console.log('Error logging 2', e);
	        this.loading.dismiss();
	    });

	    }
	})
	.catch((e) => {
	        console.log('Error logging 1', e);
	        this.loading.dismiss();
	    });

  }

  doLogin(token) {
  	console.log('Tokeeen', token)
	this.storage.clear().then(()=>{
		this.storage.set("token",token.id);
		this.api.token= token.id;
		this.api.get("/Usuarios/withCredentials", true).subscribe((userFromServer: any)=>{
		  this.storage.set("user", userFromServer).then(()=>{
		    this.storage.set("ttl", moment().add(1209600, 's').toISOString()).then(() => {
		      this.loading.dismiss();
		      this.menuCtrl.enable(true);

		      this.notiCtrl.loadNotifications()
		      this.events.publish('user:logged', true);
		      this.navCtrl.setRoot('DashboardPage');
		    })
		  })
		})
    }, (error: any) => {
      console.log("error Override:", error);
      this.loading.dismiss();
    })
  }




}
