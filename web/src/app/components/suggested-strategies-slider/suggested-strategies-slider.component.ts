import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-suggested-strategies-slider',
  templateUrl: './suggested-strategies-slider.component.html',
  styleUrls: ['./suggested-strategies-slider.component.scss']
})
export class SuggestedStrategiesSliderComponent implements OnInit {

  @Input() strategies: Array<any> = [];

  constructor() { }

  ngOnInit(): void {
  }

  // Slider controls
  currentIndex: number = 0;
  transform: number = 0;
  SlideTo(idx: number) {
    if(idx >= this.strategies.length) return;
    if(idx < 0) return;
    this.currentIndex = idx;
    this.transform = 100 * this.currentIndex;
  }

  GetArray(length: number): any[] {
    return Array(length).fill(0);
  }

}
