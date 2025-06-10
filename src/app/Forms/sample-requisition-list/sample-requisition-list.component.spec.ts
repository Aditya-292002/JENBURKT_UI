import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleRequisitionListComponent } from './sample-requisition-list.component';

describe('SampleRequisitionListComponent', () => {
  let component: SampleRequisitionListComponent;
  let fixture: ComponentFixture<SampleRequisitionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SampleRequisitionListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SampleRequisitionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
