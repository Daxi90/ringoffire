import { TestBed } from '@angular/core/testing';

import { FirestoreConnectionService } from './firestore-connection.service';

describe('FirestoreConnectionService', () => {
  let service: FirestoreConnectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirestoreConnectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
