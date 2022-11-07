import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachersCsvComponent } from './teachers-csv.component';

describe('TeachersCsvComponent', () => {
  let component: TeachersCsvComponent;
  let fixture: ComponentFixture<TeachersCsvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeachersCsvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeachersCsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
