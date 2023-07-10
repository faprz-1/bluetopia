import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RubricTutorialModalComponent } from './rubric-tutorial-modal.component';

describe('RubricTutorialModalComponent', () => {
  let component: RubricTutorialModalComponent;
  let fixture: ComponentFixture<RubricTutorialModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RubricTutorialModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RubricTutorialModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
