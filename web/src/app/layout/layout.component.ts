import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocketService } from '../services/socket.service';
import { SharedService } from '../shared/services/shared.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  maTheme : any =  this.sharedService.maTheme

  constructor(
    public sharedService : SharedService,
    private router: Router,
    private socket: SocketService,
  ) {
    sharedService.maThemeSubject.subscribe((val) => {
      this.maTheme = val
    })
  }

  ngOnInit() {
  }

}
