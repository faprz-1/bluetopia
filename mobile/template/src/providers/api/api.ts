import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {

  // public baseURL='http://template3.0.test/servidor/laravel_5.6.9/public/api/'; 
  // public baseURL = 'http://template3.test/laravel_5.6.9/public/api/';
  public baseURL = 'http://127.0.0.1:8000/api/';
  public headers: any = {'Content-Type': 'application/json'};

  constructor(private http: Http) {
  }

  public apiGet(endPont: string): Observable<Response>{
    const link: string = this.baseURL+endPont;
    return this.http.get(link, this.headers).map(res => res.json());
  }

  public apiPost(endPont: string, body: any): Observable<Response>{
    const link: string = this.baseURL+endPont;
    return this.http.post(link, body, this.headers).map(res => res.json());
  }

  public apiPut(endPont: string, body: any): Observable<Response>{
    const link : string = this.baseURL+endPont;
    return this.http.put(link,body, this.headers).map(res => res.json());
  }

  public apiPatch(endPont: string, body: any): Observable<Response>{
    const link : string = this.baseURL+endPont;
    return this.http.patch(link,body, this.headers).map(res => res.json());
  }
}
