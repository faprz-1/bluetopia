import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryFileSelectorModalComponent } from './library-file-selector-modal.component';

describe('LibraryFileSelectorModalComponent', () => {
  let component: LibraryFileSelectorModalComponent;
  let fixture: ComponentFixture<LibraryFileSelectorModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibraryFileSelectorModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibraryFileSelectorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
