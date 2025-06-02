import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestCmeListComponent } from './request-cme-list.component';

describe('RequestCmeListComponent', () => {
  let component: RequestCmeListComponent;
  let fixture: ComponentFixture<RequestCmeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestCmeListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestCmeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
