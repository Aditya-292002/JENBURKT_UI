import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemaUploadComponent } from './schema-upload.component';

describe('SchemaUploadComponent', () => {
  let component: SchemaUploadComponent;
  let fixture: ComponentFixture<SchemaUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchemaUploadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchemaUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
