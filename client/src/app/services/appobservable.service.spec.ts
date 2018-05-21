import { TestBed, inject } from '@angular/core/testing';

import { AppobservableService } from './appobservable.service';

describe('AppobservableService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppobservableService]
    });
  });

  it('should be created', inject([AppobservableService], (service: AppobservableService) => {
    expect(service).toBeTruthy();
  }));
});
