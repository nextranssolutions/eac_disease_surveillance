import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedappProcesssubmissionComponent } from './sharedapp-processsubmission.component';

describe('SharedappProcesssubmissionComponent', () => {
  let component: SharedappProcesssubmissionComponent;
  let fixture: ComponentFixture<SharedappProcesssubmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedappProcesssubmissionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SharedappProcesssubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
