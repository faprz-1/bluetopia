import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(
    private router: Router,
    private api: ApiService
  ) { }

  private HasInitialSlash(route: string): boolean {
    if(!route) return false;
    return route.charAt(0) == '/';
  }

  public GoTo(route: string) {
    const user = this.api.GetUser();
    if(user && user.role && !route.includes(user.role.name.toLowerCase())) {
      this.router.navigate(
        [`/inicio/${user.role.name.toLowerCase()}${this.HasInitialSlash(route) ? '' : '/'}${route}`]
        );
    }
    else {
      this.router.navigate(
        [`${this.HasInitialSlash(route) ? '' : '/'}${route}`]
        );
    }
  }

}
