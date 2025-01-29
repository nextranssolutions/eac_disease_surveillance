import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppWorkflowactiontypesComponent } from './app-workflowactiontypes.component';

describe('AppWorkflowactiontypesComponent', () => {
  let component: AppWorkflowactiontypesComponent;
  let fixture: ComponentFixture<AppWorkflowactiontypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppWorkflowactiontypesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppWorkflowactiontypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
