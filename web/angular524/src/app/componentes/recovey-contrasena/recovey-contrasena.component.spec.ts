import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoveyContrasenaComponent } from './recovey-contrasena.component';

describe('RecoveyContrasenaComponent', () => {
  let component: RecoveyContrasenaComponent;
  let fixture: ComponentFixture<RecoveyContrasenaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecoveyContrasenaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoveyContrasenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
