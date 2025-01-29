import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmsapprovalDecisionComponent } from './pmsapproval-decision.component';

describe('PmsapprovalDecisionComponent', () => {
  let component: PmsapprovalDecisionComponent;
  let fixture: ComponentFixture<PmsapprovalDecisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PmsapprovalDecisionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PmsapprovalDecisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
