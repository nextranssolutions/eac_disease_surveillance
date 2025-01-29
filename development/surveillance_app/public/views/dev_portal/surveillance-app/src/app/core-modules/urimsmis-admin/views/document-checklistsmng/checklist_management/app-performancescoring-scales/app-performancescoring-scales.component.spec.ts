import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPerformancescoringScalesComponent } from './app-performancescoring-scales.component';

describe('AppPerformancescoringScalesComponent', () => {
  let component: AppPerformancescoringScalesComponent;
  let fixture: ComponentFixture<AppPerformancescoringScalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppPerformancescoringScalesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppPerformancescoringScalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
