import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppWorkflowstatusesinterfacesComponent } from './app-workflowstatusesinterfaces.component';

describe('AppWorkflowstatusesinterfacesComponent', () => {
  let component: AppWorkflowstatusesinterfacesComponent;
  let fixture: ComponentFixture<AppWorkflowstatusesinterfacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppWorkflowstatusesinterfacesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppWorkflowstatusesinterfacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
