import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyClaimRequestDetailsComponent } from './my-claim-request-details.component';

describe('MyClaimRequestDetailsComponent', () => {
  let component: MyClaimRequestDetailsComponent;
  let fixture: ComponentFixture<MyClaimRequestDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyClaimRequestDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyClaimRequestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
