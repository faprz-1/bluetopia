import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesSliderComponent } from './files-slider.component';

describe('FilesSliderComponent', () => {
  let component: FilesSliderComponent;
  let fixture: ComponentFixture<FilesSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilesSliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
