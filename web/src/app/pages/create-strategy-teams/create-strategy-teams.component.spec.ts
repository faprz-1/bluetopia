import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStrategyTeamsComponent } from './create-strategy-teams.component';

describe('CreateStrategyTeamsComponent', () => {
  let component: CreateStrategyTeamsComponent;
  let fixture: ComponentFixture<CreateStrategyTeamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateStrategyTeamsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateStrategyTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
