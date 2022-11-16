import { TestBed } from '@angular/core/testing';

import { FormBuilderGuard } from './form-builder.guard';

describe('FormBuilderGuard', () => {
  let guard: FormBuilderGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(FormBuilderGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
