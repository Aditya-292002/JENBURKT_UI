import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalClaimReportComponent } from './final-claim-report.component';

describe('FinalClaimReportComponent', () => {
  let component: FinalClaimReportComponent;
  let fixture: ComponentFixture<FinalClaimReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalClaimReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinalClaimReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
