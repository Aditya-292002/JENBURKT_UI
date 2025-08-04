import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentPmtApprovalComponent } from './document-pmt-approval.component';

describe('DocumentPmtApprovalComponent', () => {
  let component: DocumentPmtApprovalComponent;
  let fixture: ComponentFixture<DocumentPmtApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentPmtApprovalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentPmtApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
