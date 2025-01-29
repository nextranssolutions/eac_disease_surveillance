import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmsanalysisDecisionComponent } from './pmsanalysis-decision.component';

describe('PmsanalysisDecisionComponent', () => {
  let component: PmsanalysisDecisionComponent;
  let fixture: ComponentFixture<PmsanalysisDecisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PmsanalysisDecisionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PmsanalysisDecisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
