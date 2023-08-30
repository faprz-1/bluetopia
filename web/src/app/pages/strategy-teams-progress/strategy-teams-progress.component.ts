import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-strategy-teams-progress',
  templateUrl: './strategy-teams-progress.component.html',
  styleUrls: ['./strategy-teams-progress.component.scss']
})
export class StrategyTeamsProgressComponent implements OnInit {

  strategyId: any;
  strategy: any = null;
  crumbs: Array<{name: string, route: string | null}> = [
    {name: 'Equipos', route: null},
    {name: 'Visualiza el progreso de tus equipos', route: null},
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private api: ApiService,
    private nav: NavigationService
  ) { }

  ngOnInit(): void {
    this.GetParams();
  }

  BuildStudentFullName(student: any): string {
    return `${student.name} ${student.fatherLastname} ${student.motherLastname}`;
  }

  GoToGradeTeamParcialProduct(team: any, parcialProduct: any) {
    this.nav.GoToUserRoute(`mis-estrategias/${this.strategyId}/progreso-equipos/${team.id}/evaluar/${parcialProduct.id}`);
  }

  GetParams() {
    this.activatedRoute.params.subscribe(params => {
      this.strategyId = params['strategyId'];
      this.GetStrategy();
    });
  }

  GetStrategy() {
    this.api.Get(`/Strategies/${this.strategyId}`).subscribe((strategy: any) => {
        this.strategy = strategy;
      }, (err) => {
        console.error('Error getting strategy', err);
      }
    );
  }

  SaveStrategy() {
    return new Promise<void>((res, rej) => {
      let strategy = {
        id: this.strategyId,
        isByTeams: !!this.strategy ? !this.strategy.isByTeams : false
      }
      this.api.Patch(`/Strategies/${this.strategyId}/OnlyStrategy/1`, {strategy}).subscribe(strategySaved => {
        res();
      }, err => {
        console.error("Error saving strategy", err);
        rej(err);
      });
    });
  }
  
  ToggleIsByTeams() {
    return new Promise<void>((res, rej) => {
      let strategy = {
        id: this.strategyId,
        isByTeams: !!this.strategy ? !this.strategy.isByTeams : false
      }
      this.api.Patch(`/Strategies/${this.strategyId}/OnlyStrategy/1`, {strategy}).subscribe(strategySaved => {
        res();
      }, err => {
        console.error("Error saving strategy", err);
        rej(err);
      });
    });
  }

}
