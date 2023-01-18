import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment-timezone';
import { ApiService } from 'src/app/services/api.service';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-event-calendar',
  templateUrl: './event-calendar.component.html',
  styleUrls: ['./event-calendar.component.scss']
})
export class EventCalendarComponent implements OnInit {

  @Input() grade: string | null = null;
  @Input() group: string | null = null;
  @Input() templateId: string | null = null;
  @Input() strategyId: string | null = null;

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
      value: 0,
      name: 'Domingo',
    },
  ]
  year: number = moment().get('year');
  currentMonth: number = moment().get('month');
  month: Array<any> = [];

  constructor(
    private api: ApiService,
    private nav: NavigationService
  ) { }

  ngOnInit(): void {
    this.PopulateMonth(this.currentMonth);
  }

  PopulateMonth(month: number) {
    const days = moment().month(month).daysInMonth();
    let currentDay = 1;
    let yesterday = currentDay;
    let newWeek = this.weekDays.map(day => Object.assign({}, day));
    while(currentDay <= days) {
      let currentDate = moment(`${this.year}-${month+1}-${currentDay}`);
      let yesterdayDate = moment(`${this.year}-${month+1}-${yesterday}`);
      const weekDay = currentDate.weekday();
      if(weekDay == this.weekDays[0].value && yesterdayDate.weekday() == this.weekDays[6].value) {
        this.month.push(newWeek);
        newWeek = this.weekDays.map(day => Object.assign({}, day));
      }
      newWeek.find(newWeekDay => weekDay == newWeekDay.value).day = currentDay;
      yesterday = currentDay;
      currentDay++;
    }
    if(!!newWeek[0].day) this.month.push(newWeek);
    console.log(this.month);
  }
  
  FormatDay(day: number | string) {
    let formatedDay: string = '';
    if(typeof day === 'number'){
      formatedDay = String(day);
    }
    if(formatedDay.length == 1) return `0${formatedDay}`;
    return formatedDay;
  }
  
  AddEvent(weekDay: any) {
    let date = `${this.year}-${this.currentMonth+1}-${weekDay.day}`;
    this.nav.GoToUserRoute(`/grado/${this.grade}/grupo/${this.group}/plantillas/${this.templateId}/estrategias/${this.strategyId}/calendario/nuevo-evento/${date}`);
  }

}
