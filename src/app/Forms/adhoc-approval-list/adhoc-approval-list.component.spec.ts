import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdhocApprovalListComponent } from './adhoc-approval-list.component';

describe('AdhocApprovalListComponent', () => {
  let component: AdhocApprovalListComponent;
  let fixture: ComponentFixture<AdhocApprovalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdhocApprovalListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdhocApprovalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
