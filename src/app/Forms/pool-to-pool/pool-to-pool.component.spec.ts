import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolToPoolComponent } from './pool-to-pool.component';

describe('PoolToPoolComponent', () => {
  let component: PoolToPoolComponent;
  let fixture: ComponentFixture<PoolToPoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoolToPoolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoolToPoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
