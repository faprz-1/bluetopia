import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarEventTypesCardComponent } from './calendar-event-types-card.component';

describe('CalendarEventTypesCardComponent', () => {
  let component: CalendarEventTypesCardComponent;
  let fixture: ComponentFixture<CalendarEventTypesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarEventTypesCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarEventTypesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
