import { TestBed, inject } from '@angular/core/testing';

import { ComponentServiceService } from './component-service.service';

describe('ComponentServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComponentServiceService]
    });
  });

  it('should be created', inject([ComponentServiceService], (service: ComponentServiceService) => {
    expect(service).toBeTruthy();
  }));
});
