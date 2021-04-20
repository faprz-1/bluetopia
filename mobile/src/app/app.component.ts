import { Component, OnDestroy } from '@angular/core';

import { Platform, NavController, MenuController, LoadingController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';
import { ApiService } from './services/api.service';
import { LoadingService } from './services/loading.service';
import { Router } from '@angular/router';
import { UserDataService } from './services/user-data.service';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnDestroy {
  public user: any;
  public menuItemsUser: any[];
  private userChangedSub: Subscription;
  sizes: Array < String > = ['', 'avatar', 'thumb', 'small', 'medium', 'big'];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private navController: NavController,
    private router: Router,
    private menuController: MenuController,
    private storage: Storage,
    private api: ApiService,
    private userData: UserDataService,
    private loadingController: LoadingController,
    private loadingService: LoadingService,
    private translate: TranslateService,
  ) {
    this.InitializeApp();
  }

  ngOnDestroy() {
    if (this.userChangedSub) {
      this.userChangedSub.unsubscribe();
    }
  }

  async InitializeApp() {
    await this.platform.ready();
    await this.GetUserData();
    await this.InitializeLoadingElement();

    await this.storage.ready();
    await this.SetDefaultRoute();

    this.splashScreen.hide();
    this.statusBar.backgroundColorByHexString('006241');

    this.InitializeEvents();
    this.InitTranslate();
    this.InitializeMenu();
  }

  public async SetDefaultRoute() {
    const token = await this.api.GetToken();
    const ttlSeconds = this.api.ttl || await this.api.GetTTL();
    const ttlDate = moment().add(ttlSeconds, 'seconds');

    if (!token || !ttlSeconds || ttlSeconds > 0 && moment().isAfter(ttlDate)) {
      this.LogOut();
    } else if (this.router.url.startsWith('/login')) {
      this.router.navigate(['/tab']);
    }
  }

  private async LogOut() {
    try {
      await this.userData.LogOut();
    } catch {
      this.api.ClearStorage();
    }
    // this.router.navigate(['/login']); //Apple dice que los dejemos pasar :(
  }

  private async InitializeLoadingElement() {
    this.loadingService.Initialize(this.loadingController);
  }

  public GoToUrl(url) {
    this.menuController.close();
    this.navController.navigateRoot([url]);
  }

  public InitializeEvents() {
    this.userChangedSub = this.userData.loggedUser$
      .subscribe(() => this.GetUserData());
  }

  public PrepareImageUrl(file: any, name: any) {
    if (!file || !file.URL) {
      return "assets/img/no-image-found.png"
    }
    file.URL = this.GetFullUrl(file.URL);
    if (!file.resize) return file.URL;

    name = this.CheckSizeName(name);
    return this.AddSuffixToUrl(file.URL, name);
  }

  async InitializeMenu() {
    if (!this.user) this.user = await this.api.GetUser();
    if(!this.user) return;

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
    ].filter((item)=> item.role == this.user.role.name);
  }

  InitTranslate() {
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
      this.translate.use('es');
    }
  }

  private async GetUserData() {
    await this.userData.GetUserData();
  }

  private GetFullUrl(url: string) {
    if (!url.includes('https://') && !url.includes('http://')) {
      return this.api.baseURL + url;
    } else {
      return url;
    }
  }

  private CheckSizeName(name) {
    if (this.sizes.findIndex(size => size === name) === -1) {
      name = '';
    }
    return name;
  }

  private AddSuffixToUrl(url, name) {
    let newUrl = url.split('/').reverse();
    newUrl[0] = `${name}` + newUrl[0];
    newUrl = newUrl.reverse().join('/');
    return newUrl;
  }
}
