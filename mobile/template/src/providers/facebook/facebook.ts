import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { Platform } from 'ionic-angular';


@Injectable()
export class FacebookProvider {
  constructor(private fb: Facebook, private platform: Platform) {
  }
  //primero checamos
  checkLoginStatus(){
    let self =this;
    return new  Promise((resolve, reject) => {
       this.fb.getLoginStatus().then((res:any) => {
       if (res.status == 'connected') {
           console.log("Session");
           //si ya esta loggeado entonces pedimos la informacion
            self.getUserData(res.authResponse.userID).then((userData: any)=>{
              resolve(userData);
            }).catch(e =>{ console.log('Error checking status', e); reject(e);});
         }
         else{
           console.log("No Session");
           //si no esta loggeado entonces logueamos
           self.login().then((userData: any)=>{
            resolve(userData);
          }).catch(e =>{ console.log('Error checking status', e); reject(e);});
         }
      });
    });

  }
  getUserData(userID){
    //let self = this;
    return new  Promise((resolve, reject) => {
      //aqui definimos los campos que queremos obtener de facebook
      this.fb.api(userID+'/?fields=name,email', ['email', 'public_profile']).then((userData:any)=>{
        console.log(userData);
        resolve(userData);
      }).catch(e =>{ console.log('Error getting data from Facebook', e); reject(e);});
    });
  }
  login(){

  console.log("Logeando con facebook");
      if( !this.platform.is('cordova') ){
        return;
      }

    let self = this;
    return new  Promise((resolve, reject) => {
      //definimos que permisos debe tener la app
        this.fb.login(['public_profile', 'email'])
      .then((data: FacebookLoginResponse) =>{
        console.log('Logged into Facebook!');
          //una vez logueado pedimos la informacion
          self.getUserData(data.authResponse.userID).then((userData)=>{
            resolve(userData);
          });
      })
      .catch(e =>{ console.log('Error logging into Facebook', e); reject(e);});
    });
  }
  logout(){
    this.fb.logout().then(
        (logoutRes)=>{
            console.log(logoutRes);
        });
  }
}
