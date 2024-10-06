/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FileActionsService } from './file-actions.service';

describe('Service: FileActions', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FileActionsService]
    });
  });

  it('should ...', inject([FileActionsService], (service: FileActionsService) => {
    expect(service).toBeTruthy();
  }));
});
