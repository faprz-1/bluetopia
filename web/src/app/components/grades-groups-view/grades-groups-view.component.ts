import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-grades-groups-view',
  templateUrl: './grades-groups-view.component.html',
  styleUrls: ['./grades-groups-view.component.scss']
})
export class GradesGroupsViewComponent implements OnInit, OnDestroy {

  @Input() students: Array<any> = [];
  @Input() adminControls: boolean = false;
  @Input() teacherControls: boolean = false;
  @Input() teacherDasboard: boolean = false;
  @Input() onStudentSearch: EventEmitter<any> | null = null;

  @Output() onAddGroup: EventEmitter<any> = new EventEmitter<any>();
  @Output() onAddGrade: EventEmitter<any> = new EventEmitter<any>();
  @Output() onApplyExistentStrategy: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCreateNewStrategy: EventEmitter<any> = new EventEmitter<any>();

  grades: Array<any> = [];
  selectedGrade: any = null;
  strategiesStatuses: Array<any> = [];

  subscriptions: Array<Subscription | undefined> = [];

  constructor() { }

  ngOnInit(): void {
    this.students = this.students.map(student => {
      if(student.hasOwnProperty('studentGroup')) {
        student.group = !!student.studentGroup.group ? student.studentGroup.group.name : 'sin grupo';
        student.grade = !!student.studentGroup.grade ? student.studentGroup.grade.name : 'sin grado';
      }
      return student;
    });
    this.GroupStudents();

    const sub = this.onStudentSearch?.subscribe(student => {
      
    });
    this.subscriptions.push(sub);
  }

  ngOnDestroy() {
    while(this.subscriptions.length) this.subscriptions.pop()?.unsubscribe();
  }

  GroupStudents() {
    let grades: any = {};
    this.students.forEach(student => {
      if(grades[student.grade]) grades[student.grade].push(student);
      else grades[student.grade] = [student];
    });
    
    for (const key in grades) {
      let groups: any = {};
      if (Object.prototype.hasOwnProperty.call(grades, key)) {
        const studentsOfGrade = grades[key];
        studentsOfGrade.forEach((student: any) => {
          if(groups[student.group]) groups[student.group].push(student);
          else groups[student.group] = [student];
        })
        this.grades.push({
          key,
          groups: this.ObjectToArray(groups)
        });
      }
    }

    this.grades.sort((a: any, b: any) => {
      if(a.key > b.key) return 1;
      if(a.key < b.key) return -1;
      return 0;
    })
    if(this.grades.length > 0) this.selectedGrade = this.grades[0];
  }

  ObjectToArray(object: any) {
    let array = [];
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        const element: any = object[key];
        array.push(element);
      }
    }
    return array;
  }

  SelectGrade(grade: any) {
    this.selectedGrade = grade;
  }

  AddGrade() {

  }

}
