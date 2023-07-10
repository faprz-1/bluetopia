import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestedStrategiesSliderComponent } from './suggested-strategies-slider.component';

describe('SuggestedStrategiesSliderComponent', () => {
  let component: SuggestedStrategiesSliderComponent;
  let fixture: ComponentFixture<SuggestedStrategiesSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuggestedStrategiesSliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestedStrategiesSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
