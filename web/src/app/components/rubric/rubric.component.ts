import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-rubric',
  templateUrl: './rubric.component.html',
  styleUrls: ['./rubric.component.scss']
})
export class RubricComponent implements OnInit {

  @Input() onReset: EventEmitter<any> | null = null;
  @Input() canEdit: boolean = true;
  @Input() showControls: boolean = true;
  @Input() rubrics: Array<any> = [
    {
      description: '',
      concepts: []
    }
  ];

  @Output() exportRubrics: EventEmitter<any> = new EventEmitter<any>();

  subscriptions: Array<Subscription> = [];
  
  constructor() { }
  
  ngOnInit(): void {
    if(!!this.onReset) {
      this.subscriptions.push(this.onReset.subscribe(() => {
        this.ExportRubrics();
      }));
    }
    setTimeout(() => {
      this.ExportRubrics();
    }, 500);
  }
  
  AddRow() {
    if(!this.canEdit) return;
    this.rubrics.push({
      description: '',
      concepts: this.rubrics[0].concepts.map((concept: any) => {
        return Object.assign({}, concept);
      })
    });
  }
  RemoveRow() {
    if(this.rubrics.length == 1) return;
    this.rubrics.pop();
  }
  
  AddCol() {
    if(!this.canEdit) return;
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
