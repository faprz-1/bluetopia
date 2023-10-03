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

  async ngOnInit() {
   this.user = await this.api.GetUser();
    this.GetStrategies();
    this.GetStrategyStatuses();
   this.GetTeacherGroups();
  }

   GetTeacherGroups() {
    let user = this.api.GetUser();
    this.api.Get(`/TeacherGroups/of/${user.teacher?.id}`).subscribe(
      (groups) => {
        this.SetGrades(groups);
      },
      (err) => {
        console.error('Error getting groups', err);
      }
    );
  }

   SetGrades(teacherGroups: any) {
    this.grades = [];
    let groupedByGrade = this.GroupByProperty(teacherGroups, 'gradeId');
    groupedByGrade.forEach((grade: any) => {
      let auxGrade: any = grade[0].grade;
      auxGrade.groups = grade.map((item: any) => item.group);
      this.grades.push(auxGrade);
    });
    this.grades = this.SortbyName(this.grades);
  }

   GroupByProperty(teacherGroups: any, property: string) {
    const groupedData: any = Object.values(
      teacherGroups.reduce((result: any, item: any) => {
        const valueToGroupBy = item[property];
        if (!result[valueToGroupBy]) {
          result[valueToGroupBy] = [];
        }
        result[valueToGroupBy].push(item);
        return result;
      }, {})
    );
    
    return groupedData;
  }

  SetGroupsOfSelectedGrade(gradeId:any){
    this.groups = [];
    if(!gradeId || gradeId == null || gradeId == 0){
       this.groups = [];
      }
    else{
      let selectedGrade = this.grades.filter((grade:any)=> grade.id == gradeId);
      this.groups = selectedGrade.length > 0 ? selectedGrade[0].groups:[];
    }
    this.groups = this.SortbyName(this.groups);
  }


  SortbyName(objects:any){
    return objects.sort((a:any, b:any) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      return nameA.localeCompare(nameB);
    });
  };
   GetStrategyStatuses() {
    this.api.Get(`/StrategyStatuses`, ).subscribe(startegyStatuses => {
      this.startegyStatuses = startegyStatuses;
    }, err => {
      console.error("Error statuses", err);
    });
  }

  GetStrategies() {
     if (!!this.gradeSelected) this.SetGroupsOfSelectedGrade(this.gradeSelected.id);
    let endpoint: string;
    switch (this.user.role.name) {
      case 'School':
        endpoint = `/Strategies/OfSchool/${this.user ? this.user.schoolId: 0}`;
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
     if (!!this.gradeSelected || !!this.groupSelected) {
    this.strategies = this.strategies.filter((strategy) => {
    let strategyGroup = strategy.strategyGroup;
    return (!this.gradeSelected || (strategyGroup && strategyGroup.grade && strategyGroup.grade.name == this.gradeSelected.name)) &&
           (!this.groupSelected || (strategyGroup && strategyGroup.group && strategyGroup.group.name == this.groupSelected.name));
  });
}
    }, err => {
      console.error("Erro getting teacher strategies", err);
    });
  }

  OnStrategyChange(event: {type: string, data: any}) {
    switch (event.type) {
      case 'delete':
        let idx = this.strategies.findIndex(strategy => strategy.id == event.data.strategyId);
        if(idx != -1) this.strategies.splice(idx, 1);
        break;
    }
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
