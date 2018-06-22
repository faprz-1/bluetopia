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
    this.hastoken = localStorage.getItem("token") != null;
    this.isAdmin = JSON.parse(localStorage.getItem("user")).role.name == "Admin"
  }

// funcion para cerrar sesión
  logout(){
    this.api.post("/Usuarios/logout",null).subscribe(()=>{
      localStorage.clear();
      this.router.navigate(['login']);
    })
  }

}
