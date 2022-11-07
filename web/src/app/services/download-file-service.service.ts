import { Injectable } from '@angular/core';
import { ApiService } from './../services/api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DownloadFileService {

  constructor(
    private api: ApiService,
    public http: HttpClient
  ) { }

  GetNormalByHTTP(url: string): Observable<Blob> {
    return this.http.get(url, {
      responseType: 'blob'
    })
  }
  
  GetByHTTP(url: string): Observable<Blob> {
    return this.http.get(this.api.GetBaseURL() + url, {
      responseType: 'blob'
    })
  }

  Download(url: string, name: string = '') {
    this.GetByHTTP(url).subscribe(blob => {
      const a = document.createElement('a');
      const objectUrl = URL.createObjectURL(blob);
      a.setAttribute('href', objectUrl);
      a.setAttribute('download', name);
      a.click();
      a.remove();
    });
  }

  DownloadWithoutApi(url: string, name: string = '') {
    this.GetNormalByHTTP(url).subscribe(blob => {
      const a = document.createElement('a');
      const objectUrl = URL.createObjectURL(blob);
      a.setAttribute('href', objectUrl);
      a.setAttribute('download', name);
      a.click();
      a.remove();
    });
  }
}
