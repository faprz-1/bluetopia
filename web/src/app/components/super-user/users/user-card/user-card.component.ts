import { Component, OnInit, Input} from '@angular/core';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'pm-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  @Input() data : any
  constructor(public  api: ApiService) { }

  ngOnInit() {
  }

}
