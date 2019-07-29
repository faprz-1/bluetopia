import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Router, Event, GuardsCheckEnd } from '@angular/router';
import { ToastService } from './toast.service';
import { SocketService } from './socket.service';

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
  ) {
      this.userFromStorage  = JSON.parse(localStorage.getItem("user"));

      this.subscribeToPermissions()

      router.setUpLocationChangeListener();

      router.events.subscribe( (event : Event) => {
        if (event instanceof GuardsCheckEnd) {
          this.checkPagePermissions(event)
        }
      })
  }

  checkPagePermissions(event: GuardsCheckEnd) {
    // console.log(event.urlAfterRedirects, this.router.getCurrentNavigation().extras, event.url)

    if(this.isRegexRouteValid(/\/inicio\/perfil/, event.url)) {
    }
    if(this.isRegexRouteValid(/\/inicio\/dashboard/, event.url)) {
      if(!this.isPermissionGranted(['dashboard']))
        this.sendToStart()
    }
    /* else if(this.isRegexRouteValid(/\/inicio\/calendario/, event.url)) {
      if(!this.isPermissionGranted(['calendar']))
        this.sendToStart()
    } */  
    else {
      console.warn(`Unknown route ${event.url}!`)
      //this.sendToStart()
    }  
  }

  reloadUserStoragePermissions() {
    this.getFreshPermissions().subscribe(
      (userFromServer) => {
        localStorage.setItem("user", JSON.stringify(userFromServer));
        this.userData = userFromServer
      }
    )
  }

  // Permission route example: ['dashboardPage', 'see']
  isPermissionGranted(permissionRoute: string[]) {
    let permissionGranted = false

    if(permissionRoute == null)
      return permissionGranted

    let userFromServer = JSON.parse(localStorage.getItem("user"))
    // if(!userFromServer.role){
    //   console.log("userFromServer",userFromServer);
    //   return false
    // } else /* if(userFromServer.role.name != 'Admin') */{
    //   return true
    // } 

    let currentPermissionLevels = userFromServer.permissions
    //console.log("userFromServer.permissions",userFromServer.permissions);
    
    permissionRoute.forEach((routeNode, index) => {
      for (let permission of currentPermissionLevels) {

        if (index + 1 == permissionRoute.length) {
          if (this.checkIfPermissionsMatch(permission, routeNode)) {
            permissionGranted = true
            return
          }
        } else {
          if (permission.key == routeNode) {
            currentPermissionLevels = permission.children
            return
          }
        }
      }
    })
    
    return permissionGranted
  }

  /* isClientOrAdmin(permissionRoute: string[]) {
    let role = JSON.parse(localStorage.getItem("user")).role.name
    if( role == 'Client'){
      return true
    }
    else{
      return this.isAdminPermissionGranted(permissionRoute)
    }
  } */

  private getFreshPermissions() {
    return this.api.get("/Usuarios/withCredentials", true)
  }

  private checkIfPermissionsMatch(userPerm, targetPerm : string) {
    if(userPerm.key == targetPerm) {
      if(userPerm.selected) {
        return true
      }
      else if(userPerm.children != null && userPerm.children.length > 0) {
        let allChildrenSelected = true
        for(let children of userPerm.children) {
          if(children.selected != true)
            allChildrenSelected = false
        }
        return allChildrenSelected
      }
    }

    return false
  }

  private isRegexRouteValid(urlPattern : RegExp, testedRoute : string) {
    return urlPattern.test(testedRoute)
  }

  private sendToStart() {
    this.router.navigate(['/inicio/perfil'])
    this.toastService.showError("Acceso Denegado");
  }

  subscribeToPermissions(){
    // console.log("User with permissions", this.userFromStorage);
    if(!this.userFromStorage){
      setTimeout(() => { 
        // console.log("i tried");
        
        this.subscribeToPermissions() 
      }, 500);
      return
    }
    console.log("i made it");
    this.socket.subscribe({
        model: 'Usuario',
        id: this.userFromStorage.id,
        method: 'getPermissions'
      },
      (userWithPermissions) => {
        if(!userWithPermissions.active){
          this.toastService.showError("Su sesión ha expirado")
      
          this.clearLocalStorage();
          this.goToDefaultPage();
        }
        
        this.toastService.showInfo("Su estatus ha sido actualizado")
        this.toastService.showInfo("Refrescando...")
        // console.log("userWithPermissions",userWithPermissions);
        
        localStorage.setItem("user", JSON.stringify(userWithPermissions));
        
        setTimeout(() => { 
          location.reload()
        }, 2000);
      }
    );
  }

  goToDefaultPage() {
    this.router.navigate(['/']);
  }

  clearLocalStorage() {
    localStorage.clear()
  }
}
