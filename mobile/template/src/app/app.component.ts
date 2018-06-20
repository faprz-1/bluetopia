import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, NavController, AlertController, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage, AdminPage, PerfilPage } from '../pages/index.paginas';
import { Storage } from '@ionic/storage';
import { ApiProvider } from '../providers/api/api';


/* import { AdminPage } from '../pages/admin/admin';
import { LoginPage } from '../pages/login/login';
 */
@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild('mycontent') navCtrl: NavController
    login = LoginPage;
    perfil = PerfilPage;
    adm = AdminPage;

  /* rootPage:any = AdminPage; */
  /* rootPage:any = PerfilPage; */
  rootPage:any = LoginPage;

  constructor(
    private menuCtrl: MenuController, 
    private platform: Platform,                
    private statusBar: StatusBar, 
    private splashScreen: SplashScreen,
    private storage: Storage,
    public alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private api: ApiProvider) {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.storage.get("token").then((token)=>{
        if (!token)
          this.abrirPagina(LoginPage);
        else{
          this.storage.get("user").then((user)=>{
            if(user.role.name == "Admin")
              this.abrirPagina(AdminPage)
            else
              this.abrirPagina(PerfilPage)
          });
        }
      });
    });    
  }


  abrirPagina( pagina: any ){
    this.rootPage = pagina;
    this.menuCtrl.close();
  }

  cerrar(){
    this.alertCtrl.create({
      title: '¿Desea cerrar sesión?',
      buttons: [
        {
          text: 'Si',
          handler: data => {
            let loading = this.loadingCtrl.create({content: 'cargando...', dismissOnPageChange: true});
            loading.present();
            this.api.post("/Usuarios/logout",null,true).subscribe(()=>{
              this.storage.clear().then(()=>{
                loading.dismiss();
                this.menuCtrl.close();
                this.navCtrl.setRoot(LoginPage);
              })
            })
          }
        },
        {
          text: 'No',
          handler: data => {
          }
        }
      ]
    }).present();
  }
}
