import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmstcmeetingDecisionComponent } from './pmstcmeeting-decision.component';

describe('PmstcmeetingDecisionComponent', () => {
  let component: PmstcmeetingDecisionComponent;
  let fixture: ComponentFixture<PmstcmeetingDecisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PmstcmeetingDecisionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PmstcmeetingDecisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
