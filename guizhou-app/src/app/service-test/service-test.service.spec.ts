import { TestBed, inject } from '@angular/core/testing';

import { ServiceTestService } from './service-test.service';

describe('ServiceTestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServiceTestService]
    });
  });

  it('should be created', inject([ServiceTestService], (service: ServiceTestService) => {
    expect(service).toBeTruthy();
  }));
});
