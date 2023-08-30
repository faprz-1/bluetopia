import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrategyTeamsRolesComponent } from './strategy-teams-roles.component';

describe('StrategyTeamsRolesComponent', () => {
  let component: StrategyTeamsRolesComponent;
  let fixture: ComponentFixture<StrategyTeamsRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StrategyTeamsRolesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StrategyTeamsRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
