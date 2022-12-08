import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { NavigationService } from 'src/app/services/navigation.service';
import * as moment from 'moment';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  constructor(
    public navigation: NavigationService,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    let user = this.api.GetUser();
    console.log(user);
    if(!!user && !!user.role.name) {
      let ttl = this.api.GetTTL();
      let today = moment();
      if(ttl != null && today.isBefore(ttl)) this.navigation.GoToUserRoute('home');
    }
  }

}
