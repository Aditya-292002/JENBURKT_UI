import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleRequisitionApprovalComponent } from './sample-requisition-approval.component';

describe('SampleRequisitionApprovalComponent', () => {
  let component: SampleRequisitionApprovalComponent;
  let fixture: ComponentFixture<SampleRequisitionApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SampleRequisitionApprovalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SampleRequisitionApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
