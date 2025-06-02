import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountDetailsListComponent } from './discount-details-list.component';

describe('DiscountDetailsListComponent', () => {
  let component: DiscountDetailsListComponent;
  let fixture: ComponentFixture<DiscountDetailsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscountDetailsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscountDetailsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
