import { TestBed } from '@angular/core/testing';

import { AuthSuserGuard } from './auth-suser.guard';

describe('AuthSuserGuard', () => {
  let guard: AuthSuserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthSuserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
