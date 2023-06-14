import { Component, OnInit } from '@angular/core';
import { Moment } from 'moment-timezone';
import * as moment from 'moment-timezone';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-week-calendar',
  templateUrl: './week-calendar.component.html',
  styleUrls: ['./week-calendar.component.scss']
})
export class WeekCalendarComponent implements OnInit {

  now: Moment = moment();
  days: Array<any> = [];

  public get today() {
    return `Fecha de hoy ${this.now.format('DD/MM/YYYY')}`;
  }

  constructor(
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.PopulateWeek();
  }

  PopulateWeek() {
    const daysLabels = ['L', 'M', 'M', 'J', 'V', 'S', 'S'];
    const weekDay = this.now.weekday();
    let monthDays = this.now.daysInMonth();
    this.days = [];
    for(let i = 1; i < 8; i++) {
      let month = Number(this.now.format('MM'));
      let day = Number(this.now.format('DD'));
      day = day - weekDay + i;
      if(day <= 0) {
        month--;
        let previousMonthDays = moment().month(month-1).daysInMonth();
        day = previousMonthDays + day;
      } else if(day > monthDays) {
        month++;
        day = day - monthDays;
      }

      let dayObj = {
        value: i,
        label: daysLabels[i-1],
        number: day,
        date: moment(this.GetDate(this.now.year(), month, day)).format(`YYYY-MM-DD`),
        events: [
          {name: 'Entrega de investigación de las marmotas'},
          {name: 'Practica “Experimento y conozco mi entorno”'},
        ]
      }
      this.days.push(dayObj);
    }
  }

  GetDate(year: number | string, month: number | string, day: number | string): string {
    switch (typeof month) {
      case 'string':
        if(month.length < 2) month = `0${month}`
        break;
      case 'number':
        month = (month <= 9) ? `0${month}` : `${month}`;
        break;
    }
    switch (typeof day) {
      case 'string':
        if(day.length < 2) day = `0${day}`
        break;
      case 'number':
        day = (day <= 9) ? `0${day}` : `${day}`;
        break;
    }

    return `${year}-${month}-${day}`;
  }

}
