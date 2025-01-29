import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalDashboardComponent } from './external-dashboard.component';

describe('ExternalDashboardComponent', () => {
  let component: ExternalDashboardComponent;
  let fixture: ComponentFixture<ExternalDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExternalDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExternalDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
