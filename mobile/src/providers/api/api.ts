import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retryWhen } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
/*
  Generated class for the ApiProvider provider.;

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {

  public baseURL: string = "http://localhost:3000/api"
  public baseURLDev: string = "http://localhost:300022/api"
  public headers: any = {'Content-Type': 'application/json'};
  public retryAttempts: number = 5
  public token: string = "";
  public debugMode:boolean= false;

  constructor(private http: HttpClient, private storage: Storage) {
    this.getToken();
    this.getDebugMode();
  }

  private genLink(endPoint: string, useToken: boolean): string {
    if(this.debugMode){
      return (!useToken || !(this.token.length > 0 && this.token != "")) ? this.baseURLDev+endPoint : this.baseURLDev+endPoint+"?access_token="+this.token;
    }
    else{
      return (!useToken || !(this.token.length > 0 && this.token != "")) ? this.baseURL+endPoint : this.baseURL+endPoint+"?access_token="+this.token;
    }
  }

  private conditionalRetry(error: Observable<any>): Observable<any> {
    return error.flatMap((error: any)=>{
      // solo hace retry en codigos de error: 408: Request Time-out, 504: Gateway Time-out, de ahi en mas para todo hace retry
      if(((error.status >= 400 && error.status <= 407) || (error.status >= 409 && error.status <= 451) ) 
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
   * Trata de GUARDAR el modo de localstorage
   * Este metodo es ejecutado en el contructor de la clase
   */
  public setDebugMode() {
    var mode = !this.debugMode;
    console.log("seteando modo debug",mode);
    this.storage.ready().then(()=>{
      this.storage.set("debugMode",mode).then((debugMode) =>{
        this.debugMode = debugMode;
        console.log("seteando modo debug after",mode);
      })
    })
  }
  /**
   * Trata de obtener el modo de localstorage
   * Este metodo es ejecutado en el contructor de la clase
   */
  public getDebugMode() {
    console.log("ActualDEbugmode",this.debugMode);
    
    this.storage.ready().then(()=>{
      this.storage.get("debugMode").then((debugMode) =>{
        if(debugMode!=null){
          this.debugMode = debugMode;
        }

        console.log("debugmode de storage",this.debugMode);

      })
    })
  }

  /**
   * Metodo get para conectarse con la api
   * @param endPoint string con el end pint a usar ej: "Usuarios/1"
   * @param useToken boolean para  intentar usar token en la peticion default: true
   */
  public get(endPoint: string, useToken:boolean = true): Observable<object>{
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
   * @param useToken boolean para  intentar usar token en la peticion default: true
   */
  public post(endPoint: string, body: object, useToken:boolean = true): Observable<object>{
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
   * @param useToken boolean para  intentar usar token en la peticion default: true
   */
  public delete(endPoint: string, useToken:boolean = true): Observable<object>{
    let link: string = this.genLink(endPoint, useToken);
    return this.http.delete<JSON>(link, this.headers).pipe(
      retryWhen(err =>this.conditionalRetry(err)),
      // retry(this.retryAttempts),
      // catchError(err =>this.handleError(err, link))
    );
  }

}
