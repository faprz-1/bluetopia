import { Injectable } from '@angular/core';
import { User } from '../models/user';
import {Http, Response} from '@angular/http'
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';


@Injectable()
export class UserService {

  constructor(private http:Http) { }
  baseUrl='http://template3.test/laravel_5.6.9/public/api/users/';

  getUsers(): Observable<User[]>{
  	return this.http.get(this.baseUrl).map((response: Response) => response.json());
  }

  createUser(user:Object): Observable<User[]>{
  	return this.http.post(this.baseUrl,user).map((response: Response) => response.json()).catch((error:any) => Observable.throw(error.json().error || {message:"Error del servidor"}));
  }

  getUser(id:String): Observable<User[]>{
     return this.http.get(this.baseUrl + id).map((response: Response) => response.json());
   }





}
