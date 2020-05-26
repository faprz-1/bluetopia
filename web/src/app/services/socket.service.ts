import { Injectable } from '@angular/core';
import * as io from "socket.io-client";
import { ApiService } from './api.service';

@Injectable()
export class SocketService 
{
  listeners: string[] = [];
  socket: SocketIOClient.Socket;

  constructor(private api:ApiService) 
  {
    let serverBaseURL = this.api.GetBaseURL().replace("/api", "");
    let socket = io.connect(serverBaseURL);
  
    if(JSON.parse(localStorage.getItem("user")) != null) 
    {
      let id = localStorage.getItem('token');
      let userId = JSON.parse(localStorage.getItem("user")).id;
    
      socket.on('connect', function() {
        socket.emit('authentication', {id: id, userId: userId });
        //socket.on('authenticated', function() {});
      });
    
      this.socket = socket;
    }
  }

  public Subscribe(model: string, id: string, method: string, callback)
  {
    let name = this.BuildListenerString(model, id, method);
    this.socket.on(name, callback);
    this.listeners.push(name); 
  }

  //Unsubscribe all containers
  public UnsubscribeAllContainers() 
  {
    for (let i = 0; i < this.listeners.length; i++) 
      this.socket.removeAllListeners();
    this.listeners = [];
  }

  //Unsubscribe one container..
  public UnsubscribeContainer(model: string, id: string, method: string) 
  {
    let name = this.BuildListenerString(model, id, method);
    this.socket.removeEventListener(name);

    // Remove listener from list
    this.listeners = this.listeners.filter(listener => listener != name);
  }

  private BuildListenerString(model: string, id: string, method: string) : string
  {
    if(!model || model.length === 0)
      throw 'Model is empty or not defined!';

    if(!id || id.length === 0)
      throw 'ID is empty or not defined!';

    if(!method || method.length === 0)
      throw 'Method is empty or not defined!';

    return `/${model}/${id}/${method}`;
  }
}
