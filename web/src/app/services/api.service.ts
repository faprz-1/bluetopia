import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retryWhen } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {
  public baseURL: string = "http://localhost:3000/api"
  public headers: any = {'Content-Type': 'application/json'};
  public retryAttempts: number = 5
  public token: string = "";

  constructor(private http: HttpClient) {
    this.getToken();
  }

  private genLink(endPoint: string, useToken: boolean,filter:any=false): string {
    let link=this.baseURL+endPoint;
    let params=0;
    if(!(!useToken || !(this.token.length > 0 && this.token != ""))) { 
     
      link+= `${(params==0)?'?':'&'}access_token=`+this.token;
      params++;
    }
     if(filter) { 
      link+= `${(params==0)?'?':'&'}filter=`+JSON.stringify(filter);
      params++;
    }
    return link;
  }

  private conditionalRetry(error: Observable<any>): Observable<any> {
    return error.flatMap((error: any)=>{
      // solo hace retry en codigos de error: 408: Request Time-out, 504: Gateway Time-out, de ahi en mas para todo hace retry
      if(((error.status >= 400 && error.status <= 407) || (error.status >= 409 && error.status <= 418) ) 
      || 
      (error.status >= 500 && error.status <= 503) || error.status == 505){
          return Observable.throw(error)
        }
        return Observable.of(error.status).delay(0);
    }).take(this.retryAttempts)
  }

  private handleError(error: HttpErrorResponse, link: string){
    console.error(link,error)
    return of(error)
  }

  /**
   * Refleja el estado del provider al checar el token de sesion
   * @returns {boolean} Retorna el estado de la obtencion del token de sesion
   */
  public ready(): boolean {
    return this.token != ""
  }

  /**
   * Trata de obtener el token de localStorage
   * Este metodo es ejecutado en el contructor de la clase
   */
  public getToken() {
    this.token = localStorage.getItem("token")
  }

  /**
   * Metodo get para conectarse con la api
   * @param endPoint string con el end pint a usar ej: "Usuarios/1"
   * @param useToken boolean para  intentar usar token en la peticion default: true
   */
  public get(endPoint: string, useToken:boolean = true,filter={}): Observable<object>{
    let link: string = this.genLink(endPoint, useToken,filter);
    return this.http.get<JSON>(link, this.headers).pipe(
      retryWhen(err =>this.conditionalRetry(err)),
      // retry(this.retryAttempts),
      // catchError(err =>this.handleError(err, link))
    );
  }

  /**
   * Metodo post para conectarse con la api
   * @param endPoint string con el end pint a usar ej: "Usuarios/1"
   * @param body object objeto para enviar al servidor
   * @param useToken boolean para  intentar usar token en la peticion default: true
   */
  public post(endPoint: string, body: object, useToken:boolean = true,filter={}): Observable<object>{
    let link: string = this.genLink(endPoint, useToken,filter);
    return this.http.post<JSON>(link, body, this.headers).pipe(
      retryWhen(err =>this.conditionalRetry(err)),
      // retry(this.retryAttempts),
      // catchError(err =>this.handleError(err, link))
    );
  }


  /**
   * Metodo patch para conectarse con la api
   * @param endPoint string con el end pint a usar ej: "Usuarios/1"
   * @param body object objeto para enviar al servidor
   * @param useToken boolean para  intentar usar token en la peticion default: true
   */
  public patch(endPoint: string, body: object, useToken:boolean = true,filter={}): Observable<object>{
    let link: string = this.genLink(endPoint, useToken,filter);
    return this.http.patch<JSON>(link, body, this.headers).pipe(
      retryWhen(err =>this.conditionalRetry(err)),
      // retry(this.retryAttempts),
      // catchError(err =>this.handleError(err, link))
    );
  }

  /**
   * Metodo delete para conectarse con la api
   * @param endPoint string con el end pint a usar ej: "Usuarios/1"
   * @param useToken boolean para  intentar usar token en la peticion default: true
   */
  public delete(endPoint: string, useToken:boolean = true,filter={}): Observable<object>{
    let link: string = this.genLink(endPoint, useToken,filter);
    return this.http.delete<JSON>(link, this.headers).pipe(
      retryWhen(err =>this.conditionalRetry(err)),
      // retry(this.retryAttempts),
      // catchError(err =>this.handleError(err, link))
    );
  }
}
