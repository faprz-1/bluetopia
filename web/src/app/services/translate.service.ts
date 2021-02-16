import { Injectable } from '@angular/core';
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
  private _language: string;

  public defaultFormat: string = 'MMMM DD, YYYY, h:mm a';

  constructor() {
    this.language = window.navigator.language;
  }

  public CreateTimestamp(timestamp) {
    return moment(timestamp);
  }

  private SetLanguage() {
    moment.locale(this.language);
  }
}
