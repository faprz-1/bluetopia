import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentActivityDetailsComponent } from './student-activity-details.component';

describe('StudentActivityDetailsComponent', () => {
  let component: StudentActivityDetailsComponent;
  let fixture: ComponentFixture<StudentActivityDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentActivityDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentActivityDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
