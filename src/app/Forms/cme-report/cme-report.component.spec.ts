import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmeReportComponent } from './cme-report.component';

describe('CmeReportComponent', () => {
  let component: CmeReportComponent;
  let fixture: ComponentFixture<CmeReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmeReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
