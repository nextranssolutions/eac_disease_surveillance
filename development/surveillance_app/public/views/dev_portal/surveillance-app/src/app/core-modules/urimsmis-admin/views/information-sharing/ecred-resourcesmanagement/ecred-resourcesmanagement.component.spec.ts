import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcredResourcesmanagementComponent } from './ecred-resourcesmanagement.component';

describe('EcredResourcesmanagementComponent', () => {
  let component: EcredResourcesmanagementComponent;
  let fixture: ComponentFixture<EcredResourcesmanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EcredResourcesmanagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EcredResourcesmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
