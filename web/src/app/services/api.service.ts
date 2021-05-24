import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Observable, throwError, timer } from 'rxjs';
import { mergeMap, retryWhen, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { LoadingService } from './loading.service';
import { ToastService } from './toast.service';

export const TOKEN_LOCALSTORAGE_KEY = "token"
export const USER_LOCALSTORAGE_KEY  = "user"
export const TTL_LOCALSTORAGE_KEY   = "ttl"
export const NXT_LOCALSTORAGE_KEY   = "nxt"

const HTTP_HEADERS                = new HttpHeaders({'Content-Type': 'application/json'});
const RETRY_ATTEMPTS              = 5
const RETRY_STATUS_CODES          = [ 408, 429, 504]
const RETRY_MILLISECONDS          = 10000
export const TTL_SECONDS          = 1209600;


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private token: string = "";
  private debugMode: boolean = false;

  public isPaymentSystemOnline: boolean = true;

  constructor(
    private http: HttpClient,
    private toastService: ToastService,
    private loadingService: LoadingService,
    private router: Router
  ) {
    this.token = this.GetToken();
    this.GetDebugMode();
  }

  public GetBaseURL() {
    return environment.baseURL;
  }

  private GetHeaders(): HttpHeaders {
    let headers = {
      'Content-Type': 'application/json'
    };

    return new HttpHeaders(headers);
  }

  public Get(endPoint: string, getVariables: any = {}, useToken: boolean = true, displayErrors: boolean = true): Observable<any> {
    let link: string = this.GenLink(endPoint, useToken, getVariables);
    return this.ProcessHttpRequest(this.http.get<JSON>(link, { headers: this.GetHeaders() }), displayErrors);
  }

  public Post(endPoint: string, body: object, useToken: boolean = true, displayErrors: boolean = true): Observable<any> {
    let link: string = this.GenLink(endPoint, useToken);
    return this.ProcessHttpRequest(this.http.post<JSON>(link, body, { headers: this.GetHeaders() }), displayErrors);
  }

  public Patch(endPoint: string, body: object, useToken: boolean = true, displayErrors: boolean = true): Observable<any> {
    let link: string = this.GenLink(endPoint, useToken);
    return this.ProcessHttpRequest(this.http.patch<JSON>(link, body, { headers: this.GetHeaders() }), displayErrors);
  }

  public Put(endPoint: string, body: object, useToken: boolean = true, displayErrors: boolean = true): Observable<any> {
    let link: string = this.GenLink(endPoint, useToken);
    return this.ProcessHttpRequest(this.http.put<JSON>(link, body, { headers: this.GetHeaders() }), displayErrors);
  }

  public Delete(endPoint: string, useToken: boolean = true, displayErrors: boolean = true): Observable<any> {
    let link: string = this.GenLink(endPoint, useToken);
    return this.ProcessHttpRequest(this.http.delete<JSON>(link, { headers: this.GetHeaders() }), displayErrors);
  }

  public GetUser(): any {
    const data = localStorage.getItem(USER_LOCALSTORAGE_KEY);
    return data ? JSON.parse(data) : undefined;
  }
  public SetUser(user: string) {
    localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(user));
  }

  public GetTTL(): any {
    return localStorage.getItem(TTL_LOCALSTORAGE_KEY);
  }
  public ResetTTL() {
    localStorage.setItem(TTL_LOCALSTORAGE_KEY, moment().add(TTL_SECONDS, 's').toISOString());
  }

  public GetToken() {
    return localStorage.getItem(TOKEN_LOCALSTORAGE_KEY) || '';
  }
  public SetToken(token: string) {
    localStorage.setItem(TOKEN_LOCALSTORAGE_KEY, token);
    this.token = token;
  }

  private ProcessHttpRequest(request: Observable<JSON>, displayErrors: boolean): Observable<JSON> {
    this.loadingService.AddLoadingLevel();
    return request.pipe(
      tap(
        () => this.loadingService.ReleaseLoadingLevel(),
        error => {
          this.loadingService.ReleaseLoadingLevel();
          if(!environment.production) {
            this.toastService.ShowError(JSON.stringify(error));
          }
          if (error && error.status == 401) {
            localStorage.clear();
            this.router.navigate(['login']);
          }
        },
      ),
      retryWhen(errorResponse => this.RetryOnConnectionError(errorResponse, displayErrors)),
    );
  }

  private GenLink(endPoint: string, useToken: boolean, getVars: any[] = []): string {
    this.token = this.GetToken();
    useToken = useToken && !!this.token && this.token.length > 0;

    let baseURL = this.GetBaseURL() + endPoint + "?";
    for (let variable in getVars)
      baseURL = `${baseURL}${variable}=${getVars[variable]}&`;

    return useToken ? baseURL + "access_token=" + this.token : baseURL;
  }

  private RetryOnConnectionError(errorResponse: Observable<any>, displayErrors: boolean): Observable<any> {
    return errorResponse.pipe(
      mergeMap(
        (error, retryAttempts) => {
          if (retryAttempts >= RETRY_ATTEMPTS || !RETRY_STATUS_CODES.find(code => error.status == code))
            return throwError(error)

          if (displayErrors)
            this.ShowToast(`Connection lost. Retrying in ${RETRY_MILLISECONDS / 1000} seconds...`);

          return timer(RETRY_MILLISECONDS)
        }
      )
    );
  }

  private ShowToast(message: string) {
    return this.toastService.ShowError(message);
  }

  private GetDebugMode(): boolean {
    return this.debugMode;
  }
}
