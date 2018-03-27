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

  

  constructor(private userService: UserService, private router:Router ) { }

  ngOnInit() {
  }

  	login(user){
  		console.log(user);
  		this.userService.logUser(user)

    .subscribe(
      user =>{

        console.log(user);
        /*let userid=user.id;
        let tkn = user.api_token;
        localStorage.setItem("tkn", tkn);
        this.router.navigate(['/perfil/'+userid]);*/
      },
      error => console.log(<any>error));
  	}
}
