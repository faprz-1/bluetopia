import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

import { retryWhen, mergeMap, tap, delay, catchError } from 'rxjs/operators'; 
import { Observable, timer, throwError, of } from 'rxjs';

export const BASEURL             = "https://jarabeapi.com/api"
export const BASEURL_DEV         = "http://192.168.16.165:3022/api/"
const HTTP_HEADERS        = new HttpHeaders({'Content-Type': 'application/json'});
const RETRY_ATTEMPTS      = 5
const RETRY_STATUS_CODES  = [ 408, 429, 504]
const RETRY_MILLISECONDS  = 10000


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public token: string = "";
  public debugMode: boolean = false;

  constructor(
    private http: HttpClient, 
    private storage: Storage,
    private toastController: ToastController,
    ) { 
    this.getToken();
    this.getDebugMode();
  }

  
  public get(endPoint: string, getVariables : any = {}, useToken:boolean = true, displayErrors: boolean = true): Observable<JSON> {
    let link: string = this.genLink(endPoint, useToken, getVariables)
    return this.processHttpRequest(this.http.get<JSON>(link, { headers: HTTP_HEADERS }), displayErrors);
  }

  public post(endPoint: string, body: object, useToken:boolean = true, displayErrors: boolean = true): Observable<JSON>{
    let link: string = this.genLink(endPoint, useToken);
    return this.processHttpRequest(this.http.post<JSON>(link, body, { headers: HTTP_HEADERS }), displayErrors);
  }

  public patch(endPoint: string, body: object, useToken:boolean = true, displayErrors: boolean = true): Observable<JSON>{
    let link: string = this.genLink(endPoint, useToken);
    return this.processHttpRequest(this.http.patch<JSON>(link, body, { headers: HTTP_HEADERS }), displayErrors);
  }

  public put(endPoint: string, body: object, useToken:boolean = true, displayErrors: boolean = true): Observable<JSON>{
    let link: string = this.genLink(endPoint, useToken);
    return this.processHttpRequest(this.http.put<JSON>(link, body, { headers: HTTP_HEADERS }), displayErrors);
  }

  public delete(endPoint: string, useToken:boolean = true, displayErrors: boolean = true): Observable<JSON>{
    let link: string = this.genLink(endPoint, useToken);
    return this.processHttpRequest(this.http.delete<JSON>(link, { headers: HTTP_HEADERS }), displayErrors);
  }

  public async setToken(token: string) {
    await this.storage.ready();
    await this.storage.set("token", token);
    this.token = token
  }


  private processHttpRequest(request: Observable<JSON>, displayErrors): Observable<JSON> {
    return request.pipe(
      retryWhen(errorResponse => this.retryOnConnectionError(errorResponse, displayErrors))
    );
  }

  private genLink(endPoint: string, useToken: boolean, getVars: any[] = []): string {
    useToken = useToken && this.token && this.token.length > 0;

    let baseURL = (this.debugMode ? BASEURL_DEV : BASEURL) + endPoint + "?";
    if(getVars != null && getVars.length > 0) {
      for(let variable of getVars) 
        baseURL = `${baseURL}${variable}=${getVars[variable]}&`;
    }

    console.info(useToken ? baseURL + "access_token=" + this.token : baseURL)
    return useToken ? baseURL + "access_token=" + this.token : baseURL;
  }

  private retryOnConnectionError(errorResponse: Observable<any>, displayErrors): Observable<any> {
    return errorResponse.pipe(
      mergeMap( (error, retryAttempts) => {
        if(retryAttempts >= RETRY_ATTEMPTS || !RETRY_STATUS_CODES.find(code => error.status == code)) 
          return throwError(error)

        if(displayErrors)
          this.showToast(`Connection lost. Retrying in ${RETRY_MILLISECONDS/1000} seconds...`, 1000);

        return timer(RETRY_MILLISECONDS)
      })
    );
  }

  private async showToast(message: string, duration = 3000) {
    let toast = await this.toastController.create({
        message: message,
        duration: duration
    })
    await toast.present()
    return toast
}

  private async getDebugMode() {
    await this.storage.ready();
    this.debugMode = await this.storage.get("debugMode");
  }

  private async setDebugMode() {
    await this.storage.ready();
    this.debugMode = await this.storage.get("debugMode");
  }

  private async getToken() {
    await this.storage.ready();
    this.token = await this.storage.get("token");
  }

  public getBaseURL(){
    return this.debugMode ? BASEURL_DEV : BASEURL
  }
}
