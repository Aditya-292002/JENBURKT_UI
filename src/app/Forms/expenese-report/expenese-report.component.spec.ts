import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpeneseReportComponent } from './expenese-report.component';

describe('ExpeneseReportComponent', () => {
  let component: ExpeneseReportComponent;
  let fixture: ComponentFixture<ExpeneseReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpeneseReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpeneseReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
