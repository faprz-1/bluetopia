import { EventEmitter, Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  public get language() {
    return this._language;
  }
  public set language(lang: string) {
    this._language = lang;
    this.SetLanguage();
  }
  private _language: string = '';
  public defaultFormat: string = 'MMMM DD, YYYY, h:mm a';

  public languageChangeEmitter = new EventEmitter<string>();

  constructor() {
    this.language = window.navigator.language;
  }

  public CreateTimestamp(timestamp: string) {
    return moment(timestamp);
  }

  private SetLanguage() {
    moment.locale(this.language);
    this.languageChangeEmitter.emit(this.language);
  }
}
