import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Router, Event, GuardsCheckEnd } from '@angular/router';
import { ToastService } from './toast.service';
import { SocketService } from './socket.service';
import { USER_LOCALSTORAGE_KEY } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserPermissionsService {
  userData : any
  userFromStorage: any

  constructor(
    private api: ApiService,
    private router : Router,
    private toastService : ToastService,
    private socket: SocketService
  ) 
  {
    this.userFromStorage = JSON.parse(localStorage.getItem("user"));
    this.SubscribeToPermissions();

    router.setUpLocationChangeListener();
    router.events.subscribe( 
      (event : Event) => {
        if (event instanceof GuardsCheckEnd) 
          this.CheckPagePermissions(event)
      }
    )
  }

  private CheckPagePermissions(event: GuardsCheckEnd) {
    // You can add more routes here to check the permissions
    if(this.IsRegexRouteValid(/\/inicio\/dashboard/, event.url)) 
    {
      if(!this.IsPermissionGranted(['dashboard']))
        this.sendToStart();
    }
    else 
    {
      throw `Unknown route ${event.url}!`;
    }  
  }

  public async ReloadUserStoragePermissions() 
  {
    let userData = await this.GetUserWithCredentials();
    localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(userData));
    this.userData = userData;
  }

  // Permission route example: ['dashboardPage', 'see']
  IsPermissionGranted(permissionRoutes: string[]) {
    if(permissionRoutes == null)
      return false;

    let userFromServer = JSON.parse(localStorage.getItem(USER_LOCALSTORAGE_KEY));
    if(!userFromServer.role)
      return false;
    else if(userFromServer.role.name != 'Admin')
      return true;

    return this.CheckPermissionRoutes(permissionRoutes, userFromServer);
  }

  private async GetUserWithCredentials() 
  {
    return await this.api.Get("/Usuarios/withCredentials", true);
  }

  private CheckPermissionRoutes(permissionRoutes, userFromServer)
  {
    let permissionGranted = false;

    permissionRoutes.forEach(
      (routeNode, index) => {
        for (let permission of userFromServer.permissions) 
        {
          if (index + 1 == permissionRoutes.length) 
          {
            if (this.checkIfPermissionsMatch(permission, routeNode)) 
            {
              permissionGranted = true;
              return;
            }
          } 
          else 
          {
            if (permission.key == routeNode) 
            {
              userFromServer.permissions = permission.children
              return
            }
          }
        }
      }
    )

    return permissionGranted;
  }

  private checkIfPermissionsMatch(userPerm, targetPerm : string) 
  {
    if(userPerm.key == targetPerm) 
    {
      if(userPerm.selected) 
        return true;

      if(userPerm.children != null && userPerm.children.length > 0) 
      {
        let allChildrenSelected = true;
        for(let children of userPerm.children) 
        {
          if(children.selected != true)
            allChildrenSelected = false;
        }
        return allChildrenSelected
      }
    }

    return false;
  }

  private IsRegexRouteValid(urlPattern : RegExp, testedRoute : string) {
    return urlPattern.test(testedRoute)
  }

  private sendToStart() {
    this.router.navigate(['/inicio/perfil'])
    this.toastService.ShowError("Acceso Denegado");
  }

  public SubscribeToPermissions()
  {
    if(!this.userFromStorage)
      setTimeout(() => { this.SubscribeToPermissions() }, 500);
    else {
      this.socket.Subscribe('Usuario', this.userFromStorage.id, 'getPermissions',
        (userWithPermissions) => {
          if(!userWithPermissions.active){
            this.toastService.ShowError("Su sesión ha expirado");
        
            localStorage.clear();
            this.router.navigate(['/'])
          }
          
          this.toastService.ShowInfo("Su estatus ha sido actualizado");
          this.toastService.ShowInfo("Refrescando...");
          
          localStorage.setItem("user", JSON.stringify(userWithPermissions));
          
          setTimeout(() => { 
            location.reload();
          }, 2000);
        }
      );
    }
  }
}
