import { Component, OnInit } from '@angular/core';
import {Http, Response} from  "@angular/http";
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable'
import {Router} from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

	users: Observable<User[]>;
  
  constructor(private userService:UserService, private router:Router) { }

  ngOnInit() {
  	this.users = this.userService.getUsers();
  }

  editUser(id){

    this.router.navigate(['/admin/edituser/',id]);
    console.log(id);
  }

  deleteUser(id){

      this.userService.deleteUser(id)
      .subscribe(
      	id => {console.log(id);

      	},

      	error => console.log(<any>error));
      

    }

}
