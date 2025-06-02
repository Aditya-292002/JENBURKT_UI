import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestCmeComponent } from './request-cme.component';

describe('RequestCmeComponent', () => {
  let component: RequestCmeComponent;
  let fixture: ComponentFixture<RequestCmeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestCmeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestCmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
