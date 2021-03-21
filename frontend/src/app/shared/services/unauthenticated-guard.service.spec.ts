import { TestBed } from '@angular/core/testing';

import { UnauthenticatedGuardService } from './unauthenticated-guard.service';

describe('UnauthenticatedGuardService', () => {
  let service: UnauthenticatedGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnauthenticatedGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
