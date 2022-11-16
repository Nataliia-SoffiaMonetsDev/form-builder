import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldStylesComponent } from './field-styles.component';

describe('FieldStylesComponent', () => {
  let component: FieldStylesComponent;
  let fixture: ComponentFixture<FieldStylesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FieldStylesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FieldStylesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
