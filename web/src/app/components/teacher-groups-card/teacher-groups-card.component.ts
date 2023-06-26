import { Component, OnInit, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-teacher-groups-card',
  templateUrl: './teacher-groups-card.component.html',
  styleUrls: ['./teacher-groups-card.component.scss']
})
export class TeacherGroupsCardComponent implements OnInit {

  @Input() data: any = null;
  @Input() subjects: any = [];

  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();

  grade: string = '';
  groups: Array<any> = [];

  constructor(
    private api: ApiService,
    private toast: ToastService
  ) { }

  ngOnInit(): void {
    if(!!this.data && Array.isArray(this.data)) {
      this.grade = this.data[0];
      this.groups = this.data[1].sort((a: any, b: any) => {
        if(a.name > b.name) return 1;
        if(a.name < b.name) return -1;
        return 0;
      });
    }
  }

}
