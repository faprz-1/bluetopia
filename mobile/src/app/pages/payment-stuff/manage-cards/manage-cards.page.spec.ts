import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCardsPage } from './manage-cards.page';

describe('ManageCardsPage', () => {
  let component: ManageCardsPage;
  let fixture: ComponentFixture<ManageCardsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageCardsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCardsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
