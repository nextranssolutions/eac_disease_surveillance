import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationDocumentuploadsComponent } from './application-documentuploads.component';

describe('ApplicationDocumentuploadsComponent', () => {
  let component: ApplicationDocumentuploadsComponent;
  let fixture: ComponentFixture<ApplicationDocumentuploadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationDocumentuploadsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApplicationDocumentuploadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
