import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentStudentDashboardComponent } from './parent-student-dashboard.component';

describe('ParentStudentDashboardComponent', () => {
  let component: ParentStudentDashboardComponent;
  let fixture: ComponentFixture<ParentStudentDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParentStudentDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentStudentDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
