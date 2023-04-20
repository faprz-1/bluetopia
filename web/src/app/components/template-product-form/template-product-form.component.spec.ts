import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateProductFormComponent } from './template-product-form.component';

describe('TemplateProductFormComponent', () => {
  let component: TemplateProductFormComponent;
  let fixture: ComponentFixture<TemplateProductFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateProductFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
