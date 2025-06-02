import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyClaimRequestComponent } from './my-claim-request.component';

describe('MyClaimRequestComponent', () => {
  let component: MyClaimRequestComponent;
  let fixture: ComponentFixture<MyClaimRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyClaimRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyClaimRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
