import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

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
  teamRoles: Array<any> = [
    {
      id: 1,
      name: 'Lider',
    },
    {
      id: 2,
      name: 'Creativo',
    },
    {
      id: 3,
      name: 'Cronómetro',
    },
    {
      id: 4,
      name: 'Redactor',
    },
  ];
  loading: any = {
    creating: false
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.GetParams();
  }

  GetParams() {
    this.activatedRoute.params.subscribe(params => {
      this.strategyId = params['strategyId'];
      this.GetStrategyStudents();
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
    
  }

}
