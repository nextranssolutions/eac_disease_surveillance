import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalsequenceGenerationComponent } from './clinicalsequence-generation.component';

describe('ClinicalsequenceGenerationComponent', () => {
  let component: ClinicalsequenceGenerationComponent;
  let fixture: ComponentFixture<ClinicalsequenceGenerationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClinicalsequenceGenerationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClinicalsequenceGenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
