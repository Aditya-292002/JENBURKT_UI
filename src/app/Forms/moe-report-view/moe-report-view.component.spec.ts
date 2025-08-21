import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoeReportViewComponent } from './moe-report-view.component';

describe('MoeReportViewComponent', () => {
  let component: MoeReportViewComponent;
  let fixture: ComponentFixture<MoeReportViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoeReportViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoeReportViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
