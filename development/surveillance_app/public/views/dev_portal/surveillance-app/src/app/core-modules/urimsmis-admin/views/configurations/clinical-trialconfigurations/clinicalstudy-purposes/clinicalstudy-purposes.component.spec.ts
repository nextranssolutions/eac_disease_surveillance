import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalstudyPurposesComponent } from './clinicalstudy-purposes.component';

describe('ClinicalstudyPurposesComponent', () => {
  let component: ClinicalstudyPurposesComponent;
  let fixture: ComponentFixture<ClinicalstudyPurposesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClinicalstudyPurposesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClinicalstudyPurposesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
