import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatesPreviewSliderComponent } from './templates-preview-slider.component';

describe('TemplatesPreviewSliderComponent', () => {
  let component: TemplatesPreviewSliderComponent;
  let fixture: ComponentFixture<TemplatesPreviewSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplatesPreviewSliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplatesPreviewSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
