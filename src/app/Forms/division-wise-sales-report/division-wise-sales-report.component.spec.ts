import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivisionWiseSalesReportComponent } from './division-wise-sales-report.component';

describe('DivisionWiseSalesReportComponent', () => {
  let component: DivisionWiseSalesReportComponent;
  let fixture: ComponentFixture<DivisionWiseSalesReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DivisionWiseSalesReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DivisionWiseSalesReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
