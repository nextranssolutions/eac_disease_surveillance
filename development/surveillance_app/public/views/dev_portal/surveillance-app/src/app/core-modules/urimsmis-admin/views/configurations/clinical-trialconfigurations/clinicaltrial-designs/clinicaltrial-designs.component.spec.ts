import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicaltrialDesignsComponent } from './clinicaltrial-designs.component';

describe('ClinicaltrialDesignsComponent', () => {
  let component: ClinicaltrialDesignsComponent;
  let fixture: ComponentFixture<ClinicaltrialDesignsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClinicaltrialDesignsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClinicaltrialDesignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
