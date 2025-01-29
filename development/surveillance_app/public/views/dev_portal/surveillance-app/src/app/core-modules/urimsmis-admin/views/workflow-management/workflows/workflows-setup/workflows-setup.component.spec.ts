import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowsSetupComponent } from './workflows-setup.component';

describe('WorkflowsSetupComponent', () => {
  let component: WorkflowsSetupComponent;
  let fixture: ComponentFixture<WorkflowsSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkflowsSetupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkflowsSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
