import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestDiscountListComponent } from './request-discount-list.component';

describe('RequestDiscountListComponent', () => {
  let component: RequestDiscountListComponent;
  let fixture: ComponentFixture<RequestDiscountListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestDiscountListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestDiscountListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
