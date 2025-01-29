import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationWorkflowsubmissionsComponent } from './application-workflowsubmissions.component';

describe('ApplicationWorkflowsubmissionsComponent', () => {
  let component: ApplicationWorkflowsubmissionsComponent;
  let fixture: ComponentFixture<ApplicationWorkflowsubmissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationWorkflowsubmissionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApplicationWorkflowsubmissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
