import { Component } from '@angular/core';
import { AuthGuard } from '../../services/auth.guard';
import {Router, NavigationEnd} from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{

  id: string;
  hastoken: boolean = false;
  isAdmin: boolean = false;
  constructor(
    private auth: AuthGuard, 
    private router: Router,
    private api: ApiService) {
    this.updateData();
    this.router.events.subscribe((event)=>{
      if(event instanceof NavigationEnd)
        this.updateData();
    })
    
  }

  private updateData(){
    let token = localStorage.getItem("token");
    let user = localStorage.getItem("user");
    if( token && user ){
      this.hastoken = token != null;
      this.isAdmin = JSON.parse(user).role.name == "Admin"
    }else{
      this.hastoken = false;
      this.isAdmin = false;
    }
  }

// funcion para cerrar sesión
  logout(){
    this.api.post("/Usuarios/logout",null).subscribe(()=>{
      localStorage.clear();
      this.updateData()
      this.router.navigate(['login']);
    })
  }

}
