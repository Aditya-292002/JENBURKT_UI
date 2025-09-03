import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperStockishMasterComponent } from './super-stockish-master.component';

describe('SuperStockishMasterComponent', () => {
  let component: SuperStockishMasterComponent;
  let fixture: ComponentFixture<SuperStockishMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperStockishMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperStockishMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
