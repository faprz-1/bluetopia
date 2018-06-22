import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, LoadingController } from 'ionic-angular'; 
import { RegistrarsePage, RecuperarContrasenaPage, PerfilPage } from '../index.paginas';
import { Storage } from '@ionic/storage';
import { ApiProvider } from '../../providers/api/api';
import { AdminPage } from '../admin/admin';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user: any;
  registrarse:any = RegistrarsePage;
  recu_contra:any = RecuperarContrasenaPage;
  perfil:any = PerfilPage;
  rootPage: any;

  constructor(
    private navCtrl: NavController,
    private api: ApiProvider,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private storage: Storage) { 

    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(user){
    let loading = this.loadingCtrl.create({content: 'autenticando...', dismissOnPageChange: true});
    loading.present();
    this.api.post("/Usuarios/login", user, false).subscribe((token: any) =>{
      this.storage.clear().then(()=>{
        this.storage.set("token",token.id)
        this.api.token= token.id;
        this.api.get("/Usuarios/withCredentials", true).subscribe((userFromServer: any)=>{
          this.storage.set("user", userFromServer).then(()=>{
            loading.dismiss();
            if(userFromServer.role.name == "Admin")
              this.navCtrl.setRoot(AdminPage)
            else
              this.navCtrl.setRoot(PerfilPage)
          })
        })
      })
    }, (error: any) => {
      console.log("error Override:", error);
      
      this.showAlert()
    })
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Acceso Denegado',
      subTitle: '!No se ha iniciado sesión correctamente!',
      buttons: ['Ok']
    });
    alert.present();
  }

  }
