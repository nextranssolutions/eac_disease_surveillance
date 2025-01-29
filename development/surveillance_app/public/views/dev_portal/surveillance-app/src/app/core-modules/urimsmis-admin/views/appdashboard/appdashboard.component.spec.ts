import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppdashboardComponent } from './appdashboard.component';

describe('AppdashboardComponent', () => {
  let component: AppdashboardComponent;
  let fixture: ComponentFixture<AppdashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppdashboardComponent]
    });
    fixture = TestBed.createComponent(AppdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
