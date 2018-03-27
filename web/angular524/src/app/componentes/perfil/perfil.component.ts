import { Component, OnInit, OnDestroy } from '@angular/core';
import {Http, Response} from  "@angular/http";
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import {ActivatedRoute} from '@angular/router';
//import 'rxjs/add/operator/map';
//import {Observable} from 'rxjs/Observable'
import {Router} from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit, OnDestroy {
	id:any;
	params:any;
	user = new User ('id', 'nombres', 'apellidos', 'email', 'password', 'telefono', 'sexo', 'api_token');

  constructor(private userService:UserService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  	this.params = this.activatedRoute.params.subscribe(params =>  this.id = params['id']);
    this.userService.getUser(this.id).subscribe(
      data => {
        console.log (data);
        this.user.id = data['id'];
        this.user.nombres = data ['nombres'];
        this.user.apellidos = data ['apellidos'];
        this.user.email = data ['email'];
        this.user.password = data ['password'];
        this.user.telefono = data ['telefono'];
        this.user.sexo = data ['sexo'];
      },
      error => console.log(<any>error));
  }

  ngOnDestroy(){
  	this.params.unsuscribe();
  }

}
