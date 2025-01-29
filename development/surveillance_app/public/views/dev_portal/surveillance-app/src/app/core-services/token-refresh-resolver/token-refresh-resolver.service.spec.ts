import { TestBed } from '@angular/core/testing';
import { TokenRefreshResolverService } from './token-refresh-resolver.service';

describe('TokenRefreshResolverService', () => {
  let service: TokenRefreshResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenRefreshResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
