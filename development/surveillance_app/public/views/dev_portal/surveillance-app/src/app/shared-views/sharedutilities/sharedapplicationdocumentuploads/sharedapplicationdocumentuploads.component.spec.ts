import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedapplicationdocumentuploadsComponent } from './sharedapplicationdocumentuploads.component';

describe('SharedapplicationdocumentuploadsComponent', () => {
  let component: SharedapplicationdocumentuploadsComponent;
  let fixture: ComponentFixture<SharedapplicationdocumentuploadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedapplicationdocumentuploadsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SharedapplicationdocumentuploadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
