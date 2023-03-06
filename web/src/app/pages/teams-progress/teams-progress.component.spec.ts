import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsProgressComponent } from './teams-progress.component';

describe('TeamsProgressComponent', () => {
  let component: TeamsProgressComponent;
  let fixture: ComponentFixture<TeamsProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamsProgressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamsProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
