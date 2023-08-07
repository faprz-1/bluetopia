import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrategyDetailsModalComponent } from './strategy-details-modal.component';

describe('StrategyDetailsModalComponent', () => {
  let component: StrategyDetailsModalComponent;
  let fixture: ComponentFixture<StrategyDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StrategyDetailsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StrategyDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
