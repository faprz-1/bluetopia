import { Component } from '@angular/core';

import { Platform, NavController, MenuController, Events } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import * as moment from "moment";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public loggedUser : any;

  public menuItems = [
    {
      title: 'Inicio',
      url: '/dashboard',
      icon: 'home',
    },
    {
      title: 'Ajustes',
      url: '/settings',
      icon: 'settings'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private navController: NavController,
    private menuController: MenuController,
    private events: Events,
    private storage: Storage
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.storage.get('token').then((token)=>{
        if(token){
          this.storage.get("ttl").then((ttl)=>{ 
            if(ttl != null && moment().isSameOrAfter(ttl) ) {
              this.storage.clear()
              this.navController.navigateRoot('/login')
            }
            else {
              this.navController.navigateRoot('/dashboard')
            }
          });
        } else {
          this.navController.navigateRoot('/login')
        }
        this.statusBar.styleDefault();
        this.splashScreen.hide();
  
        this.getUserData();
        this.initializeEvents();
      })
    });
  }

  public goToUrl(url) {
    this.menuController.close();
    this.navController.navigateRoot(url);
  }

  public initializeEvents() {
    let _this = this;
    this.events.subscribe("user:logged", () => { _this.getUserData(); });
  }

  private async getUserData(data : any = null) {
    this.loggedUser = await this.storage.get("user");
  }
}
