import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retryWhen } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
// import { retryWhen } from 'rxjs/operator/retryWhen';

@Injectable()
export class ApiProvider {

  public baseURL: string = "http://localhost:3000/api"
  // public mediaBaseURL: string = "http://localhost:3000/"
  public headers: any = {'Content-Type': 'application/json'};
  public retryAttempts: number = 5
  public token: string = "";

  constructor(private http: HttpClient, private storage: Storage) {
    this.getToken();
  }

  private genLink(endPoint: string, useToken: boolean): string {
    return (!useToken || !(this.token.length > 0 && this.token != "")) ? this.baseURL+endPoint : this.baseURL+endPoint+"?access_token="+this.token;
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
    return of()
  }

  /**
   * Refleja el estado del provider al checar el token de sesion
   * @returns {Promise<boolean>} Retorna una promesa del estado de la obtencion del token de sesion
   */
  public ready(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if(this.token.length > 0 && this.token != "")
        resolve(true)
    })
  }

  /**
   * Trata de obtener el token de localstorage
   * Este metodo es ejecutado en el contructor de la clase
   */
  public getToken() {
    this.storage.ready().then(()=>{
      this.storage.get("token").then((token) =>{
        this.token = token;
      })
    })
  }

  /**
   * Metodo get para conectarse con la api
   * @param endPoint string con el end pint a usar ej: "Usuarios/1"
   * @param useToken boolean para  intentar usar token en la peticion default: false
   */
  public get(endPoint: string, useToken:boolean = false): Observable<object>{
    let link: string = this.genLink(endPoint, useToken);
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
   * @param useToken boolean para  intentar usar token en la peticion default: false
   */
  public post(endPoint: string, body: object, useToken:boolean = false): Observable<object>{
    let link: string = this.genLink(endPoint, useToken);
    return this.http.post<JSON>(link, body, this.headers).pipe(
      retryWhen(err =>this.conditionalRetry(err)),
      // retry(this.retryAttempts),
      // catchError(err =>this.handleError(err, link))
    );
  }

  /**
   * Metodo delete para conectarse con la api
   * @param endPoint string con el end pint a usar ej: "Usuarios/1"
   * @param useToken boolean para  intentar usar token en la peticion default: false
   */
  public delete(endPoint: string, useToken:boolean = false): Observable<object>{
    let link: string = this.genLink(endPoint, useToken);
    return this.http.delete<JSON>(link, this.headers).pipe(
      retryWhen(err =>this.conditionalRetry(err)),
      // retry(this.retryAttempts),
      // catchError(err =>this.handleError(err, link))
    );
  }
}