import { Injectable } from '@angular/core';
import { User } from '../models/user';
import {Http, Response} from '@angular/http'
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';


@Injectable()
export class UserService {

  constructor(private http:Http) { }
  //baseUrl='http://template3.test/laravel_5.6.9/public/api/users';
  //baseUrl2='http://template3.test/laravel_5.6.9/public/api/login';
  baseUrl='http://template3.0.test/servidor/laravel_5.6.9/public/api/users';
  baseUrl2='http://template3.0.test/servidor/laravel_5.6.9/public/api/login';

  getUsers(): Observable<User[]>{
  	return this.http.get(this.baseUrl).map((response: Response) => response.json());
  }

  createUser(user:Object): Observable<User[]>{
  	return this.http.post(this.baseUrl,user).map((response: Response) => response.json()).catch((error:any) => Observable.throw(error.json().error || {message:"Error del servidor"}));
  }

  getUser(id:String): Observable<User[]>{
     return this.http.get(this.baseUrl + '/'+id).map((response: Response) => response.json());
   }

   updateUser(user:Object): Observable<User[]>{
     //const apiUrl = 'http://template3.test/laravel_5.6.9/public/api/users';
     const apiUrl = 'http://template3.0.test/servidor/laravel_5.6.9/public/api/users';
     const url = `${apiUrl}/${user["id"]}`;
     console.log(url);
     return this.http.put(url,user).map((response: Response) => response.json()).catch((error:any)=> Observable.throw(error.json().error || {mesage:"Error del servidor"}));
   }

   logUser(user:Object): Observable<User[]>{
    return this.http.post(this.baseUrl2,user).map((response: Response) => response.json()).catch((error:any) => Observable.throw(error.json().error || {message:"Error del servidor"}));
  }
  logSocialUser(user:Object):Observable<User[]>{
    return this.http.post('http://template3.0.test/servidor/laravel_5.6.9/public/api/logsocialuser',user).map((response: Response) => response.json()).catch((error:any) => Observable.throw(error.json().error || {message:"Error del servidor"}));

  }

  deleteUser(id:String){
      /*console.log('Prueba de llamado de función desde el service');
      console.log(this.baseUrl+'/'+id);*/
      return this.http.delete(this.baseUrl + '/'+ id); /*.catch((error:any) => Observable.throw(error.json().error || {message:"Error del servidor"}));*/
    }

}
