import { TestBed } from '@angular/core/testing';

import { InformationSharingService } from './information-sharing.service';

describe('InformationSharingService', () => {
  let service: InformationSharingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InformationSharingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
