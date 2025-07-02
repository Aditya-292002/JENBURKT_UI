import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdobeRequisitionComponent } from './adobe-requisition.component';

describe('AdobeRequisitionComponent', () => {
  let component: AdobeRequisitionComponent;
  let fixture: ComponentFixture<AdobeRequisitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdobeRequisitionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdobeRequisitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
