import { Injectable } from '@angular/core';

import { ApiProvider } from '../api/api';

@Injectable()
export class Items {

  constructor(public api: ApiProvider) { }

  query(params?: any) {
    return this.api.get('/items', params);
  }

  add(item: any) {
  }

  delete(item: any) {
  }

}
