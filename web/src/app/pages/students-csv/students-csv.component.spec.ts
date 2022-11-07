import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsCsvComponent } from './students-csv.component';

describe('StudentsCsvComponent', () => {
  let component: StudentsCsvComponent;
  let fixture: ComponentFixture<StudentsCsvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentsCsvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsCsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
