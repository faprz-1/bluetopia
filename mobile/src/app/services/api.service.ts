import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';

import { retryWhen, mergeMap, tap } from 'rxjs/operators';
import { Observable, timer, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoadingService } from './loading.service';
import { ToastAlertService } from './toast-alert.service';

const HTTP_HEADERS        = new HttpHeaders({'Content-Type': 'application/json'});
const RETRY_ATTEMPTS      = 5;
const RETRY_STATUS_CODES  = [ 408, 429, 504];
const RETRY_MILLISECONDS  = 10000;

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public token = '';
  public user: any = null;
  public ttl: number;

  public get baseURL() {
    return environment.baseURL;
  }

  public getBaseURL() {
    return environment.baseURL;
  }

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private router: Router,
    private platform: Platform,
    private loading: LoadingService,
    private toastAlert: ToastAlertService,
    ) {
    this.GetToken();
  }

  public Get(endPoint: string, getVariables: any = {}, useToken: boolean = true, displayErrors: boolean = true): Observable<any> {
    const link: string = this.GenLink(endPoint, useToken, getVariables);
    return this.ProcessHttpRequest(this.http.get<JSON>(link, { headers: HTTP_HEADERS }), displayErrors);
  }

  public Post(endPoint: string, body: object, useToken: boolean = true, displayErrors: boolean = true): Observable<any> {
    const link: string = this.GenLink(endPoint, useToken);
    return this.ProcessHttpRequest(this.http.post<JSON>(link, body, { headers: HTTP_HEADERS }), displayErrors);
  }

  public Patch(endPoint: string, body: object, useToken: boolean = true, displayErrors: boolean = true): Observable<any> {
    const link: string = this.GenLink(endPoint, useToken);
    return this.ProcessHttpRequest(this.http.patch<JSON>(link, body, { headers: HTTP_HEADERS }), displayErrors);
  }

  public Put(endPoint: string, body: object, useToken: boolean = true, displayErrors: boolean = true): Observable<any> {
    const link: string = this.GenLink(endPoint, useToken);
    return this.ProcessHttpRequest(this.http.put<JSON>(link, body, { headers: HTTP_HEADERS }), displayErrors);
  }

  public Delete(endPoint: string, useToken: boolean = true, displayErrors: boolean = true): Observable<any> {
    const link: string = this.GenLink(endPoint, useToken);
    return this.ProcessHttpRequest(this.http.delete<JSON>(link, { headers: HTTP_HEADERS }), displayErrors);
  }

  public async SetToken(token: string) {
    this.token = token;
    await this.CheckReadiness();
    await this.storage.set('token', token);
  }

  public async SetUser(user: any) {
    this.user = user;
    await this.CheckReadiness();
    await this.storage.set('user', JSON.stringify(user));
  }

  public async SetTTL(ttl: number) {
    this.ttl = ttl;
    await this.CheckReadiness();
    await this.storage.set('ttl', Number(ttl));
  }

  public async GetToken() {
    await this.CheckReadiness();
    this.token = await this.storage.get('token');
    return this.token;
  }

  public async GetUser() {
    try {
      await this.CheckReadiness();
      this.user = JSON.parse(await this.storage.get('user'));
      return this.user;
    } catch {
      return null;
    }
  }

  public async GetTTL(): Promise<number> {
    await this.CheckReadiness();
    this.ttl = await this.storage.get('ttl');
    return this.ttl;
  }

  public async ClearStorage() {
    await this.CheckReadiness();
    await this.storage.clear();
  }

  public async HandleAPIError(error) {
    if(error.error.error != undefined) {
        this.toastAlert.ShowToast(error.error.error.message);
    }
  }

  private ProcessHttpRequest(request: Observable<JSON>, displayErrors): Observable<JSON> {
    this.loading.Show();
    return request.pipe(
      tap(
        () => this.loading.Dismiss(),
        error => {
          this.loading.Dismiss();
          if(!environment.production) {
            this.toastAlert.ShowToast(JSON.stringify(error), 5000);
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
    useToken = useToken && this.token && this.token.length > 0;

    let baseURL = `${this.getBaseURL()}${endPoint}?`;
    if (!!getVars) {
      for (const variable in getVars) {
        if (getVars[variable]) {
          baseURL = `${baseURL}${variable}=${getVars[variable]}&`;
        }
      }
    }
    return useToken ? baseURL + 'access_token=' + this.token : baseURL;
  }

  private RetryOnConnectionError(errorResponse: Observable<any>, displayErrors): Observable<any> {
    return errorResponse.pipe(
      mergeMap( (error, retryAttempts) => {
        if (retryAttempts >= RETRY_ATTEMPTS || !RETRY_STATUS_CODES.find(code => error.status == code)) {
          return throwError(error);
        }

        if (displayErrors) {
          this.toastAlert.ShowToast(`Connection lost. Retrying in ${RETRY_MILLISECONDS / 1000} seconds...`, 1000);
        }

        return timer(RETRY_MILLISECONDS);
      })
    );
  }

  private async CheckReadiness() {
    await this.platform.ready();
    await this.storage.ready();
  }
}
