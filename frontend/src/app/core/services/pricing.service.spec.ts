import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { PricingService } from './pricing.service';

describe('PricingService', () => {
  let service: PricingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(PricingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
