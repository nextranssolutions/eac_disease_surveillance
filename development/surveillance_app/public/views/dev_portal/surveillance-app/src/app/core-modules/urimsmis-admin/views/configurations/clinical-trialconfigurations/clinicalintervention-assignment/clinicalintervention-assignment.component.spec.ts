import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalinterventionAssignmentComponent } from './clinicalintervention-assignment.component';

describe('ClinicalinterventionAssignmentComponent', () => {
  let component: ClinicalinterventionAssignmentComponent;
  let fixture: ComponentFixture<ClinicalinterventionAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClinicalinterventionAssignmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClinicalinterventionAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
