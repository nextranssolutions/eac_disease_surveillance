import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewAppdocumentuploadsComponent } from './preview-appdocumentuploads.component';

describe('PreviewAppdocumentuploadsComponent', () => {
  let component: PreviewAppdocumentuploadsComponent;
  let fixture: ComponentFixture<PreviewAppdocumentuploadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewAppdocumentuploadsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreviewAppdocumentuploadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
