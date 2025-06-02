import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoetargetreportComponent } from './moetargetreport.component';

describe('MoetargetreportComponent', () => {
  let component: MoetargetreportComponent;
  let fixture: ComponentFixture<MoetargetreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoetargetreportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoetargetreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
