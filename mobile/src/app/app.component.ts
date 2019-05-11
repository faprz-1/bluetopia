import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform, LoadingController, AlertController, MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Settings } from '../providers';
import { ApiProvider } from '../providers/api/api';
import { NotificationProvider } from '../providers/notification/notification';
import { PushProvider } from '../providers/push/push';
import { Events } from 'ionic-angular';

import * as moment from 'moment';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = 'LoginPage';

  @ViewChild(Nav) nav: Nav;

  pages:any=[]; 
  user:any=[]; 
// pages: any[] = [ 
//   { title: 'Tutorial', component: 'TutorialPage' }, 
//   { title: 'Welcome', component: 'WelcomePage' }, 
//   { title: 'Tabs', component: 'TabsPage' }, 
//   { title: 'Cards', component: 'CardsPage' }, 
//   { title: 'Content', component: 'ContentPage' }, 
//   { title: 'Login', component: 'LoginPage' }, 
//   { title: 'Signup', component: 'SignupPage' }, 
//   { title: 'Master Detail', component: 'ListMasterPage' }, 
//   { title: 'Settings', component: 'SettingsPage' }, 
//   { title: 'Search', component: 'SearchPage' }, 
//   { title: 'item-create', component: 'ItemCreatePage' } 
// ] 

  constructor(
    private translate: TranslateService, 
    private platform: Platform, 
    private settings: Settings, 
    private api: ApiProvider,
    private config: Config, 
    private statusBar: StatusBar, 
    private splashScreen: SplashScreen,
    private storage: Storage,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private notiServ: NotificationProvider,
    private menuCtrl: MenuController,
    private pushPrv : PushProvider,
    public events: Events,
    ) {
    this.initApp();
    this.initTranslate();
    this.initData(); 
    
    events.subscribe('user:logged', (user) => {
        this.initApp();
        this.initData(); 
      });
  } 


  initData(){ 
    console.log("va a leer storage"); 
    this.storage.get("user").then((user: any )=>{ 
      console.log("1",user,user!=null,null);
      if(user!=null){
        console.log("2",user);

        this.user= user; 
        console.log("leyendo storage user", this.user); 
        this.user.imgperfil = this.user.profileImage != null ? this.api.baseURL + this.user.profileImage.URL : 'assets/imgs/default_avatar.jpg'
        console.log("IMGPERF", this.user.imgperfil)
      }
    }, 
    err =>{ 
    }) 
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();

    if (browserLang) {
      if (browserLang === 'zh') {
        const browserCultureLang = this.translate.getBrowserCultureLang();

        if (browserCultureLang.match(/-CN|CHS|Hans/i)) {
          this.translate.use('zh-cmn-Hans');
        } else if (browserCultureLang.match(/-TW|CHT|Hant/i)) {
          this.translate.use('zh-cmn-Hant');
        }
      } else {
        this.translate.use(this.translate.getBrowserLang());
      }
    } else {
      this.translate.use('es'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  initApp(){
    this.platform.ready().then(() => {
      this.storage.get("token").then((token)=>{        

        if(token) {
          this.storage.get("ttl").then((ttl)=>{ 
            if(ttl != null && moment().isSameOrAfter(ttl) ) {
              this.storage.clear()
              this.nav.setRoot('LoginPage')
            }
            else {
              this.nav.setRoot('DashboardPage')
            }
          })
        }
        else {
          this.nav.setRoot('LoginPage')
        }
        
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        this.statusBar.styleDefault();
        this.splashScreen.hide();

        this.pushPrv.setMain(this); 
        console.log(this.pushPrv.pushObject) 
      })
    });
  }
}
