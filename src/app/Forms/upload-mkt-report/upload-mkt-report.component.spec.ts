import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadMktReportComponent } from './upload-mkt-report.component';

describe('UploadMktReportComponent', () => {
  let component: UploadMktReportComponent;
  let fixture: ComponentFixture<UploadMktReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadMktReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadMktReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
