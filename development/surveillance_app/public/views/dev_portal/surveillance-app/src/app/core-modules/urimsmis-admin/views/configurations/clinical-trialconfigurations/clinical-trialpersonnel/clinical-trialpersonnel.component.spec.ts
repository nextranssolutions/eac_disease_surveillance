import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalTrialpersonnelComponent } from './clinical-trialpersonnel.component';

describe('ClinicalTrialpersonnelComponent', () => {
  let component: ClinicalTrialpersonnelComponent;
  let fixture: ComponentFixture<ClinicalTrialpersonnelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClinicalTrialpersonnelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClinicalTrialpersonnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
