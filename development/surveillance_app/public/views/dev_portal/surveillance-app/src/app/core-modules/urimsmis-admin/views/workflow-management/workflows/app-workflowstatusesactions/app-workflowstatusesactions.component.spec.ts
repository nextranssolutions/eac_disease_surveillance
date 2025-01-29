import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppWorkflowstatusesactionsComponent } from './app-workflowstatusesactions.component';

describe('AppWorkflowstatusesactionsComponent', () => {
  let component: AppWorkflowstatusesactionsComponent;
  let fixture: ComponentFixture<AppWorkflowstatusesactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppWorkflowstatusesactionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppWorkflowstatusesactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
