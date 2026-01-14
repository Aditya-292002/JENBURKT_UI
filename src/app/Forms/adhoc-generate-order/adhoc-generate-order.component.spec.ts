import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdhocGenerateOrderComponent } from './adhoc-generate-order.component';

describe('AdhocGenerateOrderComponent', () => {
  let component: AdhocGenerateOrderComponent;
  let fixture: ComponentFixture<AdhocGenerateOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdhocGenerateOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdhocGenerateOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
