import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimRequestComponent } from './claim-request.component';

describe('ClaimRequestComponent', () => {
  let component: ClaimRequestComponent;
  let fixture: ComponentFixture<ClaimRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaimRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClaimRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
