import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HqMasterComponent } from './hq-master.component';

describe('HqMasterComponent', () => {
  let component: HqMasterComponent;
  let fixture: ComponentFixture<HqMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HqMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HqMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
