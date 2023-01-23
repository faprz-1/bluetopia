import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-template-slider',
  templateUrl: './template-slider.component.html',
  styleUrls: ['./template-slider.component.scss']
})
export class TemplateSliderComponent implements OnInit {

  @Input() templates: Array<any> = [];
  @Input() maxTemplatesToShow: number = 0;

  @Output() onClick: EventEmitter<any> = new EventEmitter<any>();

  positionsToShow: Array<number> = [];
  templatesToShow: number = 3;

  constructor() { }

  ngOnInit(): void {
    window.addEventListener("resize", (event) => {
      this.AdjustView();
    });
    this.AdjustView();
  }
  
  OnClick(template: any) {
    this.onClick.emit(template);
  }
  
  AdjustView() {
    let totalWidth: any = document.getElementById('slider-container')?.clientWidth;
    let templateDivWidth = 220;
    let templateDivLateralMargin = 5;
    let arrowsWidth = 40;

    let templateWidth = templateDivWidth + templateDivLateralMargin;
    let templatesAvailableWidth = totalWidth - (2*arrowsWidth);
    this.templatesToShow = Math.floor(templatesAvailableWidth / templateWidth);
    this.templatesToShow = !!this.maxTemplatesToShow ? Math.min(this.templatesToShow, this.maxTemplatesToShow) : this.templatesToShow;
    this.positionsToShow = [];
    for (let i = 0; i < this.templatesToShow; i++) {
      this.positionsToShow.push(i);
    }
  }

  GoRight() {
    const lastRightPos = this.positionsToShow[this.positionsToShow.length - 1];
    let newLastPos = lastRightPos + this.templatesToShow;
    newLastPos = Math.min(newLastPos, this.templates.length);
    let newInitialPos = newLastPos - this.templatesToShow;
    this.positionsToShow = [];
    for (let i = newInitialPos; i < newLastPos; i++) {
      this.positionsToShow.push(i);
    }
  }
  
  GoLeft() {
    const lastLeftPos = this.positionsToShow[0];
    let newInitialPos = lastLeftPos - this.templatesToShow;
    newInitialPos = Math.max(newInitialPos, 0);
    let newLastPos = newInitialPos + this.templatesToShow;
    this.positionsToShow = [];
    for (let i = newInitialPos; i < newLastPos; i++) {
      this.positionsToShow.push(i);
    }
  }

}
