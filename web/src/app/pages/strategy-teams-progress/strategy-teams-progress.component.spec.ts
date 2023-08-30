import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrategyTeamsProgressComponent } from './strategy-teams-progress.component';

describe('StrategyTeamsProgressComponent', () => {
  let component: StrategyTeamsProgressComponent;
  let fixture: ComponentFixture<StrategyTeamsProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StrategyTeamsProgressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StrategyTeamsProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
