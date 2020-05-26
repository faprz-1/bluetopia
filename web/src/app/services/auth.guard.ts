import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { TOKEN_LOCALSTORAGE_KEY, TTL_LOCALSTORAGE_KEY, USER_LOCALSTORAGE_KEY } from './api.service';

import * as moment from 'moment';
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

@Injectable()
export class AuthGuard implements CanActivate
{
  private id: any;
  private params: any;

  constructor(
    private router: Router,
    private toastService: ToastService
  )
  {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable < boolean > | Promise < boolean > | boolean
  {

    try
    {
      const token = localStorage.getItem(TOKEN_LOCALSTORAGE_KEY);
      const user = JSON.parse(localStorage.getItem(USER_LOCALSTORAGE_KEY));

      const userRole = user ? user.role.name : null;
      const acceptedRoles = next.data.roles ? next.data.roles : (next.data.role ? [next.data.role] : []);

      const routeHasRoleInfo = !next.data.role && !next.data.roles;
      const isRoleValid = acceptedRoles.includes(userRole);
      let canActivate = (this.IsTTLValid() && token && user && isRoleValid) || acceptedRoles.length == 0;

      if(!canActivate)
      {
        if(routeHasRoleInfo)
          this.toastService.ShowError(REDIRECTING_TO_HOME_PAGE);

        this.router.navigate(['login']);
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
    let ttl = localStorage.getItem(TTL_LOCALSTORAGE_KEY);
    let today = moment();
    return ttl != null && today.isBefore(ttl);
  }
}
