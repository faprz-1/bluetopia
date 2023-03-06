import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-teams-progress',
  templateUrl: './teams-progress.component.html',
  styleUrls: ['./teams-progress.component.scss']
})
export class TeamsProgressComponent implements OnInit {

  strategyId: string | number = 0;
  strategy: any = null;
  colors: Array<string> = [ '#1081FB', '#2ED2A3', '#DF4655' ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.GetParams();
  }

  GetParams() {
    this.activatedRoute.params.subscribe(params => {{
      this.strategyId = params['strategyId'];
      this.GetStrategy();
    }});
  }

  GetStrategy() {
    this.api.Get(`/Strategies/${this.strategyId}`).subscribe(strategy => {
      console.log(strategy);
      this.strategy = strategy;
    }, err => {
      console.error("Error getting strategy data", err);
    });
  }

}
