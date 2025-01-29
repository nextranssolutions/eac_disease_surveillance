import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateConditionComponent } from './certificate-condition.component';

describe('CertificateConditionComponent', () => {
  let component: CertificateConditionComponent;
  let fixture: ComponentFixture<CertificateConditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CertificateConditionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CertificateConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
