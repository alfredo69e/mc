import { TestBed, inject } from '@angular/core/testing';

import { ServiceDashboardService } from './service-dashboard.service';

describe('ServiceDashboardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServiceDashboardService]
    });
  });

  it('should be created', inject([ServiceDashboardService], (service: ServiceDashboardService) => {
    expect(service).toBeTruthy();
  }));
});
