import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherTemplateFormComponent } from './teacher-template-form.component';

describe('TeacherTemplateFormComponent', () => {
  let component: TeacherTemplateFormComponent;
  let fixture: ComponentFixture<TeacherTemplateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherTemplateFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherTemplateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
