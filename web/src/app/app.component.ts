import { Component } from '@angular/core';
import { MessagingService } from './services/messaging.service';  
import { PushService } from './services/push.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent {
  title = 'app';
  message = null;  
  
  constructor(  
    private msgService: MessagingService,
    private pushService: PushService
  ) {}  
  
  ngOnInit() {
    this.pushService.init();
    let token = localStorage.getItem('token');  
    if(token){
      this.pushService.UpdatePushToken();
      this.msgService.getPermission()  
      this.msgService.receiveMessage()  
      this.message = this.msgService.currentMessage  
    }  
  }  
}



