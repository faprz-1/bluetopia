import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular'; 
import { RegistrarsePage, RecuperarContrasenaPage, PerfilPage } from '../index.paginas';
/* import { NgForm} from '@angular/forms'; */
import { UserServiceProvider } from '../../providers/user/usersService';
import { FacebookProvider } from '../../providers/facebook/facebook';
import { AuthGuardProvider } from '../../providers/auth-guard/auth-guard'; 
import { MyApp } from "../../app/app.component";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  registrarse:any = RegistrarsePage;
  recu_contra:any = RecuperarContrasenaPage;
  perfil:any = PerfilPage;
  rootPage: any;

  constructor(private authService: AuthGuardProvider, private menuCtrl: MenuController, private facebookProvider: FacebookProvider, public navCtrl: NavController,
              public navParams: NavParams, public userService: UserServiceProvider) { } 

  mostrarMenu() {
    this.menuCtrl.toggle();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(user){
    this.authService.login();
    console.log(user);
    this.userService.logUser(user)
    .subscribe(
      user =>{
        console.log(user);
        let userid=user.id;
        let tkn = user.api_token;
        localStorage.setItem("tkntemplate", tkn);
        localStorage.setItem("idtemplate", userid);
        this.navCtrl.push(PerfilPage);
        this.navCtrl.remove(1);
      },
      error => console.log(<any>error));
    }
    
  /* nextPage() {
    this.navCtrl.push('PerfilPage').catch(err => {
      let alert = this.alertCtrl.create({
        title: 'Entrada proibida!',
        subTitle: 'Você não passará',
        buttons: ['Entendi']
      });
      alert.present();
    });

    this.navCtrl.push('AdminPage').catch(err => {
      let alert = this.alertCtrl.create({
        title: 'Entrada proibida!',
        subTitle: 'Você não passará',
        buttons: ['Entendi']
      });
      alert.present();
    });

  } */

  isAuthenticated() {
    return this.authService.authenticated();
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
           let userid=user.id;
            let tkn = user.api_token;
            localStorage.setItem("tkntemplate", tkn);
            localStorage.setItem("idtemplate", userid);
            this.navCtrl.setRoot(PerfilPage);
          },
          error => console.log(<any>error));
        },
        error => console.log(<any>error));
        }

  }
