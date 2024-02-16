import { TestBed } from '@angular/core/testing';

import { UserDomainService } from './user-domain.service';

describe('UserDomainService', () => {
  let service: UserDomainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserDomainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
