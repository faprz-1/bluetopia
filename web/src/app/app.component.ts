import { Component } from '@angular/core';
import { PushService } from './services/push.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent {
  title = 'app';
  message = null;  
  
  constructor(  
    private pushService: PushService
  ) {}  
  
  ngOnInit() {
    this.pushService.init();
  }  
}



