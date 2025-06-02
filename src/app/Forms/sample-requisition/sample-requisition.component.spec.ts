import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleRequisitionComponent } from './sample-requisition.component';

describe('SampleRequisitionComponent', () => {
  let component: SampleRequisitionComponent;
  let fixture: ComponentFixture<SampleRequisitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SampleRequisitionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SampleRequisitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
