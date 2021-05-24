import { Injectable } from '@angular/core';
// import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
declare var io: any;

export interface SocketUrl {
  model: string;
  userId: string;
  method: string;
}

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  listeners: string[] = [];

  constructor(
    private api: ApiService,
    // private socket: Socket
  ) {}

  public SendMessage(listener: SocketUrl, data: any) {
    const name = this.BuildListenerString(listener);
    // this.socket.emit(name, data);
  }

  public Subscribe(listener: SocketUrl)/*: Observable<any>*/ {
    const name = this.BuildListenerString(listener);
    // return this.socket.fromEvent(name);
  }

  public UnsubscribeAll() {
    // this.socket.removeAllListeners();
  }

  public UnsubscribeContainer(listener: SocketUrl) {
    let name = this.BuildListenerString(listener);
    // this.socket.removeListener(name);
  }

  private BuildListenerString({model, userId, method}: SocketUrl): string {
    if (!model) {
      throw 'Model is empty or not defined!';
    } if (!userId) {
      throw 'ID is empty or not defined!';
    } if (!method) {
      throw 'Method is empty or not defined!';
    } else {
      return `/${model}/${userId}/${method}`;
    }
  }
}
