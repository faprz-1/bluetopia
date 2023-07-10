import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrategyCreationFormComponent } from './strategy-creation-form.component';

describe('StrategyCreationFormComponent', () => {
  let component: StrategyCreationFormComponent;
  let fixture: ComponentFixture<StrategyCreationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StrategyCreationFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StrategyCreationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
