import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SamplingReasonComponent } from './sampling-reason.component';

describe('SamplingReasonComponent', () => {
  let component: SamplingReasonComponent;
  let fixture: ComponentFixture<SamplingReasonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SamplingReasonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SamplingReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
