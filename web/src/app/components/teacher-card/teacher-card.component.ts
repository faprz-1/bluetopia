import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-teacher-card',
  templateUrl: './teacher-card.component.html',
  styleUrls: ['./teacher-card.component.scss']
})
export class TeacherCardComponent implements OnInit {

  @Input() teacher: any = null;
  @Input() showGroups: boolean = false;

  @Output() onDelete: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  OnDeletedPressed(event: any) {
    event.stopPropagation();
    this.onDelete.emit(this.teacher);
  }

}
