import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeProductComponent } from './grade-product.component';

describe('GradeProductComponent', () => {
  let component: GradeProductComponent;
  let fixture: ComponentFixture<GradeProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GradeProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GradeProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
