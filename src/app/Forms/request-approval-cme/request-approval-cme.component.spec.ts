import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestApprovalCmeComponent } from './request-approval-cme.component';

describe('RequestApprovalCmeComponent', () => {
  let component: RequestApprovalCmeComponent;
  let fixture: ComponentFixture<RequestApprovalCmeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestApprovalCmeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestApprovalCmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
