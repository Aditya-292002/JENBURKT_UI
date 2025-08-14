import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleDataUploadComponent } from './sample-data-upload.component';

describe('SampleDataUploadComponent', () => {
  let component: SampleDataUploadComponent;
  let fixture: ComponentFixture<SampleDataUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SampleDataUploadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SampleDataUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
