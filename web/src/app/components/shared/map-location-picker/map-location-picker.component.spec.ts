import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapLocationPickerComponent } from './map-location-picker.component';

describe('MapLocationPickerComponent', () => {
  let component: MapLocationPickerComponent;
  let fixture: ComponentFixture<MapLocationPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapLocationPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapLocationPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
