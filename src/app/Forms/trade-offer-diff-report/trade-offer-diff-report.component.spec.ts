import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeOfferDiffReportComponent } from './trade-offer-diff-report.component';

describe('TradeOfferDiffReportComponent', () => {
  let component: TradeOfferDiffReportComponent;
  let fixture: ComponentFixture<TradeOfferDiffReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TradeOfferDiffReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TradeOfferDiffReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
