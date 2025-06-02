import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GstNosComponent } from './gst-nos.component';

describe('GstNosComponent', () => {
  let component: GstNosComponent;
  let fixture: ComponentFixture<GstNosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GstNosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GstNosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
