import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateSliderComponent } from './template-slider.component';

describe('TemplateSliderComponent', () => {
  let component: TemplateSliderComponent;
  let fixture: ComponentFixture<TemplateSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateSliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
