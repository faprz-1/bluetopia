import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherGroupsCardComponent } from './teacher-groups-card.component';

describe('TeacherGroupsCardComponent', () => {
  let component: TeacherGroupsCardComponent;
  let fixture: ComponentFixture<TeacherGroupsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherGroupsCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherGroupsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
