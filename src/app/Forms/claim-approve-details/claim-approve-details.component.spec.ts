import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimApproveDetailsComponent } from './claim-approve-details.component';

describe('ClaimApproveDetailsComponent', () => {
  let component: ClaimApproveDetailsComponent;
  let fixture: ComponentFixture<ClaimApproveDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaimApproveDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClaimApproveDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
