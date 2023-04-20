import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-strategies',
  templateUrl: './strategies.component.html',
  styleUrls: ['./strategies.component.scss']
})
export class StrategiesComponent implements OnInit {

  user: any = null;
  strategies: Array<any> = [];

  constructor(
    private api: ApiService,
    public nav: NavigationService
  ) { }

  ngOnInit(): void {
    this.user = this.api.GetUser();
    this.GetStrategies();
  }

  GetStrategies() {
    let endpoint: string;
    switch (this.user.role.name) {
      case 'School':
        endpoint = `/Strategies/OfSchool/${this.user ? this.user.id: 0}`;
        break;
      case 'Teacher':
        endpoint = `/Strategies/OfTeacher/${this.user ? this.user.id: 0}`;
        break;
      default:
        endpoint = '';
        break;
    }
    this.api.Get(endpoint).subscribe(strategies => {
      this.strategies = strategies;
    }, err => {
      console.error("Erro getting teacher strategies", err);
    });
  }

  GoToTeams(strategy: any) {
    this.nav.GoToUserRoute(`mis-estrategias/${strategy.id}/equipos`);
  }
  GoToTeamsProgress(strategy: any) {
    this.nav.GoToUserRoute(`mis-estrategias/${strategy.id}/progreso-equipos`);
  }

  GoToCalendar(strategy: any) {
    this.nav.GoToUserRoute(`estrategias/${strategy.id}/calendario`)
  }

}
