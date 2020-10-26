import { TestBed } from '@angular/core/testing';

import { TranzabilidadService } from './tranzabilidad.service';

describe('TranzabilidadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TranzabilidadService = TestBed.get(TranzabilidadService);
    expect(service).toBeTruthy();
  });
});
