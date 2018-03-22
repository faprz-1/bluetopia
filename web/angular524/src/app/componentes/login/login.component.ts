import { Component, OnInit } from '@angular/core';
/*import { RegistrarseComponent} from "../registrarse/registrarse.component";*/
import {UserService} from '../../services/user.service';
import { NgForm } from '@angular/forms';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(private userService: UserService, private router:Router) { }

  ngOnInit() {
  }

  login(user){
  		console.log(user);
  		this.userService.logUser(user)
    .subscribe(
      user =>{
        console.log(user);
        console.log('/perfil/'+user.id);
        this.router.navigate(['/perfil/'+user.id]);
      },
      error => console.log(<any>error));
  	}

}
