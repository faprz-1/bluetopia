import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateProyectBasedOnFormComponent } from './template-proyect-based-on-form.component';

describe('TemplateProyectBasedOnFormComponent', () => {
  let component: TemplateProyectBasedOnFormComponent;
  let fixture: ComponentFixture<TemplateProyectBasedOnFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateProyectBasedOnFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateProyectBasedOnFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
