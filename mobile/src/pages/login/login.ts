import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, MenuController, LoadingController, AlertController } from 'ionic-angular';

import { User, ApiProvider } from '../../providers';
import { MainPage } from '../';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { email: string, password: string } = {
    email: '',
    password: ''
  };

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    private menuCtrl: MenuController,
    private api: ApiProvider,
    private storage: Storage,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController) {
    this.menuCtrl.enable(false)
  }

  // Attempt to login in through our User service
  doLogin() {
    let loading = this.loadingCtrl.create({content: 'autenticando...', dismissOnPageChange: true});
    loading.present();
    this.api.post("/Usuarios/login", this.account, false).subscribe((token: any) =>{
      this.storage.clear().then(()=>{
        this.storage.set("token",token.id);
        this.api.token= token.id;
        this.api.get("/Usuarios/withCredentials", true).subscribe((userFromServer: any)=>{
          this.storage.set("user", userFromServer).then(()=>{
            loading.dismiss();
            // if(userFromServer.role.name == "Admin") return this.errorLogin("Este usuario no es conductor")
            this.navCtrl.setRoot('DashboardPage');
          })
        })
      })
    }, (error: any) => {
      console.log("error Override:", error);
      loading.dismiss();
      this.errorLogin();
    })
  }

  errorLogin(msg = null){
    this.storage.clear().then(()=>{
      let alert = this.alertCtrl.create({
        title: 'Acceso Denegado',
        subTitle: msg? msg : 'No se ha iniciado sesión correctamente',
        buttons: ['Ok']
      });
      alert.present();
    })
  }
}
