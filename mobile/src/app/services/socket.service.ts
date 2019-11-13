import { Injectable } from '@angular/core';
import { ApiService, BASEURL } from './api.service';
import { Storage } from '@ionic/storage';

import io from "socket.io-client"; 

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  container: any = []; 
  socket: any; 
  ready:boolean=false; 

  constructor(
    private api: ApiService,
    private storage: Storage
    ) { 
     
    this.storage.get("token").then((token) =>{ 
      if(token){
        this.storage.get("user").then((user) =>{ 
          var id = token; 
          var userId = user.id; 
          +   this.init(id,userId); 
        }); 
      }
    }); 
  } 
 
  init(id,userId){
    var url = BASEURL.replace("/api", "");
    let socket = io.connect(url);
  
    console.log("conectando auth socket", id, userId);
    socket.on('connect', function (s) {
      socket.emit('authentication', {
        id: id,
        userId: userId
      });
      socket.on('authenticated', function (s) {
        // use the socket as usual
        console.log('User is authenticated');
      });
    });
  
    this.socket = socket;
    this.ready=true;
  }
 
  subscribe(options, callback) { 
    if (this.ready){ 
 
      if (options) { 
        var model = options.model; 
        var method = options.method; 
        var id = options.id; 
         
        var name = "" 
        name += (model) ? '/' + model : ''; 
        name += (id) ? '/' + id : ''; 
        name += (method) ? '/' + method : ''; 
        console.log("socket", name); 
        this.socket.on(name, callback); 
        //Push the container.. 
        this.pushContainer(name); 
      } else { 
        throw 'Error: Option must be an object'; 
      } 
    } 
    else{ 
      setTimeout(()=>{ 
        console.log("timeout por suscripcion"); 
        this.subscribe(options,callback); 
      },200) 
    } //end subscribe 
  } 
 
  pushContainer(subscriptionName) { 
    this.container.push(subscriptionName); 
  } 
 
  //Unsubscribe all containers.. 
  unSubscribeAll() { 
    console.log("desuscribiendo"); 
    for (var i = 0; i < this.container.length; i++) { 
      this.socket.removeAllListeners(this.container[i]); 
    } 
    //Now reset the this.container.. 
    this.container = []; 
  } 
 
  //Unsubscribe one container.. 
  unSubscribeOne(options) { 
    var model = options.model; 
    var method = options.method; 
    var id = options.id; 
 
    var name = "" 
    name += (model) ? '/' + model : ''; 
    name += (id) ? '/' + id : ''; 
    name += (method) ? '/' + method : ''; 
 
    this.socket.removeAllListeners(name); 
 
    //Now reset the this.container.. 
    // this.container.splice(this.container.indexOf(name)); 
  } 
}