import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgSelectComponent } from '@ng-select/ng-select';
import { ApiService } from 'src/app/services/api.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-create-strategy-teams',
  templateUrl: './create-strategy-teams.component.html',
  styleUrls: ['./create-strategy-teams.component.scss']
})
export class CreateStrategyTeamsComponent implements OnInit {

  strategyId: any;
  grade: any;
  group: any;
  strategy: any;
  students: Array<any> = [];
  studentsOptions: Array<any> = [];
  teamsOptions: Array<number> = [2, 3, 4, 5, 6, 7, 8];
  strategyTeams: Array<any> = [];
  saver = new Subject();
  saving: boolean = false;
  crumbs: Array<{name: string, route: string | null}> = [
    {name: 'Equipos', route: null},
    {name: 'Asigna a tus alumnos', route: null},
  ];

  strategyTeamsForm: FormGroup = new FormGroup({
    isByTeams: new FormControl(null, [Validators.required]),
    teamsNumber: new FormControl(null, []),
    fillMode: new FormControl('manual', []),
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private api: ApiService,
    private nav: NavigationService
  ) { }

  ngOnInit(): void {
    this.saver.subscribe(() => {
      this.SaveAll();
    });
    this.GetParams();
  }

  BuildStudentFullName(student: any): string {
    return `${student.name} ${student.fatherLastname} ${student.motherLastname}`;
  }

  GetParams() {
    this.activatedRoute.params.subscribe(params => {
      this.strategyId = params['strategyId'];
      this.GetStrategy();
    });
  }

  async SaveAll(goToNextStep: boolean = false) {
    if(this.saving) return;
    try {
      this.saving = true;
      await this.SaveStrategy();
      await this.SaveStrategyTeams();
      this.saving = false;
      if(goToNextStep) {
        let formValue = this.strategyTeamsForm.value;
        this.nav.GoToUserRoute(
          `mis-estrategias/${this.strategyId}/${formValue.isByTeams ? 'asignar-roles' : 'progreso-equipos'}`
        );
      }
    } catch (err) {
      console.error("Error saving changes", err);
      this.saving = false;
    }
  }

  GetStrategy() {
    this.api.Get(`/Strategies/${this.strategyId}`).subscribe(
      (strategy) => {
        this.strategyTeamsForm.get('isByTeams')?.setValue(strategy.isByTeams);
        this.strategy = strategy;
        this.grade = strategy.strategyGroup ? strategy.strategyGroup.grade : null;
        this.group = strategy.strategyGroup ? strategy.strategyGroup.group : null;
        if(!!strategy.teams?.length) {
          this.strategyTeamsForm.get('teamsNumber')?.setValue(strategy.teams?.length);
          this.strategyTeams = strategy.teams.map((team: any) => {
            team.members = team.members.map((member: any) => member.student);
            return team;
          });
        }
        this.GetGradeGroupStudents();
      }, (err) => {
        console.error('Error getting strategy', err);
      }
    );
  }

  SaveStrategy() {
    return new Promise<void>((res, rej) => {
      let strategy = {
        id: this.strategyId,
        ...this.strategyTeamsForm.value
      }
      this.api.Patch(`/Strategies/${this.strategyId}/OnlyStrategy/1`, {strategy}).subscribe(strategySaved => {
        res();
      }, err => {
        console.error("Error saving strategy", err);
        rej(err);
      });
    });
  }

  SaveStrategyTeams() {
    return new Promise<void>((res, rej) => {
      this.api.Patch(`/Teams/OfStrategy/${this.strategyId}`, {teams: this.strategyTeams}).subscribe(teamsCreated => {
        res();
      }, err => {
        console.error("Error patching teams", err);
        rej(err);
      });
    });
  }

  GetGradeGroupStudents() {
    this.api.Get(`/Students/OfTeacher/${this.api.GetUser()?.id}/FilteredBy/Grade/${!!this.grade ? this.grade.id : 0}/Group/${!!this.group ? this.group.id : 0}`).subscribe(students => {
      this.students = students;
      if(this.strategyTeams.length) {
        this.studentsOptions = students.filter((student: any) => {
          return !this.strategyTeams.some((team: any) => team.members.some((member: any) => member.id == student.id));
        });
      }
    }, err => {
      console.error("Error getting students", err);
    });
  }

  OnFillModeChange(fillMode: string) {
    if(fillMode == 'auto') {
      const teamsNumber = this.strategyTeams.length;
      if(teamsNumber > 0) {
        let studentsPerTeam = Math.floor(this.students.length / teamsNumber);
      }
    }
  }

  OnTeamsOptionSelected(teamsNumber: number) {
    if(!!teamsNumber) {
      this.studentsOptions = Array.from(this.students);
      this.strategyTeams = [];
      for (let i = 0; i < teamsNumber; i++) {
        this.strategyTeams.push(Object.assign({}, {members: []}));
      }
      this.saver.next();
    }
  }

  OnStudentSelected(team: any, student: any, studentsSelect: NgSelectComponent) {
    if(!!student) {
      team.members.push(student);
      const studentIdx = this.studentsOptions.findIndex(s => s.id == student.id);
      if(studentIdx != -1) this.studentsOptions.splice(studentIdx, 1);
      studentsSelect.handleClearClick();
      this.saver.next();
    }
  }

  RemoveMemberOfTeam(team: any, idx: number) {
    this.studentsOptions.push(...team.members.splice(idx, 1));
    this.saver.next();
  }

}
