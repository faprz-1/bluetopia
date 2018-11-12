import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/services/shared.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html'
})
export class LayoutComponent implements OnInit {
  maTheme : any =  this.sharedService.maTheme

  constructor(public sharedService : SharedService) {
    sharedService.maThemeSubject.subscribe((val) => {
      this.maTheme = val
    })
  }

  ngOnInit() {
  }

}
