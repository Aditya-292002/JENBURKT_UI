import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleProductComponent } from './sample-product.component';

describe('SampleProductComponent', () => {
  let component: SampleProductComponent;
  let fixture: ComponentFixture<SampleProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SampleProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SampleProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
