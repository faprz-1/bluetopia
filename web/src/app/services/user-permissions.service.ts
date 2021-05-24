import { Injectable } from '@angular/core';
import { GuardsCheckEnd, Router, RouterEvent } from '@angular/router';
import { NextObserver } from 'rxjs';
import { ApiService } from './api.service';
// import { SocketService } from './socket.service';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class UserPermissionsService {
  userData: any
  userFromStorage: any

  constructor(
    private api: ApiService,
    private router: Router,
    private toastService: ToastService,
    // private socket: SocketService
  ) {
    this.userFromStorage = this.api.GetUser();
    this.SubscribeToPermissions();

    router.setUpLocationChangeListener();
    router.events.subscribe(
      (event: any) => {
        if (event instanceof GuardsCheckEnd)
          this.CheckPagePermissions(event)
      }
    )
  }

  private CheckPagePermissions(event: GuardsCheckEnd) {
    // You can add more routes here to check the permissions
    if (this.IsRegexRouteValid(/\/inicio\/dashboard/, event.url)) {
      if (!this.IsPermissionGranted(['dashboard']))
        this.sendToStart();
    }
    else {
      throw `Unknown route ${event.url}!`;
    }
  }

  public async ReloadUserStoragePermissions() {
    try {
      let userData = await (await this.GetUserWithCredentials()).toPromise();
      this.api.SetUser(userData);
      this.userData = userData;
    } catch {}
  }

  // Permission route example: ['dashboardPage', 'see']
  IsPermissionGranted(permissionRoutes: string[]) {
    if (permissionRoutes == null)
      return false;

    let userFromServer = this.api.GetUser();
    if (!userFromServer.role)
      return false;
    else if (userFromServer.role.name != 'Admin')
      return true;

    return this.CheckPermissionRoutes(permissionRoutes, userFromServer);
  }

  private async GetUserWithCredentials() {
    return await this.api.Get("/Usuarios/withCredentials", true);
  }

  private CheckPermissionRoutes(permissionRoutes: any[], userFromServer: any) {
    let permissionGranted = false;

    permissionRoutes.forEach(
      (routeNode, index) => {
        for (let permission of userFromServer.permissions) {
          if (index + 1 == permissionRoutes.length) {
            if (this.checkIfPermissionsMatch(permission, routeNode)) {
              permissionGranted = true;
              return;
            }
          }
          else {
            if (permission.key == routeNode) {
              userFromServer.permissions = permission.children
              return
            }
          }
        }
      }
    )
    return permissionGranted;
  }

  private checkIfPermissionsMatch(userPerm: any, targetPerm: string) {
    if (userPerm.key == targetPerm) {
      if (userPerm.selected)
        return true;

      if (userPerm.children != null && userPerm.children.length > 0) {
        let allChildrenSelected = true;
        for (let children of userPerm.children) {
          if (children.selected != true)
            allChildrenSelected = false;
        }
        return allChildrenSelected
      }
    }

    return false;
  }

  private IsRegexRouteValid(urlPattern: RegExp, testedRoute: string) {
    return urlPattern.test(testedRoute)
  }

  private sendToStart() {
    this.router.navigate(['/inicio/perfil'])
    this.toastService.ShowError("Acceso Denegado");
  }

  public SubscribeToPermissions() {
    if (!this.userFromStorage)
      setTimeout(() => { this.SubscribeToPermissions() }, 500);
    else {
      // this.socket.Subscribe('Usuario', this.userFromStorage.id, 'getPermissions',
      //   (userWithPermissions: any) => {
      //     if (!userWithPermissions.active) {
      //       this.toastService.ShowError("Su sesión ha expirado");

      //       localStorage.clear();
      //       this.router.navigate(['/'])
      //     }

      //     this.toastService.ShowInfo("Su estatus ha sido actualizado");
      //     this.toastService.ShowInfo("Refrescando...");

      //     localStorage.setItem("user", JSON.stringify(userWithPermissions));

      //     setTimeout(() => {
      //       location.reload();
      //     }, 2000);
      //   }
      // );
    }
  }
}
