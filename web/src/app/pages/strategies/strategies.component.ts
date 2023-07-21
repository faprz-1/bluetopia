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
  startegyStatuses: Array<any> = [];
  grades: Array<any> = [];
  groups: Array<any> = [];
  gradeSelected: any = null;
  groupSelected: any = null;
  strategies: Array<any> = [];
  loading: any = {};

  constructor(
    private api: ApiService,
    public nav: NavigationService
  ) { }

  ngOnInit(): void {
    this.user = this.api.GetUser();
    this.GetStrategyStatuses();
    this.GetGrades();
  }

  GetStrategyStatuses() {
    this.api.Get(`/StrategyStatuses`).subscribe(startegyStatuses => {
      this.startegyStatuses = startegyStatuses;
    }, err => {
      console.error("Error statuses", err);
    });
  }

  GetGrades() {
    this.loading.getting = true;
    this.api.Get(`/Grades`).subscribe(grades => {
      this.grades = grades;
      this.gradeSelected = !!this.grades.length ? this.grades[0] : null;
      this.GetGroups();
    }, err => {
      console.error("Error getting grades", err);
      this.loading.getting = false;
    });
  }
  
  GetGroups() {
    this.api.Get(`/Groups`).subscribe(groups => {
      this.groups = groups;
      this.groupSelected = !!this.groups.length ? this.groups[0] : null;
      this.GetStrategies();
    }, err => {
      console.error("Error getting groups", err);
      this.loading.getting = false;
    });
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
  
  GoToEdit(strategy:any){
    this.nav.GoToUserRoute(`plantillas/${strategy.templateId}/crear/${strategy.id}`)
  }
}
