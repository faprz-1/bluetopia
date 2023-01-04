import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatePreviewModalComponent } from './template-preview-modal.component';

describe('TemplatePreviewModalComponent', () => {
  let component: TemplatePreviewModalComponent;
  let fixture: ComponentFixture<TemplatePreviewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplatePreviewModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplatePreviewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
