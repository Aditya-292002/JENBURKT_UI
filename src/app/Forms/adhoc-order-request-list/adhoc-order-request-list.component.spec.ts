import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdhocOrderRequestListComponent } from './adhoc-order-request-list.component';

describe('AdhocOrderRequestListComponent', () => {
  let component: AdhocOrderRequestListComponent;
  let fixture: ComponentFixture<AdhocOrderRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdhocOrderRequestListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdhocOrderRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
