import { TestBed, inject } from '@angular/core/testing';

import { ServiceAlumnoService } from './service-alumno.service';

describe('ServiceAlumnoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServiceAlumnoService]
    });
  });

  it('should be created', inject([ServiceAlumnoService], (service: ServiceAlumnoService) => {
    expect(service).toBeTruthy();
  }));
});
