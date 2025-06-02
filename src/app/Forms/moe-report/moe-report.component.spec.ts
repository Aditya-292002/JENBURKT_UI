import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoeReportComponent } from './moe-report.component';

describe('MoeReportComponent', () => {
  let component: MoeReportComponent;
  let fixture: ComponentFixture<MoeReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoeReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
