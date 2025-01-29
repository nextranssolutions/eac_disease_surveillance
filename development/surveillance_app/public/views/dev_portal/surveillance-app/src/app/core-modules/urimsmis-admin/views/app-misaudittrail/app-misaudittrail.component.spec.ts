import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppAuditTrail } from './app-misaudittrail.component';

describe('AppAuditTrail', () => {
  let component: AppAuditTrail;
  let fixture: ComponentFixture<AppAuditTrail>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppAuditTrail]
    });
    fixture = TestBed.createComponent(AppAuditTrail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
