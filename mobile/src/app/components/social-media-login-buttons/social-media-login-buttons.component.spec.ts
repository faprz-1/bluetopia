import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialMediaLoginButtonsComponent } from './social-media-login-buttons.component';

describe('SocialMediaLoginButtonsComponent', () => {
  let component: SocialMediaLoginButtonsComponent;
  let fixture: ComponentFixture<SocialMediaLoginButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialMediaLoginButtonsComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialMediaLoginButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
