import { TestBed } from '@angular/core/testing';

import { AdminAuthGaurd } from './admin-auth-gaurd.service';

describe('AdminAuthGaurdService', () => {
  let service: AdminAuthGaurd;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminAuthGaurd);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
