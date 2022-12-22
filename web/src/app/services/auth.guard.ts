import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { ToastService } from './toast.service';


export enum Roles
{
  Client = "User",
  GeneralAdministrator = "Admin",
  SuperUser = "SuperUser",
  PlatformAdministrator = "PlatformAdmin",
  RegionAdministrator = "RegionAdmin",
  BranchAdministrator = "BranchAdmin"
};

const REDIRECTING_TO_HOME_PAGE: string = 'Ha expirado su sesión. Redireccionando a la página de inicio...'


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private id: any;
  private params: any;

  constructor(
    private router: Router,
    private toastService: ToastService,
    private api: ApiService,
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    try
    {
      const token = this.api.GetToken();
      const user = this.api.GetUser();

      const userRole = user ? user.role.name : null;
      const acceptedRoles = route.data.roles ? route.data.roles : (route.data.role ? [route.data.role] : []);

      const routeHasRoleInfo = !route.data.role && !route.data.roles;
      const isRoleValid = acceptedRoles.includes(userRole);
      let canActivate = (this.IsTTLValid() && token && user && isRoleValid) || acceptedRoles.length == 0;

      if(!canActivate)
      {
        if(routeHasRoleInfo)
          this.toastService.ShowError(REDIRECTING_TO_HOME_PAGE);

        this.router.navigate(['landing-page']);
      }

      return canActivate;
    }
    catch(error)
    {
      console.error(error)
      return false;
    }
  }

  private IsTTLValid() : boolean
  {
    let ttl = this.api.GetTTL();
    let today = moment();
    return ttl != null && today.isBefore(ttl);
  }  
}
