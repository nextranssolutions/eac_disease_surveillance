import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppProcesssubmissionComponent } from './app-processsubmission.component';

describe('AppProcesssubmissionComponent', () => {
  let component: AppProcesssubmissionComponent;
  let fixture: ComponentFixture<AppProcesssubmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppProcesssubmissionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppProcesssubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
