import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceUpdateExpiryComponent } from './invoice-update-expiry.component';

describe('InvoiceUpdateExpiryComponent', () => {
  let component: InvoiceUpdateExpiryComponent;
  let fixture: ComponentFixture<InvoiceUpdateExpiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceUpdateExpiryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceUpdateExpiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
