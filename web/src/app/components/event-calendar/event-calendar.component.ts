import { Component, OnInit } from '@angular/core';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-event-calendar',
  templateUrl: './event-calendar.component.html',
  styleUrls: ['./event-calendar.component.scss']
})
export class EventCalendarComponent implements OnInit {

  weekDays: Array<any> = [
    {
      value: 1,
      name: 'Lunes',
    },
    {
      value: 2,
      name: 'Martes',
    },
    {
      value: 3,
      name: 'Miercoles',
    },
    {
      value: 4,
      name: 'Jueves',
    },
    {
      value: 5,
      name: 'Viernes',
    },
    {
      value: 6,
      name: 'Sabado',
    },
    {
      value: 7,
      name: 'Domingo',
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
