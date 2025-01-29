import { TestBed } from '@angular/core/testing';

import { ServiceAdmnistrationService } from './system-admnistration.service';

describe('ServiceAdmnistrationService', () => {
  let service: ServiceAdmnistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceAdmnistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
