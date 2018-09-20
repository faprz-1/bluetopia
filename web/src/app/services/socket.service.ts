import { Injectable } from '@angular/core';
import * as io from "socket.io-client";
import { ApiService } from './api.service';

@Injectable()
export class SocketService {
  container: any = [];
  socket: any;
  constructor(private api: ApiService) {
    var url = this.api.baseURL.replace("/api", "");
    let socket = io.connect(url);

    var id = localStorage.getItem('token');
    var userId = JSON.parse(localStorage.getItem("user")).id;

    console.log("conectando auth socket", id, userId);
    socket.on('connect', function () {
      socket.emit('authentication', {
        id: id,
        userId: userId
      });
      socket.on('authenticated', function () {
        // use the socket as usual
        console.log('User is authenticated');
      });
    });

    this.socket = socket;
  }

  subscribe(options, callback) {
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
  } //end subscribe

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
