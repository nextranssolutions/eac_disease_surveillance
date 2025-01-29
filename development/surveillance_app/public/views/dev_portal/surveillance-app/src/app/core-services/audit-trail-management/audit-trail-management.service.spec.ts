import { TestBed } from '@angular/core/testing';

import { AuditTrailManagementService } from './audit-trail-management.service';

describe('AuditTrailManagementService', () => {
  let service: AuditTrailManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuditTrailManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
