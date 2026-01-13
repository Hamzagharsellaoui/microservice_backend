import { TestBed } from '@angular/core/testing';

import { MemberLinksServiceService } from './member-links-service.service';

describe('MemberLinksServiceService', () => {
  let service: MemberLinksServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemberLinksServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
