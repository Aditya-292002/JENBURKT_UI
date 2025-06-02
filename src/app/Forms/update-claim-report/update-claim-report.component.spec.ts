import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateClaimReportComponent } from './update-claim-report.component';

describe('UpdateClaimReportComponent', () => {
  let component: UpdateClaimReportComponent;
  let fixture: ComponentFixture<UpdateClaimReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateClaimReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateClaimReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
