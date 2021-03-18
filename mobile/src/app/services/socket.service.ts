import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

import io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  listeners: any = [];
  socket: any;
  ready = false;

  constructor(
    private api: ApiService,
  ) {
    this.Initialize();
  }

  async Initialize() {
    const token = await this.api.GetToken();
    const user = await this.api.GetUser();

    if (this.ready || !token || !user) {
      return;
    }

    try {
      const url = this.api.getBaseURL().replace('/api', '');
      const socket = io.connect(url);

      socket.on('connect', () => {
        socket.emit('authentication', {
          id: token,
          userId: user ? user.id : null,
        });
        socket.on('authenticated', () => {
        });
      });

      this.socket = socket;
      this.ready = true;
    } catch {
      await setTimeout(() => {}, 1000);
      this.Initialize();
    }
  }

  public async Subscribe(model: string, id: string, method: string, callback) {
    if (!this.ready || !this.socket) {
      await this.Initialize();
    }

    const name = this.BuildListenerString(model, id, method);
    this.socket.on(name, callback);
    this.listeners.push(name);
  }

  // Unsubscribe all containers
  public UnsubscribeAllContainers() {
    try {
      this.socket.removeAllListeners();
      this.listeners = [];
    } catch (err) {
      console.error('Cannot unsubscribe from socket');
    }
  }

  // Unsubscribe one container..
  public UnsubscribeContainer(model: string, id: string, method: string) {
    const name = this.BuildListenerString(model, id, method);
    this.socket.removeEventListener(name);

    // Remove listener from list
    this.listeners = this.listeners.filter(listener => listener != name);
  }

  private BuildListenerString(model: string, id: string, method: string): string {
    if (!model || model.length === 0) {
      throw new Error('Model is empty or not defined!');
    }

    if (!id || id.length === 0) {
      throw new Error('ID is empty or not defined!');
    }

    if (!method || method.length === 0) {
      throw new Error('Method is empty or not defined!');
    }

    return `/${model}/${id}/${method}`;
  }
}
