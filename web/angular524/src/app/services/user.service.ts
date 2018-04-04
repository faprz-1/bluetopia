import { Injectable } from '@angular/core';
import { User } from '../models/user';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
// tslint:disable-next-line:import-blacklist
import {Observable} from 'rxjs/Rx';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class UserService {

  constructor(private http: Http, private httpClient: HttpClient) { }
  baseUrl = 'http://template3.test/laravel_5.6.9/public/api/';

  getUsers(): Observable<User[]> {
    return this.http.get(this.baseUrl + 'users').map((response: Response) => response.json());
  }

  createUser(user: Object): Observable<User[]> {
    return this.http.post(this.baseUrl + 'users', user).map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || {message: 'Error del servidor'}));
  }

  uploadImage(image: any) {
    /*console.log("servicio uploadImage");*/
    return this.httpClient.post(this.baseUrl + 'upload', image);
  }

  getUser(id: String): Observable<User[]> {
     return this.http.get(this.baseUrl + 'users/' + id).map((response: Response) => response.json());
   }

  updateUser(user: Object): Observable<User[]> {
     const apiUrl = this.baseUrl;
     const url = `${apiUrl}users/${user['id']}`;
     console.log(url);
     return this.http.put(url, user).map((response: Response) => response.json())
     .catch((error: any) => Observable.throw(error.json().error || {mesage: 'Error del servidor'}));
   }

  updatePswrd(pass: Object): Observable<User[]> {
    /* const apiUrl = this.baseUrl;
    const url = `${apiUrl}pass/${pass["id"]}`;
    console.log(url); */
    return this.http.post(this.baseUrl + 'pass', pass).map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || { mesage: 'Error del servidor' }));
  }

   logUser(user: Object): Observable<User> {
    return this.http.post(this.baseUrl + 'login', user).map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || {message: 'Error del servidor'}));
  }
  logSocialUser(user: Object): Observable<User> {
    return this.http.post(this.baseUrl + 'logsocialuser', user).map((response: Response) => response.json())
    .catch((error: any) => Observable.throw(error.json().error || {message: 'Error del servidor'}));

  }

  deleteUser(id: String) {
      /*console.log('Prueba de llamado de función desde el service');
      console.log(this.baseUrl+'/'+id);*/
      return this.http.delete(this.baseUrl + 'users/' + id).map((response: Response) => response.json());
    }

}
