import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  @Input() data : any;

  get baseURL() {
    return this.api.GetBaseURL();
  }

  constructor(public  api: ApiService) { }

  ngOnInit() {
  }

}
