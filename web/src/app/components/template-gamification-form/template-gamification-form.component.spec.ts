import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateGamificationFormComponent } from './template-gamification-form.component';

describe('TemplateGamificationFormComponent', () => {
  let component: TemplateGamificationFormComponent;
  let fixture: ComponentFixture<TemplateGamificationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateGamificationFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateGamificationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
