import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountApproveDetailsComponent } from './discount-approve-details.component';

describe('DiscountApproveDetailsComponent', () => {
  let component: DiscountApproveDetailsComponent;
  let fixture: ComponentFixture<DiscountApproveDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscountApproveDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscountApproveDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
