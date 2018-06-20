import { Component } from '@angular/core';
import { AuthGuard } from '../../services/auth.guard';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{

  id: string;
  hastoken: boolean = false;

  constructor(private auth: AuthGuard, private router: Router) {
    this.id = localStorage.getItem('idtemplate');
    this.hastoken = localStorage.getItem("token") != null;
   }

// funcion para cerrar sesión
  logout(){
  	localStorage.clear();
  	this.router.navigate(['login']);
  }

}
