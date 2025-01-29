import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalWorkflowsetupComponent } from './portal-workflowsetup.component';

describe('PortalWorkflowsetupComponent', () => {
  let component: PortalWorkflowsetupComponent;
  let fixture: ComponentFixture<PortalWorkflowsetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortalWorkflowsetupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PortalWorkflowsetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
