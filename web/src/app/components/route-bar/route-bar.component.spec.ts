import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteBarComponent } from './route-bar.component';

describe('RouteBarComponent', () => {
  let component: RouteBarComponent;
  let fixture: ComponentFixture<RouteBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RouteBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
