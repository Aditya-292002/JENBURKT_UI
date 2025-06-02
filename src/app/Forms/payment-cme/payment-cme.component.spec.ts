import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentCmeComponent } from './payment-cme.component';

describe('PaymentCmeComponent', () => {
  let component: PaymentCmeComponent;
  let fixture: ComponentFixture<PaymentCmeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentCmeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentCmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
