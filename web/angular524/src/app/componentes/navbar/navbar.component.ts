import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../../services/auth.guard';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  id:string;

  constructor(private auth: AuthGuard, private router: Router) {
  	auth.testkn();
    this.id=localStorage.getItem("idtemplate");
   }


  


  ngOnInit() {
  }


  logout(){
  	localStorage.clear();
  	this.router.navigate(['login']);
  }

}
