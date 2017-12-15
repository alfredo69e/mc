import { TestBed, inject } from '@angular/core/testing';

import { ServiceMovimientosService } from './service-movimientos.service';

describe('ServiceMovimientosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServiceMovimientosService]
    });
  });

  it('should be created', inject([ServiceMovimientosService], (service: ServiceMovimientosService) => {
    expect(service).toBeTruthy();
  }));
});
