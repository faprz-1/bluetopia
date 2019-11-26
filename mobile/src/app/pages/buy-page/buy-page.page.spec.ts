import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyPagePage } from './buy-page.page';

describe('BuyPagePage', () => {
  let component: BuyPagePage;
  let fixture: ComponentFixture<BuyPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyPagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
