import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsTeamsComponent } from './students-teams.component';

describe('StudentsTeamsComponent', () => {
  let component: StudentsTeamsComponent;
  let fixture: ComponentFixture<StudentsTeamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentsTeamsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
