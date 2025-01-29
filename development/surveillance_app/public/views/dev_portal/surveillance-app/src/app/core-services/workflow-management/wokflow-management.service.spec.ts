import { TestBed } from '@angular/core/testing';

import { WokflowManagementService } from './wokflow-management.service';

describe('WokflowManagementService', () => {
  let service: WokflowManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WokflowManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
