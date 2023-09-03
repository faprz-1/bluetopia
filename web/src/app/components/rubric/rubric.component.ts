import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-rubric',
  templateUrl: './rubric.component.html',
  styleUrls: ['./rubric.component.scss']
})
export class RubricComponent implements OnInit {

  @Input() onReset: EventEmitter<any> | null = null;
  @Input() setEvaluations: EventEmitter<any> | null = null;
  @Input() evaluationMode: boolean = false;
  @Input() canEdit: boolean = true;
  @Input() showControls: boolean = true;
  @Input() rubrics: Array<any> = [
    {
      description: '',
      concepts: []
    }
  ];
  
  @Output() exportRubrics: EventEmitter<any> = new EventEmitter<any>();
  @Output() onEvaluation: EventEmitter<any> = new EventEmitter<any>();

  subscriptions: Array<Subscription> = [];
  
  constructor() { }
  
  ngOnInit(): void {
    if(!!this.onReset) {
      this.subscriptions.push(this.onReset.subscribe(() => {
        this.ExportRubrics();
      }));
    }
    if(!!this.setEvaluations) {
      this.subscriptions.push(this.setEvaluations.subscribe((califications) => {
        if(califications?.length) {
          this.rubrics.forEach((rubric, idx) => {
            rubric.conceptSelected = rubric.concepts.find((concept: any) => concept.value == califications[idx]);
          });
        }
      }));
    }
    if(!this.rubrics) {
      this.rubrics = [
        {
          description: '',
          concepts: []
        }
      ];
    } else if(!this.rubrics.length) {
      this.rubrics.push({
        description: '',
        concepts: []
      });
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

  // --------------------- Evaluation --------------------- //
  OnRubricValueSelected(rubric: any, conceptSelected: any) {
    rubric.conceptSelected = conceptSelected;
    let maxCalification = 0, calification = 0;
    this.rubrics.forEach(rubric => {
      let max = 0;
      rubric.concepts.forEach((concept: any) => {max = Math.max(max, concept.value)});
      calification += (!!rubric.conceptSelected ? rubric.conceptSelected.value : 0);
      maxCalification += max;
    });

    this.onEvaluation.emit({
      maxCalification,
      calification,
      rubricsCalifications: this.rubrics.map(rubric => rubric.conceptSelected?.value)
    });
  }

}
