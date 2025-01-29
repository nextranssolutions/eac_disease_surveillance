import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicaldiseaseConditionsComponent } from './clinicaldisease-conditions.component';

describe('ClinicaldiseaseConditionsComponent', () => {
  let component: ClinicaldiseaseConditionsComponent;
  let fixture: ComponentFixture<ClinicaldiseaseConditionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClinicaldiseaseConditionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClinicaldiseaseConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
