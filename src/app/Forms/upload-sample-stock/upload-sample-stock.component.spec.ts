import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadSampleStockComponent } from './upload-sample-stock.component';

describe('UploadSampleStockComponent', () => {
  let component: UploadSampleStockComponent;
  let fixture: ComponentFixture<UploadSampleStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadSampleStockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadSampleStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
