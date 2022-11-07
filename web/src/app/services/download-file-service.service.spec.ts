import { TestBed } from '@angular/core/testing';

import { DownloadFileServiceService } from './download-file-service.service';

describe('DownloadFileServiceService', () => {
  let service: DownloadFileServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DownloadFileServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
