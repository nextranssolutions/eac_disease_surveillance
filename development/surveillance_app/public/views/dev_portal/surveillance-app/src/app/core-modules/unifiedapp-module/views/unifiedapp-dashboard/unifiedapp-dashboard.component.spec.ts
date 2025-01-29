import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnifiedappDashboardComponent } from './unifiedapp-dashboard.component';

describe('UnifiedappDashboardComponent', () => {
  let component: UnifiedappDashboardComponent;
  let fixture: ComponentFixture<UnifiedappDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnifiedappDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnifiedappDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
