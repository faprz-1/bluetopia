import { Injectable } from '@angular/core';
import { User } from '../models/user';
import {Http, Response} from '@angular/http'
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx'


@Injectable()
export class UserService {

  constructor(private http:Http) { }

  getUsers(): Observable<User[]>{
  	return this.http.get('http://template3.test/laravel_5.6.9/public/api/users').map((response: Response) => response.json());
  }

}
