import { Component } from '@angular/core';

import { Platform, NavController, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import * as moment from "moment";
import { PushService } from './services/push.service';
import { EventsService } from './services/events.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public loggedUser : any;

  public menuItemsUser = [
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

  public menuItemsAdmin = [
    {
      title: 'Inicio',
      url: '/dashboard',
      icon: 'home',
    },
    {
      title: 'Reembolsos',
      url: '/refounds',
      icon: 'cash',
    },
    {
      title: 'Ajustes',
      url: '/settings',
      icon: 'settings'
    }
  ];

  public menuItemsSuperUser = [
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
    private events: EventsService,
    private storage: Storage,
    private pushService: PushService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.pushService.startUpCOnfig();
      this.storage.get('token').then((token)=>{
        if(token){
          this.pushService.updatePushToken();
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
    this.events.getObservable("user:logged").subscribe((data) => {
        _this.getUserData();
    });
  }

  private async getUserData(data : any = null) {
    this.loggedUser = await this.storage.get("user");
    if(this.loggedUser != null) {
      if(this.loggedUser.role.id == 2) {
        this.navController.navigateRoot('/dashboard')
      }
    }
  }
}
