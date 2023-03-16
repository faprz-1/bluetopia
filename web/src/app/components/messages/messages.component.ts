import { Component, OnInit } from '@angular/core';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  messages: Array<any> = [
    {
      date: moment().toISOString(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      sender: {
        username: 'Eliza Hernández'
      },
    },
    {
      date: moment().toISOString(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      sender: {
        username: 'Eliza Hernández'
      },
    },
    {
      date: moment().toISOString(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      sender: {
        username: 'Eliza Hernández'
      },
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
