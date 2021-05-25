import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../../services/api.service';

@Pipe({
  name: 'jarabeImage'
})
export class JarabeImagePipe implements PipeTransform {
  constructor(
    private api: ApiService,
  ) {}

  sizes: Array < String > = ['', 'avatar', 'thumb', 'small', 'medium', 'big'];

  transform(file:any={URL:""}, name: string = ''): string {
    if(!file || !file.URL){
      return "assets/img/no-image-found.png";
    }
    file.URL = this.GetFullUrl(file.URL, this.api);
    if(!file.resize) { 
      return file.URL;
    }
    
    name = this.CheckSizeName(name);
    return this.PrepareUrlWithSufix(file.URL, name);
  }

  private GetFullUrl(url: string, api: any) {
    if (!(url.includes('https://') || url.includes('http://'))) {
      if (api) {
        if (api.hasOwnProperty('baseURL')) {
          url = api['baseURL'] + url;
        } else if (api.getBaseURL) {
          url = api['getBaseURL']() + url;
        }
      }
    }
    return url;
  }

  private CheckSizeName(name: string) {
    if (this.sizes.findIndex(size => size === name) === -1) {
      name = '';
    }
    return name;
  }

  private PrepareUrlWithSufix(url: string, name: string) {
    let newUrl = url.split('/').reverse();
    newUrl[0] = `${name}` + newUrl[0];
    return environment.baseURL + newUrl.reverse().join('/');
  }
}
