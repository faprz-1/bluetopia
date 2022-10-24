import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }

  private HasInitialSlash(route: string): boolean {
    if(!route) return false;
    return route.charAt(0) == '/';
  }

  public GoTo(route: string) {
    this.router.navigate([`${this.HasInitialSlash(route) ? '' : '/'}${route}`]);
  }

}
