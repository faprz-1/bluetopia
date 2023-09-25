import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  user: any = null;
  routes: Array<string> = [];

  constructor(
    private router: Router,
    private api: ApiService
  ) {
    this.routes = JSON.parse(localStorage.getItem('routes') || '[]');
  }

  private HasInitialSlash(route: string): boolean {
    if(!route) return false;
    return route.charAt(0) == '/';
  }

  public GoToUserRoute(route: string) {
    this.user = this.api.GetUser();
    if(!this.user) return;
    if(this.user && this.user.role && !route.includes(this.user.role.name.toLowerCase())) {
      this.GoTo(`/inicio/${this.user.role.name.toLowerCase()}${this.HasInitialSlash(route) ? '' : '/'}${route}`);
    }
    else this.GoTo(`${this.HasInitialSlash(route) ? '' : '/'}${route}`);
  }

  public GoTo(route: any) {
    this.routes.push(this.GetUrlSnapshot());
    this.SaveRoutes();
    this.router.navigate(
      [`${this.HasInitialSlash(route) ? '' : '/'}${route}`]
      );
    }
    
  public GoBack() {
    if(!!this.routes.length) this.router.navigate([this.routes.pop()]);
    this.SaveRoutes();
  }

  public ClearRoutes() {
    this.routes = [];
    this.SaveRoutes();
  }

  private SaveRoutes() {
    localStorage.setItem('routes', JSON.stringify(this.routes));
  }

  private GetUrlSnapshot(): string {
    return this.router.url;
  }

}
