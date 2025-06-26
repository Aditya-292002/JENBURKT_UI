import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayementExcelUploadComponent } from './payement-excel-upload.component';

describe('PayementExcelUploadComponent', () => {
  let component: PayementExcelUploadComponent;
  let fixture: ComponentFixture<PayementExcelUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayementExcelUploadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayementExcelUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
