import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductGroupUpdateComponent } from './product-group-update.component';

describe('ProductGroupUpdateComponent', () => {
  let component: ProductGroupUpdateComponent;
  let fixture: ComponentFixture<ProductGroupUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductGroupUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductGroupUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
