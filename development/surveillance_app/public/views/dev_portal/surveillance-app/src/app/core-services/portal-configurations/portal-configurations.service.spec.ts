import { TestBed } from '@angular/core/testing';

import { PortalConfigurationsService } from './portal-configurations.service';

describe('PortalConfigurationsService', () => {
  let service: PortalConfigurationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PortalConfigurationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
