import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, NavController, App} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage, AdminPage, PerfilPage } from '../pages/index.paginas';
import { AuthGuardProvider } from '../providers/auth-guard/auth-guard';
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

  constructor(private authService:AuthGuardProvider, 
    private menuCtrl: MenuController, 
    private platform: Platform,                
    private statusBar: StatusBar, 
    private splashScreen: SplashScreen,
    private api: ApiProvider,
    private app: App) {
    this.api.ready().then((e)=>{
      console.log("api provider ready: ", e);
    })
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.authService.testkn();
    console.log('testkn: ', this.authService.testkn());
    
  }


  abrirPagina( pagina: any ){
  this.rootPage = pagina;
  this.menuCtrl.close();
  }

  cerrar(){
    this.authService.logout();
    /* this.rootPage = this.login;  */  
    this.navCtrl.setRoot(LoginPage);
    this.menuCtrl.close();
  }
}
