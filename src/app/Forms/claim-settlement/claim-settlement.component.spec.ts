import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimSettlementComponent } from './claim-settlement.component';

describe('ClaimSettlementComponent', () => {
  let component: ClaimSettlementComponent;
  let fixture: ComponentFixture<ClaimSettlementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaimSettlementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClaimSettlementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
