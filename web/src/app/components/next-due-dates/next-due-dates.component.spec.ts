import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextDueDatesComponent } from './next-due-dates.component';

describe('NextDueDatesComponent', () => {
  let component: NextDueDatesComponent;
  let fixture: ComponentFixture<NextDueDatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NextDueDatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NextDueDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
