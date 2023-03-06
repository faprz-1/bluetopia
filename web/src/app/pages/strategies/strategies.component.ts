import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-strategies',
  templateUrl: './strategies.component.html',
  styleUrls: ['./strategies.component.scss']
})
export class StrategiesComponent implements OnInit {

  strategies: Array<any> = [];

  constructor(
    private api: ApiService,
    private nav: NavigationService
  ) { }

  ngOnInit(): void {
    this.GetStrategies();
  }

  GetStrategies() {
    const user = this.api.GetUser();
    this.api.Get(`/Strategies/OfTeacher/${user ? user.id: 0}`).subscribe(strategies => {
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
    this.nav.GoToUserRoute(`grado/${strategy.strategyGroup.grade.name}/grupo/${strategy.strategyGroup.group.name}/plantillas/${strategy.templateId}/estrategias/${strategy.id}/calendario`)
  }

}
