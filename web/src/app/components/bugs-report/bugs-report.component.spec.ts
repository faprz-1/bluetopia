import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BugsReportComponent } from './bugs-report.component';

describe('BugsReportComponent', () => {
  let component: BugsReportComponent;
  let fixture: ComponentFixture<BugsReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BugsReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BugsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
