import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalinterventTypesComponent } from './clinicalintervent-types.component';

describe('ClinicalinterventTypesComponent', () => {
  let component: ClinicalinterventTypesComponent;
  let fixture: ComponentFixture<ClinicalinterventTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClinicalinterventTypesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClinicalinterventTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
