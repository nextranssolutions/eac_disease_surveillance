import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalrecruitStatusesComponent } from './clinicalrecruit-statuses.component';

describe('ClinicalrecruitStatusesComponent', () => {
  let component: ClinicalrecruitStatusesComponent;
  let fixture: ComponentFixture<ClinicalrecruitStatusesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClinicalrecruitStatusesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClinicalrecruitStatusesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
