import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { ToastService } from 'src/app/services/toast.service';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-students-teams',
  templateUrl: './students-teams.component.html',
  styleUrls: ['./students-teams.component.scss']
})
export class StudentsTeamsComponent implements OnInit {

  strategyId: string | number = 0;
  students: Array<any> = [];
  teams: Array<any> = [];
  colors: Array<string> = [ '#1081FB', '#2ED2A3', '#DF4655' ];
  teamsOptions: Array<any> = [
    {
      name: '2 equipos',
      value: 2,
    },
    {
      name: '3 equipos',
      value: 3,
    },
    {
      name: '4 equipos',
      value: 4,
    },
    {
      name: '5 equipos',
      value: 5,
    },
  ];
  teamRoles: Array<any> = [];
  loading: any = {
    creating: false
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private api: ApiService,
    private toast: ToastService,
    public nav: NavigationService
  ) { }

  ngOnInit(): void {
    this.GetTeamRoles();
    this.GetParams();
  }

  GetParams() {
    this.activatedRoute.params.subscribe(params => {
      this.strategyId = params['strategyId'];
      this.GetStrategyStudents();
    });
  }

  GetTeamRoles() {
    this.api.Get(`/TeamRoles`).subscribe(teamRoles => {
      this.teamRoles = teamRoles;
    }, err => {
      console.error("Error getting team roles", err);
    });
  }

  GetStrategyStudents() {
    this.api.Get(`/Strategies/${this.strategyId}/Students`).subscribe(students => {
      this.students = students;
    }, err => {
      console.error("Error getting strategy students", err);
    });
  }

  OnTeamOptionSelected(teamOption: any) {
    this.teams = [];
    for(let i = 0; i < teamOption.value; i++) {
      this.teams.push({
        name: `Equipo ${i+1}`,
        members: []
      });
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  CreateStrategyTeams() {
    let valid = true;
    console.log(this.teams);
    this.teams.forEach(team => {
      if(team.members.some((member: any) => !member.roleId)) valid = false;
    });
    if(!valid) {
      this.toast.ShowWarning('Favor de seleccionar rol para todos los integrantes de los equipos');
      return;
    }
    this.api.Post(`/Teams/Array`, {teams: this.teams, strategyId: Number(this.strategyId)}).subscribe(newTeams => {
      this.toast.ShowSuccess(`${newTeams.length} equipos creados`);
    }, err => {
      console.error("Error creating teams", err);
    });
  }

}
