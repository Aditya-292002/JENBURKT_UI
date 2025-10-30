import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CycleSuperstockistComponent } from './cycle-superstockist.component';

describe('CycleSuperstockistComponent', () => {
  let component: CycleSuperstockistComponent;
  let fixture: ComponentFixture<CycleSuperstockistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CycleSuperstockistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CycleSuperstockistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
