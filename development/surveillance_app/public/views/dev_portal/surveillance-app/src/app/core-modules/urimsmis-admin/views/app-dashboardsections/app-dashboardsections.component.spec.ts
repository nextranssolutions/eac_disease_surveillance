import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDashboardsectionsComponent } from './app-dashboardsections.component';

describe('AppDashboardsectionsComponent', () => {
  let component: AppDashboardsectionsComponent;
  let fixture: ComponentFixture<AppDashboardsectionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppDashboardsectionsComponent]
    });
    fixture = TestBed.createComponent(AppDashboardsectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
