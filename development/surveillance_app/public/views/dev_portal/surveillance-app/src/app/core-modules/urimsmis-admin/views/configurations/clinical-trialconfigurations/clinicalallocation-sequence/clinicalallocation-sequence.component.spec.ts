import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalallocationSequenceComponent } from './clinicalallocation-sequence.component';

describe('ClinicalallocationSequenceComponent', () => {
  let component: ClinicalallocationSequenceComponent;
  let fixture: ComponentFixture<ClinicalallocationSequenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClinicalallocationSequenceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClinicalallocationSequenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
