import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoutnCliamUpdateComponent } from './discoutn-cliam-update.component';

describe('DiscoutnCliamUpdateComponent', () => {
  let component: DiscoutnCliamUpdateComponent;
  let fixture: ComponentFixture<DiscoutnCliamUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscoutnCliamUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscoutnCliamUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
