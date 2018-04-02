import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { RegistrarsePage, RecuperarContrasenaPage, PerfilPage } from '../index.paginas';
import { NgForm} from '@angular/forms';
import { UserServiceProvider } from '../../providers/user/usersService';
import { FacebookProvider } from '../../providers/facebook/facebook';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  registrarse:any = RegistrarsePage;
  recu_contra:any = RecuperarContrasenaPage;
  perfil:any = PerfilPage;

  constructor(private facebookProvider: FacebookProvider, public navCtrl: NavController, public navParams: NavParams, public userService: UserServiceProvider) {}


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(user){
  		console.log(user);
  		this.userService.logUser(user)
  		.subscribe(
      user =>{
        console.log(user);
   /*      let userid=user.id;
        let tkn = user.api_token;
        localStorage.setItem("tkntemplate", tkn);
        localStorage.setItem("idtemplate", userid);
        this.navCtrl.push(PerfilPage); */
      },
      error => console.log(<any>error));
  	}


  loginFacebook(facebook){
    console.log(facebook);
    this.facebookProvider.login()
    .then(socialUser =>{
          console.log("socialUser:");
          console.log(socialUser);
          this.userService.logSocialUser(socialUser)
        .subscribe(
          user =>{
            console.log(user);
        /*    let userid=user.id;
            let tkn = user.api_token;
            localStorage.setItem("tkntemplate", tkn);
            localStorage.setItem("idtemplate", userid);
            this.router.navigate(['/perfil/'+userid]);*/
          },
          error => console.log(<any>error));
        },
        error => console.log(<any>error));
        }

  }
