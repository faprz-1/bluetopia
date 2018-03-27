import { Component, OnInit } from '@angular/core';
/*import { RegistrarseComponent} from "../registrarse/registrarse.component";*/
import {UserService} from '../../services/user.service';
import { NgForm } from '@angular/forms';
import {Router} from '@angular/router';
import { FacebookService } from '../../services/facebook.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  

  constructor(private userService: UserService, private router:Router, private facebookServicio:FacebookService) {

     }

  ngOnInit() {
  }

  	login(user){
  		console.log(user);
  		this.userService.logUser(user)

    .subscribe(
      user =>{

        console.log(user);
        let userid=user.id;
        let tkn = user.api_token;
        localStorage.setItem("tkn", tkn);
        this.router.navigate(['/perfil/'+userid]);
      },
      error => console.log(<any>error));
  	}

  //  socialSignIn(facebook){
    //  console.log(facebook);
      // this.facebookServicio.socialSignIn(facebook);
    // .subscribe(
    //   user =>{
    //     console.log(user);
    //     console.log('/perfil/'+user.id);
    //     this.router.navigate(['/perfil/'+user.id]);
    //   },
    //   error => console.log(<any>error));
  //  }


      socialSignIn(google){
        console.log(google);
        this.facebookServicio.socialSignIn(google)
        .then(socialUser =>{
          console.log(socialUser);
          // this.router.navigate(['/perfil/'+socialUser.id]);
          this.userService.logSocialUser(socialUser)
        .subscribe(
          user =>{
            console.log(user);
            console.log('perfil/'+user.id);
            this.router.navigate(['/perfil/'+user.id]);
          },
          error => console.log(<any>error));
        },
        error => console.log(<any>error));
        }
      }
