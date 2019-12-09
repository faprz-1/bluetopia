import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefoundsPage } from './refounds.page';

describe('RefoundsPage', () => {
  let component: RefoundsPage;
  let fixture: ComponentFixture<RefoundsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefoundsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefoundsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
