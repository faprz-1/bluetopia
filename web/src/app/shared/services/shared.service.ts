import { EventEmitter, Injectable, NgZone } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public userProfileImageUpdated$: EventEmitter<Object> = new EventEmitter<Object>();
  public sidebarVisible: boolean;
  public sidebarVisibilitySubject: Subject<boolean> = new Subject<boolean>();

  public breadcrumbs: any[] = [];

  public toggleSidebarVisibilty() {
    this.sidebarVisible = !this.sidebarVisible;
    this.sidebarVisibilitySubject.next(this.sidebarVisible);
  }

  // Theming
  public maTheme: string;
  public maThemeSubject: Subject<string> = new Subject<string>();

  public setTheme(color: string) {
    this.maTheme = color
    this.maThemeSubject.next(this.maTheme)
    localStorage.setItem("theme", color);
  }

  constructor(private zone: NgZone) {
    // Hide the sidebar by default
    this.sidebarVisible = true

    // Set default theme
    let theme = localStorage.getItem("theme");
    if (!theme) {
      localStorage.setItem("theme", "teal");
      theme = "teal";
    }

    this.maTheme = theme
  }

  setBreadcrumbs(bread: any) {
    this.zone.run(() => {
      this.breadcrumbs = bread;
    });
  }
}
