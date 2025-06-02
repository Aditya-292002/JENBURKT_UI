import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalDiscountComponent } from './approval-discount.component';

describe('ApprovalDiscountComponent', () => {
  let component: ApprovalDiscountComponent;
  let fixture: ComponentFixture<ApprovalDiscountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovalDiscountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovalDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
