import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { retryWhen, mergeMap, tap, delay, catchError } from 'rxjs/operators';
import { Observable, timer, throwError, of } from 'rxjs';
import { ToastService } from './toast.service';
import { LoadingService } from './loading.service';

export const BASEURL      = "http://localhost:3000/api"
export const BASEURL_DEV  = "http://192.168.16.165:3022/api/"

export const TOKEN_LOCALSTORAGE_KEY = "token"
export const USER_LOCALSTORAGE_KEY  = "user"
export const TTL_LOCALSTORAGE_KEY   = "ttl"
export const NXT_LOCALSTORAGE_KEY   = "nxt"

const HTTP_HEADERS                = new HttpHeaders({'Content-Type': 'application/json'});
const RETRY_ATTEMPTS              = 5
const RETRY_STATUS_CODES          = [ 408, 429, 504]
const RETRY_MILLISECONDS          = 10000
export const TTL_SECONDS          = 1209600;

import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ApiService
{
  private token: string = "";
  private debugMode: boolean = false;

  public isPaymentSystemOnline: boolean = true;

  constructor(
    private http: HttpClient,
    private toastService: ToastService,
    private loadingService: LoadingService
    )
    {
    this.token = this.GetToken();
    this.GetDebugMode();
  }

  public GetBaseURL()
  {
    return this.debugMode ? BASEURL_DEV : BASEURL;
  }

  private GetHeaders() : HttpHeaders {
    let headers = {
      'Content-Type': 'application/json'
    };

    return new HttpHeaders(headers);
  }

  public Get(endPoint: string, getVariables : any = {}, useToken:boolean = true, displayErrors: boolean = true): Observable<any>
  {
    let link: string = this.GenLink(endPoint, useToken, getVariables);
    return this.ProcessHttpRequest(this.http.get<JSON>(link, { headers: this.GetHeaders() }), displayErrors);
  }

  public Post(endPoint: string, body: object, useToken:boolean = true, displayErrors: boolean = true): Observable<any>
  {
    let link: string = this.GenLink(endPoint, useToken);
    return this.ProcessHttpRequest(this.http.post<JSON>(link, body, { headers: this.GetHeaders() }), displayErrors);
  }

  public Patch(endPoint: string, body: object, useToken:boolean = true, displayErrors: boolean = true): Observable<any>
  {
    let link: string = this.GenLink(endPoint, useToken);
    return this.ProcessHttpRequest(this.http.patch<JSON>(link, body, { headers: this.GetHeaders() }), displayErrors);
  }

  public Put(endPoint: string, body: object, useToken:boolean = true, displayErrors: boolean = true): Observable<any>
  {
    let link: string = this.GenLink(endPoint, useToken);
    return this.ProcessHttpRequest(this.http.put<JSON>(link, body, { headers: this.GetHeaders() }), displayErrors);
  }

  public Delete(endPoint: string, useToken:boolean = true, displayErrors: boolean = true): Observable<any>
  {
    let link: string = this.GenLink(endPoint, useToken);
    return this.ProcessHttpRequest(this.http.delete<JSON>(link, { headers: this.GetHeaders() }), displayErrors);
  }

  public GetUser() : any
  {
    return JSON.parse(localStorage.getItem(USER_LOCALSTORAGE_KEY));
  }
  public SetUser(user: string)
  {
    localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(user));
  }

  public GetTTL() : any
  {
    return localStorage.getItem(TTL_LOCALSTORAGE_KEY);
  }
  public ResetTTL()
  {
    localStorage.setItem(TTL_LOCALSTORAGE_KEY, moment().add(TTL_SECONDS, 's').toISOString());
  }

  public GetToken() : string
  {
    return localStorage.getItem(TOKEN_LOCALSTORAGE_KEY);
  }
  public SetToken(token: string)
  {
    localStorage.setItem(TOKEN_LOCALSTORAGE_KEY, token);
    this.token = token;
  }

  private ProcessHttpRequest(request: Observable<JSON>, displayErrors): Observable<JSON>
  {
    return request.pipe(
      retryWhen(errorResponse => this.RetryOnConnectionError(errorResponse, displayErrors)),
    );
  }

  private GenLink(endPoint: string, useToken: boolean, getVars: any[] = []): string
  {
    this.token = localStorage.getItem(TOKEN_LOCALSTORAGE_KEY);
    useToken = useToken && this.token && this.token.length > 0;

    let baseURL = this.GetBaseURL() + endPoint + "?";
    for(let variable in getVars)
      baseURL = `${baseURL}${variable}=${getVars[variable]}&`;

    return useToken ? baseURL + "access_token=" + this.token : baseURL;
  }

  private RetryOnConnectionError(errorResponse: Observable<any>, displayErrors): Observable<any>
  {
    return errorResponse.pipe(
      mergeMap(
        (error, retryAttempts) =>
        {
          if(retryAttempts >= RETRY_ATTEMPTS || !RETRY_STATUS_CODES.find(code => error.status == code))
            return throwError(error)

          if(displayErrors)
            this.ShowToast(`Connection lost. Retrying in ${RETRY_MILLISECONDS/1000} seconds...`);

          return timer(RETRY_MILLISECONDS)
        }
      )
    );
  }

  private ShowToast(message: string)
  {
    return this.toastService.ShowError(message);
  }

  private GetDebugMode() : boolean
  {
    return this.debugMode;
  }
}
