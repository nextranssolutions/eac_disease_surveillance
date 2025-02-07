import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiateDiseaseoutbreakReportingComponent } from './initiate-diseaseoutbreak-reporting.component';

describe('InitiateDiseaseoutbreakReportingComponent', () => {
  let component: InitiateDiseaseoutbreakReportingComponent;
  let fixture: ComponentFixture<InitiateDiseaseoutbreakReportingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InitiateDiseaseoutbreakReportingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InitiateDiseaseoutbreakReportingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
