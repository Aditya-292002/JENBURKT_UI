import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleInvoiceComponent } from './sample-invoice.component';

describe('SampleInvoiceComponent', () => {
  let component: SampleInvoiceComponent;
  let fixture: ComponentFixture<SampleInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SampleInvoiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SampleInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
