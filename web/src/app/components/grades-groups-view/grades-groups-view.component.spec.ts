import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradesGroupsViewComponent } from './grades-groups-view.component';

describe('GradesGroupsViewComponent', () => {
  let component: GradesGroupsViewComponent;
  let fixture: ComponentFixture<GradesGroupsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GradesGroupsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GradesGroupsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
