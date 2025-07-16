import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmtApprovalListComponent } from './pmt-approval-list.component';

describe('PmtApprovalListComponent', () => {
  let component: PmtApprovalListComponent;
  let fixture: ComponentFixture<PmtApprovalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmtApprovalListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PmtApprovalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
