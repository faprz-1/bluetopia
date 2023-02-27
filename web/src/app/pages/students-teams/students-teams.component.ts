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
  students: Array<any> = [
    {
      name: 'Dante Carranza'
    },
    {
      name: 'Diego Perez'
    },
    {
      name: 'Joaquin Gutierrez'
    },
    {
      name: 'Dante Carranza'
    },
    {
      name: 'Diego Perez'
    },
    {
      name: 'Joaquin Gutierrez'
    },
    {
      name: 'Dante Carranza'
    },
    {
      name: 'Diego Perez'
    },
    {
      name: 'Joaquin Gutierrez'
    },
  ];
  teams: Array<any> = [];
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
  ]

  constructor(
    private activatedRoute: ActivatedRoute,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.GetParams();
    this.OnTeamOptionSelected(this.teamsOptions[1]);
  }

  GetParams() {
    this.activatedRoute.params.subscribe(params => {
      this.strategyId = params['strategyId'];
    });
  }

  GetStrategyStudents() {
    this.api.Get(``);
  }

  OnTeamOptionSelected(teamOption: any) {
    this.teams = [];
    console.log(teamOption);
    for(let i = 0; i < teamOption.value; i++) {
      this.teams.push({
        name: `Equipo ${i+1}`,
        students: []
      });
    }
    console.log(this.teams);
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

}
