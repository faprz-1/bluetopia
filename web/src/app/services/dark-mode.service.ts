import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  public colorScheme: 'light'|'dark'|'default' = 'default';
  public colorScheme$ = new EventEmitter<void>();
  private colorSchemeKey: string = 'colorScheme';

  constructor(
    private themeDetection: ThemeDetection,
  ) {}  
  
  public async GetLogoUrl() {
    return (await this.IsEnabled()) ?
      '/assets/img/logo-dark.png' :
      '/assets/img/logo.png';
  }

  public async GetLogo2Url() {
    return (await this.IsEnabled()) ?
      '/assets/img/logo2-dark.png' :
      '/assets/img/logo2.png';
  }

  public async IsEnabled() {
    return this.colorScheme == 'default' ? 
      this.IsAppEnabled() :
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
    const colorScheme = localstorage.getItem(this.colorSchemeKey);
    this.colorScheme = colorScheme ? colorScheme : 'default';
    this.SelectColorScheme();
  }

  public async SelectColorScheme() {
    document.body.setAttribute('data-theme', this.colorScheme);
    localstorage.setItem(this.colorSchemeKey, this.colorScheme);
    this.colorScheme$.emit();
  }
}
