import { TestBed } from '@angular/core/testing';

import { AuthGaurd } from './auth-gaurd.service';

describe('AuthGaurdService', () => {
  let service: AuthGaurd;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthGaurd);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
