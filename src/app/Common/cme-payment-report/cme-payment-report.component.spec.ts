import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmePaymentReportComponent } from './cme-payment-report.component';

describe('CmePaymentReportComponent', () => {
  let component: CmePaymentReportComponent;
  let fixture: ComponentFixture<CmePaymentReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CmePaymentReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmePaymentReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
