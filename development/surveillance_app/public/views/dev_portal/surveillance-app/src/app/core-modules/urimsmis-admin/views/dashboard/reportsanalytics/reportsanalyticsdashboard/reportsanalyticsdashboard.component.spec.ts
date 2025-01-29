import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsanalyticsdashboardComponent } from './reportsanalyticsdashboard.component';

describe('ReportsanalyticsdashboardComponent', () => {
  let component: ReportsanalyticsdashboardComponent;
  let fixture: ComponentFixture<ReportsanalyticsdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportsanalyticsdashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportsanalyticsdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
