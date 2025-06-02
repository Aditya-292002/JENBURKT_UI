import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItdComponent } from './itd.component';

describe('ItdComponent', () => {
  let component: ItdComponent;
  let fixture: ComponentFixture<ItdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
