import { TestBed, inject } from '@angular/core/testing';

import { ServiceProfesorService } from './service-profesor.service';

describe('ServiceProfesorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServiceProfesorService]
    });
  });

  it('should be created', inject([ServiceProfesorService], (service: ServiceProfesorService) => {
    expect(service).toBeTruthy();
  }));
});
