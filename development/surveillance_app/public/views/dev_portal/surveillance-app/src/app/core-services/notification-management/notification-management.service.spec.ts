import { TestBed } from '@angular/core/testing';

import { NotificationManagementService } from './notification-management.service';

describe('NotificationManagementService', () => {
  let service: NotificationManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
