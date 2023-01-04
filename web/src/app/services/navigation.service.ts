import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  user: any = null;

  constructor(
    private router: Router,
    private api: ApiService
  ) { }

  private HasInitialSlash(route: string): boolean {
    if(!route) return false;
    return route.charAt(0) == '/';
  }

  public GoToUserRoute(route: string) {
    this.user = this.api.GetUser();
    if(!this.user) return;
    if(this.user && this.user.role && !route.includes(this.user.role.name.toLowerCase())) {
      this.router.navigate(
        [`/inicio/${this.user.role.name.toLowerCase()}${this.HasInitialSlash(route) ? '' : '/'}${route}`]
        );
    }
    else {
      this.router.navigate(
        [`${this.HasInitialSlash(route) ? '' : '/'}${route}`]
        );
    }
  }

  public GoTo(route: string) {
    this.router.navigate(
      [`${this.HasInitialSlash(route) ? '' : '/'}${route}`]
      );
  }

}
