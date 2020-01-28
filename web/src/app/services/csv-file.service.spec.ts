import { TestBed } from '@angular/core/testing';

import { CsvFileService } from './csv-file.service';

describe('CsvFileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CsvFileService = TestBed.get(CsvFileService);
    expect(service).toBeTruthy();
  });
});
