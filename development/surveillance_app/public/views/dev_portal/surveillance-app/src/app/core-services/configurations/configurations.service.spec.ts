import { TestBed } from '@angular/core/testing';

import { ConfigurationService} from './configurations.service';

describe('ConfigurationsService', () => {
  let service: ConfigurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
