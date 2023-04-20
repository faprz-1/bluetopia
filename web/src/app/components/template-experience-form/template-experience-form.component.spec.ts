import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateExperienceFormComponent } from './template-experience-form.component';

describe('TemplateExperienceFormComponent', () => {
  let component: TemplateExperienceFormComponent;
  let fixture: ComponentFixture<TemplateExperienceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateExperienceFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateExperienceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
