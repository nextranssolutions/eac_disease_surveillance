import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistmanagementSetupComponent } from './checklistmanagement-setup.component';

describe('ChecklistmanagementSetupComponent', () => {
  let component: ChecklistmanagementSetupComponent;
  let fixture: ComponentFixture<ChecklistmanagementSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChecklistmanagementSetupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChecklistmanagementSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
