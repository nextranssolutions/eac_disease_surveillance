import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppWorkflowsubmissionactionsComponent } from './app-workflowsubmissionactions.component';

describe('AppWorkflowsubmissionactionsComponent', () => {
  let component: AppWorkflowsubmissionactionsComponent;
  let fixture: ComponentFixture<AppWorkflowsubmissionactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppWorkflowsubmissionactionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppWorkflowsubmissionactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
