import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PandemicReportingInfoComponent } from './pandemic-reporting-info.component';

describe('PandemicReportingInfoComponent', () => {
  let component: PandemicReportingInfoComponent;
  let fixture: ComponentFixture<PandemicReportingInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PandemicReportingInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PandemicReportingInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
