import { TestBed, inject } from '@angular/core/testing';

import { ServiceMatriculaService } from './service-matricula.service';

describe('ServiceMatriculaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServiceMatriculaService]
    });
  });

  it('should be created', inject([ServiceMatriculaService], (service: ServiceMatriculaService) => {
    expect(service).toBeTruthy();
  }));
});
