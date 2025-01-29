import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalinterventAllocationComponent } from './clinicalintervent-allocation.component';

describe('ClinicalinterventAllocationComponent', () => {
  let component: ClinicalinterventAllocationComponent;
  let fixture: ComponentFixture<ClinicalinterventAllocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClinicalinterventAllocationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClinicalinterventAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
