import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CycleSampleRequisitionComponent } from './cycle-sample-requisition.component';

describe('CycleSampleRequisitionComponent', () => {
  let component: CycleSampleRequisitionComponent;
  let fixture: ComponentFixture<CycleSampleRequisitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CycleSampleRequisitionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CycleSampleRequisitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
