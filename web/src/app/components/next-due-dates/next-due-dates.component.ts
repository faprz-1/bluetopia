import { Component, OnInit } from '@angular/core';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-next-due-dates',
  templateUrl: './next-due-dates.component.html',
  styleUrls: ['./next-due-dates.component.scss']
})
export class NextDueDatesComponent implements OnInit {

  dueDates: Array<any> = [
    {date: moment().format(`DD/MM/YYYY`)},
    {date: moment().format(`DD/MM/YYYY`)},
    {date: moment().format(`DD/MM/YYYY`)},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
