import { TestBed, inject } from '@angular/core/testing';

import { ServicePagosService } from './service-pagos.service';

describe('ServicePagosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServicePagosService]
    });
  });

  it('should be created', inject([ServicePagosService], (service: ServicePagosService) => {
    expect(service).toBeTruthy();
  }));
});
