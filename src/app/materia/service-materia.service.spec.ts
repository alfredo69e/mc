import { TestBed, inject } from '@angular/core/testing';

import { ServiceMateriaService } from './service-materia.service';

describe('ServiceMateriaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServiceMateriaService]
    });
  });

  it('should be created', inject([ServiceMateriaService], (service: ServiceMateriaService) => {
    expect(service).toBeTruthy();
  }));
});
