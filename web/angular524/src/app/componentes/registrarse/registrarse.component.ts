import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import { NgForm } from '@angular/forms';
import {Router} from '@angular/router';


@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css']
})
export class RegistrarseComponent implements OnInit {


  constructor(private userService: UserService, private router:Router) { }

  sexos:string[]=["Hombre","Mujer"]

  ngOnInit() {
  }

   createUser(user){
    console.log(user);
    this.userService.createUser(user)
    .subscribe(
      user =>{
        console.log(user);
        /*this.router.navigate(['']);*/
      },
      error => console.log(<any>error));
  }

}
