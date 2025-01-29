import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskAssigmentsdetailsComponent } from './task-assigmentsdetails.component';

describe('TaskAssigmentsdetailsComponent', () => {
  let component: TaskAssigmentsdetailsComponent;
  let fixture: ComponentFixture<TaskAssigmentsdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskAssigmentsdetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskAssigmentsdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
