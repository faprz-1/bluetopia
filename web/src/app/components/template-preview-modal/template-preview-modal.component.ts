import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-template-preview-modal',
  templateUrl: './template-preview-modal.component.html',
  styleUrls: ['./template-preview-modal.component.scss']
})
export class TemplatePreviewModalComponent implements OnInit {

  @Input() template: any = null;

  @Output() onCloseModal: EventEmitter<any> = new EventEmitter<any>();
  @Output() onUseTemplate: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  CloseModal() {
    this.onCloseModal.emit();
  }

  UseTemplate() {
    this.onUseTemplate.emit(this.template);
  }

}
