import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {User} from '../../../models/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit, OnDestroy {

	id:any;
  	params:any;

  	user = new User ('id', 'nombres', 'apellidos', 'email', 'password', 'telefono','sexo','api_token');


  constructor(private activatedRoute: ActivatedRoute, private userService: UserService, private router:Router) { }

  
  ngOnInit() {

  	this.params = this.activatedRoute.params.subscribe(params =>  this.id = params['id']);
    this.userService.getUser(this.id).subscribe(
      data => {
        console.log (data);
        this.user.nombres = data['nombres'];
        this.user.apellidos = data ['apellidos'];
        this.user.email = data ['email'];
        this.user.telefono = data ['telefono'];
        this.user.id = data ['id'];
      },
      error => console.log(<any>error));

  }

  ngOnDestroy(){
  	this.params.unsubscribe();
  }

  updateUser(user){

    this.userService.updateUser(user).subscribe(
      	user => {console.log(user);
      		this.router.navigate(['/admin']);
      	},

      	error => console.log(<any>error));


  }

}
