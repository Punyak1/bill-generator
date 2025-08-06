import { TestBed } from '@angular/core/testing';

import { GstInvoiceService } from './gst-invoice.service';

describe('GstInvoiceService', () => {
  let service: GstInvoiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GstInvoiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
