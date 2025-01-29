import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalreportTypesComponent } from './clinicalreport-types.component';

describe('ClinicalreportTypesComponent', () => {
  let component: ClinicalreportTypesComponent;
  let fixture: ComponentFixture<ClinicalreportTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClinicalreportTypesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClinicalreportTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
