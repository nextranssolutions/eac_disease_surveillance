import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedclinicalTrialconfigurationsComponent } from './sharedclinical-trialconfigurations.component';

describe('SharedclinicalTrialconfigurationsComponent', () => {
  let component: SharedclinicalTrialconfigurationsComponent;
  let fixture: ComponentFixture<SharedclinicalTrialconfigurationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedclinicalTrialconfigurationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SharedclinicalTrialconfigurationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
