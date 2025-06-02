import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleAllocationApprovalComponent } from './sample-allocation-approval.component';

describe('SampleAllocationApprovalComponent', () => {
  let component: SampleAllocationApprovalComponent;
  let fixture: ComponentFixture<SampleAllocationApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SampleAllocationApprovalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SampleAllocationApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
