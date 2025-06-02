import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimApproveComponent } from './claim-approve.component';

describe('ClaimApproveComponent', () => {
  let component: ClaimApproveComponent;
  let fixture: ComponentFixture<ClaimApproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaimApproveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClaimApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
