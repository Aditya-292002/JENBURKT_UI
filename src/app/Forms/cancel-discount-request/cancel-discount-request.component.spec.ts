import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelDiscountRequestComponent } from './cancel-discount-request.component';

describe('CancelDiscountRequestComponent', () => {
  let component: CancelDiscountRequestComponent;
  let fixture: ComponentFixture<CancelDiscountRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelDiscountRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancelDiscountRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
