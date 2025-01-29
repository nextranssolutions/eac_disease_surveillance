import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsermanagementDashboardComponent } from './usermanagement-dashboard.component';

describe('UsermanagementDashboardComponent', () => {
  let component: UsermanagementDashboardComponent;
  let fixture: ComponentFixture<UsermanagementDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsermanagementDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsermanagementDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
