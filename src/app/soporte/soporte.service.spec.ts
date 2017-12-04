import { TestBed, inject } from '@angular/core/testing';

import { SoporteService } from './soporte.service';

describe('SoporteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SoporteService]
    });
  });

  it('should be created', inject([SoporteService], (service: SoporteService) => {
    expect(service).toBeTruthy();
  }));
});
