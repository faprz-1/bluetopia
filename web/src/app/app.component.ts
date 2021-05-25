import { Component } from '@angular/core';
import { PushService } from './services/push.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Template 4.0';
  constructor(  
    private pushService: PushService,
  ) {}  
  
  ngOnInit() {
    this.pushService.init();
  }
}
