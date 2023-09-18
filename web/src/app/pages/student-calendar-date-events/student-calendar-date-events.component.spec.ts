import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCalendarDateEventsComponent } from './student-calendar-date-events.component';

describe('StudentCalendarDateEventsComponent', () => {
  let component: StudentCalendarDateEventsComponent;
  let fixture: ComponentFixture<StudentCalendarDateEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentCalendarDateEventsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentCalendarDateEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
