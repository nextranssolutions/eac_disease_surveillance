import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentProcedureComponent } from './assessment-procedure.component';

describe('AssessmentProcedureComponent', () => {
  let component: AssessmentProcedureComponent;
  let fixture: ComponentFixture<AssessmentProcedureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssessmentProcedureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssessmentProcedureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
