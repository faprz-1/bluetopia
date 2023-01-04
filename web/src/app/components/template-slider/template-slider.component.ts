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

  posistionsToShow: Array<number> = [];
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
    // Element width + min margin lateral
    let templateWidth = 220 + 5;
    // total width - (2 * arrows width)
    let templatesAvailableWidth = totalWidth - (2*40);
    this.templatesToShow = Math.floor(templatesAvailableWidth / templateWidth);
    this.posistionsToShow = [];
    for (let i = 0; i < (!!this.maxTemplatesToShow ? Math.min(this.templatesToShow, this.maxTemplatesToShow) : this.templatesToShow); i++) {
      this.posistionsToShow.push(i);
    }
  }

}
