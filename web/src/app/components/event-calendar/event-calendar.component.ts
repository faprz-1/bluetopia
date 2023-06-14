import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  events: Array<any> = [];
  month: Array<any> = [];

  public get previousMonth() {
    return --this.currentMonth;
  }
  public get nextMonth() {
    return ++this.currentMonth;
  }

  public get monthAndYear() {
    return moment(`${this.year}-${this.currentMonth+1}-01`).format('MMMM YYYY');
  }

  constructor(
    private api: ApiService,
    private nav: NavigationService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.GetParams();
    moment.locale('es');
    this.PopulateMonth(this.currentMonth);
  }

  GetParams() {
    this.activatedRoute.params.subscribe(params => {
      this.strategyId = params['strategyId'];
      this.GetStrategyEvents();
    })
  }

  PopulateMonth(month: number) {
    if(month == -1) {
      month = this.currentMonth = 11;
      this.year--;
    }
    else if(month == 12) {
      month = this.currentMonth = 0;
      this.year++;
    }
    const days = moment().month(month).daysInMonth();
    let currentDay = 1;
    let yesterday = currentDay;
    let newWeek = this.weekDays.map(day => Object.assign({}, day));
    this.month = [];
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
  }

  GetStrategyEvents() {
    this.api.Get(`/Events/OfStrategy/${this.strategyId}`).subscribe(events => {
      console.log(events);
      this.events = events;
    }, err => {
      console.error("Erro getting month events", err);
    });
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
    this.nav.GoToUserRoute(`estrategias/${this.strategyId}/calendario/nuevo-evento/${date}`);
  }

  GetEventsOfDate(date: string = ''): Array<any> {
    let dateParts = date.split('-');
    dateParts[1].length == 1 ? dateParts[1] = `0${dateParts[1]}` : null;
    dateParts[2].length == 1 ? dateParts[2] = `0${dateParts[2]}` : null;
    date = dateParts.join('-');
    if(!date) return [];
    return this.events.filter(event => event.date.includes(date));
  }

  GetEventName(event: any) {
    if(!!event.start) return event.start;
    else if(!!event.parcialProduct) return `${event.parcialProduct.name}`;
    else return `Sin nombre`;
  }

}
