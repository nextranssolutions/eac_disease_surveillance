import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppProcessworkflowstatusesComponent } from './app-processworkflowstatuses.component';

describe('AppProcessworkflowstatusesComponent', () => {
  let component: AppProcessworkflowstatusesComponent;
  let fixture: ComponentFixture<AppProcessworkflowstatusesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppProcessworkflowstatusesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppProcessworkflowstatusesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
