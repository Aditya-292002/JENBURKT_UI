import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChemistMasterComponent } from './chemist-master.component';

describe('ChemistMasterComponent', () => {
  let component: ChemistMasterComponent;
  let fixture: ComponentFixture<ChemistMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChemistMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChemistMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
