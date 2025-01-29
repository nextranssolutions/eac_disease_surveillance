import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicaloutcomesTypesComponent } from './clinicaloutcomes-types.component';

describe('ClinicaloutcomesTypesComponent', () => {
  let component: ClinicaloutcomesTypesComponent;
  let fixture: ComponentFixture<ClinicaloutcomesTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClinicaloutcomesTypesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClinicaloutcomesTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
