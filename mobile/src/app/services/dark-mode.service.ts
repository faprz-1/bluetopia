import { Injectable, EventEmitter } from '@angular/core';
import { ThemeDetection } from '@ionic-native/theme-detection/ngx';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  public colorScheme: 'light'|'dark'|'default' = 'default';
  public colorScheme$ = new EventEmitter<void>();
  private colorSchemeKey: string = 'colorScheme';

  constructor(
    private themeDetection: ThemeDetection,
    private platform: Platform,
    private storage: Storage,
  ) {}  
  
  public async GetLogoUrl() {
    return (await this.IsEnabled()) ?
      '/assets/img/logo-dark.png' :
      '/assets/img/logo.png';
  }

  public async IsEnabled() {
    let enabled = false;
    if (this.platform.is('cordova')) {
      enabled = await this.IsCordovaEnabled();
    } else {
      enabled = this.IsAppEnabled();
    }

    return this.colorScheme == 'default' ? 
      enabled :
      this.colorScheme == 'dark';
  }

  private async IsCordovaEnabled() {
    try {
      const ionicDarkModeEnabled = (await this.themeDetection.isDarkModeEnabled()).value;
      return ionicDarkModeEnabled || this.IsAppEnabled();
    } catch {
      return this.IsAppEnabled();
    }
  }

  private IsAppEnabled() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  public async CheckDarkMode() {
    const colorScheme = await this.storage.get(this.colorSchemeKey);
    this.colorScheme = colorScheme ? colorScheme : 'default';
    this.SelectColorScheme();
  }

  public async SelectColorScheme() {
    document.body.setAttribute('data-theme', this.colorScheme);
    await this.storage.set(this.colorSchemeKey, this.colorScheme);
    this.colorScheme$.emit();
  }
}
