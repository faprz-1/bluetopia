import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-grades-groups-view',
  templateUrl: './grades-groups-view.component.html',
  styleUrls: ['./grades-groups-view.component.scss']
})
export class GradesGroupsViewComponent implements OnInit {

  @Input() students: Array<any> = [];
  @Input() gradesAndGroups: Array<any> = [];

  grades: Array<any> = [];

  constructor() { }

  ngOnInit(): void {
    this.GroupStudents();
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

    console.log(this.grades);
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

}
