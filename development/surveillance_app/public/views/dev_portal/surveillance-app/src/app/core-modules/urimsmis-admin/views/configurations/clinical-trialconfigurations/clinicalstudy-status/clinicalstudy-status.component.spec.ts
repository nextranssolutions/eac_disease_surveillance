import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalstudyStatusComponent } from './clinicalstudy-status.component';

describe('ClinicalstudyStatusComponent', () => {
  let component: ClinicalstudyStatusComponent;
  let fixture: ComponentFixture<ClinicalstudyStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClinicalstudyStatusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClinicalstudyStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
