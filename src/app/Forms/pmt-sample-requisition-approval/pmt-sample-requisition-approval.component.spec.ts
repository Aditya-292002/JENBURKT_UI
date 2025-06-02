import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PMTSampleRequisitionApprovalComponent } from './pmt-sample-requisition-approval.component';

describe('PMTSampleRequisitionApprovalComponent', () => {
  let component: PMTSampleRequisitionApprovalComponent;
  let fixture: ComponentFixture<PMTSampleRequisitionApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PMTSampleRequisitionApprovalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PMTSampleRequisitionApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
