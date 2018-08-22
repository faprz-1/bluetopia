import { Component } from '@angular/core';
import { MessagingService } from './services/messaging.service';  
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent {
  title = 'app';
  message = null;  
  
  constructor(  
    private msgService: MessagingService  
  ) {}  
  
  ngOnInit() {  
    let token = localStorage.getItem('token');  
    if(token){  
      this.msgService.getPermission()  
      this.msgService.receiveMessage()  
      this.message = this.msgService.currentMessage  
    }  
  }  
}



