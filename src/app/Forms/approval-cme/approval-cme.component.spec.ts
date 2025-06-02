import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalCmeComponent } from './approval-cme.component';

describe('ApprovalCmeComponent', () => {
  let component: ApprovalCmeComponent;
  let fixture: ComponentFixture<ApprovalCmeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovalCmeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovalCmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
