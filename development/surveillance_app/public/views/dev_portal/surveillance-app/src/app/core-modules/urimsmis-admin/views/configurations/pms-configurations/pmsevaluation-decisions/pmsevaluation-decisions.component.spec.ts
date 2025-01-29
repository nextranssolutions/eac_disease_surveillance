import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmsevaluationDecisionsComponent } from './pmsevaluation-decisions.component';

describe('PmsevaluationDecisionsComponent', () => {
  let component: PmsevaluationDecisionsComponent;
  let fixture: ComponentFixture<PmsevaluationDecisionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PmsevaluationDecisionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PmsevaluationDecisionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
