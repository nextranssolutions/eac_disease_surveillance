import { TestBed } from '@angular/core/testing';

import { DashbordManagementService } from './dashbord-management.service';

describe('DashbordManagementService', () => {
  let service: DashbordManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashbordManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
