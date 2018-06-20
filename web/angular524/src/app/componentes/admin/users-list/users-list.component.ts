import { Component, OnInit } from '@angular/core';
// import { UserService } from '../../../services/user.service';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users: Observable<any[]>;
  constructor( private router: Router) { }

  ngOnInit() {
    // this.users = this.userService.getUsers();
  }

  editUser(id) {
    this.router.navigate(['/admin/edituser/', id]);
    console.log(id);
  }

  deleteUser(id) {

      // this.userService.deleteUser(id)
      // .subscribe(
      //   // tslint:disable-next-line:no-shadowed-variable
      //   id => {
      //     console.log('Usuario eliminado');
      //   },
      //   error => console.log(<any>error));
      // this.router.navigate(['/admin']);
    }

}
