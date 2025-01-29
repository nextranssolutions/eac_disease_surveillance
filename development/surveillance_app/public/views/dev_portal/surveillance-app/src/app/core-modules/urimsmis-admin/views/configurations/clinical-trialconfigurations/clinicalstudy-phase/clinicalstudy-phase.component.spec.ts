import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalstudyPhaseComponent } from './clinicalstudy-phase.component';

describe('ClinicalstudyPhaseComponent', () => {
  let component: ClinicalstudyPhaseComponent;
  let fixture: ComponentFixture<ClinicalstudyPhaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClinicalstudyPhaseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClinicalstudyPhaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
