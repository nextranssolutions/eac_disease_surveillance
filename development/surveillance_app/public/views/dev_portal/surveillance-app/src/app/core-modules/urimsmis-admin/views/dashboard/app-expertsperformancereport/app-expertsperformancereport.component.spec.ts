import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppExpertsperformancereportComponent } from './app-expertsperformancereport.component';

describe('AppExpertsperformancereportComponent', () => {
  let component: AppExpertsperformancereportComponent;
  let fixture: ComponentFixture<AppExpertsperformancereportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppExpertsperformancereportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppExpertsperformancereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
