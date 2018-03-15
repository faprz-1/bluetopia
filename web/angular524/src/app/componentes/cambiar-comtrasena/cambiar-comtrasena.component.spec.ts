import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CambiarComtrasenaComponent } from './cambiar-comtrasena.component';

describe('CambiarComtrasenaComponent', () => {
  let component: CambiarComtrasenaComponent;
  let fixture: ComponentFixture<CambiarComtrasenaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CambiarComtrasenaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CambiarComtrasenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
