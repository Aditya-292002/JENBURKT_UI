import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountRequestDetailsComponent } from './discount-request-details.component';

describe('DiscountRequestDetailsComponent', () => {
  let component: DiscountRequestDetailsComponent;
  let fixture: ComponentFixture<DiscountRequestDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscountRequestDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscountRequestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
