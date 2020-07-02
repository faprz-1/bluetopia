import { Component } from '@angular/core';

import { Platform, NavController, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import * as moment from "moment";
import { PushService } from './services/push.service';
import { EventsService } from './services/events.service';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public user : any;
  public menuItemsUser:any;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private navController: NavController,
    private menuController: MenuController,
    private events: EventsService,
    private storage: Storage,
    private api: ApiService,
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

  public goToUrl(url,type="push") {
    this.menuController.close();
    if(type=="push"){
      console.log("pushh");
      
      this.navController.navigateForward(url);
    }else{
      console.log("other");
      this.navController.navigateRoot(url);
    }
  }

  public initializeEvents() {
    let _this = this;
    this.events.getObservable("user:logged").subscribe((data) => {
        _this.getUserData();
    });
  }

  private async getUserData(data : any = null) {
    this.user = await this.storage.get("user");
    if(this.user != null) {
      if(this.user.role.name == "Admin" || this.user.role.name == "User") {
        this.navController.navigateRoot('/dashboard')
        this.InitializeMenu()
      }
    }
  }
  InitializeMenu(){
    this.menuItemsUser = [
      {
        title: 'Inicio',
        url: '/dashboard',
        icon: 'home',
        navigationType: 'root',
        role:"User"
      },
      {
        title: 'Ajustes',
        url: '/settings',
        icon: 'settings',
        navigationType: 'push',
        role: "User"
      }, 
      {
        title: 'Inicio',
        url: '/dashboard',
        icon: 'home',
        navigationType: 'root',
        role:"Admin"
      },
      {
        title: 'Reembolsos',
        url: '/refounds',
        icon: 'cash',
        navigationType: 'root',
        role:"Admin"
      },
      {
        title: 'buy-page',
        url: '/buy-page',
        icon: 'cart',
        navigationType: 'push',
        role:"Admin"
      },
      {
        title: 'Ajustes',
        url: '/settings',
        icon: 'settings',
        navigationType: 'push',
        role:"Admin"
      },
      {
        title: 'Inicio',
        url: '/dashboard',
        icon: 'home',
        navigationType: 'root',
        role:"SuperUser"
      },
      {
        title: 'Ajustes',
        url: '/settings',
        icon: 'settings',
        navigationType: 'push',
        role:"SuperUser"
      }
    ].filter((item)=>{
      return this.ShowItemMenu(item);
    });
  }
  ShowItemMenu(item){
    let found = false;
    if(this.user){
      if(this.user.role[0]){
        found = this.user.role.find((role)=>{
          return role.name == item.role
        })
      }else{
        return this.user.role.name == item.role
      }
    }
    return !!found
  }
  prepareURL(file: any, name: any) {
    var api = this.api;
    
    if (!file || !file.URL) {
      return "assets/img/no-image-found.png"
    }
    file.URL = this.GetFullUrl(file.URL, api);
    if (!file.resize) return file.URL

    name = this.CheckSizeName(name);
    return this.PepareUrlWithSufix(file.URL, name);

  }

  private GetFullUrl(url: string, api: any) {
    if (!(url.includes('https://') || url.includes('http://'))) {
      if (api) {
        if (api.hasOwnProperty('baseURL')) {
          url = api['baseURL'] + url;
        } else if (api.getBaseURL) {
          url = api['getBaseURL']() + url;
          console.log(api['getBaseURL'](),"this.debugMode",url);
        }
      }
    }
    return url;
  }
  sizes: Array < String > = ['', 'avatar', 'thumb', 'small', 'medium', 'big'];
  private CheckSizeName(name) {
    if (this.sizes.findIndex(size => size === name) === -1) {
      name = '';
    }
    return name;
  }

  private PepareUrlWithSufix(url, name) {
    let newUrl = url.split('/').reverse();
    newUrl[0] = `${name}` + newUrl[0];
    newUrl = newUrl.reverse().join('/');
    return newUrl;
  }
}
