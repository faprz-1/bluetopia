import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeTemplatesComponent } from './type-templates.component';

describe('TypeTemplatesComponent', () => {
  let component: TypeTemplatesComponent;
  let fixture: ComponentFixture<TypeTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeTemplatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
