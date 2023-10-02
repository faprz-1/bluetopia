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
  grade: any;
  group: any;
  strategy: any = null;
  students: Array<any> = [];
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
  GoToGradeStudentParcialProduct(student: any, parcialProduct: any) {
    this.nav.GoToUserRoute(`mis-estrategias/${this.strategyId}/progreso-estudiantes/${student.id}/evaluar/${parcialProduct.id}`);
  }

  GetParams() {
    this.activatedRoute.params.subscribe(params => {
      this.strategyId = params['strategyId'];
      this.crumbs[0].route = `/mis-estrategias`;
      this.crumbs[1].route = `/mis-estrategias`;
      this.GetStrategy();
    });
  }

  GetStrategy() {
    this.api.Get(`/Strategies/${this.strategyId}`).subscribe((strategy: any) => {
        this.strategy = strategy;
        this.grade = strategy.strategyGroup ? strategy.strategyGroup.grade : null;
        this.group = strategy.strategyGroup ? strategy.strategyGroup.group : null;
        this.GetGradeGroupStudents();
      }, (err) => {
        console.error('Error getting strategy', err);
      }
    );
  }

  GetGradeGroupStudents() {
    let endpoint = `/Students`;
    const user = this.api.GetUser();
    switch (user?.role?.name) {
      case 'School': endpoint += `/OfSchool/${user.schoolId}`; break;
      case 'Teacher': endpoint += `/OfTeacher/${user.id}`; break;
      default: endpoint += `/OfSchool/${user.schoolId}`; break;
    }
    this.api.Get(`${endpoint}/FilteredBy/Grade/${!!this.grade ? this.grade.id : 0}/Group/${!!this.group ? this.group.id : 0}`).subscribe(students => {
      this.students = students;
    }, err => {
      console.error("Error getting students", err);
    });
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
    let strategy = {
      id: this.strategyId,
      isByTeams: !!this.strategy ? !this.strategy.isByTeams : false,
      useCustomRoles: false,
    }
    this.api.Patch(`/Strategies/${this.strategyId}/OnlyStrategy/1`, {strategy}).subscribe(strategySaved => {
      if(strategy.isByTeams) this.nav.GoToUserRoute(`mis-estrategias/${this.strategyId}/crear-equipos`);
      else {
        this.api.Patch(`/Strategies/${this.strategyId}/ResetTeams`, {}).subscribe(updated => {
          window.location.reload();
        }, err => {
          console.error("Error rese4ting teams members roles", err);
        });
      }
    }, err => {
      console.error("Error saving strategy", err);
    });
  }

}
