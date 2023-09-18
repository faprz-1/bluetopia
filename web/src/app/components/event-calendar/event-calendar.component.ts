import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment-timezone';
import { ApiService } from 'src/app/services/api.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { EventCalendarConfig } from 'src/app/shared/types';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-event-calendar',
  templateUrl: './event-calendar.component.html',
  styleUrls: ['./event-calendar.component.scss']
})
export class EventCalendarComponent implements OnInit {

  @Input() strategyId: string | null = null;
  @Input() events: Array<any> = [];
  @Input() config: EventCalendarConfig = {
    controlsAlign: 'start',
    mode: 'monthly'
  };

  @Output() onDayClicked: EventEmitter<any> = new EventEmitter();

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
  year: number = moment().tz(environment.timeZone).get('year');
  currentMonth: number = moment().tz(environment.timeZone).get('month');
  month: Array<any> = [];
  currentWeek: Array<any> = [];

  public get controlsLabel() {
    let monthYear = `${moment(this.currentWeek[0].date).format(`MMMM`)}`;
    if(this.weekFirstDay > this.weekLastDay)
      monthYear += `-${moment(this.currentWeek[this.currentWeek.length - 1].date).format(`MMMM`)}`;
    monthYear += ` ${this.year}`;
    switch (this.config.mode) {
      case 'monthly':
        return monthYear;
      case 'weekly':
        return `${this.weekFirstDay}-${this.weekLastDay} ${monthYear}`;
      default:
        return monthYear;
    }
  }

  private get weekFirstDay() {
    const date = this.currentWeek[0]?.date;
    return !!date ? date.split('-').pop() : '??';
  }
  private get weekLastDay() {
    const date = this.currentWeek[this.currentWeek.length - 1]?.date;
    return !!date ? date.split('-').pop() : '??';
  }

  constructor(
    private api: ApiService,
    private nav: NavigationService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    moment.locale('es');
    this.currentWeek = Array.from(this.weekDays);
    this.GetParams();
    this.PopulateMonth();
    this.PopulateWeek();
  }

  GetParams() {
    this.activatedRoute.params.subscribe(params => {
      this.strategyId = params['strategyId'];
    });
  }

  ChangeCalendarTick(tick: number) {
    switch (this.config.mode) {
      case 'monthly':
        this.currentMonth += tick;
        if(this.currentMonth == -1) {
          tick = this.currentMonth = 11;
          this.year--;
        }
        else if(this.currentMonth == 12) {
          tick = this.currentMonth = 0;
          this.year++;
        }
        this.PopulateMonth();
        break;

      case 'weekly':
        this.PopulateWeek(moment(this.currentWeek[0].date).add(tick, 'week').tz(environment.timeZone).format('YYYY-MM-DD'));
        break;

      default:
        this.currentMonth += tick;
        if(this.currentMonth == -1) {
          tick = this.currentMonth = 11;
          this.year--;
        }
        else if(this.currentMonth == 12) {
          tick = this.currentMonth = 0;
          this.year++;
        }
        this.PopulateMonth();
        break;
    }
  }

  PopulateMonth() {
    const days = moment().tz(environment.timeZone).month(this.currentMonth).daysInMonth();
    let currentDay = 1;
    let yesterday = currentDay;
    let newWeek = this.weekDays.map(day => Object.assign({}, day));
    this.month = [];
    while(currentDay <= days) {
      let currentDate = moment(`${this.year}-${this.currentMonth+1}-${currentDay}`);
      let yesterdayDate = moment(`${this.year}-${this.currentMonth+1}-${yesterday}`);
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
    this.nav.GoToUserRoute(`mis-estrategias/${this.strategyId}/calendario/${date}`);
  }

  GetEventsOfDate(date: string = ''): Array<any> {
    let dateParts = date.split('-');
    dateParts[1].length == 1 ? dateParts[1] = `0${dateParts[1]}` : null;
    dateParts[2].length == 1 ? dateParts[2] = `0${dateParts[2]}` : null;
    date = dateParts.join('-');
    if(!date) return [];
    return this.events.filter(event => !!event.date && event.date.includes(date));
  }

  GetEventName(event: any) {
    if(!!event.name) return event.name;
    else if(!!event.parcialProduct) return `${event.parcialProduct.name}`;
    else return `Sin nombre`;
  }

  GetEventDetails(event: any): {icon: string, type: string} {
    let details: {icon: string, type: string} = {
      icon: 'activity.png',
      type: 'Actividad'
    }
    if(event?.isFinal) {
      details.icon = 'event.png';
      details.type = `Evento de cierre`
    }
    else if(event?.parcialProduct?.isFinal) {
      details.icon = 'final-product.png';
      details.type = `Producto final`
    }
    else if(event?.parcialProduct?.isActivity) {
      details.icon = 'activity.png';
      details.type = `Actividad`
    }
    else {
      details.icon = 'parcial-product.png';
      details.type = `Producto parcial`
    }

    return details;
  }

  PopulateWeek(dateToStart: string = '') {
    const currentDate = (!!dateToStart ? moment(dateToStart) : moment()).tz(environment.timeZone);
    const startOfWeek = currentDate.clone().startOf('week').isoWeekday(1);
    const endOfWeek = currentDate.clone().endOf('week').isoWeekday(7);
    const datesOfWeek: string[] = [];

    let currentDay = startOfWeek.clone();
    while (currentDay.isSameOrBefore(endOfWeek, 'day')) {
      datesOfWeek.push(currentDay.format('YYYY-MM-DD'));
      currentDay.add(1, 'day');
    }

    this.currentWeek.forEach((day, idx) => {
      day.date = datesOfWeek[idx];
      day.events = this.GetEventsOfDate(day.date);
    });
  }

}
