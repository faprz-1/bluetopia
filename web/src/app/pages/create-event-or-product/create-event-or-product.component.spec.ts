import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEventOrProductComponent } from './create-event-or-product.component';

describe('CreateEventOrProductComponent', () => {
  let component: CreateEventOrProductComponent;
  let fixture: ComponentFixture<CreateEventOrProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEventOrProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEventOrProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
