import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-rubric',
  templateUrl: './rubric.component.html',
  styleUrls: ['./rubric.component.scss']
})
export class RubricComponent implements OnInit {

  @Output() exportRubrics: EventEmitter<any> = new EventEmitter<any>();

  rubrics: Array<any> = [
    {
      description: '',
      concepts: [
        {
          value: 1,
          description: ''
        },
      ]
    }
  ];
  
  constructor() { }
  
  ngOnInit(): void {
    setTimeout(() => {
      this.ExportRubrics();
    }, 500);
  }
  
  AddRow() {
    this.rubrics.push({
      description: '',
      concepts: this.rubrics[0].concepts.map((concept: any) => {
        concept.description = '';
        return Object.assign({}, concept);
      })
    });
  }
  RemoveRow() {
    if(this.rubrics.length == 1) return;
    this.rubrics.pop();
  }
  
  AddCol() {
    const value = this.rubrics[0].concepts.length + 1;
    this.rubrics.forEach(r => {
      r.concepts.unshift({
        value,
        description: ''
      });
    });
  }
  RemoveCol() {
    const value = this.rubrics[0].concepts.length;
    if(value == 1) return;
    this.rubrics.forEach(r => {
      r.concepts.shift();
    });
  }

  ExportRubrics() {
    this.exportRubrics.emit(this.rubrics);
  }

}