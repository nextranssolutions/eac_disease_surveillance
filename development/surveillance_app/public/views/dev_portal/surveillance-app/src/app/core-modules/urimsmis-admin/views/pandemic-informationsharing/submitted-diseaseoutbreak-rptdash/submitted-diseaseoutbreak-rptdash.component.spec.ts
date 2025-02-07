import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmittedDiseaseoutbreakRptdashComponent } from './submitted-diseaseoutbreak-rptdash.component';

describe('SubmittedDiseaseoutbreakRptdashComponent', () => {
  let component: SubmittedDiseaseoutbreakRptdashComponent;
  let fixture: ComponentFixture<SubmittedDiseaseoutbreakRptdashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmittedDiseaseoutbreakRptdashComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubmittedDiseaseoutbreakRptdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
